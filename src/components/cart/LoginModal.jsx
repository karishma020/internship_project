// src/components/cart/LoginModal.jsx
import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal({ onClose }) {
  const { login, register, loginWithGoogle } = useAuth()
  const [tab, setTab]           = useState('signin') // 'signin' | 'register'
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password || (tab === 'register' && !name)) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      if (tab === 'signin') {
        await login(email, password)
      } else {
        await register(name, email, password)
      }
      onClose()
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setError('')
    try {
      await loginWithGoogle()
      onClose()
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  function friendlyError(code) {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential': return 'Incorrect email or password.'
      case 'auth/email-already-in-use': return 'An account with this email already exists.'
      case 'auth/weak-password': return 'Password must be at least 6 characters.'
      case 'auth/invalid-email': return 'Please enter a valid email address.'
      case 'auth/popup-closed-by-user': return 'Google sign-in was cancelled.'
      default: return 'Something went wrong. Please try again.'
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso/40 backdrop-blur-sm px-4">
      <div className="bg-mist w-full max-w-md border border-parchment shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-parchment">
          <div>
            <div className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 mb-1">
              {tab === 'signin' ? 'Welcome back' : 'Join Kōhi'}
            </div>
            <h2 className="font-display text-2xl text-espresso italic">
              {tab === 'signin' ? 'Sign in to Kōhi' : 'Create your account'}
            </h2>
          </div>
          <button onClick={onClose} className="text-caramel hover:text-espresso transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-parchment">
          {['signin', 'register'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError('') }}
              className={`flex-1 py-3 font-mono text-xs uppercase tracking-widest2 transition-colors ${
                tab === t ? 'text-espresso border-b-2 border-espresso' : 'text-caramel/50 hover:text-caramel'
              }`}
            >
              {t === 'signin' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">
          {tab === 'register' && (
            <div>
              <label className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 block mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Arjun Mehta"
                className="w-full bg-cream border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/40 focus:outline-none focus:border-caramel transition-colors"
              />
            </div>
          )}
          <div>
            <label className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-cream border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/40 focus:outline-none focus:border-caramel transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-cream border border-parchment px-4 py-3 font-body text-sm text-espresso placeholder-caramel/40 focus:outline-none focus:border-caramel transition-colors"
            />
          </div>

          {error && <p className="font-body text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait…' : tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-parchment" />
            <span className="font-mono text-xs text-caramel/40 uppercase tracking-widest2">or</span>
            <div className="flex-1 h-px bg-parchment" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-parchment px-4 py-3 font-body text-sm text-espresso hover:border-caramel/40 transition-colors disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  )
}