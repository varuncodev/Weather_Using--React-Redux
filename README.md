# 🌤  React-Redux — Weather App

A React + Redux weather app with a living animated sky — dynamic sun, drifting clouds, rain, snow & night mode, wrapped in glassmorphism UI.

The background continuously animates based on real weather conditions at the searched location, cross-fading smoothly between sun, clouds, rain, snow, storms, and starry nights.

---

## ✨ Features

- 🌅 **Dynamic weather background** — gradient + animation layer changes based on live conditions
- ☀️ Animated sun with rotating rays and glow
- ☁️ Drifting clouds at multiple depths/speeds
- 🌧 Rain animation with randomized droplets
- ❄️ Snowfall with drifting flakes
- ⛈ Thunderstorm with random lightning flashes
- 🌙 Night mode with moon and twinkling stars
- 🔍 Search any city, or use your current location
- 📅 5-day forecast
- 🧊 Glassmorphism UI with Framer Motion animations

---

## 🛠 Tech Stack

- **React** + **Vite**
- **Redux**, **React-Redux**, **Redux-Thunk** — state management
- **Framer Motion** — animations
- **Axios** — API calls
- **Open-Meteo API** — free weather & geocoding data, no API key required

---

## 📦 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
weather-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── background/       # Sun, Moon, Stars, Clouds, Rain, Snow, Lightning
│   │   ├── WeatherBackground.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── Loader.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── weatherService.js # Open-Meteo API calls
│   ├── store/
│   │   ├── index.js          # Redux store + thunk middleware
│   │   ├── actionTypes.js
│   │   ├── weatherActions.js # Thunk action creators
│   │   ├── weatherReducer.js
│   │   └── rootReducer.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── weatherCodes.js   # WMO weather code → condition mapping
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

---

## 🔑 Environment Variables

No API key is required by default (Open-Meteo is free). `.env` has a slot ready in case you switch to OpenWeatherMap:

```env
VITE_OWM_API_KEY=
VITE_APP_NAME="Skyline Weather"
```

---

## 📝 Notes

- Default city on first load is Bengaluru — change it in `src/pages/Home.jsx`.
- Rain/snow/stars use lightweight CSS keyframes instead of Framer Motion (cheaper for many particles at once).
- `WeatherBackground.jsx` picks the gradient + animation layer from the current `condition` (`clear` / `cloudy` / `rain` / `snow` / `storm` / `fog`) and `isDay` flag.

---

## 📄 License

MIT — free to use and modify.
