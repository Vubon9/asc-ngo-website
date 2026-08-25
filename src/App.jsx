import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext.jsx';
import AccessibilityToolbar from './components/AccessibilityToolbar.jsx';
import EmergencyBanner from './components/EmergencyBanner.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProgramsSection from './components/ProgramsSection.jsx';
import ImpactSection from './components/ImpactSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import Governance from './components/Governance.jsx';
import Footer from './components/Footer.jsx';
import ContactModal from './components/ContactModal.jsx';
import VolunteerModal from './components/VolunteerModal.jsx';
import DonationModal from './components/DonationModal.jsx';
import AdminPortal from './components/AdminPortal.jsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
        
        {/* Top Accessibility & Emergency Header */}
        <AccessibilityToolbar />
        <EmergencyBanner />

        {/* Header Navigation */}
        <Navbar
          onOpenContact={() => setIsContactOpen(true)}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
          onOpenDonate={() => setIsDonateOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Main Page Sections */}
        <main className="flex-grow">
          <Hero
            onOpenContact={() => setIsContactOpen(true)}
            onOpenVolunteer={() => setIsVolunteerOpen(true)}
            onOpenDonate={() => setIsDonateOpen(true)}
          />
          <AboutSection />
          <ProgramsSection />
          <ImpactSection />
          <GallerySection />
          <Governance />
        </main>

        {/* Footer */}
        <Footer
          onOpenContact={() => setIsContactOpen(true)}
          onOpenVolunteer={() => setIsVolunteerOpen(true)}
        />

        {/* Interactive Modals & Admin Portal */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        <VolunteerModal
          isOpen={isVolunteerOpen}
          onClose={() => setIsVolunteerOpen(false)}
        />

        <DonationModal
          isOpen={isDonateOpen}
          onClose={() => setIsDonateOpen(false)}
        />

        <AdminPortal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />

      </div>
    </LanguageProvider>
  );
}
