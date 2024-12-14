import React, { useState } from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { X, UserPlus, Mail, User, Shield } from 'lucide-react';

export const AddUserModal = ({ isOpen, onClose }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { addUser } = useAdminStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({
      ...formData,
      nftsOwned: 0,
      createdAt: new Date().toISOString()
    });
    onClose();
    setFormData({ name: '', email: '', role: 'user', status: 'active' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-xl">
          <UserPlus className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mt-8 mb-6 text-center">
          <h2 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Add New User</h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Create a new user account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Full Name</label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
                placeholder="Enter user's name"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Email Address</label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Role</label>
            <div className="relative">
              <Shield className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Status</label>
            <div className="flex items-center space-x-4">
              {['active', 'suspended'].map((status) => (
                <label key={status} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                  />
                  <span className={`capitalize ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{status}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </form>
      </div>
    </div>
  );
};