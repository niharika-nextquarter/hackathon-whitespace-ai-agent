import { useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, RefreshCw, Sparkle, Upload } from 'lucide-react'
import { formatDateTime, timeAgo } from '../utils/format'

const SYNC_STYLE = {
  Connected: { icon: CheckCircle2, tone: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  Stale: { icon: AlertCircle, tone: 'text-amber-600 bg-amber-50 border-amber-200' },
  Error: { icon: AlertCircle, tone: 'text-rose-600 bg-rose-50 border-rose-200' },
}

export default function DataIngestionPanel({ sources, onResync, onUpload }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <p className="text-sm text-slate-500 mb-4">
        Every suggestion the agent stages cites one of the feeds below by name. Structured feeds come directly
        from CRM tables; feeds marked <span className="font-medium text-violet-600">AI-derived</span> are sourced via web
        search or unstructured file drops and are treated as lower-confidence evidence.
      </p>
      <div className="space-y-2.5">
        {sources.map((src) => (
          <SourceRow
            key={src.source_id}
            src={src}
            isExpanded={expanded === src.source_id}
            onToggle={() => setExpanded((e) => (e === src.source_id ? null : src.source_id))}
            onResync={() => onResync(src.source_id)}
            onUpload={(file) => onUpload(src.source_id, file)}
          />
        ))}
      </div>
    </div>
  )
}

function SourceRow({ src, isExpanded, onToggle, onResync, onUpload }) {
  const fileInputRef = useRef(null)
  const style = SYNC_STYLE[src.sync_status]
  const Icon = style.icon

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50">
        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-800">{src.label}</span>
            {!src.is_structured && (
              <span className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-50 text-violet-600 border border-violet-200">
                <Sparkle className="h-2.5 w-2.5" /> AI-derived
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {src.record_count} record{src.record_count === 1 ? '' : 's'} · updated {timeAgo(src.last_updated)}
          </div>
        </div>
        <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full border ${style.tone}`}>
          <Icon className="h-3 w-3" /> {src.sync_status}
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100 animate-fade-in">
          <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1.5 mt-2">Sample fields contributed</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {src.sample_fields.map((f) => (
              <code key={f} className="text-[11px] bg-slate-100 text-slate-600 rounded px-1.5 py-0.5">{f}</code>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 mb-3">Last synced {formatDateTime(src.last_updated)}</div>
          <div className="flex gap-2">
            <button
              onClick={onResync}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-sync / Re-analyze
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <Upload className="h-3.5 w-3.5" /> Upload new file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onUpload(file)
                e.target.value = ''
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
