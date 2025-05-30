import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Loader } from 'lucide-react';
import { SearchResults } from '../SearchResults';
import { useThemeStore } from '../../store/useThemeStore';
import { fetchAssetsByName } from '../../store/Searchslice';


export const NavSearch = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const { results: searchResults, loading: isSearching, error } = useSelector(
    (state) => state.searchByName
  );

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (input.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        dispatch(fetchAssetsByName(input));
        setShowResults(true);
      }, 300);
    } else {
     
      setShowResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-lg mx-8" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search NFTs..."
          className={`w-full pl-12 pr-4 py-2.5 rounded-xl transition-all duration-200 ${
            isDarkMode
              ? 'bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800'
              : 'bg-gray-50 text-gray-900 focus:bg-white'
          } border-2 ${
            isDarkMode
              ? 'border-gray-700 focus:border-sky-500'
              : 'border-gray-100 focus:border-sky-500'
          } focus:outline-none`}
        />
        {isSearching ? (
          <Loader
            className={`absolute left-4 top-3 h-5 w-5 animate-spin ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          />
        ) : (
          <Search
            className={`absolute left-4 top-3 h-5 w-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          />
        )}
      </div>

      {showResults && (
        <SearchResults
          results={searchResults}
          isSearching={isSearching}
          searchQuery={query}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
};
