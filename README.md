# Skyline — Weather App

A React + Vite weather app with a living, glassmorphic sky: the background
continuously animates a sun, drifting clouds, rain, snow, or a starry night
depending on the real weather at the searched location.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## Notes

- Weather data comes from **Open-Meteo** (`services/weatherService.js`) —
  free, no API key needed. `.env` has a slot (`VITE_OWM_API_KEY`) if you'd
  rather switch to OpenWeatherMap later.
- State is managed with **Redux + React-Redux + Redux-Thunk**:
  - `store/index.js` — store setup with the thunk middleware
  - `store/actionTypes.js` — action type constants
  - `store/weatherActions.js` — thunk action creators (`searchCity`, `useMyLocation`)
  - `store/weatherReducer.js` / `store/rootReducer.js` — reducers
  - Components read state via `useSelector((s) => s.weather...)` and dispatch
    thunks via `useDispatch()`.
- Animations use **Framer Motion** for the sun/moon/clouds/glass UI, and
  lightweight CSS keyframes for rain/snow/stars (cheaper for many particles).
- `components/WeatherBackground.jsx` is the orchestrator — it picks a sky
  gradient + animation layer from `condition` (`clear/cloudy/rain/snow/storm/fog`)
  and `isDay`, cross-fading smoothly whenever the weather changes.
- Default city on load is Bengaluru — change it in `pages/Home.jsx`.
