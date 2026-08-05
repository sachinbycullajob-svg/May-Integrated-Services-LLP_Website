import {
  Brand, 
  JourneyMilestone, 
  ServiceItem, 
  GlobalHub, 
  ProcessStep, 
  Testimonial,
  JobOpening
} from '../types';

export const COMPANY_INFO = {
  name: 'May Integrated Services LLP',
  shortName: 'May Integrated',
  tagline: 'Global E-Commerce • Marketplace Excellence • AI Operations',
  llpin: 'ACX-9249',
  registrationDate: '6th May 2026',
  roc: 'Registrar of Companies (ROC), Mumbai',
  address: {
    floor: '1st Floor, Plot No.378',
    building: 'Karanjia Building',
    street: 'M.S. Road, Grant Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pincode: '400007',
    fullAddress: '1st Floor, Plot No.378, Karanjia Building, M.S. Road, Grant Road, Mumbai, Maharashtra, India – 400007',
  },
  partners: [
    {
      name: 'Mohammed Yakub Sunesra',
      din: '11702793',
      role: 'Designated Partner & Co-Founder',
      experience: '6+ Years in Global E-Commerce Architecture',
    },
    {
      name: 'Ahmed Yakub Sunesra',
      din: '11702794',
      role: 'Designated Partner & Co-Founder',
      experience: '6+ Years in Marketplace Operations & Growth',
    }
  ],
  experienceYears: 6,
  email: 'info@mayecomm.com',
  phone: '+91 9819568545',
  whatsapp: '919819568545',
  businessHours: 'Monday – Saturday: 10:00 AM – 7:00 PM (IST)',
  social: {
    linkedin: 'https://www.linkedin.com/company/may-integrated-services-llp/',
    twitter: 'https://twitter.com/MayIntegrated',
    instagram: 'https://instagram.com/mayintegrated',
    github: 'https://github.com/mayintegrated',
  },
  stats: {
    experience: '6+',
    brandsCount: '6+',
    countriesServed: '25+',
    marketplaces: '15+',
    orderFulfillment: '99.8%',
  }
};


export const BRANDS: Brand[] = [
  {
    id: 'venus-enterprises',
    name: 'Venus Enterprises',
    year: 2021,
    type: 'In-house Brand',
    category: 'Healthcare & Personal Care',
    description: 'Pioneering healthcare and personal wellness essentials designed for daily reliability and high customer retention.',
    marketplaces: ['Amazon India', 'Flipkart', 'Local Distribution'],
    keyStats: [
      { label: 'Customer Rating', value: '4.8 ★' },
      { label: 'Units Delivered', value: '150K+' }
    ],
    accentColor: 'from-amber-500 to-rose-500',
    iconName: 'HeartHandshake'
  },
  {
    id: 'ideal-cosmo',
    name: 'Ideal Cosmo',
    year: 2021,
    type: 'In-house Brand',
    category: 'Beauty & Cosmetics',
    description: 'Premium cosmetic formulations and skincare tools catering to modern aesthetic and skincare trends.',
    marketplaces: ['Amazon India', 'Flipkart', 'Direct Channels'],
    keyStats: [
      { label: 'Repeat Customers', value: '42%' },
      { label: 'Active SKUs', value: '80+' }
    ],
    accentColor: 'from-pink-500 to-purple-500',
    iconName: 'Sparkles'
  },
  {
    id: 'the-style-studio',
    name: 'The Style Studio',
    year: 2023,
    type: 'In-house Brand',
    category: 'Lifestyle & Accessories',
    description: 'Curated lifestyle products and fashion accessories blending elegant design with ergonomic functionality.',
    marketplaces: ['Amazon Global', 'Flipkart Assured', 'Lifestyle Channels'],
    keyStats: [
      { label: 'Avg Growth Rate', value: '+180%' },
      { label: 'Positive Feedback', value: '98.2%' }
    ],
    accentColor: 'from-indigo-500 to-cyan-500',
    iconName: 'Crown'
  },
  {
    id: 'beauty-mars',
    name: 'Beauty Mars',
    year: 2024,
    type: 'Global Dropshipping',
    category: 'Cross-Border Beauty & Grooming',
    isDropshipping: true,
    description: 'Rapidly scaling international beauty dropshipping brand serving cross-border consumers with fast dispatch and viral items.',
    marketplaces: ['Amazon US', 'Amazon EU', 'International Marketplaces'],
    keyStats: [
      { label: 'Countries Served', value: '18+' },
      { label: 'Global Fulfillment', value: 'Fast Express' }
    ],
    accentColor: 'from-rose-500 to-violet-600',
    iconName: 'Globe2'
  },
  {
    id: 'may-global-ventures',
    name: 'May Global Ventures',
    year: 2025,
    type: 'Enterprise Venture',
    category: 'Global Wholesale & Consumer Goods',
    description: 'Enterprise umbrella division managing strategic marketplace partnerships, bulk procurement, and international logistics.',
    marketplaces: ['Amazon US', 'Amazon UAE', 'Cross-Border B2B'],
    keyStats: [
      { label: 'Partner Brands', value: '12+' },
      { label: 'Logistics SLA', value: '99.5%' }
    ],
    accentColor: 'from-blue-600 to-emerald-500',
    iconName: 'Building2'
  },
  {
    id: 'true-value-cart',
    name: 'True Value Cart',
    year: 2026,
    type: 'Global Dropshipping',
    category: 'Consumer Electronics & Daily Essentials',
    isDropshipping: true,
    description: 'High-volume cross-border e-commerce storefront bringing high-utility consumer products directly to worldwide shoppers.',
    marketplaces: ['Amazon Global', 'Cross-Border Portals', 'Direct Channels'],
    keyStats: [
      { label: 'Order Dispatch', value: '<24 Hours' },
      { label: 'Catalog Size', value: '1,200+ Items' }
    ],
    accentColor: 'from-emerald-500 to-cyan-500',
    iconName: 'ShoppingCart'
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: 2021,
    title: 'Foundational Market Launch',
    subtitle: 'Venus Enterprises & Ideal Cosmo',
    description: 'Began strategic e-commerce operations in India, launching Venus Enterprises in Healthcare and Ideal Cosmo in Beauty.',
    brandsAdded: ['Venus Enterprises', 'Ideal Cosmo'],
    highlights: ['Achieved top seller badge on Amazon India', 'Setup local fulfillment nodes', 'Expanded product portfolio to 50+ items'],
    icon: 'Rocket'
  },
  {
    year: 2023,
    title: 'Lifestyle Category Expansion',
    subtitle: 'The Style Studio',
    description: 'Launched The Style Studio to capture the booming fashion and lifestyle market with high-converting listings.',
    brandsAdded: ['The Style Studio'],
    highlights: ['Omni-channel presence across Flipkart & Amazon', 'Built automated inventory reordering scripts', 'Exceeded 100K order milestone'],
    icon: 'TrendingUp'
  },
  {
    year: 2024,
    title: 'International Dropshipping Pivot',
    subtitle: 'Beauty Mars',
    description: 'Expanded beyond regional borders by launching Beauty Mars, a dedicated global dropshipping brand for beauty products.',
    brandsAdded: ['Beauty Mars (Global Dropshipping)'],
    highlights: ['Entered US & European Amazon marketplaces', 'Cross-border express shipment integration', '24/7 global customer support desk'],
    icon: 'Globe'
  },
  {
    year: 2025,
    title: 'Enterprise Wholesale & Trade',
    subtitle: 'May Global Ventures',
    description: 'Established May Global Ventures to manage international distribution, B2B wholesale, and multi-currency marketplace accounts.',
    brandsAdded: ['May Global Ventures'],
    highlights: ['Middle East & UAE expansion', 'Multi-warehouse logistics alignment', 'Advanced PPC & AI ad bidding'],
    icon: 'ShieldCheck'
  },
  {
    year: 2026,
    title: 'Formal Incorporation as May Integrated Services LLP',
    subtitle: 'True Value Cart & Corporate Consolidation',
    description: 'Formally incorporated as May Integrated Services LLP (LLPIN: ACX-9249) with ROC Mumbai, consolidating all 6 brands under unified leadership and launching True Value Cart.',
    brandsAdded: ['May Integrated Services LLP', 'True Value Cart'],
    highlights: ['LLP Registration with ROC Mumbai', 'Launch of True Value Cart global brand', 'Implementation of Vibe Coding & AI automation tools'],
    icon: 'Award'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'global-management',
    title: 'Global Marketplace Management',
    category: 'Marketplace',
    shortDesc: 'End-to-end account management across Amazon, Flipkart, and international marketplaces.',
    fullDesc: 'Complete management of multi-region seller accounts including registration, brand registry, health maintenance, buy-box protection, and policy compliance.',
    features: ['Account Health Audits', 'Brand Registry Setup', 'Multi-Region Expansion', 'Policy Defense'],
    iconName: 'Globe2',
    stats: '15+ Channels'
  },
  {
    id: 'amazon-management',
    title: 'Amazon Marketplace Mastery',
    category: 'Marketplace',
    shortDesc: 'Deep specialization in Amazon FBA, FBM, Sponsored Ads, and Brand Storefronts.',
    fullDesc: 'We maximize sales velocity on Amazon India, US, UK, UAE, and EU through scientific ranking tactics, FBA inventory optimization, and PPC campaigns.',
    features: ['Amazon FBA Planning', 'A+ Enhanced Content', 'Sponsored Ads Optimization', 'Buy Box Retention'],
    iconName: 'ShoppingBag',
    stats: '99.2% Buy Box Rate'
  },
  {
    id: 'flipkart-management',
    title: 'Flipkart Marketplace Scaling',
    category: 'Marketplace',
    shortDesc: 'Dedicated growth strategies for Flipkart Assured, Smart Fulfillment, and Big Savings events.',
    fullDesc: 'Strategic management on Flipkart featuring keyword optimization, flash deal participation, smart fulfillment setups, and express seller tier management.',
    features: ['Flipkart Assured Tagging', 'Big Billion Days Prep', 'Smart Fulfillment', 'Ad Spend ROI'],
    iconName: 'Zap',
    stats: 'Top Tier Seller'
  },
  {
    id: 'cross-border',
    title: 'Cross-Border E-Commerce',
    category: 'Logistics',
    shortDesc: 'Seamless international selling across North America, Europe, Asia, and Middle East.',
    fullDesc: 'Empowering domestic brands to sell internationally with automated currency conversion, international duty compliance, and local returns handling.',
    features: ['International Duty Clearance', 'Multi-Currency Settlement', 'Global Freight Logistics', 'Overseas Returns'],
    iconName: 'Ship',
    stats: '25+ Countries'
  },
  {
    id: 'dropshipping',
    title: 'International Dropshipping Operations',
    category: 'Logistics',
    shortDesc: 'Scalable dropshipping infrastructure for beauty, healthcare, and consumer goods.',
    fullDesc: 'High-speed cross-border dropshipping with direct-from-factory sourcing, 24-hour dispatch SLAs, and real-time package tracking integrations.',
    features: ['24h Order Dispatch', 'Global Express Tracking', 'Supplier Quality Audits', 'Zero Stock Risk'],
    iconName: 'PlaneTakeoff',
    stats: '<24h Dispatch'
  },
  {
    id: 'inventory-management',
    title: 'Smart Inventory & Supply Chain',
    category: 'Logistics',
    shortDesc: 'AI-assisted demand forecasting, reorder triggers, and multi-node warehouse sync.',
    fullDesc: 'Prevent stockouts and costly overstock fees with predictive inventory algorithms, automated purchase orders, and multi-location warehouse sync.',
    features: ['Predictive Forecasting', 'Multi-Warehouse Sync', 'FBA Storage Fee Defense', 'Batch Expiry Control'],
    iconName: 'Boxes',
    stats: '99.8% In-Stock Rate'
  },
  {
    id: 'listing-optimization',
    title: 'Listing Optimization & SEO',
    category: 'Optimization & Marketing',
    shortDesc: 'High-converting titles, bullet points, keyword indexing, and A+ premium visual design.',
    fullDesc: 'Turn impressions into sales with search-optimized copy, 3D infographic visuals, video scripts, and structured backend search terms.',
    features: ['Keyword Indexing', 'High-CTR Visuals', 'A+ Premium Content', 'Conversion Rate Audits'],
    iconName: 'FileText',
    stats: '+35% Avg Conversion'
  },
  {
    id: 'marketplace-advertising',
    title: 'Marketplace PPC & Advertising',
    category: 'Optimization & Marketing',
    shortDesc: 'Data-driven Amazon PPC, Sponsored Products, Display, and Video Ad Management.',
    fullDesc: 'Maximize return on ad spend (ROAS) while lowering ACoS (Advertising Cost of Sales) using algorithmic keyword bidding and negative keyword pruning.',
    features: ['Targeted Keyword Bidding', 'ACoS Reduction', 'Sponsored Brand Video', 'Retargeting Campaigns'],
    iconName: 'BarChart3',
    stats: '4.2x Avg ROAS'
  },
  {
    id: 'customer-support',
    title: '24/7 Global Customer Care',
    category: 'Optimization & Marketing',
    shortDesc: 'Omni-channel multilingual buyer support ensuring high seller feedback ratings.',
    fullDesc: 'Proactive customer service handling buyer messages, return authorizations, feedback removal requests, and warranty support across global marketplaces.',
    features: ['Instant Response Times', 'Negative Feedback Removal', 'Multilingual Support', 'Return Management'],
    iconName: 'Headphones',
    stats: '<15 Min Response'
  },
  {
    id: 'ai-automation',
    title: 'AI & Vibe Code Automation',
    category: 'Tech & AI',
    shortDesc: 'Custom AI bots, automated scripts, and vibe-coded internal tools built in-house.',
    fullDesc: 'Leveraging cutting-edge AI coding and automated scripts built by our Vibe Coders to automate daily price tracking, catalog generation, and error alerts.',
    features: ['Custom Vibe Coded Bots', 'Automated Price Monitoring', 'AI Listing Generators', 'ERP Integrations'],
    iconName: 'Cpu',
    stats: '100+ Hours Saved/Mo'
  },
  {
    id: 'data-analytics',
    title: 'Advanced Data Analytics',
    category: 'Tech & AI',
    shortDesc: 'Real-time sales dashboards, profit margin tracking, and market trend forecasts.',
    fullDesc: 'Gain full clarity on true net margins, SKU performance, advertising attribution, and market demand through custom analytics dashboards.',
    features: ['Net Profit Dashboards', 'SKU Margin Analysis', 'Competitor Price Tracking', 'Trend Forecasting'],
    iconName: 'LineChart',
    stats: 'Real-Time Insights'
  },
  {
    id: 'business-consulting',
    title: 'E-Commerce Business Advisory',
    category: 'Tech & AI',
    shortDesc: 'Strategic consulting for brand building, ROC compliance, and global scaling.',
    fullDesc: 'Advisory services for emerging brands seeking to navigate corporate registration, international tax structures, marketplace licensing, and venture growth.',
    features: ['ROC & Tax Compliance', 'Brand Valuation Prep', 'Supply Chain Advisory', 'International Licensing'],
    iconName: 'Briefcase',
    stats: 'Enterprise Advisory'
  }
];

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'mumbai-hq',
    city: 'Mumbai',
    country: 'India',
    coordinates: { x: 68, y: 52 },
    lat: 18.96,
    lng: 72.82,
    type: 'Headquarters',
    details: 'May Integrated Services LLP Registered Office & Operations Command Center (ROC Mumbai ACX-9249).',
    marketplaces: ['Amazon India', 'Flipkart', 'Domestic Channels']
  },
  {
    id: 'us-east',
    city: 'New York / Texas',
    country: 'United States',
    coordinates: { x: 24, y: 36 },
    lat: 40.71,
    lng: -74.00,
    type: 'Distribution Hub',
    details: 'Primary US Amazon FBA & Dropshipping fulfillment link for Beauty Mars and True Value Cart.',
    marketplaces: ['Amazon.com', 'Walmart US', 'Etsy US']
  },
  {
    id: 'london-uk',
    city: 'London',
    country: 'United Kingdom',
    coordinates: { x: 47, y: 28 },
    lat: 51.50,
    lng: -0.12,
    type: 'Marketplace Region',
    details: 'European hub serving UK, Germany, France, Italy, and Spain shoppers.',
    marketplaces: ['Amazon UK', 'Amazon DE', 'Amazon FR']
  },
  {
    id: 'dubai-uae',
    city: 'Dubai',
    country: 'UAE',
    coordinates: { x: 60, y: 46 },
    lat: 25.20,
    lng: 55.27,
    type: 'Logistics Node',
    details: 'Middle East fulfillment and Amazon.ae distribution portal under May Global Ventures.',
    marketplaces: ['Amazon UAE', 'Noon.com']
  },
  {
    id: 'tokyo-jp',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 86, y: 38 },
    lat: 35.67,
    lng: 139.65,
    type: 'Marketplace Region',
    details: 'Asia-Pacific cross-border sales channel targeting high-value beauty consumers.',
    marketplaces: ['Amazon Japan', 'Rakuten']
  },
  {
    id: 'sydney-au',
    city: 'Sydney',
    country: 'Australia',
    coordinates: { x: 88, y: 78 },
    lat: -33.86,
    lng: 151.20,
    type: 'Distribution Hub',
    details: 'Oceania marketplace reach with direct air cargo logistics from Asian nodes.',
    marketplaces: ['Amazon AU', 'Catch.com.au']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Product & Market Research',
    subtitle: 'Data-Driven Opportunity Discovery',
    description: 'We analyze global market demand, search volume, competitor pricing, and profit margins using proprietary research algorithms.',
    tools: ['Helium 10', 'Jungle Scout', 'Custom AI Vibe Scrapers', 'Google Trends'],
    iconName: 'Search'
  },
  {
    stepNumber: 2,
    title: 'Strategic Procurement',
    subtitle: 'Verified Quality Sourcing',
    description: 'Vetted manufacturer partnerships and direct factory sourcing ensuring rigid quality control and competitive pricing.',
    tools: ['Factory QC Audits', 'ISO Standards', 'Sample Testing', 'Batch Tracking'],
    iconName: 'ShieldCheck'
  },
  {
    stepNumber: 3,
    title: 'Listing Optimization',
    subtitle: 'High-Converting Catalog Creation',
    description: 'Creating high-converting product pages with 3D graphic renders, keyword-stuffed indexing, and A+ Brand Story layouts.',
    tools: ['A+ Content', 'Photoshop 3D', 'SEO Indexer', 'Copywriting AI'],
    iconName: 'Layout'
  },
  {
    stepNumber: 4,
    title: 'Targeted Marketing',
    subtitle: 'PPC & Growth Engine',
    description: 'Launching multi-campaign ad structures (Sponsored Products, Video Ads, Display) to capture top-of-search placement.',
    tools: ['Amazon Ads API', 'PPC Bidding Algorithms', 'Social Retargeting'],
    iconName: 'TrendingUp'
  },
  {
    stepNumber: 5,
    title: 'Fulfillment & Logistics',
    subtitle: 'Global Express Dispatch',
    description: 'Seamless order routing through Amazon FBA, Smart Fulfillment, or 24h Express Cross-Border Dropshipping lines.',
    tools: ['Amazon FBA', 'Flipkart Smart', 'DHL Express', 'FedEx Cross-Border'],
    iconName: 'Truck'
  },
  {
    stepNumber: 6,
    title: '24/7 Customer Support',
    subtitle: 'Proactive Rating Protection',
    description: 'Round-the-clock customer care desk keeping seller feedback at 99%+ positive and handling return inquiries swiftly.',
    tools: ['Zendesk Desk', 'Seller Central Desk', 'WhatsApp Care Bot'],
    iconName: 'HeartHandshake'
  },
  {
    stepNumber: 7,
    title: 'Scaling & AI Automation',
    subtitle: 'Vibe Coded Expansion',
    description: 'Deploying custom vibe-coded tools to automate repetitive inventory tasks, margin reports, and international expansion.',
    tools: ['Vibe Code Bots', 'Real-Time Profit Dashboards', 'Auto Reorder Engine'],
    iconName: 'Sparkles'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientName: 'Alexander Wright',
    company: 'Apex Global Logistics LLC',
    role: 'Managing Director',
    country: 'United States',
    comment: 'May Integrated Services LLP has been an exceptional partner for our cross-border logistics. Their team’s speed, precision, and marketplace expertise in managing Amazon US listings are truly world-class.',
    rating: 5,
    marketplace: 'Amazon US & Global',
    date: 'June 2026'
  },
  {
    id: '2',
    clientName: 'Priya Sharma',
    company: 'CosmoAura India',
    role: 'Head of Brand Operations',
    country: 'India',
    comment: 'Working with May Integrated’s team transformed our brand metrics on Flipkart and Amazon India. Their listing optimization and A+ content designs elevated our conversion rate by over 40%.',
    rating: 5,
    marketplace: 'Amazon India & Flipkart',
    date: 'May 2026'
  },
  {
    id: '3',
    clientName: 'Julian Vance',
    company: 'Vance Ecommerce Group',
    role: 'Chief Supply Chain Officer',
    country: 'United Kingdom',
    comment: 'Their international dropshipping brand Beauty Mars and fulfillment response speed are top tier. Alamgir and the IT team handle global inquiries with remarkable professionalism.',
    rating: 5,
    marketplace: 'Cross-Border Europe',
    date: 'April 2026'
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior E-Commerce Growth Specialist',
    department: 'Marketplace Operations',
    type: 'Full-time',
    location: 'Mumbai Office / Hybrid',
    description: 'Drive sales strategy, buy-box algorithms, and international marketplace launches for our in-house brands.',
    requirements: [
      '3+ years experience with Amazon FBA / Flipkart seller portals',
      'Proficiency in PPC advertising and ACoS optimization',
      'Strong data analytics background'
    ]
  },
  {
    id: 'job-2',
    title: 'AI Vibe Coder & Automation Engineer',
    department: 'Tech & Data',
    type: 'Full-time',
    location: 'Mumbai Office / Remote',
    description: 'Build custom AI scripts, web scrapers, and internal workflow bots using modern Vibe Coding techniques and LLM APIs.',
    requirements: [
      'Hands-on experience with TypeScript, Python, and AI Studio / LLM APIs',
      'Ability to build fast internal dashboards and automated tools',
      'Passionate about e-commerce automation'
    ]
  },
  {
    id: 'job-3',
    title: 'Customer Experience Executive (Global)',
    department: 'Support',
    type: 'Full-time',
    location: 'Mumbai Office',
    description: 'Provide round-the-clock customer support for overseas buyers across Amazon US, UK, and UAE portals.',
    requirements: [
      'Excellent written English communication skills',
      'Familiarity with Amazon Buyer-Seller Messaging system',
      'Problem-solving mindset'
    ]
  }
];
