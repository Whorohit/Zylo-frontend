import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminContent } from '../components/admin/AdminContent';
import { useAdminStore } from '../store/useAdminStore';

export const Admin = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { activeSection } = useAdminStore();

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="flex">
        <AdminSidebar />
        <AdminContent activeSection={activeSection} />
      </div>
    </div>
  );
};