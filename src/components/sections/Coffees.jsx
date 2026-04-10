// import { coffees } from '../../data/coffees'
// import CoffeeCard from '../ui/CoffeeCard'
// import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation'

// export default function Coffees() {
//   const titleRef = useScrollAnimation()
//   const setRef = useStaggerAnimation(coffees.length)

//   return (
//     <section id="coffees" className="bg-mist py-24 md:py-36">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">

//         <div ref={titleRef} className="fade-up flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
//           <div>
//             <div className="section-label mb-5">Our coffees</div>
//             <h2 className="display-lg text-espresso">
//               Each one,<br />
//               <em>irreplaceable.</em>
//             </h2>
//           </div>
//           <p className="font-body font-light text-caramel max-w-sm leading-relaxed">
//             Four single-origins. Four growing regions. Four entirely different
//             conversations between soil, climate, and the hands that tend them.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {coffees.map((coffee, i) => (
//             <div key={coffee.id} ref={setRef(i)} className="fade-up">
//               <CoffeeCard coffee={coffee} />
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-16 text-center">
//           <div className="inline-block border border-parchment px-10 py-8 max-w-lg">
//             <div className="font-display text-xl text-espresso mb-3 italic">
//               Not sure where to start?
//             </div>
//             <p className="font-body font-light text-caramel text-sm leading-relaxed mb-6">
//               Our Tasting Collection includes a 50g sample of all four origins —
//               perfect for discovering your favourite.
//             </p>
//             <a href="#contact" className="btn-primary">
//               Get the Tasting Set
//             </a>
//           </div>
//         </div>

//       </div>
//     </section>
//   )
// }
import { useState } from 'react'
import { coffees } from '../../data/coffees'
import CoffeeCard from '../ui/CoffeeCard'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const ALL = 'All'
const origins = [ALL, ...Array.from(new Set(coffees.map(c => c.origin)))]
const roasts  = [ALL, 'Light', 'Medium', 'Dark']

function matchRoast(coffee, filter) {
  if (filter === ALL) return true
  if (filter === 'Light')  return coffee.roastLevel <= 2
  if (filter === 'Medium') return coffee.roastLevel > 2 && coffee.roastLevel <= 3
  if (filter === 'Dark')   return coffee.roastLevel > 3
  return true
}

export default function Coffees() {
  const titleRef = useScrollAnimation()
  const [origin, setOrigin] = useState(ALL)
  const [roast,  setRoast]  = useState(ALL)

  const filtered = coffees.filter(c =>
    (origin === ALL || c.origin === origin) && matchRoast(c, roast)
  )

  return (
    <section id="coffees" className="bg-mist py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={titleRef} className="fade-up flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="section-label mb-5">Our coffees</div>
            <h2 className="display-lg text-espresso">
              Each one,<br />
              <em>irreplaceable.</em>
            </h2>
          </div>
          <p className="font-body font-light text-caramel max-w-sm leading-relaxed">
            Eighteen single-origins. Eight growing regions. One obsession with the extraordinary.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12 pb-8 border-b border-parchment">
          {/* Origin filter */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-caramel/50 uppercase tracking-widest2">Origin</span>
            <div className="flex flex-wrap gap-2">
              {origins.map(o => (
                <button
                  key={o}
                  onClick={() => setOrigin(o)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-widest2 border transition-all duration-200 ${
                    origin === o
                      ? 'bg-espresso text-cream border-espresso'
                      : 'border-parchment text-caramel hover:border-caramel/50'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Roast filter */}
          <div className="flex flex-col gap-2 sm:ml-8">
            <span className="font-mono text-[10px] text-caramel/50 uppercase tracking-widest2">Roast</span>
            <div className="flex flex-wrap gap-2">
              {roasts.map(r => (
                <button
                  key={r}
                  onClick={() => setRoast(r)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-widest2 border transition-all duration-200 ${
                    roast === r
                      ? 'bg-espresso text-cream border-espresso'
                      : 'border-parchment text-caramel hover:border-caramel/50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="sm:ml-auto self-end">
            <span className="font-mono text-xs text-caramel/40">
              {filtered.length} of {coffees.length}
            </span>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl italic text-espresso mb-3">No coffees match.</p>
            <p className="font-body font-light text-caramel text-sm">Try a different origin or roast level.</p>
            <button
              onClick={() => { setOrigin(ALL); setRoast(ALL) }}
              className="mt-6 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map(coffee => (
              <div key={coffee.id}>
                <CoffeeCard coffee={coffee} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block border border-parchment px-10 py-8 max-w-lg">
            <div className="font-display text-xl text-espresso mb-3 italic">
              Not sure where to start?
            </div>
            <p className="font-body font-light text-caramel text-sm leading-relaxed mb-6">
              Our Tasting Collection includes a 50g sample of six origins —
              perfect for discovering your favourite.
            </p>
            <a href="#contact" className="btn-primary">
              Get the Tasting Set
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}