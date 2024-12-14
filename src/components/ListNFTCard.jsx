import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { Upload, X, Plus } from 'lucide-react';

export const ListNFTCard = ({ onSubmit }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', description: '', price: '', image: null });
    setPreview(null);
  };

  return (
    <div className={`rounded-2xl ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    } shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl`}>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className={`block mb-2 text-sm font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Upload Image</label>
          <div className={`border-2 border-dashed rounded-xl ${
            preview ? '' : 'p-8'
          } text-center ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, image: null });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className={`w-10 h-10 mx-auto mb-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <label className="cursor-pointer hover:text-sky-500 transition-colors">
                    Click to upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block mb-1.5 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>NFT Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
              placeholder="Enter NFT name"
              required
            />
          </div>

          <div>
            <label className={`block mb-1.5 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-sky-500/50 h-24 resize-none`}
              placeholder="Describe your NFT"
              required
            />
          </div>

          <div>
            <label className={`block mb-1.5 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Price (ETH)</label>
            <input
              type="number"
              step="0.001"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
              placeholder="Set your price"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>List NFT</span>
        </button>
      </form>
    </div>
  );
};