import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function AnimatedArrowUp({ className = "" }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ArrowUp size={18} strokeWidth={2} />
    </motion.div>
  )
}
