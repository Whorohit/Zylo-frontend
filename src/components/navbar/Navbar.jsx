import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { NavBrand } from './NavBrand';
import { NavLinks } from './NavLinks';
import { NavSearch } from './NavSearch';
import { NavActions } from './NavActions';

export const Navbar = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isDarkMode 
        ? 'bg-gray-900/95 border-gray-800' 
        : 'bg-white/95 border-gray-100'
    } backdrop-blur-md border-b animate-fade-in`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          <NavBrand />
          
          <div className="hidden lg:flex items-center flex-1 px-8">
            <NavLinks />
            <NavSearch />
          </div>

          <NavActions />
        </div>
      </div>
    </header>
  );
};