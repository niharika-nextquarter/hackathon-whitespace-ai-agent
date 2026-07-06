// Source family: CRM Account (input account)
// In production this record is pulled live from the CRM Account API on session load.
export const crmAccount = {
  account_id: 'ACC-10493',
  parent_account_id: null,
  account_name: 'Meridian Health Systems',
  website_domain: 'meridianhealth.com',
  HQ_country: 'United States',
  segment: 'Enterprise / Healthcare',
  territory: 'AMER - East',
  owner: 'Dana Whitfield (Account Executive)',
  install_base: ['Platform Core', 'Integration Hub'],
  competitor_flags: [
    'Veridian Analytics — active in Finance (Analytics Cloud)',
    'SentriGuard — active in IT & Security (Security & Compliance Suite)',
  ],
  // Fields below round out the account-context header; in a real CRM these
  // live on the Account or a linked Renewal/Forecast object.
  tier: 'Tier 1 — Strategic',
  total_arr: 2450000,
  renewal_date: '2026-11-30',
  logo_initials: 'MH',
}
