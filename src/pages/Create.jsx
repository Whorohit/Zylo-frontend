import React from 'react';
import { ListNFTForm } from '../components/ListNFTForm';
import { useThemeStore } from '../store/useThemeStore';

export const Create = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  return (
    <div className={`min-h-screen py-12 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-sky-50 via-sky-100 to-sky-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-sky-900'
          }`}>Create & List Your NFT</h1>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-sky-700'
          }`}>Share your digital art with the world</p>
        </div>
        
        <ListNFTForm />
      </div>
    </div>
  );
};