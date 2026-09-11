import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar, ShieldCheck, MapPin, UserCheck, Sparkles } from 'lucide-react';

export default function Timetable() {
  const { timetable } = useAuth();

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900 via-blue-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-cyan-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <span className="bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Teaching Schedule
          </span>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Academic Timetable & Schedule</h1>
          <p className="text-cyan-100 text-xs lg:text-sm max-w-xl">
            Weekly class periods, assigned classroom/science lab allocations, subject time slots, and educator schedules.
          </p>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Day of Week</th>
              <th className="py-3.5 px-4">Time Slot</th>
              <th className="py-3.5 px-4">Course Subject</th>
              <th className="py-3.5 px-4">Classroom / Science Lab</th>
              <th className="py-3.5 px-4">Instructor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {timetable.map((t, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </span>
                  {t.day}
                </td>
                <td className="py-4 px-4 font-mono font-bold text-slate-700">
                  <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-md text-[11px] font-extrabold border border-slate-200/60 inline-flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-cyan-600" /> {t.time}
                  </span>
                </td>
                <td className="py-4 px-4 font-black text-cyan-700 text-sm">{t.subject}</td>
                <td className="py-4 px-4 font-bold text-slate-600">
                  <span className="inline-flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    <MapPin className="w-3 h-3 text-slate-400" /> {t.room}
                  </span>
                </td>
                <td className="py-4 px-4 font-extrabold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-600" /> {t.teacher}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
