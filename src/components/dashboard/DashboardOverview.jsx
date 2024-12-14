import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useNFTStore } from '../../store/useNFTStore';
import { NFTCard } from '../NFTCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardOverview = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { nfts } = useNFTStore();

  // Get recent purchases and listings
  const recentPurchases = nfts.trending.slice(0, 3);
  const recentListings = nfts.collectibles.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Recent Purchases */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Recent Purchases</h3>
          <Link
            to="/explore"
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Browse More
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPurchases.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Your Listed NFTs</h3>
          <Link
            to="/create"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>List New</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentListings.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </div>
    </div>
  );
};