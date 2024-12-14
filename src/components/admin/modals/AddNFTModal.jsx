
import React, { useState } from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { X, Image, Tag, DollarSign, User, Plus } from 'lucide-react';

export const AddNFTModal = ({ isOpen, onClose }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { addNFT } = useAdminStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    creator: '',
    image: '',
    category: 'art'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addNFT({
      ...formData,
      id: `nft-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active'
    });
    onClose();
    setFormData({
      name: '',
      description: '',
      price: '',
      creator: '',
      image: '',
      category: 'art'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-lg p-6 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-xl">
          <Image className="w-12 h-12 text-white" strokeWidth={1.5} />
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
          }`}>Add New NFT</h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Create a new NFT listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>NFT Name</label>
            <div className="relative">
              <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
                placeholder="Enter NFT name"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                  : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
              } focus:outline-none focus:ring-0 h-32 resize-none`}
              placeholder="Enter NFT description"
              required
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Price (ETH)</label>
            <div className="relative">
              <DollarSign className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="number"
                step="0.001"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
                placeholder="Enter price in ETH"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Creator</label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
                placeholder="Enter creator name"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Image URL</label>
            <div className="relative">
              <Image className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                    : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                } focus:outline-none focus:ring-0`}
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                  : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
              } focus:outline-none focus:ring-0`}
            >
              <option value="art">Art</option>
              <option value="collectibles">Collectibles</option>
              <option value="photography">Photography</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add NFT</span>
          </button>
        </form>
      </div>
    </div>
  );
};