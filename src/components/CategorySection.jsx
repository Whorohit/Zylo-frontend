import React from 'react';
import { NFTCard } from './NFTCard';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export const CategorySection = ({ title, description, nfts }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{title}</h3>
          <p className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>{description}</p>
        </div>
        <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          isDarkMode 
            ? 'text-sky-400 hover:bg-sky-900/20' 
            : 'text-sky-600 hover:bg-sky-50'
        }`}>
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};