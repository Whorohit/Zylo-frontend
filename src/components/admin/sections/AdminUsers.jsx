import React, { useState } from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { UserPlus, Search, MoreVertical } from 'lucide-react';
import { AddUserModal } from '../modals/AddUserModal';

export const AdminUsers = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { users, updateUser } = useAdminStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleStatusChange = (userId, newStatus) => {
    updateUser(userId, { status: newStatus });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Users</h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Manage and monitor user accounts
            </p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        {/* Rest of the AdminUsers component code... */}
      </div>

      <AddUserModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </>
  );
};