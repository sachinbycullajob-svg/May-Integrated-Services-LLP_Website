import React from 'react';
import { PageView, ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe2, 
  ShoppingBag, 
  TrendingUp, 
  Zap, 
  Sparkles,
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: PageView) => void;
  themeMode: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, themeMode }) => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800 text-beige-200' : 'bg-beige-100 border-beige-300 text-maroon-800'
          }`}>
            <ShieldCheck className="w-4 h-4 text-maroon-600" />
            <span>LLPIN: {COMPANY_INFO.llpin}</span>
          </div>

          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800 text-beige-200' : 'bg-beige-100 border-beige-300 text-maroon-800'
          }`}>
            <Award className="w-4 h-4 text-maroon-600" />
            <span>6+ Years E-Commerce Excellence</span>
          </div>

          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800 text-beige-200' : 'bg-beige-100 border-beige-300 text-maroon-800'
          }`}>
            <Globe2 className="w-4 h-4 text-maroon-600" />
            <span>25+ Global Marketplaces</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] ${
            themeMode === 'dark' ? 'text-white' : 'text-maroon-950'
          }`}>
            Architecting the Future of <br className="hidden sm:block" />
            <span className="text-maroon-600 dark:text-maroon-500">
              Global E-Commerce
            </span>{' '}
            & Trade
          </h1>

          <p className={`text-base sm:text-xl leading-relaxed max-w-2xl mx-auto ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <strong>May Integrated Services LLP</strong> is a premier international firm specializing in Beauty, Healthcare, and Consumer Products. Powered by 6+ years of marketplace expertise and global logistics.
          </p>

          {/* Marketplace Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
            <span className={`font-semibold mr-2 ${themeMode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Operating Across:</span>
            {[
              'Amazon India & Global',
              'Flipkart Assured',
              'International Dropshipping',
              'Cross-Border B2B'
            ].map(tag => (
              <span key={tag} className={`px-3 py-1.5 rounded-md border ${
                themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800 text-beige-200' : 'bg-beige-100 border-beige-300 text-maroon-800'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-md font-bold text-sm transition-all flex items-center justify-center space-x-2.5 ${
                themeMode === 'dark' ? 'bg-beige-50 text-black hover:bg-beige-300' : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              <span>Explore Corporate Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-md font-bold text-sm transition-all flex items-center justify-center space-x-2 border ${
                themeMode === 'dark'
                  ? 'bg-maroon-900 text-beige-200 hover:bg-maroon-800 border-maroon-700'
                  : 'bg-beige-50 text-maroon-800 hover:bg-beige-100 border-beige-300'
              }`}
            >
              <span>Contact Leadership</span>
              <Globe2 className="w-4 h-4 text-maroon-600 dark:text-maroon-500" />
            </button>
          </div>

          {/* Key Partners Micro Line */}
          <div className={`pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold ${
            themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-gray-400" /> ROC Mumbai Registered
            </span>
            <span>•</span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-beige-200" /> 6 Active Brands
            </span>
          </div>

        </div>

        {/* Live Metrics Ribbon */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { label: 'Marketplace Experience', value: '6+ Years', detail: 'Since 2021 Foundation', icon: Award },
            { label: 'Active Brands Managed', value: '6 Brands', detail: 'In-house & Dropshipping', icon: Layers },
            { label: 'Countries Served', value: '25+ Nations', detail: 'Cross-Border Logistics', icon: Globe2 },
            { label: 'Fulfillment Accuracy', value: '99.8%', detail: '24h Express Dispatch', icon: TrendingUp },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-md border transition-all duration-300 ${
                  themeMode === 'dark'
                    ? 'bg-maroon-900 border-maroon-800'
                    : 'bg-beige-50 border-beige-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl sm:text-3xl font-extrabold ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
                    {stat.value}
                  </span>
                  <div className={`p-2 rounded-md ${themeMode === 'dark' ? 'bg-maroon-800 text-maroon-500' : 'bg-beige-200 text-maroon-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className={`text-xs font-bold uppercase tracking-widest ${
                  themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {stat.label}
                </h4>
                <p className={`text-[11px] mt-2 ${themeMode === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{stat.detail}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
