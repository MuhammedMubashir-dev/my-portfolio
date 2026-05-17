// sections/Achievements/Achievements.jsx

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { achievements } from "../../data/achievements"

// ── ANIMATED COUNTER ──
function CountUp({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Parse numeric part and suffix (e.g. "40+" → 40 and "+")
  const numeric = parseInt(value)
  const suffix  = value.replace(/[0-9]/g, "")

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, numeric, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [isInView])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-16 md:py-24 lg:py-32 px-6 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "var(--muted)" }}
          >
            Impact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Numbers backed
            <br />
            <span style={{ color: "var(--accent)" }}>by real work.</span>
          </motion.h2>
        </div>

        {/* STATS GRID */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "1px", background: "var(--border)" }}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-5 md:p-8 lg:p-10 overflow-hidden transition duration-300"
              style={{ background: "var(--bg)" }}
            >

              {/* HOVER GLOW */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 30% 50%, var(--accent-dim) 0%, transparent 70%)",
                }}
              />

              {/* INDEX */}
              <p
                className="text-xs uppercase tracking-widest mb-6 transition duration-300"
                style={{ color: "var(--border)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </p>

              {/* ANIMATED VALUE */}
              <h3
                className="text-6xl md:text-7xl font-bold leading-none mb-4 transition duration-300"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                <CountUp value={item.value} />
              </h3>

              {/* LABEL */}
              <p
                className="text-xs uppercase tracking-widest transition duration-500"
                style={{ color: "var(--muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >
                {item.label}
              </p>

              {/* BOTTOM ACCENT LINE — slides in on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: "var(--accent)" }}
              />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}