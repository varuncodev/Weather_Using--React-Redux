import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import Loader from '../components/Loader'
import { searchCity } from '../store/weatherActions'

export default function Home() {
  const dispatch = useDispatch()
  const { status, error, place, current, daily } = useSelector((s) => s.weather)

  useEffect(() => {
    // Load a pleasant default city on first mount.
    if (status === 'idle') dispatch(searchCity('Bengaluru'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="center-col"
      style={{ minHeight: '100dvh', padding: '48px 20px 60px', gap: 4 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 26, marginBottom: 20, fontWeight: 600 }}
      >
        Skyline
      </motion.h1>

      <SearchBar />

      {status === 'loading' && <Loader />}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-strong mono"
          style={{ marginTop: 28, padding: '14px 20px', color: '#ffd1d1', maxWidth: 420, textAlign: 'center' }}
        >
          {error}
        </motion.p>
      )}

      {status === 'success' && current && (
        <WeatherCard place={place} current={current} daily={daily} />
      )}
    </div>
  )
}
