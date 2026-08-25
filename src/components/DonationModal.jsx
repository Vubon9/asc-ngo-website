import React, { useState } from 'react';
import { X, Heart, CheckCircle2, AlertCircle, Loader2, Sparkles, Building2, Smartphone, CreditCard, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DonationModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState('bkash'); // bkash, nagad, bank, card
  const [copiedField, setCopiedField] = useState('');

  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '1200',
    currency: 'BDT',
    paymentMethod: 'bKash',
    senderNumber: '',
    trxId: '',
    impactOption: '২ জন প্রতিবন্ধী শিক্ষার্থীর শিক্ষা উপকরণ (৳১,২০০)',
    note: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const presets = [
    { amount: '1200', labelEn: '৳1,200 ($10) - Education Kits for 2 Disabled Students', labelBn: '৳১,২০০ - ২ জন প্রতিবন্ধী শিক্ষার্থীর শিক্ষা উপকরণ', impact: '2 Disabled Students Education' },
    { amount: '6000', labelEn: '৳6,000 ($50) - 1 Family Emergency Relief Farma-Tent', labelBn: '৳৬,০০০ - ১টি ক্ষতিগ্রস্ত পরিবারের জরুরি ফার্মা-টেন্ট', impact: '1 Family Disaster Tent Shelter' },
    { amount: '12000', labelEn: '৳12,000 ($100) - 100 Trees Coastal Greenbelt Plantation', labelBn: '৳১২,০০০ - ১০০টি ম্যানগ্রোভ ও পরিবেশবান্ধব গাছ রোপণ', impact: '100 Trees Coastal Plantation' },
    { amount: '30000', labelEn: '৳30,000 ($250) - 1 Household Biogas Plant Unit', labelBn: '৳৩০,০০০ - ১টি বায়োগ্যাস প্ল্যান্ট স্থাপন', impact: '1 Household Clean Biogas Plant' },
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
        body: JSON.stringify({ ...formData, paymentMethod })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Thank you for your donation!');
      } else {
        setErrorMsg(data.error || 'Failed to submit donation.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
          <h3 className="text-2xl font-bold text-slate-900">
            {lang === 'en' ? 'Donate & Support ASC' : 'সহযোগিতা ও অনুদান প্রদান করুন'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          {lang === 'en'
            ? 'Support through bKash, Nagad, Bank Transfer, or International Cards.'
            : 'বিকাশ (bKash), নগদ (Nagad), ব্যাংক ট্রান্সফার বা আন্তর্জাতিক কার্ডের মাধ্যমে অনুদান দিন।'}
        </p>

        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-lg">
              {lang === 'en' ? 'Donation Received!' : 'অনুদান গৃহীত হয়েছে!'}
            </h4>
            <p className="text-xs text-slate-700">{successMsg}</p>
            <button
              onClick={() => { setSuccessMsg(''); onClose(); }}
              className="bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm"
            >
              {lang === 'en' ? 'Done' : 'সম্পন্ন'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Payment Method Selector Tabs */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-700 text-xs">
                {lang === 'en' ? 'Select Payment Method:' : 'পেমেন্ট মাধ্যম নির্বাচন করুন:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                {/* bKash Tab */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('bkash'); setFormData({ ...formData, currency: 'BDT' }); }}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-600 bg-pink-50 text-pink-700 shadow-sm ring-2 ring-pink-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-pink-600" />
                  <span>bKash (বিকাশ)</span>
                </button>

                {/* Nagad Tab */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('nagad'); setFormData({ ...formData, currency: 'BDT' }); }}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-amber-600 bg-amber-50 text-amber-800 shadow-sm ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>Nagad (নগদ)</span>
                </button>

                {/* Bank Transfer Tab */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('bank'); setFormData({ ...formData, currency: 'BDT' }); }}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-cyan-700 bg-cyan-50 text-cyan-900 shadow-sm ring-2 ring-cyan-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-cyan-700" />
                  <span>Bank (ব্যাংক)</span>
                </button>

                {/* Card / International */}
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('card'); setFormData({ ...formData, currency: 'USD' }); }}
                  className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50 text-purple-800 shadow-sm ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Card / Int'l</span>
                </button>

              </div>
            </div>

            {/* Instruction Box based on Payment Method */}
            {paymentMethod === 'bkash' && (
              <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4 space-y-2 text-xs text-pink-950">
                <div className="flex items-center justify-between font-bold">
                  <span>bKash Personal / Send Money Number:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('01819861950', 'bkash')}
                    className="flex items-center gap-1 text-[11px] bg-pink-100 hover:bg-pink-200 text-pink-800 px-2 py-0.5 rounded font-mono"
                  >
                    {copiedField === 'bkash' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>01819-861950</span>
                  </button>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 text-[11px]">
                  <li>Go to bKash App or dial <strong>*247#</strong> and select <strong>Send Money</strong>.</li>
                  <li>Enter Number: <strong>01819-861950</strong> (or 01819-396400).</li>
                  <li>Enter Amount and Reference (e.g. <strong>ASC</strong>).</li>
                  <li>Copy your <strong>TrxID</strong> and paste it below.</li>
                </ol>
              </div>
            )}

            {paymentMethod === 'nagad' && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2 text-xs text-amber-950">
                <div className="flex items-center justify-between font-bold">
                  <span>Nagad Personal / Send Money Number:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('01819861950', 'nagad')}
                    className="flex items-center gap-1 text-[11px] bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono"
                  >
                    {copiedField === 'nagad' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>01819-861950</span>
                  </button>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 text-[11px]">
                  <li>Go to Nagad App or dial <strong>*167#</strong> and select <strong>Send Money</strong>.</li>
                  <li>Enter Number: <strong>01819-861950</strong>.</li>
                  <li>Enter Amount and Reference: <strong>ASC</strong>.</li>
                  <li>Copy your <strong>TrxID</strong> and paste it below.</li>
                </ol>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-4 space-y-2 text-xs text-cyan-950">
                <p className="font-bold text-cyan-900">Official ASC Bank Account Details:</p>
                <div className="space-y-1 text-[11px] text-slate-700">
                  <p><strong>Bank Name:</strong> Islami Bank Bangladesh PLC / Sonali Bank PLC</p>
                  <p><strong>Account Name:</strong> Assistance for Safe Community (ASC)</p>
                  <p><strong>Account Number:</strong> 20503450100XXXXXX / 03422XXXXX</p>
                  <p><strong>Branch:</strong> Chakaria Branch, Cox's Bazar, Bangladesh</p>
                  <p><strong>Routing Number:</strong> 12556XXXX</p>
                </div>
              </div>
            )}

            {/* Impact Goal Selector */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-700 text-xs">
                {lang === 'en' ? 'Select Impact Goal:' : 'সহযোগিতার ক্ষেত্র:'}
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

            {/* Amount & Transaction ID Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">
                  {lang === 'en' ? 'Amount' : 'অনুদানের পরিমাণ'} ({formData.currency}) *
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

              {(paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'bank') && (
                <div>
                  <label className="block font-semibold text-slate-700 text-xs mb-1">
                    Transaction ID (TrxID) / Deposit Ref *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9H7X2K1A"
                    value={formData.trxId}
                    onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Donor Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">
                  {lang === 'en' ? 'Full Name / Organization *' : 'দাতাদের নাম / প্রতিষ্ঠান *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammad Nazmul"
                  value={formData.donorName}
                  onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">
                  {lang === 'en' ? 'Sender Mobile / Account' : 'প্রেরকের মোবাইল নম্বর'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="018XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

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
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {lang === 'en' ? 'Note / Dedication Message' : 'মন্তব্য (ঐচ্ছিক)'}
              </label>
              <textarea
                rows={2}
                placeholder="Mention preferred union or program..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Donation...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-white" />
                  {lang === 'en' ? `Confirm ${paymentMethod.toUpperCase()} Donation` : `${paymentMethod.toUpperCase()} অনুদান নিশ্চিত করুন`}
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
