import { STATUS } from '../data/statusConfig'

// Coverage = share of addressable cells (i.e. not Not Applicable) that are
// Won/Active. Whitespace-mapped = share of addressable cells that have been
// assessed at all (everything except untouched whitespace with no signal).
export function computeCoverageStats(cells) {
  const addressable = cells.filter((c) => c.status !== STATUS.not_applicable)
  const won = addressable.filter((c) => c.status === STATUS.won)
  const whitespace = addressable.filter((c) => c.status === STATUS.whitespace)
  const suggestions = cells.filter((c) => c.suggestion && c.suggestion.type === 'suggestion' && c.suggestion.review_status === 'pending')
  const conflicts = cells.filter((c) => c.suggestion && c.suggestion.type === 'conflict' && c.suggestion.review_status === 'pending')

  const mappedPct = addressable.length
    ? Math.round(((addressable.length - whitespace.length) / addressable.length) * 100)
    : 0
  const coveragePct = addressable.length ? Math.round((won.length / addressable.length) * 100) : 0

  const wonArr = won.reduce((sum, c) => sum + (c.arr || 0), 0)
  const whitespaceArr = whitespace.reduce((sum, c) => sum + (c.arr || 0), 0)

  return {
    mappedPct,
    coveragePct,
    pendingSuggestions: suggestions.length,
    pendingConflicts: conflicts.length,
    wonArr,
    whitespaceArr,
    totalAddressable: addressable.length,
  }
}
