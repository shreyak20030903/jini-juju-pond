const S = (p) => <svg viewBox="0 0 24 24" aria-hidden="true" {...p} />

export const SunI = () => <S><circle cx="12" cy="12" r="5" fill="#ffd84d" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="12" y1="2.5" x2="12" y2="5" stroke="#ffd84d" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />)}</S>
export const MoonI = () => <S><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="#ffe27a" /></S>
export const RainI = () => <S><path d="M7 15a4.5 4.5 0 0 1 .6-8.9A5.5 5.5 0 0 1 18 8a3.5 3.5 0 0 1-.5 7z" fill="#eaf5ff" stroke="#8fc6f5" strokeWidth="1" />{[8, 12, 16].map((x) => <line key={x} x1={x} y1="17.5" x2={x - 1.2} y2="21" stroke="#4aa3f0" strokeWidth="2" strokeLinecap="round" />)}</S>
export const LeafI = () => <S><path d="M5 19C4 10 10 4 20 4c0 10-6 16-15 15z" fill="#ff9a3c" /><path d="M5 19L15 9" stroke="#b85a10" strokeWidth="1.6" strokeLinecap="round" /></S>
export const BlossomI = () => <S>{[0, 72, 144, 216, 288].map((a) => <circle key={a} cx="12" cy="6.5" r="4" fill="#ff9ec4" transform={`rotate(${a} 12 12)`} />)}<circle cx="12" cy="12" r="2.6" fill="#ffd84d" /></S>
export const SpeakerI = ({ on }) => (
  <S fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
    {on ? <><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a8 8 0 0 1 0 11" /></> : <><path d="M16 9.5l5 5" /><path d="M21 9.5l-5 5" /></>}
  </S>
)
export const MailI = () => <S fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></S>
export const InstaI = () => <S fill="none" stroke="currentColor" strokeWidth="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></S>
export const LogoI = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="22" r="15" fill="#7ed957" /><circle cx="11" cy="10" r="7" fill="#7ed957" /><circle cx="29" cy="10" r="7" fill="#7ed957" />
    <circle cx="11" cy="10" r="4.6" fill="#fff" /><circle cx="29" cy="10" r="4.6" fill="#fff" /><circle cx="12" cy="10.5" r="2.4" fill="#2b2118" /><circle cx="28" cy="10.5" r="2.4" fill="#2b2118" />
    <path d="M13 26q7 6 14 0" fill="none" stroke="#2b2118" strokeWidth="2.2" strokeLinecap="round" /><circle cx="8.5" cy="23" r="3" fill="#ff8fb8" opacity=".6" /><circle cx="31.5" cy="23" r="3" fill="#ff8fb8" opacity=".6" />
  </svg>
)
