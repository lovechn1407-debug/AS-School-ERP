import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, GraduationCap } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) {
  const { currentUser, settings } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between">
        
        {/* Left: Menu Button */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80 shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Center: System Brand & Title */}
        <div className="flex items-center gap-2.5 text-center mx-auto px-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <GraduationCap className="w-4.5 h-4.5" />
          </div>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
            {settings.systemName}
          </h1>
        </div>

        {/* Right: Small User Profile Avatar Trigger */}
        <button
          onClick={() => setActivePage('profile')}
          className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shrink-0 hover:ring-2 hover:ring-brand-500/30 transition-all"
        >
          <img 
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250"} 
            alt={currentUser?.name} 
            className="w-full h-full object-cover"
          />
        </button>

      </div>
    </header>
  );
}
