import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  CreditCard, 
  Users, 
  User, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  const { currentUser, switchRole, settings } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roleOptions = [
    { key: 'super_admin', label: 'Super Admin', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { key: 'admin', label: 'Admin', icon: UserCheck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { key: 'teacher', label: 'Teacher', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { key: 'accountant', label: 'Accountant', icon: CreditCard, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { key: 'parent', label: 'Parent', icon: Users, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { key: 'student', label: 'Student', icon: User, color: 'text-blue-600 bg-blue-50 border-blue-200' }
  ];

  const currentRoleObj = roleOptions.find(r => r.key === currentUser.role) || roleOptions[0];
  const ActiveRoleIcon = currentRoleObj.icon;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                {settings.systemName}
              </h1>
              <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                Session {settings.currentSession} &bull; {settings.currentTerm}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Role Switcher & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Desktop Role Switcher Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wider">Role:</span>
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

          {/* Mobile & Tablet Role Dropdown Trigger */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold ${currentRoleObj.color}`}
            >
              <ActiveRoleIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{currentRoleObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Switch Active Panel</div>
                {roleOptions.map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.key}
                      onClick={() => {
                        switchRole(r.key);
                        setShowRoleMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 text-left transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-500" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile Badge */}
          <button 
            onClick={() => setActivePage('profile')}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full p-1 pr-2 sm:pr-3 transition-all"
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
