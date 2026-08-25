import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, Info, RefreshCw, Tag } from 'lucide-react';
import { programsData as staticPrograms } from '../../server/data/programsData.js';
import { useLanguage } from '../context/LanguageContext';

export default function ProgramsSection() {
  const { t, lang } = useLanguage();
  const [programs, setPrograms] = useState(staticPrograms);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('All');
  const [selectedDonor, setSelectedDonor] = useState('All');
  const [selectedSdg, setSelectedSdg] = useState('All');

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedUpazila !== 'All') params.append('upazila', selectedUpazila);
      if (selectedDonor !== 'All') params.append('donor', selectedDonor);
      if (selectedSdg !== 'All') params.append('sdg', selectedSdg);

      const res = await fetch(`/api/programs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPrograms(data.programs || []);
      } else {
        filterStaticData();
      }
    } catch (err) {
      filterStaticData();
    } finally {
      setLoading(false);
    }
  };

  const filterStaticData = () => {
    let filtered = [...staticPrograms];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.titleBn && p.titleBn.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (selectedUpazila !== 'All') {
      filtered = filtered.filter(p => p.upazila.toLowerCase().includes(selectedUpazila.toLowerCase()));
    }
    if (selectedDonor !== 'All') {
      filtered = filtered.filter(p => p.donor.toLowerCase().includes(selectedDonor.toLowerCase()));
    }
    if (selectedSdg !== 'All') {
      filtered = filtered.filter(p => p.sdgs && p.sdgs.includes(selectedSdg));
    }
    setPrograms(filtered);
  };

  useEffect(() => {
    fetchPrograms();
  }, [searchQuery, selectedUpazila, selectedDonor, selectedSdg]);

  const upazilaOptions = ['All', 'Chakaria', 'Pekua', 'Kutubdia', 'Lama'];
  const donorOptions = ['All', 'UNDP', 'BRAC', 'LGED', 'DAE', 'CARE Bangladesh', 'ASC'];
  const sdgOptions = ['All', 'SDG 1', 'SDG 3', 'SDG 4', 'SDG 5', 'SDG 7', 'SDG 13', 'SDG 15'];

  return (
    <section id="programs" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-cyan-400 text-xs font-extrabold uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            {t('programsTag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t('programsHeading')}
          </h2>
          <p className="text-slate-400 text-base">
            {t('programsSub')}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 mb-10 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Upazila Select */}
            <div className="md:col-span-3">
              <label className="text-xs text-slate-400 block mb-1 font-medium">{t('filterUpazila')}</label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {upazilaOptions.map(u => <option key={u} value={u}>{u === 'All' ? t('allUpazilas') : u}</option>)}
              </select>
            </div>

            {/* Donor Select */}
            <div className="md:col-span-3">
              <label className="text-xs text-slate-400 block mb-1 font-medium">{t('filterDonor')}</label>
              <select
                value={selectedDonor}
                onChange={(e) => setSelectedDonor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {donorOptions.map(d => <option key={d} value={d}>{d === 'All' ? t('allDonors') : d}</option>)}
              </select>
            </div>

            {/* SDG Select */}
            <div className="md:col-span-2">
              <label className="text-xs text-slate-400 block mb-1 font-medium">UN SDG Tag:</label>
              <select
                value={selectedSdg}
                onChange={(e) => setSelectedSdg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {sdgOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
            <span>Showing <strong>{programs.length}</strong> active project(s)</span>
            {(selectedUpazila !== 'All' || selectedDonor !== 'All' || selectedSdg !== 'All' || searchQuery) && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedUpazila('All'); setSelectedDonor('All'); setSelectedSdg('All'); }}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, idx) => (
            <div
              key={prog.id || idx}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all card-hover"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {lang === 'en' ? prog.category : (prog.categoryBn || prog.category)}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {prog.donor}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {lang === 'en' ? prog.title : (prog.titleBn || prog.title)}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {lang === 'en' ? prog.description : (prog.descriptionBn || prog.description)}
                </p>

                {/* SDG Target Tags */}
                {prog.sdgs && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {prog.sdgs.map((sdgTag) => (
                      <span key={sdgTag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-cyan-400" />
                        {sdgTag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span><strong>Area:</strong> {prog.district}, Upazila: {prog.upazila}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong>Coverage:</strong> {prog.unions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {programs.length === 0 && (
          <div className="text-center py-16 bg-slate-800/50 border border-slate-700 rounded-2xl">
            <Info className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold text-base">No programs found matching your filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedUpazila('All'); setSelectedDonor('All'); setSelectedSdg('All'); }}
              className="mt-4 text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg"
            >
              Clear Search & View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
