import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus, 
  Send,
  Calendar,
  UserCheck
} from 'lucide-react';

export default function Attendance({ defaultTab = 'periodwise' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sample periodwise attendance data
  const periodAttendance = [
    { period: "Period 1 (08:30 - 09:30 AM)", subject: "Advanced Mathematics", teacher: "Dr. Robert Carter", status: "Present", time: "08:31 AM" },
    { period: "Period 2 (09:30 - 10:30 AM)", subject: "Quantum Physics", teacher: "Helen Troy", status: "Present", time: "09:30 AM" },
    { period: "Period 3 (10:45 - 11:45 AM)", subject: "Organic Chemistry", teacher: "Prof. Clara Oswald", status: "Present", time: "10:46 AM" },
    { period: "Period 4 (11:45 - 12:45 PM)", subject: "English Literature", teacher: "Marcus Sterling", status: "Present", time: "11:45 AM" },
    { period: "Period 5 (01:30 - 02:30 PM)", subject: "Computer Science", teacher: "Alex Vance", status: "Present", time: "01:32 PM" }
  ];

  // Leave Applications state
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "LV-2026-001", reason: "Medical Appointment & Fever", startDate: "2026-09-02", endDate: "2026-09-03", days: 2, status: "Approved", appliedOn: "2026-09-01" },
    { id: "LV-2026-002", reason: "Family Event / Sister Wedding", startDate: "2026-09-18", endDate: "2026-09-20", days: 3, status: "Pending", appliedOn: "2026-09-10" }
  ]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    startDate: '',
    endDate: '',
    leaveType: 'Casual Leave'
  });

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!formData.reason || !formData.startDate || !formData.endDate) return;

    const newLeave = {
      id: `LV-2026-00${leaveRequests.length + 1}`,
      reason: formData.reason,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: 1,
      status: "Pending",
      appliedOn: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newLeave, ...leaveRequests]);
    setShowApplyModal(false);
    setFormData({ reason: '', startDate: '', endDate: '', leaveType: 'Casual Leave' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-brand-600" /> Attendance Center
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Daily Attendance & Leave Records</h1>
          <p className="text-slate-500 text-xs mt-0.5">Track your periodwise logs and submit formal leave applications.</p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 shrink-0 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab('periodwise')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'periodwise' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-brand-600" /> Periodwise Attendance
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'leave' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-brand-600" /> Leave Application
          </button>
        </div>
      </div>

      {/* Tab 1: Periodwise Attendance */}
      {activeTab === 'periodwise' && (
        <div className="space-y-6">
          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Overall Attendance</span>
              <div className="text-2xl font-black text-slate-900 mt-1">96.0%</div>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">Excellent Record</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Classes Attended</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">115 / 120</div>
              <span className="text-xs text-slate-500 font-semibold mt-1 block">Current Term</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Absences</span>
              <div className="text-2xl font-black text-rose-600 mt-1">3 Days</div>
              <span className="text-xs text-slate-500 font-semibold mt-1 block">Approved Medical</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Today's Status</span>
              <div className="text-2xl font-black text-brand-600 mt-1">5 / 5 Periods</div>
              <span className="text-xs text-emerald-600 font-semibold mt-1 block">All Marked Present</span>
            </div>
          </div>

          {/* Today's Period Table */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Today's Period Log (September 11, 2026)</h2>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Grade 10 - Section A
              </span>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {periodAttendance.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{item.period}</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-600">{item.subject}</td>
                      <td className="py-3.5 px-4 text-slate-600">{item.teacher}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{item.time}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-md text-[11px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Leave Application */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">Submitted Leave Applications</h2>
            <button
              onClick={() => setShowApplyModal(true)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Apply New Leave
            </button>
          </div>

          {/* Leave Applications List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveRequests.map(req => (
              <div key={req.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400">{req.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{req.reason}</h3>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: <strong className="text-slate-800">{req.startDate}</strong> to <strong className="text-slate-800">{req.endDate}</strong> ({req.days} days)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Applied on: {req.appliedOn}</span>
                  <span className="font-semibold text-brand-600">Pending Principal Clearance</span>
                </div>
              </div>
            ))}
          </div>

          {/* Apply Leave Modal */}
          {showApplyModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-extrabold text-slate-900">Apply Leave Application</h3>
                  <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                    Close
                  </button>
                </div>

                <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Leave Reason</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Medical illness or urgent family affair"
                      value={formData.reason}
                      onChange={e => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-brand-600 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-brand-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">End Date</label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-brand-600 font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-bold hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
