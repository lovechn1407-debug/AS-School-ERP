import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadToImgBB } from '../../services/imgbb';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Upload, 
  Loader2, 
  ShieldCheck, 
  UserCheck, 
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function UserManagement() {
  const { users, addUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadToImgBB(file);
      setFormData(prev => ({ ...prev, avatar: url }));
    } catch (err) {
      alert('ImgBB upload error: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleLabels = {
      super_admin: 'Super Admin',
      admin: 'Administrator',
      teacher: 'Educator',
      accountant: 'Accountant',
      parent: 'Parent / Guardian',
      student: 'Student'
    };

    addUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      user_type: roleLabels[formData.role] || formData.role,
      avatar: formData.avatar
    });

    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
    });
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleBadgeStyles = {
    super_admin: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    teacher: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    accountant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    parent: 'bg-amber-50 text-amber-700 border-amber-200',
    student: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Hero Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-brand-500/10 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> Super Admin Operations
            </span>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">System User Directory & Credentials</h1>
            <p className="text-slate-300 text-xs lg:text-sm max-w-xl">
              Manage multi-role account access, staff members, educators, students, and parent credentials.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" /> Register New Account
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search accounts by name or email address..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">All Role Types ({users.length})</option>
            <option value="super_admin">Super Admins</option>
            <option value="admin">Administrators</option>
            <option value="teacher">Teachers / Educators</option>
            <option value="accountant">Accountants</option>
            <option value="parent">Parents</option>
            <option value="student">Students</option>
          </select>
        </div>
      </div>

      {/* Users Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(u => (
          <div key={u.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:border-brand-300 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img 
                  src={u.avatar} 
                  alt={u.name} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div className="overflow-hidden space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900 truncate">{u.name}</h3>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${roleBadgeStyles[u.role] || 'bg-slate-100 text-slate-700'}`}>
                  {u.user_type || u.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{u.phone || '+1 (555) 0199'}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono font-semibold">
              <span>ID: {u.id}</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <UserCheck className="w-3 h-3" /> Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" /> Register System Account
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sjenkins@school.edu"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 0199"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Administrator</option>
                  <option value="teacher">Teacher / Educator</option>
                  <option value="accountant">Accountant</option>
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Profile Photo (Hosted via ImgBB)</label>
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <img src={formData.avatar} alt="preview" className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0" />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all hover:scale-[1.02]">
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-brand-300" />}
                    <span>{isUploading ? 'Uploading...' : 'Choose ImgBB Photo'}</span>
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
