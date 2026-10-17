import { useMemo } from 'react'

const FALL = { autumn: ['🍂', '🍁'], spring: ['🌸', '🌷'] }
const COUNT = { day: 0, night: 46, rain: 46, autumn: 18, spring: 20 }

// Sky layer: sun / moon with eyes, clouds, and mode-specific particles.
export default function Sky({ mode }) {
  const bits = useMemo(
    () => Array.from({ length: COUNT[mode] }, (_, i) => ({
      left: (i * 61) % 100,
      top: (i * 29) % 65,
      delay: ((i * 37) % 40) / 10,
      dur: 2.5 + ((i * 17) % 30) / 10,
      size: 8 + ((i * 7) % 12),
    })),
    [mode],
  )
  const sparkles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ left: (i * 73) % 100, top: 20 + ((i * 41) % 55), delay: (i % 7) * 0.4 })), [])

  return (
    <div className="sky" aria-hidden="true">
      {mode === 'night' ? (
        <div className="moon"><i /><i /><b /></div>
      ) : (
        mode !== 'rain' && <div className="sun" />
      )}
      <div className="cloud c1" /><div className="cloud c2" /><div className="cloud c3" />
      {mode === 'night' && <span className="shoot" />}
      {bits.map((b, i) => {
        const base = { left: `${b.left}%`, animationDelay: `${b.delay}s` }
        if (mode === 'night') return <span key={i} className="star" style={{ ...base, top: `${b.top}%`, width: b.size / 3, height: b.size / 3 }} />
        if (mode === 'rain') return <span key={i} className="drop" style={{ ...base, animationDuration: `${b.dur / 3 + 0.7}s` }} />
        return <span key={i} className="fall" style={{ ...base, animationDuration: `${b.dur * 2}s`, fontSize: b.size + 8 }}>{FALL[mode][i % 2]}</span>
      })}
      {sparkles.map((s, i) => (
        <span key={i} className="sparkle" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }} />
      ))}
    </div>
  )
}
