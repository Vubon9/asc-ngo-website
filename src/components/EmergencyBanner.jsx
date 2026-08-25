import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, Tent, X, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EmergencyBanner() {
  const { t, lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [reqData, setReqData] = useState({
    union: '',
    familyCount: '1-5 Families',
    contactPhone: '',
    details: ''
  });

  const handleSubmitEmergency = (e) => {
    e.preventDefault();
    setRequestSubmitted(true);
  };

  return (
    <>
      {/* Alert Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 font-bold animate-pulse">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{t('emergencyAlertTitle')}</span>
            <span className="hidden md:inline font-normal text-amber-100">| {t('emergencyAlertText')}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:01819861950"
              className="flex items-center gap-1 font-extrabold bg-black/30 hover:bg-black/40 px-2.5 py-1 rounded-md text-[11px] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span>01819-861950 (Hotline)</span>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-white text-rose-900 font-extrabold px-3 py-1 rounded-md text-[11px] hover:bg-amber-100 transition-colors shadow-sm"
            >
              <Tent className="w-3.5 h-3.5 text-rose-600" />
              <span>{t('requestRelief')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Emergency Farma-Tent Relief Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-200 relative">
            
            <button
              onClick={() => { setIsModalOpen(false); setRequestSubmitted(false); }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Tent className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-bold text-slate-900">
                {lang === 'en' ? 'Emergency Relief Request' : 'জরুরি ত্রাণ ও তাবু আবেদন'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'en'
                ? 'ASC dispatches Farma-tent disaster shelters capable of accommodating up to 300 families in Cox’s Bazar & Bandarban.'
                : 'ASC কক্সবাজার ও বান্দরবানে ৩০০ পরিবার পর্যন্ত ফার্মা-টেন্ট তাবু সাহায্য পাঠায়।'}
            </p>

            {requestSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">
                  {lang === 'en'
                    ? 'Emergency request received! ASC Response Unit is dispatching relief.'
                    : 'আবেদন গৃহীত হয়েছে! এএসসি রেসপন্স টিম শীঘ্রই যোগাযোগ করছে।'}
                </p>
                <button
                  onClick={() => { setIsModalOpen(false); setRequestSubmitted(false); }}
                  className="bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEmergency} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Union / Area Location *' : 'ইউনিয়ন / এলাকা *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pekua Union 02 / Chakaria"
                    value={reqData.union}
                    onChange={(e) => setReqData({ ...reqData, union: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Affected Family Count' : 'ক্ষতিগ্রস্ত পরিবারের সংখ্যা'}
                  </label>
                  <select
                    value={reqData.familyCount}
                    onChange={(e) => setReqData({ ...reqData, familyCount: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  >
                    <option value="1-5 Families">1 - 5 Families</option>
                    <option value="6-20 Families">6 - 20 Families</option>
                    <option value="20-50 Families">20 - 50 Families</option>
                    <option value="50+ Families (Farma-Tent Dispatch)">50+ Families (Farma-Tent Shelter Dispatch)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Contact Phone Number *' : 'জরুরি মোবাইল নম্বর *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="018XXXXXXXX"
                    value={reqData.contactPhone}
                    onChange={(e) => setReqData({ ...reqData, contactPhone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Emergency Details' : 'জরুরি বিস্তারিত'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe flood/cyclone situation..."
                    value={reqData.details}
                    onChange={(e) => setReqData({ ...reqData, details: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  {lang === 'en' ? 'Submit Emergency Request' : 'জরুরি আবেদন পাঠান'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
