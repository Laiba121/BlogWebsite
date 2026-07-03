import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck } from 'lucide-react'
import { forgotPassword, googleSignIn, resendVerification, signIn } from '../api'

export default function SignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotDevLink, setForgotDevLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState('')
  const [resendCode, setResendCode] = useState('')
  const [googleReady, setGoogleReady] = useState(false)
  const [googleError, setGoogleError] = useState('')
  const googleButtonRef = useRef(null)

  useEffect(() => {
    const setupGoogle = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        return
      }
      if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        setGoogleError('Google sign-in is not configured.')
        return
      }
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            setError('')
            setNotice('')
            setLoading(true)
            const result = await googleSignIn(response.credential)
            localStorage.setItem('pharmacontext_token', result.token)
            localStorage.setItem('pharmacontext_user', JSON.stringify(result.user))
            if (result.user?.role === 'admin') {
              navigate('/admin')
            } else {
              navigate('/')
            }
          } catch (err) {
            setError(err.response?.data?.message || 'Unable to sign in with Google right now.')
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    setResendSuccess('')
    setLoading(true)

    try {
      const response = await signIn({ email, password })
      localStorage.setItem('pharmacontext_token', response.token)
      localStorage.setItem('pharmacontext_user', JSON.stringify(response.user))
      if (response.user?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      const status = err.response?.status
      if (status === 403 && email) {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`)
        return
      }
      setError(err.response?.data?.message || 'Unable to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setError('Enter your email before requesting a new verification code.')
      return
    }

    setError('')
    setResendSuccess('')
    setResendLoading(true)

    try {
      const response = await resendVerification(email)
      setResendSuccess(response.message || 'Verification code resent. Check your inbox.')
      setResendCode(response.devCode || '')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to resend verification code.')
    } finally {
      setResendLoading(false)
    }
  }

  const handleForgotPassword = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    setForgotDevLink('')
    setForgotLoading(true)

    try {
      const response = await forgotPassword(forgotEmail || email)
      setNotice(response.message || 'If a verified account exists for that email, a password reset link has been sent.')
      setForgotDevLink(response.devLink || '')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send password reset email right now.')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden bg-[#0f172a] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-500 via-teal-400 to-amber-300" />

          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </span>
              PharmaContext
            </Link>

            <div className="mt-16 max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">Welcome back</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
                Pick up your work with a pharma context.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Access your account, saved details, and tools through a focused sign-in experience.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-200" />
                <div>
                  <p className="font-semibold text-white">Fast return path</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Sign in once and continue from the right area of the app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-9 flex items-center justify-between gap-4">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 lg:hidden">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                PharmaContext
              </Link>
              <Link
                to={email ? `/signup?email=${encodeURIComponent(email)}` : '/signup'}
                className="ml-auto inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <LogIn className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Sign in</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Welcome back</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Use your PharmaContext account to continue.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotMode(true)
                      setForgotEmail(email)
                      setError('')
                      setNotice('')
                    }}
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 pr-12 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {resendSuccess && (
                <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
                  <p>{resendSuccess}</p>
                  {resendCode && (
                    <p className="mt-2 break-all text-slate-900">
                      Verification code: <span className="font-semibold">{resendCode}</span>
                    </p>
                  )}
                </div>
              )}

              {notice && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
                  <p>{notice}</p>
                  {forgotDevLink && (
                    <a href={forgotDevLink} className="mt-2 block break-all text-blue-700 underline">
                      Open local password reset link
                    </a>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {loading ? 'Signing in...' : 'Sign in'}
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
                  Loading Google sign in…
                </button>
              )}
              {googleError && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {googleError}
                </div>
              )}
            </div>

            {error && error.toLowerCase().includes('verified') && (
              <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p>If your account is not verified, you can resend the verification email below.</p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendLoading}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {resendLoading ? 'Resending…' : 'Resend verification email'}
                </button>
              </div>
            )}

            {forgotMode && (
              <form className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4" onSubmit={handleForgotPassword}>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="forgotEmail">
                  Send password reset email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="forgotEmail"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {forgotLoading ? 'Sending...' : 'Send reset link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForgotMode(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-600 transition hover:text-blue-700">
                Create one
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
