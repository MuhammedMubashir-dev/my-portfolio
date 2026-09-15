import { motion, useReducedMotion } from "framer-motion"
import { Bug as BugIcon } from "lucide-react"
import useBugContext from "../../context/useBugContext"

export default function Bug({ id, className = "" }) {
  const { squashedBugs, squashBug } = useBugContext()
  const reducedMotion = useReducedMotion()
  const isSquashed = squashedBugs.includes(id)

  if (isSquashed) {
    return null // Could also render a squashed splat, but removing is cleaner
  }

  return (
    <motion.button
      type="button"
      onClick={() => squashBug(id)}
      className={`bug-target ${className}`}
      aria-label={`Squash bug in ${id.split("-")[0] === "proj" ? "projects" : id.split("-")[0] === "exp" ? "experience" : "hero"}`}
      title="Found a bug? Squash it."
      whileHover={{ scale: 1.2, rotate: 15 }}
      whileTap={{ scale: 0.5, rotate: -45, opacity: 0 }}
      animate={reducedMotion ? {} : {
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
