import React from 'react';
import { ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { ShieldCheck, X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  themeMode: ThemeMode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, themeMode }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className={`w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
        themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8 pr-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LLPIN: ACX-9249 • ROC Mumbai</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            May Integrated Services LLP • Effective Date: May 6, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">1. Data Controller Identity</h3>
                <p>
                  May Integrated Services LLP ("Company", "We", "Us") operates as a Limited Liability Partnership registered with the Registrar of Companies (ROC), Mumbai under LLPIN ACX-9249. Our Registered Office is located at {COMPANY_INFO.address.fullAddress}.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">2. Information Collection</h3>
                <p>
                  We collect personal information provided voluntarily through our corporate inquiry portals, email correspondence, and business partner forms. This may include contact name, corporate email address, telephone numbers, and commercial business credentials.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">3. Purpose of Processing</h3>
                <p>
                  All data collected is strictly utilized to evaluate partnership inquiries, fulfill cross-border dropshipping orders, maintain regulatory compliance under the LLP Act 2008, and communicate with official marketplace vendors.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">4. Data Security & Storage</h3>
                <p>
                  We employ enterprise-grade SSL encryption and secure cloud servers. We do not sell or lease personal data to third-party data brokers.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">1. Agreement to Terms</h3>
                <p>
                  By accessing this website, you agree to be bound by these corporate Terms and Conditions governed by the laws of India and under the jurisdiction of courts in Mumbai, Maharashtra.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">2. Intellectual Property Rights</h3>
                <p>
                  All brand logos, code artifacts, 3D graphic assets, and brand assets for Venus Enterprises, Ideal Cosmo, The Style Studio, Beauty Mars, May Global Ventures, True Value Cart, and May Integrated Services LLP are protected intellectual property.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400">3. Limitation of Liability</h3>
                <p>
                  In no event shall May Integrated Services LLP or its Designated Partners (Mohammed Yakub Sunesra & Ahmed Yakub Sunesra) be liable for indirect damages arising from website usage or marketplace portal links.
                </p>
              </section>
            </>
          )}

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Official Corporate Contact: {COMPANY_INFO.email}</span>
            <span>Phone: {COMPANY_INFO.phone}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
