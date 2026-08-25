import React, { useState } from 'react';
import { X, Heart, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DonationModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '50',
    currency: 'USD',
    impactOption: '1 Family Emergency Tent Relief ($50)',
    note: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const presets = [
    { amount: '10', labelEn: '$10 - Education Kits for 2 Disabled Students', labelBn: '৳১,২০০ - ২ জন প্রতিবন্ধী শিক্ষার্থীর শিক্ষা উপকরণ', impact: '2 Students Learning Aid' },
    { amount: '50', labelEn: '$50 - 1 Family Emergency Farma-Tent Relief', labelBn: '৳৬,০০০ - ১টি ক্ষতিগ্রস্ত পরিবারের জরুরি ফার্মা-টেন্ট', impact: '1 Family Shelter Relief' },
    { amount: '100', labelEn: '$100 - 100 Trees Coastal Greenbelt Plantation', labelBn: '৳১২,০০০ - ১০০টি ম্যানগ্রোভ ও পরিবেশবান্ধব গাছ রোপণ', impact: '100 Trees Greenbelt' },
    { amount: '250', labelEn: '$250 - 1 Household Biogas Plant Unit', labelBn: '৳৩০,০০০ - ১টি বায়োগ্যাস প্ল্যান্ট স্থাপন', impact: '1 Household Clean Energy' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Thank you for your generous pledge!');
      } else {
        setErrorMsg(data.error || 'Failed to submit pledge.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to backend API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
          <h3 className="text-2xl font-bold text-slate-900">
            {lang === 'en' ? 'Support ASC Impact' : 'সহযোগিতা ও অনুদান দিন'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          {lang === 'en'
            ? 'Empower coastal children, disabled individuals, and disaster victims in Cox’s Bazar.'
            : 'কক্সবাজার ও বান্দরবানে দুস্থ শিশু, প্রতিবন্ধী শিক্ষার্থী ও উপকূলীয় পরিবারগুলোকে সাহায্য করুন।'}
        </p>

        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-lg">Pledge Received!</h4>
            <p className="text-xs text-slate-700">{successMsg}</p>
            <button
              onClick={() => { setSuccessMsg(''); onClose(); }}
              className="bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Impact Presets */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-700 text-xs">
                {lang === 'en' ? 'Select Impact Goal:' : 'সহযোগিতার ক্ষেত্র নির্বাচন করুন:'}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.amount}
                    type="button"
                    onClick={() => setFormData({ ...formData, amount: p.amount, impactOption: p.impact })}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      formData.amount === p.amount
                        ? 'border-rose-600 bg-rose-50/70 text-slate-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">{lang === 'en' ? p.labelEn : p.labelBn}</p>
                    </div>
                    {formData.amount === p.amount && (
                      <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">
                  {lang === 'en' ? 'Amount ($ USD / ৳ BDT)' : 'অনুদানের পরিমাণ'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-bold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            {/* Donor Information */}
            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {lang === 'en' ? 'Full Name / Organization *' : 'পূর্ণ নাম / প্রতিষ্ঠান *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Numan Chakaria"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="donor@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="018XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {lang === 'en' ? 'Pledge Note / Message' : 'মন্তব্য (ঐচ্ছিক)'}
              </label>
              <textarea
                rows={2}
                placeholder="Specify preferred union or project..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Pledge...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" />
                  {lang === 'en' ? 'Submit Donation Pledge' : 'অনুদান নিশ্চিত করুন'}
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
