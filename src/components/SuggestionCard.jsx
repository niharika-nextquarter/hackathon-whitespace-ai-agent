import { useState } from 'react'
import { AlertTriangle, ArrowRight, Check, MessageSquarePlus, Pencil, Sparkles, X } from 'lucide-react'
import { STATUS, STATUS_META } from '../data/statusConfig'
import { formatCurrency, timeAgo } from '../utils/format'

export default function SuggestionCard({
  cell,
  buyingCenterName,
  solutionName,
  onApprove,
  onReject,
  onComment,
  detailed = false,
}) {
  const [editing, setEditing] = useState(false)
  const [editedStatus, setEditedStatus] = useState(cell.suggestion.proposed_status)
  const [editedArr, setEditedArr] = useState(cell.suggestion.proposed_arr)
  const [commentOpen, setCommentOpen] = useState(false)
  const [commentText, setCommentText] = useState('')

  const s = cell.suggestion
  const isConflict = s.type === 'conflict'
  const currentMeta = STATUS_META[cell.status]
  const proposedMeta = STATUS_META[editedStatus]

  return (
    <div className={`rounded-xl border-2 border-dashed p-3.5 shadow-sm ${isConflict ? 'border-rose-300 bg-rose-50/50' : 'border-indigo-300 bg-indigo-50/40'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {isConflict ? <AlertTriangle className="h-4 w-4 text-rose-600" /> : <Sparkles className="h-4 w-4 text-indigo-600" />}
          <span className={`text-xs font-semibold uppercase tracking-wide ${isConflict ? 'text-rose-700' : 'text-indigo-700'}`}>
            {isConflict ? 'Conflict flagged' : 'AI suggestion'}
          </span>
        </div>
        <span className="text-[11px] text-slate-400">{timeAgo(s.created_at)}</span>
      </div>

      {(buyingCenterName || solutionName) && (
        <div className="text-sm font-medium text-slate-800 mt-1.5">{buyingCenterName} × {solutionName}</div>
      )}

      {/* Before / After diff */}
      <div className="flex items-center gap-2 mt-2.5 text-sm">
        <span className={`px-2 py-1 rounded-md border ${currentMeta.bg} ${currentMeta.border} ${currentMeta.text} text-xs font-medium`}>
          {currentMeta.short} · {formatCurrency(cell.arr)}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        {editing ? (
          <div className="flex items-center gap-1.5">
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="text-xs border border-slate-300 rounded-md px-1.5 py-1"
            >
              {Object.values(STATUS).map((key) => (
                <option key={key} value={key}>{STATUS_META[key].label}</option>
              ))}
            </select>
            <input
              type="number"
              value={editedArr}
              onChange={(e) => setEditedArr(Number(e.target.value))}
              className="text-xs border border-slate-300 rounded-md px-1.5 py-1 w-24"
            />
          </div>
        ) : (
          <span className={`px-2 py-1 rounded-md border ${proposedMeta.bg} ${proposedMeta.border} ${proposedMeta.text} text-xs font-medium`}>
            {proposedMeta.short} · {formatCurrency(editedArr)}
          </span>
        )}
      </div>

      {/* Confidence */}
      <div className="mt-2.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
          <span>Confidence</span>
          <span className="font-semibold text-slate-700">{s.confidence}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${s.confidence >= 80 ? 'bg-emerald-500' : s.confidence >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
            style={{ width: `${s.confidence}%` }}
          />
        </div>
      </div>

      {/* Provenance */}
      <div className="mt-2.5 text-xs">
        <span className="font-semibold text-slate-600">Source: </span>
        <span className="text-slate-600">{s.source_family}</span>
        <span className="text-slate-400"> — {s.source_detail}</span>
      </div>

      {/* Rationale */}
      <p className={`mt-2 text-sm text-slate-600 leading-snug ${detailed ? '' : 'line-clamp-3'}`}>{s.rationale}</p>

      {isConflict && s.conflicting_with && (
        <div className="mt-2 text-xs bg-white border border-rose-200 rounded-md p-2 text-rose-700">
          <span className="font-semibold">Conflicts with: </span>{s.conflicting_with}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button
          onClick={() => onApprove(cell.id, editedStatus, editedArr)}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all"
        >
          <Check className="h-3.5 w-3.5" /> Approve
        </button>
        <button
          onClick={() => onReject(cell.id)}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Reject
        </button>
        <button
          onClick={() => setEditing((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" /> {editing ? 'Editing…' : 'Edit'}
        </button>
        <button
          onClick={() => setCommentOpen((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-colors"
        >
          <MessageSquarePlus className="h-3.5 w-3.5" /> Comment
        </button>
      </div>

      {commentOpen && (
        <div className="flex gap-2 mt-2.5">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a reviewer comment..."
            className="flex-1 text-xs border border-slate-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={() => {
              if (!commentText.trim()) return
              onComment(cell.id, commentText.trim())
              setCommentText('')
              setCommentOpen(false)
            }}
            className="text-xs px-2.5 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800"
          >
            Post
          </button>
        </div>
      )}
    </div>
  )
}
