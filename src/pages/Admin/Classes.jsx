import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layers, Plus, Users, UserCheck, Sparkles, X, ShieldCheck } from 'lucide-react';

export default function Classes() {
  const { classes, addClass } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Grade 11',
    classType: 'Secondary',
    section: 'A, B',
    teacher: 'Prof. Clara Oswald'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addClass(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-purple-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Academic Operations
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Grade Classes & Sections Registry</h1>
            <p className="text-purple-100 text-xs lg:text-sm max-w-xl">
              Configure grade levels, streams, section divisions, and assign class master educators.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Academic Class
          </button>
        </div>
      </div>

      {/* Classes Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:border-purple-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {cls.classType}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">{cls.name}</h3>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>Active Sections:</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold">
                  {cls.section}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Master Educator:</span>
              <span className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                <UserCheck className="w-3.5 h-3.5 text-purple-600" /> {cls.teacher}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" /> Create Academic Grade Class
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Grade 11"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Stream / Level</label>
                <input 
                  type="text" required
                  value={formData.classType}
                  onChange={e => setFormData({ ...formData, classType: e.target.value })}
                  placeholder="e.g. Senior Secondary"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sections (comma separated)</label>
                <input 
                  type="text" required
                  value={formData.section}
                  onChange={e => setFormData({ ...formData, section: e.target.value })}
                  placeholder="e.g. Section A, Section B"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Master Educator</label>
                <input 
                  type="text" required
                  value={formData.teacher}
                  onChange={e => setFormData({ ...formData, teacher: e.target.value })}
                  placeholder="e.g. Prof. Clara Oswald"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
