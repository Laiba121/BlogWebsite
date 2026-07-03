import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'
import { resetPassword } from '../api'

export default function ResetPasswordPage() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const response = await resetPassword({ token, password })
      setSuccess(response.message || 'Password updated. You can now sign in.')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            PharmaContext
          </Link>

          <div className="mt-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Lock className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Reset password</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Choose a new password</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Enter a new password for your verified PharmaContext account.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                New password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="confirmPassword">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {loading ? 'Updating...' : 'Update password'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Remembered your password?{' '}
            <Link to="/signin" className="font-semibold text-blue-600 transition hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
