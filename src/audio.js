// All sounds are synthesised with the Web Audio API: no audio files needed.
let ctx = null
let on = false
let rain = null

const ensure = () => {
  if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C() }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}
export const soundOn = () => on
export const setSound = (v) => { on = v; if (v) ensure() }

function tone(f, t = 0, d = 0.3, type = 'sine', v = 0.12) {
  if (!on) return
  const c = ensure()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  const s = c.currentTime + t
  o.type = type
  o.frequency.value = f
  g.gain.setValueAtTime(0.0001, s)
  g.gain.exponentialRampToValueAtTime(v, s + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, s + d)
  o.connect(g).connect(c.destination)
  o.start(s)
  o.stop(s + d + 0.05)
}

const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5]
export const sfx = {
  note: (i) => tone(PENTA[i % 8], 0, 0.8, 'triangle', 0.2),
  hop: () => { tone(260, 0, 0.12, 'sine', 0.1); tone(420, 0.08, 0.14, 'sine', 0.08) },
  chime: () => [880, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.08, 0.5, 'sine', 0.07)),
  splash: () => { tone(520, 0, 0.08, 'sine', 0.1); tone(360, 0.06, 0.14, 'sine', 0.08) },
  click: () => tone(660, 0, 0.07, 'square', 0.03),
  sing: () => [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25].forEach((f, i) => { tone(f, i * 0.25, 0.32, 'sine', 0.13); tone(f * 2, i * 0.25, 0.3, 'sine', 0.03) }),
}

// soft rain sound while the rain mode is on
export function ambient(mode) {
  if (rain) { try { rain.stop() } catch { /* already stopped */ } rain = null }
  if (!on || mode !== 'rain') return
  const c = ensure()
  if (!c) return
  const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate)
  const d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  const s = c.createBufferSource()
  const f = c.createBiquadFilter()
  const g = c.createGain()
  s.buffer = b; s.loop = true
  f.type = 'lowpass'; f.frequency.value = 1400
  g.gain.value = 0.05
  s.connect(f).connect(g).connect(c.destination)
  s.start()
  rain = s
}
