import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useCartStore } from '../../store/useCartStore';
import { Wallet, Clock, Shield, Info } from 'lucide-react';

export const PurchaseOptions = ({ nft, onPurchase }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...nft, quantity });
  };

  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    } shadow-lg space-y-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>Current Price</p>
          <p className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{nft.price} ETH</p>
        </div>
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-gray-700' : 'bg-sky-50'
        }`}>
          <Wallet className={`w-6 h-6 ${
            isDarkMode ? 'text-sky-400' : 'text-sky-500'
          }`} />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Add to Cart
        </button>
        <button
          onClick={onPurchase}
          className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Make Offer
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Sale ends in</span>
          </div>
          <p className={`text-lg font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>24h 30m 50s</p>
        </div>
        <div className={`p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <Shield className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Authenticity</span>
          </div>
          <p className={`text-lg font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Verified</p>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="flex items-start space-x-2">
          <Info className={`w-5 h-5 mt-0.5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <div>
            <p className={`text-sm font-medium mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Purchase Protection</p>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Get full refund for items that don't arrive or match the description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};