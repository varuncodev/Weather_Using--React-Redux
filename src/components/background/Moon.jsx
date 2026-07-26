import { motion } from 'framer-motion'

export default function Moon() {
  return (
    <motion.div
      aria-hidden
      style={{ position: 'absolute', top: '10%', right: '12%', width: 120, height: 120 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: -40,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,236,241,0.35) 0%, rgba(232,236,241,0.08) 60%, rgba(232,236,241,0) 75%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 20,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #FDFEFF, #E8ECF1 60%, #C9D2DC 100%)',
          boxShadow: '0 0 30px 4px rgba(232,236,241,0.45)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgba(180,190,200,0.5)',
            top: 18,
            left: 22,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'rgba(180,190,200,0.4)',
            top: 44,
            left: 46,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'rgba(180,190,200,0.4)',
            top: 20,
            left: 55,
          }}
        />
      </div>
    </motion.div>
  )
}
