import React, { useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Mail } from 'lucide-react';
import { UserStats } from './UserStats';
import { UserBio } from './UserBio';
import { UserSocials } from './UserSocials';
import { EditProfileModal } from './EditProfileModal';
import { ShareButton } from './ShareButton';

export const UserProfile = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { user } = useAuthStore();
  const { shareProfile } = useDashboardStore();
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <>
      <div className={`p-6 rounded-2xl ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-white'
      } shadow-lg`}>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden">
              <img
                src={user?.picture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
                alt={user?.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{user?.name || 'Anonymous User'}</h2>
                <div className="flex items-center space-x-2">
                  <Mail className={`w-4 h-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{user?.email || 'No email provided'}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Edit Profile
                </button>
                <ShareButton onClick={shareProfile} />
              </div>
            </div>

            <UserBio />
            <UserSocials />
          </div>
        </div>

        <UserStats />
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </>
  );
};