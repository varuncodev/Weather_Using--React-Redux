import { useMemo } from 'react'

export default function Snow({ count = 60 }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 3,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 6,
        drift: `${Math.random() * 80 - 40}px`,
        opacity: Math.random() * 0.5 + 0.5,
      })),
    [count],
  )

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            '--drift': f.drift,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
