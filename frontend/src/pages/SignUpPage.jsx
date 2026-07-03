import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck, User, UserPlus } from 'lucide-react'
import { googleSignUp, signUp } from '../api'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [googleReady, setGoogleReady] = useState(false)
  const [googleError, setGoogleError] = useState('')
  const googleButtonRef = useRef(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const prefillEmail = searchParams.get('email')
    if (prefillEmail) {
      setEmail(prefillEmail)
    }

    const setupGoogle = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        return
      }
      if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        setGoogleError('Google sign-up is not configured.')
        return
      }
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            setError('')
            setSuccess('')
            setLoading(true)
            const result = await googleSignUp(response.credential)
            localStorage.setItem('pharmacontext_token', result.token)
            localStorage.setItem('pharmacontext_user', JSON.stringify(result.user))
            if (result.user?.role === 'admin') {
              navigate('/admin')
            } else {
              navigate('/')
            }
          } catch (err) {
            setError(err.response?.data?.message || 'Unable to sign up with Google right now.')
          } finally {
            setLoading(false)
          }
        },
      })
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
      })
      setGoogleReady(true)
    }

    if (window.google?.accounts?.id) {
      setupGoogle()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = setupGoogle
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [navigate])

  const passwordChecks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: '1 uppercase letter', valid: /[A-Z]/.test(password) },
    { label: '1 number', valid: /[0-9]/.test(password) },
    { label: '1 special character', valid: /[^A-Za-z0-9]/.test(password) },
  ]
  const passwordsMatch = password && confirmPassword && password === confirmPassword

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!passwordsMatch) {
      setError('Passwords do not match.')
      return
    }

    if (!passwordChecks.every((check) => check.valid)) {
      setError('Choose a stronger password before continuing.')
      return
    }

    setLoading(true)
    try {
      await signUp({ name, email, password })
      navigate(`/verify-email?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account. Please retry.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[1.05fr_0.95fr]">
        <main className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-9 flex items-center justify-between gap-4">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 lg:hidden">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                PharmaContext
              </Link>
              <Link to="/signin" className="ml-auto inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <UserPlus className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Create account</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Start with PharmaContext</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Set up your account and jump into the app in a few seconds.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Choose a strong password"
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 pr-12 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Password strength</p>
                  <div className="mt-3 space-y-2">
                    {passwordChecks.map((check) => (
                      <div key={check.label} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${check.valid ? 'border-teal-500 bg-teal-500 text-white' : 'border-slate-300 text-slate-400'}`}>
                          {check.valid ? '✓' : ''}
                        </span>
                        <span className={check.valid ? 'text-slate-900' : 'text-slate-500'}>{check.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repeat your password"
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 pr-12 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword && (
                  <p className={`mt-2 text-sm ${passwordsMatch ? 'text-teal-700' : 'text-red-600'}`}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
                  <p>{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {loading ? 'Creating account...' : 'Create account'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="h-px flex-1 bg-slate-200" />
                <span>or continue with</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div ref={googleButtonRef} className="w-full" />
              {!googleReady && !googleError && (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
                >
                  Loading Google sign up…
                </button>
              )}
              {googleError && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {googleError}
                </div>
              )}
            </div>

            <p className="mt-7 text-center text-sm text-slate-500">
              Already registered?{' '}
              <Link to="/signin" className="font-semibold text-blue-600 transition hover:text-blue-700">
                Sign in instead
              </Link>
            </p>
          </div>
        </main>

        <section className="relative hidden bg-[#10251f] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-teal-400 via-blue-500 to-amber-300" />

          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-teal-700">
                <ShieldCheck className="h-5 w-5" />
              </span>
              PharmaContext
            </Link>

            <div className="mt-16 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">New account</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
                A cleaner place to manage your momentum.
              </h1>
              <p className="mt-5 text-base leading-7 text-emerald-50/80">
                Create your profile and get a personalized entry point into the PharmaContext workspace.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-300" />
                <div>
                  <p className="font-semibold text-white">Account-ready profile</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                    Your new account is saved and signed in as soon as registration succeeds.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-200" />
                <div>
                  <p className="font-semibold text-white">Responsive by default</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                    The form stays compact on desktop and easy to scan on smaller screens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
