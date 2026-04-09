import RoastMeter from './RoastMeter'

export default function CoffeeCard({ coffee }) {
  return (
    <div className="group bg-mist border border-parchment hover:border-gold/40 transition-all duration-300">
      {/* Image */}
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={coffee.image}
          alt={coffee.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-mono text-xs text-caramel/60 uppercase tracking-widest2 mb-1">
              {coffee.origin} {coffee.flag}
            </div>
            <h3 className="font-display text-xl text-espresso">{coffee.name}</h3>
          </div>
          <span className="font-mono text-xs bg-parchment text-caramel px-2.5 py-1 uppercase tracking-wide">
            {coffee.process}
          </span>
        </div>

        {/* Description */}
        <p className="font-body font-light text-sm text-caramel/80 leading-relaxed mb-5">
          {coffee.description}
        </p>

        {/* Tasting notes */}
        <div className="mb-5">
          <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-2">Tasting notes</div>
          <div className="flex flex-wrap gap-2">
            {coffee.notes.map(note => (
              <span
                key={note}
                className="font-body text-xs text-espresso border border-espresso/20 px-3 py-1"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Roast meter */}
        <div className="mb-5">
          <div className="font-mono text-xs text-caramel/40 uppercase tracking-widest2 mb-1">
            Roast — {coffee.roast}
          </div>
          <RoastMeter level={coffee.roastLevel} />
        </div>

        {/* Details row */}
        <div className="flex items-center justify-between border-t border-parchment pt-4">
          <div className="font-mono text-xs text-caramel/50">{coffee.altitude}</div>
          <div className="font-mono text-xs text-caramel/50">{coffee.region}</div>
        </div>
      </div>
    </div>
  )
}
