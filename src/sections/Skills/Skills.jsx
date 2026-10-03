import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import BrandIcon from "../../components/shared/BrandIcon"
import { skills } from "../../data/skills"

export default function Skills() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="skills" className="section-shell skills-section">
      <div className="section-container">
        <motion.div className="work-heading" initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}>
          <div><p className="section-kicker">TECHNOLOGIES</p><h2>Technical skills</h2></div>
          <p>Flutter and React Native mobile development, with React/Next.js web experience and product integrations.</p>
        </motion.div>
        <div className="skills-focused-grid">
          {skills.map((group, index) => (
            <motion.article key={group.category} className={`focused-skill ${index === 0 ? "focused-skill-primary" : ""}`}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.5, delay: reducedMotion ? 0 : (index % 2) * 0.06 }}>
              <div className="focused-skill-top"><div className="skill-brand-pair">{group.brands.map(brand => <BrandIcon key={brand} name={brand} size={26} />)}</div><span>{group.label}</span></div>
              <h3>{group.category}</h3><p>{group.summary}</p>
              <ul>{group.items.map(item => <li key={item}><BrandIcon name={item} size={14} />{item}</li>)}</ul>
              <a href={`#project-${group.projectId}`} className="skill-project-link"><span>APPLIED IN</span><strong>{group.appliedIn}</strong><ArrowUpRight size={16} aria-hidden="true" /></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
