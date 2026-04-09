export default function RoastMeter({ level }) {
  const max = 5
  const pct = (level / max) * 100

  return (
    <div className="mt-3">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-xs text-caramel/60 uppercase tracking-widest2">Light</span>
        <span className="font-mono text-xs text-caramel/60 uppercase tracking-widest2">Dark</span>
      </div>
      <div className="h-1 bg-parchment rounded-full overflow-hidden">
        <div
          className="h-full bg-espresso rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
