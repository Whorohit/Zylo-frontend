```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';

export const FooterLinks = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  
  const links = [
    { label: 'About', to: '/about' },
    { label: 'Terms', to: '/terms' },
    { label: 'Privacy', to: '/privacy' },
    { label: 'Help', to: '/help' },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {links.map(({ label, to }) => (
        <Link
          key={to}
          to={to}
          className={`text-sm transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
```