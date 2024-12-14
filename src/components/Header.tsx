import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Search } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">NFTverse</span>
          </Link>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <Link to="/explore" className="text-gray-700 hover:text-blue-600">
              Explore
            </Link>
            <Link to="/create" className="text-gray-700 hover:text-blue-600">
              Create
            </Link>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};