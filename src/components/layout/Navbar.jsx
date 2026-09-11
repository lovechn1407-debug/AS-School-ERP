import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  CreditCard, 
  Users, 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { currentUser, switchRole, settings } = useAuth();

  const roleOptions = [
    { key: 'super_admin', label: 'Super Admin', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { key: 'admin', label: 'Admin', icon: UserCheck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { key: 'teacher', label: 'Teacher', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { key: 'accountant', label: 'Accountant', icon: CreditCard, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { key: 'parent', label: 'Parent', icon: Users, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { key: 'student', label: 'Student', icon: User, color: 'text-blue-600 bg-blue-50 border-blue-200' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
              {settings.systemName}
            </h1>
            <span className="text-xs font-medium text-slate-500">
              Academic Session {settings.currentSession} &bull; {settings.currentTerm}
            </span>
          </div>
        </div>

        {/* Role Impersonation Pill & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 px-2 uppercase tracking-wider">Demo Role:</span>
            {roleOptions.map(r => {
              const Icon = r.icon;
              const isActive = currentUser.role === r.key;
              return (
                <button
                  key={r.key}
                  onClick={() => switchRole(r.key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? `${r.color} shadow-sm border font-bold scale-[1.02]`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* User Profile Dropdown Pill */}
          <button 
            onClick={() => setActivePage('profile')}
            className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full p-1 pr-3 transition-all"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full object-cover border border-brand-200"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</div>
              <div className="text-[10px] font-semibold text-brand-600 capitalize">{currentUser.user_type}</div>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}
