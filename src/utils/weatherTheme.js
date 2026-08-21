/**
 * Maps OpenWeatherMap's "main" condition group + whether it's currently
 * day or night into a visual theme for the SkyBackground.
 *
 * This is the single source of truth for "what does this weather look
 * like", so both the background gradient and the motif (sun / rain /
 * snow / clouds) stay in sync with whatever the API returns.
 */

const THEMES = {
  Clear: {
    label: 'clear',
    day: { gradient: ['#7fb8e6', '#e8a94c'], motif: 'sun' },
    night: { gradient: ['#131a2b', '#2c3a5e'], motif: 'stars' },
  },
  Clouds: {
    label: 'cloudy',
    day: { gradient: ['#9db3cc', '#c7d2e0'], motif: 'clouds' },
    night: { gradient: ['#1c2438', '#3a4560'], motif: 'clouds' },
  },
  Rain: {
    label: 'rain',
    day: { gradient: ['#4c6b8a', '#3e7cb1'], motif: 'rain' },
    night: { gradient: ['#0f1626', '#243652'], motif: 'rain' },
  },
  Drizzle: {
    label: 'drizzle',
    day: { gradient: ['#6683a3', '#a9c1d6'], motif: 'rain' },
    night: { gradient: ['#141c2e', '#2b3a54'], motif: 'rain' },
  },
  Thunderstorm: {
    label: 'storm',
    day: { gradient: ['#2c3550', '#5b6b8c'], motif: 'storm' },
    night: { gradient: ['#0a0e1a', '#1e2436'], motif: 'storm' },
  },
  Snow: {
    label: 'snow',
    day: { gradient: ['#c9d6e3', '#eef1f6'], motif: 'snow' },
    night: { gradient: ['#232c42', '#4a5978'], motif: 'snow' },
  },
  Mist: {
    label: 'hazy',
    day: { gradient: ['#b7bfc9', '#dfe3e8'], motif: 'fog' },
    night: { gradient: ['#1a2030', '#3a4152'], motif: 'fog' },
  },
}

// OpenWeatherMap groups Mist, Smoke, Haze, Fog, Dust, Sand, Ash,
// Squall and Tornado slightly differently, but visually they read the same.
const FALLBACK_GROUP = {
  Smoke: 'Mist',
  Haze: 'Mist',
  Fog: 'Mist',
  Dust: 'Mist',
  Sand: 'Mist',
  Ash: 'Mist',
  Squall: 'Thunderstorm',
  Tornado: 'Thunderstorm',
}

export function isDaytime(currentUnix, sunriseUnix, sunsetUnix) {
  if (!currentUnix || !sunriseUnix || !sunsetUnix) return true
  return currentUnix >= sunriseUnix && currentUnix < sunsetUnix
}

export function getWeatherTheme(conditionMain, isDay) {
  const key = THEMES[conditionMain] ? conditionMain : FALLBACK_GROUP[conditionMain] || 'Clear'
  const theme = THEMES[key]
  const variant = isDay ? theme.day : theme.night
  return { label: theme.label, isDay, ...variant }
}

export const DEFAULT_THEME = { label: 'clear', isDay: true, gradient: ['#7fb8e6', '#e8a94c'], motif: 'sun' }
