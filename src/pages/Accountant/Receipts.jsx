import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Receipt, Printer, CheckCircle2, GraduationCap } from 'lucide-react';

export default function Receipts() {
  const { invoices, settings } = useAuth();
  const paidInvoices = invoices.filter(i => i.status === 'Paid');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Official Payment Receipts</h1>
          <p className="text-xs text-slate-500">Verified payment clearances and official student receipts</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Receipts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paidInvoices.map(inv => (
          <div key={inv.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{settings.systemName}</h3>
                  <span className="text-[10px] font-mono text-slate-400">Ref: {inv.id}</span>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PAID
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Student</span>
                <span className="font-bold text-slate-900">{inv.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Fee Description</span>
                <span className="font-medium text-slate-700">{inv.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Amount Cleared</span>
                <span className="font-extrabold text-emerald-600">${inv.paidAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Clearing Date</span>
                <span className="font-medium text-slate-500">{inv.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
