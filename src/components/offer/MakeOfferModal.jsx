import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { X, AlertCircle, Wallet, Clock, ArrowRight } from 'lucide-react';
import { OfferForm } from './OfferForm';
import { OfferTerms } from './OfferTerms';

export const MakeOfferModal = ({ isOpen, onClose, nft }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [offerAmount, setOfferAmount] = useState('');
  const [expiryDays, setExpiryDays] = useState(7);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle offer submission
    console.log('Offer submitted:', { offerAmount, expiryDays, nft });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-lg p-6 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-xl">
          <Wallet className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mt-8 mb-6 text-center">
          <h2 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Make an Offer
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Place your bid for {nft.name}
          </p>
        </div>

        <div className={`p-4 rounded-xl mb-6 flex items-start space-x-3 ${
          isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-50'
        }`}>
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div>
            <p className={`text-sm ${
              isDarkMode ? 'text-yellow-200' : 'text-yellow-700'
            }`}>
              Please ensure your wallet has sufficient funds. Your offer will be binding and cannot be withdrawn once accepted.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <OfferForm
            offerAmount={offerAmount}
            setOfferAmount={setOfferAmount}
            expiryDays={expiryDays}
            setExpiryDays={setExpiryDays}
            nft={nft}
          />

          <OfferTerms />

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Clock className="w-5 h-5" />
            <span>Make Offer</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};