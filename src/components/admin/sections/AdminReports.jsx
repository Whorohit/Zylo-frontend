import React from 'react';
import { useThemeStore } from '../../../store/useThemeStore';
import { useAdminStore } from '../../../store/useAdminStore';
import { AlertTriangle, CheckCircle, Search } from 'lucide-react';

export const AdminReports = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { reports, resolveReport } = useAdminStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Reports</h1>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Handle user reports and issues
        </p>
      </div>

      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search reports..."
              className={`pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-sky-500`}
            />
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 mt-1 ${
                    report.status === 'resolved'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`} />
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{report.type} Report</h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{report.item}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Reported by:</span>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{report.reporter}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'investigating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {report.status}
                  </span>
                  
                  {report.status !== 'resolved' && (
                    <button
                      onClick={() => resolveReport(report.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'hover:bg-gray-600 text-gray-300'
                          : 'hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};