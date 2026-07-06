import { useMemo, useState } from 'react'
import {
  crmAccount,
  buyingCenters,
  solutions,
  dataSources as initialDataSources,
  matrixCells,
  initialAuditLog,
  initialAgentFeed,
  STATUS_META,
} from './data'
import { computeCoverageStats } from './utils/coverage'
import AccountHeader from './components/AccountHeader'
import CoverageSummary from './components/CoverageSummary'
import TabNav from './components/TabNav'
import MatrixFilters from './components/MatrixFilters'
import ScenarioBar from './components/ScenarioBar'
import WhitespaceMatrix from './components/WhitespaceMatrix'
import ReviewQueue from './components/ReviewQueue'
import DataIngestionPanel from './components/DataIngestionPanel'
import AuditLog from './components/AuditLog'
import AgentPanel from './components/AgentPanel'
import CellDrilldown from './components/CellDrilldown'
import ExportButton from './components/ExportButton'

const REVIEWER_NAME = 'Dana Whitfield'

export default function App() {
  const [cells, setCells] = useState(matrixCells)
  const [dataSourcesState, setDataSourcesState] = useState(initialDataSources)
  const [auditLog, setAuditLog] = useState(initialAuditLog)
  const [agentFeed, setAgentFeed] = useState(initialAgentFeed)
  const [activeTab, setActiveTab] = useState('matrix')
  const [agentCollapsed, setAgentCollapsed] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [filters, setFilters] = useState({ region: 'All', buyingCenterId: 'All', solutionId: 'All' })
  const [scenario, setScenario] = useState({ buying_center_id: null, solution_id: null, active: false })
  const [drilldown, setDrilldown] = useState(null)

  const buyingCenterById = useMemo(() => Object.fromEntries(buyingCenters.map((b) => [b.buying_center_id, b])), [])
  const solutionById = useMemo(() => Object.fromEntries(solutions.map((s) => [s.solution_id, s])), [])

  const filteredBuyingCenters = buyingCenters.filter(
    (bc) =>
      (filters.region === 'All' || bc.region === filters.region) &&
      (filters.buyingCenterId === 'All' || bc.buying_center_id === filters.buyingCenterId)
  )
  const filteredSolutions = solutions.filter((s) => filters.solutionId === 'All' || s.solution_id === filters.solutionId)

  const stats = computeCoverageStats(cells)
  const queueCount = stats.pendingSuggestions + stats.pendingConflicts

  const today = () => new Date().toISOString().slice(0, 10)
  const nowIso = () => new Date().toISOString()

  function logAudit(action, detail, actorType = 'reviewer') {
    setAuditLog((prev) => [
      { id: `LOG-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, timestamp: nowIso(), actor: actorType === 'reviewer' ? REVIEWER_NAME : 'Whitespace Agent', actor_type: actorType, action, detail },
      ...prev,
    ])
  }

  function pushAgentMessage(kind, text, ref) {
    setAgentFeed((prev) => [
      { id: `MSG-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, timestamp: nowIso(), kind, text, ref },
      ...prev,
    ])
  }

  function handleApprove(cellId, finalStatus, finalArr) {
    const cell = cells.find((c) => c.id === cellId)
    if (!cell || !cell.suggestion) return
    const bc = buyingCenterById[cell.buying_center_id]
    const sol = solutionById[cell.solution_id]
    const wasEdited = finalStatus !== cell.suggestion.proposed_status || finalArr !== cell.suggestion.proposed_arr

    setCells((prev) =>
      prev.map((c) =>
        c.id === cellId
          ? {
              ...c,
              status: finalStatus,
              arr: finalArr,
              updated_at: nowIso(),
              history: [
                ...c.history,
                {
                  date: today(),
                  event: `Status updated to ${STATUS_META[finalStatus].label}${wasEdited ? ' (AI suggestion approved with edits)' : ' (AI suggestion approved)'}`,
                  actor: REVIEWER_NAME,
                },
              ],
              suggestion: null,
            }
          : c
      )
    )
    logAudit(
      `Approved ${cell.suggestion.type === 'conflict' ? 'conflict resolution' : 'suggestion'} on ${bc.buying_center_name} × ${sol.solution_name}`,
      `${STATUS_META[cell.status].label} → ${STATUS_META[finalStatus].label}${wasEdited ? ' (edited before applying)' : ''}`,
      'reviewer'
    )
    setDrilldown(null)
  }

  function handleReject(cellId) {
    const cell = cells.find((c) => c.id === cellId)
    if (!cell || !cell.suggestion) return
    const bc = buyingCenterById[cell.buying_center_id]
    const sol = solutionById[cell.solution_id]
    setCells((prev) => prev.map((c) => (c.id === cellId ? { ...c, suggestion: null } : c)))
    logAudit(
      `Rejected ${cell.suggestion.type === 'conflict' ? 'conflict resolution' : 'suggestion'} on ${bc.buying_center_name} × ${sol.solution_name}`,
      `Kept status as ${STATUS_META[cell.status].label}.`,
      'reviewer'
    )
    setDrilldown(null)
  }

  function handleBulkApprove(cellIds) {
    cellIds.forEach((id) => {
      const cell = cells.find((c) => c.id === id)
      if (cell?.suggestion) handleApprove(id, cell.suggestion.proposed_status, cell.suggestion.proposed_arr)
    })
  }

  function handleComment(cellId, text) {
    setCells((prev) =>
      prev.map((c) => (c.id === cellId ? { ...c, notes: [...c.notes, { author: REVIEWER_NAME, date: today(), text }] } : c))
    )
    const cell = cells.find((c) => c.id === cellId)
    const bc = buyingCenterById[cell.buying_center_id]
    const sol = solutionById[cell.solution_id]
    logAudit(`Commented on ${bc.buying_center_name} × ${sol.solution_name}`, text, 'reviewer')
  }

  function handleCellClick(cell, bc, sol) {
    setDrilldown({ cellId: cell.id, buyingCenterId: bc.buying_center_id, solutionId: sol.solution_id })
  }

  function handleJumpToSuggestion(cellId) {
    const cell = cells.find((c) => c.id === cellId)
    if (!cell) return
    setActiveTab('queue')
  }

  function handleReanalyze() {
    // Mocked: a production build would fire a real API call to the agent
    // backend here and stream back newly generated suggestions instead of
    // this fixed-delay timeout.
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      pushAgentMessage('summary', `Re-analyzed all connected sources. ${queueCount} suggestion${queueCount === 1 ? '' : 's'} still awaiting your review — no new signals since the last pass.`)
      logAudit('Re-analyzed all sources on demand', 'No new proposals generated; existing suggestions unchanged.', 'agent')
    }, 1100)
  }

  function handleResyncSource(sourceId) {
    // Mocked: swap for a real API call to the source's connector (CRM API,
    // web-search service, file-parsing pipeline, etc.) to actually refresh data.
    setDataSourcesState((prev) => prev.map((s) => (s.source_id === sourceId ? { ...s, sync_status: 'Connected', last_updated: nowIso() } : s)))
    const src = dataSourcesState.find((s) => s.source_id === sourceId)
    logAudit(`Re-synced source: ${src.label}`, 'Feed marked Connected and timestamp refreshed.', 'system')
  }

  function handleUploadSource(sourceId, file) {
    // Mocked: a real backend would parse/ingest `file` here rather than just
    // bumping the record count.
    setDataSourcesState((prev) =>
      prev.map((s) => (s.source_id === sourceId ? { ...s, sync_status: 'Connected', last_updated: nowIso(), record_count: s.record_count + 1 } : s))
    )
    const src = dataSourcesState.find((s) => s.source_id === sourceId)
    logAudit(`Uploaded new file to ${src.label}`, `File: ${file.name}`, 'system')
  }

  function handleAsk(question) {
    // Mocked: keyword matching stands in for a real API call to an LLM
    // backend grounded in this account's data sources.
    const lower = question.toLowerCase()
    let reply = 'I can help with staged suggestions, conflicts, and provenance for this account — try asking about a specific buying center, solution, or "conflicts".'
    if (lower.includes('conflict')) {
      reply = `There ${stats.pendingConflicts === 1 ? 'is' : 'are'} currently ${stats.pendingConflicts} conflict${stats.pendingConflicts === 1 ? '' : 's'} flagged: Finance × Platform Core (renewal vs. churn signal) and Operations × Integration Hub (tech stack PoC vs. confirmed usage). Both need a human call.`
    } else if (lower.includes('procurement')) {
      reply = 'Procurement is showing a 91% confidence suggestion on Integration Hub, driven by an intent-data surge in vendor connectivity searches that matches their internal RFP almost verbatim.'
    } else if (lower.includes('confidence')) {
      const pending = cells.filter((c) => c.suggestion && c.suggestion.review_status === 'pending')
      const avg = pending.length ? Math.round(pending.reduce((s, c) => s + c.suggestion.confidence, 0) / pending.length) : 0
      reply = `Average confidence across ${pending.length} pending item${pending.length === 1 ? '' : 's'} is ${avg}%.`
    } else if (lower.includes('whitespace') || lower.includes('coverage')) {
      reply = `${stats.mappedPct}% of the matrix is mapped and ${stats.coveragePct}% is Won/Active today, leaving roughly ${stats.whitespaceArr ? '$' + Math.round(stats.whitespaceArr / 1000) + 'K' : '$0'} in identified whitespace ARR.`
    }
    pushAgentMessage('user', question)
    setTimeout(() => pushAgentMessage('reply', reply), 400)
  }

  const drilldownCell = drilldown ? cells.find((c) => c.id === drilldown.cellId) : null

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <AccountHeader account={crmAccount} />
      <CoverageSummary stats={stats} onOpenQueue={() => setActiveTab('queue')} />
      <TabNav active={activeTab} onChange={setActiveTab} queueCount={queueCount} />

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {activeTab === 'matrix' && (
            <>
              <MatrixFilters filters={filters} setFilters={setFilters} buyingCenters={buyingCenters} solutions={solutions} />
              <ScenarioBar buyingCenters={buyingCenters} solutions={solutions} cells={cells} scenario={scenario} setScenario={setScenario} />
              <div className="flex justify-end px-6 pt-3">
                <ExportButton account={crmAccount} buyingCenters={filteredBuyingCenters} solutions={filteredSolutions} cells={cells} stats={stats} />
              </div>
              <div className="flex-1 overflow-y-auto">
                <WhitespaceMatrix
                  buyingCenters={filteredBuyingCenters}
                  solutions={filteredSolutions}
                  cells={cells}
                  onCellClick={handleCellClick}
                  scenario={scenario}
                />
              </div>
            </>
          )}

          {activeTab === 'queue' && (
            <div className="flex-1 overflow-y-auto">
              <ReviewQueue
                cells={cells}
                buyingCenterById={buyingCenterById}
                solutionById={solutionById}
                onApprove={handleApprove}
                onReject={handleReject}
                onComment={handleComment}
                onBulkApprove={handleBulkApprove}
              />
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="flex-1 overflow-y-auto">
              <DataIngestionPanel sources={dataSourcesState} onResync={handleResyncSource} onUpload={handleUploadSource} />
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="flex-1 overflow-y-auto">
              <AuditLog entries={auditLog} />
            </div>
          )}
        </div>

        <AgentPanel
          feed={agentFeed}
          collapsed={agentCollapsed}
          onToggle={() => setAgentCollapsed((v) => !v)}
          onJumpToSuggestion={handleJumpToSuggestion}
          onAsk={handleAsk}
          onReanalyze={handleReanalyze}
          isAnalyzing={isAnalyzing}
        />
      </div>

      {drilldownCell && (
        <CellDrilldown
          cell={drilldownCell}
          buyingCenter={buyingCenterById[drilldown.buyingCenterId]}
          solution={solutionById[drilldown.solutionId]}
          onClose={() => setDrilldown(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onComment={handleComment}
        />
      )}
    </div>
  )
}
