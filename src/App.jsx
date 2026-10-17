import { useEffect, useRef, useState } from 'react'
import Sky from './components/Sky.jsx'
import Scenery from './components/Scenery.jsx'
import Pond from './components/Pond.jsx'
import Frog from './components/Frog.jsx'
import './App.css'

const MODES = [['day', '☀️'], ['night', '🌙'], ['rain', '🌧️'], ['autumn', '🍂'], ['spring', '🌸']]

const PROJECTS = [
  { icon: '🎵', name: 'Rain Xylophone', text: 'Every raindrop is a note. Juju composes tiny tunes that make the pond hum.' },
  { icon: '🍃', name: 'Leaf Hotel', text: 'Six cosy leaves for tired bugs, each with its own name, bed and bedtime rule.' },
  { icon: '💦', name: 'Puddle Splash Lab', text: 'A lab for jumping, splashing and measuring the perfect puddle ripple.' },
]

const STORY = [
  { icon: '💧', title: 'A drop on a leaf', text: 'On the first rainy day of spring, a tiny drop slid down a big green leaf and landed in the pond. Plip! A tadpole opened his eyes.' },
  { icon: '🐸', title: 'Learning to hop', text: 'He wiggled, he wobbled, then grew two legs. His first hop landed him on the wrong leaf. His second landed him in a puddle. He loved it.' },
  { icon: '🌸', title: 'Meeting Jini', text: 'One evening a frog with a pink bow was counting fireflies by the river. "Want to count with me?" she asked. Juju forgot how to hop.' },
  { icon: '🌙', title: 'Rain music', text: 'Now they share the pond. Jini tends the flowers, Juju writes songs from the rain, and every night the moon peeks down to listen.' },
]

function Scene({ item }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.25 })
    o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return (
    <article ref={ref} className={`card scene ${on ? 'in' : ''}`}>
      <span className="big">{item.icon}</span>
      <div><h3>{item.title}</h3><p>{item.text}</p></div>
    </article>
  )
}

export default function App() {
  const [mode, setMode] = useState('day')
  useEffect(() => { document.documentElement.dataset.mode = mode }, [mode])

  return (
    <>
      <nav className="nav">
        <a className="brand" href="#home">🐸 Jini &amp; Juju</a>
        <div className="links">
          <a href="#meet">Meet</a><a href="#work">Work</a><a href="#story">Story</a>
        </div>
        <div className="modes" role="group" aria-label="Pond mood">
          {MODES.map(([m, e]) => (
            <button key={m} className={m === mode ? 'on' : ''} aria-pressed={m === mode} aria-label={`${m} mode`} title={m} onClick={() => setMode(m)}>{e}</button>
          ))}
        </div>
      </nav>

      <section id="home" className="hero">
        <Sky mode={mode} />
        <Scenery mode={mode} />
        <header className="intro">
          <h1>Hi, we're Jini &amp; Juju!</h1>
          <p className="role">Two little frogs from Lotus Pad Valley</p>
          <p className="hint">Move your cursor around the pond and watch Juju hop. Psst… Jini loves being tapped.</p>
        </header>
        <Pond />
      </section>

      <main className="page">
        <section id="meet" className="block">
          <h2>Meet the frogs</h2>
          <div className="grid two">
            <article className="card who">
              <div className="avatar"><Frog /></div>
              <h3>Juju</h3>
              <p><b>Species:</b> Pond frog, 3 months old</p>
              <p><b>Personality:</b> Bouncy, curious, a bit scared of thunder but in love with rain.</p>
              <p><b>Quirk:</b> Hops whenever he is happy, which is always.</p>
              <p><b>Voice:</b> Tiny and squeaky. Says "ribbit-bloop".</p>
              <p><b>Job:</b> Junior Raindrop Composer at the Lotus Pad Lab.</p>
            </article>
            <article className="card who">
              <div className="avatar"><Frog body="#b9e8a0" belly="#f0fcde" feet="#9fd486" bow /></div>
              <h3>Jini</h3>
              <p><b>Species:</b> Meadow frog, a lighter shade of green</p>
              <p><b>Personality:</b> Calm, kind, notices everything.</p>
              <p><b>Quirk:</b> Wears a pink bow and counts fireflies.</p>
              <p><b>Voice:</b> Soft and sing-song.</p>
              <p><b>Job:</b> Head Gardener of the pond.</p>
            </article>
          </div>
        </section>

        <section id="work" className="block">
          <h2>What Juju makes</h2>
          <div className="grid three">
            {PROJECTS.map((p) => (
              <article key={p.name} className="card proj">
                <span className="big">{p.icon}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="block">
          <h2>Their story</h2>
          <div className="story">{STORY.map((s) => <Scene key={s.title} item={s} />)}</div>
        </section>

        <footer>Made with 💚 for Baby's First Website</footer>
      </main>
    </>
  )
}
