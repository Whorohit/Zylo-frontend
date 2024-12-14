import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { History } from 'lucide-react';

export const AdminTransactions = ({ transactions }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg animate-fade-in-up delay-300`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-sky-50'
        }`}>
          <History className={`w-5 h-5 ${
            isDarkMode ? 'text-sky-400' : 'text-sky-500'
          }`} />
        </div>
        <div>
          <h3 className={`font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Recent Transactions</h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>Latest marketplace activity</p>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{transaction.type}</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{transaction.nft}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  isDarkMode ? 'text-sky-400' : 'text-sky-600'
                }`}>{transaction.price}</p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{transaction.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};