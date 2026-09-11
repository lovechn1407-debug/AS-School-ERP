import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle2, AlertCircle, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';

export default function FeeStatus() {
  const { invoices } = useAuth();

  const totalBilled = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalPaid = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const remainingDues = totalBilled - totalPaid;

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-orange-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <span className="bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Guardian Financial Overview
          </span>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Student Fee Invoices & Payment Portal</h1>
          <p className="text-amber-100 text-xs lg:text-sm max-w-xl">
            Track tuition fee billing, laboratory fees, paid receipts, and active payment clearance status.
          </p>
        </div>
      </div>

      {/* Financial Summary Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Billed Fees</span>
          <div className="text-2xl font-black text-slate-900">${totalBilled.toLocaleString()}</div>
          <span className="text-xs font-bold text-slate-500 block">Current Academic Year</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Cleared / Paid Fees</span>
          <div className="text-2xl font-black text-emerald-600">${totalPaid.toLocaleString()}</div>
          <span className="text-xs font-bold text-emerald-600 block">Verified Payments</span>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Outstanding Dues</span>
          <div className="text-2xl font-black text-rose-600">${remainingDues.toLocaleString()}</div>
          <span className="text-xs font-bold text-slate-500 block">Pending Settlement</span>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Invoice Ref</th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Fee Title</th>
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

    </div>
  );
}
