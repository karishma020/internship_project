// import { useState, useEffect } from 'react'
// import { Menu, X } from 'lucide-react'

// const links = [
//   { label: 'Story', href: '#story' },
//   { label: 'Journey', href: '#journey' },
//   { label: 'Origins', href: '#origins' },
//   { label: 'Coffees', href: '#coffees' },
//   { label: 'Roastery', href: '#roastery' },
//   { label: 'Contact', href: '#contact' },
// ]

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//       scrolled ? 'bg-mist/95 backdrop-blur-sm border-b border-parchment' : 'bg-transparent'
//     }`}>
//       <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
//         {/* Logo */}
//         <a href="#" className="font-display text-2xl text-espresso tracking-wide">
//           Kōhi
//         </a>

//         {/* Desktop links */}
//         <ul className="hidden md:flex items-center gap-8">
//           {links.map(l => (
//             <li key={l.href}>
//               <a
//                 href={l.href}
//                 className="font-body text-xs tracking-widest2 uppercase text-caramel hover:text-espresso transition-colors duration-200"
//               >
//                 {l.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* CTA */}
//         <a
//           href="#coffees"
//           className="hidden md:inline-block text-xs tracking-widest2 uppercase font-light px-5 py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-cream transition-all duration-300"
//         >
//           Shop
//         </a>

//         {/* Mobile toggle */}
//         <button
//           className="md:hidden text-espresso"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//         >
//           {open ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </nav>

//       {/* Mobile menu */}
//       {open && (
//         <div className="md:hidden bg-mist border-t border-parchment px-6 py-8 flex flex-col gap-6">
//           {links.map(l => (
//             <a
//               key={l.href}
//               href={l.href}
//               onClick={() => setOpen(false)}
//               className="font-body text-sm tracking-widest2 uppercase text-caramel hover:text-espresso transition-colors"
//             >
//               {l.label}
//             </a>
//           ))}
//           <a
//             href="#coffees"
//             onClick={() => setOpen(false)}
//             className="btn-primary text-center mt-2"
//           >
//             Shop Coffees
//           </a>
//         </div>
//       )}
//     </header>
//   )
// }
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Journey', href: '#journey' },
  { label: 'Origins', href: '#origins' },
  { label: 'Coffees', href: '#coffees' },
  { label: 'Roastery', href: '#roastery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()

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

        {/* Right side: Cart + Shop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart button with badge */}
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

          <a
            href="#coffees"
            className="text-xs tracking-widest2 uppercase font-light px-5 py-2.5 border border-espresso text-espresso hover:bg-espresso hover:text-cream transition-all duration-300"
          >
            Shop
          </a>
        </div>

        {/* Mobile: cart icon + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative text-espresso"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-espresso text-cream text-[9px] font-mono rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-espresso"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
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