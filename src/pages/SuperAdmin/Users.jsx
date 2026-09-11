import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadToImgBB } from '../../services/imgbb';
import { Users, Plus, Search, Filter, Trash2, Mail, Phone, Upload, Loader2 } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">User Management Directory</h1>
          <p className="text-xs text-slate-500">Manage account permissions, staff records, parents, and students</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" /> Add New User
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admins</option>
            <option value="admin">Admins</option>
            <option value="teacher">Teachers</option>
            <option value="accountant">Accountants</option>
            <option value="parent">Parents</option>
            <option value="student">Students</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map(u => (
          <div key={u.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="flex items-center gap-3.5">
              <img 
                src={u.avatar} 
                alt={u.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-100 shadow-sm shrink-0"
              />
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-slate-900 truncate">{u.name}</h3>
                <span className="inline-block px-2.5 py-0.5 mt-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700 border border-brand-100 uppercase">
                  {u.role.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{u.phone || '+1 555-0199'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Create New User Account</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Smith"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="janesmith@cjinspired.edu"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 0199"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Profile Photo (ImgBB Upload)</label>
                <div className="flex items-center gap-3">
                  <img src={formData.avatar} alt="preview" className="w-10 h-10 rounded-full object-cover border" />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    {isUploading ? 'Uploading...' : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
