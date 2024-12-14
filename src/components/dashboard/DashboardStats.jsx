import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

export const DashboardStats = ({ stats }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-6 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          } shadow-lg`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>{stat.label}</p>
              <h3 className={`text-2xl font-bold mt-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-sky-50'
            }`}>
              <stat.icon className={`w-6 h-6 ${
                isDarkMode ? 'text-sky-400' : 'text-sky-500'
              }`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-500 text-sm font-medium">
              {stat.change}
            </span>
            <span className={`ml-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};