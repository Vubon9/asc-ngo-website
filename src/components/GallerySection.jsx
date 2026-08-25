import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function GallerySection() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');

  const galleryItems = [
    {
      id: 1,
      category: "Education",
      titleEn: "Community School in Coastal Fishing Village",
      titleBn: "উপকূলীয় মৎস্যজীবী গ্রামের সামাজিক প্রাথমিক বিদ্যালয়",
      location: "Kutubdia, Cox's Bazar",
      donor: "UNDP / BRAC",
      imgBg: "from-cyan-900 via-teal-800 to-slate-900",
      tag: "School Education"
    },
    {
      id: 2,
      category: "Disability",
      titleEn: "Learning Materials Distribution to Disabled Children",
      titleBn: "প্রতিবন্ধী শিশুদের মাঝে শিক্ষা উপকরণ বিতরণ",
      location: "Chakaria, Cox's Bazar",
      donor: "ASC Organizational Fund",
      imgBg: "from-purple-900 via-indigo-900 to-slate-900",
      tag: "Inclusion & Care"
    },
    {
      id: 3,
      category: "Disaster Relief",
      titleEn: "Farma-Tent Shelter Readiness Camp",
      titleBn: "ফার্মা-টেন্ট জরুরি আশ্রয় কেন্দ্র ও প্রস্তুতি ক্যাম্প",
      location: "Pekua & Chakaria",
      donor: "ASC Emergency Unit",
      imgBg: "from-rose-950 via-amber-900 to-slate-900",
      tag: "Disaster Preparedness"
    },
    {
      id: 4,
      category: "Environment",
      titleEn: "Roadside Tree Plantation & Coastal Green Belt",
      titleBn: "উপকূলীয় গ্রিন বেল্ট ও সড়কবান্ধব সামাজিক বনায়ন",
      location: "Chakaria (09 Unions)",
      donor: "LGED",
      imgBg: "from-emerald-950 via-teal-900 to-slate-900",
      tag: "Afforestation"
    },
    {
      id: 5,
      category: "Energy",
      titleEn: "Household Biogas Plant Installation",
      titleBn: "পার্বত্য লামায় পারিবারিক বায়োগ্যাস প্ল্যান্ট স্থাপন",
      location: "Lama, Bandarban",
      donor: "LGED / DAE",
      imgBg: "from-amber-950 via-stone-900 to-slate-900",
      tag: "Renewable Energy"
    },
    {
      id: 6,
      category: "Advocacy",
      titleEn: "Theater for Development (T4D) Street Drama",
      titleBn: "বাল্যবিয়ে ও নারী পাচার প্রতিরোধে পথনাটক",
      location: "Chakaria Upazila",
      donor: "CARE Bangladesh",
      imgBg: "from-slate-900 via-cyan-950 to-slate-900",
      tag: "Social Advocacy"
    }
  ];

  const categories = ['All', 'Education', 'Disability', 'Disaster Relief', 'Environment', 'Advocacy'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-cyan-400 text-xs font-extrabold uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            {lang === 'en' ? 'Visual Impact Gallery' : 'ফিল্ড কার্যক্রমের ছবি গ্যালারি'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'en' ? 'ASC Field Impact & Community Action' : 'তৃণমূল পর্যায়ে অ্যাসিস্ট্যান্স ফর সেফ কমিউনিটি'}
          </h2>
          <p className="text-slate-400 text-base">
            {lang === 'en'
              ? 'Empirical view of our coastal education programs, emergency shelters, greenbelt tree plantations, and advocacy activities.'
              : 'উপকূলীয় বিদ্যালয়, জরুরি আশ্রয় তাবু, সামাজিক বনায়ন ও সচেতনতামূলক নাটকের আলোকচিত্র।'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all card-hover flex flex-col justify-between"
            >
              {/* Visual Card Banner */}
              <div className={`h-48 bg-gradient-to-br ${item.imgBg} p-6 relative flex flex-col justify-between`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/40 text-cyan-300 backdrop-blur-md border border-cyan-500/30">
                    {item.tag}
                  </span>
                  <Camera className="w-5 h-5 text-white/70" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-semibold block">
                    Supported by: {item.donor}
                  </span>
                  <h4 className="font-bold text-white text-base leading-snug">
                    {lang === 'en' ? item.titleEn : item.titleBn}
                  </h4>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                  {item.location}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">ASC Field Ops</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
