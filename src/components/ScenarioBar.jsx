import { FlaskConical, X } from 'lucide-react'
import { STATUS } from '../data/statusConfig'
import { computeCoverageStats } from '../utils/coverage'
import { formatCurrency } from '../utils/format'

export default function ScenarioBar({ buyingCenters, solutions, cells, scenario, setScenario }) {
  const cellMap = new Map(cells.map((c) => [c.id, c]))
  const baseStats = computeCoverageStats(cells)

  const previewCells = scenario.active
    ? cells.map((c) =>
        c.buying_center_id === scenario.buying_center_id && c.solution_id === scenario.solution_id
          ? { ...c, status: STATUS.won }
          : c
      )
    : cells
  const previewStats = computeCoverageStats(previewCells)
  const targetCell = scenario.active ? cellMap.get(`${scenario.buying_center_id}__${scenario.solution_id}`) : null

  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-2.5 bg-violet-50/60 border-b border-violet-100 text-sm">
      <div className="flex items-center gap-1.5 text-violet-700 text-xs font-semibold">
        <FlaskConical className="h-3.5 w-3.5" /> Scenario: what if we win…
      </div>

      <select
        value={scenario.buying_center_id || ''}
        onChange={(e) => setScenario((s) => ({ ...s, buying_center_id: e.target.value, active: !!e.target.value && !!s.solution_id }))}
        className="text-xs border border-violet-200 rounded-md px-2 py-1 bg-white"
      >
        <option value="">Select buying center…</option>
        {buyingCenters.map((bc) => (
          <option key={bc.buying_center_id} value={bc.buying_center_id}>{bc.buying_center_name}</option>
        ))}
      </select>

      <span className="text-xs text-violet-400">×</span>

      <select
        value={scenario.solution_id || ''}
        onChange={(e) => setScenario((s) => ({ ...s, solution_id: e.target.value, active: !!e.target.value && !!s.buying_center_id }))}
        className="text-xs border border-violet-200 rounded-md px-2 py-1 bg-white"
      >
        <option value="">Select solution…</option>
        {solutions.map((s) => (
          <option key={s.solution_id} value={s.solution_id}>{s.solution_name}</option>
        ))}
      </select>

      {scenario.active && targetCell && (
        <>
          <div className="flex items-center gap-4 text-xs ml-2">
            <span className="text-violet-700">
              Coverage: <strong>{baseStats.coveragePct}%</strong> → <strong>{previewStats.coveragePct}%</strong>
            </span>
            <span className="text-violet-700">
              Mapped: <strong>{baseStats.mappedPct}%</strong> → <strong>{previewStats.mappedPct}%</strong>
            </span>
            {targetCell.status !== STATUS.won && (
              <span className="text-violet-700">+{formatCurrency(targetCell.arr)} ARR</span>
            )}
          </div>
          <button
            onClick={() => setScenario({ buying_center_id: null, solution_id: null, active: false })}
            className="ml-auto flex items-center gap-1 text-xs text-violet-500 hover:text-violet-800"
          >
            <X className="h-3 w-3" /> Clear scenario
          </button>
        </>
      )}
    </div>
  )
}
