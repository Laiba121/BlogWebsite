import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Mail, RefreshCw, ShieldCheck, XCircle } from 'lucide-react'
import { resendVerification, verifyEmail } from '../api'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const { token } = useParams()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [codeDigits, setCodeDigits] = useState(Array(6).fill(''))
  const digitRefs = useRef([])
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('Enter the 6-digit code sent to your inbox.')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [resendCode, setResendCode] = useState('')

  useEffect(() => {
    const prefillEmail = searchParams.get('email')
    if (prefillEmail) {
      setEmail(prefillEmail)
    }

    if (token) {
      setMessage('This verification link is no longer supported. Enter the code from your email instead.')
    }
  }, [searchParams, token])

  const handleDigitChange = (value, index) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1)
    setCodeDigits((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    if (digit && digitRefs.current[index + 1]) {
      digitRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (event) => {
    const paste = event.clipboardData.getData('text').trim().replace(/\D/g, '')
    if (!paste) return
    const digits = paste.slice(0, 6).split('')
    setCodeDigits((prev) => {
      const next = [...prev]
      digits.forEach((digit, idx) => {
        next[idx] = digit
      })
      return next
    })
    const lastIndex = Math.min(digits.length, 6) - 1
    if (digitRefs.current[lastIndex + 1]) {
      digitRefs.current[lastIndex + 1].focus()
    }
    event.preventDefault()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setResendMessage('')
    setResendCode('')
    setStatus('loading')

    const code = codeDigits.join('')
    if (!email || code.length !== 6) {
      setError('Please enter the 6-digit verification code.')
      setStatus('error')
      return
    }

    try {
      const response = await verifyEmail({ email, code })
      if (response.token && response.user) {
        localStorage.setItem('pharmacontext_token', response.token)
        localStorage.setItem('pharmacontext_user', JSON.stringify(response.user))
      }
      setStatus('success')
      setSuccess(response.message || 'Email verified.')
      setMessage('Verification complete. Redirecting to homepage...')
      setTimeout(() => navigate('/'), 600)
    } catch (err) {
      const statusCode = err.response?.status
      setStatus('error')
      setError(
        statusCode === 410
          ? err.response?.data?.message || 'Verification code has expired.'
          : err.response?.data?.message || 'Verification code is invalid.'
      )
      if (statusCode === 410) {
        setMessage('Your verification code has expired. Request a new one below.')
      }
    }
  }

  const handleResend = async () => {
    setError('')
    setResendMessage('')
    setResendCode('')
    setResendLoading(true)

    try {
      const response = await resendVerification(email)
      setResendMessage(response.message || 'A new verification code has been sent.')
      setResendCode(response.devCode || '')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to resend verification code.')
    } finally {
      setResendLoading(false)
    }
  }

  const Icon = status === 'loading' ? Loader2 : status === 'success' ? CheckCircle2 : XCircle

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
          <div className="mb-8 flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              PharmaContext
            </Link>
          </div>

          <div className="grid gap-6">
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-lg ${
              status === 'success' ? 'bg-teal-50 text-teal-700' : status === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
            }`}>
              <Icon className={`h-7 w-7 ${status === 'loading' ? 'animate-spin' : ''}`} />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">Email verification</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!email && (
                <div>
                  <label htmlFor="verify-email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      id="verify-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-200 bg-white px-11 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              )}

              <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Verification code
              </label>
              <div className="grid grid-cols-6 gap-3">
                {codeDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (digitRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(e.target.value, index)}
                    onPaste={handlePaste}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && index > 0) {
                        digitRefs.current[index - 1]?.focus()
                      }
                    }}
                    className="h-14 w-full rounded-xl border border-slate-200 bg-white text-center text-2xl font-semibold text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                ))}
              </div>
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
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {status === 'loading' ? 'Verifying…' : 'Verify email'}
              </button>
            </form>

            {email && (
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Need a new code?</p>
                    <p className="text-sm text-slate-600">Resend a fresh verification code to the email above.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {resendLoading ? 'Sending…' : 'Resend code'}
                  </button>
                </div>
                {resendMessage && <p className="text-sm text-teal-700">{resendMessage}</p>}
                {resendCode && (
                  <p className="text-sm text-slate-900">
                    Verification code: <span className="font-semibold">{resendCode}</span>
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/signin" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Back to sign in
              </Link>
              <Link to="/signup" className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Create account again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
