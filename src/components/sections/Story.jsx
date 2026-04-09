import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function Story() {
  const r1 = useScrollAnimation()
  const r2 = useScrollAnimation()
  const r3 = useScrollAnimation()

  return (
    <section id="story" className="bg-mist py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top: label + headline */}
        <div ref={r1} className="fade-up mb-20 md:mb-28 max-w-2xl">
          <div className="section-label mb-5">Our story</div>
          <h2 className="display-lg text-espresso mb-6">
            Not just coffee.<br />
            <em>A conversation</em> with the land.
          </h2>
          <div className="divider" />
          <p className="font-body font-light text-lg text-caramel leading-relaxed">
            Kōhi was born from a single question: what if every cup told you exactly where it came from, 
            who grew it, and how it was cared for — every single time?
          </p>
        </div>

        {/* Two-column image + text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-24 md:mb-36">
          <div ref={r2} className="fade-up">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=800&q=80"
                alt="Coffee farmer inspecting cherries"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-parchment px-6 py-5 border border-gold/30">
                <div className="font-display text-3xl text-espresso">2019</div>
                <div className="font-mono text-xs text-caramel tracking-widest2 uppercase mt-1">Founded</div>
              </div>
            </div>
          </div>

          <div ref={r3} className="fade-up">
            <div className="section-label mb-5">Who we are</div>
            <h3 className="display-md text-espresso mb-6">
              A small collective of obsessives.
            </h3>
            <div className="space-y-5 font-body font-light text-caramel leading-relaxed">
              <p>
                We are coffee buyers, agronomists, and roasters who believe the gap between a great farmer 
                and a great cup is mostly trust. We build that trust — one relationship, one harvest, one batch at a time.
              </p>
              <p>
                Every Kōhi coffee is sourced directly from farms we visit in person. We pay above Fair Trade 
                prices because quality demands it and farmers deserve it.
              </p>
              <p>
                We roast in small batches — never more than 12kg — to ensure every roast gets our full 
                attention. Coffee is not manufactured. It is coaxed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { num: '18', label: 'Farm partners worldwide' },
                { num: '4', label: 'Countries sourced from' },
                { num: '12kg', label: 'Max batch size' },
                { num: '48h', label: 'Resting time post-roast' },
              ].map(s => (
                <div key={s.label} className="border-l-2 border-gold pl-4">
                  <div className="font-display text-2xl text-espresso">{s.num}</div>
                  <div className="font-mono text-xs text-caramel tracking-wide uppercase mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width quote */}
        <div className="border-t border-b border-parchment py-16 text-center">
          <blockquote className="font-display text-2xl md:text-3xl italic text-espresso max-w-3xl mx-auto leading-relaxed">
            "We did not begin Kōhi in pursuit of volume or speed, but in pursuit of flavour that 
            could only come from patience and respect."
          </blockquote>
          <div className="mt-6 font-mono text-xs text-caramel tracking-widest2 uppercase">
            — The Kōhi Founders
          </div>
        </div>

      </div>
    </section>
  )
}
