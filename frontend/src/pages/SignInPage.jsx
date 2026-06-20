import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock } from 'lucide-react'
import { signIn } from '../api'

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await signIn({ email, password })
      localStorage.setItem('careerpulse_token', response.token)
      localStorage.setItem('careerpulse_user', JSON.stringify(response.user))
      // Redirect admins to admin dashboard
      if (response.user?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="bg-linear-to-br from-neutral-700 via-primary-500 to-primary-400 text-white px-10 py-12 md:px-14 md:py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="rounded-2xl bg-white/10 p-3">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-200/80">Welcome back</p>
              <h1 className="text-3xl font-bold mt-2">Sign in to CareerPulse</h1>
            </div>
          </div>

          <p className="text-slate-200/90 leading-7">
            Access your dashboard, manage your profile, and explore personalized articles. Sign in securely with your admin or user account.
          </p>

          <div className="mt-10 grid gap-4 text-sm text-slate-200/90">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="font-semibold">Admin login</p>
              <p className="text-slate-200/70 mt-2">Use the seeded admin account created in the backend seed script.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="font-semibold">Need an account?</p>
              <p className="text-slate-200/70 mt-2">Create one now with our responsive sign-up page.</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-14">
          <div className="mb-8">
            <p className="text-sm text-slate-500">Don’t have an account?</p>
            <Link to="/signup" className="text-primary-500 font-semibold hover:text-primary-700">
              Create account
            </Link>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-100 p-5 text-sm text-slate-600">
            <p className="font-semibold">Admin seed account</p>
            <p className="mt-2">Email: <strong>admin@careerpulse.com</strong></p>
            <p>Password: <strong>Admin@123</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}
