/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, ThemeMode, StaffApplication } from './types';
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
import { ContactSection } from './components/ContactSection';
import { SearchModal } from './components/SearchModal';
import { LegalModal } from './components/LegalModal';
import { PasswordProtectedModal } from './components/PasswordProtectedModal';
import { AccountsCredentialModal } from './components/AccountsCredentialModal';
import { UsersCredentialModal } from './components/UsersCredentialModal';
import { StaffLoginModal } from './components/StaffLoginModal';
import { EmbeddedAppViewer } from './components/EmbeddedAppViewer';
import { CareersPage } from './components/Pages/CareersPage';
import { COMPANY_INFO } from './data/companyData';
import { findStaffAppByPath } from './data/staffApps';

const isStaffLoginPath = (pathname: string, hash: string): boolean => {
  const normPath = pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
  const normHash = hash.toLowerCase().replace(/^#+/, '').replace(/^\/+|\/+$/g, '');
  return (
    normPath === 'staff-login' ||
    normPath === 'stafflogin' ||
    normPath === 'staff' ||
    normHash === 'staff-login' ||
    normHash === 'stafflogin' ||
    normHash === 'staff'
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Dedicated route detection for Staff Applications
  const [activeStaffApp, setActiveStaffApp] = useState<StaffApplication | null>(() => {
    return typeof window !== 'undefined' ? findStaffAppByPath(window.location.pathname) : null;
  });

  // Direct unique URL opening for Staff Login popup (/staff-login or #staff-login)
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Don't open popup if directly navigating to a specific embedded app
    if (findStaffAppByPath(window.location.pathname)) return false;
    return isStaffLoginPath(window.location.pathname, window.location.hash);
  });

  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [credentialModalType, setCredentialModalType] = useState<'accounts' | 'users' | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    // Handle browser back and forward navigation, plus direct hash/URL changes
    const handlePopState = () => {
      const matched = findStaffAppByPath(window.location.pathname);
      if (matched) {
        setActiveStaffApp(matched);
        setIsStaffLoginOpen(false);
        document.title = `${matched.name} | May Integrated Services LLP`;
      } else if (isStaffLoginPath(window.location.pathname, window.location.hash)) {
        setActiveStaffApp(null);
        setIsStaffLoginOpen(true);
        document.title = 'Staff Login | May Integrated Services LLP';
      } else {
        setActiveStaffApp(null);
        setIsStaffLoginOpen(false);
        document.title = 'May Integrated Services LLP';
      }
    };

    if (activeStaffApp) {
      document.title = `${activeStaffApp.name} | May Integrated Services LLP`;
    } else if (isStaffLoginOpen) {
      document.title = 'Staff Login | May Integrated Services LLP';
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [activeStaffApp, isStaffLoginOpen]);

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

  const handleOpenStaffLogin = () => {
    setIsStaffLoginOpen(true);
    window.history.pushState({}, '', '/staff-login');
    document.title = 'Staff Login | May Integrated Services LLP';
  };

  const handleCloseStaffLogin = () => {
    setIsStaffLoginOpen(false);
    if (isStaffLoginPath(window.location.pathname, window.location.hash)) {
      window.history.pushState({}, '', '/');
      document.title = 'May Integrated Services LLP';
    }
  };

  const handleSelectStaffApp = (app: StaffApplication) => {
    setActiveStaffApp(app);
    setIsStaffLoginOpen(false);
    window.history.pushState({}, '', app.routePath);
    document.title = `${app.name} | May Integrated Services LLP`;
  };

  const handleBackToPortal = () => {
    setActiveStaffApp(null);
    setIsStaffLoginOpen(true);
    window.history.pushState({}, '', '/staff-login');
    document.title = 'Staff Login | May Integrated Services LLP';
  };

  // If a Staff Application is active, render ONLY the full-screen embedded viewer
  // This completely removes the header, navbar, footer, and surrounding layout
  if (activeStaffApp) {
    return (
      <EmbeddedAppViewer
        app={activeStaffApp}
        onBack={handleBackToPortal}
        themeMode={themeMode}
      />
    );
  }

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
        <ContactSection themeMode={themeMode} />
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigate} 
        themeMode={themeMode} 
        onOpenLegalModal={setLegalModalType}
        onOpenCredentialModal={handleOpenCredentialModal}
        onOpenStaffLogin={handleOpenStaffLogin}
      />

      {/* Staff Login Launchpad Modal */}
      <StaffLoginModal
        isOpen={isStaffLoginOpen}
        onClose={handleCloseStaffLogin}
        onSelectApp={handleSelectStaffApp}
        themeMode={themeMode}
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
