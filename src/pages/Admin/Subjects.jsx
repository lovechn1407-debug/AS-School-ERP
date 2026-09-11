import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Plus, UserCheck } from 'lucide-react';

export default function Subjects() {
  const { subjects, addSubject } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Biochemistry',
    code: 'BIO204',
    className: 'Grade 10',
    teacher: 'Prof. Clara Oswald'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubject(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Academic Subjects</h1>
          <p className="text-xs text-slate-500">Manage course subjects, subject codes, and assigned educators</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Subject Name</th>
              <th className="py-3 px-4">Subject Code</th>
              <th className="py-3 px-4">Target Class</th>
              <th className="py-3 px-4">Assigned Educator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {subjects.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  {s.name}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{s.code}</td>
                <td className="py-3.5 px-4">
                  <span className="bg-brand-50 text-brand-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    {s.className}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{s.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add New Subject</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
                <input 
                  type="text" required
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Class</label>
                <input 
                  type="text" required
                  value={formData.className}
                  onChange={e => setFormData({ ...formData, className: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Teacher</label>
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
