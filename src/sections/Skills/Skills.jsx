import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import BrandIcon from "../../components/shared/BrandIcon"
import { skills } from "../../data/skills"

export default function Skills() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.45, delay: reducedMotion ? 0 : delay },
  })
  return (
    <section id="skills" className="section-shell skills-section">
      <div className="section-container">
        <motion.div className="work-heading" {...reveal()}>
          <div><p className="section-kicker">05 / SKILLS</p><h2>Technical skills</h2></div>
          <p>Flutter and React Native mobile development, with React and Next.js web experience and product integrations.</p>
        </motion.div>
        <div className="skills-list">
          {skills.map((group, index) => (
            <motion.article key={group.category} className="skill-group" {...reveal((index % 2) * 0.05)}>
              <div className="skill-group-head">
                <div className="skill-brand-pair">{group.brands.map(brand => <BrandIcon key={brand} name={brand} size={22} />)}</div>
                <div><h3>{group.category}</h3><span>{group.label}</span></div>
              </div>
              <p>{group.summary}</p>
              <ul className="skill-items">{group.items.map(item => <li key={item}><BrandIcon name={item} size={12} />{item}</li>)}</ul>
              <a href={`#project-${group.projectId}`} className="skill-project-link"><span>APPLIED IN</span><strong>{group.appliedIn}</strong><ArrowUpRight size={16} aria-hidden="true" /></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
