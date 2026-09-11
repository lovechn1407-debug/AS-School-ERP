import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, Layers, CreditCard, Award, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, students, classes, subjects, invoices, marks, timetable } = useAuth();

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const pendingRevenue = invoices.reduce((acc, inv) => acc + (inv.amount - inv.paidAmount), 0);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-6 lg:p-8 text-white shadow-lg shadow-brand-500/15 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-brand-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Active Panel: <strong className="capitalize">{currentUser.user_type}</strong>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-brand-100 text-xs lg:text-sm max-w-xl">
            You are logged into the School Management ERP workspace. View live metric analytics and system shortcuts below.
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{students.length}</div>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% this term
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Classes</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{classes.length}</div>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Active Grades 9 - 12</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Fees</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">${totalRevenue.toLocaleString()}</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">Verified Invoices</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Dues</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-600">${pendingRevenue.toLocaleString()}</div>
            <span className="text-xs text-amber-600 font-semibold mt-1 block">Awaiting Student Clearance</span>
          </div>
        </div>

      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Invoices & Financials (Left 2 Columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Student Fee Invoices</h2>
              <p className="text-xs text-slate-500">Live payment tracking status</p>
            </div>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
              Finance Status
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-3">Invoice ID</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-500">{inv.id}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{inv.studentName}</td>
                    <td className="py-3 px-3 text-slate-600">{inv.title}</td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">${inv.amount}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        inv.status === 'Partial' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timetable Schedule Preview (Right Column) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Today's Timetable</h2>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {timetable.slice(0, 4).map((t, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.subject}</div>
                  <div className="text-[11px] text-slate-500">{t.teacher} &bull; {t.room}</div>
                </div>
                <span className="text-[10px] font-bold bg-white border border-slate-200 px-2 py-1 rounded-lg text-brand-600">
                  {t.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
