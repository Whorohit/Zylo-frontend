
import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { MoreVertical, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';

export const AdminActions = ({ onEdit, onDelete, onToggleStatus, status }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [showActions, setShowActions] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowActions(!showActions)}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {showActions && (
        <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 z-10 ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <button
            onClick={() => {
              onEdit();
              setShowActions(false);
            }}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </button>

          <button
            onClick={() => {
              onToggleStatus();
              setShowActions(false);
            }}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {status === 'active' ? (
              <>
                <Ban className="w-4 h-4 mr-2 text-red-500" />
                Suspend
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Activate
              </>
            )}
          </button>

          <button
            onClick={() => {
              onDelete();
              setShowActions(false);
            }}
            className={`flex items-center w-full px-4 py-2 text-sm ${
              isDarkMode 
                ? 'text-red-400 hover:bg-gray-700' 
                : 'text-red-600 hover:bg-gray-50'
            }`}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
