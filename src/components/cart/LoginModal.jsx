import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function LoginModal({ onClose }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))
    login(email, password)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-espresso/40 backdrop-blur-sm px-4">
      <div className="bg-mist w-full max-w-md border border-parchment shadow-2xl">

        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-parchment">
          <div>
            <div className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 mb-1">Welcome back</div>
            <h2 className="font-display text-2xl text-espresso italic">Sign in to Kōhi</h2>
          </div>
          <button onClick={onClose} className="text-caramel hover:text-espresso transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">
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
            className="btn-primary text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="font-body text-xs text-caramel/60 text-center">
            No account?{' '}
            <span className="text-caramel underline cursor-pointer hover:text-espresso transition-colors">
              Create one — it's free
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}