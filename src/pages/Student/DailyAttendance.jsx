import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function DailyAttendance() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';

  const dailyLogs = [
    { date: "2026-09-11 (Friday)", status: "Present", checkIn: "08:25 AM", checkOut: "03:30 PM", remarks: "On Time" },
    { date: "2026-09-10 (Thursday)", status: "Present", checkIn: "08:28 AM", checkOut: "03:30 PM", remarks: "On Time" },
    { date: "2026-09-09 (Wednesday)", status: "Present", checkIn: "08:31 AM", checkOut: "03:30 PM", remarks: "Late (6 mins)" },
    { date: "2026-09-08 (Tuesday)", status: "Present", checkIn: "08:22 AM", checkOut: "03:30 PM", remarks: "On Time" },
    { date: "2026-09-07 (Monday)", status: "Absent", checkIn: "-", checkOut: "-", remarks: "Approved Leave" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Clean Page Title (No Top Card Box) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Daily Attendance</h1>
          <p className="text-slate-500 text-xs mt-0.5">Track daily check-in and check-out logs.</p>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-slate-400" /> Academic Session 2026-2027
        </div>
      </div>

      {/* Daily Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Present Days</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">24 Days</div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Current Month</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Absent Days</span>
          <div className="text-2xl font-black text-rose-600 mt-1">1 Day</div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Approved Leave</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Late Check-ins</span>
          <div className="text-2xl font-black text-amber-600 mt-1">2 Times</div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Under 10 mins</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Attendance Rate</span>
          <div className="text-2xl font-black text-brand-600 mt-1">96.0%</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">Excellent Rating</span>
        </div>
      </div>

      {/* Daily Attendance Log Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Recent Daily Attendance Logs</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Check-In Time</th>
                <th className="py-3 px-4">Check-Out Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {dailyLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{log.date}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{log.checkIn}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{log.checkOut}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                      log.status === 'Present' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{log.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
