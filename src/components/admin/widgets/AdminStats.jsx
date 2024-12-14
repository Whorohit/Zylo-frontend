import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';

export const AdminStats = ({ stats }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-sky-50'
              }`}>
                <Icon className={`w-6 h-6 ${
                  isDarkMode ? 'text-sky-400' : 'text-sky-500'
                }`} />
              </div>
              <span className="text-green-500 text-sm font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{stat.value}</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};