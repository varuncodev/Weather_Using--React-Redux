import { motion } from 'framer-motion'

/**
 * A glowing sun with slowly rotating rays, positioned upper-right.
 * Purely decorative — sits behind the glass UI.
 */
export default function Sun() {
  const rays = Array.from({ length: 12 })

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        top: '8%',
        right: '10%',
        width: 180,
        height: 180,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* Glow halo */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -60,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,201,60,0.55) 0%, rgba(255,201,60,0.12) 55%, rgba(255,201,60,0) 75%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating rays */}
      <motion.svg
        viewBox="0 0 200 200"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        <g stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" opacity="0.55">
          {rays.map((_, i) => {
            const angle = (360 / rays.length) * i
            const rad = (angle * Math.PI) / 180
            const x1 = 100 + Math.cos(rad) * 70
            const y1 = 100 + Math.sin(rad) * 70
            const x2 = 100 + Math.cos(rad) * 92
            const y2 = 100 + Math.sin(rad) * 92
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </g>
      </motion.svg>

      {/* Core disc */}
      <div
        style={{
          position: 'absolute',
          inset: 46,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #FFE9A8, #FFC93C 60%, #F2A93C 100%)',
          boxShadow: '0 0 40px 6px rgba(255,201,60,0.6)',
        }}
      />
    </motion.div>
  )
}
