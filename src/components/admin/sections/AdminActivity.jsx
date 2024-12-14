import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { Activity, Search, Filter } from 'lucide-react';

export const AdminActivity = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { recentTransactions } = useAdminStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Activity Log</h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Monitor all platform activities
        </p>
      </div>

      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search activity..."
              className={`pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-sky-500`}
            />
          </div>

          <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((activity) => (
            <div
              key={activity.id}
              className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-600' : 'bg-white'
                  }`}>
                    <Activity className={`w-5 h-5 ${
                      isDarkMode ? 'text-sky-400' : 'text-sky-500'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{activity.type}</h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {activity.nft} - {activity.price}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{activity.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};