import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadToImgBB } from '../services/imgbb';
import { User, Upload, CheckCircle2, Loader2, Mail, Phone, Shield } from 'lucide-react';

export default function Profile() {
  const { currentUser, updateAvatar } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const imageUrl = await uploadToImgBB(file);
      updateAvatar(imageUrl);
      setSuccessMessage('Profile avatar updated & hosted via ImgBB successfully!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to upload photo to ImgBB.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">User Profile Settings</h1>
        <p className="text-xs text-slate-500">Manage your personal account details and hosted avatar photo</p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-2xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold p-3 rounded-2xl">
          {errorMessage}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        
        {/* Avatar Header & Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-brand-100 shadow-md"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left space-y-2">
            <h2 className="text-lg font-bold text-slate-900">{currentUser.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-0.5 rounded-full text-xs font-bold capitalize">
                {currentUser.user_type}
              </span>
              <span className="text-slate-400 text-xs font-medium">&bull; Hosted on ImgBB API</span>
            </div>

            {/* ImgBB File Upload Button */}
            <label className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow-sm transition-all hover:scale-[1.02]">
              <Upload className="w-3.5 h-3.5" />
              {isUploading ? 'Uploading to ImgBB...' : 'Upload New Avatar (ImgBB)'}
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

        {/* User Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="text-slate-400 text-[11px] font-bold uppercase flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </div>
            <div className="text-slate-900 font-bold">{currentUser.email}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="text-slate-400 text-[11px] font-bold uppercase flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Contact Phone
            </div>
            <div className="text-slate-900 font-bold">{currentUser.phone || '+1 (555) 0199'}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="text-slate-400 text-[11px] font-bold uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Security Role Key
            </div>
            <div className="text-slate-900 font-bold uppercase font-mono">{currentUser.role}</div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
            <div className="text-slate-400 text-[11px] font-bold uppercase flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Unique ID
            </div>
            <div className="text-slate-900 font-bold font-mono">{currentUser.id}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
