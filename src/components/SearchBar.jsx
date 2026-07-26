import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { searchCity, useMyLocation } from '../store/weatherActions'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const status = useSelector((s) => s.weather.status)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchCity(query))
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-input"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 10px 10px 20px',
        width: '100%',
        maxWidth: 420,
      }}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a city…"
        aria-label="Search a city"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--ink)',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
        }}
      />
      <motion.button
        type="button"
        onClick={() => dispatch(useMyLocation())}
        whileTap={{ scale: 0.9 }}
        title="Use my location"
        aria-label="Use my location"
        style={{
          border: 'none',
          background: 'rgba(255,255,255,0.14)',
          width: 36,
          height: 36,
          borderRadius: '50%',
          cursor: 'pointer',
          color: 'var(--ink)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        📍
      </motion.button>
      <motion.button
        type="submit"
        whileTap={{ scale: 0.92 }}
        disabled={status === 'loading'}
        style={{
          border: 'none',
          background: 'var(--ink)',
          color: '#12213a',
          fontWeight: 600,
          padding: '10px 18px',
          borderRadius: 999,
          cursor: 'pointer',
        }}
      >
        {status === 'loading' ? '…' : 'Search'}
      </motion.button>
    </motion.form>
  )
}
