import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { settings } = useSiteSettings()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('pharmacontext_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        console.error('Unable to parse stored user', error)
      }
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('pharmacontext_token')
    localStorage.removeItem('pharmacontext_user')
    setUser(null)
    setMenuOpen(false)
    navigate('/signin')
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="flex items-center h-14 px-8 gap-8">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 text-[#1e3a8a] font-bold text-[16px] tracking-tight shrink-0">
          <div className="flex items-center gap-2">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.siteName} className="h-8 w-auto rounded object-contain" />
            ) : (
              <svg className="text-blue-600" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
                <circle cx="18" cy="18" r="3" />
                <path d="m22 22-1.5-1.5" />
              </svg>
            )}
            <span>{settings.siteName}</span>
          </div>
        </Link>

        {/* ── Nav Links ── */}
        <ul className="flex items-center gap-7 ml-1">
          {[
            { label: 'Directory', to: '/' },
            { label: 'Categories', to: '/categories' },
            { label: 'Editorial', to: '/editorial' },
            { label: 'FAQs', to: '/faqs' },
          ].map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `text-[13.5px] font-medium pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'text-blue-600 border-blue-600'
                      : 'text-slate-500 border-transparent hover:text-slate-800'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right Side ── */}
        <div className="ml-auto flex items-center gap-2.5">

          {/* Mini Search */}
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-slate-400 text-[12.5px] cursor-pointer min-w-[176px] hover:border-blue-300 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Search medicines...
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-md text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            {darkMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-md text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>

          {/* Sign In / Profile */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-blue-300"
                aria-label="Open account menu"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name || 'Profile'} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Signed in as</p>
                  <p className="mt-2 truncate text-sm font-semibold text-slate-900">{user.name || user.email}</p>
                  <p className="text-xs text-slate-500">{user.role}</p>
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    {user.role === 'admin' ? (
                      <Link
                        to="/admin/profile"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                      >
                        Admin profile
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 w-full rounded-lg bg-slate-900 px-3 py-2 text-left text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium px-4 py-1.5 rounded-md transition-colors">
              Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}
