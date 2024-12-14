import React, { useState } from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { Save } from 'lucide-react';

export const AdminSettings = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { settings, updateSettings } = useAdminStore();
  const [formData, setFormData] = useState({ ...settings });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Platform Settings</h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Configure marketplace settings and parameters
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h2 className={`text-xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>General Settings</h2>

          <div className="space-y-4">
            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Platform Fee (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.platformFee}
                onChange={(e) => setFormData({
                  ...formData,
                  platformFee: parseFloat(e.target.value)
                })}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Minimum Listing Price (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.minListingPrice}
                onChange={(e) => setFormData({
                  ...formData,
                  minListingPrice: parseFloat(e.target.value)
                })}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Maximum Listing Price (ETH)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.maxListingPrice}
                onChange={(e) => setFormData({
                  ...formData,
                  maxListingPrice: parseFloat(e.target.value)
                })}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Featured NFTs Count
              </label>
              <input
                type="number"
                value={formData.featuredNFTsCount}
                onChange={(e) => setFormData({
                  ...formData,
                  featuredNFTsCount: parseInt(e.target.value)
                })}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};