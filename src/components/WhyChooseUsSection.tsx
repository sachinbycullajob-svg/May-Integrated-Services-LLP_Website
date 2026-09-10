import React from 'react';
import { ThemeMode } from '../types';
import { 
  Award, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

interface WhyChooseUsSectionProps {
  themeMode: ThemeMode;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ themeMode }) => {
  const advantages = [
    {
      title: '6+ Years Marketplace Masterclass',
      description: 'Deep operational history across Amazon FBA, Flipkart Assured, and cross-border platforms guarantees proven buy-box retention.',
      icon: Award,
      color: 'text-amber-400',
    },
    {
      title: 'Vibe Code & AI Automation',
      description: 'In-house vibe coders build custom AI bots and scripts to automate price matching, stock alerts, and cataloging in real-time.',
      icon: Cpu,
      color: 'text-maroon-400',
    },
    {
      title: 'Cross-Border Dropshipping Engine',
      description: 'Direct factory partnerships and 24h express dispatch lines serving shoppers in North America, Europe, Asia & UAE.',
      icon: Globe2,
      color: 'text-pink-400',
    },
    {
      title: '100% ROC Corporate Governance',
      description: 'In-house CA oversight, GST/ROC regulatory filings (LLPIN: ACX-9249), and clean corporate accounting standards.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-500/10 border border-maroon-500/30 text-maroon-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Competitive Advantage</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Why Industry Leaders Trust <span className="text-maroon-400">May Integrated</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Combining human marketplace expertise with cutting-edge AI vibe code tools to deliver superior sales growth and logistics SLA.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className={`p-7 rounded-3xl border transition-all duration-300 ${
                  themeMode === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-maroon-500/40'
                    : 'bg-beige-50 border-slate-200 shadow-xl hover:border-maroon-400'
                }`}
              >
                <div className="p-3.5 w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 mb-5 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${adv.color}`} />
                </div>

                <h3 className={`text-base font-extrabold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {adv.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
