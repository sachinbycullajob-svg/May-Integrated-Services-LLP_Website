import React, { useState, useEffect } from 'react';
import { ThemeMode, StaffApplication } from '../types';
import { STAFF_APPLICATIONS } from '../data/staffApps';
import { 
  X, 
  ExternalLink, 
  Search, 
  Shield, 
  Layers, 
  Database, 
  FileText, 
  RefreshCw, 
  Truck, 
  BarChart3,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp?: (app: StaffApplication) => void;
  themeMode: ThemeMode;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({
  isOpen,
  onClose,
  onSelectApp,
  themeMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/staff-login`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  if (!isOpen) return null;

  const filteredApps = STAFF_APPLICATIONS.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAppIcon = (id: string) => {
    switch (id) {
      case 'listing-tracking-dashboard':
        return <Layers className="w-5 h-5 text-amber-500" />;
      case 'scraper-management':
        return <Database className="w-5 h-5 text-blue-500" />;
      case 'hsn-data':
        return <FileText className="w-5 h-5 text-emerald-500" />;
      case 'claim-tracking-system':
        return <RefreshCw className="w-5 h-5 text-rose-500" />;
      case 'dropshipping-operations':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'amazonrecon':
        return <BarChart3 className="w-5 h-5 text-indigo-500" />;
      case 'online-seller-internal-tool':
        return <Layers className="w-5 h-5 text-cyan-500" />;
      case 'awbix':
        return <RefreshCw className="w-5 h-5 text-orange-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-maroon-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 ${
        themeMode === 'dark' 
          ? 'bg-maroon-950 border-maroon-800 text-beige-100' 
          : 'bg-white border-beige-300 text-maroon-950'
      }`}>
        
        {/* Modal Header */}
        <div className={`px-6 py-5 border-b flex items-center justify-between ${
          themeMode === 'dark' ? 'border-maroon-800/80 bg-maroon-900/50' : 'border-beige-200 bg-beige-50/80'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
              themeMode === 'dark' ? 'bg-maroon-800 text-beige-100 border border-maroon-700' : 'bg-maroon-900 text-white'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-xl font-bold tracking-tight ${
                  themeMode === 'dark' ? 'text-white' : 'text-maroon-950'
                }`}>
                  Staff Login & Application Launchpad
                </h2>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                  themeMode === 'dark' ? 'bg-maroon-800/80 text-beige-200 border-maroon-700' : 'bg-beige-200 text-maroon-900 border-beige-300'
                }`}>
                  Internal Tools
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Centralized gateway to company management platforms, dashboards, and operational tools.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                themeMode === 'dark' 
                  ? 'border-maroon-700 bg-maroon-900/80 hover:bg-maroon-800 text-beige-200' 
                  : 'border-beige-300 bg-white hover:bg-beige-100 text-maroon-950'
              }`}
              title="Copy direct shareable link for staff"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Copied URL!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className={`p-2 rounded-xl transition-colors ${
                themeMode === 'dark' 
                  ? 'hover:bg-maroon-800 text-slate-400 hover:text-white' 
                  : 'hover:bg-beige-200 text-slate-500 hover:text-maroon-950'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`px-6 py-3 border-b flex items-center gap-3 ${
          themeMode === 'dark' ? 'border-maroon-800/60 bg-maroon-950/70' : 'border-beige-200/80 bg-beige-50/40'
        }`}>
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applications by name, category, or keyword..."
              className={`w-full pl-9 pr-4 py-2 rounded-lg text-xs sm:text-sm border transition-colors focus:outline-none ${
                themeMode === 'dark'
                  ? 'bg-maroon-900/60 border-maroon-800 text-white placeholder:text-slate-500 focus:border-maroon-600'
                  : 'bg-white border-beige-300 text-maroon-950 placeholder:text-slate-400 focus:border-maroon-500'
              }`}
            />
          </div>
          <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
            {filteredApps.length} {filteredApps.length === 1 ? 'App' : 'Apps'} Available
          </span>
        </div>

        {/* Applications Directory Table / List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-inherit">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                  themeMode === 'dark' 
                    ? 'bg-maroon-900/80 text-beige-300 border-maroon-800' 
                    : 'bg-beige-100/80 text-maroon-900 border-beige-200'
                }`}>
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4 min-w-[280px]">Application</th>
                  <th className="py-3 px-4 min-w-[140px] hidden sm:table-cell">Category</th>
                  <th className="py-3 px-4 text-right min-w-[180px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {filteredApps.map((app, index) => (
                  <tr 
                    key={app.id} 
                    className={`group transition-colors ${
                      themeMode === 'dark' 
                        ? 'hover:bg-maroon-900/50' 
                        : 'hover:bg-beige-50/80'
                    }`}
                  >
                    {/* Index */}
                    <td className="py-4 px-4 text-slate-400 font-mono text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </td>

                    {/* Application Details */}
                    <td className="py-4 px-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 border ${
                          themeMode === 'dark' 
                            ? 'bg-maroon-900 border-maroon-800' 
                            : 'bg-beige-100 border-beige-200'
                        }`}>
                          {getAppIcon(app.id)}
                        </div>
                        <div>
                          {/* Application Name linking directly to outside app */}
                          <a
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-semibold text-sm sm:text-base text-left hover:underline transition-colors flex items-center gap-1.5 ${
                              themeMode === 'dark' ? 'text-white hover:text-beige-200' : 'text-maroon-950 hover:text-maroon-800'
                            }`}
                            title={`Open ${app.name} directly in a new tab`}
                          >
                            <span>{app.name}</span>
                          </a>
                          
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                        themeMode === 'dark'
                          ? 'bg-maroon-900 text-beige-300 border-maroon-800'
                          : 'bg-beige-100 text-maroon-900 border-beige-200'
                      }`}>
                        {app.category}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end">
                        {/* Launch App button with outside link assigned */}
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center space-x-1.5 shadow-sm transition-all duration-150 ${
                            themeMode === 'dark'
                              ? 'bg-beige-200 hover:bg-white text-maroon-950 hover:shadow-beige-200/20'
                              : 'bg-maroon-950 hover:bg-black text-white hover:shadow-black/20'
                          }`}
                          title={`Open ${app.name} directly in a new tab`}
                        >
                          <span>Launch App</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">No applications found matching "{searchTerm}".</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-xs font-semibold text-maroon-500 hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className={`px-6 py-3 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2 ${
          themeMode === 'dark' ? 'border-maroon-800/80 bg-maroon-900/30 text-slate-400' : 'border-beige-200 bg-beige-50/50 text-slate-500'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Click <strong>"Launch App"</strong> to open the application directly in a new browser tab.</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyLink}
              className="text-maroon-600 dark:text-maroon-400 hover:underline font-mono text-[11px] flex items-center space-x-1"
            >
              <Copy className="w-3 h-3" />
              <span>{copiedLink ? 'Link Copied to Clipboard!' : 'mayecomm.com/staff-login'}</span>
            </button>
            <span className="text-slate-400">|</span>
            <button
              onClick={onClose}
              className="hover:underline font-medium"
            >
              Close Window
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
