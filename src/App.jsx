import { useSelector } from 'react-redux'
import WeatherBackground from './components/WeatherBackground'
import Home from './pages/Home'

export default function App() {
  const current = useSelector((s) => s.weather.current)

  const condition = current?.condition ?? 'clear'
  const isDay = current?.isDay ?? true

  return (
    <>
      <WeatherBackground condition={condition} isDay={isDay} />
      <Home />
    </>
  )
}
