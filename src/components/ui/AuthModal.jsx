import { useState } from 'react'
import { X, Mail, Lock, User, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AuthModal({ onClose }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, login, register, loginWithGoogle, resetPassword } = useAuth()

  const [mode, setMode] = useState('signin') // 'signin' | 'signup' | 'forgot'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await (loginWithGoogle || signInWithGoogle)()
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) { setError('Please fill all fields.'); return }
    if (mode === 'signup' && !form.name) { setError('Please enter your name.'); return }
    setLoading(true)
    try {
      if (mode === 'signup') {
        await (register || signUpWithEmail)(form.name, form.email, form.password)
      } else {
        await (login || signInWithEmail)(form.email, form.password)
      }
      onClose()
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') setError('This email is already registered. Sign in instead.')
      else if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') setError('Invalid email or password.')
      else if (e.code === 'auth/weak-password') setError('Password must be at least 6 characters.')
      else setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setError('')
    if (!form.email.trim()) { setError('Please enter your email address.'); return }
    setLoading(true)
    try {
      await resetPassword(form.email.trim())
      setResetSent(true)
    } catch (e) {
      if (e.code === 'auth/user-not-found') setError('No account found with this email.')
      else if (e.code === 'auth/invalid-email') setError('Please enter a valid email address.')
      else setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── FORGOT PASSWORD VIEW ──────────────────────────────────────────
  if (mode === 'forgot') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-mist w-full max-w-md p-10 shadow-2xl">
          <button onClick={onClose} className="absolute top-5 right-5 text-caramel/40 hover:text-espresso transition-colors">
            <X size={18} />
          </button>

          <button
            onClick={() => { setMode('signin'); setError(''); setResetSent(false) }}
            className="flex items-center gap-1.5 font-mono text-xs text-caramel/50 uppercase tracking-widest2 hover:text-espresso transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Sign In
          </button>

          <div className="mb-8">
            <p className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 mb-1">Password Reset</p>
            <div className="font-display text-3xl text-espresso italic">
              {resetSent ? 'Check your inbox.' : 'Forgot your password?'}
            </div>
          </div>

          {resetSent ? (
            <div className="border border-parchment bg-parchment/30 px-5 py-4">
              <p className="font-body text-sm text-espresso mb-1">
                Reset link sent to <span className="font-medium">{form.email}</span>
              </p>
              <p className="font-body text-xs text-caramel/60">
                Check your inbox (and spam folder). The link expires in 1 hour.
              </p>
              <button
                onClick={() => { setResetSent(false); setForm(prev => ({ ...prev, email: '' })) }}
                className="mt-4 font-mono text-xs text-caramel/50 uppercase tracking-widest2 hover:text-espresso transition-colors underline underline-offset-2"
              >
                Send to a different email
              </button>
            </div>
          ) : (
            <>
              <p className="font-body text-sm text-caramel/70 mb-6">
                Enter the email linked to your account and we'll send you a reset link.
              </p>

              <div className="mb-4">
                <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-caramel/40" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border border-parchment pl-10 pr-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 font-body text-xs text-red-600">
                  {error}
                </div>
              )}

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="btn-primary w-full text-center disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── SIGN IN / SIGN UP VIEW ────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-mist w-full max-w-md p-10 shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-caramel/40 hover:text-espresso transition-colors">
          <X size={18} />
        </button>

        <div className="mb-8">
          <div className="font-display text-3xl text-espresso mb-1 italic">
            {mode === 'signin' ? 'Welcome back.' : 'Join Kōhi.'}
          </div>
          <p className="font-body font-light text-sm text-caramel">
            {mode === 'signin' ? 'Sign in to your account to continue.' : 'Create an account to start shopping.'}
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-parchment px-4 py-3 font-body text-sm text-espresso hover:border-espresso transition-colors mb-6 disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-parchment" />
          <span className="font-mono text-xs text-caramel/40 uppercase tracking-widest2">or</span>
          <div className="flex-1 h-px bg-parchment" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-caramel/40" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Arjun Mehta"
                  className="w-full bg-transparent border border-parchment pl-10 pr-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-caramel/40" />
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="arjun@email.com"
                className="w-full bg-transparent border border-parchment pl-10 pr-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2">Password</label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); setResetSent(false) }}
                  className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 hover:text-espresso transition-colors underline underline-offset-2"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-caramel/40" />
              <input
                type="password"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder="Min. 6 characters"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                className="w-full bg-transparent border border-parchment pl-10 pr-4 py-3 font-body text-sm text-espresso placeholder-caramel/30 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 font-body text-xs text-red-600">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full text-center mt-6 disabled:opacity-50"
        >
          {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>

        <p className="text-center font-body text-sm text-caramel mt-6">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
            className="text-espresso underline underline-offset-2 hover:text-gold transition-colors"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}