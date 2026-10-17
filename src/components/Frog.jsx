import { useEffect, useRef, useState } from 'react'

// Round, big-eyed frog. Pupils follow the cursor anywhere on the screen.
export default function Frog({ body = '#7ed957', belly = '#d9f5b8', feet = '#5fae58', bow = false }) {
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

  return (
    <svg viewBox="0 0 200 165" className="frog" role="img" aria-label="Cute frog">
      <ellipse cx="46" cy="132" rx="30" ry="17" fill={feet} />
      <ellipse cx="154" cy="132" rx="30" ry="17" fill={feet} />
      <ellipse cx="100" cy="104" rx="70" ry="52" fill={body} />
      <ellipse cx="100" cy="120" rx="46" ry="30" fill={belly} />
      <circle cx="62" cy="52" r="30" fill={body} />
      <circle cx="138" cy="52" r="30" fill={body} />
      <g ref={eyes}>
        <circle cx="62" cy="52" r="23" fill="#fff" />
        <circle cx="138" cy="52" r="23" fill="#fff" />
        <circle cx={62 + look.x} cy={52 + look.y} r="13" fill="#2b2118" />
        <circle cx={138 + look.x} cy={52 + look.y} r="13" fill="#2b2118" />
        <circle cx={57 + look.x} cy={46 + look.y} r="4.5" fill="#fff" />
        <circle cx={133 + look.x} cy={46 + look.y} r="4.5" fill="#fff" />
        <circle cx={67 + look.x} cy={58 + look.y} r="2" fill="#fff" />
        <circle cx={143 + look.x} cy={58 + look.y} r="2" fill="#fff" />
      </g>
      <circle cx="44" cy="100" r="10" fill="#ff9db8" opacity=".8" />
      <circle cx="156" cy="100" r="10" fill="#ff9db8" opacity=".8" />
      <path d="M82 98 Q100 114 118 98" fill="none" stroke="#2b2118" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="72" cy="150" rx="17" ry="8" fill={feet} />
      <ellipse cx="128" cy="150" rx="17" ry="8" fill={feet} />
      {bow && (
        <g transform="translate(100 32)">
          <path d="M0 0 L-24 -14 L-24 14 Z M0 0 L24 -14 L24 14 Z" fill="#ff7fa8" />
          <circle r="6" fill="#e0517f" />
        </g>
      )}
    </svg>
  )
}
