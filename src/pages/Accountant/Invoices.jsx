import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, Plus, CheckCircle2 } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Fee Invoices</h1>
          <p className="text-xs text-slate-500">Create tuition & facility invoices and record student payment clearance</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Fee Invoice
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Invoice Ref</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Title / Description</th>
              <th className="py-3 px-4">Total Fee ($)</th>
              <th className="py-3 px-4">Paid Amount ($)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-mono text-slate-500">{inv.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{inv.studentName}</td>
                <td className="py-3.5 px-4 text-slate-600">{inv.title}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">${inv.amount}</td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">${inv.paidAmount}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                    inv.status === 'Partial' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{inv.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create Fee Invoice</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student</label>
                <select
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.class})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Invoice Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Amount ($)</label>
                  <input 
                    type="number" required
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Paid Amount ($)</label>
                  <input 
                    type="number" required
                    value={formData.paidAmount}
                    onChange={e => setFormData({ ...formData, paidAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                <input 
                  type="date" required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
