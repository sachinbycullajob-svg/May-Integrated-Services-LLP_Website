import { StaffApplication } from '../types';

export const STAFF_APPLICATIONS: StaffApplication[] = [
  {
    id: 'listing-tracking-dashboard',
    name: 'Listing Tracking Dashboard (Data Refine OS)',
    shortName: 'Listing Tracking Dashboard',
    url: 'https://data-refine-os.vercel.app/auth/login',
    routePath: '/Listing Tracking Dashboard (Data Refine OS)',
    slug: '/listing-tracking-dashboard',
    description: 'Catalog monitoring, ASIN tracking, and marketplace data refinement engine.',
    category: 'Listing & Intelligence',
    hasFrameRestriction: false,
  },
  {
    id: 'scraper-management',
    name: 'Scraper Management',
    shortName: 'Scraper Management',
    url: 'https://scraper-app-psi.vercel.app/',
    routePath: '/Scraper Management',
    slug: '/scraper-management',
    description: 'Automated marketplace web scraping pipelines and inventory monitoring tools.',
    category: 'Data & Automation',
    hasFrameRestriction: false,
  },
  {
    id: 'hsn-data',
    name: 'HSN Data',
    shortName: 'HSN Data',
    url: 'https://hsn-data.vercel.app/login',
    routePath: '/HSN Data',
    slug: '/hsn-data',
    description: 'Harmonized System of Nomenclature tax classifications and customs database.',
    category: 'Tax & Compliance',
    hasFrameRestriction: false,
  },
  {
    id: 'claim-tracking-system',
    name: 'Claim Tracking System',
    shortName: 'Claim Tracking System',
    url: 'https://claim-ticket-tracking-system.vercel.app/login',
    routePath: '/Claim Tracking System',
    slug: '/claim-tracking-system',
    description: 'Marketplace reimbursement management, ticket resolution, and fee reconciliation.',
    category: 'Operations & Claims',
    hasFrameRestriction: false,
  },
  {
    id: 'dropshipping-operations',
    name: 'Dropshipping Operations',
    shortName: 'Dropshipping Operations',
    url: 'https://sites.google.com/view/dropshipping-operations/dashboard',
    routePath: '/Dropshipping Operations',
    slug: '/dropshipping-operations',
    description: 'International dropship logistics, cross-border vendor order routing and dispatch.',
    category: 'Logistics & Supply Chain',
    hasFrameRestriction: true, // Google Sites enforces X-Frame-Options: DENY
  },
  {
    id: 'amazonrecon',
    name: 'AmazonRecon',
    shortName: 'AmazonRecon',
    url: 'https://amazon-recon-fawn.vercel.app/dashboard',
    routePath: '/AmazonRecon',
    slug: '/amazonrecon',
    description: 'Amazon settlement reconciliation, payment audits, and financial ledger analytics.',
    category: 'Finance & Reconciliation',
    hasFrameRestriction: false,
  },
  {
    id: 'online-seller-internal-tool',
    name: 'Online Seller Internal Tool',
    shortName: 'OSI Tool',
    url: 'https://online-seller-internal-tool.vercel.app/',
    routePath: '/Online Seller Internal Tool',
    slug: '/online-seller-internal-tool',
    description: 'E-commerce MIS web application for internal seller operations and enterprise solutions.',
    category: 'E-Commerce & MIS',
    hasFrameRestriction: false,
  },
  {
    id: 'awbix',
    name: 'Awbix',
    shortName: 'Awbix',
    url: 'https://awbix.vercel.app/',
    routePath: '/Awbix',
    slug: '/awbix',
    description: 'Multi-dimensional reconciliation engine for warehouse tracking, risk radar, and reporting.',
    category: 'Reconciliation & Logistics',
    hasFrameRestriction: false,
  },
];

/**
 * Finds a matching staff application by checking both the exact route path,
 * its slug alias, or a normalized URL path.
 */
export function findStaffAppByPath(pathname: string): StaffApplication | null {
  if (!pathname || pathname === '/' || pathname === '') return null;
  
  const decoded = decodeURIComponent(pathname).trim();
  const normalized = decoded.toLowerCase().replace(/^\/+|\/+$/g, '');
  
  return (
    STAFF_APPLICATIONS.find((app) => {
      const appRouteNorm = app.routePath.toLowerCase().replace(/^\/+|\/+$/g, '');
      const appSlugNorm = app.slug.toLowerCase().replace(/^\/+|\/+$/g, '');
      const appNameNorm = app.name.toLowerCase();
      const appIdNorm = app.id.toLowerCase();
      
      return (
        normalized === appRouteNorm ||
        normalized === appSlugNorm ||
        normalized === appNameNorm ||
        normalized === appIdNorm
      );
    }) || null
  );
}
