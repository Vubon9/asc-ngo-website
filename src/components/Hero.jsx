import React from 'react';
import { ShieldCheck, HeartHandshake, Award, Users, BookOpen, Tent, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onOpenContact, onOpenVolunteer, onOpenDonate }) {
  const { t, lang } = useLanguage();

  const sdgBadges = [
    { code: "SDG 1", title: "No Poverty", color: "bg-red-600" },
    { code: "SDG 3", title: "Good Health", color: "bg-emerald-600" },
    { code: "SDG 4", title: "Quality Education", color: "bg-red-700" },
    { code: "SDG 5", title: "Gender Equality", color: "bg-amber-600" },
    { code: "SDG 13", title: "Climate Action", color: "bg-teal-700" },
    { code: "SDG 15", title: "Life on Land", color: "bg-green-600" },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-950/90 border border-cyan-700/60 text-cyan-300 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{t('heroBadge')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t('heroTitlePrefix')} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                {t('heroTitleSuffix')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t('heroDescription')}
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
              >
                {t('viewProjects')}
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDonate}
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
              >
                <Heart className="w-4 h-4 fill-white" />
                {lang === 'en' ? 'Make a Donation' : 'অনুদান দিন'}
              </button>

              <button
                onClick={onOpenVolunteer}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:translate-y-[-2px]"
              >
                <HeartHandshake className="w-4 h-4" />
                {t('partnerVolunteer')}
              </button>
            </div>

            {/* UN Sustainable Development Goals (SDGs) Bar */}
            <div className="pt-6 border-t border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                UN Sustainable Development Goals (SDG Alignment):
              </span>
              <div className="flex flex-wrap gap-2">
                {sdgBadges.map((sdg, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md text-white ${sdg.color} shadow-sm`}
                  >
                    {sdg.code}: {sdg.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Stats Card Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/95 border border-slate-700/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-3">
                  <img src="/asc-logo.png" alt="ASC Logo" className="h-12 w-auto bg-white p-1 rounded-md" />
                  <div>
                    <h3 className="font-bold text-white text-base">ASC Impact Summary</h3>
                    <p className="text-xs text-slate-400">Cox's Bazar & Bandarban</p>
                  </div>
                </div>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                  Active
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-colors">
                  <BookOpen className="w-6 h-6 text-cyan-400 mb-2" />
                  <span className="text-2xl sm:text-3xl font-black text-white block">31+</span>
                  <span className="text-xs text-slate-400">{t('schoolsCount')}</span>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors">
                  <Users className="w-6 h-6 text-emerald-400 mb-2" />
                  <span className="text-2xl sm:text-3xl font-black text-white block">42+</span>
                  <span className="text-xs text-slate-400">{t('voCount')}</span>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-colors">
                  <Award className="w-6 h-6 text-amber-400 mb-2" />
                  <span className="text-2xl sm:text-3xl font-black text-white block">12</span>
                  <span className="text-xs text-slate-400">{t('programsCount')}</span>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-colors">
                  <Tent className="w-6 h-6 text-purple-400 mb-2" />
                  <span className="text-2xl sm:text-3xl font-black text-white block">300</span>
                  <span className="text-xs text-slate-400">{t('shelterCount')}</span>
                </div>
              </div>

              <div className="bg-cyan-950/60 border border-cyan-900/80 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-cyan-300 mb-1">Key Donors & Partners:</p>
                <p>UNDP, BRAC, UNFPA (with GOB), CARE Bangladesh, LGED, DAE, Room to Read, CEGIS, ATSEC.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
