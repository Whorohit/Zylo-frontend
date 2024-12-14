import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { X, Save, Link as LinkIcon, Twitter, Globe, Github } from 'lucide-react';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { userProfile, updateBio, updateSocials, updateTags } = useDashboardStore();
  
  const [formData, setFormData] = useState({
    bio: userProfile.bio,
    socials: { ...userProfile.socials },
    tags: [...userProfile.tags]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBio(formData.bio);
    updateSocials(formData.socials);
    updateTags(formData.tags);
    onClose();
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData({ ...formData, tags });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`relative w-full max-w-lg p-6 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-2 rounded-full transition-colors ${
            isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                  : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
              } focus:outline-none focus:ring-0 h-32 resize-none`}
            />
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Social Links
            </label>
            <div className="space-y-3">
              {[
                { key: 'twitter', icon: Twitter, label: 'Twitter' },
                { key: 'website', icon: Globe, label: 'Website' },
                { key: 'github', icon: Github, label: 'Github' }
              ].map(({ key, icon: Icon, label }) => (
                <div key={key} className="relative">
                  <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="url"
                    value={formData.socials[key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, [key]: e.target.value }
                    })}
                    placeholder={`${label} URL`}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                        : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
                    } focus:outline-none focus:ring-0`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={`block mb-2 text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={handleTagChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 focus:border-sky-500 text-white' 
                  : 'bg-white border-gray-200 focus:border-sky-500 text-gray-900'
              } focus:outline-none focus:ring-0`}
            />
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
    </div>
  );
};