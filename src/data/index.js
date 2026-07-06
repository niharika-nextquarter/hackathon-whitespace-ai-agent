// Single import surface for mock data. Swap any of these for a real API/agent
// backend call (e.g. `fetch('/api/accounts/:id/whitespace-matrix')`) without
// touching component code — every component below only imports from here.
export { crmAccount } from './crmAccount'
export { buyingCenters } from './buyingCenters'
export { solutions } from './solutions'
export { initiatives } from './initiatives'
export { contracts } from './contracts'
export { productUsage } from './productUsage'
export { orgChart } from './orgChart'
export { techStack } from './techStack'
export { intent } from './intent'
export { firmographics } from './firmographics'
export { dataSources } from './dataSources'
export { matrixCells } from './matrixCells'
export { initialAuditLog } from './auditLog'
export { initialAgentFeed } from './agentFeed'
export { STATUS, STATUS_META } from './statusConfig'
