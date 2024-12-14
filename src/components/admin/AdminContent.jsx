import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { AdminDashboard } from './sections/AdminDashboard';
import { AdminUsers } from './sections/AdminUsers';
import { AdminNFTs } from './sections/AdminNFTs';
import { AdminReports } from './sections/AdminReports';
import { AdminActivity } from './sections/AdminActivity';
import { AdminSettings } from './sections/AdminSettings';

export const AdminContent = ({ activeSection }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <AdminUsers />;
      case 'nfts':
        return <AdminNFTs />;
      case 'reports':
        return <AdminReports />;
      case 'activity':
        return <AdminActivity />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex-1 ml-64 p-8">
      {renderContent()}
    </div>
  );
};