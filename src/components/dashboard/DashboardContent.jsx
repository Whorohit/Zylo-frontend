import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useNFTStore } from '../../store/useNFTStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { DashboardOverview } from './DashboardOverview';
import { DashboardPurchased } from './DashboardPurchased';
import { DashboardListed } from './DashboardListed';
import { TransactionHistory } from './TransactionHistory';
import { RecentActivity } from './RecentActivity';

export const DashboardContent = ({ activeTab }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { transactions, activities } = useDashboardStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'purchased':
        return <DashboardPurchased />;
      case 'listed':
        return <DashboardListed />;
      case 'history':
        return <TransactionHistory transactions={transactions} />;
      case 'activity':
        return <RecentActivity activities={activities} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={`mt-8 ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    } rounded-2xl shadow-lg p-6`}>
      {renderContent()}
    </div>
  );
};