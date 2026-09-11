import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  BookOpen, 
  Layers, 
  CreditCard, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Home, 
  UserPlus, 
  FileSpreadsheet,
  GraduationCap,
  Calendar,
  DollarSign,
  Activity,
  User,
  Hash,
  Check
} from 'lucide-react';

export default function Dashboard() {
  const { currentUser, students, classes, subjects, invoices, marks, timetable, users, dorms, settings, updateSettings } = useAuth();
  const [selectedSession, setSelectedSession] = useState(settings.currentSession || '2026-2027');

  // Role 1: Super Admin Dashboard
  if (currentUser?.role === 'super_admin') {
    const totalRevenue = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-md">
          <div className="space-y-2">
            <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Command Center
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">System Control & Operations</h1>
            <p className="text-slate-300 text-xs max-w-xl">
              Global system monitoring, database audit logs, user management, and financial overview.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Total System Users</span>
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{users.length}</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">Active Across 6 Roles</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>System Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">${totalRevenue.toLocaleString()}</div>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Verified Invoices</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Active Classes</span>
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{classes.length}</div>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Grades 9 - 12</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>System Status</span>
              <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-2">100% Operational</div>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Firebase Connected</span>
          </div>
        </div>

        {/* Global Users Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">System Users Directory</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role Key</th>
                  <th className="py-3 px-4">User Title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      {u.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{u.email}</td>
                    <td className="py-3 px-4 font-mono uppercase text-[11px] text-brand-600 font-bold">{u.role}</td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{u.user_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Role 2: Admin Dashboard
  if (currentUser?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="bg-purple-900 rounded-xl p-6 text-white shadow-md">
          <div className="space-y-2">
            <span className="bg-white/20 text-purple-100 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              School Administration Portal
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">Academic & School Operations</h1>
            <p className="text-purple-100 text-xs max-w-xl">
              Student admissions, class section management, subjects allocation, and dormitory tracking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Enrolled Students</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{students.length}</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">Active Enrollment</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Grade Classes</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{classes.length}</div>
            <span className="text-xs text-purple-600 font-semibold mt-1 block">Secondary & Senior</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Hostel Dorms</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{dorms.length}</div>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Residential Halls</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Course Subjects</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{subjects.length}</div>
            <span className="text-xs text-brand-600 font-semibold mt-1 block">Assigned Educators</span>
          </div>
        </div>

        {/* Classes List */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Grade Classes Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {classes.map(c => (
              <div key={c.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-sm font-bold text-slate-900">{c.name}</div>
                <div className="text-xs text-slate-500">Sections: {c.section}</div>
                <div className="text-[11px] font-semibold text-brand-600 pt-1">Master: {c.teacher}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Role 3: Teacher Dashboard
  if (currentUser?.role === 'teacher') {
    return (
      <div className="space-y-6">
        <div className="bg-cyan-900 rounded-xl p-6 text-white shadow-md">
          <div className="space-y-2">
            <span className="bg-white/20 text-cyan-100 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              Educator Dashboard
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">Academic Evaluation & Marks</h1>
            <p className="text-cyan-100 text-xs max-w-xl">
              Enter assessment scores, generate class tabulation sheets, and view your teaching timetable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Assigned Subject</span>
            <div className="text-xl font-black text-slate-900 mt-2">Advanced Mathematics</div>
            <span className="text-xs text-cyan-600 font-semibold mt-1 block">Grade 10 - Section A</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Marks Evaluated</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{marks.length} Records</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">Test 1, Test 2 & Exam</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Class Average</span>
            <div className="text-2xl font-black text-brand-600 mt-2">88.3%</div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">Grade A Outstanding</span>
          </div>
        </div>

        {/* Recent Score Submissions */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Recent Student Evaluation Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Test 1</th>
                  <th className="py-3 px-4">Test 2</th>
                  <th className="py-3 px-4">Exam</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {marks.map(m => (
                  <tr key={m.id}>
                    <td className="py-3 px-4 font-bold text-slate-900">{m.studentName}</td>
                    <td className="py-3 px-4 text-slate-600">{m.subject}</td>
                    <td className="py-3 px-4">{m.test1}</td>
                    <td className="py-3 px-4">{m.test2}</td>
                    <td className="py-3 px-4">{m.exam}</td>
                    <td className="py-3 px-4 font-black text-brand-600">{m.total}</td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        {m.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Role 4: Accountant Dashboard
  if (currentUser?.role === 'accountant') {
    const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
    const totalPending = invoices.reduce((acc, inv) => acc + (inv.amount - inv.paidAmount), 0);

    return (
      <div className="space-y-6">
        <div className="bg-emerald-900 rounded-xl p-6 text-white shadow-md">
          <div className="space-y-2">
            <span className="bg-white/20 text-emerald-100 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              Financial Management Portal
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">Student Accounts & Fee Billing</h1>
            <p className="text-emerald-100 text-xs max-w-xl">
              Fee invoice generation, payment collections, receipts generation, and overdue dues follow-up.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Collected Revenue</span>
            <div className="text-2xl font-black text-emerald-600 mt-2">${totalCollected.toLocaleString()}</div>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Paid Student Fees</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Pending Overdue Dues</span>
            <div className="text-2xl font-black text-rose-600 mt-2">${totalPending.toLocaleString()}</div>
            <span className="text-xs text-slate-500 font-semibold mt-1 block">Awaiting Clearance</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Invoices</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{invoices.length} Invoices</div>
            <span className="text-xs text-brand-600 font-semibold mt-1 block">Current Term</span>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Student Fee Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Amount ($)</th>
                  <th className="py-3 px-4">Paid ($)</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td className="py-3 px-4 font-mono text-slate-500">{inv.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{inv.studentName}</td>
                    <td className="py-3 px-4 text-slate-600">{inv.title}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">${inv.amount}</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">${inv.paidAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
      </div>
    );
  }

  // Role 5: Parent Dashboard
  if (currentUser?.role === 'parent') {
    return (
      <div className="space-y-6">
        <div className="bg-amber-900 rounded-xl p-6 text-white shadow-md">
          <div className="space-y-2">
            <span className="bg-white/20 text-amber-100 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              Guardian Portal
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">Child Progress & Performance</h1>
            <p className="text-amber-100 text-xs max-w-xl">
              Academic report card evaluation, class timetable schedule, and fee payment status.
            </p>
          </div>
        </div>

        {/* Child Profile Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250" alt="Ethan Miller" className="w-16 h-16 rounded-lg object-cover border border-amber-300 shadow-xs" />
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Ethan Miller</h2>
            <div className="text-xs text-slate-500 font-medium">Grade 10 - Section A &bull; Admission No: STU-2026-0042</div>
            <div className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1">
              Attendance: 96% (Excellent)
            </div>
          </div>
        </div>

        {/* Child Recent Scores */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Terminal Exam Report Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 font-bold">Advanced Mathematics</div>
              <div className="text-2xl font-black text-brand-600 mt-1">96 / 100</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Grade A+ (Outstanding)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 font-bold">Quantum Physics</div>
              <div className="text-2xl font-black text-brand-600 mt-1">87 / 100</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Grade A (Excellent)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 font-bold">Organic Chemistry</div>
              <div className="text-2xl font-black text-brand-600 mt-1">82 / 100</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Grade A (Very Good)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Role 6: STUDENT DASHBOARD (REDESIGNED: Rich Student Profile Header Card)
  return (
    <div className="space-y-6">
      
      {/* Rich Student Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Left: Avatar & Identity */}
          <div className="flex items-center gap-4">
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250"} 
              alt={currentUser?.name} 
              className="w-20 h-20 rounded-xl object-cover border-2 border-brand-500 shadow-xs shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">{currentUser?.name || "Ethan Miller"}</h1>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Active Student
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  <strong>Class:</strong> {currentUser?.class || 'Grade 10'} (Section {currentUser?.section || 'A'})
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <strong>Admission No:</strong> <code className="font-mono text-slate-900">{currentUser?.admissionNo || 'STU-2026-0042'}</code>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Academic Session Selector */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-lg shrink-0">
            <Calendar className="w-4 h-4 text-brand-600" />
            <div className="text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">Academic Session</span>
              <select 
                value={selectedSession}
                onChange={e => setSelectedSession(e.target.value)}
                className="bg-transparent font-bold text-slate-900 text-xs focus:outline-none cursor-pointer"
              >
                <option value="2026-2027">2026-2027 Session</option>
                <option value="2025-2026">2025-2026 Session</option>
              </select>
            </div>
          </div>

        </div>

        {/* Student Quick Performance Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Current Average</span>
              <div className="text-lg font-black text-brand-600">88.3% (Grade A+)</div>
            </div>
            <Award className="w-6 h-6 text-brand-600 opacity-80" />
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Class Rank</span>
              <div className="text-lg font-black text-emerald-600">Rank 1 in Grade 10A</div>
            </div>
            <TrendingUp className="w-6 h-6 text-emerald-600 opacity-80" />
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Attendance</span>
              <div className="text-lg font-black text-slate-900">96% (24/25 Days)</div>
            </div>
            <CheckCircle2 className="w-6 h-6 text-slate-500 opacity-80" />
          </div>
        </div>
      </div>

      {/* Student Enrolled Course Marks Preview */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">My Course Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {marks.slice(0, 3).map(m => (
            <div key={m.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="text-xs font-bold text-slate-900">{m.subject}</div>
              <div className="text-xl font-black text-brand-600">{m.total} / 100</div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Grade {m.grade} ({m.remarks})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Timetable */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Today's Class Periods</h2>
        <div className="space-y-2">
          {timetable.map((t, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">{t.subject}</div>
                <div className="text-[11px] text-slate-500">{t.day} &bull; {t.room} &bull; {t.teacher}</div>
              </div>
              <span className="text-xs font-bold bg-white border border-slate-200 px-2.5 py-1 rounded-md text-brand-600 font-mono">
                {t.time}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
