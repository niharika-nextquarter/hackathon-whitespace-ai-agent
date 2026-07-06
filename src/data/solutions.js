// Source family: CRM Product Catalog (Solutions)
export const solutions = [
  {
    solution_id: 'SOL-CORE',
    solution_name: 'Platform Core',
    parent_solution_id: null,
    is_parent: true,
    description: 'Foundational workflow and record-keeping platform.',
    associated_products: ['Core Suite', 'Workflow Engine'],
  },
  {
    solution_id: 'SOL-ANALYTICS',
    solution_name: 'Analytics Cloud',
    parent_solution_id: null,
    is_parent: false,
    description: 'BI, dashboards, and predictive reporting across departments.',
    associated_products: ['Insights Studio', 'Reporting Engine'],
  },
  {
    solution_id: 'SOL-SECURITY',
    solution_name: 'Security & Compliance Suite',
    parent_solution_id: null,
    is_parent: false,
    description: 'Access governance, threat monitoring, and audit-ready compliance controls.',
    associated_products: ['Threat Monitor', 'Access Governance'],
  },
  {
    solution_id: 'SOL-INTEGRATION',
    solution_name: 'Integration Hub',
    parent_solution_id: 'SOL-CORE',
    is_parent: false,
    description: 'API gateway and pre-built connectors for third-party and legacy systems.',
    associated_products: ['API Gateway', 'Data Connectors'],
  },
  {
    solution_id: 'SOL-COPILOT',
    solution_name: 'AI Copilot',
    parent_solution_id: 'SOL-CORE',
    is_parent: false,
    description: 'Generative-AI assistant embedded in workflows for drafting, triage, and summarization.',
    associated_products: ['Copilot for Ops', 'Copilot for Support'],
  },
]
