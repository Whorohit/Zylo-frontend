import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { Upload, X } from 'lucide-react';

export const ListNFTForm = () => {
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
    // Handle NFT listing submission
    console.log('Listing NFT:', formData);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white placeholder-gray-500' 
      : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900 placeholder-gray-400'
  } focus:outline-none focus:ring-0`;

  return (
    <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    }`}>
      <h2 className={`text-3xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>List Your NFT</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block mb-2 font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>NFT Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="Enter NFT name"
            required
          />
        </div>

        <div>
          <label className={`block mb-2 font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`${inputClass} h-32 resize-none`}
            placeholder="Describe your NFT"
            required
          />
        </div>

        <div>
          <label className={`block mb-2 font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Price (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className={inputClass}
            placeholder="Set your price"
            required
          />
        </div>

        <div>
          <label className={`block mb-2 font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Upload Image</label>
          <div className={`border-2 border-dashed rounded-xl p-8 text-center ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, image: null });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className={`w-12 h-12 mx-auto ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <label className="cursor-pointer hover:text-sky-500">
                    Click to upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                  <p className="text-sm mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-white font-medium text-lg transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700' 
              : 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600'
          } shadow-lg hover:shadow-xl`}
        >
          List NFT
        </button>
      </form>
    </div>
  );
};