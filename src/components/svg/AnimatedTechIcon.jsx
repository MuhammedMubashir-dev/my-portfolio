import { motion } from "framer-motion"

export default function AnimatedTechIcon({ icon: Icon, className = "" }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Icon size={24} strokeWidth={2} />
    </motion.div>
  )
}
