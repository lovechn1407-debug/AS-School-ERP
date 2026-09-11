import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Home, Users } from 'lucide-react';

export default function Dorms() {
  const { dorms } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Hostel & Dormitories</h1>
        <p className="text-xs text-slate-500">Hostel accommodation halls, warden assignments, and live occupancy levels</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dorms.map(d => {
          const occupancyPct = Math.round((d.occupied / d.capacity) * 100);
          return (
            <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-700">{occupancyPct}% Full</span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">{d.name}</h3>
                <p className="text-xs text-slate-500">Warden: {d.warden}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Capacity</span>
                  <span>{d.occupied} / {d.capacity} Students</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full" style={{ width: `${occupancyPct}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
