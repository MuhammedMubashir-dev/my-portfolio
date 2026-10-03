import { motion, useInView, useReducedMotion, useScroll } from "framer-motion"
import { BriefcaseBusiness } from "lucide-react"
import { useRef } from "react"
import Bug from "../../components/shared/Bug"
import BrandIcon from "../../components/shared/BrandIcon"
import { profile } from "../../data/profile"

const timelineNodes = [
  {
    id: 3, title: profile.role, date: "Jul 2026 – Present",
    description: "Developing mobile and web features across ENKE's company products.",
    bullets: [
      "EPOSMOB: billing, inventory, purchases, Day Close, filtered reports, validated exports, and bilingual printing.",
      "Connect App: LinkedIn authentication on Android/iOS, native modules, deferred deep links, and regression tests.",
      "Supporting commerce work: tenant-aware payment integration and React/Next.js storefront features.",
    ],
    brands: ["Flutter", "React Native", "Next.js"], tags: ["POS & mobile applications"],
  },
  {
    id: 1, title: "Full Stack Developer Trainee", date: "Apr – Jul 2026",
    description: "Contributed to existing Flutter and Next.js applications while working with backend developers on API integration.",
    bullets: [
      "Implemented Flutter interfaces and REST API integration for pickup and delivery workflows.",
      "Built shared React/Next.js components and contributed to company storefront development.",
    ],
    brands: ["Flutter", "Next.js"], tags: ["API integration", "Commerce & logistics"],
  },
]
function ExperienceRow({ node }) {
  const rowRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const revealed = useInView(rowRef, { once: true, amount: 0.15 })
  const visible = reducedMotion || revealed
  return (
    <li ref={rowRef} className={`experience-row ${node.id === 3 ? "experience-promotion" : ""}`}>
      <span className={`experience-dot ${visible ? "is-revealed" : ""}`} aria-hidden="true"><span /></span>
      <motion.div className="experience-date" initial={false} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }} transition={{ duration: reducedMotion ? 0 : 0.4 }}>{node.date}</motion.div>
      <motion.article className="experience-copy" initial={false} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }} transition={{ duration: reducedMotion ? 0 : 0.55 }}>
        {node.id === 3 && <span className="experience-milestone">CURRENT ROLE</span>}
        <h3>{node.title}</h3>
        <p className="experience-description">{node.description}</p>
        <ul className="experience-bullets">{node.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
        <div className="experience-tags">
          {node.brands.map(brand => <span key={brand}><BrandIcon name={brand} size={14} />{brand}</span>)}
          {node.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </motion.article>
    </li>
  )
}
export default function Experience() {
  const timelineRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 75%"] })
  return (
    <section id="experience" className="section-shell experience-section">
      <div className="section-container">
        <div className="work-heading experience-heading">
          <div><p className="section-kicker">EMPLOYMENT</p><h2>Professional experience</h2></div>
          <p>From trainee to {profile.role}, building across company products since April 2026.</p>
        </div>
        <div className="experience-company"><BriefcaseBusiness size={19} aria-hidden="true" /><div><strong>{profile.company}</strong><span>Apr 2026 – Present · Kerala, India</span></div></div>
        <div ref={timelineRef} className="experience-timeline">
          <div className="experience-track" aria-hidden="true"><motion.div className="experience-progress" style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} /></div>
          <ol className="experience-rows">{timelineNodes.map(node => <ExperienceRow key={node.id} node={node} />)}</ol>
        </div>
      </div>
      <Bug id="exp-bug" className="bottom-8 right-6" />
    </section>
  )
}
