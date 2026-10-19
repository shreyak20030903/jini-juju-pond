import { useRef, useState } from 'react'
import Frog, { JINI, JUJU } from './Frog.jsx'
import { sfx, soundOn } from '../audio.js'

const DROPS = ['#ff8fb8', '#ffb347', '#ffd84d', '#7ed957', '#4fd1c5', '#5aa9ff', '#a78bfa', '#ff7fd1']

function Xylophone() {
  const [hit, setHit] = useState(-1)
  const [msg, setMsg] = useState('')
  const play = (i) => {
    setHit(i)
    setTimeout(() => setHit(-1), 250)
    if (!soundOn()) { setMsg('Sound is off. Tap the speaker at the top to hear the rain!'); return }
    setMsg('')
    sfx.note(i)
  }
  return (
    <article className="card proj xylo">
      <div className="peek"><Frog {...JUJU} /></div>
      <h3>🎵 Rain Xylophone</h3>
      <p>Every raindrop is a note. Tap the drops and play Juju a song!</p>
      <div className="drops">
        {DROPS.map((c, i) => <button key={c} className={hit === i ? 'hit' : ''} style={{ background: `radial-gradient(circle at 35% 30%, #fff, ${c} 60%)` }} onClick={() => play(i)} aria-label={`Note ${i + 1}`} />)}
      </div>
      <small className="msg">{msg || 'Tap the drops ↑'}</small>
    </article>
  )
}

// Type a wish and it floats up inside a lantern.
function Wishes() {
  const [ls, setLs] = useState([])
  const [txt, setTxt] = useState('')
  const [err, setErr] = useState(false)
  const id = useRef(0)
  const wish = (e) => {
    e.preventDefault()
    const t = txt.trim().slice(0, 40)
    if (!t) { setErr(true); return }
    setErr(false)
    setTxt('')
    const k = ++id.current
    setLs((a) => [...a.slice(-3), { k, left: 14 + Math.random() * 54, t }])
    sfx.chime()
    setTimeout(() => setLs((a) => a.filter((l) => l.k !== k)), 4200)
  }
  return (
    <article className="card proj">
      <div className="peek"><Frog {...JINI} /></div>
      <h3>🏮 Wish Lanterns</h3>
      <p>Write a wish. Jini puts it in a lantern and sends it to the stars.</p>
      <div className="sky-box">{ls.map((l) => <span key={l.k} className="lantern" style={{ left: `${l.left}%` }}>🏮<em>{l.t}</em></span>)}</div>
      <form className="wish-form" onSubmit={wish}>
        <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="I wish for…" maxLength={40} aria-label="Your wish" />
        <button className="btn" type="submit">Send ✨</button>
      </form>
      {err && <small className="hint-err">Write a little wish first!</small>}
    </article>
  )
}

// Catch all 8 fireflies.
const make = (k) => ({ k, x: 8 + Math.random() * 82, y: 12 + Math.random() * 70, d: 2.5 + Math.random() * 3 })
function Fireflies() {
  const [fs, setFs] = useState(() => Array.from({ length: 8 }, (_, i) => make(i)))
  const [got, setGot] = useState(0)
  const grab = (k) => { setFs((a) => a.filter((f) => f.k !== k)); setGot((g) => g + 1); sfx.chime() }
  const again = () => { setFs(Array.from({ length: 8 }, (_, i) => make(Date.now() + i))); setGot(0) }
  return (
    <article className="card proj">
      <div className="peek"><Frog {...JINI} /></div>
      <h3>✨ Firefly Catcher</h3>
      <p>The fireflies are playing hide and seek. Can you catch them all?</p>
      <div className="jar">
        {fs.map((f) => <button key={f.k} className="ff" style={{ left: `${f.x}%`, top: `${f.y}%`, animationDuration: `${f.d}s` }} onClick={() => grab(f.k)} aria-label="Catch the firefly" />)}
        {fs.length === 0 && <div className="win"><span>You caught them all! Jini is so proud ✨</span><button className="btn" onClick={again}>Play again</button></div>}
      </div>
      <small className="msg">{got} / 8 caught</small>
    </article>
  )
}

export default function Work() {
  return <div className="grid work"><Xylophone /><Wishes /><Fireflies /></div>
}
