import React, { useState } from 'react';
import { PageView, ThemeMode } from '../types';
import { COMPANY_INFO, BRANDS, SERVICES, TEAM_MEMBERS } from '../data/companyData';
import { Search, X, ArrowRight, Building2, Crown, Cpu, Users } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
  themeMode: ThemeMode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  themeMode,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const brandsResults = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.category.toLowerCase().includes(query.toLowerCase())
  );

  const servicesResults = SERVICES.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  const teamResults = TEAM_MEMBERS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.role.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (view: PageView) => {
    onNavigate(view);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 relative ${
        themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Search Bar Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands, services, team, or ROC info..."
            autoFocus
            className={`w-full pl-12 pr-10 py-3.5 rounded-2xl text-sm transition-all ${
              themeMode === 'dark'
                ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500'
                : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500'
            }`}
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 text-xs">
          
          {/* Quick Links */}
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">QUICK SECTIONS</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Company Overview', view: 'about' as PageView, icon: Building2 },
                { label: 'Brands Portfolio', view: 'brands' as PageView, icon: Crown },
                { label: 'Services Catalog', view: 'services' as PageView, icon: Cpu },
                { label: 'Meet the Team', view: 'team' as PageView, icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.view)}
                    className="p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex flex-col items-center justify-center space-y-1 text-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-sky-400" />
                    <span className="font-semibold text-slate-200">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands Results */}
          {query.trim() && brandsResults.length > 0 && (
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">BRANDS MATCHES</span>
              <div className="space-y-2">
                {brandsResults.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect('brands')}
                    className="w-full p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <span className="font-bold text-sky-400">{b.name}</span>
                      <span className="text-slate-400 text-[11px] block">{b.category}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Results */}
          {query.trim() && servicesResults.length > 0 && (
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">SERVICES MATCHES</span>
              <div className="space-y-2">
                {servicesResults.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect('services')}
                    className="w-full p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <span className="font-bold text-slate-200">{s.title}</span>
                      <span className="text-slate-400 text-[11px] block">{s.shortDesc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Team Results */}
          {query.trim() && teamResults.length > 0 && (
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">TEAM MATCHES</span>
              <div className="space-y-2">
                {teamResults.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect('team')}
                    className="w-full p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <span className="font-bold text-slate-200">{t.name}</span>
                      <span className="text-sky-400 text-[11px] block">{t.role}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
