import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { useState } from "react"
import useBugContext from "../../context/useBugContext"

function Completion({ onReplay }) {
  const [dismissed, setDismissed] = useState(false)
  const reducedMotion = useReducedMotion()
  return (
    <AnimatePresence>
      {!dismissed && <motion.aside className="bug-toast" aria-label="Bug hunt completed"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        <button type="button" className="bug-toast-close" aria-label="Dismiss bug hunt message" onClick={() => setDismissed(true)}><X size={15} /></button>
        <div role="status"><strong><CheckCircle2 size={20} /> All bugs squashed.</strong><p>3 out of 3. Thanks for giving my portfolio a little quality assurance.</p></div>
        <div className="bug-toast-actions"><button type="button" onClick={onReplay}>Play again</button><a href="#contact" onClick={() => setDismissed(true)}>Let’s build something ↗</a></div>
      </motion.aside>}
    </AnimatePresence>
  )
}

export default function BugCelebration() {
  const { squashedBugs, totalBugs, resetBugs } = useBugContext()
  return squashedBugs.length === totalBugs ? <Completion onReplay={resetBugs} /> : null
}
