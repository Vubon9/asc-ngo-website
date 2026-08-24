import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer({ onOpenContact, onOpenVolunteer }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Logo & Org Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/asc-logo.png" alt="ASC Logo" className="h-12 w-auto bg-white p-1 rounded-md" />
              <div>
                <h4 className="text-white font-bold text-lg leading-tight">Assistance for Safe Community</h4>
                <p className="text-xs text-cyan-400 font-semibold">(ASC) - NGO Cox's Bazar</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Established in December 2001, Assistance for Safe Community (ASC) is a non-government, non-political, and non-profit organization dedicated to improving the livelihoods of women, children, disabled people, and coastal fishing communities across Cox's Bazar and Bandarban.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-300">
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                Govt Reg: DSS-Cox-228/03 (2003)
              </span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                Youth Dev: Cox-151/09 (2009)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About ASC</a></li>
              <li><a href="#programs" className="hover:text-cyan-400 transition-colors">Ongoing Projects</a></li>
              <li><a href="#strengths" className="hover:text-cyan-400 transition-colors">Strengths & Emergency Assets</a></li>
              <li><a href="#governance" className="hover:text-cyan-400 transition-colors">Executive Committee</a></li>
              <li><button onClick={onOpenContact} className="hover:text-cyan-400 transition-colors text-left">Contact Office</button></li>
              <li><button onClick={onOpenVolunteer} className="hover:text-cyan-400 transition-colors text-left">Volunteer & Partner</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h5 className="text-white font-bold text-sm tracking-wider uppercase">Executive Office Contact</h5>
            
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Address:</strong> Thana-Center, Bharamuhuri, Chakaria Municipality, Chiringa-C.C 4741, Chakaria, Cox’s Bazar, Bangladesh.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p><strong>Chief Executive:</strong> Mohammad Nazmus Salam Tahi</p>
                  <p><strong>Cell:</strong> 01819-861950, 01819-396400 | <strong>Phone:</strong> 03422-56488</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p>asc.org.bd@gmail.com</p>
                  <p>numanchakaria@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Assistance for Safe Community (ASC). All rights reserved.</p>
          <p>Empowering Communities in Chakaria, Pekua, Kutubdia, Moheskhali & Lama.</p>
        </div>

      </div>
    </footer>
  );
}
