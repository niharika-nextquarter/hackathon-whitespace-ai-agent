// Central status vocabulary for the Buying Centers x Solutions matrix.
// Swap `color`/`icon` tokens here to re-theme the whole matrix in one place.
export const STATUS = {
  won: 'won',
  in_progress: 'in_progress',
  competitor_held: 'competitor_held',
  whitespace: 'whitespace',
  not_applicable: 'not_applicable',
}

export const STATUS_META = {
  won: {
    label: 'Won / Active',
    short: 'Won',
    icon: 'CheckCircle2',
    swatch: 'bg-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    ring: 'ring-emerald-400',
  },
  in_progress: {
    label: 'In Progress',
    short: 'In Progress',
    icon: 'Clock3',
    swatch: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    ring: 'ring-amber-400',
  },
  competitor_held: {
    label: 'Competitor Held',
    short: 'Competitor',
    icon: 'ShieldAlert',
    swatch: 'bg-rose-500',
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    ring: 'ring-rose-400',
  },
  whitespace: {
    label: 'Whitespace (Opportunity)',
    short: 'Whitespace',
    icon: 'Sparkles',
    swatch: 'bg-sky-500',
    text: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-300',
    ring: 'ring-sky-400',
  },
  not_applicable: {
    label: 'Not Applicable',
    short: 'N/A',
    icon: 'Minus',
    swatch: 'bg-slate-300',
    text: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    ring: 'ring-slate-300',
  },
}
