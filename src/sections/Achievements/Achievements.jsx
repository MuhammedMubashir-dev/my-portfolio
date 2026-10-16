import { motion, useReducedMotion } from "framer-motion"
import { metrics, metricsAsOf } from "../../data/achievements"

export default function Achievements() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.4, delay: reducedMotion ? 0 : delay },
  })
  return (
    <section id="achievements" className="section-shell impact-section">
      <div className="section-container">
        <motion.div className="work-heading" {...reveal()}>
          <div><p className="section-kicker">04 / IMPACT</p><h2>Impact in numbers</h2></div>
          <p>Counted from pull requests merged in company repositories, April to {metricsAsOf}.</p>
        </motion.div>
        <ul className="metric-grid">
          {metrics.map((item, index) => (
            <motion.li key={item.id} className="metric-tile" {...reveal(index * 0.04)}>
              <a href={`#project-${item.projectId}`} aria-label={`${item.value} ${item.label}. View the related project.`}>
                <strong>{item.value}</strong>
                <span className="metric-label">{item.label}</span>
                <span className="metric-detail">{item.detail}</span>
                <span className="metric-index" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(metrics.length).padStart(2, "0")}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
