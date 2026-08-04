import React from 'react';
import { ThemeMode } from '../../types';
import { COMPANY_INFO } from '../../data/companyData';
import { ShieldCheck, FileText, Lock, Building2 } from 'lucide-react';

interface LegalPagesProps {
  type: 'privacy' | 'terms';
  themeMode: ThemeMode;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ type, themeMode }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-xs sm:text-sm leading-relaxed">
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>LLPIN: {COMPANY_INFO.llpin}</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          themeMode === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          May Integrated Services LLP • Effective Date: May 6, 2026
        </p>
      </div>

      <div className={`p-8 sm:p-10 rounded-3xl border space-y-6 ${
        themeMode === 'dark' ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-xl'
      }`}>
        
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">1. Data Controller Identity</h3>
              <p>
                May Integrated Services LLP ("Company", "We", "Us") operates as a Limited Liability Partnership registered with the Registrar of Companies (ROC), Mumbai under LLPIN ACX-9249. Our Registered Office is located at {COMPANY_INFO.address.fullAddress}.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">2. Information Collection</h3>
              <p>
                We collect personal information provided voluntarily through our corporate inquiry portals, email correspondence, and business partner forms. This may include contact name, corporate email address, telephone numbers, and commercial business credentials.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">3. Purpose of Processing</h3>
              <p>
                All data collected is strictly utilized to evaluate partnership inquiries, fulfill cross-border dropshipping orders, maintain regulatory compliance under the LLP Act 2008, and communicate with official marketplace vendors.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">4. Data Security & Storage</h3>
              <p>
                We employ enterprise-grade SSL encryption and secure cloud servers. We do not sell or lease personal data to third-party data brokers.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">1. Agreement to Terms</h3>
              <p>
                By accessing this website, you agree to be bound by these corporate Terms and Conditions governed by the laws of India and under the jurisdiction of courts in Mumbai, Maharashtra.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">2. Intellectual Property Rights</h3>
              <p>
                All brand logos, code artifacts, 3D graphic assets, and brand assets for Venus Enterprises, Ideal Cosmo, The Style Studio, Beauty Mars, May Global Ventures, True Value Cart, and May Integrated Services LLP are protected intellectual property.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-sky-400">3. Limitation of Liability</h3>
              <p>
                In no event shall May Integrated Services LLP or its Designated Partners (Mohammed Yakub Sunesra & Ahmed Yakub Sunesra) be liable for indirect damages arising from website usage or marketplace portal links.
              </p>
            </section>
          </>
        )}

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Official Corporate Representative: CA Rizwan (In-house CA)</span>
          <span>Contact: {COMPANY_INFO.email}</span>
        </div>

      </div>

    </div>
  );
};
