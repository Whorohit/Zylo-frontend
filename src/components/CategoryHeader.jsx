import React from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const CategoryHeader = ({ title, description }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  return (
    <div className="text-center mb-12">
      <h2 className={`text-4xl font-bold mb-3 ${
        isDarkMode ? 'text-white' : 'text-sky-900'
      } tracking-tight`}>{title}</h2>
      <p className={`text-xl ${
        isDarkMode ? 'text-gray-300' : 'text-sky-700'
      }`}>{description}</p>
    </div>
  );
};