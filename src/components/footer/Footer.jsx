```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { FooterLinks } from './FooterLinks';
import { FooterSocials } from './FooterSocials';
import { FooterNewsletter } from './FooterNewsletter';
import { Zap } from 'lucide-react';

export const Footer = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <footer className={`mt-auto transition-colors ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className={`w-6 h-6 ${
                isDarkMode ? 'text-sky-400' : 'text-sky-500'
              }`} />
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Zylo
              </span>
            </Link>
            <p className={`text-sm mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Discover, collect, and sell extraordinary NFTs on the world's first and largest NFT marketplace.
            </p>
            <FooterSocials />
          </div>

          {/* Links */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h3>
            <FooterLinks />
          </div>

          {/* Newsletter */}
          <div>
            <FooterNewsletter />
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-8 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © {new Date().getFullYear()} Zylo. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link
                to="/terms"
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
```