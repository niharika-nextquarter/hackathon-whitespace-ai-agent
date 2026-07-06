import { AlertTriangle, Grid3x3, History, PlugZap } from 'lucide-react'

const TABS = [
  { id: 'matrix', label: 'Matrix', icon: Grid3x3 },
  { id: 'queue', label: 'Review Queue', icon: AlertTriangle },
  { id: 'sources', label: 'Data Sources', icon: PlugZap },
  { id: 'audit', label: 'Audit Log', icon: History },
]

export default function TabNav({ active, onChange, queueCount }) {
  return (
    <div className="flex items-center gap-1 px-6 bg-white border-b border-slate-200">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-1.5 text-sm font-semibold px-4 py-3 border-b-[3px] -mb-px transition-colors duration-150
              ${isActive ? 'border-brand-600 text-brand-700 bg-brand-50/50' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <tab.icon className={`h-3.5 w-3.5 ${isActive ? 'text-brand-600' : ''}`} />
            {tab.label}
            {tab.id === 'queue' && queueCount > 0 && (
              <span className="ml-0.5 text-[10px] font-bold rounded-full px-1.5 py-0.5 bg-rose-500 text-white">{queueCount}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
