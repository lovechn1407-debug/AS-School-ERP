import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileSpreadsheet, Plus, CheckCircle2, ShieldCheck, Sparkles, X, Award } from 'lucide-react';

export default function MarksMatrix() {
  const { marks, addMark } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: 'Ethan Miller',
    subject: 'Advanced Mathematics',
    test1: 20,
    test2: 20,
    exam: 55
  });

  const calculateGrade = (total) => {
    if (total >= 90) return { grade: 'A+', remarks: 'Outstanding' };
    if (total >= 80) return { grade: 'A', remarks: 'Excellent' };
    if (total >= 70) return { grade: 'B+', remarks: 'Very Good' };
    if (total >= 60) return { grade: 'B', remarks: 'Good' };
    if (total >= 50) return { grade: 'C', remarks: 'Pass' };
    return { grade: 'F', remarks: 'Fail' };
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const t1 = parseInt(formData.test1) || 0;
    const t2 = parseInt(formData.test2) || 0;
    const ex = parseInt(formData.exam) || 0;
    const total = t1 + t2 + ex;
    const { grade, remarks } = calculateGrade(total);

    addMark({
      studentName: formData.studentName,
      subject: formData.subject,
      test1: t1,
      test2: t2,
      exam: ex,
      total,
      grade,
      remarks
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-blue-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-cyan-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Educator Evaluation Portal
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Academic Marks & Evaluation Matrix</h1>
            <p className="text-cyan-100 text-xs lg:text-sm max-w-xl">
              Record assessment scores, calculate continuous evaluation (CA), and generate terminal exam letter grades.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 transition-all hover:scale-[1.02] shrink-0"
          >
            <Plus className="w-4 h-4" /> Record New Assessment Score
          </button>
        </div>
      </div>

      {/* Marks Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Course Subject</th>
              <th className="py-3.5 px-4">Test 1 (20)</th>
              <th className="py-3.5 px-4">Test 2 (20)</th>
              <th className="py-3.5 px-4">Exam (60)</th>
              <th className="py-3.5 px-4">Total (100)</th>
              <th className="py-3.5 px-4">Grade</th>
              <th className="py-3.5 px-4">Performance Remark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {marks.map(m => (
              <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-extrabold text-slate-900">{m.studentName}</td>
                <td className="py-4 px-4 font-bold text-slate-600">{m.subject}</td>
                <td className="py-4 px-4 font-mono font-bold text-slate-700">{m.test1}</td>
                <td className="py-4 px-4 font-mono font-bold text-slate-700">{m.test2}</td>
                <td className="py-4 px-4 font-mono font-bold text-slate-700">{m.exam}</td>
                <td className="py-4 px-4 font-mono font-black text-cyan-600 text-sm">{m.total}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                    m.grade.startsWith('A') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    m.grade.startsWith('B') ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                    'bg-slate-100 text-slate-800 border-slate-200'
                  }`}>
                    {m.grade}
                  </span>
                </td>
                <td className="py-4 px-4 font-semibold text-slate-500">{m.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Score Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600" /> Record Student Score
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
                <input 
                  type="text" required
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-cyan-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Subject</label>
                <input 
                  type="text" required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-cyan-500" 
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Test 1 (/20)</label>
                  <input 
                    type="number" max="20"
                    value={formData.test1}
                    onChange={e => setFormData({ ...formData, test1: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-cyan-500" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Test 2 (/20)</label>
                  <input 
                    type="number" max="20"
                    value={formData.test2}
                    onChange={e => setFormData({ ...formData, test2: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-cyan-500" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Exam (/60)</label>
                  <input 
                    type="number" max="60"
                    value={formData.exam}
                    onChange={e => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-cyan-500" 
                  />
                </div>
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
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                >
                  Submit Score
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
