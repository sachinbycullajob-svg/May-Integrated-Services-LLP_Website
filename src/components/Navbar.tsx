import React, { useState, useEffect } from 'react';
import { PageView, ThemeMode } from '../types';
import { 
  Globe, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search, 
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  themeMode,
  onToggleTheme,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Brands', view: 'brands' },
    { label: 'Services', view: 'services' },
    { label: 'Team', view: 'team' },
    { label: 'Global Network', view: 'global' },
    { label: 'Careers', view: 'careers' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(view);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Floating Glass Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled
          ? themeMode === 'dark'
            ? 'bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-3'
            : 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xl py-3'
          : themeMode === 'dark'
            ? 'bg-slate-950/60 backdrop-blur-md py-4'
            : 'bg-white/70 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-base sm:text-lg tracking-tight ${
                  themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  May Integrated Services
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  LLP
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                GLOBAL E-COMMERCE & MARKETPLACE EXCELLENCE
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? themeMode === 'dark'
                        ? 'text-white bg-slate-800/80 shadow-inner'
                        : 'text-sky-700 bg-sky-50 shadow-inner'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-xl transition-all ${
                themeMode === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Search Site"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl transition-all ${
                themeMode === 'dark'
                  ? 'bg-slate-800/80 text-amber-400 hover:bg-slate-700/80 border border-slate-700/60'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all ${
                themeMode === 'dark'
                  ? 'bg-slate-800 text-slate-200'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-40 p-6 overflow-y-auto animate-in slide-in-from-top-4 duration-300 ${
          themeMode === 'dark'
            ? 'bg-slate-950/95 backdrop-blur-2xl text-white border-t border-slate-800'
            : 'bg-white/95 backdrop-blur-2xl text-slate-900 border-t border-slate-200'
        }`}>
          <div className="space-y-2 mb-6">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/60 space-y-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Contact May Integrated Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
