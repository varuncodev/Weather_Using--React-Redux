// Maps Open-Meteo's WMO weather codes to a simplified condition
// used by WeatherBackground to decide which animation to render.
// https://open-meteo.com/en/docs (WMO Weather interpretation codes)

const TABLE = {
  0: { label: 'Clear sky', condition: 'clear', icon: '☀️' },
  1: { label: 'Mostly clear', condition: 'clear', icon: '🌤' },
  2: { label: 'Partly cloudy', condition: 'cloudy', icon: '⛅' },
  3: { label: 'Overcast', condition: 'cloudy', icon: '☁️' },
  45: { label: 'Fog', condition: 'fog', icon: '🌫' },
  48: { label: 'Rime fog', condition: 'fog', icon: '🌫' },
  51: { label: 'Light drizzle', condition: 'rain', icon: '🌦' },
  53: { label: 'Drizzle', condition: 'rain', icon: '🌦' },
  55: { label: 'Dense drizzle', condition: 'rain', icon: '🌧' },
  56: { label: 'Freezing drizzle', condition: 'rain', icon: '🌧' },
  57: { label: 'Freezing drizzle', condition: 'rain', icon: '🌧' },
  61: { label: 'Slight rain', condition: 'rain', icon: '🌦' },
  63: { label: 'Rain', condition: 'rain', icon: '🌧' },
  65: { label: 'Heavy rain', condition: 'rain', icon: '🌧' },
  66: { label: 'Freezing rain', condition: 'rain', icon: '🌧' },
  67: { label: 'Freezing rain', condition: 'rain', icon: '🌧' },
  71: { label: 'Slight snow', condition: 'snow', icon: '🌨' },
  73: { label: 'Snow', condition: 'snow', icon: '❄️' },
  75: { label: 'Heavy snow', condition: 'snow', icon: '❄️' },
  77: { label: 'Snow grains', condition: 'snow', icon: '❄️' },
  80: { label: 'Slight showers', condition: 'rain', icon: '🌦' },
  81: { label: 'Showers', condition: 'rain', icon: '🌧' },
  82: { label: 'Violent showers', condition: 'storm', icon: '⛈' },
  85: { label: 'Slight snow showers', condition: 'snow', icon: '🌨' },
  86: { label: 'Heavy snow showers', condition: 'snow', icon: '❄️' },
  95: { label: 'Thunderstorm', condition: 'storm', icon: '⛈' },
  96: { label: 'Thunderstorm w/ hail', condition: 'storm', icon: '⛈' },
  99: { label: 'Thunderstorm w/ hail', condition: 'storm', icon: '⛈' },
}

export function describeWeatherCode(code) {
  return TABLE[code] ?? { label: 'Unknown', condition: 'cloudy', icon: '☁️' }
}
