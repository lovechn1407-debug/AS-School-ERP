import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const { loginWithEmail, settings } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError(err.message || 'Invalid email address or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/25">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{settings.systemName}</h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">Official School ERP Management Portal</p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3.5 rounded-2xl">
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
                  placeholder="Enter your registered email" 
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
                  placeholder="Enter your password" 
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

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} {settings.systemName}. All rights reserved.
        </div>

      </div>
    </div>
  );
}
