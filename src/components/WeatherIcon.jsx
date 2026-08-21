/**
 * Small, self-contained line-art icon per condition group. Kept separate
 * from SkyBackground's motifs: this one has to read clearly at instrument-
 * panel size, not fill an entire viewport.
 */
export default function WeatherIcon({ motif, isDay, className }) {
  const stroke = 'currentColor'
  const common = { fill: 'none', stroke, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

  switch (motif) {
    case 'sun':
      return isDay ? (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="24" r="10" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4
            const x1 = 24 + Math.cos(angle) * 16
            const y1 = 24 + Math.sin(angle) * 16
            const x2 = 24 + Math.cos(angle) * 21
            const y2 = 24 + Math.sin(angle) * 21
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </svg>
      ) : (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M30 8a16 16 0 1 0 10 28 12 12 0 0 1-10-28Z" />
        </svg>
      )
    case 'clouds':
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M14 32a8 8 0 1 1 2-15.8A10 10 0 0 1 35 20a7 7 0 0 1-2 12H14Z" />
        </svg>
      )
    case 'rain':
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M14 26a8 8 0 1 1 2-15.8A10 10 0 0 1 35 14a7 7 0 0 1-2 12H14Z" />
          <line x1="17" y1="34" x2="14" y2="41" />
          <line x1="25" y1="34" x2="22" y2="41" />
          <line x1="33" y1="34" x2="30" y2="41" />
        </svg>
      )
    case 'storm':
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M14 24a8 8 0 1 1 2-15.8A10 10 0 0 1 35 12a7 7 0 0 1-2 12H14Z" />
          <path d="M25 30l-6 10h6l-4 8" />
        </svg>
      )
    case 'snow':
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M14 24a8 8 0 1 1 2-15.8A10 10 0 0 1 35 12a7 7 0 0 1-2 12H14Z" />
          <line x1="18" y1="34" x2="18" y2="42" />
          <line x1="14" y1="38" x2="22" y2="38" />
          <line x1="30" y1="34" x2="30" y2="42" />
          <line x1="26" y1="38" x2="34" y2="38" />
        </svg>
      )
    case 'fog':
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <line x1="8" y1="18" x2="40" y2="18" />
          <line x1="12" y1="24" x2="36" y2="24" />
          <line x1="8" y1="30" x2="40" y2="30" />
          <line x1="12" y1="36" x2="36" y2="36" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="24" r="10" />
        </svg>
      )
  }
}
