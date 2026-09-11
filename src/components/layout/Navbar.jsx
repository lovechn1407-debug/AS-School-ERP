import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  Menu, 
  X,
  LogOut,
  User
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  const { currentUser, logout, settings } = useAuth();

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

        {/* Right: Active Role Badge & Profile / Sign Out */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Role Tag */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 rounded-full text-xs font-bold capitalize">
            <User className="w-3.5 h-3.5" />
            {currentUser.user_type}
          </div>

          {/* Profile Badge & Settings */}
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
              <div className="text-[10px] font-semibold text-slate-500 truncate max-w-[120px]">{currentUser.email}</div>
            </div>
          </button>

          {/* Sign Out Button */}
          <button
            onClick={logout}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>

        </div>

      </div>
    </header>
  );
}
