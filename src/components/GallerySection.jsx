import React, { useState } from 'react';
import { Camera, Video, Play, X, MapPin, Award, Sparkles, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function GallerySection() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Photos Dataset with real Bangladesh visual links
  const galleryPhotos = [
    {
      id: 1,
      category: "Education",
      titleEn: "School-Based Primary Education in Coastal Fishing Village",
      titleBn: "উপকূলীয় মৎস্যজীবী গ্রামের সামাজিক প্রাথমিক বিদ্যালয়",
      location: "Chakaria & Kutubdia, Cox's Bazar",
      donor: "UNDP / BRAC",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      descriptionEn: "Children attending ASC community primary schools across coastal fishing unions in Cox's Bazar.",
      descriptionBn: "কক্সবাজারের উপকূলীয় মৎস্যজীবী এলাকার প্রাথমিক বিদ্যালয়ে অধ্যয়নরত শিক্ষার্থীরা।"
    },
    {
      id: 2,
      category: "Disability",
      titleEn: "Education Materials Support for Disabled Students",
      titleBn: "প্রতিবন্ধী শিক্ষার্থীদের মাঝে শিক্ষা উপকরণ বিতরণ",
      location: "Chakaria Municipality, Cox's Bazar",
      donor: "ASC Organizational Fund",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
      descriptionEn: "Distribution of specialized disability learning aids and mobility tools through self-help groups.",
      descriptionBn: "স্বনির্ভর দলের মাধ্যমে বিশেষ চাহিদাসম্পন্ন প্রতিবন্ধী শিক্ষার্থীদের শিক্ষা উপকরণ প্রদান।"
    },
    {
      id: 3,
      category: "Disaster Relief",
      titleEn: "Farma-Tent Emergency Relief Shelter Camp",
      titleBn: "ফার্মা-টেন্ট জরুরি আশ্রয় তাবু ও ত্রাণ ক্যাম্প",
      location: "Pekua & Kutubdia Coastal Belt",
      donor: "ASC Emergency Unit",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
      descriptionEn: "300-family capacity Farma-tent shelters deployed during cyclone and flash flood emergencies.",
      descriptionBn: "ঘূর্ণিঝড় ও বন্যার সময় ৩০০ পরিবার ধারণক্ষমতার ফার্মা-টেন্ট তাবু স্থাপন।"
    },
    {
      id: 4,
      category: "Environment",
      titleEn: "Roadside Plantation & Green Belt Reforestation",
      titleBn: "উপকূলীয় গ্রিন বেল্ট ও সড়কবান্ধব বনায়ন",
      location: "Chakaria (09 Unions) & Pekua",
      donor: "LGED",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      descriptionEn: "Reforestation along coastal roads to combat tidal surge erosion and cyclone winds.",
      descriptionBn: "উপকূলীয় এলাকায় ভূমিক্ষয় ও জলোচ্ছ্বাস প্রতিরোধে বৃক্ষরোপণ কর্মসূচি।"
    },
    {
      id: 5,
      category: "Energy",
      titleEn: "Household Biogas & Clean Cookstove Installation",
      titleBn: "পার্বত্য লামায় বায়োগ্যাস ও ধোঁয়ামুক্ত চুলা স্থাপন",
      location: "Lama Upazila, Bandarban",
      donor: "LGED / DAE",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      descriptionEn: "Clean cooking biogas plants installed in indigenous hill-tract communities of Lama.",
      descriptionBn: "বান্দরবানের লামায় পরিবেশবান্ধব বায়োগ্যাস ও উন্নত চুলা বিতরণ।"
    },
    {
      id: 6,
      category: "Advocacy",
      titleEn: "Theater for Development (T4D) Street Drama",
      titleBn: "বাল্যবিয়ে ও নারী পাচার প্রতিরোধে সচেতনতামূলক নাটক",
      location: "Chakaria Upazila Markets",
      donor: "CARE Bangladesh",
      image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80",
      descriptionEn: "Street theatre raising social awareness on anti-trafficking, child marriage, and dowry elimination.",
      descriptionBn: "নারী পাচার, বাল্যবিয়ে ও যৌতুক প্রথা বন্ধে জনসচেতনতামূলক পথনাটক।"
    }
  ];

  // Videos Dataset
  const galleryVideos = [
    {
      id: "vid-1",
      titleEn: "Documentary: Empowerment of Coastal Fishing Communities in Cox's Bazar",
      titleBn: "ডকুমেন্টারি: কক্সবাজারের উপকূলীয় মৎস্যজীবী জনগোষ্ঠীর শিক্ষায় উন্নয়ন",
      location: "Chakaria & Pekua",
      duration: "4:15",
      embedUrl: "https://www.youtube.com/embed/LXb3EKWsInQ",
      thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "vid-2",
      titleEn: "Disaster Preparedness & Farma-Tent Emergency Relief Operations",
      titleBn: "দুর্যোগ ব্যবস্থাপনা ও ফার্মা-টেন্ট জরুরি ত্রাণ কার্যক্রম",
      location: "Kutubdia & Pekua",
      duration: "3:40",
      embedUrl: "https://www.youtube.com/embed/2g811Eo7K8U",
      thumbnail: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "vid-3",
      titleEn: "Theater for Development (T4D): Social Awareness Street Drama",
      titleBn: "উন্নয়নের জন্য নাটক (T4D): বাল্যবিয়ে ও যৌতুক প্রতিরোধ পথনাটক",
      location: "Chakaria Municipality",
      duration: "5:02",
      embedUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
      thumbnail: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = ['All', 'Education', 'Disability', 'Disaster Relief', 'Environment', 'Advocacy'];

  const filteredPhotos = activeCategory === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-cyan-400 text-xs font-extrabold uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            {lang === 'en' ? 'Media & Field Action Gallery' : 'ফিল্ড কার্যক্রমের ছবি ও ভিডিও গ্যালারি'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'en' ? 'Photos & Video Documentaries from Bangladesh' : 'বাংলাদেশের উপকূলীয় এলাকার বাস্তব চিত্র ও ভিডিও'}
          </h2>
          <p className="text-slate-400 text-base">
            {lang === 'en'
              ? 'Real field photography and video documentaries of ASC programs across Cox’s Bazar & Bandarban.'
              : 'কক্সবাজার ও বান্দরবানে পরিচালিত এনজিও কর্মসূচির ছবি ও ভিডিও ফুটেজ।'}
          </p>
        </div>

        {/* Media Type Switcher Tabs (Photos vs Videos) */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'photos'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'en' ? 'Photo Gallery' : 'ছবি গ্যালারি'}</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'videos'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{lang === 'en' ? 'Video Documentaries' : 'ভিডিও ডকুমেন্টারি'}</span>
          </button>
        </div>

        {/* Category Filters (for Photos) */}
        {activeTab === 'photos' && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/50'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* PHOTOS GRID */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(photo)}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all card-hover group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-300 backdrop-blur-md border border-cyan-500/30">
                    {photo.category}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {photo.location}
                    </span>
                    <Eye className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-emerald-400">Donor: {photo.donor}</span>
                  <h4 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">
                    {lang === 'en' ? photo.titleEn : photo.titleBn}
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-2">
                    {lang === 'en' ? photo.descriptionEn : photo.descriptionBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIDEOS GRID */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all card-hover group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  <span className="absolute top-3 right-3 text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {vid.location}
                  </span>
                  <h4 className="font-bold text-white text-base leading-snug group-hover:text-rose-300 transition-colors">
                    {lang === 'en' ? vid.titleEn : vid.titleBn}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IMAGE LIGHTBOX MODAL */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-4 relative overflow-hidden shadow-2xl space-y-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 text-white/80 hover:text-white p-2 rounded-lg bg-black/50"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={selectedImage.image}
                alt={selectedImage.titleEn}
                className="w-full max-h-[60vh] object-cover rounded-xl"
              />

              <div className="space-y-2 text-slate-200">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedImage.category} | {selectedImage.location}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'en' ? selectedImage.titleEn : selectedImage.titleBn}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en' ? selectedImage.descriptionEn : selectedImage.descriptionBn}
                </p>
                <p className="text-xs text-emerald-400 font-semibold pt-1">
                  Supported by: {selectedImage.donor}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIDEO PLAYER MODAL */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-4 relative overflow-hidden shadow-2xl space-y-4">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute right-4 top-4 text-white/80 hover:text-white p-2 rounded-lg bg-black/50 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.titleEn}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedVideo.location}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'en' ? selectedVideo.titleEn : selectedVideo.titleBn}
                </h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
