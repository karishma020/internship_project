import { origins } from '../../data/coffees'
import { useScrollAnimation, useStaggerAnimation } from '../../hooks/useScrollAnimation'
import { MapPin } from 'lucide-react'

const originImages = {
  Ethiopia: 'https://images.unsplash.com/photo-1559056961-1f4a52b034d0?w=600&q=80',
  Colombia: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
  Indonesia: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
  Guatemala: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
}

export default function Origins() {
  const titleRef = useScrollAnimation()
  const setRef = useStaggerAnimation(origins.length)

  return (
    <section id="origins" className="bg-espresso py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={titleRef} className="fade-up mb-20 text-center">
          <div className="section-label text-cream/40 mb-5">Where it begins</div>
          <h2 className="display-lg text-cream mb-6">
            Four origins.<br />
            <em className="text-gold">Countless</em> stories.
          </h2>
          <p className="font-body font-light text-cream/50 max-w-lg mx-auto leading-relaxed">
            We source from four of the world's most celebrated coffee-growing regions. 
            Each one has shaped its coffee into something irreplaceable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/10">
          {origins.map((origin, i) => (
            <div
              key={origin.name}
              ref={setRef(i)}
              className="fade-up group bg-espresso hover:bg-roast transition-colors duration-300 p-8 md:p-10"
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={originImages[origin.name]}
                  alt={origin.name}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                />
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-2xl text-cream mb-1">{origin.name}</h3>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-cream/40 tracking-wide">
                    <MapPin size={11} />
                    {origin.region}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl text-gold">{origin.beans}</div>
                  <div className="font-mono text-xs text-cream/30 uppercase tracking-widest2">varietals</div>
                </div>
              </div>

              <div className="divider bg-cream/20" />

              <p className="font-body font-light text-cream/60 leading-relaxed text-sm mb-6">
                {origin.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-xs text-cream/30 uppercase tracking-widest2 mb-1">Altitude</div>
                  <div className="font-body text-sm text-cream/70">{origin.altitude}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-cream/30 uppercase tracking-widest2 mb-1">Harvest</div>
                  <div className="font-body text-sm text-cream/70">{origin.harvest}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
