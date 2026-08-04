export type ThemeMode = 'dark' | 'light';

export type PageView = 
  | 'home' 
  | 'about' 
  | 'brands' 
  | 'services' 
  | 'team' 
  | 'global' 
  | 'careers' 
  | 'contact';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Executive' | 'Tech & Data' | 'Support' | 'Design & Content' | 'Finance';
  isVibeCoder?: boolean;
  avatar: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  email?: string;
}

export interface Brand {
  id: string;
  name: string;
  year: number;
  type: 'In-house Brand' | 'Global Dropshipping' | 'Enterprise Venture';
  category: string;
  description: string;
  marketplaces: string[];
  keyStats: {
    label: string;
    value: string;
  }[];
  accentColor: string;
  iconName: string;
  isDropshipping?: boolean;
}

export interface JourneyMilestone {
  year: number;
  title: string;
  subtitle: string;
  description: string;
  brandsAdded: string[];
  highlights: string[];
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Marketplace' | 'Logistics' | 'Optimization & Marketing' | 'Tech & AI';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  iconName: string;
  stats: string;
}

export interface GlobalHub {
  id: string;
  city: string;
  country: string;
  coordinates: { x: number; y: number }; // percentage on map
  lat: number;
  lng: number;
  type: 'Headquarters' | 'Distribution Hub' | 'Marketplace Region' | 'Logistics Node';
  details: string;
  marketplaces: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  country: string;
  comment: string;
  rating: number;
  marketplace: string;
  date: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Remote' | 'Hybrid';
  location: string;
  description: string;
  requirements: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  tags: string[];
}
