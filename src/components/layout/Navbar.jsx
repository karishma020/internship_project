import { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../ui/AuthModal'

const links = [
  { label: 'Story',    href: '#story' },
  { label: 'Journey',  href: '#journey' },
  { label: 'Origins',  href: '#origins' },
  { label: 'Coffees',  href: '#coffees' },
  { label: 'Roastery', href: '#roastery' },
  { label: 'Contact',  href: '#contact' },
]

function KohiLogo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kōhi Coffee"
    >
      <circle cx="60" cy="60" r="58" fill="#2C1A0E" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#C49A5A" strokeWidth="0.8" />
      <line x1="28" y1="44" x2="92" y2="44" stroke="#C49A5A" strokeWidth="0.6" />
      <line x1="28" y1="76" x2="92" y2="76" stroke="#C49A5A" strokeWidth="0.6" />
      <text
        x="60" y="58"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="28"
        fontWeight="400"
        fill="#F5ECD7"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Kōhi
      </text>
      <text
        x="60" y="70"
        fontFamily="sans-serif"
        fontSize="7"
        fill="#C49A5A"
        textAnchor="middle"
        letterSpacing="2"
      >
        コーヒー
      </text>
    </svg>
  )
}

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled]         = useState(false)
  const [open, setOpen]                 = useState(false)
  const [showLogin, setShowLogin]       = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!showUserMenu) return
    const handler = () => setShowUserMenu(false)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [showUserMenu])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-mist/95 backdrop-blur-sm border-b border-parchment' : 'bg-transparent'
      }`}>
        {/* h-20 mobile / h-24 desktop — tall enough to contain the bigger logo */}
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">

          <a href="#" aria-label="Kōhi home" className="flex items-center shrink-0">
            <span className="block md:hidden">
              <KohiLogo size={60} />
            </span>
            <span className="hidden md:block">
              <KohiLogo size={76} />
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-body text-xs tracking-widest2 uppercase text-caramel hover:text-espresso transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right: Cart + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-2 text-xs tracking-widest2 uppercase font-light px-4 py-2.5 text-espresso hover:text-caramel transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-espresso text-cream text-[10px] font-mono rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setShowUserMenu(v => !v)}
                  className="flex items-center gap-2 text-xs tracking-widest2 uppercase font-light px-4 py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-cream transition-all duration-300"
                >
                  <User size={14} />
                  <span>{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-mist border border-parchment shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-parchment">
                      <p className="font-mono text-[10px] text-caramel/50 uppercase tracking-widest2">Signed in as</p>
                      <p className="font-body text-sm text-espresso truncate mt-0.5">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setShowUserMenu(false) }}
                      className="w-full flex items-center gap-2 px-4 py-3 font-mono text-xs text-caramel uppercase tracking-widest2 hover:text-espresso hover:bg-parchment/40 transition-colors"
                    >
                      <LogOut size={13} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-xs tracking-widest2 uppercase font-light px-5 py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-cream transition-all duration-300"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={onCartOpen} className="relative text-espresso" aria-label="Open cart">
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-espresso text-cream text-[9px] font-mono rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="text-espresso" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-mist border-t border-parchment px-6 py-8 flex flex-col gap-6">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm tracking-widest2 uppercase text-caramel hover:text-espresso transition-colors"
              >
                {l.label}
              </a>
            ))}
            {user ? (
              <div className="flex flex-col gap-3 pt-2 border-t border-parchment">
                <p className="font-mono text-xs text-caramel/50">{user.email}</p>
                <button
                  onClick={() => { logout(); setOpen(false) }}
                  className="flex items-center gap-2 font-mono text-xs text-caramel uppercase tracking-widest2"
                >
                  <LogOut size={13} /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setShowLogin(true); setOpen(false) }}
                className="btn-primary text-center mt-2"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      {showLogin && <AuthModal onClose={() => setShowLogin(false)} />}
    </>
  )
}