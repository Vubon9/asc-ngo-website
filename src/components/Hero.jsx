import React from 'react';
import { ShieldCheck, HeartHandshake, Award, Users, BookOpen, Tent, ArrowRight } from 'lucide-react';

export default function Hero({ onOpenContact, onOpenVolunteer }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Established 1st December 2001 | Registered NGO (DSS & Youth Dev)
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Assistance for <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Safe Community (ASC)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              ASC is a committed non-government, non-political, and non-profit organization dedicated to improving the livelihoods of the poorest—especially women, children, and disabled individuals—across Chakaria, Pekua, Kutubdia, Moheskhali & Lama.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
              >
                View Ongoing Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenVolunteer}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
              >
                <HeartHandshake className="w-4 h-4" />
                Partner / Volunteer
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Supported by UNDP & BRAC</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Local Dialect Proficient Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Disaster Emergency Relief</span>
              </div>
            </div>
          </div>

          {/* Hero Card / Stat Counter */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-4">
                <div className="flex items-center gap-3">
                  <img src="/asc-logo.png" alt="ASC Logo" className="h-12 w-auto bg-white p-1 rounded-md" />
                  <div>
                    <h3 className="font-bold text-white text-base">ASC Impact Summary</h3>
                    <p className="text-xs text-slate-400">Cox's Bazar & Bandarban</p>
                  </div>
                </div>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <BookOpen className="w-6 h-6 text-cyan-400 mb-2" />
                  <span className="text-2xl font-black text-white block">31+</span>
                  <span className="text-xs text-slate-400">Community Schools</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <Users className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="text-2xl font-black text-white block">42+</span>
                  <span className="text-xs text-slate-400">Village Organizations</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <Award className="w-6 h-6 text-amber-400 mb-2" />
                  <span className="text-2xl font-black text-white block">12</span>
                  <span className="text-xs text-slate-400">Ongoing Programs</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <Tent className="w-6 h-6 text-purple-400 mb-2" />
                  <span className="text-2xl font-black text-white block">300</span>
                  <span className="text-xs text-slate-400">Family Shelter Tents</span>
                </div>
              </div>

              <div className="bg-cyan-950/40 border border-cyan-900/60 p-4 rounded-xl text-xs text-slate-300">
                <p className="font-semibold text-cyan-300 mb-1">Key Donors & Partners:</p>
                <p>UNDP, BRAC, UNFPA (with GOB), CARE Bangladesh, LGED, DAE, Room to Read, CEGIS, ATSEC.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
