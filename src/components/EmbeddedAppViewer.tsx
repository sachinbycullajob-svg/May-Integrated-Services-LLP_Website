import React, { useState, useRef } from 'react';
import { StaffApplication, ThemeMode } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw, 
  ShieldAlert, 
  ChevronUp, 
  ChevronDown,
  Globe,
  Lock
} from 'lucide-react';

interface EmbeddedAppViewerProps {
  app: StaffApplication;
  onBack: () => void;
  themeMode: ThemeMode;
}

export const EmbeddedAppViewer: React.FC<EmbeddedAppViewerProps> = ({
  app,
  onBack,
  themeMode,
}) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen m-0 p-0 overflow-hidden bg-slate-950 z-50 flex flex-col select-none">
      
      {/* Floating Collapsible Control Bar */}
      <div 
        className={`w-full transition-all duration-300 z-50 border-b flex-shrink-0 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none h-0'
        } ${
          themeMode === 'dark' 
            ? 'bg-maroon-950/95 border-maroon-800 text-white backdrop-blur-md' 
            : 'bg-slate-900/95 border-slate-800 text-white backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          
          {/* Left: Back to Home + App Info */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              title="Return to May Integrated Services Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </button>

            <div className="h-4 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-maroon-800 text-beige-100 flex items-center justify-center font-bold text-xs">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs sm:text-sm tracking-tight text-white truncate max-w-[200px] sm:max-w-md">
                    {app.name}
                  </span>
                  <span className="hidden md:inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                    {app.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions (Reload, Open in New Tab, Hide Bar) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="Reload Application"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleOpenExternal}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
              title="Open directly in a new browser tab"
            >
              <span>Open Tab</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => setIsHeaderVisible(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors text-xs"
              title="Hide top bar for borderless view"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Unhide Pill when header is collapsed */}
      {!isHeaderVisible && (
        <button
          onClick={() => setIsHeaderVisible(true)}
          className="fixed top-2 right-4 z-50 px-3 py-1 rounded-full bg-slate-900/90 text-white hover:bg-black border border-slate-700 shadow-xl text-xs font-medium flex items-center space-x-1 backdrop-blur-sm transition-transform hover:scale-105"
          title="Show Navigation Bar"
        >
          <span>Controls</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Main Content Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950">
        
        {/* Frame Restriction Handling (e.g. Google Sites with X-Frame-Options: DENY) */}
        {app.hasFrameRestriction ? (
          <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-b from-slate-900 to-maroon-950 text-white">
            <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {app.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Google Sites enforces strict frame security policies (<code className="text-amber-300 bg-black/30 px-1 py-0.5 rounded">X-Frame-Options: DENY</code>) which prevents displaying the page directly inside an iframe.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  onClick={handleOpenExternal}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-amber-500/25 cursor-pointer"
                >
                  <span>Launch Application in Dedicated Tab</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={onBack}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                >
                  Return to Portal Directory
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-center space-x-1">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Protected Staff Resource</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs z-10">
                <div className="flex flex-col items-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-maroon-500 animate-spin" />
                  <p className="text-xs font-medium text-slate-400">Loading {app.name}...</p>
                </div>
              </div>
            )}

            {/* Embedded Iframe */}
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={app.url}
              title={app.name}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 m-0 p-0 block bg-white"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; camera; microphone; geolocation"
              allowFullScreen
            />
          </>
        )}

      </div>

    </div>
  );
};
