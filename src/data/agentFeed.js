// Seed narration for the persistent Agent panel, newest first. App.jsx
// prepends new entries at runtime as suggestions are generated or reviewed.
export const initialAgentFeed = [
  {
    id: 'MSG-001',
    timestamp: '2026-07-06T08:16:00Z',
    kind: 'summary',
    text: 'Analyzed 3 new call transcripts, 1 RFP document, and the latest Firmographics + Intent feeds → proposing 4 cell updates → 2 conflicts flagged.',
  },
  {
    id: 'MSG-002',
    timestamp: '2026-07-06T08:15:30Z',
    kind: 'suggestion',
    text: 'Procurement is showing strong intent-data and RFP alignment with Integration Hub. Staged a suggestion at 91% confidence.',
    ref: 'SUG-02',
  },
  {
    id: 'MSG-003',
    timestamp: '2026-07-05T14:03:00Z',
    kind: 'suggestion',
    text: 'IT’s Copilot pilot keeps coming up positively in QBR calls. Staged a suggestion to move it into In Progress.',
    ref: 'SUG-01',
  },
  {
    id: 'MSG-004',
    timestamp: '2026-07-05T09:31:00Z',
    kind: 'suggestion',
    text: 'Operations usage data on AI Copilot is strong enough that I think this should already be Won/Active — staged for your review.',
    ref: 'SUG-03',
  },
  {
    id: 'MSG-005',
    timestamp: '2026-07-04T11:21:00Z',
    kind: 'conflict',
    text: 'Heads up — Operations shows Integration Hub as Won/Active, but IT’s tech stack feed shows a competing tool in proof-of-concept. Flagging as a conflict rather than guessing.',
    ref: 'CONF-02',
  },
  {
    id: 'MSG-006',
    timestamp: '2026-07-03T13:06:00Z',
    kind: 'suggestion',
    text: 'Security & Risk is hiring security engineers and drafting a compliance RFP — classic signals the SentriGuard relationship may be loosening. Staged a suggestion.',
    ref: 'SUG-04',
  },
  {
    id: 'MSG-007',
    timestamp: '2026-07-01T17:41:00Z',
    kind: 'conflict',
    text: 'This one needs a human: Finance just renewed Platform Core, but a check-in call two weeks later mentions benchmarking alternatives. I’m not resolving this on my own.',
    ref: 'CONF-01',
  },
]
