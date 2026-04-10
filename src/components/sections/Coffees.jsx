import { coffees } from '../../data/coffees'
import CoffeeCard from '../ui/CoffeeCard'
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation'

export default function Coffees() {
  const titleRef = useScrollAnimation()
  const setRef = useStaggerAnimation(coffees.length)

  return (
    <section id="coffees" className="bg-mist py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={titleRef} className="fade-up flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <div className="section-label mb-5">Our coffees</div>
            <h2 className="display-lg text-espresso">
              Each one,<br />
              <em>irreplaceable.</em>
            </h2>
          </div>
          <p className="font-body font-light text-caramel max-w-sm leading-relaxed">
            Four single-origins. Four growing regions. Four entirely different
            conversations between soil, climate, and the hands that tend them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coffees.map((coffee, i) => (
            <div key={coffee.id} ref={setRef(i)} className="fade-up">
              <CoffeeCard coffee={coffee} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block border border-parchment px-10 py-8 max-w-lg">
            <div className="font-display text-xl text-espresso mb-3 italic">
              Not sure where to start?
            </div>
            <p className="font-body font-light text-caramel text-sm leading-relaxed mb-6">
              Our Tasting Collection includes a 50g sample of all four origins —
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