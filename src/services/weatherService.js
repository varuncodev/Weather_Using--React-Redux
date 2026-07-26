import axios from 'axios'

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Resolve a free-text city name into coordinates.
 */
export async function geocodeCity(query) {
  const { data } = await axios.get(GEO_URL, {
    params: { name: query, count: 1, language: 'en', format: 'json' },
  })

  if (!data.results || data.results.length === 0) {
    throw new Error(`No location found for "${query}"`)
  }

  const place = data.results[0]
  return {
    name: place.name,
    country: place.country,
    admin1: place.admin1,
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone,
  }
}

/**
 * Fetch current + hourly + daily conditions for given coordinates.
 */
export async function fetchWeather({ latitude, longitude, timezone }) {
  const { data } = await axios.get(FORECAST_URL, {
    params: {
      latitude,
      longitude,
      timezone: timezone || 'auto',
      current: [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'weather_code',
        'wind_speed_10m',
        'is_day',
      ].join(','),
      hourly: ['temperature_2m', 'weather_code'].join(','),
      daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'].join(','),
      forecast_days: 5,
    },
  })
  return data
}

/**
 * Convenience: resolve a city and fetch its weather in one call.
 */
export async function fetchWeatherByCity(query) {
  const place = await geocodeCity(query)
  const weather = await fetchWeather(place)
  return { place, weather }
}

/**
 * Fetch weather for the browser's geolocation.
 */
export function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => reject(err),
      { timeout: 8000 },
    )
  })
}
