import { motion, useReducedMotion } from "framer-motion"
import Bug from "../../components/shared/Bug"
import BrandIcon from "../../components/shared/BrandIcon"
import { profile } from "../../data/profile"

const roles = [
  {
    id: "developer", title: profile.role, date: "Jul 2026 – Present", current: true,
    description: "Responsible for mobile and web feature development across ENKE's product portfolio.",
    bullets: [
      "Developed EPOSMOB point-of-sale features including billing, inventory, purchasing, Day Close, filtered reporting with validated exports, and bilingual receipt printing.",
      "Implemented LinkedIn authentication for the Connect App on Android and iOS, including native modules, deferred deep linking, and regression test coverage.",
      "Contributed tenant-aware payment integration and storefront features to the company's React and Next.js commerce platform.",
    ],
    brands: ["Flutter", "React Native", "Next.js"], tags: ["POS & mobile applications"],
  },
  {
    id: "trainee", title: "Full Stack Developer Trainee", date: "Apr – Jul 2026",
    description: "Contributed to production Flutter and Next.js applications in collaboration with backend developers on API integration.",
    bullets: [
      "Implemented Flutter interfaces and REST API integration for pickup and delivery workflows.",
      "Developed shared React and Next.js components for the company's storefront platform.",
    ],
    brands: ["Flutter", "Next.js"], tags: ["API integration", "Commerce & logistics"],
  },
]

export default function Experience() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.45, delay: reducedMotion ? 0 : delay },
  })
  return (
    <section id="experience" className="section-shell experience-section">
      <div className="section-container">
        <motion.div className="work-heading experience-heading" {...reveal()}>
          <div><p className="section-kicker">03 / EXPERIENCE</p><h2>Professional experience</h2></div>
          <p>From trainee to {profile.role} at {profile.company}, building across company products since April 2026.</p>
        </motion.div>
        <motion.div className="experience-block" {...reveal(0.05)}>
          <div className="experience-block-head"><strong>{profile.company}</strong><span>Apr 2026 – Present · Kerala, India</span></div>
          <ol className="experience-roles">
            {roles.map(role => (
              <li key={role.id} className="experience-role">
                <div className="experience-date">{role.date}{role.current && <span className="experience-milestone">CURRENT ROLE</span>}</div>
                <article className="experience-copy">
                  <h3>{role.title}</h3>
                  <p className="experience-description">{role.description}</p>
                  <ul className="experience-bullets">{role.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
                  <div className="experience-tags">
                    {role.brands.map(brand => <span key={brand}><BrandIcon name={brand} size={14} />{brand}</span>)}
                    {role.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
      <Bug id="exp-bug" className="bottom-8 right-6" />
    </section>
  )
}
