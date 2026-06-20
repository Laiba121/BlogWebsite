import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Mail, Lock, User } from 'lucide-react'
import { signUp } from '../api'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const response = await signUp({ name, email, password })
      localStorage.setItem('careerpulse_token', response.token)
      localStorage.setItem('careerpulse_user', JSON.stringify(response.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account. Please retry.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-white grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="px-8 py-10 md:px-12 md:py-14">
          <div className="mb-8">
            <p className="text-sm text-slate-500">Already registered?</p>
            <Link to="/signin" className="text-primary-500 font-semibold hover:text-primary-700">
              Sign in instead
            </Link>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="name">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

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
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
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
                  placeholder="Choose a strong password"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat your password"
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
              className="w-full rounded-3xl bg-primary-500 px-5 py-3 text-white font-semibold shadow-lg shadow-primary-500/10 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <div className="bg-linear-to-br from-neutral-700 via-primary-500 to-primary-400 text-white px-10 py-12 md:px-14 md:py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="rounded-2xl bg-white/10 p-3">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-200/80">Create your access</p>
              <h1 className="text-3xl font-bold mt-2">Join CareerPulse</h1>
            </div>
          </div>

          <p className="text-slate-200/90 leading-7">
            Register with a secure account and start exploring articles, admin features, and personalized content right away.
          </p>

          <div className="mt-10 grid gap-4 text-sm text-slate-200/90">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="font-semibold">Data-driven onboarding</p>
              <p className="text-slate-200/70 mt-2">Your account is encrypted and ready for fast sign-in.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="font-semibold">Responsive design</p>
              <p className="text-slate-200/70 mt-2">Optimized for mobile and desktop screens.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
