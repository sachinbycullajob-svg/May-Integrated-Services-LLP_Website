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
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-4 ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800 text-beige-200' : 'bg-beige-100 border-beige-300 text-maroon-800'
          }`}>
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Leadership</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-maroon-950'
          }`}>
            Contact <span className="text-maroon-600 dark:text-maroon-500">May Integrated Services LLP</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            We welcome inquiries from marketplace partners, international suppliers, brand collaborators, and potential venture associates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-md border ${
              themeMode === 'dark'
                ? 'bg-maroon-900 border-maroon-800'
                : 'bg-beige-50 border-beige-300 shadow-sm'
            }`}>
              
              <h3 className={`text-xl font-extrabold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
                Send Corporate Inquiry
              </h3>
              <p className={`text-xs mb-6 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                All inquiries are delivered directly to <span className="text-maroon-600 dark:text-maroon-500 font-semibold">{COMPANY_INFO.email}</span> and logged securely.
              </p>

              {isSubmitted ? (
                <div className={`p-8 rounded-md border text-center space-y-3 animate-in zoom-in-95 ${
                  themeMode === 'dark' ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    themeMode === 'dark' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className={`text-lg font-bold ${themeMode === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>Inquiry Sent Successfully!</h4>
                  <p className={`text-xs leading-relaxed max-w-md mx-auto ${themeMode === 'dark' ? 'text-emerald-200/70' : 'text-emerald-600/80'}`}>
                    Thank you for contacting May Integrated Services LLP. Your inquiry has been forwarded to <strong>{COMPANY_INFO.email}</strong> and saved to our backend. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 rounded-md text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-maroon-950 border border-maroon-700 text-white placeholder-gray-600 focus:border-maroon-500'
                            : 'bg-beige-50 border border-gray-300 text-maroon-950 placeholder-gray-400 focus:border-maroon-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-2.5 rounded-md text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-maroon-950 border border-maroon-700 text-white placeholder-gray-600 focus:border-maroon-500'
                            : 'bg-beige-50 border border-gray-300 text-maroon-950 placeholder-gray-400 focus:border-maroon-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9819568545"
                        className={`w-full px-4 py-2.5 rounded-md text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-maroon-950 border border-maroon-700 text-white placeholder-gray-600 focus:border-maroon-500'
                            : 'bg-beige-50 border border-gray-300 text-maroon-950 placeholder-gray-400 focus:border-maroon-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Company / Brand Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Brands Inc."
                        className={`w-full px-4 py-2.5 rounded-md text-xs transition-all ${
                          themeMode === 'dark'
                            ? 'bg-maroon-950 border border-maroon-700 text-white placeholder-gray-600 focus:border-maroon-500'
                            : 'bg-beige-50 border border-gray-300 text-maroon-950 placeholder-gray-400 focus:border-maroon-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-md text-xs transition-all ${
                        themeMode === 'dark'
                          ? 'bg-maroon-950 border border-maroon-700 text-white focus:border-maroon-500'
                          : 'bg-beige-50 border border-gray-300 text-maroon-950 focus:border-maroon-500'
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
                    <label className={`block text-xs font-semibold mb-1 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Message Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding your inquiry..."
                      className={`w-full px-4 py-2.5 rounded-md text-xs transition-all ${
                        themeMode === 'dark'
                          ? 'bg-maroon-950 border border-maroon-700 text-white placeholder-gray-600 focus:border-maroon-500'
                          : 'bg-beige-50 border border-gray-300 text-maroon-950 placeholder-gray-400 focus:border-maroon-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-md font-bold text-xs transition-all flex items-center justify-center space-x-2 disabled:opacity-50 ${
                      themeMode === 'dark' ? 'bg-beige-50 text-black hover:bg-beige-300' : 'bg-gray-900 text-white hover:bg-black'
                    }`}
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
            <div className={`p-6 rounded-md border ${
              themeMode === 'dark'
                ? 'bg-maroon-900 border-maroon-800'
                : 'bg-beige-50 border-beige-300 shadow-sm'
            }`}>
              <h4 className={`text-base font-bold mb-4 ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
                Direct Corporate Contact
              </h4>

              <div className="space-y-3 text-xs">
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className={`flex items-center space-x-3 p-3 rounded-md border font-semibold transition-colors ${
                    themeMode === 'dark'
                      ? 'bg-maroon-950 hover:bg-maroon-800 border-maroon-700 text-maroon-400'
                      : 'bg-beige-100 hover:bg-beige-200 border-beige-300 text-maroon-600'
                  }`}
                >
                  <Mail className="w-4 h-4 text-maroon-500 flex-shrink-0" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>

                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  className={`flex items-center space-x-3 p-3 rounded-md border font-semibold transition-colors ${
                    themeMode === 'dark'
                      ? 'bg-maroon-950 hover:bg-maroon-800 border-maroon-700 text-beige-200'
                      : 'bg-beige-100 hover:bg-beige-200 border-beige-300 text-maroon-900'
                  }`}
                >
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className={`p-6 rounded-md border ${
              themeMode === 'dark'
                ? 'bg-maroon-900 border-maroon-800'
                : 'bg-beige-50 border-beige-300 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-md ${themeMode === 'dark' ? 'bg-maroon-800 text-maroon-500' : 'bg-beige-200 text-maroon-600'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
                    Registered Office
                  </h4>
                  <span className="text-[10px] text-maroon-600 dark:text-maroon-500 font-semibold">ROC Mumbai</span>
                </div>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${
                themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {COMPANY_INFO.address.fullAddress}
              </p>

              <button
                onClick={copyAddress}
                className={`w-full py-2.5 rounded-md text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 border ${
                  themeMode === 'dark'
                    ? 'bg-maroon-950 hover:bg-maroon-800 text-maroon-400 border-maroon-700'
                    : 'bg-beige-100 hover:bg-beige-200 text-sky-700 border-beige-300'
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
              className="p-6 rounded-md bg-[#25D366] text-white font-bold block shadow-md hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider block text-emerald-50">INSTANT CONNECT</span>
                  <h4 className="text-lg font-extrabold">Chat on WhatsApp</h4>
                  <p className="text-xs text-emerald-100 mt-1">+91 9819568545</p>
                </div>
                <MessageSquare className="w-8 h-8 text-emerald-50" />
              </div>
            </a>

            {/* Business Hours */}
            <div className={`p-6 rounded-md border ${
              themeMode === 'dark'
                ? 'bg-maroon-900 border-maroon-800'
                : 'bg-beige-50 border-beige-300 shadow-sm'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-4 h-4 text-maroon-500" />
                <span className={`text-xs font-bold ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>Business Hours</span>
              </div>
              <p className={`text-xs ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{COMPANY_INFO.businessHours}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
