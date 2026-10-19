import { useEffect, useRef, useState } from 'react'
import Scene from './components/Scene.jsx'
import Frog, { JINI, JUJU } from './components/Frog.jsx'
import Flutter from './components/Flutter.jsx'
import Work from './components/Work.jsx'
import Gallery from './components/Gallery.jsx'
import Guestbook from './components/Guestbook.jsx'
import { SunI, MoonI, RainI, LeafI, BlossomI, SpeakerI, MailI, InstaI, LogoI } from './components/Icons.jsx'
import { setSound, ambient, sfx } from './audio.js'
import './App.css'

// Fill these two in. The footer icons only appear once they are set.
const EMAIL = 'shreyakushwaha1173@gmail.com'
const INSTAGRAM = 'https://www.instagram.com/_auspiciousk_/'

const MODES = [['day', SunI, 'Day'], ['night', MoonI, 'Night'], ['rain', RainI, 'Rain'], ['autumn', LeafI, 'Autumn'], ['spring', BlossomI, 'Spring']]
const SOUNDS = { hop: sfx.hop, chime: sfx.chime, sing: sfx.sing, splash: sfx.splash }

const STORY = [
  { title: 'The quiet pond', tag: 'plip… plip…', s: 'hop', text: 'Lotus Pad Pond was the prettiest pond in the valley, but it was very, very quiet. No songs, no sparkles, only the plip of the rain. On two different leaves, two little frogs were wishing for the very same thing: something to happen.' },
  { title: "Jini's first spark", art: 'g1', tag: 'POOF!', s: 'chime', text: 'One rainy evening, Jini caught a raindrop on her fingertip and whispered a wish. POOF! It turned into a glowing lantern and floated away. Jini gasped. She was a magician! Her second spell made a puddle giggle. Her third made a butterfly sneeze.' },
  { title: 'The shy singer', art: 'g2', tag: 'la la la ♪', s: 'sing', text: 'On the next leaf, Juju had been humming for years, so softly that even the fish could not hear. Then Jini’s sparkles touched his song and every note turned into a glowing music note. Juju took a deep breath and sang. The moon blushed.' },
  { title: 'The great thunderstorm', art: 'g3', tag: 'BOOM!', s: 'splash', text: 'One night the sky rumbled. BOOM! Juju squeaked and hid behind his hands. Jini grabbed a giant leaf and made an umbrella for two. “Sing something,” she whispered. So he did, and the thunder got so curious it forgot to be scary.' },
  { title: 'Sunrise surprise', art: 'g4', tag: 'hop, hop, splash!', s: 'hop', text: 'The storm was gone and the morning was golden. Jini and Juju raced across the lily pads, hop, splash, hop, splash, with a butterfly leading the way. Nobody won. Everybody laughed.' },
  { title: 'The lantern festival', art: 'g5', tag: 'ooooh ✨', s: 'chime', text: 'That night, every friend in the pond came to watch: the koi, the fireflies, the bluebird, even the shy dragonfly. Jini lit a thousand lanterns and Juju sang them up to the stars. Lotus Pad Pond has never been quiet since.' },
]

function Trail() {
  const [p, setP] = useState([])
  const last = useRef(0)
  useEffect(() => {
    const move = (e) => {
      const t = performance.now()
      if (t - last.current < 45) return
      last.current = t
      setP((a) => [...a.slice(-12), { id: t, x: e.clientX, y: e.clientY, c: ['✨', '⭐', '💫'][Math.floor(t) % 3] }])
      setTimeout(() => setP((a) => a.filter((s) => s.id !== t)), 700)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <>{p.map((s) => <i key={s.id} className="trail" style={{ left: s.x, top: s.y }}>{s.c}</i>)}</>
}

// A small Jini who hops along the bottom of the page while you scroll.
function Buddy() {
  const [pos, setPos] = useState(0)
  const [hop, setHop] = useState(false)
  useEffect(() => {
    let t
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPos(max > 0 ? window.scrollY / max : 0)
      setHop(true)
      clearTimeout(t)
      t = setTimeout(() => setHop(false), 450)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])
  return <div className={`buddy ${hop ? 'hopping' : ''}`} style={{ left: `calc(${pos} * (100vw - 96px) + 6px)` }}><Frog {...JINI} /></div>
}

function StoryCard({ item, n }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const [tap, setTap] = useState(0)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.25 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return (
    <article ref={ref} className={`card scene ${on ? 'in' : ''}`}>
      <figure className={`art ${tap ? (tap % 2 ? 'w1' : 'w2') : ''}`} style={{ '--tilt': `${n % 2 ? -1.5 : 1.5}deg` }} onClick={() => { SOUNDS[item.s](); setTap((t) => t + 1) }}>
        {item.art ? <img src={`/img/${item.art}.webp`} alt={item.title} loading="lazy" draggable="false" /> : <div className="art-frogs"><Frog {...JINI} /><Frog {...JUJU} /></div>}
        <span className="pop">{item.tag}</span>
        <figcaption>tap me ✨</figcaption>
      </figure>
      <div><span className="num">Chapter {n}</span><h3>{item.title}</h3><p>{item.text}</p></div>
    </article>
  )
}

export default function App() {
  const [mode, setMode] = useState('day')
  const [sound, setSnd] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const Cur = MODES.find(([m]) => m === mode)[1]
  useEffect(() => { document.documentElement.dataset.mode = mode; ambient(mode) }, [mode, sound])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 140)
    const onClick = (e) => { if (!e.target.closest('.mode-dd')) setMenu(false); if (e.target.closest('button, a')) sfx.click() }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick)
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('click', onClick) }
  }, [])
  const toggle = () => { const v = !sound; setSound(v); setSnd(v); if (v) sfx.chime() }

  return (
    <>
      <div className="bg" aria-hidden="true"><div className="hero-bg" /><div className="tint" /></div>
      <Trail />
      <Buddy />
      <nav className={`nav ${scrolled ? 'light' : ''}`}>
        <a className="brand" href="#home"><LogoI /><span>Jini &amp; Juju</span></a>
        <div className="links"><a href="#meet">Meet</a><a href="#work">Work</a><a href="#story">Story</a><a href="#gallery">Gallery</a><a href="#guestbook">Guestbook</a></div>
        <button className={`ibtn snd ${sound ? 'on' : ''}`} onClick={toggle} aria-pressed={sound} aria-label={sound ? 'Turn sound off' : 'Turn sound on'} title={sound ? 'Sound on' : 'Sound off'}><SpeakerI on={sound} /></button>
        <div className="mode-dd">
          <button className="dd-btn" onClick={() => setMenu((m) => !m)} aria-haspopup="listbox" aria-expanded={menu}><Cur /><span>{mode}</span> ▾</button>
          {menu && <ul className="dd-list" role="listbox">{MODES.map(([m, Icon, l]) => <li key={m}><button className={m === mode ? 'on' : ''} onClick={() => { setMode(m); setMenu(false) }}><Icon /> {l}</button></li>)}</ul>}
        </div>
        <div className="modes" role="group" aria-label="Pond mood">
          {MODES.map(([m, Icon, l]) => <button key={m} className={m === mode ? 'on' : ''} aria-pressed={m === mode} aria-label={`${l} mode`} title={l} onClick={() => setMode(m)}><Icon /><span>{l}</span></button>)}
        </div>
      </nav>

      <section id="home"><Scene mode={mode} /></section>

      <main className="page">
        <section id="meet" className="block">
          <Flutter n={3} seed={1} />
          <h2>Meet the frogs <small>Two little friends, big dreams.</small></h2>
          <div className="grid two">
            <article className="card who">
              <div className="portrait"><Frog {...JINI} /></div>
              <div>
                <h3>Jini</h3>
                <p><b>Species:</b> Pink magician frog</p>
                <p><b>Personality:</b> Playful, curious, a little bit of a show-off.</p>
                <p><b>Quirk:</b> Cannot sneeze without making sparkles.</p>
                <p><b>Voice:</b> Bubbly and sing-song.</p>
                <p><b>Job:</b> Junior Wish Maker. She turns raindrops into tiny wishes.</p>
                <div className="chips pink"><span>Magical</span><span>Curious</span><span>Playful</span></div>
              </div>
            </article>
            <article className="card who">
              <div className="portrait"><Frog {...JUJU} /></div>
              <div>
                <h3>Juju</h3>
                <p><b>Species:</b> Green pond frog</p>
                <p><b>Personality:</b> Gentle, shy, dreamy, secretly Jini's biggest fan.</p>
                <p><b>Quirk:</b> Hums when he is nervous.</p>
                <p><b>Voice:</b> Warm and slow. Says "ribbit".</p>
                <p><b>Job:</b> Pond Singer. He sings lullabies to the lotus flowers.</p>
                <div className="chips"><span>Musical</span><span>Gentle</span><span>Brave</span></div>
              </div>
            </article>
          </div>
        </section>

        <section id="work" className="block">
          <Flutter n={3} seed={3} />
          <h2>What they make <small>Little creations for a happier pond. Try them!</small></h2>
          <Work />
        </section>

        <section id="story" className="block">
          <Flutter n={2} seed={5} />
          <h2>Their story <small>A journey of friendship, magic and music.</small></h2>
          <div className="story">{STORY.map((s, i) => <StoryCard key={s.title} item={s} n={i + 1} />)}</div>
        </section>

        <section id="gallery" className="block">
          <Flutter n={3} seed={7} />
          <h2>Gallery <small>Some moments from our adventures.</small></h2>
          <Gallery />
        </section>

        <section id="guestbook" className="block">
          <h2>Guestbook <small>Leave a little note for the frogs.</small></h2>
          <Guestbook />
        </section>

        <footer>
          <p>Thank you for visiting our little magical world! 💚</p>
          <p className="by">Made by <b>Shreya Kushwaha</b></p>
          <div className="social">
            {EMAIL && <a href={`mailto:${EMAIL}`} aria-label="Email Shreya"><MailI /></a>}
            {INSTAGRAM && <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Shreya on Instagram"><InstaI /></a>}
          </div>
        </footer>
      </main>
    </>
  )
}
