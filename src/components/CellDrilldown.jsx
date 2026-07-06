import { useState } from 'react'
import { X, History, Users, StickyNote, Link2, BrainCircuit } from 'lucide-react'
import { STATUS_META } from '../data/statusConfig'
import { StatusIcon } from './icons'
import { formatCurrency, formatDate, formatDateTime } from '../utils/format'
import SuggestionCard from './SuggestionCard'

export default function CellDrilldown({ cell, buyingCenter, solution, onClose, onApprove, onReject, onEdit, onComment }) {
  const [commentText, setCommentText] = useState('')
  if (!cell) return null
  const meta = STATUS_META[cell.status]

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl rounded-l-2xl flex flex-col animate-fade-in">
        <div className="flex items-start justify-between p-5 border-b border-slate-200 rounded-tl-2xl bg-gradient-to-r from-slate-50 to-white">
          <div>
            <div className="text-xs text-slate-400">{buyingCenter.buying_center_name} × {solution.solution_name}</div>
            <div className="mt-1 flex items-center gap-2">
              <StatusIcon name={meta.icon} className={`h-4 w-4 ${meta.text}`} />
              <span className={`text-sm font-semibold ${meta.text}`}>{meta.label}</span>
            </div>
            {cell.status !== 'not_applicable' && (
              <div className="text-lg font-semibold text-slate-900 mt-1">{formatCurrency(cell.arr)} <span className="text-xs font-normal text-slate-400">est. ARR</span></div>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-900/5 text-slate-400 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cell.suggestion && cell.suggestion.review_status === 'pending' && (
            <SuggestionCard
              cell={cell}
              onApprove={onApprove}
              onReject={onReject}
              onEdit={onEdit}
              onComment={onComment}
              detailed
            />
          )}

          <Section icon={BrainCircuit} title="AI reasoning">
            <p className="text-sm text-slate-600 leading-relaxed">{cell.ai_reasoning || 'No AI analysis recorded for this cell yet.'}</p>
          </Section>

          <Section icon={History} title="History">
            {cell.history.length ? (
              <ol className="space-y-2">
                {cell.history.map((h, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-2">
                    <span className="text-xs text-slate-400 shrink-0 w-20">{formatDate(h.date)}</span>
                    <span>{h.event} <span className="text-slate-400">— {h.actor}</span></span>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyNote text="No history recorded." />
            )}
          </Section>

          <Section icon={Users} title="Related contacts">
            {cell.related_contacts.length ? (
              <ul className="space-y-1.5">
                {cell.related_contacts.map((c, i) => (
                  <li key={i} className="text-sm text-slate-700 flex justify-between">
                    <span>{c.name}</span>
                    <span className="text-slate-400">{c.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyNote text="No contacts linked." />
            )}
          </Section>

          <Section icon={Link2} title="Linked opportunities">
            {cell.linked_opportunities.length ? (
              <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
                {cell.linked_opportunities.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            ) : (
              <EmptyNote text="No linked opportunities." />
            )}
          </Section>

          <Section icon={StickyNote} title="Notes">
            {cell.notes.length ? (
              <ul className="space-y-2 mb-3">
                {cell.notes.map((n, i) => (
                  <li key={i} className="text-sm bg-slate-50 border border-slate-200 rounded-md p-2">
                    <div className="text-slate-600">{n.text}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{n.author} · {formatDate(n.date)}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyNote text="No notes yet." />
            )}
            <div className="flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 text-sm border border-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button
                onClick={() => {
                  if (!commentText.trim()) return
                  onComment(cell.id, commentText.trim())
                  setCommentText('')
                }}
                className="text-sm px-3 py-1.5 rounded-lg bg-brand-700 text-white shadow-sm hover:bg-brand-800 transition-colors"
              >
                Add
              </button>
            </div>
          </Section>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Last updated {formatDateTime(cell.updated_at)}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2 text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        <h3 className="text-xs font-semibold uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function EmptyNote({ text }) {
  return <p className="text-sm text-slate-400 italic">{text}</p>
}
