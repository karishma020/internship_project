import { useStaggerAnimation, useScrollAnimation } from '../../hooks/useScrollAnimation'

const steps = [
  {
    num: '01',
    title: 'The Farm',
    subtitle: 'Altitude & terroir',
    description: 'Every Kōhi bean begins at altitude — between 1,200 and 2,200 metres. Thin air, volcanic soil, and dramatic temperature swings between day and night force the coffee cherry to develop slowly, concentrating sugars and acids into extraordinary complexity.',
    detail: 'We visit every farm we buy from, usually during harvest.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=80',
  },
  {
    num: '02',
    title: 'The Harvest',
    subtitle: 'By hand, at peak ripeness',
    description: 'Only fully red cherries are picked. On steep hillside farms, machines are impossible — every cherry is selected by a trained picker who understands what ripe looks and feels like. This selective harvesting is the single most important factor in cup quality.',
    detail: 'One experienced picker harvests ~100kg of cherries per day.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=700&q=80',
  },
  {
    num: '03',
    title: 'The Process',
    subtitle: 'Natural, washed, or honey',
    description: 'After harvest, we choose the processing method that best expresses each coffee\'s character. Natural drying amplifies fruit sweetness. Washed processing reveals clarity and acidity. Honey processing is the bridge — pulped but dried with mucilage intact.',
    detail: 'Processing takes 10–30 days depending on method and climate.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80',
  },
  {
    num: '04',
    title: 'The Roast',
    subtitle: 'Small batch, by hand',
    description: 'Our roasters cup every green sample before committing to a roast profile. Temperature curves are built around the specific density, moisture content, and desired flavour of each lot. We roast light enough to honour the origin, and no darker than the coffee demands.',
    detail: 'Each batch rests 48 hours before we cup and approve it.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=80',
  },
  {
    num: '05',
    title: 'The Cup',
    subtitle: 'Your moment of clarity',
    description: 'Everything — the altitude, the picker\'s hands, the drying beds, the roaster\'s instinct — arrives in your cup. Brew with care: use filtered water, the right temperature, and the right grind. Then be still for a moment. That\'s what we made all of this for.',
    detail: '93°C water. Freshly ground. No shortcuts.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80',
  },
]

export default function Journey() {
  const titleRef = useScrollAnimation()
  const setRef = useStaggerAnimation(steps.length)

  return (
    <section id="journey" className="bg-parchment py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={titleRef} className="fade-up mb-20 md:mb-28">
          <div className="section-label mb-5">The journey</div>
          <h2 className="display-lg text-espresso max-w-lg">
            Five acts.<br />One <em>perfect</em> cup.
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={setRef(i)}
              className={`fade-up grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-espresso/10 ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 font-mono text-xs text-cream/70 tracking-widest2 bg-espresso/60 px-3 py-1.5">
                  {step.num}
                </div>
              </div>

              {/* Text */}
              <div className={`flex flex-col justify-center px-8 md:px-16 py-12 bg-mist ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <div className="section-label mb-3">{step.subtitle}</div>
                <h3 className="display-md text-espresso mb-5">{step.title}</h3>
                <div className="divider" />
                <p className="font-body font-light text-caramel leading-relaxed mb-6">
                  {step.description}
                </p>
                <div className="flex items-start gap-3 bg-parchment px-4 py-3 border-l-2 border-gold">
                  <span className="font-mono text-xs text-caramel leading-relaxed">{step.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
