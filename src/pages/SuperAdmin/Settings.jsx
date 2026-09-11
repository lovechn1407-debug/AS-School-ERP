import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Save, CheckCircle2, ShieldCheck, Database, Building2, Calendar } from 'lucide-react';

export default function SystemSettings() {
  const { settings, updateSettings } = useAuth();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="max-w-4xl space-y-6 pb-8">
      
      {/* Hero Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-brand-500/10 blur-3xl pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> Super Admin Control
          </span>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">System & Institution Configuration</h1>
          <p className="text-slate-300 text-xs lg:text-sm max-w-xl">
            Configure global institution parameters, active academic term, primary contact information, and realtime database sync.
          </p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-2xl shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>System configuration saved and synchronized live with Firebase Database!</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-600" /> General Institution Information
            </h2>
            <p className="text-xs text-slate-500">Official name and branding displayed across all portal headers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">School System Name</label>
              <input 
                type="text"
                value={formData.systemName}
                onChange={e => setFormData({ ...formData, systemName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">System Acronym / Short Title</label>
              <input 
                type="text"
                value={formData.systemTitle}
                onChange={e => setFormData({ ...formData, systemTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Academic Session</label>
              <select 
                value={formData.currentSession}
                onChange={e => setFormData({ ...formData, currentSession: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:border-brand-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="2025-2026">2025-2026 Academic Year</option>
                <option value="2026-2027">2026-2027 Academic Year</option>
                <option value="2027-2028">2027-2028 Academic Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Active Term</label>
              <select 
                value={formData.currentTerm}
                onChange={e => setFormData({ ...formData, currentTerm: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:border-brand-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Official Contact Email</label>
              <input 
                type="email"
                value={formData.systemEmail}
                onChange={e => setFormData({ ...formData, systemEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Official Contact Phone</label>
              <input 
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Campus Physical Address</label>
            <input 
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-500" /> Firebase RTDB Connected
            </div>

            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Save className="w-4 h-4" /> Save System Settings
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
