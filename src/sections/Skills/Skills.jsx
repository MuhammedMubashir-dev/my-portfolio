import { motion, useReducedMotion } from "framer-motion"
import { Smartphone, Monitor, Plug, Wrench } from "lucide-react"
import { skills } from "../../data/skills"

const icons = { "Flutter & Dart": Smartphone, "React & Next.js": Monitor, Integrations: Plug, "Engineering Tools": Wrench }

export default function Skills() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="skills" className="section-shell">
      <div className="section-container">
        <div className="work-heading">
          <div><p className="section-kicker">SKILLS</p><h2>Flutter at the core.<br /><span className="accent">Web experience alongside.</span></h2></div>
          <p>The tools behind my work in mobile, POS, and commerce applications.</p>
        </div>
        <div className="skills-focused-grid">
          {skills.map((group, index) => {
            const Icon = icons[group.category]
            return (
              <motion.article key={group.category} className={`focused-skill ${index === 0 ? "focused-skill-primary" : ""}`}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
                <div className="focused-skill-top"><Icon size={22} aria-hidden="true" /><span>{index === 0 ? "PRIMARY FOCUS" : index === 1 ? "SECONDARY STRENGTH" : "IN PRACTICE"}</span></div>
                <h3>{group.category}</h3><p>{group.summary}</p>
                <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
