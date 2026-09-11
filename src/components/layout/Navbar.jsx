import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, GraduationCap, Calendar } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  const { currentUser, settings } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 lg:px-8 py-3.5">
      <div className="flex items-center justify-between relative">
        
        {/* Left: Menu Icon Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: System Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-center pointer-events-none sm:pointer-events-auto">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {settings.systemName}
          </h1>
        </div>

        {/* Right: Academic Session & Active Role Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            <span>Session {settings.currentSession}</span>
          </div>
          <span className="px-2.5 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-lg text-xs font-bold capitalize">
            {currentUser?.user_type}
          </span>
        </div>

      </div>
    </header>
  );
}
