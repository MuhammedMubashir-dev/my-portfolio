import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function AnimatedArrow({ className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ x: 0 }}
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <ArrowRight size={18} strokeWidth={2} />
    </motion.div>
  )
}
