/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, ThemeMode } from './types';
import { Particles3D } from './components/Particles3D';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { JourneySection } from './components/JourneySection';
import { BrandsSection } from './components/BrandsSection';
import { GlobalPresenceSection } from './components/GlobalPresenceSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { SearchModal } from './components/SearchModal';
import { LegalModal } from './components/LegalModal';
import { PasswordProtectedModal } from './components/PasswordProtectedModal';
import { AccountsCredentialModal } from './components/AccountsCredentialModal';
import { UsersCredentialModal } from './components/UsersCredentialModal';
import { CareersPage } from './components/Pages/CareersPage';
import { COMPANY_INFO } from './data/companyData';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [credentialModalType, setCredentialModalType] = useState<'accounts' | 'users' | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    // Keyboard shortcut CMD+K / CTRL+K for Search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(view);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenCredentialModal = (type: 'accounts' | 'users') => {
    setCredentialModalType(type);
    setIsPasswordVerified(false);
  };

  const handleCloseCredentialModal = () => {
    setCredentialModalType(null);
    setIsPasswordVerified(false);
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-300 selection:bg-maroon-500 selection:text-beige-50 ${
      themeMode === 'dark' ? 'bg-maroon-950 text-beige-100' : 'bg-beige-100 text-maroon-950'
    }`}>
      {/* 3D Ambient Particles Canvas Removed for minimal aesthetic */}
      {/* <Particles3D themeMode={themeMode} /> */}

      {/* Top Fixed Header Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Single-Page Animated Layout */}
      <main className="relative z-10">
        <HeroSection onNavigate={handleNavigate} themeMode={themeMode} />
        <AboutSection themeMode={themeMode} />
        <JourneySection themeMode={themeMode} />
        <BrandsSection themeMode={themeMode} />
        <ServicesSection themeMode={themeMode} />
        <ProcessSection themeMode={themeMode} />
        <WhyChooseUsSection themeMode={themeMode} />
        <GlobalPresenceSection themeMode={themeMode} />
        <CareersPage themeMode={themeMode} />
        <TestimonialsSection themeMode={themeMode} />
        <ContactSection themeMode={themeMode} />
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        themeMode={themeMode} 
        onOpenLegalModal={setLegalModalType}
        onOpenCredentialModal={handleOpenCredentialModal}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        themeMode={themeMode}
      />

      {/* Legal Popup Modal for Privacy Policy & Terms */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        themeMode={themeMode}
      />

      {/* Password Protection for Credentials */}
      <PasswordProtectedModal
        isOpen={credentialModalType !== null && !isPasswordVerified}
        onClose={handleCloseCredentialModal}
        onSuccess={() => setIsPasswordVerified(true)}
        themeMode={themeMode}
        title={credentialModalType === 'accounts' ? 'Accounts Credential' : 'Users Credential'}
      />

      {/* Accounts Credential Modal */}
      <AccountsCredentialModal
        isOpen={credentialModalType === 'accounts' && isPasswordVerified}
        onClose={handleCloseCredentialModal}
        themeMode={themeMode}
      />

      {/* Users Credential Modal */}
      <UsersCredentialModal
        isOpen={credentialModalType === 'users' && isPasswordVerified}
        onClose={handleCloseCredentialModal}
        themeMode={themeMode}
      />
    </div>
  );
}
