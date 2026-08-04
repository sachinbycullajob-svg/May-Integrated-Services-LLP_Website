import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Copy,
  Check
} from 'lucide-react';

interface ContactSectionProps {
  themeMode: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ themeMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Partnership Inquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Error posting inquiry:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          inquiryType: 'Partnership Inquiry',
          message: '',
        });
      }, 6000);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address.fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Leadership</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Contact <span className="text-sky-400">May Integrated Services LLP</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            We welcome inquiries from marketplace partners, international suppliers, brand collaborators, and potential venture associates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-3xl border ${
              themeMode === 'dark'
                ? 'bg-slate-900/90 border-slate-800 shadow-2xl'
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              <h3 className={`text-xl font-extrabold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Send Corporate Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All inquiries are delivered directly to <span className="text-sky-400 font-semibold">{COMPANY_INFO.email}</span> and logged securely.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    Thank you for contacting May Integrated Services LLP. Your inquiry has been forwarded to <strong>{COMPANY_INFO.email}</strong> and saved to our Google Sheet tab. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-500'
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-500'
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9819568545"
                        className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-500'
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Company / Brand Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Brands Inc."
                        className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-500'
                            : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all ${
                        themeMode === 'dark'
                          ? 'bg-slate-950 border border-slate-800 text-white focus:border-sky-500'
                          : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-sky-500'
                      }`}
                    >
                      <option>Partnership Inquiry</option>
                      <option>Global Dropshipping Supply</option>
                      <option>Marketplace Management</option>
                      <option>Vendor & Sourcing Collaboration</option>
                      <option>General Corporate Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding your inquiry..."
                      className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all ${
                        themeMode === 'dark'
                          ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-500'
                          : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-sky-500/20 hover:shadow-sky-500/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Corporate Inquiry'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Address, Direct Contact & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Details Card */}
            <div className={`p-6 rounded-3xl border ${
              themeMode === 'dark'
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200 shadow-lg'
            }`}>
              <h4 className={`text-base font-bold mb-4 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Direct Corporate Contact
              </h4>

              <div className="space-y-3 text-xs">
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className={`flex items-center space-x-3 p-3 rounded-2xl border font-semibold transition-colors ${
                    themeMode === 'dark'
                      ? 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-sky-400'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-sky-600'
                  }`}
                >
                  <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>

                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  className={`flex items-center space-x-3 p-3 rounded-2xl border font-semibold transition-colors ${
                    themeMode === 'dark'
                      ? 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-slate-200'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className={`p-6 rounded-3xl border ${
              themeMode === 'dark'
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200 shadow-lg'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    Registered Office
                  </h4>
                  <span className="text-[10px] text-sky-500 font-semibold">ROC Mumbai</span>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${
                themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {COMPANY_INFO.address.fullAddress}
              </p>

              <button
                onClick={copyAddress}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 border ${
                  themeMode === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-sky-700 border-slate-200'
                }`}
              >
                {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAddress ? 'Address Copied!' : 'Copy Registered Address'}</span>
              </button>
            </div>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/919819568545?text=Hello%20May%20Integrated%20Services%20LLP,%20I%20would%20like%20to%20connect%20regarding%20a%20business%20opportunity.`}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold block shadow-xl hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider block text-emerald-200">INSTANT CONNECT</span>
                  <h4 className="text-lg font-extrabold">Chat on WhatsApp</h4>
                  <p className="text-xs text-emerald-100 mt-1">+91 9819568545</p>
                </div>
                <MessageSquare className="w-8 h-8 text-emerald-200" />
              </div>
            </a>

            {/* Business Hours */}
            <div className={`p-6 rounded-3xl border ${
              themeMode === 'dark'
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-white border-slate-200 shadow-lg'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-4 h-4 text-sky-500" />
                <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>Business Hours</span>
              </div>
              <p className={`text-xs ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{COMPANY_INFO.businessHours}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
