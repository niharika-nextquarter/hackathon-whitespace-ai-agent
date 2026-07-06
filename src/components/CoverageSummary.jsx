import { AlertTriangle, ClipboardList, PieChart, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../utils/format'

export default function CoverageSummary({ stats, onOpenQueue }) {
  const items = [
    {
      icon: PieChart,
      label: 'Whitespace mapped',
      value: `${stats.mappedPct}%`,
      tone: 'text-sky-700 bg-sky-50 border-sky-200',
    },
    {
      icon: TrendingUp,
      label: 'Won coverage',
      value: `${stats.coveragePct}%`,
      sub: formatCurrency(stats.wonArr) + ' ARR',
      tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: ClipboardList,
      label: 'Pending reviews',
      value: stats.pendingSuggestions,
      tone: 'text-amber-700 bg-amber-50 border-amber-200',
      onClick: onOpenQueue,
    },
    {
      icon: AlertTriangle,
      label: 'Conflicts',
      value: stats.pendingConflicts,
      tone: 'text-rose-700 bg-rose-50 border-rose-200',
      onClick: onOpenQueue,
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 px-6 py-3 bg-slate-50 border-b border-slate-200">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          disabled={!item.onClick}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left ${item.tone} ${item.onClick ? 'hover:brightness-95 cursor-pointer' : 'cursor-default'}`}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{item.value}</div>
            <div className="text-[11px] opacity-80">{item.label}{item.sub ? ` · ${item.sub}` : ''}</div>
          </div>
        </button>
      ))}
      <div className="ml-auto flex items-center text-xs text-slate-400 italic">
        Whitespace opportunity remaining: {formatCurrency(stats.whitespaceArr)}
      </div>
    </div>
  )
}
