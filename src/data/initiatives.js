// Source family: CRM Opportunity (Initiatives)
export const initiatives = [
  {
    initiative_id: 'INIT-3301',
    initiative_name: 'IT Copilot Pilot Expansion',
    description: 'IT flagged interest in extending the AI Copilot pilot from the service desk team to all of infrastructure after early triage-time gains.',
    rec: 'Propose AI Copilot — IT & Infrastructure at 82% confidence based on pilot results referenced in the last two QBR calls.',
    citations: ['Call transcript — QBR 2026-06-18', 'Call transcript — Technical Deep Dive 2026-06-25'],
  },
  {
    initiative_id: 'INIT-3288',
    initiative_name: 'Procurement RFP — Vendor Connectivity',
    description: 'Procurement issued an internal RFP for a unified vendor data exchange layer after two failed manual reconciliation cycles.',
    rec: 'Propose Integration Hub — Procurement at 91% confidence; RFP language matches Integration Hub connector capabilities almost verbatim.',
    citations: ['Procurement RFP doc — VendorConnect-2026', 'Intent table — RFP-related search surge'],
  },
  {
    initiative_id: 'INIT-3315',
    initiative_name: 'Operations AI Triage Rollout',
    description: 'Operations leadership referenced AI Copilot in EMEA facilities as already resolving intake ticket backlog.',
    rec: 'Upgrade AI Copilot — Operations from In Progress to Won/Active at 88% confidence based on usage data.',
    citations: ['Product Usage — customer_solved_challenges log', 'Call transcript — Ops Steering Committee 2026-06-30'],
  },
  {
    initiative_id: 'INIT-3266',
    initiative_name: 'Finance Platform Renewal',
    description: 'Finance renewed Platform Core for another 24 months in Q2, but a separate support call referenced budget conversations with a competitor.',
    rec: 'Flag conflict: renewal signals stability, but a call transcript suggests active competitor evaluation. Do not auto-resolve.',
    citations: ['CRM Opportunity — Platform Core Renewal (Closed Won)', 'Call transcript — Finance Check-in 2026-06-29'],
  },
  {
    initiative_id: 'INIT-3299',
    initiative_name: 'Security RFP Signal',
    description: 'Security & Risk posted three security engineering roles and initiated an internal RFP referencing compliance automation.',
    rec: 'Propose status change on Security & Compliance Suite — Security & Risk from Competitor Held to In Progress at 76% confidence.',
    citations: ['Firmographics — hiring spike', 'Firmographics — RFP activity'],
  },
]
