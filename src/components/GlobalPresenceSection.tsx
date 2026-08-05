import React, { useState } from 'react';
import { ThemeMode, GlobalHub } from '../types';
import { GLOBAL_HUBS } from '../data/companyData';
import { 
  Globe2, 
  MapPin, 
  Ship, 
  Plane, 
  Truck, 
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface GlobalPresenceSectionProps {
  themeMode: ThemeMode;
}

export const GlobalPresenceSection: React.FC<GlobalPresenceSectionProps> = ({ themeMode }) => {
  const [selectedHub, setSelectedHub] = useState<GlobalHub>(GLOBAL_HUBS[0]);

  return (
    <section id="global" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-500/10 border border-maroon-500/30 text-maroon-400 text-xs font-semibold mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Worldwide Operations & Trade Lanes</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Global Marketplace <span className="text-maroon-400">Footprint</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            From our command center in Grant Road, Mumbai to key fulfillment nodes in North America, Europe, Asia, and the Middle East.
          </p>
        </div>

        {/* Map Container */}
        <div className={`p-6 sm:p-8 rounded-3xl border mb-12 relative overflow-hidden ${
          themeMode === 'dark'
            ? 'bg-slate-900/90 border-slate-800 shadow-2xl'
            : 'bg-beige-50 border-slate-200 shadow-xl'
        }`}>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-maroon-400 font-bold uppercase tracking-wider">
                ACTIVE FULFILLMENT NETWORK
              </span>
              <h3 className={`text-xl font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Cross-Border Shipping & Marketplace Distribution
              </h3>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2 text-maroon-400">
                <span className="w-2.5 h-2.5 rounded-full bg-maroon-400 animate-ping" />
                <span className="font-semibold">HQ Node</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-semibold">Distribution Node</span>
              </div>
            </div>
          </div>

          {/* Interactive Graphic Map Grid */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 overflow-hidden flex items-center justify-center">
            
            {/* Grid Lines Overlay */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* World Map SVG Background Silhouette */}
            <svg className="w-full h-full opacity-30 pointer-events-none absolute inset-0" viewBox="0 0 1000 500" fill="currentColor text-slate-700">
              <path d="M150,150 Q200,100 250,160 T350,220 Q280,300 200,380 Z M450,100 Q550,80 600,140 T520,280 Q480,240 450,100 Z M700,200 Q800,150 880,220 T800,380 Q720,350 700,200 Z" />
            </svg>

            {/* Connecting Shipping Arcs from Mumbai HQ to all hubs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              {GLOBAL_HUBS.map((hub) => {
                if (hub.id === 'mumbai-hq') return null;
                const hq = GLOBAL_HUBS[0];
                return (
                  <g key={hub.id}>
                    <path
                      d={`M ${hq.coordinates.x} ${hq.coordinates.y} Q ${(hq.coordinates.x + hub.coordinates.x) / 2} ${Math.min(hq.coordinates.y, hub.coordinates.y) - 15} ${hub.coordinates.x} ${hub.coordinates.y}`}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                      className="animate-pulse"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hub Pins */}
            {GLOBAL_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              const isHq = hub.id === 'mumbai-hq';

              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  style={{ left: `${hub.coordinates.x}%`, top: `${hub.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform duration-300 hover:scale-125"
                >
                  <div className="relative">
                    {/* Pulsing ring for HQ */}
                    {isHq && (
                      <span className="absolute -inset-2 rounded-full bg-rose-500/40 animate-ping" />
                    )}
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      isHq
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'
                        : isSelected
                          ? 'bg-maroon-500 text-white shadow-lg shadow-maroon-500/50 scale-110'
                          : 'bg-slate-900 text-maroon-400 border border-slate-700 hover:border-maroon-400'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Tooltip Label */}
                    <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-maroon-500 text-white shadow-md'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-700'
                    }`}>
                      {hub.city}
                    </span>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Selected Hub Detail Card */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-maroon-400 uppercase">SELECTED REGIONAL NODE</span>
              <h4 className="text-lg font-extrabold text-white mt-1">{selectedHub.city}, {selectedHub.country}</h4>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-maroon-500/20 text-sky-300 text-[10px] font-semibold">
                {selectedHub.type}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">HUB OVERVIEW</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{selectedHub.details}</p>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">ACTIVE MARKETPLACES</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedHub.marketplaces.map((m, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
