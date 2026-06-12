import { Bell, User, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Topbar() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 lg:left-64">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section - Title */}
        <div className="hidden lg:block">
          <h2 className="text-sm font-semibold text-gray-900">Admin Workspace</h2>
          <p className="text-xs text-gray-500">System Administration</p>
        </div>

        {/* Middle Section - Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search data, reports, things..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-4">
          {/* Alert Badge */}
          <button className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-blue-200 transition-colors">
            <span>Alert View</span>
            <ChevronDown size={16} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin User</span>
              <ChevronDown size={16} className="text-gray-600" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">admin@pharmacontest.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
