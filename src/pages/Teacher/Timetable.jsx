import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar } from 'lucide-react';

export default function Timetable() {
  const { timetable } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Academic Timetable Schedule</h1>
        <p className="text-xs text-slate-500">Weekly class periods, classroom allocations, and subject schedules</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Day</th>
              <th className="py-3 px-4">Time Slot</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Classroom / Lab</th>
              <th className="py-3 px-4">Instructor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {timetable.map((t, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-600" /> {t.day}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-600">{t.time}</td>
                <td className="py-3.5 px-4 font-extrabold text-brand-700">{t.subject}</td>
                <td className="py-3.5 px-4 text-slate-600">{t.room}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{t.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
