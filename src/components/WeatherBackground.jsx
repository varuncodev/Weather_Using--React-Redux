import { AnimatePresence, motion } from 'framer-motion'
import Sun from './background/Sun'
import Moon from './background/Moon'
import Stars from './background/Stars'
import Clouds from './background/Clouds'
import Rain from './background/Rain'
import Snow from './background/Snow'
import Lightning from './background/Lightning'

const GRADIENTS = {
  'clear-day': 'linear-gradient(160deg, #2E86DE 0%, #6DC5F0 55%, #BFE6F5 100%)',
  'clear-night': 'linear-gradient(160deg, #060A17 0%, #131B36 55%, #1B2A4A 100%)',
  'cloudy-day': 'linear-gradient(160deg, #5B7A99 0%, #8CA3B8 60%, #C4D0DA 100%)',
  'cloudy-night': 'linear-gradient(160deg, #1B2432 0%, #2A3342 60%, #3E4A5F 100%)',
  'rain-day': 'linear-gradient(160deg, #3B4A5C 0%, #55697D 55%, #7C93A8 100%)',
  'rain-night': 'linear-gradient(160deg, #10151F 0%, #202B3B 55%, #2E3D50 100%)',
  'snow-day': 'linear-gradient(160deg, #8FA3B8 0%, #C3D2DF 60%, #E7EEF3 100%)',
  'snow-night': 'linear-gradient(160deg, #1B2536 0%, #2C3B52 60%, #445269 100%)',
  'storm-day': 'linear-gradient(160deg, #201933 0%, #332748 55%, #3F3252 100%)',
  'storm-night': 'linear-gradient(160deg, #100C1C 0%, #201933 55%, #2C2340 100%)',
  'fog-day': 'linear-gradient(160deg, #8B96A3 0%, #A9B4BF 55%, #C7CFD6 100%)',
  'fog-night': 'linear-gradient(160deg, #12151C 0%, #232933 55%, #333C46 100%)',
}

/**
 * WeatherBackground renders a full-viewport, continuously-alive sky:
 * a gradient that cross-fades between weather states, plus the
 * relevant animated layer (sun/moon/stars, clouds, rain, snow, lightning).
 *
 * condition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm' | 'fog'
 * isDay: boolean
 */
export default function WeatherBackground({ condition = 'clear', isDay = true }) {
  const key = `${condition}-${isDay ? 'day' : 'night'}`
  const gradient = GRADIENTS[key] ?? GRADIENTS['clear-day']

  return (
    <div className="weather-bg">
      <AnimatePresence mode="sync">
        <motion.div
          key={key}
          className="weather-bg__gradient"
          style={{ background: gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Celestial layer */}
      {isDay && (condition === 'clear' || condition === 'cloudy') && <Sun />}
      {!isDay && (
        <>
          <Stars />
          {(condition === 'clear' || condition === 'cloudy') && <Moon />}
        </>
      )}

      {/* Cloud layer */}
      {['cloudy', 'rain', 'snow', 'storm', 'fog'].includes(condition) && (
        <Clouds dim={!isDay || condition === 'storm'} />
      )}

      {/* Precipitation */}
      {condition === 'rain' && <Rain intensity={90} />}
      {condition === 'storm' && (
        <>
          <Rain intensity={130} />
          <Lightning />
        </>
      )}
      {condition === 'snow' && <Snow count={70} />}

      {/* Fog veil */}
      {condition === 'fog' && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(0deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 40%)',
          }}
        />
      )}

      {/* Subtle vignette so glass UI stays readable everywhere */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.28) 100%)',
        }}
      />
    </div>
  )
}
