import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, Plus, CheckCircle2, ShieldCheck, Sparkles, X, DollarSign } from 'lucide-react';

export default function Invoices() {
  const { invoices, addInvoice, students } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: 'Ethan Miller',
    title: 'Laboratory & Library Fee',
    amount: 350,
    paidAmount: 350,
    status: 'Paid',
    dueDate: '2026-09-30'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(formData.amount) || 0;
    const paid = parseFloat(formData.paidAmount) || 0;
    let status = 'Unpaid';
    if (paid >= amt) status = 'Paid';
    else if (paid > 0) status = 'Partial';

    addInvoice({
      ...formData,
      amount: amt,
      paidAmount: paid,
      status
    });

    setIsModalOpen(false);
  };

  const totalBilled = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Accounts & Billing Operations
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Student Fee Invoices & Billing</h1>
            <p className="text-emerald-100 text-xs lg:text-sm max-w-xl">
              Generate student fee invoices, record tuition payment collections, and monitor outstanding dues.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Fee Invoice
          </button>
        </div>
      </div>

      {/* Invoice Directory Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Invoice Reference</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4">Total Amount ($)</th>
              <th className="py-3.5 px-4">Paid Amount ($)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-slate-500">{inv.id}</td>
                <td className="py-4 px-4 font-extrabold text-slate-900">{inv.studentName}</td>
                <td className="py-4 px-4 font-semibold text-slate-600">{inv.title}</td>
                <td className="py-4 px-4 font-mono font-black text-slate-900">${inv.amount}</td>
                <td className="py-4 px-4 font-mono font-black text-emerald-600">${inv.paidAmount}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                    inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    inv.status === 'Partial' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 px-4 font-mono text-slate-500">{inv.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Create Fee Invoice
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Student</label>
                <select
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
                >
                  {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.class})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Invoice Description / Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Tuition & Exam Fee"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Amount ($)</label>
                  <input 
                    type="number" required
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Paid Amount ($)</label>
                  <input 
                    type="number" required
                    value={formData.paidAmount}
                    onChange={e => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-emerald-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Due Date</label>
                <input 
                  type="date" required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                >
                  Create Fee Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
