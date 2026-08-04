import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { PROCESS_STEPS } from '../data/companyData';
import { Card3DTilt } from './Card3DTilt';
import { 
  Search, 
  ShieldCheck, 
  Layout, 
  TrendingUp, 
  Truck, 
  HeartHandshake, 
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';

interface ProcessSectionProps {
  themeMode: ThemeMode;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ themeMode }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-indigo-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-pink-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-violet-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>3D Operational Process Flow</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Our 7-Step <span className="text-sky-400">Execution Pipeline</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            A rigorous end-to-end operational framework ensuring seamless product sourcing, high-converting listings, and global fulfillment.
          </p>
        </div>

        {/* Process Flow Stepper Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-12">
          {PROCESS_STEPS.map((step) => {
            const isSelected = activeStep === step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(step.stepNumber)}
                className={`p-3 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-b from-sky-500 to-blue-600 text-white border-sky-400 shadow-lg shadow-sky-500/30 scale-105'
                    : themeMode === 'dark'
                      ? 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                <span className="text-[10px] font-mono font-bold uppercase block opacity-80">
                  STEP 0{step.stepNumber}
                </span>
                <span className="text-xs font-extrabold truncate w-full mt-1">
                  {step.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        {(() => {
          const step = PROCESS_STEPS.find((s) => s.stepNumber === activeStep) || PROCESS_STEPS[0];
          return (
            <Card3DTilt glowColor="rgba(56, 189, 248, 0.25)">
              <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 ${
                themeMode === 'dark'
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-sky-500/40 shadow-2xl'
                  : 'bg-white border-sky-300 shadow-xl'
              }`}>
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-inner">
                      {getStepIcon(step.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                        PHASE 0{step.stepNumber} WORKFLOW
                      </span>
                      <h3 className={`text-2xl font-extrabold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-sky-400">{step.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                    <span>STEP {step.stepNumber} OF 7</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-3xl">
                  {step.description}
                </p>

                {/* Tools & Tech Stack */}
                <div className="pt-6 border-t border-slate-800/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Tools & Technologies Deployed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {step.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-sky-300 border border-slate-700 shadow-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Card3DTilt>
          );
        })()}

      </div>
    </section>
  );
};
