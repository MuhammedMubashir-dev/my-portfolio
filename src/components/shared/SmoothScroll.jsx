import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (reducedMotion) return
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard Apple-like ease
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Animation frame loop for Lenis
    let frameId
    function raf(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
