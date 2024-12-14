import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useDashboardStore } from '../../store/useDashboardStore';
import { Twitter, Globe, Github } from 'lucide-react';

export const UserSocials = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { userProfile } = useDashboardStore();

  const socials = [
    { icon: Twitter, label: 'Twitter', link: userProfile.socials.twitter || 'https://twitter.com' },
    { icon: Globe, label: 'Website', link: userProfile.socials.website || 'https://example.com' },
    { icon: Github, label: 'Github', link: userProfile.socials.github || 'https://github.com' },
  ];

  return (
    <div className="flex items-center space-x-4 mt-4">
      {socials.map(({ icon: Icon, label, link }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};