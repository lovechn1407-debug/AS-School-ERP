import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Key, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const { loginWithEmail, settings } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleAccounts = [
    { role: 'Super Admin', email: 'superadmin@cjinspired.edu', pass: 'password123', tag: 'System Super Admin' },
    { role: 'Admin', email: 'admin@cjinspired.edu', pass: 'password123', tag: 'School Administrator' },
    { role: 'Teacher', email: 'teacher@cjinspired.edu', pass: 'password123', tag: 'Senior Educator' },
    { role: 'Accountant', email: 'accountant@cjinspired.edu', pass: 'password123', tag: 'Finance Manager' },
    { role: 'Parent', email: 'parent@cjinspired.edu', pass: 'password123', tag: 'Guardian Portal' },
    { role: 'Student', email: 'student@cjinspired.edu', pass: 'password123', tag: 'Student Portal' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillAccount = (accEmail, accPass) => {
    setEmail(accEmail);
    setPassword(accPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Brand & Quick Credential Fill Cards */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 text-base tracking-tight">{settings.systemName}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              School Management ERP Login Portal
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sign in with your email address and password to access your role-based dashboard.
            </p>
          </div>

          {/* Preset User Accounts */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Key className="w-3.5 h-3.5 text-brand-600" /> Pre-Configured Accounts (Click to Fill):
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sampleAccounts.map(acc => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleFillAccount(acc.email, acc.pass)}
                  className="p-2.5 bg-white hover:bg-slate-100/90 border border-slate-200 rounded-xl text-left transition-all group hover:border-brand-300 shadow-xs"
                >
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {acc.role}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{acc.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
          
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500">Enter your email and password below</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3 rounded-2xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="superadmin@cjinspired.edu" 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" defaultChecked />
                Remember me
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset link has been sent to your administrator."); }} className="text-brand-600 hover:underline font-bold">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-all hover:scale-[1.01]"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
