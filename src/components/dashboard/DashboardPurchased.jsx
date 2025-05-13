import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useNFTStore } from '../../store/useNFTStore';
import { NFTCard } from '../NFTCard';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPurchases } from '../../store/userprofileslice';

export const DashboardPurchased = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const {purchases}=useSelector(state=>state.userProfile)
 const dispatch=useDispatch();
  useEffect(() => {
     dispatch(fetchUserPurchases())
   
  }, [dispatch])
  

  // Get all purchased NFTs
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Your NFT Collection</h3>
        <Link
          to="/explore"
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Compass className="w-4 h-4" />
          <span>Explore More</span>
        </Link>
      </div>

      {purchases.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Compass className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`} />
          <h4 className={`text-xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>No NFTs Yet</h4>
          <p className={`mb-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Start your collection by exploring our marketplace</p>
          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Compass className="w-5 h-5" />
            <span>Browse NFTs</span>
          </Link>
        </div>
      )}
    </div>
  );
};