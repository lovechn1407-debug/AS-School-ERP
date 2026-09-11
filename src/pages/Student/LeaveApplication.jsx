import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Plus, Calendar, Check, X, Send } from 'lucide-react';

export default function LeaveApplication() {
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role !== 'student' && currentUser?.role !== 'parent';

  const [leaveRequests, setLeaveRequests] = useState([
    { id: "LV-2026-001", studentName: "Ethan Miller", reason: "Medical Appointment & Fever", startDate: "2026-09-02", endDate: "2026-09-03", days: 2, status: "Approved", appliedOn: "2026-09-01" },
    { id: "LV-2026-002", studentName: "Ethan Miller", reason: "Family Event / Sister Wedding", startDate: "2026-09-18", endDate: "2026-09-20", days: 3, status: "Pending", appliedOn: "2026-09-10" },
    { id: "LV-2026-003", studentName: "Sophia Martinez", reason: "Dental Surgery Clearance", startDate: "2026-09-12", endDate: "2026-09-13", days: 1, status: "Pending", appliedOn: "2026-09-11" }
  ]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({ reason: '', startDate: '', endDate: '' });

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!formData.reason || !formData.startDate || !formData.endDate) return;

    const newLeave = {
      id: `LV-2026-00${leaveRequests.length + 1}`,
      studentName: currentUser?.name || "Ethan Miller",
      reason: formData.reason,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: 1,
      status: "Pending",
      appliedOn: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newLeave, ...leaveRequests]);
    setShowApplyModal(false);
    setFormData({ reason: '', startDate: '', endDate: '' });
  };

  const handleLeaveStatusChange = (id, newStatus) => {
    setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  return (
    <div className="space-y-6">
      
      {/* Clean Page Title (No Top Card Box) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Leave Application</h1>
          <p className="text-slate-500 text-xs mt-0.5">Submit formal leave requests and track approval statuses.</p>
        </div>

        {!isStaff && (
          <button
            onClick={() => setShowApplyModal(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Apply New Leave
          </button>
        )}
      </div>

      {/* Leave Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leaveRequests.map(req => (
          <div key={req.id} className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-400">{req.id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : req.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
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

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Student: <strong className="text-slate-700">{req.studentName}</strong> (Applied: {req.appliedOn})</span>
              
              {isStaff && req.status === 'Pending' ? (
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => handleLeaveStatusChange(req.id, 'Approved')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md font-bold text-[10px] flex items-center gap-1 transition-all"
                  >
                    <Check className="w-3 h-3" /> Approve
                  </button>
                  <button 
                    onClick={() => handleLeaveStatusChange(req.id, 'Rejected')}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded-md font-bold text-[10px] flex items-center gap-1 transition-all"
                  >
                    <X className="w-3 h-3" /> Reject
                  </button>
                </div>
              ) : (
                <span className="font-semibold text-brand-600">{req.status} Status</span>
              )}
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
  );
}
