import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function AnimatedSparkle({ className = "" }) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
    >
      <Sparkles size={16} strokeWidth={1.8} />
    </motion.div>
  )
}
