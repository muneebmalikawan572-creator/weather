import WeatherIcon from './WeatherIcon'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
})

export default function WeatherCard({ data, theme }) {
  const { name, sys, main, weather, wind } = data
  const condition = weather?.[0]
  const localTime = new Date((data.dt + data.timezone) * 1000)
  // dt/timezone are UTC-based; Intl formats in the browser's local zone,
  // so we present it as "station local time" rather than claiming exact TZ.

  return (
    <section className="weather-card" aria-label={`Current weather in ${name}`}>
      <header className="weather-card__header">
        <div>
          <h1>
            {name}
            {sys?.country ? <span className="country">, {sys.country}</span> : null}
          </h1>
          <p className="reading-time">{dateFormatter.format(localTime)} · station local time</p>
        </div>
        <WeatherIcon motif={theme.motif} isDay={theme.isDay} className="weather-card__icon" />
      </header>

      <div className="temperature-block">
        <span className="temperature">{Math.round(main.temp)}°</span>
        <div className="condition-copy">
          <p className="condition">{condition?.description ?? 'Unknown'}</p>
          <p className="feels-like">Feels like {Math.round(main.feels_like)}°C</p>
        </div>
      </div>

      <dl className="readout-grid">
        <div className="readout">
          <dt>Humidity</dt>
          <dd>{main.humidity}%</dd>
        </div>
        <div className="readout">
          <dt>Wind</dt>
          <dd>{wind.speed.toFixed(1)} m/s</dd>
        </div>
        <div className="readout">
          <dt>Pressure</dt>
          <dd>{main.pressure} hPa</dd>
        </div>
        <div className="readout">
          <dt>Low / High</dt>
          <dd>
            {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°
          </dd>
        </div>
      </dl>
    </section>
  )
}
