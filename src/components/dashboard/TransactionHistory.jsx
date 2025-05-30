import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useSelector } from 'react-redux';

export const TransactionHistory = ({ transactions }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const user=useSelector((state)=>state.user)
 
  return (
    <div className={`rounded-xl ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    } shadow-lg overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <tr>
              <th className={`px-6 py-4 text-left text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Date</th>
              <th className={`px-6 py-4 text-left text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Type</th>
              <th className={`px-6 py-4 text-left text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>NFT</th>
              <th className={`px-6 py-4 text-left text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Price</th>
              <th className={`px-6 py-4 text-left text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <tr key={index} className={isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                <td className={`px-6 py-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}>{transaction.date}</td>
                <td className={`px-6 py-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}>{transaction.type}</td>
                <td className={`px-6 py-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}>{transaction.nft}</td>
                <td className={`px-6 py-4 text-sm ${
                  isDarkMode ? 'text-sky-400' : 'text-sky-600'
                } font-medium`}>{transaction.price}</td>
                <td className={`px-6 py-4 text-sm`}>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'Active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};