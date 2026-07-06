import { STATUS_META } from '../data/statusConfig'
import { formatCurrency, formatDate } from './format'

// Builds a lightweight Markdown "QBR export" of the current matrix state.
// A production build would render this through a proper deck/PDF pipeline —
// this keeps the hackathon build dependency-free while still producing a
// real, shareable file.
export function buildQbrExport({ account, buyingCenters, solutions, cells, stats }) {
  const cellMap = new Map(cells.map((c) => [c.id, c]))
  const lines = []

  lines.push(`# Whitespace Mapping — ${account.account_name}`)
  lines.push('')
  lines.push(`**Segment:** ${account.segment}  `)
  lines.push(`**Tier:** ${account.tier}  `)
  lines.push(`**Total ARR:** ${formatCurrency(account.total_arr)}  `)
  lines.push(`**Renewal date:** ${formatDate(account.renewal_date)}  `)
  lines.push('')
  lines.push(`## Coverage summary`)
  lines.push(`- Whitespace mapped: **${stats.mappedPct}%**`)
  lines.push(`- Won coverage: **${stats.coveragePct}%** (${formatCurrency(stats.wonArr)} ARR)`)
  lines.push(`- Whitespace opportunity remaining: **${formatCurrency(stats.whitespaceArr)}**`)
  lines.push(`- Pending reviews: **${stats.pendingSuggestions}**, Conflicts: **${stats.pendingConflicts}**`)
  lines.push('')
  lines.push(`## Buying Centers x Solutions matrix`)
  lines.push('')
  lines.push(`| Buying Center | ${solutions.map((s) => s.solution_name).join(' | ')} |`)
  lines.push(`| --- | ${solutions.map(() => '---').join(' | ')} |`)
  for (const bc of buyingCenters) {
    const row = solutions.map((s) => {
      const cell = cellMap.get(`${bc.buying_center_id}__${s.solution_id}`)
      if (!cell) return '—'
      const meta = STATUS_META[cell.status]
      const pending = cell.suggestion && cell.suggestion.review_status === 'pending'
      return `${meta.short}${cell.status !== 'not_applicable' ? ` (${formatCurrency(cell.arr)})` : ''}${pending ? ' ⚠︎ pending review' : ''}`
    })
    lines.push(`| ${bc.buying_center_name} | ${row.join(' | ')} |`)
  }

  lines.push('')
  lines.push(`_Generated ${formatDate(new Date().toISOString())} from the Whitespace Mapping AI Agent (mock data)._`)

  return lines.join('\n')
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
