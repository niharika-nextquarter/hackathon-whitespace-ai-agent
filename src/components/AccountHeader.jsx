import { Building2, CalendarClock, Gauge, Layers } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/format'

export default function AccountHeader({ account }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 border-b border-brand-950 shadow-md">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-white text-brand-800 flex items-center justify-center font-bold text-sm shrink-0 shadow-md ring-1 ring-white/20">
          {account.logo_initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-white leading-tight tracking-tight">{account.account_name}</h1>
            <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-white/15 text-white border border-white/20">
              {account.tier}
            </span>
          </div>
          <p className="text-xs text-brand-200 leading-tight mt-0.5">{account.website_domain} · {account.HQ_country}</p>
        </div>
      </div>

      <div className="hidden md:block h-9 w-px bg-white/15" />

      <HeaderStat icon={Layers} label="Segment" value={account.segment} />
      <HeaderStat icon={Building2} label="Territory" value={account.territory} />
      <HeaderStat icon={Gauge} label="Total ARR" value={formatCurrency(account.total_arr)} emphasize />
      <HeaderStat icon={CalendarClock} label="Renewal" value={formatDate(account.renewal_date)} />

      <div className="ml-auto text-xs text-brand-200">
        Owner: <span className="text-white font-medium">{account.owner}</span>
      </div>
    </div>
  )
}

function HeaderStat({ icon: Icon, label, value, emphasize }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
        <Icon className="h-3.5 w-3.5 text-brand-200" />
      </div>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-wide text-brand-300 font-medium">{label}</div>
        <div className={`text-sm ${emphasize ? 'font-semibold text-white' : 'text-brand-100'}`}>{value}</div>
      </div>
    </div>
  )
}
