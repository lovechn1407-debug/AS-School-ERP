import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, Printer, CheckCircle2, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';

export default function ReportCard() {
  const { marks, settings, currentUser } = useAuth();
  
  const studentMarks = marks.filter(m => m.studentName.includes('Ethan') || currentUser.role === 'student' || currentUser.role === 'parent');
  const totalScore = studentMarks.reduce((acc, m) => acc + m.total, 0);
  const avgScore = studentMarks.length ? Math.round(totalScore / studentMarks.length) : 0;

  return (
    <div className="max-w-4xl space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Guardian Academic Record
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Student Terminal Academic Report Card</h1>
            <p className="text-amber-100 text-xs lg:text-sm max-w-xl">
              Official academic performance evaluation, subject score compilation, GPA average, and printable report card.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Printer className="w-4 h-4 text-amber-200" /> Print Official Report Card
          </button>
        </div>
      </div>

      {/* Official Printable Report Card Container */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
        
        {/* School Branding Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">{settings.systemName}</h2>
              <p className="text-xs text-slate-500 font-medium">{settings.address} &bull; {settings.systemEmail}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-center min-w-[170px]">
            <div className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">Terminal Mean GPA</div>
            <div className="text-2xl font-black text-slate-900">{avgScore}%</div>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mt-1">
              Passed & Promoted
            </span>
          </div>
        </div>

        {/* Student Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-medium">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Student Full Name</span>
            <span className="font-extrabold text-slate-900">Ethan Miller</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Admission No.</span>
            <span className="font-extrabold text-slate-900 font-mono">STU-2026-0042</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Grade & Section</span>
            <span className="font-extrabold text-slate-900">Grade 10 - Section A</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase block">Session / Term</span>
            <span className="font-extrabold text-slate-900">{settings.currentSession} ({settings.currentTerm})</span>
          </div>
        </div>

        {/* Subject Evaluation Scores Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Subject Name</th>
                <th className="py-3.5 px-4">Continuous Assessment (40)</th>
                <th className="py-3.5 px-4">Terminal Exam (60)</th>
                <th className="py-3.5 px-4">Total Score (100)</th>
                <th className="py-3.5 px-4">Letter Grade</th>
                <th className="py-3.5 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {studentMarks.map(m => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-extrabold text-slate-900">{m.subject}</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-700">{m.test1 + m.test2}</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-700">{m.exam}</td>
                  <td className="py-4 px-4 font-mono font-black text-amber-700 text-sm">{m.total}</td>
                  <td className="py-4 px-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-black px-3 py-1 rounded-full text-[10px]">
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-500">{m.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Signatures Footer */}
        <div className="pt-6 border-t border-slate-100 flex justify-between items-end text-center text-xs text-slate-500">
          <div>
            <div className="font-extrabold text-slate-900">Dr. Robert Carter</div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Form Master Signature</span>
          </div>
          <div>
            <div className="font-extrabold text-slate-900">Alex Vance</div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Principal / School Seal</span>
          </div>
        </div>

      </div>
    </div>
  );
}
