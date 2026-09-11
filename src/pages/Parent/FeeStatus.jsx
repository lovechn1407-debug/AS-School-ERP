import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FeeStatus() {
  const { invoices } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Student Fee Invoices & Payment Portal</h1>
        <p className="text-xs text-slate-500">Track tuition fees, lab dues, payment history, and clearance status</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Invoice ID</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Fee Title</th>
              <th className="py-3 px-4">Total Amount ($)</th>
              <th className="py-3 px-4">Amount Paid ($)</th>
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
    </div>
  );
}
