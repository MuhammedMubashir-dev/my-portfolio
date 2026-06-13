import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function SectionAccent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.8 })

  return (
    <svg
      ref={ref}
      className="section-accent"
      width="72"
      height="12"
      viewBox="0 0 72 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="6"
        x2="56"
        y2="6"
        stroke="rgba(246, 242, 232, 0.16)"
        strokeWidth="1"
      />
      <motion.line
        className={`section-accent-line ${isInView ? "is-visible" : ""}`}
        x1="0"
        y1="6"
        x2="56"
        y2="6"
        stroke="#FF7A2F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.circle
        cx="64"
        cy="6"
        r="4"
        fill="#FF7A2F"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.55, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
