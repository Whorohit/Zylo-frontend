import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import {
  Palette, Image, Camera, Music,
  Gamepad2, Trophy, Tag
} from 'lucide-react';

export const ExploreFilters = ({ activeFilter, onFilterChange }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const filters = [
    { id: -1, label: 'All Items', icon: Tag },
    { id: "DigitalArt", label: 'Digital Art', icon: Palette },
    { id: "Illustrations", label: 'Illustrations', icon: Image },
    { id: "Photography", label: 'Photography', icon: Camera },
    { id: "Music", label: 'Music', icon: Music },
    { id: "Gaming", label: 'Gaming', icon: Gamepad2 },
    { id: "Collectibles", label: 'Collectibles', icon: Trophy },
  ];

  return (
    <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Categories
      </h3>

      <div className="space-y-2">
        {filters.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeFilter == id
                ? isDarkMode
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'bg-sky-50 text-sky-600'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
