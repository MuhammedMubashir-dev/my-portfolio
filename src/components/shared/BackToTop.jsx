import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
