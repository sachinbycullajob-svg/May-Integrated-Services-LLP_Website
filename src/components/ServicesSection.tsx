import React, { useState } from 'react';
import { ThemeMode, ServiceItem } from '../types';
import { SERVICES } from '../data/companyData';
import { Card3DTilt } from './Card3DTilt';
import { 
  Globe2, 
  ShoppingBag, 
  Zap, 
  Ship, 
  PlaneTakeoff, 
  Boxes, 
  FileText, 
  BarChart3, 
  Headphones, 
  Cpu, 
  LineChart, 
  Briefcase,
  ArrowRight,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  themeMode: ThemeMode;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ themeMode }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Marketplace', 'Logistics', 'Optimization & Marketing', 'Tech & AI'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe2': return <Globe2 className="w-6 h-6 text-sky-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-amber-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-blue-400" />;
      case 'Ship': return <Ship className="w-6 h-6 text-cyan-400" />;
      case 'PlaneTakeoff': return <PlaneTakeoff className="w-6 h-6 text-pink-400" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-emerald-400" />;
      case 'FileText': return <FileText className="w-6 h-6 text-indigo-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-rose-400" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-violet-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-400 animate-pulse" />;
      case 'LineChart': return <LineChart className="w-6 h-6 text-sky-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-teal-400" />;
      default: return <Sparkles className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section id="services" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>End-to-End E-Commerce Capabilities</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Enterprise <span className="text-sky-400">E-Commerce Services</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            From multi-region account setup and A+ listing optimization to AI vibe-code automation and cross-border fulfillment.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : themeMode === 'dark'
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card3DTilt key={service.id}>
              <div 
                onClick={() => setSelectedService(service)}
                className={`h-full p-6 rounded-3xl border flex flex-col justify-between cursor-pointer group transition-all duration-300 ${
                  themeMode === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/40 hover:bg-slate-900'
                    : 'bg-white border-slate-200 shadow-lg hover:border-sky-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner group-hover:scale-110 transition-transform">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 px-2.5 py-1 rounded-full border border-sky-500/20">
                      {service.stats}
                    </span>
                  </div>

                  <h3 className={`text-lg font-extrabold mb-2 group-hover:text-sky-400 transition-colors ${
                    themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${
                    themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {service.shortDesc}
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between text-xs font-semibold text-sky-500 ${
                  themeMode === 'dark' ? 'border-slate-800/60' : 'border-slate-200'
                }`}>
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className={`w-full max-w-2xl p-6 sm:p-8 rounded-3xl border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">{selectedService.category}</span>
                <h3 className="text-2xl font-extrabold">{selectedService.title}</h3>
              </div>
            </div>

            <p className={`text-sm leading-relaxed mb-6 ${
              themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {selectedService.fullDesc}
            </p>

            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
              themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>Core Deliverables & Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {selectedService.features.map((f, i) => (
                <div key={i} className={`p-3 rounded-2xl border flex items-center space-x-2 text-xs ${
                  themeMode === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between text-xs">
              <span className={themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'}>Operational Benchmark:</span>
              <span className="font-bold text-sky-500">{selectedService.stats}</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
