import { Building2, CalendarClock, Gauge, Layers } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/format'

export default function AccountHeader({ account }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-lg bg-slate-900 text-white flex items-center justify-center font-semibold text-sm shrink-0">
          {account.logo_initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-slate-900 leading-tight">{account.account_name}</h1>
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              {account.tier}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-tight mt-0.5">{account.website_domain} · {account.HQ_country}</p>
        </div>
      </div>

      <div className="hidden md:block h-9 w-px bg-slate-200" />

      <HeaderStat icon={Layers} label="Segment" value={account.segment} />
      <HeaderStat icon={Building2} label="Territory" value={account.territory} />
      <HeaderStat icon={Gauge} label="Total ARR" value={formatCurrency(account.total_arr)} emphasize />
      <HeaderStat icon={CalendarClock} label="Renewal" value={formatDate(account.renewal_date)} />

      <div className="ml-auto text-xs text-slate-500">
        Owner: <span className="text-slate-700 font-medium">{account.owner}</span>
      </div>
    </div>
  )
}

function HeaderStat({ icon: Icon, label, value, emphasize }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
        <div className={`text-sm ${emphasize ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{value}</div>
      </div>
    </div>
  )
}
