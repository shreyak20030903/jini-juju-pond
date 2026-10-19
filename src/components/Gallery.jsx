import { useEffect, useRef, useState } from 'react'

const PICS = [
  ['g1', "Jini's lantern magic"], ['g2', "Juju's moonlight song"], ['g3', 'One umbrella, two frogs'],
  ['g4', 'Sunrise hop'], ['g5', 'Lantern festival'], ['g6', 'Spring picnic'],
]

export default function Gallery() {
  const strip = useRef(null)
  const [open, setOpen] = useState(-1)
  const go = (d) => setOpen((i) => (i + d + PICS.length) % PICS.length)
  useEffect(() => {
    if (open < 0) return
    const key = (e) => { if (e.key === 'Escape') setOpen(-1); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [open])
  const scroll = (d) => strip.current.scrollBy({ left: d * strip.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div className="gallery">
      <button className="arrow l" onClick={() => scroll(-1)} aria-label="Previous">‹</button>
      <div className="strip" ref={strip}>
        {PICS.map(([f, t], i) => (
          <figure key={f} className="polaroid" style={{ '--tilt': `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` }} onClick={() => setOpen(i)}>
            <img src={`/img/${f}.webp`} alt={t} loading="lazy" draggable="false" />
            <figcaption>{t}</figcaption>
          </figure>
        ))}
      </div>
      <button className="arrow r" onClick={() => scroll(1)} aria-label="Next">›</button>
      {open >= 0 && (
        <div className="lightbox" onClick={() => setOpen(-1)} role="dialog" aria-label="Gallery image">
          <button className="arrow l" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous">‹</button>
          <figure onClick={(e) => e.stopPropagation()}><img src={`/img/${PICS[open][0]}.webp`} alt={PICS[open][1]} /><figcaption>{PICS[open][1]}</figcaption></figure>
          <button className="arrow r" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next">›</button>
          <button className="close" onClick={() => setOpen(-1)} aria-label="Close">✕</button>
        </div>
      )}
    </div>
  )
}
