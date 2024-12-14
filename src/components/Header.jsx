import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Moon, Sun, ShoppingCart, User, LogIn, Zap } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useSearchStore } from '../store/useSearchStore';
import { useNFTStore } from '../store/useNFTStore';
import { AuthModal } from './AuthModal';
import { CartPopup } from './CartPopup';
import { SearchResults } from './SearchResults';

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { totalItems } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { nfts } = useNFTStore();
  const { 
    searchQuery, 
    searchResults, 
    isSearching,
    setSearchQuery, 
    searchNFTs,
    clearSearch 
  } = useSearchStore();
  
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showSearch, setShowSearch] = useState(false);
  
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const handleAuthAction = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setShowLoginMenu(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchNFTs(query, nfts);
        setShowSearch(true);
      }, 300);
    } else {
      clearSearch();
      setShowSearch(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`${
        isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'
      } backdrop-blur-md shadow-sm sticky top-0 z-40 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className={`w-6 h-6 ${
                isDarkMode ? 'text-sky-400' : 'text-sky-500'
              }`} />
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-sky-400' : 'text-sky-500'
              }`}>
                Zylo
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/explore" className={`${
                isDarkMode 
                  ? 'text-gray-300 hover:text-sky-400' 
                  : 'text-gray-700 hover:text-sky-600'
              }`}>
                Explore
              </Link>
              <Link to="/create" className={`${
                isDarkMode 
                  ? 'text-gray-300 hover:text-sky-400' 
                  : 'text-gray-700 hover:text-sky-600'
              }`}>
                Create
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className={`${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-sky-400' 
                    : 'text-gray-700 hover:text-sky-600'
                }`}>
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="hidden md:block flex-1 max-w-md mx-8" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search NFTs..."
                  className={`w-full pl-10 pr-4 py-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                      : 'bg-gray-50 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
                />
                <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                {showSearch && (
                  <SearchResults
                    results={searchResults}
                    isSearching={isSearching}
                    searchQuery={searchQuery}
                    onClose={() => setShowSearch(false)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2"
              >
                <ShoppingCart className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {isDarkMode 
                  ? <Sun className="h-5 w-5 text-yellow-400" />
                  : <Moon className="h-5 w-5 text-gray-700" />
                }
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowLoginMenu(!showLoginMenu)}
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <User className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`} />
                </button>

                {showLoginMenu && !isAuthenticated && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } ring-1 ring-black ring-opacity-5`}>
                    <button
                      onClick={() => handleAuthAction('login')}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthAction('register')}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Register
                    </button>
                  </div>
                )}

                {showLoginMenu && isAuthenticated && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-white'
                  } ring-1 ring-black ring-opacity-5`}>
                    <div className={`px-4 py-2 text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {user?.name || 'User'}
                    </div>
                    <Link
                      to="/dashboard"
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setShowLoginMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowLoginMenu(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      <CartPopup
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </>
  );
};