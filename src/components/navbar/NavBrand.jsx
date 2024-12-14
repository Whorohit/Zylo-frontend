import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { Zap } from 'lucide-react';

export const NavBrand = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-3 group"
    >
      <div className={`p-2 rounded-xl transition-colors ${
        isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50'
      } group-hover:scale-110 transform duration-200`}>
        <Zap className="w-7 h-7 text-sky-500" />
      </div>
      <span className={`text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent`}>
        Zylo
      </span>
    </Link>
  );
};