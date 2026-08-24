import React, { useState } from 'react';
import { Phone, Mail, MapPin, HeartHandshake, ShieldCheck, Menu, X, Lock } from 'lucide-react';

export default function Navbar({ onOpenContact, onOpenVolunteer, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-mx auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-medium text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Govt Reg: DSS-Cox-228/03 | Youth Dev: Cox-151/09
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Chakaria, Cox’s Bazar, Bangladesh
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a href="tel:01819861950" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              01819-861950
            </a>
            <a href="mailto:asc.org.bd@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              asc.org.bd@gmail.com
            </a>
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors border-l border-slate-700 pl-3"
            >
              <Lock className="w-3 h-3" />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <a href="#" className="flex items-center gap-3.5 group">
            <img 
              src="/asc-logo.png" 
              alt="Assistance for Safe Community (ASC) Logo" 
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight block leading-none">
                Assistance for Safe Community
              </span>
              <span className="text-xs font-semibold tracking-wider text-cyan-700 uppercase mt-1 block">
                (ASC) - NGO Cox's Bazar
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <a href="#about" className="hover:text-cyan-700 transition-colors">About Us</a>
            <a href="#programs" className="hover:text-cyan-700 transition-colors">Ongoing Programs</a>
            <a href="#strengths" className="hover:text-cyan-700 transition-colors">Impact & Assets</a>
            <a href="#governance" className="hover:text-cyan-700 transition-colors">Leadership</a>
            <button onClick={onOpenContact} className="hover:text-cyan-700 transition-colors">Contact</button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenVolunteer}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <HeartHandshake className="w-4 h-4" />
              Join / Support ASC
            </button>
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 bg-cyan-800 hover:bg-cyan-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-medium hover:text-cyan-700 py-1"
          >
            About Us
          </a>
          <a
            href="#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-medium hover:text-cyan-700 py-1"
          >
            Ongoing Programs
          </a>
          <a
            href="#strengths"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-medium hover:text-cyan-700 py-1"
          >
            Impact & Assets
          </a>
          <a
            href="#governance"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-700 font-medium hover:text-cyan-700 py-1"
          >
            Leadership
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVolunteer(); }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              Join / Support ASC
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              className="w-full bg-cyan-800 hover:bg-cyan-900 text-white font-bold py-2.5 rounded-lg text-sm"
            >
              Contact Us
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full text-slate-600 hover:text-slate-900 font-medium py-1.5 text-xs text-center border border-slate-200 rounded-md"
            >
              Admin Inbox Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
