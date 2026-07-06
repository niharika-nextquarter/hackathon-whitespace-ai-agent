import { useState } from 'react'
import { CheckCheck, Inbox } from 'lucide-react'
import SuggestionCard from './SuggestionCard'

export default function ReviewQueue({ cells, buyingCenterById, solutionById, onApprove, onReject, onComment, onBulkApprove }) {
  const [threshold, setThreshold] = useState(90)

  const pending = cells.filter((c) => c.suggestion && c.suggestion.review_status === 'pending')
  const conflicts = pending.filter((c) => c.suggestion.type === 'conflict')
  const suggestions = pending.filter((c) => c.suggestion.type === 'suggestion')
  const eligibleForBulk = suggestions.filter((c) => c.suggestion.confidence >= threshold)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4">
        <div>
          <div className="text-sm font-semibold text-slate-800">Bulk approve</div>
          <div className="text-xs text-slate-500">Approve all non-conflict suggestions at or above a confidence threshold.</div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 flex items-center gap-2">
            Confidence ≥
            <input
              type="range"
              min={50}
              max={99}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-28"
            />
            <span className="font-semibold text-slate-700 w-9">{threshold}%</span>
          </label>
          <button
            onClick={() => onBulkApprove(eligibleForBulk.map((c) => c.id))}
            disabled={!eligibleForBulk.length}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-slate-900 text-white disabled:opacity-40 hover:bg-slate-800"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Approve {eligibleForBulk.length} suggestion{eligibleForBulk.length === 1 ? '' : 's'}
          </button>
        </div>
      </div>

      {!pending.length && (
        <div className="text-center py-16 text-slate-400">
          <Inbox className="h-8 w-8 mx-auto mb-2" />
          Review queue is clear. No pending suggestions or conflicts.
        </div>
      )}

      {conflicts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-rose-700 mb-3">Conflicts ({conflicts.length})</h2>
          <div className="space-y-4">
            {conflicts.map((cell) => (
              <SuggestionCard
                key={cell.id}
                cell={cell}
                buyingCenterName={buyingCenterById[cell.buying_center_id]?.buying_center_name}
                solutionName={solutionById[cell.solution_id]?.solution_name}
                onApprove={onApprove}
                onReject={onReject}
                onComment={onComment}
                detailed
              />
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-indigo-700 mb-3">Pending suggestions ({suggestions.length})</h2>
          <div className="space-y-4">
            {suggestions.map((cell) => (
              <SuggestionCard
                key={cell.id}
                cell={cell}
                buyingCenterName={buyingCenterById[cell.buying_center_id]?.buying_center_name}
                solutionName={solutionById[cell.solution_id]?.solution_name}
                onApprove={onApprove}
                onReject={onReject}
                onComment={onComment}
                detailed
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
