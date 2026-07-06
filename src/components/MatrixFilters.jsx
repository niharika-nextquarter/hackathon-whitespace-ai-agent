import { Filter, RotateCcw } from 'lucide-react'

const REGIONS = ['All', 'AMER', 'EMEA']

export default function MatrixFilters({ filters, setFilters, buyingCenters, solutions }) {
  const isDirty = filters.region !== 'All' || filters.buyingCenterId !== 'All' || filters.solutionId !== 'All'

  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-2.5 bg-white/70 backdrop-blur-sm border-b border-slate-200 text-sm">
      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
        <Filter className="h-3.5 w-3.5" />
        Filters
      </div>

      <Select
        label="Region"
        value={filters.region}
        onChange={(v) => setFilters((f) => ({ ...f, region: v }))}
        options={REGIONS.map((r) => ({ value: r, label: r }))}
      />
      <Select
        label="Buying Center"
        value={filters.buyingCenterId}
        onChange={(v) => setFilters((f) => ({ ...f, buyingCenterId: v }))}
        options={[{ value: 'All', label: 'All buying centers' }, ...buyingCenters.map((b) => ({ value: b.buying_center_id, label: b.buying_center_name }))]}
      />
      <Select
        label="Solution"
        value={filters.solutionId}
        onChange={(v) => setFilters((f) => ({ ...f, solutionId: v }))}
        options={[{ value: 'All', label: 'All solutions' }, ...solutions.map((s) => ({ value: s.solution_id, label: s.solution_name }))]}
      />

      {isDirty && (
        <button
          onClick={() => setFilters({ region: 'All', buyingCenterId: 'All', solutionId: 'All' })}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      )}
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-slate-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 bg-white shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
