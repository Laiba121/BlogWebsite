import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  if (typeof window === 'undefined') return <Navigate to="/signin" replace />

  const token = localStorage.getItem('careerpulse_token')
  const stored = localStorage.getItem('careerpulse_user')
  const user = stored ? JSON.parse(stored) : null

  if (!token || !user || user.role !== 'admin') {
    localStorage.removeItem('careerpulse_token')
    localStorage.removeItem('careerpulse_user')
    return <Navigate to="/signin" replace />
  }

  return children
}
