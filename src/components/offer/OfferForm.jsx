import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Wallet, Clock } from 'lucide-react';

export const OfferForm = ({ 
  offerAmount, 
  setOfferAmount, 
  expiryDays, 
  setExpiryDays,
  nft 
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const expiryOptions = [
    { value: 1, label: '1 day' },
    { value: 3, label: '3 days' },
    { value: 7, label: '7 days' },
    { value: 14, label: '14 days' },
    { value: 30, label: '30 days' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className={`block mb-2 text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Your Offer
        </label>
        <div className="relative">
          <Wallet className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="number"
            step="0.001"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            placeholder="Enter amount in ETH"
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white placeholder-gray-500' 
                : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900 placeholder-gray-400'
            } focus:outline-none focus:ring-0`}
            required
          />
        </div>
        <p className={`mt-2 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Floor Price: {nft.price} ETH
        </p>
      </div>

      <div>
        <label className={`block mb-2 text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Offer Expiration
        </label>
        <div className="relative">
          <Clock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <select
            value={expiryDays}
            onChange={(e) => setExpiryDays(Number(e.target.value))}
            className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
            } focus:outline-none focus:ring-0`}
          >
            {expiryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="flex justify-between mb-2">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            Your Offer
          </span>
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {offerAmount || '0'} ETH
          </span>
        </div>
        <div className="flex justify-between">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            Service Fee (2.5%)
          </span>
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {offerAmount ? (Number(offerAmount) * 0.025).toFixed(3) : '0'} ETH
          </span>
        </div>
        <div className="flex justify-between pt-2 mt-2 border-t border-gray-700">
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Total</span>
          <span className={`font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {offerAmount ? (Number(offerAmount) * 1.025).toFixed(3) : '0'} ETH
          </span>
        </div>
      </div>
    </div>
  );
};