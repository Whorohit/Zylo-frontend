import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, Moon, Sun, User, LogIn, 
  Settings, LogOut, LayoutDashboard 
} from 'lucide-react';
import { AuthModal } from '../AuthModal';
import { CartPopup } from '../CartPopup';

export const NavActions = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { toggleDarkMode } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => setShowCart(true)}
        className={`p-2 rounded-xl relative group ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
      >
        <ShoppingCart className={`w-6 h-6 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        } group-hover:scale-110 transition-transform duration-200`} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white bg-sky-500 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-xl ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <div className="relative">
        <button
          onClick={() => isAuthenticated ? setShowUserMenu(!showUserMenu) : setShowAuthModal(true)}
          className={`flex items-center space-x-2 p-2 rounded-xl ${
            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          {isAuthenticated ? (
            <img
              src={user?.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
              alt={user?.name}
              className="w-8 h-8 rounded-xl object-cover"
            />
          ) : (
            <User className={`w-6 h-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`} />
          )}
        </button>

        {showUserMenu && isAuthenticated && (
          <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="px-4 py-2 border-b border-gray-200">
              <p className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{user?.name}</p>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>{user?.email}</p>
            </div>
            
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 text-sm ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setShowUserMenu(false)}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/settings"
              className={`flex items-center space-x-2 px-4 py-2 text-sm ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setShowUserMenu(false)}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            
            <button
              onClick={() => {
                logout();
                setShowUserMenu(false);
              }}
              className={`w-full flex items-center space-x-2 px-4 py-2 text-sm ${
                isDarkMode 
                  ? 'text-red-400 hover:bg-gray-700' 
                  : 'text-red-600 hover:bg-gray-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <CartPopup
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </div>
  );
};