import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home, Users, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

export default function Dorms() {
  const { dorms } = useAuth();

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-purple-500/10 blur-3xl pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <span className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Residential Operations
          </span>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Hostel & Dormitory Halls</h1>
          <p className="text-purple-100 text-xs lg:text-sm max-w-xl">
            Hostel accommodation halls, hall warden assignments, residential capacity, and live occupancy tracking.
          </p>
        </div>
      </div>

      {/* Dormitory Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dorms.map(d => {
          const occupancyPct = Math.round((d.occupied / d.capacity) * 100);
          return (
            <div key={d.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5 hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100 group-hover:scale-105 transition-transform">
                  <Home className="w-6 h-6" />
                </div>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                  occupancyPct > 90 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {occupancyPct}% Full
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">{d.name}</h3>
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" /> Warden: <span className="text-slate-800 font-bold">{d.warden}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="text-slate-400">Hall Capacity</span>
                  <span className="text-purple-700">{d.occupied} / {d.capacity} Boarders</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500" 
                    style={{ width: `${occupancyPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
