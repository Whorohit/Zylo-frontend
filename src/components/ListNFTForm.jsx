import React, { useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { Upload, X } from 'lucide-react';
import { uploadToIPFS } from '../utils/uploadipfs';
import { useDispatch } from 'react-redux';
import { listAsset } from '../store/etherslice';

export const ListNFTForm = () => {
  const dispatch = useDispatch();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    file: null,
    category: 'DigitalArt', // Default category
  });
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  // Category options matching the Solidity enum
  const categories = [
    'DigitalArt',
    'Illustrations',
    'Photography',
    'Music',
    'Gaming',
    'Collectibles',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0]; // Get type (image, video, audio)
      
      if (!['image', 'video', 'audio'].includes(fileType)) {
        alert('Only images, videos, and audio files are allowed.');
        return;
      }

      setFormData({ ...formData, file });
      setFileType(fileType);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.file) {
      alert("Please upload a file before submitting.");
      return;
    }
  
    try {
      const metadata = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
      };
  
      // Upload file & metadata in one flow
      const metadataURI = await uploadToIPFS(formData.file, metadata);
  
      // Dispatch the NFT listing
      await dispatch(listAsset({name:metadata.name,metadataURI, price: formData.price, category: formData.category }));
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Failed to upload to IPFS. Please try again.");
    }
  };
  
  const inputClass = `w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white placeholder-gray-500' 
      : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900 placeholder-gray-400'
  } focus:outline-none focus:ring-0`;

  return (
    <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>List Your NFT</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>NFT Name</label>
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
          <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`${inputClass} h-32 resize-none`}
            placeholder="Describe your NFT"
            required
          />
        </div>

        <div>
          <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Price (ETH)</label>
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

        {/* Category Selection */}
        <div>
          <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={inputClass}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* File Upload (Image, Video, Audio) */}
        <div>
          <label className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Upload File</label>
          <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {preview ? (
              <div className="relative">
                {fileType === 'image' && (
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                )}
                {fileType === 'video' && (
                  <video controls className="max-h-64 mx-auto rounded-lg">
                    <source src={preview} type={formData.file?.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {fileType === 'audio' && (
                  <audio controls className="w-full mt-4">
                    <source src={preview} type={formData.file?.type} />
                    Your browser does not support the audio tag.
                  </audio>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, file: null });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className={`w-12 h-12 mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <label className="cursor-pointer hover:text-sky-500">
                    Click to upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*,audio/*"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="text-sm mt-2">Images, Videos, or Audio (Max 10MB)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
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
