import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { Link } from 'react-router-dom';
import { Search, Loader } from 'lucide-react';

export const SearchResults = ({ results, isSearching, searchQuery, onClose }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  if (!searchQuery) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2">
      <div className={`max-h-[70vh] overflow-y-auto rounded-xl shadow-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {isSearching ? (
          <div className="p-4 flex items-center justify-center">
            <Loader className={`w-6 h-6 animate-spin ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        ) : results.length > 0 ? (
          <div className="py-2">
            {results.map((nft) => (
              <Link
                key={nft.id}
                to={`/nft/${nft.id}`}
                onClick={onClose}
                className={`flex items-center space-x-4 p-4 transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{nft.name}</h4>
                  <p className={`text-sm truncate ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>by {nft.seller}</p>
                </div>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-sky-400' : 'text-sky-600'
                }`}>{nft.price} ETH</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`p-4 text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Search className="w-6 h-6 mx-auto mb-2" />
            <p>No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};