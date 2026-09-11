import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadToImgBB } from '../../services/imgbb';
import { UserPlus, CheckCircle2, User, ShieldCheck, Upload, Loader2, Sparkles } from 'lucide-react';

export default function Admissions() {
  const { addStudent, classes } = useAuth();
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: 'Grade 10',
    section: 'A',
    gender: 'Male',
    parent: '',
    admissionNo: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'
  });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadToImgBB(file);
      setFormData(prev => ({ ...prev, avatar: url }));
    } catch (err) {
      alert('ImgBB Upload Error: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formData);
    setSuccess(true);
    setFormData({
      name: '',
      class: 'Grade 10',
      section: 'A',
      gender: 'Male',
      parent: '',
      admissionNo: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'
    });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl space-y-6 pb-8">
      
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-purple-500/10 blur-3xl pointer-events-none"></div>
        <div className="space-y-2 relative z-10">
          <span className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Student Enrollment Portal
          </span>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">New Student Admission & Registration</h1>
          <p className="text-purple-100 text-xs lg:text-sm max-w-xl">
            Register new students, assign admission numbers, allocate grade classes, and upload ImgBB student photos.
          </p>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-2xl shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Student admitted and enrolled into system database successfully!</span>
        </div>
      )}

      {/* Main Admission Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> Enrollment Registration Details
          </h2>
          <p className="text-xs text-slate-500">Provide official student and guardian information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Full Name</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lucas Sterling"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500 focus:bg-white transition-all" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Auto Admission Number</label>
              <input 
                type="text" readOnly
                value={formData.admissionNo}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono font-extrabold text-purple-700" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Grade Class</label>
              <select
                value={formData.class}
                onChange={e => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
              >
                {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Section</label>
              <select
                value={formData.section}
                onChange={e => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Parent / Guardian Name</label>
              <input 
                type="text" required
                value={formData.parent}
                onChange={e => setFormData({ ...formData, parent: e.target.value })}
                placeholder="e.g. David & Emma Sterling"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-500 focus:bg-white transition-all" 
              />
            </div>
          </div>

          {/* Student Photo Upload (ImgBB) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Profile Photo (ImgBB Upload)</label>
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <img src={formData.avatar} alt="preview" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0" />
              <div className="space-y-1">
                <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-[1.02]">
                  {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-purple-300" />}
                  <span>{isUploading ? 'Uploading Image...' : 'Upload Student Photo'}</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
                <span className="text-[11px] text-slate-400 block">Hosted via ImgBB Cloud Service</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" /> Complete Student Admission
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
