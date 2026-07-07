import { Bell, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlertMenu, setShowAlertMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const stored = typeof window !== 'undefined' ? localStorage.getItem('pharmacontext_user') : null;
  const currentUser = stored ? JSON.parse(stored) : null;
  const avatarSrc = currentUser?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'Admin User')}&background=1d4ed8&color=fff`;

  function handleLogout() {
    localStorage.removeItem('pharmacontext_token');
    localStorage.removeItem('pharmacontext_user');
    setShowProfile(false);
    navigate('/signin');
  }

  return (
    <div
      className="fixed top-0 right-0 z-40 flex items-center h-14 px-5 gap-4 bg-white"
      style={{
        left: '256px',   /* matches sidebar w-64 = 16rem = 256px */
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      {/* Left: workspace title */}
      <div className="hidden lg:block shrink-0">
        <p className="text-xs font-semibold text-gray-900 leading-tight">Admin Workspace</p>
        <p className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>System Administration</p>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-xs mx-2">
        <Search
          size={15}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#94a3b8' }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search data, reports, things..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg outline-none"
          style={{
            background: '#f1f5f9',
            border: 'none',
            color: '#1e293b',
          }}
        />
        {searchQuery.trim() ? (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-lg">
            Showing results for <span className="font-semibold text-gray-900">{searchQuery}</span>
          </div>
        ) : null}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2.5 ml-auto">

        {/* Alert View badge */}
        <div className="relative">
          <button
            onClick={() => setShowAlertMenu((current) => !current)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              background: '#eff6ff',
              color: '#1d4ed8',
              border: '1px solid #bfdbfe',
            }}
          >
            <span>Alert View</span>
            <ChevronDown size={13} />
          </button>
          {showAlertMenu ? (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 text-xs text-gray-600 shadow-lg">
              <p className="rounded px-2 py-2 font-semibold text-gray-900">3 new alerts</p>
              <p className="rounded px-2 py-2 hover:bg-gray-50">Pending approvals</p>
              <p className="rounded px-2 py-2 hover:bg-gray-50">Imported medicine sync</p>
            </div>
          ) : null}
        </div>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((current) => !current)}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-gray-100"
            style={{ color: '#64748b' }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: '#ef4444', border: '1.5px solid #fff' }}
            />
          </button>
          {showNotifications ? (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-2 text-xs text-gray-600 shadow-lg">
              <p className="rounded px-2 py-2 font-semibold text-gray-900">Notifications</p>
              <p className="rounded px-2 py-2 hover:bg-gray-50">1 medicine imported</p>
              <p className="rounded px-2 py-2 hover:bg-gray-50">2 users signed up</p>
            </div>
          ) : null}
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors hover:bg-gray-100"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ background: '#1d4ed8' }}>
              <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:inline text-xs font-medium text-gray-700">
              {currentUser?.name || 'Admin User'}
            </span>
            <ChevronDown size={14} style={{ color: '#94a3b8' }} />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 mt-1.5 w-48 rounded-xl overflow-hidden z-50"
              style={{
                background: '#fff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <p className="text-sm font-semibold text-gray-900">{currentUser?.name || 'Admin User'}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
                  {currentUser?.email || 'admin@pharmacontext.com'}
                </p>
              </div>
              <div className="p-1.5">
                <button onClick={() => { setShowProfile(false); navigate('/admin/profile') }} className="w-full text-left px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
