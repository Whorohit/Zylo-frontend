import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useDashboardStore } from '../../store/useDashboardStore';

export const UserBio = ({userProfile}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="mt-4">
      <p className={`text-sm ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {userProfile?.bio}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {userProfile?.keyword?.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-xs rounded-full ${
              isDarkMode
                ? 'bg-sky-500/10 text-sky-400'
                : 'bg-sky-50 text-sky-600'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};