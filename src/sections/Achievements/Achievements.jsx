import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import SectionKicker from "../../components/svg/SectionKicker"
import { achievements } from "../../data/achievements"

function CountUp({ value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const numeric = Number.parseInt(value, 10)
  const suffix = value.replace(/[0-9]/g, "")
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    if (!isInView || Number.isNaN(numeric)) return undefined

    const controls = animate(count, numeric, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    })

    return () => controls.stop()
  }, [count, isInView, numeric])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <SectionKicker>Impact</SectionKicker>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.08 }}
          className="section-title"
        >
          Proof from production work, not placeholder numbers.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.14 }}
          className="section-lede"
        >
          A compact snapshot of the work I have been trusted with across live commerce, mobile,
          and business application projects.
        </motion.p>

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="stat-card surface-panel relative p-6"
            >
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                    {item.label}
                  </span>
                  <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-6xl text-[var(--accent)] md:text-7xl">
                  <CountUp value={item.value} />
                </h3>
                <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
