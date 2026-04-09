import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Journey', href: '#journey' },
  { label: 'Origins', href: '#origins' },
  { label: 'Coffees', href: '#coffees' },
  { label: 'Roastery', href: '#roastery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-mist/95 backdrop-blur-sm border-b border-parchment' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="font-display text-2xl text-espresso tracking-wide">
          Kōhi
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

        {/* CTA */}
        <a
          href="#coffees"
          className="hidden md:inline-block text-xs tracking-widest2 uppercase font-light px-5 py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-cream transition-all duration-300"
        >
          Shop
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-espresso"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
          <a
            href="#coffees"
            onClick={() => setOpen(false)}
            className="btn-primary text-center mt-2"
          >
            Shop Coffees
          </a>
        </div>
      )}
    </header>
  )
}
