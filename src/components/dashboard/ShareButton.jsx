import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Share2 } from 'lucide-react';

export const ShareButton = ({ onClick, className = '' }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
        isDarkMode
          ? 'bg-gray-700 text-white hover:bg-gray-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${className}`}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  );
};