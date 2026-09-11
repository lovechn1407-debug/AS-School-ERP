import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar, CheckCircle2, XCircle } from 'lucide-react';

export default function PeriodwiseAttendance() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';

  const [periodAttendance, setPeriodAttendance] = useState([
    { id: 1, period: "Period 1 (08:30 - 09:30 AM)", subject: "Advanced Mathematics", teacher: "Dr. Robert Carter", status: "Present", time: "08:31 AM" },
    { id: 2, period: "Period 2 (09:30 - 10:30 AM)", subject: "Quantum Physics", teacher: "Helen Troy", status: "Present", time: "09:30 AM" },
    { id: 3, period: "Period 3 (10:45 - 11:45 AM)", subject: "Organic Chemistry", teacher: "Prof. Clara Oswald", status: "Present", time: "10:46 AM" },
    { id: 4, period: "Period 4 (11:45 - 12:45 PM)", subject: "English Literature", teacher: "Marcus Sterling", status: "Present", time: "11:45 AM" },
    { id: 5, period: "Period 5 (01:30 - 02:30 PM)", subject: "Computer Science", teacher: "Alex Vance", status: "Present", time: "01:32 PM" }
  ]);

  const togglePeriodStatus = (id) => {
    setPeriodAttendance(periodAttendance.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Present' ? 'Absent' : p.status === 'Absent' ? 'Late' : 'Present';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Page Title (No Top Card Box) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Periodwise Attendance</h1>
          <p className="text-slate-500 text-xs mt-0.5">Period-by-period class attendance logs and teacher check-ins.</p>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-slate-400" /> Grade 10 - Section A
        </div>
      </div>

      {/* Periodwise Attendance Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Today's Class Periods (September 11, 2026)</h2>
          <span className="text-xs text-brand-600 font-semibold">5 Classes Scheduled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Period / Slot</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Teacher</th>
                <th className="py-3 px-4">Check-in Time</th>
                <th className="py-3 px-4">Status</th>
                {isStaff && <th className="py-3 px-4">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {periodAttendance.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.period}</td>
                  <td className="py-3.5 px-4 font-semibold text-brand-600">{item.subject}</td>
                  <td className="py-3.5 px-4 text-slate-600">{item.teacher}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{item.time}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                      item.status === 'Present' 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                        : item.status === 'Absent' 
                        ? 'bg-rose-100 text-rose-800 border-rose-200' 
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  {isStaff && (
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePeriodStatus(item.id)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-md text-[10px]"
                      >
                        Toggle Status
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
