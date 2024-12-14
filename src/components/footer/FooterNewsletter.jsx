
import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Send } from 'lucide-react';

export const FooterNewsletter = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div className="max-w-md">
      <h3 className={`text-sm font-semibold mb-3 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Subscribe to our newsletter
      </h3>
      <p className={`text-sm mb-4 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Stay updated with the latest NFT trends and marketplace updates
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
            isDarkMode
              ? 'bg-gray-800 text-white placeholder-gray-500 focus:bg-gray-700'
              : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white'
          } focus:outline-none focus:ring-2 focus:ring-sky-500`}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span className="text-sm">Subscribe</span>
        </button>
      </form>
    </div>
  );
};
