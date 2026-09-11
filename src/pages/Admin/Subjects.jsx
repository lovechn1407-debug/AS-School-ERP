import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Plus, UserCheck, Sparkles, X, ShieldCheck, Hash } from 'lucide-react';

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
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-purple-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Curriculum & Course Catalog
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Academic Subjects Directory</h1>
            <p className="text-purple-100 text-xs lg:text-sm max-w-xl">
              Course subject registration, academic course codes, target grade levels, and assigned subject educators.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] shrink-0"
          >
            <Plus className="w-4 h-4" /> Add New Course Subject
          </button>
        </div>
      </div>

      {/* Subjects Directory Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Subject Name</th>
              <th className="py-3.5 px-4">Subject Code</th>
              <th className="py-3.5 px-4">Target Grade</th>
              <th className="py-3.5 px-4">Assigned Educator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {subjects.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-extrabold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  {s.name}
                </td>
                <td className="py-4 px-4 font-mono font-bold text-slate-500">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] border border-slate-200/60 inline-flex items-center gap-1">
                    <Hash className="w-3 h-3 text-slate-400" /> {s.code}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="bg-purple-50 text-purple-700 font-extrabold px-3 py-1 rounded-full text-[10px] border border-purple-200">
                    {s.className}
                  </span>
                </td>
                <td className="py-4 px-4 font-extrabold text-slate-800 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                  {s.teacher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" /> Add Course Subject
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Biochemistry"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
                <input 
                  type="text" required
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. BIO204"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Class Grade</label>
                <input 
                  type="text" required
                  value={formData.className}
                  onChange={e => setFormData({ ...formData, className: e.target.value })}
                  placeholder="e.g. Grade 10"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Teacher</label>
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
