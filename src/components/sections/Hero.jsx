import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-espresso">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85"
          alt="Coffee farm at dawn"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-transparent to-espresso/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 justify-end px-6 md:px-16 pb-20 md:pb-28 max-w-7xl mx-auto w-full">
        {/* Label */}
        <div className={`section-label text-cream/50 mb-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Single-origin specialty coffee
        </div>

        {/* Headline */}
        <h1 className={`display-xl text-cream mb-6 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          From<br />
          <em className="text-gold not-italic">bean</em><br />
          to cup.
        </h1>

        {/* Sub */}
        <p className={`font-body font-light text-cream/60 text-lg max-w-md mb-10 leading-relaxed transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          We travel to the world's finest growing regions, form relationships with small farmers, 
          and roast every batch by hand. Nothing more. Nothing less.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#coffees" className="btn-primary">
            Explore Coffees
          </a>
          <a href="#story" className="inline-flex items-center gap-3 font-body font-light text-sm tracking-widest2 uppercase text-cream/60 hover:text-cream transition-colors pt-4 sm:pt-0 sm:px-4">
            Our Story
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 right-8 md:right-16 transition-all duration-1000 delay-1200 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 text-cream/30">
            <span className="font-mono text-xs tracking-widest2 [writing-mode:vertical-rl]">Scroll</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className={`relative z-10 border-t border-cream/10 bg-espresso/60 backdrop-blur-sm transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 grid grid-cols-3 divide-x divide-cream/10">
          {[
            { num: '4', label: 'Origins' },
            { num: '12+', label: 'Varietals' },
            { num: '100%', label: 'Traceable' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center py-1">
              <span className="font-display text-xl text-gold">{s.num}</span>
              <span className="font-mono text-xs text-cream/30 tracking-widest2 uppercase mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
