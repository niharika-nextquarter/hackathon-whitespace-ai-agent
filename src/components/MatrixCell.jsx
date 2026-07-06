import { AlertTriangle, Sparkles } from 'lucide-react'
import { STATUS_META } from '../data/statusConfig'
import { StatusIcon } from './icons'
import { formatCurrency } from '../utils/format'

export default function MatrixCell({ cell, maxArr, isScenarioTarget, onClick }) {
  const meta = STATUS_META[cell.status]
  const hasPending = cell.suggestion && cell.suggestion.review_status === 'pending'
  const isConflict = hasPending && cell.suggestion.type === 'conflict'
  const isSuggestion = hasPending && cell.suggestion.type === 'suggestion'
  const valuePct = maxArr ? Math.max(6, Math.round((cell.arr / maxArr) * 100)) : 0

  const borderClass = isConflict
    ? 'border-rose-400 border-dashed border-2'
    : isSuggestion
    ? 'border-indigo-400 border-dashed border-2'
    : `${meta.border} border`

  return (
    <button
      onClick={onClick}
      className={`group relative w-full h-full min-h-[92px] rounded-lg p-2.5 flex flex-col justify-between text-left transition
        ${meta.bg} ${borderClass}
        ${isScenarioTarget ? 'ring-2 ring-offset-1 ring-violet-500' : ''}
        hover:shadow-md hover:-translate-y-0.5 hover:z-10`}
    >
      {hasPending && (
        <span className={`absolute -top-2 -right-2 flex h-4 w-4 ${isConflict ? '' : ''}`}>
          <span className={`animate-pulse-soft absolute inline-flex h-full w-full rounded-full ${isConflict ? 'bg-rose-500' : 'bg-indigo-500'} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-4 w-4 items-center justify-center ${isConflict ? 'bg-rose-600' : 'bg-indigo-600'} text-white`}>
            {isConflict ? <AlertTriangle className="h-2.5 w-2.5" /> : <Sparkles className="h-2.5 w-2.5" />}
          </span>
        </span>
      )}

      <div className="flex items-center gap-1.5">
        <StatusIcon name={meta.icon} className={`h-3.5 w-3.5 ${meta.text}`} />
        <span className={`text-[11px] font-medium ${meta.text}`}>{meta.short}</span>
      </div>

      <div>
        {cell.status !== 'not_applicable' && (
          <div className="text-sm font-semibold text-slate-800">{formatCurrency(cell.arr)}</div>
        )}
        {isSuggestion && (
          <div className="mt-1 text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded px-1 py-0.5 inline-block">
            → {STATUS_META[cell.suggestion.proposed_status].short} · {cell.suggestion.confidence}%
          </div>
        )}
        {isConflict && (
          <div className="mt-1 text-[10px] font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded px-1 py-0.5 inline-block">
            Conflict · {cell.suggestion.confidence}%
          </div>
        )}
      </div>

      {cell.status !== 'not_applicable' && (
        <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
          <div className={`h-full ${meta.swatch} opacity-70`} style={{ width: `${valuePct}%` }} />
        </div>
      )}
    </button>
  )
}
