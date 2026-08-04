import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Copy, 
  Check, 
  Users, 
  Sparkles,
  Target,
  Compass,
  Heart
} from 'lucide-react';

interface AboutSectionProps {
  themeMode: ThemeMode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ themeMode }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Heritage & Foundation</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            About <span className="text-sky-400">May Integrated Services LLP</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Founded with a vision to redefine global e-commerce management and cross-border trade, combining over 6 years of deep marketplace experience with modern technology and operational precision.
          </p>
        </div>

        {/* Corporate Registration & Legal Certificate Card */}
        <div className={`mb-16 p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
          themeMode === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800 shadow-2xl'
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Government Registration & ROC Certificate
                  </h3>
                  <p className="text-xs text-sky-500 font-mono font-semibold">
                    Registrar of Companies (ROC), Mumbai
                  </p>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                themeMode === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                May Integrated Services LLP is a legally incorporated Limited Liability Partnership in India under the Ministry of Corporate Affairs (MCA). Although formally incorporated in May 2026, our founding team brings over 6 years of proven hands-on international e-commerce experience.
              </p>

              {/* Legal Info Table */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className={`p-3 rounded-xl border ${
                  themeMode === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className={`block text-[10px] uppercase font-bold ${
                    themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>LLPIN</span>
                  <span className="text-sky-500 font-mono font-bold text-sm">{COMPANY_INFO.llpin}</span>
                </div>
                <div className={`p-3 rounded-xl border ${
                  themeMode === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className={`block text-[10px] uppercase font-bold ${
                    themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>Incorporation Date</span>
                  <span className={`font-semibold ${themeMode === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{COMPANY_INFO.registrationDate}</span>
                </div>
                <div className={`p-3 rounded-xl border ${
                  themeMode === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-100 border-slate-200'
                }`}>
                  <span className={`block text-[10px] uppercase font-bold ${
                    themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>ROC Jurisdiction</span>
                  <span className={`font-semibold ${themeMode === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>ROC Mumbai, MH</span>
                </div>
              </div>

              {/* Office Address Card */}
              <div className="pt-2">
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                  themeMode === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className="text-sky-500 font-bold block mb-1">Registered Office Address:</span>
                    <span className={themeMode === 'dark' ? 'text-slate-300' : 'text-slate-800'}>{COMPANY_INFO.address.fullAddress}</span>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 font-semibold transition-colors flex items-center space-x-1.5 whitespace-nowrap border border-sky-500/20"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Address!' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Designated Partners */}
            <div className={`lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0 ${
              themeMode === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <h4 className={`text-sm font-bold uppercase tracking-wider ${
                themeMode === 'dark' ? 'text-slate-200' : 'text-slate-800'
              }`}>
                Designated Partners
              </h4>

              {COMPANY_INFO.partners.map((partner, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border space-y-1 ${
                  themeMode === 'dark' ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-sm ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{partner.name}</span>
                    <span className="text-[10px] font-mono bg-sky-500/20 text-sky-500 px-2 py-0.5 rounded font-semibold">
                      DIN: {partner.din}
                    </span>
                  </div>
                  <p className="text-xs text-sky-500 font-semibold">{partner.role}</p>
                  <p className={`text-[11px] ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{partner.experience}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Vision, Mission & Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            <div className="p-3 w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 mb-4 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Our Corporate Vision
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              To be the world’s most trusted multi-marketplace e-commerce enterprise, bridging global manufacturers with consumers across North America, Europe, Asia, and the Middle East through seamless technology and logistics.
            </p>
          </div>

          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            <div className="p-3 w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 mb-4 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Our Strategic Mission
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              To build, scale, and optimize high-performing brand channels across Amazon, Flipkart, and international dropshipping platforms using data analytics, AI listing optimization, and exceptional customer service.
            </p>
          </div>

          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            <div className="p-3 w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Core Values & Culture
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Operational speed, 100% regulatory compliance, customer-centric care, and continuous innovation through Vibe Coding & technical workflow automation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
