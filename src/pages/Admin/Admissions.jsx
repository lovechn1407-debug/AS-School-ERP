import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, CheckCircle2, User } from 'lucide-react';

export default function Admissions() {
  const { addStudent, classes } = useAuth();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: 'Grade 10',
    section: 'A',
    gender: 'Male',
    parent: '',
    admissionNo: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    setSuccess(true);
    setFormData({
      name: '',
      class: 'Grade 10',
      section: 'A',
      gender: 'Male',
      parent: '',
      admissionNo: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`
    });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Student Admission Wizard</h1>
        <p className="text-xs text-slate-500">Register and admit new students into academic classes</p>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-2xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Student Admitted & Enrolled Successfully!
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lucas Sterling"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admission Number</label>
              <input 
                type="text" readOnly
                value={formData.admissionNo}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-600" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Class</label>
              <select
                value={formData.class}
                onChange={e => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Section</label>
              <select
                value={formData.section}
                onChange={e => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name</label>
              <input 
                type="text" required
                value={formData.parent}
                onChange={e => setFormData({ ...formData, parent: e.target.value })}
                placeholder="e.g. David & Emma Sterling"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-brand-500/20"
            >
              <UserPlus className="w-4 h-4" /> Admit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
