import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { useState } from "react"
import useBugContext from "../../context/useBugContext"

const colors = ["#FF7A2F", "#10B981", "#61dafb", "#E5E7EB"]

const particles = Array.from({ length: 50 }, (_, index) => {
  const seed = index + 1

  return {
    id: index,
    x: (seed * 37) % 100,
    y: (seed * 53) % 100,
    scale: 0.5 + ((seed * 17) % 50) / 100,
    color: colors[seed % colors.length],
    delay: ((seed * 7) % 50) / 100,
    duration: 2 + ((seed * 11) % 20) / 10,
  }
})

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: "50vw",
            y: "100vh",
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            scale: particle.scale,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: particle.color }}
        />
      ))}
    </div>
  )
}

export default function BugCelebration() {
  const { squashedBugs, totalBugs } = useBugContext()
  const [dismissed, setDismissed] = useState(false)
  const show = squashedBugs.length === totalBugs && !dismissed

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-md"
        >
          <Confetti />
          
          <motion.div 
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
            className="relative z-10 text-center px-6 max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.4 }}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--success)]/20 mb-8"
            >
              <CheckCircle2 size={48} className="text-[var(--success)]" strokeWidth={2} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-4"
            >
              Easter Egg Found ({totalBugs}/{totalBugs} Bugs Squashed)
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Quality Assurance Complete. Let's Build.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-lg text-[var(--muted)]"
            >
              You've successfully debugged this portfolio. I'm ready to bring this level of attention to detail to your next project.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setDismissed(true)}
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[var(--muted)] hover:text-white transition-colors"
            >
              <X size={16} />
              Return to Portfolio
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
