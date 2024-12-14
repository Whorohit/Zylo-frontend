import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';
import { useAdminStore } from '../../store/useAdminStore';
import { 
  LayoutDashboard, Users, Tag, AlertTriangle,
  Settings, Activity, LogOut
} from 'lucide-react';

export const AdminSidebar = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { activeSection, setActiveSection } = useAdminStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'nfts', label: 'NFTs', icon: Tag },
    { id: 'reports', label: 'Reports', icon: AlertTriangle },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`w-64 min-h-screen fixed left-0 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } border-r ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="p-6">
        <h2 className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Admin Panel</h2>
      </div>

      <nav className="px-4 space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeSection === id
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

        <button
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mt-8 ${
            isDarkMode
              ? 'text-red-400 hover:bg-red-500/10'
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </nav>
    </div>
  );
};