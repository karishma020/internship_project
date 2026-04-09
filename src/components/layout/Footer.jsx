import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/70">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-4xl text-cream mb-4">Kōhi</div>
            <p className="font-body font-light text-sm leading-relaxed text-cream/60 max-w-xs">
              Single-origin specialty coffee. Sourced with intention, roasted with restraint, 
              served with reverence.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-cream/40 hover:text-gold transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-cream/40 hover:text-gold transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-cream/40 hover:text-gold transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="section-label text-cream/40 mb-4">Explore</div>
            <ul className="space-y-3">
              {['Our Story', 'The Journey', 'Origins', 'Our Coffees', 'The Roastery'].map(l => (
                <li key={l}>
                  <a href="#" className="font-body text-sm text-cream/60 hover:text-cream transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-label text-cream/40 mb-4">Contact</div>
            <ul className="space-y-3 font-body text-sm text-cream/60 font-light">
              <li>karishma.cs22@sahyadri.edu.in</li>
              <li>+91 98765 43210</li>
              <li className="leading-relaxed">12 Roastery Lane<br />Bengaluru, Karnataka<br />India 560001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cream/30">© 2026 Kōhi. All rights reserved.</p>
          <p className="font-mono text-xs text-cream/30">From bean to cup — with love.</p>
        </div>
      </div>
    </footer>
  )
}
