import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { TrendingUp, Crown } from 'lucide-react';

export const NFTTabs = ({ onTabChange, activeSection }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const tabs = [
    {
      id: 'trending',
      label: 'Trending NFTs',
      icon: TrendingUp,
      gradient: 'from-sky-400 to-blue-500',
    },
    {
      id: 'top',
      label: 'Top Rated',
      icon: Crown,
      gradient: 'from-sky-500 to-blue-600',
    }
  ];

  return (
    <div className="flex justify-center space-x-6">
      {tabs.map(({ id, label, icon: Icon, gradient }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`
            flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-200
            ${activeSection === id
              ? `bg-gradient-to-r ${gradient} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
              : isDarkMode
                ? 'text-gray-300 hover:bg-gray-800'
                : 'bg-white/80 text-sky-900 hover:bg-white hover:shadow-md backdrop-blur-sm'
            }
          `}
        >
          <Icon className={`w-6 h-6 ${activeSection === id ? 'text-white' : 'text-sky-500'}`} />
          <span className="font-medium text-lg">{label}</span>
        </button>
      ))}
    </div>
  );
};