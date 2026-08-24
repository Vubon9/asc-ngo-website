import React from 'react';
import { Target, Compass, Flag, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-cyan-700 text-xs font-extrabold uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            About Our Organization
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Assistance for Safe Community (ASC)
          </h2>
          <p className="text-slate-600 text-base">
            Serving disadvantaged coastal and hill-tract communities across Chakaria, Pekua, Kutubdia, Moheskhali, and Lama since 2001.
          </p>
        </div>

        {/* Legal Entity & Overview Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 mb-16 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Non-Government & Non-Profit NGO</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Established on <strong>1st December 2001</strong>, Assistance for Safe Community (ASC) is committed to uplifting the poorest segments of society, with a primary focus on women, children, and individuals with disabilities. 
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              ASC works actively in education, primary healthcare, disaster preparedness, roadside plantation, renewable energy, and rights entitlement for disabled people through self-help groups.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider text-cyan-800">
              <ShieldCheck className="w-5 h-5 text-cyan-600" />
              Government Registrations
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900">Directorate of Social Services (DSS)</p>
                <p className="text-slate-600">Reg No: <span className="font-semibold text-cyan-700">DSS-Cox-228/03</span></p>
                <p className="text-slate-500 text-xs">Reg Date: 04 January 2003</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <p className="font-bold text-slate-900">Department of Youth Development</p>
                <p className="text-slate-600">Reg No: <span className="font-semibold text-cyan-700">Cox-151/09</span></p>
                <p className="text-slate-500 text-xs">Reg Date: 06 November 2009</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-4 shadow-md relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 flex items-center justify-center text-cyan-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              ASC is committed to develop a society where the people are free to lead a dignified life by availing the opportunities provided by the state.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-cyan-800 text-white rounded-2xl p-8 space-y-4 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-200">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="text-cyan-100 text-sm leading-relaxed">
              Enhance capacity building of service providers and community people by providing need-based support for change through proper local resource utilization.
            </p>
          </div>

          {/* Goal */}
          <div className="bg-emerald-800 text-white rounded-2xl p-8 space-y-4 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-200">
              <Flag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Our Goal</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Strengthening sustainable development for disadvantaged people through an integrated program of Education, Health, Human Rights, and Advocacy.
            </p>
          </div>
        </div>

        {/* Key Objectives */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Core Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                Mobilize and organize disadvantaged people through education, awareness raising, and information dissemination.
              </p>
            </div>

            <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                Improve social awareness towards disadvantaged people for their fundamental rights and legal entitlements.
              </p>
            </div>

            <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                Ensure service delivery from providers, raise awareness among coastal populations, and build natural disaster preparedness.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
