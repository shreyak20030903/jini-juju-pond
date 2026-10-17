const FLOWERS = {
  day: ['🌼', '🌻', '🌷'],
  spring: ['🌸', '🌷', '🌺'],
  autumn: ['🍄', '🍂', '🌾'],
  rain: ['🌷', '🍄', '🌿'],
  night: ['🌼', '🍄', '🌙'],
}

// Hills, trees, river, pond water and a meadow of flowers.
export default function Scenery({ mode }) {
  const f = FLOWERS[mode]
  return (
    <div className="scenery" aria-hidden="true">
      <div className="hill h1" />
      <div className="hill h2" />
      {[7, 20, 79, 92].map((x, i) => (
        <div key={x} className="tree" style={{ left: `${x}%`, '--s': 0.8 + (i % 2) * 0.35 }}><b /><i /></div>
      ))}
      <div className="ground" />
      {/* <div className="river" /> */}
      <div className="flowers">
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} style={{ left: `${i * 6.4 + 1}%`, animationDelay: `${(i % 5) * 0.3}s`, fontSize: 22 + (i % 3) * 8 }}>{f[i % 3]}</span>
        ))}
      </div>
    </div>
  )
}
