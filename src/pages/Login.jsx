import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ShieldCheck, UserCheck, BookOpen, CreditCard, Users, User, ArrowRight, Lock, Mail } from 'lucide-react';

export default function Login() {
  const { switchRole, setCurrentUser, users, settings } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roleDemos = [
    { role: 'super_admin', title: 'Super Admin', desc: 'Full System Control', icon: ShieldCheck, color: 'bg-indigo-600' },
    { role: 'admin', title: 'Admin', desc: 'Classes & Admissions', icon: UserCheck, color: 'bg-purple-600' },
    { role: 'teacher', title: 'Teacher', desc: 'Marks & Schedules', icon: BookOpen, color: 'bg-cyan-600' },
    { role: 'accountant', title: 'Accountant', desc: 'Fees & Invoices', icon: CreditCard, color: 'bg-emerald-600' },
    { role: 'parent', title: 'Parent', desc: 'Child Academic Cards', icon: Users, color: 'bg-amber-600' },
    { role: 'student', title: 'Student', desc: 'Personal Results', icon: User, color: 'bg-blue-600' }
  ];

  const handleManualLogin = (e) => {
    e.preventDefault();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
    } else {
      switchRole('super_admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/60 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Welcome Info */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">{settings.systemName}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Next-Gen School ERP Portal
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Real-time student management, academic performance matrix, financial reporting, and multi-panel role control.
            </p>
          </div>

          {/* Quick Demo Access Grid */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Instant Demo Login:</span>
            <div className="grid grid-cols-2 gap-2.5">
              {roleDemos.map(d => {
                const Icon = d.icon;
                return (
                  <button
                    key={d.role}
                    onClick={() => switchRole(d.role)}
                    className="flex items-center gap-3 p-2.5 bg-white hover:bg-slate-100/80 border border-slate-200 rounded-xl text-left transition-all group hover:scale-[1.02] shadow-sm"
                  >
                    <div className={`w-8 h-8 rounded-lg ${d.color} text-white flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-tight">
                        {d.title}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">{d.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Glass Login Form */}
        <div className="glass-card bg-white/95 rounded-3xl p-8 shadow-xl border border-white/80">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500 mt-1">Enter your credentials or use quick role access</p>
          </div>

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="superadmin@cjinspired.edu" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-all hover:scale-[1.01]"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
