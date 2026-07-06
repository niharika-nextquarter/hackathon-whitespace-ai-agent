import { AlertTriangle, Grid3x3, History, PlugZap } from 'lucide-react'

const TABS = [
  { id: 'matrix', label: 'Matrix', icon: Grid3x3 },
  { id: 'queue', label: 'Review Queue', icon: AlertTriangle },
  { id: 'sources', label: 'Data Sources', icon: PlugZap },
  { id: 'audit', label: 'Audit Log', icon: History },
]

export default function TabNav({ active, onChange, queueCount }) {
  return (
    <div className="flex items-center gap-1 px-6 pt-3 bg-white border-b border-slate-200">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-t-md border-b-2 -mb-px
              ${isActive ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
            {tab.id === 'queue' && queueCount > 0 && (
              <span className="ml-1 text-[10px] font-semibold bg-rose-500 text-white rounded-full px-1.5 py-0.5">{queueCount}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
