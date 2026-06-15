import { motion } from "framer-motion"
import { Bug as BugIcon } from "lucide-react"
import { useBugContext } from "../../context/BugContext"

export default function Bug({ id, className = "" }) {
  const { squashedBugs, squashBug } = useBugContext()
  const isSquashed = squashedBugs.includes(id)

  if (isSquashed) {
    return null // Could also render a squashed splat, but removing is cleaner
  }

  return (
    <motion.button
      type="button"
      onClick={() => squashBug(id)}
      className={`absolute z-10 text-[var(--muted)] opacity-20 hover:opacity-100 transition-opacity cursor-crosshair ${className}`}
      aria-label="Squash bug"
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.5, rotate: -45, opacity: 0 }}
      animate={{
        y: [0, -3, 0, 3, 0],
        x: [0, 2, 0, -2, 0],
      }}
      transition={{
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        x: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
      }}
    >
      <BugIcon size={16} strokeWidth={1.5} />
    </motion.button>
  )
}
