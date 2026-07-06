import { AlertTriangle, Bot, Check, ScrollText, Server, Sparkles, X } from 'lucide-react'
import { formatDateTime } from '../utils/format'

const ACTION_ICON = {
  agent: Bot,
  system: Server,
  approve: Check,
  reject: X,
  conflict: AlertTriangle,
}

function iconFor(entry) {
  if (entry.action_type === 'approve') return Check
  if (entry.action_type === 'reject') return X
  if (entry.detail?.toLowerCase().includes('conflict')) return AlertTriangle
  if (entry.actor_type === 'system') return Server
  if (entry.actor_type === 'agent') return Sparkles
  return ACTION_ICON[entry.actor_type] || ScrollText
}

export default function AuditLog({ entries }) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ol className="relative border-l border-slate-200 ml-3">
        {entries.map((entry) => {
          const Icon = iconFor(entry)
          const isReviewer = entry.actor_type === 'reviewer'
          return (
            <li key={entry.id} className="mb-6 ml-6">
              <span
                className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white shadow-sm
                  ${entry.action_type === 'approve' ? 'bg-emerald-100 text-emerald-600' :
                    entry.action_type === 'reject' ? 'bg-slate-200 text-slate-500' :
                    entry.detail?.toLowerCase().includes('conflict') ? 'bg-rose-100 text-rose-600' :
                    isReviewer ? 'bg-brand-100 text-brand-700' : 'bg-indigo-100 text-indigo-600'}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">{entry.actor}</span>
                <span className="text-[11px] text-slate-400">{formatDateTime(entry.timestamp)}</span>
              </div>
              <p className="text-sm text-slate-600 mt-0.5">{entry.action}</p>
              {entry.detail && <p className="text-xs text-slate-400 mt-0.5">{entry.detail}</p>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
