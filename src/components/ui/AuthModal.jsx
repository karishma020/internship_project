import { useState } from 'react'
import { X, Mail, Lock, User, Chrome } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AuthModal({ onClose }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
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
        await signUpWithEmail(form.email, form.password, form.name)
      } else {
        await signInWithEmail(form.email, form.password)
      }
      onClose()
    } catch (e) {
      // Firebase error messages are verbose — simplify them
      if (e.code === 'auth/email-already-in-use') setError('This email is already registered. Sign in instead.')
      else if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') setError('Invalid email or password.')
      else if (e.code === 'auth/weak-password') setError('Password must be at least 6 characters.')
      else setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-mist w-full max-w-md p-10 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-caramel/40 hover:text-espresso transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="font-display text-3xl text-espresso mb-1 italic">
            {mode === 'signin' ? 'Welcome back.' : 'Join Kōhi.'}
          </div>
          <p className="font-body font-light text-sm text-caramel">
            {mode === 'signin'
              ? 'Sign in to your account to continue.'
              : 'Create an account to start shopping.'}
          </p>
        </div>

        {/* Google button */}
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
              <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">
                Full Name
              </label>
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
            <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">
              Email
            </label>
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
            <label className="font-mono text-xs text-caramel/50 uppercase tracking-widest2 block mb-2">
              Password
            </label>
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

        {/* Error */}
        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 font-body text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary w-full text-center mt-6 disabled:opacity-50"
        >
          {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>

        {/* Toggle */}
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