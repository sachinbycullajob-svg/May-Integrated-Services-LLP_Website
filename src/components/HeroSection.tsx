import React from 'react';
import { PageView, ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { Globe3D } from './Globe3D';
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
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 dark:bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/15 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>LLPIN: {COMPANY_INFO.llpin}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <Award className="w-4 h-4" />
            <span>6+ Years E-Commerce Excellence</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <Globe2 className="w-4 h-4" />
            <span>25+ Global Marketplaces</span>
          </div>
        </div>

        {/* Hero Content & 3D Globe Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] ${
              themeMode === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Architecting the Future of{' '}
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Global E-Commerce
              </span>{' '}
              & Cross-Border Trade
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
              themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <strong>May Integrated Services LLP</strong> is a premier international e-commerce firm specializing in Beauty, Healthcare, and Consumer Products. Powered by 6+ years of marketplace expertise, AI automation, and global dropshipping logistics.
            </p>

            {/* Marketplace Chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-medium">
              <span className={`font-semibold mr-1 ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>Operating Across:</span>
              <span className="px-3 py-1 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                Amazon India & Global
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                Flipkart Assured
              </span>
              <span className="px-3 py-1 rounded-lg bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/30">
                International Dropshipping
              </span>
              <span className="px-3 py-1 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                Cross-Border B2B
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5"
              >
                <span>Explore Corporate Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                  themeMode === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-700'
                    : 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-md'
                }`}
              >
                <span>Contact Leadership</span>
                <Globe2 className="w-4 h-4 text-sky-400" />
              </button>
            </div>

            {/* Key Partners Micro Line */}
            <div className={`pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs ${
              themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <span className="flex items-center text-sky-600 dark:text-sky-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> ROC Mumbai Registered
              </span>
              <span>•</span>
              <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 6 Active Brands
              </span>
              <span>•</span>
              <span className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 14 Specialist Team
              </span>
            </div>

          </div>

          {/* Right Column: Interactive 3D Globe */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-sky-500/20 via-slate-800/20 to-indigo-500/20 border border-slate-800 backdrop-blur-xl shadow-2xl">
              <Globe3D themeMode={themeMode} onSelectHub={() => onNavigate('global')} />
            </div>
          </div>

        </div>

        {/* Live Metrics Ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
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
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  themeMode === 'dark'
                    ? 'bg-slate-900/60 border-slate-800 hover:border-sky-500/40'
                    : 'bg-white border-slate-200 hover:border-sky-400 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-sky-400">{stat.value}</span>
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  themeMode === 'dark' ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {stat.label}
                </h4>
                <p className={`text-[11px] mt-1 ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{stat.detail}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
