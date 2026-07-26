import { motion } from 'framer-motion'

const dayLabel = (dateStr, i) => {
  if (i === 0) return 'Today'
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export default function WeatherCard({ place, current, daily }) {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        width: '100%',
        maxWidth: 460,
        padding: '32px 28px',
        marginTop: 28,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            {place?.name}
            {place?.country ? `, ${place.country}` : ''}
          </h2>
          <p className="mono" style={{ margin: '4px 0 0', color: 'var(--ink-dim)', fontSize: 13 }}>
            {current.label}
          </p>
        </div>
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
          style={{ fontSize: 46, lineHeight: 1 }}
        >
          {current.icon}
        </motion.span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 18 }}>
        <span className="temp-display" style={{ fontSize: 64, fontWeight: 600 }}>
          {current.temp}°
        </span>
        <span className="mono" style={{ color: 'var(--ink-dim)', fontSize: 14 }}>
          feels like {current.feelsLike}°
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 20,
          marginTop: 18,
          paddingTop: 18,
          borderTop: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <Stat label="Humidity" value={`${current.humidity}%`} />
        <Stat label="Wind" value={`${current.wind} km/h`} />
      </div>

      {daily?.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            marginTop: 24,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          {daily.map((d, i) => (
            <motion.div
              key={d.date}
              className="center-col"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              style={{ gap: 4 }}
            >
              <span className="mono" style={{ fontSize: 12, color: 'var(--ink-faint)' }}>
                {dayLabel(d.date, i)}
              </span>
              <span style={{ fontSize: 22 }}>{d.icon}</span>
              <span style={{ fontSize: 13 }}>
                {d.max}°<span style={{ color: 'var(--ink-faint)' }}>/{d.min}°</span>
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: 16, marginTop: 2 }}>{value}</div>
    </div>
  )
}
