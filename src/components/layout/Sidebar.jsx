import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  BookOpen, 
  Layers, 
  FileSpreadsheet, 
  CreditCard, 
  Clock, 
  UserCheck, 
  Home, 
  Award,
  LogOut,
  FolderTree,
  UserPlus
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  const { currentUser, setCurrentUser } = useAuth();

  const getNavItems = () => {
    switch(currentUser.role) {
      case 'super_admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'settings', label: 'System Settings', icon: Settings },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'classes', label: 'Class & Sections', icon: Layers },
          { id: 'subjects', label: 'Subjects', icon: BookOpen },
          { id: 'marks', label: 'Exams & Marks', icon: FileSpreadsheet },
          { id: 'invoices', label: 'Fee Invoices', icon: CreditCard },
          { id: 'timetable', label: 'Class Timetable', icon: Clock }
        ];

      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'classes', label: 'Classes & Sections', icon: Layers },
          { id: 'subjects', label: 'Subjects', icon: BookOpen },
          { id: 'dorms', label: 'Dormitories', icon: Home },
          { id: 'admissions', label: 'Student Admission', icon: UserPlus },
          { id: 'promotions', label: 'Student Promotion', icon: FolderTree },
          { id: 'users', label: 'Users Directory', icon: Users }
        ];

      case 'teacher':
        return [
          { id: 'dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard },
          { id: 'marks', label: 'Marks Entry Matrix', icon: FileSpreadsheet },
          { id: 'tabulation', label: 'Tabulation Sheets', icon: Award },
          { id: 'timetable', label: 'My Teaching Schedule', icon: Clock }
        ];

      case 'accountant':
        return [
          { id: 'dashboard', label: 'Finance Dashboard', icon: LayoutDashboard },
          { id: 'invoices', label: 'Fee Invoices', icon: CreditCard },
          { id: 'receipts', label: 'Payment Receipts', icon: FileSpreadsheet },
          { id: 'users', label: 'Student Directory', icon: Users }
        ];

      case 'parent':
        return [
          { id: 'dashboard', label: 'Parent Portal', icon: LayoutDashboard },
          { id: 'report-card', label: 'Children Report Cards', icon: Award },
          { id: 'fee-status', label: 'Fee Invoices', icon: CreditCard },
          { id: 'timetable', label: 'Class Timetable', icon: Clock }
        ];

      case 'student':
        return [
          { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
          { id: 'my-marks', label: 'My Report Card', icon: Award },
          { id: 'my-timetable', label: 'My Timetable', icon: Clock },
          { id: 'fee-status', label: 'Fee Invoices', icon: CreditCard }
        ];

      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-65px)]">
      <div className="p-4 space-y-6">
        
        {/* User Card Header */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-brand-500 shadow-sm"
          />
          <div className="overflow-hidden">
            <h3 className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</h3>
            <span className="inline-block px-2 py-0.5 mt-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-700 capitalize">
              {currentUser.user_type}
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
            Navigation Menu
          </span>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/60 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer / Account Settings */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => setActivePage('profile')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activePage === 'profile'
              ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          My Profile & Settings
        </button>

        <button
          onClick={() => setCurrentUser(null)}
          className="w-full mt-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
