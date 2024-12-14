import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { Users, Tag, DollarSign, ListChecks } from 'lucide-react';
import { AdminStats } from '../widgets/AdminStats';
import { AdminChart } from '../widgets/AdminChart';
import { AdminTransactions } from '../widgets/AdminTransactions';

export const AdminDashboard = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { stats, recentTransactions } = useAdminStore();

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, change: '+12%' },
    { label: 'Total NFTs', value: stats.totalNFTs, icon: Tag, change: '+8%' },
    { label: 'Total Volume', value: stats.totalVolume, icon: DollarSign, change: '+15%' },
    { label: 'Active Listings', value: stats.activeListings, icon: ListChecks, change: '+5%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Dashboard Overview</h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Monitor your marketplace performance and key metrics
        </p>
      </div>

      <AdminStats stats={statCards} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AdminChart />
        <AdminTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
};