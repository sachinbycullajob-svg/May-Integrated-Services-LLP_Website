import React, { useState } from 'react';
import { PageView, ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Send, 
  ArrowUp, 
  CheckCircle2 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  themeMode: ThemeMode;
  onOpenLegalModal: (type: 'privacy' | 'terms') => void;
  onOpenCredentialModal: (type: 'accounts' | 'users') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, themeMode, onOpenLegalModal, onOpenCredentialModal }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    if (view === 'home') {
      scrollToTop();
    } else {
      const element = document.getElementById(view);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className={`relative z-10 pt-16 pb-12 transition-colors duration-300 border-t ${
      themeMode === 'dark'
        ? 'bg-slate-950 text-slate-300 border-slate-800'
        : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 p-0.5 shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white">
                  May Integrated Services <span className="text-sky-400">LLP</span>
                </span>
                <p className="text-xs text-sky-400 font-semibold tracking-wide">ROC Mumbai ACX-9249</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A fast-growing global e-commerce enterprise specializing in Beauty, Healthcare, and Consumer Products. Operating across Amazon, Flipkart, and international marketplaces with 6+ years of operational excellence.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-sky-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Registrar of Companies (ROC) Mumbai Registered</span>
              </div>
              <p className="text-xs text-slate-400">
                Registered Office: {COMPANY_INFO.address.fullAddress}
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Designated Partners:</span>
                <span className="text-slate-300 font-medium">M.Y. Sunesra & A.Y. Sunesra</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Company Overview', view: 'about' as PageView },
                { label: 'Brand Portfolio', view: 'brands' as PageView },
                { label: 'E-Commerce Services', view: 'services' as PageView },
                { label: 'Team & Specialists', view: 'team' as PageView },
                { label: 'Global Network', view: 'global' as PageView },
                { label: 'Careers', view: 'careers' as PageView },
                { label: 'Contact Us', view: 'contact' as PageView },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.view)}
                    className="hover:text-sky-400 transition-colors duration-200 flex items-center space-x-1.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Brand Portfolio</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center justify-between text-slate-300">
                <span>Venus Enterprises</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-sky-400">2021</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Ideal Cosmo</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-sky-400">2021</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>The Style Studio</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-sky-400">2023</span>
              </li>
              <li className="flex items-center justify-between text-pink-400 font-medium">
                <span>Beauty Mars (Dropshipping)</span>
                <span className="text-[10px] bg-pink-950/80 px-1.5 py-0.5 rounded text-pink-400">2024</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>May Global Ventures</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-sky-400">2025</span>
              </li>
              <li className="flex items-center justify-between text-emerald-400 font-medium">
                <span>True Value Cart (Dropshipping)</span>
                <span className="text-[10px] bg-emerald-950/80 px-1.5 py-0.5 rounded text-emerald-400">2026</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Inquiries</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect with May Integrated Services for partnerships, supplier onboarding, and marketplace growth.
            </p>

            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center space-x-2 hover:text-sky-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center space-x-2 hover:text-sky-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">{COMPANY_INFO.name}</span>. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:space-x-6 justify-center">
            <button
              onClick={() => onOpenCredentialModal('accounts')}
              className="hover:text-sky-400 transition-colors"
            >
              Accounts Credential
            </button>
            <button
              onClick={() => onOpenCredentialModal('users')}
              className="hover:text-sky-400 transition-colors"
            >
              Users Credential
            </button>
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="hover:text-sky-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="hover:text-sky-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center space-x-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Custom Requested Bottom Credit Line */}
        <div className="mt-6 pt-4 text-xs text-slate-400 border-t border-slate-800/80 text-center tracking-wide leading-relaxed">
          Website hosted & maintained by{' '}
          <button
            onClick={() => handleNavClick('home')}
            className="text-sky-400 font-bold hover:text-sky-300 hover:underline transition-colors focus:outline-none"
          >
            May Integrated Services LLP
          </button>{' '}
          | Designed & Developed by{' '}
          <a
            href="https://sachingawanu.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 font-bold hover:text-sky-300 hover:underline transition-colors"
          >
            Sachin Gawanu
          </a>
        </div>

      </div>
    </footer>
  );
};
