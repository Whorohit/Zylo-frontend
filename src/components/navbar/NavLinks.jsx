import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import { Compass, PlusCircle, LayoutGrid } from 'lucide-react';

export const NavLinks = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const location = useLocation();

  const links = [
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/create', label: 'Create', icon: PlusCircle },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  ];

  return (
    <nav className="flex items-center space-x-1">
      {links.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              isActive
                ? isDarkMode
                  ? 'bg-sky-500/10 text-sky-400'
                  : 'bg-sky-50 text-sky-600'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};