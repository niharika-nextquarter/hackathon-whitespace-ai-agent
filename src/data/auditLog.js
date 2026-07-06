// Seed events for the Activity / Audit Log, newest first. New entries are
// prepended at runtime by App.jsx whenever the agent proposes something or a
// reviewer acts, so the most recent activity always stays on top.
export const initialAuditLog = [
  {
    id: 'LOG-001',
    timestamp: '2026-07-06T08:15:00Z',
    actor: 'Whitespace Agent',
    actor_type: 'agent',
    action: 'Analyzed intent surge + Procurement RFP doc',
    detail: 'Proposed Integration Hub — Procurement: Whitespace → In Progress (91% confidence).',
  },
  {
    id: 'LOG-002',
    timestamp: '2026-07-05T14:02:00Z',
    actor: 'Whitespace Agent',
    actor_type: 'agent',
    action: 'Analyzed 2 QBR call transcripts',
    detail: 'Proposed AI Copilot — IT & Infrastructure: Whitespace → In Progress (82% confidence).',
  },
  {
    id: 'LOG-003',
    timestamp: '2026-07-05T09:30:00Z',
    actor: 'Whitespace Agent',
    actor_type: 'agent',
    action: 'Analyzed Product Usage log + Ops Steering Committee call',
    detail: 'Proposed AI Copilot — Operations: In Progress → Won/Active (88% confidence).',
  },
  {
    id: 'LOG-004',
    timestamp: '2026-07-04T11:20:00Z',
    actor: 'Whitespace Agent',
    actor_type: 'agent',
    action: 'Cross-checked Tech Stack feed against CRM Opportunity',
    detail: 'Flagged CONFLICT on Integration Hub — Operations: CRM shows Won/Active, Tech Stack shows a competing iPaaS PoC underway.',
  },
  {
    id: 'LOG-005',
    timestamp: '2026-07-03T13:05:00Z',
    actor: 'Whitespace Agent',
    actor_type: 'agent',
    action: 'Analyzed Firmographics feed (hiring spikes, RFP activity)',
    detail: 'Proposed Security & Compliance Suite — Security & Risk: Competitor Held → In Progress (76% confidence).',
  },
  {
    id: 'LOG-006',
    timestamp: '2026-07-01T17:40:00Z',
    actor: 'Whitespace Agent',
    actor_type: 'agent',
    action: 'Cross-checked Finance renewal against recent call transcript',
    detail: 'Flagged CONFLICT on Platform Core — Finance: CRM shows Closed Won renewal, call transcript implies active competitor evaluation.',
  },
  {
    id: 'LOG-007',
    timestamp: '2026-06-30T18:00:00Z',
    actor: 'System',
    actor_type: 'system',
    action: 'Nightly sync completed',
    detail: 'Refreshed CRM Account, CRM Opportunity, and Product Usage feeds. Firmographics feed failed (see Data Ingestion panel).',
  },
]
