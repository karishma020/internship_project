import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { Thermometer, Clock, Scale, Award } from 'lucide-react'

const pillars = [
  {
    icon: Scale,
    title: 'Small batches only',
    body: 'Never more than 12kg per roast. Every batch gets our full, undivided attention — we never compromise roast quality for volume.',
  },
  {
    icon: Thermometer,
    title: 'Temperature precision',
    body: 'We log full roast curves for every batch. Rate of rise, first crack, development time — all measured and documented.',
  },
  {
    icon: Clock,
    title: '48-hour resting',
    body: 'Freshly roasted coffee needs to degas. We wait 48 hours before cupping approval, and ship only when the flavour has settled.',
  },
  {
    icon: Award,
    title: 'Cup before you ship',
    body: 'Every roast is cupped against our reference profile. If it doesn\'t match, it doesn\'t ship — no exceptions, ever.',
  },
]

export default function Roastery() {
  const r1 = useScrollAnimation()
  const r2 = useScrollAnimation()
  const r3 = useScrollAnimation()

  return (
    <section id="roastery" className="bg-parchment py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={r1} className="fade-up mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-5">The roastery</div>
            <h2 className="display-lg text-espresso mb-6">
              Where science<br />
              meets <em>instinct.</em>
            </h2>
            <div className="divider" />
            <p className="font-body font-light text-caramel leading-relaxed">
              Our Bengaluru roastery is a small, obsessively organised space where 
              temperature curves are studied like sheet music and every roast is treated as 
              a performance — one chance to get it right.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
              alt="Coffee roasting"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-5 -left-5 bg-espresso text-cream px-6 py-5">
              <div className="font-display text-2xl">12kg</div>
              <div className="font-mono text-xs text-cream/50 tracking-widest2 uppercase mt-1">Max batch size</div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div ref={r2} className="fade-up grid grid-cols-1 md:grid-cols-2 gap-px bg-espresso/10 mb-20">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="bg-parchment p-8 md:p-10 group hover:bg-mist transition-colors duration-300">
                <Icon size={24} className="text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-espresso mb-3">{p.title}</h3>
                <p className="font-body font-light text-caramel text-sm leading-relaxed">{p.body}</p>
              </div>
            )
          })}
        </div>

        {/* Roast process visual */}
        <div ref={r3} className="fade-up bg-espresso text-cream px-8 md:px-16 py-12 md:py-16">
          <div className="section-label text-cream/40 mb-8 text-center">The roast curve</div>
          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-cream/10">
            {[
              { phase: 'Drying', temp: '160°C', time: '0–4 min', desc: 'Moisture evaporates. The green bean turns yellow.' },
              { phase: 'Maillard', temp: '185°C', time: '4–8 min', desc: 'Sugars begin to brown. Complexity develops.' },
              { phase: 'First crack', temp: '196°C', time: '8–10 min', desc: 'The bean expands. Light roasts stop here.' },
              { phase: 'Development', temp: '205°C', time: '10–12 min', desc: 'Final flavour integration. Timing is everything.' },
            ].map((p) => (
              <div key={p.phase} className="flex-1 px-6 py-6 text-center">
                <div className="font-display text-2xl text-gold mb-1">{p.temp}</div>
                <div className="font-mono text-xs text-cream/30 tracking-widest2 uppercase mb-3">{p.phase} · {p.time}</div>
                <p className="font-body font-light text-cream/50 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
