import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

export const HeroBackground = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  return (
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000"
        alt="NFT Blockchain Art"
        className="w-full h-full object-cover scale-110 animate-slow-zoom"
        loading="eager"
      />
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-sky-900/95 via-blue-900/95 to-purple-900/95' 
          : 'bg-gradient-to-br from-sky-900/90 via-blue-800/90 to-sky-900/90'
      }`} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30" />
    </div>
  );
};