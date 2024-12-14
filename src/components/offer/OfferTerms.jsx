import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { CheckCircle } from 'lucide-react';

export const OfferTerms = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const terms = [
    'Your offer is binding and cannot be withdrawn once accepted',
    'The offer will expire automatically after the selected duration',
    'You must have sufficient funds in your wallet',
  ];

  return (
    <div className={`mt-6 pt-6 border-t ${
      isDarkMode ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <h4 className={`text-sm font-medium mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        By making an offer, you agree to:
      </h4>
      <div className="space-y-3">
        {terms.map((term, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className={`w-5 h-5 mt-0.5 ${
              isDarkMode ? 'text-sky-400' : 'text-sky-500'
            }`} />
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {term}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};