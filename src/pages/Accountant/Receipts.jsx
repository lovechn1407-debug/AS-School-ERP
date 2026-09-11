import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Receipt, Printer, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Receipts() {
  const { invoices, settings } = useAuth();
  const paidInvoices = invoices.filter(i => i.status === 'Paid');

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Financial Records
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Official Student Payment Receipts</h1>
            <p className="text-emerald-100 text-xs lg:text-sm max-w-xl">
              Verified payment clearances, official fee receipt vouchers, and downloadable payment receipts.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Printer className="w-4 h-4 text-emerald-200" /> Print Official Receipts
          </button>
        </div>
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paidInvoices.map(inv => (
          <div key={inv.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4 hover:border-emerald-300 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 group-hover:scale-105 transition-transform">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900">{settings.systemName}</h3>
                  <span className="text-[10px] font-mono font-bold text-slate-400">Ref: {inv.id}</span>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED PAID
              </span>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Student Name</span>
                <span className="font-extrabold text-slate-900">{inv.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Fee Description</span>
                <span className="font-semibold text-slate-700">{inv.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Amount Cleared</span>
                <span className="font-mono font-black text-emerald-600 text-sm">${inv.paidAmount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Payment Date</span>
                <span className="font-mono text-slate-500 font-bold">{inv.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
