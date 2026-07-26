import { useMemo } from 'react'

export default function Rain({ intensity = 90 }) {
  const drops = useMemo(
    () =>
      Array.from({ length: intensity }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 0.5 + 0.45, // 0.45s - 0.95s
        delay: Math.random() * 2,
        height: Math.random() * 40 + 40,
        opacity: Math.random() * 0.4 + 0.4,
      })),
    [intensity],
  )

  return (
    <div className="rain-layer" aria-hidden>
      {drops.map((d) => (
        <span
          key={d.id}
          className="raindrop"
          style={{
            left: `${d.left}%`,
            height: d.height,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
