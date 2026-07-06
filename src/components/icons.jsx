// Central icon lookup so status/config data can reference icons by name
// (statusConfig.js) without components importing lucide-react everywhere.
import {
  CheckCircle2,
  Clock3,
  ShieldAlert,
  Sparkles,
  Minus,
} from 'lucide-react'

export const ICONS = {
  CheckCircle2,
  Clock3,
  ShieldAlert,
  Sparkles,
  Minus,
}

export function StatusIcon({ name, className }) {
  const Cmp = ICONS[name] || Minus
  return <Cmp className={className} />
}
