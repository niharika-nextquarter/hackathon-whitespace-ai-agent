import { STATUS_META } from '../data/statusConfig'
import { StatusIcon } from './icons'
import MatrixCell from './MatrixCell'

export default function WhitespaceMatrix({ buyingCenters, solutions, cells, onCellClick, scenario }) {
  const cellMap = new Map(cells.map((c) => [c.id, c]))
  const maxArr = Math.max(...cells.map((c) => c.arr || 0), 1)

  return (
    <div className="p-6">
      <div className="overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="border-collapse w-full min-w-[760px]">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200 p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-48">
                Buying Center
              </th>
              {solutions.map((s) => (
                <th key={s.solution_id} className="bg-slate-50 border-b border-slate-200 p-3 text-left text-xs font-semibold text-slate-600 min-w-[150px]">
                  {s.solution_name}
                  <div className="text-[10px] font-normal text-slate-400 normal-case mt-0.5">{s.associated_products.join(' · ')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buyingCenters.map((bc) => (
              <tr key={bc.buying_center_id}>
                <th className="sticky left-0 z-10 bg-white border-r border-b border-slate-200 p-3 text-left align-top w-48">
                  <div className="text-sm font-semibold text-slate-800">{bc.buying_center_name}</div>
                  <div className="text-[11px] text-slate-400">{bc.geography}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{bc.budget_owner_name}</div>
                  <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                    {bc.buying_potential} potential
                  </span>
                </th>
                {solutions.map((s) => {
                  const cell = cellMap.get(`${bc.buying_center_id}__${s.solution_id}`)
                  if (!cell) return <td key={s.solution_id} className="border-b border-slate-100 p-1.5" />
                  const isScenarioTarget = scenario?.active && scenario.buying_center_id === bc.buying_center_id && scenario.solution_id === s.solution_id
                  return (
                    <td key={s.solution_id} className="border-b border-slate-100 p-1.5 align-top">
                      <MatrixCell
                        cell={cell}
                        maxArr={maxArr}
                        isScenarioTarget={isScenarioTarget}
                        onClick={() => onCellClick(cell, bc, s)}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MatrixLegend />
    </div>
  )
}

function MatrixLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-slate-500">
      {Object.entries(STATUS_META).map(([key, meta]) => (
        <div key={key} className="flex items-center gap-1.5">
          <StatusIcon name={meta.icon} className={`h-3.5 w-3.5 ${meta.text}`} />
          {meta.label}
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" /> Pending AI suggestion
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" /> Conflict flagged
      </div>
    </div>
  )
}
