import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import BrandIcon from "../../components/shared/BrandIcon"
import { achievements } from "../../data/achievements"

export default function Achievements() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="achievements" className="section-shell impact-section">
      <div className="section-container">
        <motion.div className="work-heading" initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.4 }}>
          <div><p className="section-kicker">PROJECT CONTRIBUTIONS</p><h2>Selected contributions</h2></div>
          <p>Development work across company products, with links to the project details.</p>
        </motion.div>
        <div className="contribution-grid">
          {achievements.map((item, index) => (
            <motion.article key={item.id} className="contribution-card" initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.4, delay: reducedMotion ? 0 : (index % 2) * 0.04 }}>
              <div className="contribution-project"><BrandIcon name={item.brand} size={21} /><span>{item.project}</span></div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <p>{item.contribution}</p>
              <div className="contribution-stack">{item.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
              <a href={`#project-${item.projectId}`} className="evidence-link">View project details <ArrowUpRight size={15} /><span className="sr-only"> · {item.project}</span></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
