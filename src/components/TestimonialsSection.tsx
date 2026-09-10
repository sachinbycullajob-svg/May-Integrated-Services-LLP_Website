import React from 'react';
import { ThemeMode } from '../types';
import { TESTIMONIALS } from '../data/companyData';
import { Card3DTilt } from './Card3DTilt';
import { Star, Quote, Globe2, Building2 } from 'lucide-react';

interface TestimonialsSectionProps {
  themeMode: ThemeMode;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ themeMode }) => {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-500/10 border border-maroon-500/30 text-maroon-400 text-xs font-semibold mb-4">
            <Quote className="w-3.5 h-3.5" />
            <span>Global Partner Feedback</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Trusted By <span className="text-maroon-400">Marketplace Collaborators</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            What international logistics directors and brand partners say about operating with May Integrated Services LLP.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <Card3DTilt key={t.id}>
              <div className={`h-full p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                themeMode === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-maroon-500/40'
                  : 'bg-beige-50 border-slate-200 shadow-xl hover:border-maroon-400'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-maroon-500/15 text-maroon-400 px-2 py-0.5 rounded border border-maroon-500/20">
                      {t.marketplace}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className={`text-sm font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {t.clientName}
                    </h4>
                    <p className="text-xs text-maroon-400 font-medium">{t.role}</p>
                    <p className="text-[11px] text-slate-400">{t.company} • {t.country}</p>
                  </div>
                  <Globe2 className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>
    </section>
  );
};
