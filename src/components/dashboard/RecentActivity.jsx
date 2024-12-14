import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Activity } from 'lucide-react';

export const RecentActivity = ({ activities }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`rounded-xl ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    } shadow-lg p-6`}>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-sky-50'
            }`}>
              <Activity className={`w-6 h-6 ${
                isDarkMode ? 'text-sky-400' : 'text-sky-500'
              }`} />
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{activity.type}</h4>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {activity.user} {activity.type.toLowerCase().includes('bid') ? 'bid' : 'for'} {activity.amount} on {activity.nft}
              </p>
            </div>
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};