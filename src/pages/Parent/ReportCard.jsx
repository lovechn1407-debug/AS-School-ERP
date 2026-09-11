import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, Printer, CheckCircle2, GraduationCap } from 'lucide-react';

export default function ReportCard() {
  const { marks, settings, currentUser } = useAuth();
  
  const studentMarks = marks.filter(m => m.studentName.includes('Ethan') || currentUser.role === 'student' || currentUser.role === 'parent');
  const totalScore = studentMarks.reduce((acc, m) => acc + m.total, 0);
  const avgScore = studentMarks.length ? Math.round(totalScore / studentMarks.length) : 0;

  return (
    <div className="max-w-4xl space-y-6">
      
      {/* Header & Print Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Terminal Report Card</h1>
          <p className="text-xs text-slate-500">Official academic evaluation & term tabulation summary</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Report Card
        </button>
      </div>

      {/* Official Printable Report Card Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        
        {/* School Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{settings.systemName}</h2>
              <p className="text-xs text-slate-500">{settings.address} &bull; {settings.systemEmail}</p>
            </div>
          </div>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-3 text-center min-w-[160px]">
            <div className="text-[10px] font-bold uppercase text-brand-600">Average Terminal GPA</div>
            <div className="text-2xl font-black text-brand-700">{avgScore}%</div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Passed & Passed</span>
          </div>
        </div>

        {/* Student Bio Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Student Name</span>
            <span className="font-bold text-slate-900">Ethan Miller</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Admission No.</span>
            <span className="font-bold text-slate-900 font-mono">STU-2026-0042</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Class & Section</span>
            <span className="font-bold text-slate-900">Grade 10 - Section A</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Session / Term</span>
            <span className="font-bold text-slate-900">{settings.currentSession} ({settings.currentTerm})</span>
          </div>
        </div>

        {/* Subject Scores Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Continuous Assessment (40)</th>
                <th className="py-3 px-4">Terminal Exam (60)</th>
                <th className="py-3 px-4">Total Score (100)</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {studentMarks.map(m => (
                <tr key={m.id}>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{m.subject}</td>
                  <td className="py-3.5 px-4 text-slate-600">{m.test1 + m.test2}</td>
                  <td className="py-3.5 px-4 text-slate-600">{m.exam}</td>
                  <td className="py-3.5 px-4 font-extrabold text-brand-600">{m.total}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{m.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-end text-center text-xs text-slate-500">
          <div>
            <div className="font-bold text-slate-900">Dr. Robert Carter</div>
            <span className="text-[10px]">Form Master Signature</span>
          </div>
          <div>
            <div className="font-bold text-slate-900">Alex Vance</div>
            <span className="text-[10px]">Principal / Super Admin Stamp</span>
          </div>
        </div>

      </div>
    </div>
  );
}
