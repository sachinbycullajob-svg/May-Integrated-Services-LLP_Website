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
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-4 ${
            themeMode === 'dark' ? 'bg-[#111] border-[#222] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
          }`}>
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Heritage & Foundation</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About <span className="text-sky-600 dark:text-sky-500">May Integrated Services LLP</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Founded with a vision to redefine global e-commerce management and cross-border trade, combining over 6 years of deep marketplace experience with modern technology and operational precision.
          </p>
        </div>

        {/* Corporate Registration & Legal Certificate Card */}
        <div className={`mb-16 p-6 sm:p-8 rounded-md border relative overflow-hidden ${
          themeMode === 'dark'
            ? 'bg-[#111] border-[#222]'
            : 'bg-white border-gray-200 shadow-md'
        }`}>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-md ${themeMode === 'dark' ? 'bg-[#222] text-sky-500' : 'bg-gray-100 text-sky-600'}`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Government Registration & ROC Certificate
                  </h3>
                  <p className={`text-xs font-mono font-semibold ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
                <div className={`p-4 rounded-md border ${
                  themeMode === 'dark' ? 'bg-[#0a0a0a] border-[#222]' : 'bg-gray-50 border-gray-200'
                }`}>
                  <span className={`block text-[10px] uppercase font-bold tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>LLPIN</span>
                  <span className="text-sky-600 dark:text-sky-500 font-mono font-bold text-sm">{COMPANY_INFO.llpin}</span>
                </div>
                <div className={`p-4 rounded-md border ${
                  themeMode === 'dark' ? 'bg-[#0a0a0a] border-[#222]' : 'bg-gray-50 border-gray-200'
                }`}>
                  <span className={`block text-[10px] uppercase font-bold tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>Incorporation Date</span>
                  <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{COMPANY_INFO.registrationDate}</span>
                </div>
                <div className={`p-4 rounded-md border ${
                  themeMode === 'dark' ? 'bg-[#0a0a0a] border-[#222]' : 'bg-gray-50 border-gray-200'
                }`}>
                  <span className={`block text-[10px] uppercase font-bold tracking-wider mb-1 ${
                    themeMode === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>ROC Jurisdiction</span>
                  <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>ROC Mumbai, MH</span>
                </div>
              </div>

              {/* Office Address Card */}
              <div className="pt-2">
                <div className={`p-4 rounded-md border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                  themeMode === 'dark' ? 'bg-[#0a0a0a] border-[#222]' : 'bg-white border-gray-200'
                }`}>
                  <div>
                    <span className={`font-bold block mb-1 ${themeMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Registered Office Address:</span>
                    <span className={themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{COMPANY_INFO.address.fullAddress}</span>
                  </div>
                  <button
                    onClick={copyAddress}
                    className={`px-3 py-2 rounded-md font-semibold transition-colors flex items-center space-x-1.5 whitespace-nowrap border ${
                      themeMode === 'dark' ? 'bg-[#111] hover:bg-[#222] border-[#333] text-gray-300' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Address!' : 'Copy Address'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Designated Partners */}
            <div className={`lg:col-span-4 space-y-4 border-t lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0 ${
              themeMode === 'dark' ? 'border-[#222]' : 'border-gray-200'
            }`}>
              <h4 className={`text-sm font-bold uppercase tracking-widest ${
                themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Designated Partners
              </h4>

              {COMPANY_INFO.partners.map((partner, idx) => (
                <div key={idx} className={`p-4 rounded-md border space-y-1 ${
                  themeMode === 'dark' ? 'bg-[#0a0a0a] border-[#222]' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-sm ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{partner.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm font-bold border ${
                      themeMode === 'dark' ? 'bg-[#111] text-gray-400 border-[#333]' : 'bg-white text-gray-500 border-gray-200'
                    }`}>
                      DIN: {partner.din}
                    </span>
                  </div>
                  <p className="text-xs text-sky-600 dark:text-sky-500 font-semibold">{partner.role}</p>
                  <p className={`text-[11px] ${themeMode === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{partner.experience}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Vision, Mission & Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-md border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-[#111] border-[#222]' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className={`p-3 w-12 h-12 rounded-md mb-4 flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-[#222] text-sky-500' : 'bg-gray-100 text-sky-600'
            }`}>
              <Target className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Our Corporate Vision
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              To be the world’s most trusted multi-marketplace e-commerce enterprise, bridging global manufacturers with consumers across North America, Europe, Asia, and the Middle East through seamless technology and logistics.
            </p>
          </div>

          <div className={`p-6 rounded-md border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-[#111] border-[#222]' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className={`p-3 w-12 h-12 rounded-md mb-4 flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-[#222] text-sky-500' : 'bg-gray-100 text-sky-600'
            }`}>
              <Compass className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Our Strategic Mission
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              To build, scale, and optimize high-performing brand channels across Amazon, Flipkart, and international dropshipping platforms using data analytics, AI listing optimization, and exceptional customer service.
            </p>
          </div>

          <div className={`p-6 rounded-md border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-[#111] border-[#222]' : 'bg-white border-gray-200 shadow-sm'
          }`}>
            <div className={`p-3 w-12 h-12 rounded-md mb-4 flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-[#222] text-sky-500' : 'bg-gray-100 text-sky-600'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Core Values & Culture
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Operational speed, 100% regulatory compliance, customer-centric care, and continuous innovation through modern technology and technical workflow automation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
