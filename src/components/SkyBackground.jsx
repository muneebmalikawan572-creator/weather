import { useMemo } from 'react'

/**
 * Full-bleed backdrop that reads as "the sky outside the station window".
 * Its gradient and motif (sun rays / clouds / rain streaks / snow / stars)
 * are entirely driven by the theme computed from live weather data.
 */
export default function SkyBackground({ theme }) {
  const { gradient, motif, isDay } = theme
  const gradientId = 'sky-gradient'

  const rainStreaks = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({
      x: (i * 37) % 100,
      delay: (i % 7) * 0.18,
      duration: 0.7 + (i % 5) * 0.12,
    })),
    []
  )

  const snowDots = useMemo(
    () => Array.from({ length: 34 }, (_, i) => ({
      x: (i * 29) % 100,
      delay: (i % 9) * 0.5,
      duration: 6 + (i % 6),
      r: 1.4 + (i % 3) * 0.6,
    })),
    []
  )

  const stars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      x: (i * 53) % 100,
      y: (i * 31) % 60,
      delay: (i % 10) * 0.3,
      r: 0.5 + (i % 3) * 0.4,
    })),
    []
  )

  return (
    <div className="sky-background" aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gradientId})`} />

        {motif === 'sun' && isDay && (
          <g className="sun-rays" transform="translate(82%, 18%)">
            <circle r="46" fill="#fff7e6" opacity="0.9" />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect
                key={i}
                x="-2.5"
                y="-96"
                width="5"
                height="30"
                rx="2.5"
                fill="#fff2d6"
                opacity="0.55"
                transform={`rotate(${i * 36})`}
              />
            ))}
          </g>
        )}

        {motif === 'stars' && (
          <g className="stars">
            {stars.map((s, i) => (
              <circle
                key={i}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={s.r}
                fill="#f4f1e8"
                style={{ animationDelay: `${s.delay}s` }}
              />
            ))}
          </g>
        )}

        {motif === 'clouds' && (
          <g className="drifting-clouds" fill={isDay ? '#ffffff' : '#5b6b8c'} opacity={isDay ? 0.55 : 0.35}>
            <g className="cloud cloud-a" transform="translate(-10%, 22%)">
              <ellipse cx="0" cy="0" rx="60" ry="22" />
              <ellipse cx="35" cy="-10" rx="40" ry="24" />
            </g>
            <g className="cloud cloud-b" transform="translate(-10%, 50%)">
              <ellipse cx="0" cy="0" rx="46" ry="18" />
              <ellipse cx="28" cy="-8" rx="30" ry="18" />
            </g>
          </g>
        )}

        {(motif === 'rain' || motif === 'storm') && (
          <g className="rain" stroke={isDay ? '#e8f1f8' : '#8fa9c4'} strokeWidth="2" strokeLinecap="round">
            {rainStreaks.map((drop, i) => (
              <line
                key={i}
                x1={`${drop.x}%`}
                y1="-5%"
                x2={`${drop.x - 2}%`}
                y2="12%"
                style={{ animationDelay: `${drop.delay}s`, animationDuration: `${drop.duration}s` }}
              />
            ))}
          </g>
        )}

        {motif === 'snow' && (
          <g className="snow" fill={isDay ? '#ffffff' : '#eef1f6'}>
            {snowDots.map((flake, i) => (
              <circle
                key={i}
                cx={`${flake.x}%`}
                cy="-5%"
                r={flake.r}
                style={{ animationDelay: `${flake.delay}s`, animationDuration: `${flake.duration}s` }}
              />
            ))}
          </g>
        )}

        {motif === 'fog' && (
          <g className="fog-bands" fill={isDay ? '#ffffff' : '#c9d2e0'} opacity="0.4">
            <rect x="0" y="30%" width="100%" height="6%" />
            <rect x="0" y="45%" width="100%" height="5%" />
            <rect x="0" y="60%" width="100%" height="7%" />
          </g>
        )}
      </svg>
    </div>
  )
}
