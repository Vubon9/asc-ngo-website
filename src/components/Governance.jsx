import React from 'react';
import { UserCheck, Shield, BookOpen, Stethoscope, Briefcase, Scale, Newspaper, Award } from 'lucide-react';

export default function Governance() {
  const executiveCommittee = [
    { role: "Chairman", name: "Mr. Mohammad Shoieb" },
    { role: "Vice Chairman", name: "Shahidul Hoque" },
    { role: "Secretary & Chief Executive", name: "Mohammad Nazmus Salam Tahi" },
    { role: "Treasurer", name: "Ashekur Rahman" },
    { role: "Executive Member", name: "Asaduzzaman" },
    { role: "Executive Member", name: "Hossain Ullah Chowdhury" },
    { role: "Executive Member", name: "Shamshad Begum" },
  ];

  const advisors = [
    {
      name: "Professor Dr. Faridul Islam",
      designation: "Principal, BGC Trust Medical College, Chandnaish, Chittagong",
      icon: Stethoscope
    },
    {
      name: "Dr. Nazmul Hasan, Ph.D.",
      designation: "Head of Department (Nutrition), Dhaka University",
      icon: BookOpen
    },
    {
      name: "Advocate Salim Newaz",
      designation: "Judge Court, Cox’s Bazar",
      icon: Scale
    },
    {
      name: "Ariful Islam Chy",
      designation: "Prominent Business Leader",
      icon: Briefcase
    },
    {
      name: "Ibnea Amin",
      designation: "Journalist, Daily Ittefaq",
      icon: Newspaper
    }
  ];

  const techAdvisors = [
    {
      name: "Mr. Tajibur Rahaman",
      designation: "Chief Executive Officer, Change Maker, Dhaka"
    },
    {
      name: "Mr. Shahidul Hoque",
      designation: "Field Research Manager, ICDDR, B"
    }
  ];

  return (
    <section id="governance" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-cyan-700 text-xs font-extrabold uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Governance & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Executive Committee & Advisory Board
          </h2>
          <p className="text-slate-600 text-base">
            Guided by experienced development professionals, medical practitioners, legal advocates, and academics.
          </p>
        </div>

        {/* Executive Committee Grid */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-700" />
            Executive Committee Members
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveCommittee.map((member, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-cyan-400 transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-800 font-bold flex items-center justify-center text-sm mb-3">
                  {member.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block mb-1">
                  {member.role}
                </span>
                <h4 className="font-bold text-slate-900 text-base">
                  {member.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors & Technical Advisory Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* General Advisory Board */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              Advisory Board
            </h3>

            <div className="space-y-4">
              {advisors.map((adv, idx) => {
                const IconComponent = adv.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{adv.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{adv.designation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Advisors */}
          <div className="lg:col-span-5 bg-cyan-950 border border-cyan-800/80 text-white rounded-2xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-300">
              <Award className="w-5 h-5 text-emerald-400" />
              Technical Advisors
            </h3>

            <div className="space-y-4">
              {techAdvisors.map((tAdv, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-cyan-800/50 space-y-1">
                  <h4 className="font-bold text-white text-base">{tAdv.name}</h4>
                  <p className="text-xs text-cyan-300">{tAdv.designation}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-cyan-900/40 border border-cyan-700/40 text-xs text-cyan-200 leading-relaxed">
              <p className="font-bold mb-1">Chief Executive & Contact Officer:</p>
              <p className="font-semibold text-white">Mohammad Nazmus Salam Tahi</p>
              <p>Cell: 01819-861950, 01819-396400 | Tel: 03422-56488</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
