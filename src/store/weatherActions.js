import {
  WEATHER_REQUEST,
  WEATHER_SUCCESS,
  WEATHER_FAILURE,
  WEATHER_RESET,
} from './actionTypes'
import {
  fetchWeather,
  fetchWeatherByCity,
  getBrowserLocation,
} from '../services/weatherService'
import { describeWeatherCode } from '../utils/weatherCodes'

const weatherRequest = () => ({ type: WEATHER_REQUEST })

const weatherSuccess = (payload) => ({ type: WEATHER_SUCCESS, payload })

const weatherFailure = (error) => ({ type: WEATHER_FAILURE, error })

export const resetWeather = () => ({ type: WEATHER_RESET })

/**
 * Shapes the raw Open-Meteo response into what the UI needs.
 */
function buildPayload(place, weather) {
  const c = weather.current
  const desc = describeWeatherCode(c.weather_code)

  const daily = weather.daily.time.map((date, i) => {
    const d = describeWeatherCode(weather.daily.weather_code[i])
    return {
      date,
      max: Math.round(weather.daily.temperature_2m_max[i]),
      min: Math.round(weather.daily.temperature_2m_min[i]),
      condition: d.condition,
      icon: d.icon,
      label: d.label,
    }
  })

  return {
    place,
    current: {
      temp: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      wind: Math.round(c.wind_speed_10m),
      isDay: c.is_day === 1,
      condition: desc.condition,
      icon: desc.icon,
      label: desc.label,
    },
    daily,
  }
}

/**
 * Thunk: resolve a city name, fetch its forecast, dispatch the result.
 */
export const searchCity = (query) => async (dispatch) => {
  if (!query?.trim()) return
  dispatch(weatherRequest())
  try {
    const { place, weather } = await fetchWeatherByCity(query.trim())
    dispatch(weatherSuccess(buildPayload(place, weather)))
  } catch (err) {
    dispatch(weatherFailure(err.message || 'Something went wrong'))
  }
}

/**
 * Thunk: use the browser's geolocation, fetch its forecast, dispatch the result.
 */
export const useMyLocation = () => async (dispatch) => {
  dispatch(weatherRequest())
  try {
    const coords = await getBrowserLocation()
    const weather = await fetchWeather(coords)
    const place = {
      name: 'Your location',
      country: '',
      latitude: coords.latitude,
      longitude: coords.longitude,
    }
    dispatch(weatherSuccess(buildPayload(place, weather)))
  } catch (err) {
    dispatch(weatherFailure(err.message || 'Could not get your location'))
  }
}
