import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Users, Heart, Trash2, RefreshCw, Download, ShieldAlert, CreditCard, Smartphone, Building2 } from 'lucide-react';

export default function AdminPortal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [inqRes, volRes, donRes] = await Promise.all([
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/volunteers'),
        fetch('/api/admin/donations')
      ]);

      if (inqRes.ok) {
        const data = await inqRes.json();
        setInquiries(data.inquiries || []);
      }
      if (volRes.ok) {
        const data = await volRes.json();
        setVolunteers(data.volunteers || []);
      }
      if (donRes.ok) {
        const data = await donRes.json();
        setDonations(data.donations || []);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && authenticated) {
      fetchAdminData();
    }
  }, [isOpen, authenticated]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'asc2001' || passcode === 'admin') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Passcode. Hint: asc2001');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (!confirm('Are you sure you want to delete this volunteer application?')) return;
    try {
      const res = await fetch(`/api/admin/volunteers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVolunteers(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDeleteDonation = async (id) => {
    if (!confirm('Are you sure you want to delete this donation entry?')) return;
    try {
      const res = await fetch(`/api/admin/donations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDonations(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleExportData = () => {
    window.open('/api/admin/export', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-lg leading-tight">ASC Executive Admin Portal</h3>
              <p className="text-xs text-slate-400">Assistance for Safe Community - Management & Donations Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {authenticated && (
              <button
                onClick={handleExportData}
                className="hidden sm:flex items-center gap-1.5 bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Export database report"
              >
                <Download className="w-3.5 h-3.5" />
                Export Data
              </button>
            )}

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!authenticated ? (
          <div className="p-8 max-w-md mx-auto my-auto text-center space-y-4">
            <ShieldAlert className="w-12 h-12 text-cyan-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-lg">Admin Authentication</h4>
            <p className="text-xs text-slate-500">Enter administrator passcode to access inquiries, volunteers, and bKash / Nagad / Bank donations.</p>

            <form onSubmit={handleLogin} className="space-y-3">
              {authError && <p className="text-xs font-semibold text-rose-600">{authError}</p>}
              <input
                type="password"
                placeholder="Enter Passcode (asc2001)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-center text-sm font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2.5 rounded-lg text-sm"
              >
                Access Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs & Stats Bar */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'inquiries'
                      ? 'bg-cyan-700 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Inquiries ({inquiries.length})
                </button>

                <button
                  onClick={() => setActiveTab('volunteers')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'volunteers'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Volunteers ({volunteers.length})
                </button>

                <button
                  onClick={() => setActiveTab('donations')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'donations'
                      ? 'bg-rose-700 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  Donations ({donations.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchAdminData}
                  disabled={loading}
                  className="text-xs font-semibold text-slate-600 hover:text-cyan-700 flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-md"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* List View */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'inquiries' && (
                inquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No contact inquiries received yet. Submit a test message on the website!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-rose-600 p-1"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">
                            {inq.subject}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(inq.submittedAt).toLocaleString()}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm">{inq.name} ({inq.email} | {inq.phone})</h5>
                        <p className="text-slate-700 text-xs bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'volunteers' && (
                volunteers.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No volunteer applications submitted yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {volunteers.map((vol) => (
                      <div key={vol.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
                        <button
                          onClick={() => handleDeleteVolunteer(vol.id)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-rose-600 p-1"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Interest: {vol.interestArea}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(vol.appliedAt).toLocaleString()}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm">{vol.fullName}</h5>
                        <p className="text-xs text-slate-600">Email: {vol.email} | Phone: {vol.phone} | Skills: {vol.skills}</p>
                        {vol.note && (
                          <p className="text-slate-700 text-xs bg-white p-3 rounded-lg border border-slate-200">
                            {vol.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}

              {activeTab === 'donations' && (
                donations.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No bKash, Nagad, or Bank donations submitted yet. Use the "Donate" button to test!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {donations.map((don) => (
                      <div key={don.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 relative">
                        <button
                          onClick={() => handleDeleteDonation(don.id)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-rose-600 p-1"
                          title="Delete donation entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-rose-100 text-rose-800">
                            Amount: {don.currency === 'USD' ? '$' : '৳'}{don.amount}
                          </span>

                          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 flex items-center gap-1">
                            <Smartphone className="w-3 h-3" />
                            Method: {don.paymentMethod}
                          </span>

                          {don.trxId && (
                            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-200 text-slate-800">
                              TrxID: {don.trxId}
                            </span>
                          )}

                          <span className="text-xs text-slate-400 ml-auto">
                            {new Date(don.donatedAt).toLocaleString()}
                          </span>
                        </div>

                        <h5 className="font-bold text-slate-900 text-sm">
                          {don.donorName} ({don.email} | Sender Phone: {don.phone})
                        </h5>

                        <p className="text-xs text-cyan-800 font-semibold">
                          Impact Goal: {don.impactOption}
                        </p>

                        {don.note && (
                          <p className="text-slate-700 text-xs bg-white p-3 rounded-lg border border-slate-200">
                            {don.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
