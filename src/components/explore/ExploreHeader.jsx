import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Compass } from 'lucide-react';

export const ExploreHeader = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  return (
    <div className="text-center">
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sky-500/10 mb-6">
        <Compass className="w-5 h-5 text-sky-400" />
        <span className={`text-sm font-medium ${
          isDarkMode ? 'text-sky-400' : 'text-sky-600'
        }`}>
          Explore NFTs
        </span>
      </div>
      <h1 className={`text-4xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-sky-900'
      }`}>
        Discover Unique Digital Art
      </h1>
      <p className={`text-xl max-w-2xl mx-auto ${
        isDarkMode ? 'text-gray-300' : 'text-sky-700'
      }`}>
        Browse through our curated collection of extraordinary NFTs
      </p>
    </div>
  );
};