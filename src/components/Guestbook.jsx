import { useEffect, useState } from 'react'
import Frog, { JINI } from './Frog.jsx'
import { sfx } from '../audio.js'

const KEY = 'jj-guestbook'
const SEED = [
  { id: 's1', name: 'Jini', text: 'Welcome to our pond! Leave us a note and I will sprinkle a little magic on it.' },
  { id: 's2', name: 'Juju', text: 'Ribbit. I am singing your name right now. La la la.' },
  { id: 's3', name: 'The Moon', text: 'I am smiling down at every note you write.' },
]
const COLORS = ['#fff3b8', '#ffd9e8', '#d4f5d0', '#d6ecff']

const load = () => { try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : [] } catch { return [] } }

export default function Guestbook() {
  const [notes, setNotes] = useState([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  useEffect(() => { setNotes(load()) }, [])

  const send = (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) { setErr('Please write your name and a little message.'); return }
    const n = { id: String(Date.now()), name: name.trim().slice(0, 24), text: text.trim().slice(0, 140) }
    const next = [n, ...notes].slice(0, 30)
    setNotes(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage can be blocked */ }
    setName(''); setText(''); setErr('')
    sfx.chime()
  }
  const all = [...notes, ...SEED]
  return (
    <div className="gb">
      <form className="card gb-form" onSubmit={send}>
        <div className="peek"><Frog {...JINI} /></div>
        <h3>Leave a little note ✉️</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={24} aria-label="Your name" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your message…" maxLength={140} rows={3} aria-label="Your message" />
        {err && <small className="err">{err}</small>}
        <button className="btn" type="submit">Send note 💌</button>
        <small>Notes are saved in your own browser.</small>
      </form>
      <div className="notes">
        {all.map((n, i) => (
          <div key={n.id} className="sticky" style={{ background: COLORS[i % 4], '--tilt': `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` }}>
            <p>{n.text}</p><b>— {n.name}</b>
          </div>
        ))}
      </div>
    </div>
  )
}
