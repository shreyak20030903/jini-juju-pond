import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Frog, { JINI, JUJU } from './Frog.jsx'
import Particles from './Particles.jsx'
import Flutter from './Flutter.jsx'
import { sfx } from '../audio.js'

// Lily pads as % of the hero. a = which leaf picture, f = flip, s = size, r = tilt.
// Juju lives on the leaf at index `juju`; Jini hops between all the others.
const LAYOUTS = {
  wide: { juju: 1, leaves: [
    { x: 30, y: 47, s: 0.8, a: 0, f: 1, r: -4 }, { x: 50, y: 66, s: 1.15, a: 1, f: 1, r: 2 }, { x: 72, y: 47, s: 0.85, a: 1, f: -1, r: 4 },
    { x: 33, y: 82, s: 0.85, a: 1, f: -1, r: -3 }, { x: 70, y: 82, s: 0.95, a: 0, f: 1, r: 3 }, { x: 88, y: 63, s: 0.7, a: 0, f: -1, r: -6 }, { x: 85, y: 34, s: 0.6, a: 1, f: 1, r: 5 },
  ] },
  tall: { juju: 2, leaves: [
    { x: 28, y: 38, s: 0.8, a: 0, f: 1, r: -4 }, { x: 72, y: 45, s: 0.8, a: 1, f: -1, r: 4 }, { x: 50, y: 62, s: 1.1, a: 1, f: 1, r: 2 },
    { x: 26, y: 78, s: 0.85, a: 0, f: -1, r: -3 }, { x: 74, y: 80, s: 0.85, a: 1, f: 1, r: 3 }, { x: 50, y: 90, s: 0.7, a: 0, f: 1, r: 0 },
  ] },
}
const NOTES = ['🎵', '🎶', '🎵', '🎶', '🎵', '🎶']

function usePortrait() {
  const q = '(max-aspect-ratio: 1/1)'
  const [p, setP] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const h = () => setP(m.matches)
    m.addEventListener('change', h)
    return () => m.removeEventListener('change', h)
  }, [])
  return p
}

export default function Scene({ mode }) {
  const hero = useRef(null)
  const busy = useRef(false)
  const hop = useAnimation()
  const L = LAYOUTS[usePortrait() ? 'tall' : 'wide']
  const [at, setAt] = useState(0)
  const [trail, setTrail] = useState(null)
  const [land, setLand] = useState({ n: 0, x: 0, y: 0 })
  const [rings, setRings] = useState([])
  const [fx, setFx] = useState({ n: 0, heart: false })

  const cur = at === L.juju || at >= L.leaves.length ? (L.juju === 0 ? 1 : 0) : at
  const from = L.leaves[cur]
  const juju = L.leaves[L.juju]

  const jump = (e) => {
    if (busy.current) return
    const r = hero.current.getBoundingClientRect()
    let best = cur
    let bd = Infinity
    L.leaves.forEach((l, i) => {
      if (i === L.juju) return
      const d = Math.hypot(e.clientX - (r.left + (l.x / 100) * r.width), e.clientY - (r.top + (l.y / 100) * r.height))
      if (d < bd) { bd = d; best = i }
    })
    if (best === cur) return
    busy.current = true
    const to = L.leaves[best]
    setTrail({ a: from, b: to, n: Date.now() })
    setAt(best)
    sfx.hop()
    hop.start({ y: [0, 8, -130, 0], scaleX: [1, 1.12, 0.9, 1.08, 1], scaleY: [1, 0.82, 1.15, 0.88, 1], transition: { duration: 0.65, times: [0, 0.18, 0.6, 1], ease: 'easeInOut' } })
    setTimeout(() => { setLand({ n: Date.now(), x: to.x, y: to.y }); sfx.chime(); busy.current = false }, 650)
  }

  const press = (e) => {
    const r = hero.current.getBoundingClientRect()
    const id = Date.now()
    setRings((a) => [...a.slice(-4), { id, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }])
    setTimeout(() => setRings((a) => a.filter((q) => q.id !== id)), 1100)
    jump(e)
  }
  // Juju sings a little note on every tap. Hidden Easter egg: every 5th tap is a burst of hearts instead.
  const tapJuju = () => { sfx.sing(); const n = fx.n + 1; setFx({ n, heart: n % 5 === 0 }) }

  return (
    <div className="hero" ref={hero} onPointerMove={jump} onPointerDown={press}>
      <div className="hero-bg" />
      <div className="tint" />
      {rings.map((q) => <span key={q.id} className="ring" style={{ left: `${q.x}%`, top: `${q.y}%` }} />)}

      {L.leaves.map((l, i) => (
        <div key={i} className="leaf" style={{ left: `${l.x}%`, top: `${l.y}%`, '--s': l.s, '--r': `${l.r}deg`, '--f': l.f }}>
          <img src={`/img/leaf-${l.a}.webp`} alt="" style={{ animationDelay: `${-i * 1.1}s` }} draggable="false" />
        </div>
      ))}
      {land.n > 0 && <span key={land.n} className="ring r2" style={{ left: `${land.x}%`, top: `${land.y + 2}%` }} />}
      {land.n > 0 && (
        <div key={'b' + land.n} className="burst" style={{ left: `${land.x}%`, top: `${land.y - 4}%` }}>
          {Array.from({ length: 7 }, (_, i) => <span key={i} style={{ '--a': `${i * 51}deg` }}>✨</span>)}
        </div>
      )}
      {trail && (
        <svg key={trail.n} className="arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={`M${trail.a.x} ${trail.a.y - 6} Q${(trail.a.x + trail.b.x) / 2} ${Math.min(trail.a.y, trail.b.y) - 28} ${trail.b.x} ${trail.b.y - 6}`} fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeDasharray="0.1 13" vectorEffect="non-scaling-stroke" />
        </svg>
      )}

      <Flutter n={4} seed={2} />
      <Particles mode={mode} />

      <div className="frog-w" style={{ left: `${juju.x}%`, top: `${juju.y}%` }} onPointerDown={(e) => { e.stopPropagation(); tapJuju() }}>
        <Frog {...JUJU} />
        {fx.n > 0 && (fx.heart
          ? <div key={fx.n} className="hearts">{Array.from({ length: 10 }, (_, i) => <span key={i} style={{ '--dx': `${(i - 5) * 20}px`, animationDelay: `${i * 0.06}s` }}>{i % 2 ? '💚' : '💖'}</span>)}</div>
          : <span key={fx.n} className="note-pop">{NOTES[fx.n % 6]}</span>)}
      </div>
      <motion.div className="frog-w" initial={false} animate={{ left: `${L.leaves[cur].x}%`, top: `${L.leaves[cur].y}%` }} transition={{ duration: 0.65, ease: 'easeInOut' }} style={{ pointerEvents: 'none' }}>
        <motion.div animate={hop} className="hop"><Frog {...JINI} /></motion.div>
      </motion.div>

      <header className="intro">
        <h1>Hi, we're Jini &amp; Juju!</h1>
        <p className="tag">A magician and a singer from Lotus Pad Pond</p>
        <p className="hint">✨ Move your cursor to make Jini hop · Tap Juju to hear him sing</p>
      </header>
      <a className="scroll-hint" href="#meet"><i /><span>Scroll to explore</span></a>
    </div>
  )
}
