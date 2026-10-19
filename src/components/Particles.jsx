import { useMemo } from 'react'

const COUNT = { day: 0, night: 0, rain: 50, autumn: 14, spring: 18 }
const EMO = { autumn: ['🍂', '🍁'], spring: ['🌸', '🌷'] }

// Weather layer for the hero: rain, falling leaves/petals, stars + fireflies.
export default function Particles({ mode }) {
  const bits = useMemo(() => Array.from({ length: COUNT[mode] }, (_, i) => ({ l: (i * 61) % 100, d: ((i * 37) % 40) / 10, t: 2.2 + ((i * 17) % 30) / 10, s: 16 + ((i * 7) % 12) })), [mode])
  const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({ l: (i * 71) % 100, t: (i * 23) % 45, d: (i % 8) * 0.5, s: 3 + (i % 3) })), [])
  const flies = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ l: (i * 47) % 100, t: 30 + ((i * 29) % 60), d: (i % 9) * 0.6, s: 5 + (i % 3) * 2 })), [])
  return (
    <div className="parts" aria-hidden="true">
      {mode === 'night' && stars.map((s, i) => <span key={'s' + i} className="star" style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
      {mode === 'night' && flies.map((s, i) => <span key={'f' + i} className="dot" style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
      {mode === 'night' && <span className="shoot" />}
      {bits.map((b, i) => mode === 'rain'
        ? <span key={i} className="drop" style={{ left: `${b.l}%`, animationDelay: `${b.d}s`, animationDuration: `${b.t / 3 + 0.7}s` }} />
        : <span key={i} className="fall" style={{ left: `${b.l}%`, fontSize: b.s, animationDelay: `${b.d}s`, animationDuration: `${b.t * 2}s` }}>{EMO[mode][i % 2]}</span>)}
    </div>
  )
}
