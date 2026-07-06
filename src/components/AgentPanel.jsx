import { useState } from 'react'
import { AlertTriangle, Bot, ChevronsRight, RefreshCw, Send, Sparkles, User } from 'lucide-react'
import { timeAgo } from '../utils/format'

const KIND_STYLE = {
  summary: { icon: Bot, tone: 'text-slate-600 bg-slate-100' },
  suggestion: { icon: Sparkles, tone: 'text-indigo-600 bg-indigo-100' },
  conflict: { icon: AlertTriangle, tone: 'text-rose-600 bg-rose-100' },
  user: { icon: User, tone: 'text-slate-500 bg-white border border-slate-200' },
  reply: { icon: Bot, tone: 'text-slate-600 bg-slate-100' },
}

export default function AgentPanel({ feed, collapsed, onToggle, onJumpToSuggestion, onAsk, onReanalyze, isAnalyzing }) {
  const [input, setInput] = useState('')

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-30 bg-gradient-to-br from-slate-800 to-slate-950 text-white rounded-l-xl px-1.5 py-3 shadow-lg hover:shadow-xl transition-shadow"
        title="Open agent panel"
      >
        <Bot className="h-4 w-4" />
      </button>
    )
  }

  return (
    <aside className="w-[340px] shrink-0 h-full bg-white border-l border-slate-200 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 bg-gradient-to-r from-indigo-50/60 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm shadow-indigo-300/50 ring-1 ring-white/40">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 leading-tight">Whitespace Agent</div>
            <div className="text-[11px] text-slate-400 leading-tight">Insights & staged suggestions</div>
          </div>
        </div>
        <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-slate-900/5 text-slate-400 transition-colors">
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={onReanalyze}
        disabled={isAnalyzing}
        className="mx-4 mt-3 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 transition-colors"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isAnalyzing ? 'animate-spin text-indigo-500' : ''}`} />
        {isAnalyzing ? 'Re-analyzing sources…' : 'Re-analyze all sources'}
      </button>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {feed.map((m) => {
          const style = KIND_STYLE[m.kind] || KIND_STYLE.summary
          const Icon = style.icon
          return (
            <div key={m.id} className="flex gap-2 animate-fade-in">
              <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${style.tone}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-700 leading-snug bg-slate-50 rounded-xl rounded-tl-sm px-3 py-2 border border-slate-100 shadow-sm">
                  {m.text}
                  {m.ref && (
                    <button
                      onClick={() => onJumpToSuggestion(m.ref)}
                      className="block mt-1.5 text-xs font-medium text-indigo-600 hover:underline"
                    >
                      View in Review Queue →
                    </button>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 ml-1">{timeAgo(m.timestamp)}</div>
              </div>
            </div>
          )
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!input.trim()) return
          onAsk(input.trim())
          setInput('')
        }}
        className="p-3 border-t border-slate-200 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the agent about this account..."
          className="flex-1 text-sm border border-slate-200 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-colors"
        />
        <button type="submit" className="p-2.5 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-sm hover:shadow-md transition-shadow shrink-0">
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </aside>
  )
}
