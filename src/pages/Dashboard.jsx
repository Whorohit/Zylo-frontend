import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { UserProfile } from '../components/dashboard/UserProfile';
import { DashboardContent } from '../components/dashboard/DashboardContent';
import { useDashboardStore } from '../store/useDashboardStore';
import { Wallet, Tag, History, TrendingUp, BarChart3, Activity } from 'lucide-react';

export const Dashboard = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { activeTab, setActiveTab } = useDashboardStore();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'purchased', label: 'Purchased NFTs', icon: Wallet },
    { id: 'listed', label: 'Listed NFTs', icon: Tag },
    { id: 'history', label: 'Transaction History', icon: History },
    { id: 'activity', label: 'Recent Activity', icon: Activity },
  ];

  return (
    <div className={`min-h-screen py-12 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-sky-900'
          }`}>My Dashboard</h1>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-sky-700'
          }`}>Manage your NFT portfolio and track your activity</p>
        </div>

        <UserProfile />

        <div className="flex flex-wrap gap-4 mt-8 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === id
                  ? isDarkMode
                    ? 'bg-sky-600 text-white'
                    : 'bg-sky-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <DashboardContent activeTab={activeTab} />
      </div>
    </div>
  );
};