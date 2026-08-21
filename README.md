# Skyline — Weather Station

A responsive React weather app that lets you search any city and reads back
live conditions from OpenWeatherMap: temperature, condition, humidity, wind,
and an animated sky that reflects the actual weather and time of day.

## Design concept

The app is framed as a small personal weather station: you "log" a city, and
the instrument panel reads back what its sensors found. The background is a
full-bleed sky gradient that is computed from the API response — clear skies
get sun rays or stars depending on day/night, clouds drift slowly, rain and
snow animate, and storms get a darker, moodier palette. Numbers that behave
like sensor readings (humidity, wind, pressure) are set in a monospace font
to look like a data readout, while the city name and temperature are set in
a warm serif for contrast.

## Tech stack

- React 18 + Vite
- Plain CSS (design tokens as CSS variables in `src/index.css`)
- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
- No UI framework/component library — everything is hand-built to keep the
  bundle small and the design distinctive.

## Project structure

```
src/
  components/
    SearchBar.jsx        # controlled input + submit button
    WeatherCard.jsx       # main readout: temp, condition, humidity, wind...
    WeatherIcon.jsx        # small line-art SVG icon per condition
    SkyBackground.jsx      # signature animated background (sun/rain/snow/…)
    LoadingState.jsx       # spinner shown while fetching
    ErrorState.jsx         # friendly error message for failed lookups
  hooks/
    useWeather.js           # fetch + loading/error/data state, reusable
  utils/
    weatherTheme.js         # maps API condition + day/night -> visual theme
  App.jsx                    # composition root: owns the search flow
  App.css                    # layout, component styling, animations
  index.css                  # global design tokens (colors, type, resets)
```

### Why it's split this way

- **`useWeather` hook** keeps all fetch/loading/error logic in one reusable
  place, so `App.jsx` only has to call `fetchWeather(city)` and render based
  on `{ data, loading, error }`. This also makes the fetch logic easy to
  unit test or swap for a different API later.
- **`weatherTheme.js`** is the single source of truth for "what should this
  weather *look* like". Both `SkyBackground` and `WeatherIcon` consume the
  same theme object, so the background and the icon never disagree with
  each other.
- **Presentational components** (`WeatherCard`, `SearchBar`, `LoadingState`,
  `ErrorState`) take plain props and hold no fetch logic themselves, so they
  stay reusable and easy to reason about independently of the API.

## Setup

1. **Get an API key** from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
   (free tier is enough). New keys can take a few minutes to activate.

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Add your API key**

   Copy `.env.example` to `.env` and paste in your key:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_OPENWEATHER_API_KEY=your_real_key_here
   ```

4. **Run it locally**

   ```bash
   npm run dev
   ```

   Then open the printed local URL (usually `http://localhost:5173`).

5. **Build for production**

   ```bash
   npm run build
   npm run preview   # optional: preview the production build locally
   ```

## Deploying (Vercel example)

1. Push this project to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output
   directory: `dist`.
4. Add an environment variable in the Vercel project settings:
   `VITE_OPENWEATHER_API_KEY` = your OpenWeatherMap key.
5. Deploy. (Netlify works the same way — build command `npm run build`,
   publish directory `dist`, same environment variable.)

## Error handling covered

- Empty search submitted → inline validation message, no request made.
- City not found (API 404) → friendly "we couldn't find that city" message.
- Invalid/missing API key (API 401 / not configured) → explicit message
  telling you to check `.env`.
- Network failure (offline, DNS, etc.) → distinct "no connection" message.
- Any other non-OK response → generic "station not responding" fallback.

All error states are rendered in place of the weather card so the layout
never breaks or jumps.

## Notes on the API

The free OpenWeatherMap "Current Weather" endpoint is used
(`/data/2.5/weather`), queried by city name with `units=metric`. The
response's `dt`, `sys.sunrise`, and `sys.sunset` fields are used to decide
whether it's currently day or night at the searched city, which feeds into
the sky theme.
