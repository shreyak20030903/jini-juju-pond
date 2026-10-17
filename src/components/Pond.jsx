import { useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Frog from './Frog.jsx'

// Leaf positions are % of the pond. Leaf 3 is Jini's home.
const LEAVES = [
  { x: 14, y: 66, size: 190, rot: -8 },
  { x: 36, y: 36, size: 210, rot: 10 },
  { x: 58, y: 74, size: 200, rot: -4 },
  { x: 82, y: 40, size: 200, rot: 14 },
  { x: 46, y: 90, size: 150, rot: 6 },
]
const Jini_LEAF = 3

export default function Pond() {
  const pond = useRef(null)
  const busy = useRef(false)
  const hop = useAnimation()
  const [at, setAt] = useState(1)
  const [ripple, setRipple] = useState({ leaf: 1, n: 0 })
  const [taps, setTaps] = useState(0)
  const [hearts, setHearts] = useState(0)

  const nearest = (cx, cy) => {
    const r = pond.current.getBoundingClientRect()
    let best = at
    let bd = Infinity
    LEAVES.forEach((l, i) => {
      if (i === Jini_LEAF) return
      const d = Math.hypot(cx - (r.left + (l.x / 100) * r.width), cy - (r.top + (l.y / 100) * r.height))
      if (d < bd) { bd = d; best = i }
    })
    return best
  }

  const jump = (e) => {
    const i = nearest(e.clientX, e.clientY)
    if (busy.current || i === at) return
    busy.current = true
    setAt(i)
    hop.start({
      y: [0, 8, -120, 0],
      scaleX: [1, 1.12, 0.9, 1.08, 1],
      scaleY: [1, 0.82, 1.15, 0.88, 1],
      transition: { duration: 0.65, times: [0, 0.18, 0.6, 1], ease: 'easeInOut' },
    })
    setTimeout(() => {
      setRipple((p) => ({ leaf: i, n: p.n + 1 }))
      busy.current = false
    }, 650)
  }

  // Easter egg: tap Jini five times
  const tapJini = () => {
    const n = taps + 1
    setTaps(n % 5)
    if (n % 5 === 0) setHearts((h) => h + 1)
  }

  const m = LEAVES[at]
  const Jini = LEAVES[Jini_LEAF]

  return (
    <div className="pond" ref={pond} onPointerMove={jump} onPointerDown={jump}>
      <div className="water" />
      {LEAVES.map((l, i) => (
        <div
          key={i}
          className="leaf"
          style={{ left: `${l.x}%`, top: `${l.y}%`, width: l.size, height: l.size * 0.6, transform: `translate(-50%,-50%) rotate(${l.rot}deg)` }}
        >
          {ripple.leaf === i && ripple.n > 0 && <span key={ripple.n} className="ripple" />}
        </div>
      ))}

      <motion.div className="frog-wrap" initial={false} animate={{ left: `${m.x}%`, top: `${m.y}%` }} transition={{ duration: 0.65, ease: 'easeInOut' }}>
        <motion.div animate={hop} className="frog-hop"><Frog /></motion.div>
      </motion.div>

      <div className="frog-wrap Jini" style={{ left: `${Jini.x}%`, top: `${Jini.y}%` }} onClick={tapJini}>
        <Frog body="#b9e8a0" belly="#f0fcde" feet="#9fd486" bow />
        {hearts > 0 && (
          <div key={hearts} className="hearts">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ '--dx': `${(i - 5) * 18}px`, animationDelay: `${i * 0.06}s` }}>{i % 2 ? '💚' : '💖'}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
