import { useCallback, useState } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

/**
 * Encapsulates all weather-fetching state (data / loading / error) so
 * components only ever deal with the result, not the request lifecycle.
 */
export function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (city) => {
    const trimmed = city.trim()
    if (!trimmed) {
      setError('Type a city name to look it up.')
      return
    }

    if (!API_KEY) {
      setError('Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(trimmed)}&units=metric&appid=${API_KEY}`
      const response = await fetch(url)

      if (response.status === 404) {
        throw new Error(`We couldn't find "${trimmed}". Check the spelling and try again.`)
      }
      if (response.status === 401) {
        throw new Error('That API key was rejected. Double-check VITE_OPENWEATHER_API_KEY.')
      }
      if (!response.ok) {
        throw new Error('The weather station is not responding right now. Try again shortly.')
      }

      const json = await response.json()
      setData(json)
    } catch (err) {
      setData(null)
      setError(
        err instanceof TypeError
          ? 'No connection reached the weather station. Check your network.'
          : err.message
      )
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchWeather }
}
