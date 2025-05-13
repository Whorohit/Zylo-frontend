import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Wallet, ShoppingBag, Tag, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

export const UserStats = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  // const { userProfile } = useDashboardStore();
  const {balance,listed,ownedNFTs,data:user }=useSelector(state=>state.userProfile)

  const formattedBalance = typeof balance === "bigint" 
  ? parseFloat(Number(balance).toFixed(2))
  : parseFloat(balance);

  const stats = [
    { label: 'Total Balance',value: formattedBalance.toFixed(3)+"Eth", icon: Wallet, change: '+2.5%' },
    { label: 'NFTs Owned', value:  ownedNFTs.length, icon: ShoppingBag, change: '+3' },
    { label: 'NFTs Listed', value:  listed, icon: Tag, change: '+1' },
    { label: 'Followers', value: user?.followers?.length, icon: Users, change: '+125' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isDarkMode ? 'text-sky-400' : 'text-sky-500'
                }`} />
              </div>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{stat.value}</span>
              <span className="text-green-500 text-sm font-medium">
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};