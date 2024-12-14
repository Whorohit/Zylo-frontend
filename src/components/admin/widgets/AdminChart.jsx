import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { BarChart3, ArrowUpRight } from 'lucide-react';

export const AdminChart = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg animate-fade-in-up delay-200`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-sky-50'
          }`}>
            <BarChart3 className={`w-5 h-5 ${
              isDarkMode ? 'text-sky-400' : 'text-sky-500'
            }`} />
          </div>
          <div>
            <h3 className={`font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Sales Overview</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Monthly revenue</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowUpRight className="w-4 h-4 text-green-500" />
          <span className="text-green-500 text-sm font-medium">+12.5%</span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between space-x-2">
        {[40, 70, 55, 90, 50, 75, 60, 65, 85, 95, 70, 80].map((height, index) => (
          <div
            key={index}
            className="w-full"
            style={{ height: `${height}%` }}
          >
            <div className={`w-full h-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
              isDarkMode ? 'bg-sky-400/20' : 'bg-sky-100'
            }`}>
              <div
                className={`w-full rounded-t-lg bg-sky-500`}
                style={{ height: `${height}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
          <span
            key={index}
            className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          >
            {month}
          </span>
        ))}
      </div>
    </div>
  );
};