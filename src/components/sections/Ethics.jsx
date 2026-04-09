import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation'
import { Heart, Leaf, Users, Globe } from 'lucide-react'

const pillars = [
  {
    icon: Heart,
    title: 'Farmer first',
    body: 'We pay 30–60% above the Fair Trade floor price. Not as charity — as recognition that quality costs money to grow, and farmers who grow it deserve to be compensated accordingly.',
    stat: '30–60%', statLabel: 'Above Fair Trade price',
  },
  {
    icon: Leaf,
    title: 'No shortcuts with the land',
    body: 'We only buy from farms that use shade-grown, low-chemical, or certified organic practices. The land that produces our coffee must remain productive for future generations.',
    stat: '100%', statLabel: 'Shade-grown or organic',
  },
  {
    icon: Users,
    title: 'Long-term relationships',
    body: 'We don\'t spot-buy. Every farm we source from has a multi-year agreement. Stability for the farmer means they can invest in quality — and that investment flows into your cup.',
    stat: '18', statLabel: 'Long-term farm partners',
  },
  {
    icon: Globe,
    title: 'Full traceability',
    body: 'Every Kōhi bag carries a lot number. Scan it and see: the farm, the farmer, the altitude, the harvest date, the processing method, and the roast date. No mystery.',
    stat: '100%', statLabel: 'Traceable to farm',
  },
]

export default function Ethics() {
  const titleRef = useScrollAnimation()
  const imgRef = useScrollAnimation()
  const setRef = useStaggerAnimation(pillars.length)

  return (
    <section id="ethics" className="bg-espresso py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div ref={titleRef} className="fade-up grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="section-label text-cream/40 mb-5">Our ethics</div>
            <h2 className="display-lg text-cream">
              Good coffee<br />
              starts with<br />
              <em className="text-gold">good values.</em>
            </h2>
          </div>
          <p className="font-body font-light text-cream/50 leading-relaxed text-lg">
            Ethics at Kōhi are not written as policies. They are lived as beliefs — 
            in every payment we make, every farm we visit, every lot we trace.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/10 mb-20">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                ref={setRef(i)}
                className="fade-up bg-espresso hover:bg-roast transition-colors duration-300 p-8 md:p-10"
              >
                <div className="flex items-start justify-between mb-6">
                  <Icon size={22} className="text-gold" strokeWidth={1.5} />
                  <div className="text-right">
                    <div className="font-display text-3xl text-gold">{p.stat}</div>
                    <div className="font-mono text-xs text-cream/30 uppercase tracking-widest2">{p.statLabel}</div>
                  </div>
                </div>
                <h3 className="font-display text-xl text-cream mb-3">{p.title}</h3>
                <p className="font-body font-light text-cream/50 text-sm leading-relaxed">{p.body}</p>
              </div>
            )
          })}
        </div>

        {/* Full width image strip */}
        <div ref={imgRef} className="fade-up relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=1400&q=80"
            alt="Coffee farmer"
            className="w-full aspect-[21/9] object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <blockquote className="font-display text-2xl md:text-4xl italic text-cream text-center max-w-2xl px-6 leading-tight">
              "We'd rather sell less coffee and sleep well than sell more coffee and look away."
            </blockquote>
          </div>
        </div>

      </div>
    </section>
  )
}
