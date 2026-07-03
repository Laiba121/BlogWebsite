import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  if (typeof window === 'undefined') return <Navigate to="/signin" replace />

  const token = localStorage.getItem('pharmacontext_token')
  const stored = localStorage.getItem('pharmacontext_user')
  const user = stored ? JSON.parse(stored) : null

  if (!token || !user || user.role !== 'admin') {
    localStorage.removeItem('pharmacontext_token')
    localStorage.removeItem('pharmacontext_user')
    return <Navigate to="/signin" replace />
  }

  return children
}
