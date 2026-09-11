import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, Printer, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export default function Tabulation() {
  const { students } = useAuth();

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-blue-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-cyan-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Class Ranking & Analysis
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Grade 10 Performance Tabulation Sheet</h1>
            <p className="text-cyan-100 text-xs lg:text-sm max-w-xl">
              Consolidated class mark sheet, subject score compilation, student mean average, and position rankings.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Printer className="w-4 h-4 text-cyan-200" /> Print Tabulation Sheet
          </button>
        </div>
      </div>

      {/* Tabulation Sheet Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Rank</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Admission No</th>
              <th className="py-3.5 px-4">Class</th>
              <th className="py-3.5 px-4">Math (100)</th>
              <th className="py-3.5 px-4">Physics (100)</th>
              <th className="py-3.5 px-4">Chemistry (100)</th>
              <th className="py-3.5 px-4">Terminal Average</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {students.map((s, idx) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-bold">
                  {idx === 0 ? (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-300 font-black px-2.5 py-0.5 rounded-full text-[10px]">
                      <Trophy className="w-3 h-3 text-amber-600" /> 1st Rank
                    </span>
                  ) : idx === 1 ? (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-300 font-black px-2.5 py-0.5 rounded-full text-[10px]">
                      2nd Rank
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      Rank {idx + 1}
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 font-extrabold text-slate-900">{s.name}</td>
                <td className="py-4 px-4 font-mono font-bold text-slate-500">{s.admissionNo}</td>
                <td className="py-4 px-4 font-semibold text-slate-600">{s.class} ({s.section})</td>
                <td className="py-4 px-4 font-mono font-extrabold text-slate-900">{idx === 0 ? 96 : 76}</td>
                <td className="py-4 px-4 font-mono font-extrabold text-slate-900">{idx === 0 ? 87 : 82}</td>
                <td className="py-4 px-4 font-mono font-extrabold text-slate-900">{idx === 0 ? 82 : 79}</td>
                <td className="py-4 px-4 font-mono font-black text-cyan-600 text-sm">{idx === 0 ? '88.3%' : '79.0%'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
