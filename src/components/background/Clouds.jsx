import { motion } from 'framer-motion'

const CloudShape = ({ fill, opacity }) => (
  <svg viewBox="0 0 200 100" width="100%" height="100%" style={{ display: 'block' }}>
    <g fill={fill} opacity={opacity}>
      <ellipse cx="60" cy="60" rx="45" ry="28" />
      <ellipse cx="100" cy="45" rx="55" ry="35" />
      <ellipse cx="145" cy="60" rx="40" ry="26" />
      <rect x="45" y="55" width="120" height="35" rx="17" />
    </g>
  </svg>
)

// depth: farther clouds are smaller, dimmer, slower
const LAYERS = [
  { top: '12%', width: 160, duration: 70, opacity: 0.35, fill: '#ffffff', delay: 0 },
  { top: '22%', width: 220, duration: 55, opacity: 0.5, fill: '#ffffff', delay: -15 },
  { top: '8%', width: 130, duration: 90, opacity: 0.28, fill: '#ffffff', delay: -40 },
  { top: '30%', width: 190, duration: 62, opacity: 0.45, fill: '#eef3f8', delay: -25 },
]

export default function Clouds({ tint = '#ffffff', dim = false }) {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: layer.top,
            width: layer.width,
            height: layer.width * 0.5,
          }}
          initial={{ x: '-30vw' }}
          animate={{ x: '130vw' }}
          transition={{
            duration: layer.duration,
            delay: layer.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <CloudShape fill={dim ? '#aab6c4' : tint} opacity={layer.opacity} />
        </motion.div>
      ))}
    </div>
  )
}
