import { Download } from 'lucide-react'
import { buildQbrExport, downloadTextFile } from '../utils/exportSummary'

export default function ExportButton({ account, buyingCenters, solutions, cells, stats }) {
  return (
    <button
      onClick={() => {
        const md = buildQbrExport({ account, buyingCenters, solutions, cells, stats })
        downloadTextFile(`${account.account_name.replace(/\s+/g, '-')}-whitespace-qbr.md`, md)
      }}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
    >
      <Download className="h-3.5 w-3.5" /> Export for QBR
    </button>
  )
}
