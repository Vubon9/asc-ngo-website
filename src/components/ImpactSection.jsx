import React from 'react';
import { ShieldCheck, Tent, MessageSquareHeart, Users, Award, Building, Landmark } from 'lucide-react';

export default function ImpactSection() {
  const govtCommittees = [
    "Management Committee of Upazilla Health Complex",
    "House Rehabilitation Committee of GoB",
    "Upazilla Disaster Management Committee",
    "Rehabilitation of Acid-burned Women and Disabled Committee",
    "Upazilla Agriculture Development Committee",
    "Legal Aid Support Committee of Chakaria Court"
  ];

  const nonGovtCommittees = [
    "ATSEC Bangladesh (Anti-Trafficking & Rights)",
    "International Volunteer Service (IVS)",
    "Chittagong Social Development Forum (CSDF)",
    "Local Partner with Change Maker",
    "Local Partner with CEGIS",
    "Local Partner with CONCERN Universal",
    "Local Partner with BRAC",
    "Local Partner with Room to Read"
  ];

  return (
    <section id="strengths" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-emerald-700 text-xs font-extrabold uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Strengths & Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Institutional Strength & Emergency Preparedness
          </h2>
          <p className="text-slate-600 text-base">
            Deep community integration, disaster readiness, and official committee representation across Government and NGO forums.
          </p>
        </div>

        {/* Unique Strengths & Assets Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Asset Card: Emergency Tents */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Tent className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">300-Family Farma-Tent Relief Asset</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ASC owns Farma-tents capable of sheltering at least <strong>300 families</strong> simultaneously during cyclones, flash floods, and coastal emergency disasters.
            </p>
          </div>

          {/* Asset Card: Dialect Proficiency */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Chittagonian Local Language Expertise</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Staff and facilitators are fluent native speakers of the local Chittagong dialect, ensuring 100% community trust, empathy, and seamless mobilization.
            </p>
          </div>

          {/* Asset Card: Infrastructure */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Own Office & Logistics Fleet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with permanent office premises in Court Road, Chiringa C.C, motorbikes for field access to remote off-grid coastal unions, and sound management.
            </p>
          </div>

        </div>

        {/* Committee Representation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Govt Committee Memberships */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Landmark className="w-6 h-6 text-cyan-700" />
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Government Committee Representation</h3>
                <p className="text-xs text-slate-500">Official policy & rehabilitation committees</p>
              </div>
            </div>

            <ul className="space-y-3">
              {govtCommittees.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Govt Committee Memberships */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Users className="w-6 h-6 text-emerald-700" />
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Non-Government & Alliance Networks</h3>
                <p className="text-xs text-slate-500">National & international NGO networks</p>
              </div>
            </div>

            <ul className="space-y-3">
              {nonGovtCommittees.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
