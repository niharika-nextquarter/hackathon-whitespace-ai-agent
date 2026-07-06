import { AlertTriangle, ClipboardList, PieChart, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../utils/format'

export default function CoverageSummary({ stats, onOpenQueue }) {
  const items = [
    {
      icon: PieChart,
      label: 'Whitespace mapped',
      value: `${stats.mappedPct}%`,
      tone: 'text-brand-700 bg-brand-50 border-brand-200/80',
      iconTone: 'bg-brand-600',
    },
    {
      icon: TrendingUp,
      label: 'Won coverage',
      value: `${stats.coveragePct}%`,
      sub: formatCurrency(stats.wonArr) + ' ARR',
      tone: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
      iconTone: 'bg-emerald-500',
    },
    {
      icon: ClipboardList,
      label: 'Pending reviews',
      value: stats.pendingSuggestions,
      tone: 'text-amber-700 bg-amber-50 border-amber-200/80',
      iconTone: 'bg-amber-500',
      onClick: onOpenQueue,
    },
    {
      icon: AlertTriangle,
      label: 'Conflicts',
      value: stats.pendingConflicts,
      tone: 'text-rose-700 bg-rose-50 border-rose-200/80',
      iconTone: 'bg-rose-500',
      onClick: onOpenQueue,
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 px-6 py-3.5 bg-slate-50/60 border-b border-slate-200">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={item.onClick}
          disabled={!item.onClick}
          className={`flex items-center gap-3 pl-2.5 pr-4 py-2 rounded-xl border text-left shadow-sm transition-all duration-150 ${item.tone} ${item.onClick ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'}`}
        >
          <div className={`h-8 w-8 rounded-lg ${item.iconTone} flex items-center justify-center shrink-0 shadow-sm`}>
            <item.icon className="h-4 w-4 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">{item.value}</div>
            <div className="text-[11px] opacity-80">{item.label}{item.sub ? ` · ${item.sub}` : ''}</div>
          </div>
        </button>
      ))}
      <div className="ml-auto flex items-center text-xs text-slate-400 italic">
        Whitespace opportunity remaining: <span className="not-italic font-semibold text-slate-500 ml-1">{formatCurrency(stats.whitespaceArr)}</span>
      </div>
    </div>
  )
}
