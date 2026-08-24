import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function VolunteerModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    interestArea: 'Education & Schools',
    note: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Volunteer application submitted successfully!');
        setFormData({ fullName: '', email: '', phone: '', address: '', skills: '', interestArea: 'Education & Schools', note: '' });
      } else {
        setErrorMsg(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <HeartHandshake className="w-6 h-6 text-emerald-600" />
          <h3 className="text-2xl font-bold text-slate-900">Support / Volunteer</h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">Join Assistance for Safe Community (ASC) as a volunteer or institutional partner.</p>

        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="font-bold text-sm">{successMsg}</p>
            <button
              onClick={() => { setSuccessMsg(''); onClose(); }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Mohammad Ali"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="018XXXXXXXX"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Area of Interest</label>
                <select
                  value={formData.interestArea}
                  onChange={(e) => setFormData({ ...formData, interestArea: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
                >
                  <option value="Education & Schools">Child Education Support</option>
                  <option value="Disaster Relief Volunteer">Disaster Relief Volunteer</option>
                  <option value="Disability Inclusion">Disability Inclusion Self-Help</option>
                  <option value="Roadside Plantation">Tree Plantation & Environment</option>
                  <option value="Legal Aid & Rights">Legal Aid & Anti-Trafficking</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs mb-1">Key Skills / Profession</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Teaching, Health, Admin, Driver, etc."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">Additional Note / Address</label>
              <textarea
                rows={3}
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Mention your Union/Upazila and how you wish to collaborate..."
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <HeartHandshake className="w-4 h-4" />
                  Submit Volunteer Application
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
