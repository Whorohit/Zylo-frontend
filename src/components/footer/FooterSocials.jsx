
import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { Twitter, Github, Linkedin } from 'lucide-react';

export const FooterSocials = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  const socials = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <div className="flex items-center space-x-4">
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};
