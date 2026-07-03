import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  List,
  MessageSquare,
  Megaphone,
  Settings,
  LogOut,
  HelpCircle,
  Menu,
  X,
  Plus
} from 'lucide-react';

function LogoutButton() {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem('pharmacontext_token')
    localStorage.removeItem('pharmacontext_user')
    navigate('/signin')
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
      style={{ color: '#94a3b8', background: 'transparent' }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <LogOut size={18} />
      Logout
    </button>
  )
}

export default function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Pill,            label: 'Medicines',  path: '/admin/medicines' },
    { icon: List,            label: 'Categories', path: '/admin/categories' },
    { icon: MessageSquare,   label: 'Converts',   path: '/admin/converts' },
    { icon: Megaphone,       label: 'Ads',        path: '/admin/ads' },
    { icon: Settings,        label: 'Settings',   path: '/admin/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const stored = typeof window !== 'undefined' ? localStorage.getItem('pharmacontext_user') : null;
  const currentUser = user || (stored ? JSON.parse(stored) : null);
  const avatarSrc = currentUser?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'Admin')}&background=1d4ed8&color=fff`;

  return (
    <>
      {/* Mobile toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-blue-700 text-white p-2 rounded-lg shadow"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 flex flex-col z-40 transition-transform duration-300 shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ background: '#0f172a' }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 lg:hidden bg-white/10 text-white p-2 rounded-lg transition-colors hover:bg-white/15"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>

        {/* Profile header */}
        <Link
          to="/admin/profile"
          onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
          className="px-5 pb-5 pt-16 lg:pt-6 flex flex-col items-center text-center gap-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0" style={{ background: '#1d4ed8' }}>
            <img src={avatarSrc} alt="admin" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-tight">
              {currentUser?.name || 'Admin User'}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>System Administrator</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? 'text-white border-l-[3px] border-blue-400 pl-2.5'
                    : 'hover:text-white'
                  }`}
                style={{
                  background: active ? 'rgba(30,64,175,0.35)' : 'transparent',
                  color: active ? '#fff' : '#94a3b8',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Help link */}
        <div
          className="flex items-center gap-3 px-5 py-2.5 text-sm cursor-pointer"
          style={{ color: '#64748b' }}
        >
          <HelpCircle size={18} />
          <span>Help</span>
        </div>

        {/* Footer */}
        <div className="px-3 pb-4 pt-2 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ background: '#1d4ed8' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1e40af'}
            onMouseLeave={e => e.currentTarget.style.background = '#1d4ed8'}
          >
            <Plus size={18} />
            Add New Medicine
          </button>

          <LogoutButton />
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
