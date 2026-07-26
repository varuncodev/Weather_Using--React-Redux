import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="center-col" style={{ gap: 12, marginTop: 60 }}>
      <motion.div
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.25)',
          borderTopColor: 'rgba(255,255,255,0.9)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <p className="mono" style={{ color: 'var(--ink-dim)', fontSize: 13 }}>
        Reading the sky…
      </p>
    </div>
  )
}
