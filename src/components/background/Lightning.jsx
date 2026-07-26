import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Lightning() {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    let timeout
    const scheduleNext = () => {
      const wait = Math.random() * 5000 + 2500 // every 2.5s - 7.5s
      timeout = setTimeout(() => {
        setFlash(true)
        setTimeout(() => setFlash(false), 180)
        scheduleNext()
      }, wait)
    }
    scheduleNext()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          className="lightning-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.09 }}
        />
      )}
    </AnimatePresence>
  )
}
