import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function SystemSettings() {
  const { settings, updateSettings } = useAuth();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">System Configuration</h1>
          <p className="text-xs text-slate-500">Manage school name, current academic session, terms, and contact settings</p>
        </div>
        {saved && (
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Settings Updated Live
          </span>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">School System Name</label>
              <input 
                type="text"
                value={formData.systemName}
                onChange={e => setFormData({ ...formData, systemName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">System Acronym / Title</label>
              <input 
                type="text"
                value={formData.systemTitle}
                onChange={e => setFormData({ ...formData, systemTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Academic Session</label>
              <select 
                value={formData.currentSession}
                onChange={e => setFormData({ ...formData, currentSession: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
              >
                <option value="2025-2026">2025-2026 Session</option>
                <option value="2026-2027">2026-2027 Session</option>
                <option value="2027-2028">2027-2028 Session</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Term</label>
              <select 
                value={formData.currentTerm}
                onChange={e => setFormData({ ...formData, currentTerm: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
              >
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Contact Email</label>
              <input 
                type="email"
                value={formData.systemEmail}
                onChange={e => setFormData({ ...formData, systemEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Phone Number</label>
              <input 
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">School Physical Address</label>
            <input 
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all"
            >
              <Save className="w-4 h-4" /> Save System Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
