import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { ExternalLink, Tag, BarChart3, Eye } from 'lucide-react';

export const NFTDetails = ({ nft }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const stats = [
    { label: 'Views', value: nft.views || 1234, icon: Eye },
    { label: 'Likes', value: nft.likes || 89, icon: BarChart3 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{nft.name}</h1>
          <ExternalLink className={`w-6 h-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
        <p className={`text-lg mb-6 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>{nft.description}</p>
        
        <div className="flex items-center space-x-4 mb-8">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
            alt={nft.creator}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Created by</p>
            <p className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{nft.creator}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <stat.icon className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>{stat.label}</span>
            </div>
            <p className={`text-lg font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};