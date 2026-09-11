import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadToImgBB } from '../services/imgbb';
import { 
  User, 
  Upload, 
  CheckCircle2, 
  Loader2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera, 
  Sparkles, 
  Database, 
  Key, 
  Activity,
  Save,
  Check,
  Shield,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function Profile() {
  const { currentUser, updateAvatar, updateUserProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Editable Profile Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '+1 (555) 0199',
    user_type: currentUser?.user_type || ''
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const imageUrl = await uploadToImgBB(file);
      await updateAvatar(imageUrl);
      setSuccessMessage('Profile avatar updated & hosted via ImgBB successfully!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to upload photo to ImgBB.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setSuccessMessage('');
      setErrorMessage('');

      await updateUserProfile({
        name: formData.name,
        phone: formData.phone
      });

      setSuccessMessage('Account details updated successfully!');
    } catch (err) {
      setErrorMessage('Failed to update profile details.');
    } finally {
      setIsSaving(false);
    }
  };

  const roleColors = {
    super_admin: 'from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/30 text-indigo-400',
    admin: 'from-purple-900 via-indigo-900 to-slate-900 border-purple-500/30 text-purple-400',
    teacher: 'from-cyan-900 via-blue-950 to-slate-900 border-cyan-500/30 text-cyan-400',
    accountant: 'from-emerald-900 via-teal-950 to-slate-900 border-emerald-500/30 text-emerald-400',
    parent: 'from-amber-900 via-orange-950 to-slate-900 border-amber-500/30 text-amber-400',
    student: 'from-brand-900 via-indigo-950 to-slate-900 border-brand-500/30 text-brand-400'
  };

  const currentGradient = roleColors[currentUser?.role] || roleColors.student;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      
      {/* Toast Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-2xl shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-4 rounded-2xl shadow-xs">
          {errorMessage}
        </div>
      )}

      {/* Ultra Glassmorphic Hero Cover Banner */}
      <div className={`bg-gradient-to-r ${currentGradient} rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border`}>
        
        {/* Glow Decor Background */}
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 relative z-10">
          
          {/* Avatar Ring & Core Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
            
            {/* Interactive ImgBB Avatar Dropzone */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-tr from-white/40 via-white/10 to-transparent backdrop-blur-md shadow-2xl">
                <img 
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"} 
                  alt={currentUser?.name} 
                  className="w-full h-full rounded-[20px] object-cover border border-white/20 shadow-inner"
                />
              </div>

              {/* Verified Badge */}
              <span className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>

              {/* Hover Camera Uploader Overlay */}
              <label className="absolute inset-0 bg-slate-900/60 rounded-3xl backdrop-blur-xs opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 text-white gap-1 p-2 text-[10px] font-bold">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-white" />
                    <span>Upload ImgBB</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="bg-white/15 backdrop-blur-md text-white border border-white/20 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Account
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active Session
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{currentUser?.name}</h1>
              <p className="text-slate-300 text-xs font-medium max-w-sm">
                {currentUser?.email} &bull; <span className="font-mono capitalize text-brand-300">{currentUser?.user_type || currentUser?.role}</span>
              </p>
            </div>
          </div>

          {/* ImgBB Direct Upload Action Button */}
          <label className="shrink-0 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs px-4 py-2.5 rounded-2xl cursor-pointer backdrop-blur-md transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-95">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-brand-200" />}
            <span>{isUploading ? 'Uploading Image...' : 'Change Photo (ImgBB)'}</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>

        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Editable Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-600" /> Account Identity & Details
                </h2>
                <p className="text-xs text-slate-500">Update your name and primary contact number</p>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Display Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Contact Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Registered Email Address (Fixed)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input 
                    type="email" 
                    disabled
                    value={currentUser?.email || ''}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-100/70 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Email address is bound to Firebase Authentication</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-brand-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Security & Access Info */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Role & System Access Level
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-1">
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Access Category</div>
                <div className="text-slate-900 font-extrabold text-sm capitalize">{currentUser?.user_type || currentUser?.role}</div>
                <div className="text-emerald-600 font-bold text-[11px] pt-1">Full Module Privileges</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-1">
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Firebase Cloud Sync</div>
                <div className="text-slate-900 font-extrabold text-sm flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-brand-600" /> Realtime Sync Active
                </div>
                <div className="text-slate-500 text-[11px] pt-1">Node: /system_data/users</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Security Metadata Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-600" /> Technical Identifiers
            </h2>

            <div className="space-y-3.5 text-xs font-medium">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Account ID Key</span>
                <span className="font-mono text-slate-900 font-bold block truncate">{currentUser?.id}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Role Key Code</span>
                <span className="font-mono text-indigo-600 font-black uppercase block">{currentUser?.role}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Photo Cloud Storage</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  ImgBB Cloud Hosted <ExternalLink className="w-3 h-3" />
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Session State</span>
                <span className="text-slate-900 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Authenticated & Active
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
