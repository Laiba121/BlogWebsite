import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { getAdminProfile } from '../../api'

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('pharmacontext_token')
    if (!token) return

    let mounted = true
    getAdminProfile(token)
      .then(u => {
        if (!mounted) return
        setUser(u)
        localStorage.setItem('pharmacontext_user', JSON.stringify(u))
      })
      .catch(() => {
        // ignore
      })

    return () => { mounted = false }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <Topbar user={user} />

      {/* Main Content */}
      <main className="lg:ml-64 mt-16 p-4 lg:p-8">
        {children}
      </main>
    </div>
  )
}
