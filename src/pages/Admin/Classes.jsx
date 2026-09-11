import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Layers, Plus, Users, UserCheck } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Academic Classes & Sections</h1>
          <p className="text-xs text-slate-500">Manage grade levels, streams, and class teacher assignments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Academic Class
        </button>
      </div>

      {/* Classes Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {cls.classType}
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">{cls.name}</h3>
              <p className="text-xs text-slate-500 font-medium">Sections: {cls.section}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-brand-600" /> {cls.teacher}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create Academic Class</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Stream / Level</label>
                <input 
                  type="text" required
                  value={formData.classType}
                  onChange={e => setFormData({ ...formData, classType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sections (comma separated)</label>
                <input 
                  type="text" required
                  value={formData.section}
                  onChange={e => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Master Teacher</label>
                <input 
                  type="text" required
                  value={formData.teacher}
                  onChange={e => setFormData({ ...formData, teacher: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
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
