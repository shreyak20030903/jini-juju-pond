const COLORS = ['#ffb347', '#ff8fb8', '#8fd3ff', '#c79bff']

function Butterfly({ color }) {
  return (
    <svg viewBox="0 0 60 50" className="bfly" aria-hidden="true">
      <g className="wing"><path d="M30 25 C10 0 0 18 8 30 C14 40 26 36 30 28Z" fill={color} /><circle cx="14" cy="24" r="4" fill="#fff" opacity=".7" /></g>
      <g className="wing"><path d="M30 25 C50 0 60 18 52 30 C46 40 34 36 30 28Z" fill={color} /><circle cx="46" cy="24" r="4" fill="#fff" opacity=".7" /></g>
      <rect x="28" y="14" width="4" height="24" rx="2" fill="#6b4a3a" />
    </svg>
  )
}

// A few butterflies drifting around the section it is placed in.
export default function Flutter({ n = 3, seed = 0 }) {
  return (
    <div className="flutter" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="fly" style={{ left: `${8 + (((i + seed) * 31) % 80)}%`, top: `${10 + (((i + seed) * 37) % 70)}%`, animationName: i % 2 ? 'fly2' : 'fly1', animationDuration: `${16 + i * 5}s`, animationDelay: `${-i * 6}s` }}>
          <Butterfly color={COLORS[(i + seed) % 4]} />
        </div>
      ))}
    </div>
  )
}
