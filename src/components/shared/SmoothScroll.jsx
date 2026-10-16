import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const touchPrimaryPointer = window.matchMedia("(pointer: coarse) and (hover: none)").matches
    if (reducedMotion || touchPrimaryPointer) return undefined

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    const onScreenshotViewer = event => {
      if (event.detail?.open) lenis.stop()
      else lenis.start()
    }
    window.addEventListener('portfolio:screenshot-viewer', onScreenshotViewer)

    return () => {
      window.removeEventListener('portfolio:screenshot-viewer', onScreenshotViewer)
      lenis.destroy()
    }
  }, [reducedMotion])

  return <>{children}</>
}
