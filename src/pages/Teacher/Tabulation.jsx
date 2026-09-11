import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, Printer } from 'lucide-react';

export default function Tabulation() {
  const { students, marks } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Class Tabulation Sheet</h1>
          <p className="text-xs text-slate-500">Overview of student subject performances across Grade 10</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Tabulation
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Admission No</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Math (100)</th>
              <th className="py-3 px-4">Physics (100)</th>
              <th className="py-3 px-4">Chemistry (100)</th>
              <th className="py-3 px-4">Average</th>
              <th className="py-3 px-4">Position / Rank</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {students.map((s, idx) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{s.name}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{s.admissionNo}</td>
                <td className="py-3.5 px-4">{s.class} ({s.section})</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{idx === 0 ? 96 : 76}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{idx === 0 ? 87 : 82}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">{idx === 0 ? 82 : 79}</td>
                <td className="py-3.5 px-4 font-black text-brand-600">{idx === 0 ? '88.3%' : '79.0%'}</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">Rank {idx + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
