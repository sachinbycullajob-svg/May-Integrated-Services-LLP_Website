import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { JOURNEY_MILESTONES } from '../data/companyData';
import { Card3DTilt } from './Card3DTilt';
import { 
  Rocket, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  Award, 
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface JourneySectionProps {
  themeMode: ThemeMode;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ themeMode }) => {
  const [activeYear, setActiveYear] = useState<number>(2026);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket': return <Rocket className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-pink-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Award': return <Award className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="journey" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Evolution & Milestones</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Our Strategic <span className="text-sky-400">Growth Journey</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            From regional marketplace beginnings in 2021 to a consolidated international LLP with 6 global brands in 2026.
          </p>
        </div>

        {/* Year Filter Buttons */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-12 overflow-x-auto py-2">
          {JOURNEY_MILESTONES.map((item) => {
            const isSelected = activeYear === item.year;
            return (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105'
                    : themeMode === 'dark'
                      ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                <span>{item.year}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="relative border-l-2 border-sky-500/30 ml-4 sm:ml-8 lg:ml-12 pl-6 sm:pl-10 space-y-12">
          {JOURNEY_MILESTONES.map((milestone) => {
            const isHighlight = activeYear === milestone.year;

            return (
              <div
                key={milestone.year}
                className={`relative transition-all duration-500 ${
                  isHighlight ? 'scale-100 opacity-100' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {/* Timeline Dot Icon */}
                <div className={`absolute -left-[35px] sm:-left-[51px] top-0 w-8 sm:w-10 h-8 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isHighlight
                    ? 'bg-sky-500 text-white ring-4 ring-sky-500/30 shadow-lg shadow-sky-500/40 scale-110'
                    : 'bg-slate-900 text-sky-400 border border-slate-700'
                }`}>
                  {getIcon(milestone.icon)}
                </div>

                <Card3DTilt>
                  <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                    isHighlight
                      ? themeMode === 'dark'
                        ? 'bg-slate-900/90 border-sky-500/50 shadow-2xl shadow-sky-500/10 ring-1 ring-sky-500/30'
                        : 'bg-white border-sky-400 shadow-xl'
                      : themeMode === 'dark'
                        ? 'bg-slate-900/60 border-slate-800'
                        : 'bg-white/80 border-slate-200 shadow-sm'
                  }`}>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                          MILESTONE {milestone.year}
                        </span>
                        <h3 className={`text-xl sm:text-2xl font-extrabold ${
                          themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                          {milestone.title}
                        </h3>
                        <p className="text-xs text-sky-400 font-semibold">{milestone.subtitle}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {milestone.brandsAdded.map((b, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-xl text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20"
                          >
                            + {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {milestone.description}
                    </p>

                    {/* Highlights List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-800/60 text-xs">
                      {milestone.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </Card3DTilt>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
