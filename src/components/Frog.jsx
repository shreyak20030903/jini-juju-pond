import { useEffect, useId, useRef, useState } from 'react'

export const JINI = { body: '#ff8fb8', hi: '#ffc4da', belly: '#ffe9f1', feet: '#ff74a4', flower: true, wand: true }
export const JUJU = { body: '#6fd24f', hi: '#aef08a', belly: '#effccd', feet: '#58bd44' }

// Cartoon frog. Pupils follow the cursor, eyes blink on their own.
export default function Frog({ body, hi, belly, feet, flower = false, wand = false }) {
  const gid = 'g' + useId().replace(/:/g, '')
  const eyes = useRef(null)
  const [look, setLook] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = (e) => {
      if (!eyes.current) return
      const r = eyes.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(d / 120, 1) * 7
      setLook({ x: (dx / d) * k, y: (dy / d) * k })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  const { x, y } = look
  return (
    <svg viewBox="0 0 200 165" className="frog" role="img" aria-label="Cute frog">
      <defs>
        <radialGradient id={gid} cx=".4" cy=".3" r=".8"><stop offset="0" stopColor={hi} /><stop offset="1" stopColor={body} /></radialGradient>
      </defs>
      <ellipse cx="46" cy="132" rx="30" ry="17" fill={feet} />
      <ellipse cx="154" cy="132" rx="30" ry="17" fill={feet} />
      <ellipse cx="100" cy="104" rx="70" ry="52" fill={`url(#${gid})`} />
      <ellipse cx="100" cy="120" rx="46" ry="30" fill={belly} />
      <circle cx="62" cy="52" r="30" fill={`url(#${gid})`} />
      <circle cx="138" cy="52" r="30" fill={`url(#${gid})`} />
      {[[70, 92, 6], [128, 88, 5], [88, 78, 4], [30, 118, 5], [170, 118, 5]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#000" opacity=".07" />)}
      <g ref={eyes} className="blink">
        <circle cx="62" cy="52" r="23" fill="#fff" />
        <circle cx="138" cy="52" r="23" fill="#fff" />
        <circle cx={62 + x} cy={52 + y} r="14" fill="#2b2118" />
        <circle cx={138 + x} cy={52 + y} r="14" fill="#2b2118" />
        <circle cx={57 + x} cy={46 + y} r="5" fill="#fff" />
        <circle cx={133 + x} cy={46 + y} r="5" fill="#fff" />
        <circle cx={67 + x} cy={58 + y} r="2.2" fill="#fff" />
        <circle cx={143 + x} cy={58 + y} r="2.2" fill="#fff" />
      </g>
      <circle cx="44" cy="100" r="11" fill="#ff6f9a" opacity=".5" />
      <circle cx="156" cy="100" r="11" fill="#ff6f9a" opacity=".5" />
      <path d="M80 98 Q100 118 120 98" fill="#c0334d" stroke="#2b2118" strokeWidth="3.5" strokeLinejoin="round" />
      <ellipse cx="72" cy="150" rx="17" ry="8" fill={feet} />
      <ellipse cx="128" cy="150" rx="17" ry="8" fill={feet} />
      {flower && (
        <g transform="translate(36 32)">
          {[0, 72, 144, 216, 288].map((a) => <circle key={a} cy="-8" r="7.5" fill="#fff" transform={`rotate(${a})`} />)}
          <circle r="5" fill="#ffd84d" />
        </g>
      )}
      {wand && <path className="spark" d="M178 56 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="#ffd84d" />}
    </svg>
  )
}
