import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { ArrowDownUp } from 'lucide-react';

export const ExploreSorting = ({ sortBy, onSortChange, totalNFTs }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <p className={`mb-4 sm:mb-0 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {totalNFTs} items
      </p>
      
      <div className="flex items-center space-x-2">
        <ArrowDownUp className={`w-5 h-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};