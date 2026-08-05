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
      {/* Main Floating Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled
          ? themeMode === 'dark'
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222] py-3'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3'
          : themeMode === 'dark'
            ? 'bg-[#0a0a0a]/80 backdrop-blur-sm py-4 border-b border-transparent'
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left"
          >
            <div className={`relative w-9 h-9 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
              themeMode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              <Globe className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-semibold text-base sm:text-lg tracking-tight ${
                  themeMode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  May Integrated Services
                </span>
                <span className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded border ${
                  themeMode === 'dark' ? 'bg-[#222] text-gray-300 border-[#333]' : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}>
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
                  className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? themeMode === 'dark'
                        ? 'text-white bg-[#222]'
                        : 'text-black bg-gray-100'
                      : themeMode === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-[#111]'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-md transition-all ${
                themeMode === 'dark'
                  ? 'bg-[#111] text-gray-400 hover:text-white hover:bg-[#222] border border-[#222]'
                  : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-200'
              }`}
              title="Search Site"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-md transition-all ${
                themeMode === 'dark'
                  ? 'bg-[#111] text-gray-400 hover:text-white hover:bg-[#222] border border-[#222]'
                  : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-200'
              }`}
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-md font-semibold text-xs transition-colors duration-200 ${
                themeMode === 'dark'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-all ${
                themeMode === 'dark'
                  ? 'bg-[#111] text-gray-400 hover:text-white border border-[#222]'
                  : 'bg-white text-gray-600 hover:text-black border border-gray-200'
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
            ? 'bg-[#0a0a0a] text-white border-t border-[#222]'
            : 'bg-white text-gray-900 border-t border-gray-200'
        }`}>
          <div className="space-y-2 mb-6">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-md text-sm font-semibold transition-all ${
                    isActive
                      ? themeMode === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                      : themeMode === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-[#111]'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className={`pt-4 border-t space-y-3 ${themeMode === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full py-3.5 rounded-md font-semibold text-sm flex items-center justify-center space-x-2 transition-colors duration-200 ${
                themeMode === 'dark' ? 'bg-gray-100 hover:bg-white text-gray-900' : 'bg-gray-900 hover:bg-black text-white'
              }`}
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
