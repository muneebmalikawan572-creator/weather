import { useMemo, useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import SkyBackground from './components/SkyBackground'
import { useWeather } from './hooks/useWeather'
import { DEFAULT_THEME, getWeatherTheme, isDaytime } from './utils/weatherTheme'
import './App.css'

export default function App() {
  const { data, loading, error, fetchWeather } = useWeather()
  const [lastQuery, setLastQuery] = useState('')

  function handleSearch(city) {
    setLastQuery(city)
    fetchWeather(city)
  }

  const theme = useMemo(() => {
    if (!data) return DEFAULT_THEME
    const day = isDaytime(data.dt, data.sys?.sunrise, data.sys?.sunset)
    return getWeatherTheme(data.weather?.[0]?.main, day)
  }, [data])

  return (
    <div className={`app app--${theme.label}`}>
      <SkyBackground theme={theme} />

      <main className="panel">
        <p className="eyebrow">Skyline · Weather Station</p>
        <SearchBar onSearch={handleSearch} disabled={loading} />

        <div className="panel__result">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && data && <WeatherCard data={data} theme={theme} />}
          {!loading && !error && !data && (
            <div className="panel-state panel-state--idle">
              <p>No reading yet.</p>
              <p className="idle-hint">Search a city to open its station log{lastQuery ? '' : '.'}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
