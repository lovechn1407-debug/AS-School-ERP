import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileSpreadsheet, Plus, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Exam Marks & Evaluation Matrix</h1>
          <p className="text-xs text-slate-500">Record assessment scores and view automatic letter grade calculations</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Record New Mark
        </button>
      </div>

      {/* Marks Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Test 1 (20)</th>
              <th className="py-3 px-4">Test 2 (20)</th>
              <th className="py-3 px-4">Exam (60)</th>
              <th className="py-3 px-4">Total Score (100)</th>
              <th className="py-3 px-4">Grade</th>
              <th className="py-3 px-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {marks.map(m => (
              <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{m.studentName}</td>
                <td className="py-3.5 px-4 text-slate-600">{m.subject}</td>
                <td className="py-3.5 px-4">{m.test1}</td>
                <td className="py-3.5 px-4">{m.test2}</td>
                <td className="py-3.5 px-4">{m.exam}</td>
                <td className="py-3.5 px-4 font-extrabold text-brand-600">{m.total}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    m.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800' :
                    m.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {m.grade}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{m.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Record Student Assessment Score</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
                <input 
                  type="text" 
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  required 
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Test 1 (Max 20)</label>
                  <input 
                    type="number" max="20"
                    value={formData.test1}
                    onChange={e => setFormData({ ...formData, test1: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Test 2 (Max 20)</label>
                  <input 
                    type="number" max="20"
                    value={formData.test2}
                    onChange={e => setFormData({ ...formData, test2: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Exam (Max 60)</label>
                  <input 
                    type="number" max="60"
                    value={formData.exam}
                    onChange={e => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
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
                  Submit Marks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
