import { motion, useInView, useReducedMotion, useScroll } from "framer-motion"
import { useRef } from "react"
import Bug from "../../components/shared/Bug"
const timelineNodes = [
  {
    id: 1,
    title: "Full Stack Developer Trainee",
    subtitle: "ENKE Consulting Services LLP",
    date: "Apr 2026",
    description: "Joined ENKE and ramped up on production codebases across Next.js, Flutter, and REST APIs. Built delivery management screens, API integrations, and contributed to the multi-tenant commerce platform from day one.",
  },
  {
    id: 2,
    title: "Multi-Project Delivery",
    subtitle: "5 concurrent client projects",
    date: "Apr – Jul 2026",
    description: "Shipped features across FUNZCART, Ganvin, Juice World, and Luzine Bakes — building theme packs, checkout flows, bilingual storefronts, and logistics workflows in parallel.",
  },
  {
    id: 3,
    title: "Promoted to Jr Application Developer",
    subtitle: "ENKE Consulting Services LLP",
    date: "Jul 2026",
    description: "Promoted after 3 months based on consistent delivery across multiple production applications. Took on EPOSMOB and Connect App, delivering Arabic/RTL product localization, order and inventory workflows, deep linking, and release fixes across the stack.",
  },
  {
    id: 4,
    title: "Full Stack Ownership",
    subtitle: "7+ production applications",
    date: "Present",
    description: "Owning features end-to-end across web and mobile: multi-tenant commerce, POS operations, business networking, and logistics. Recent work includes payments, operational order flows, deep-link reliability, and production release readiness.",
  },
]

function ExperienceRow({ node }) {
  const rowRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const revealed = useInView(rowRef, { once: true, margin: "0px 0px -25% 0px" })
  const visible = reducedMotion || revealed
  const promotion = node.id === 3

  return (
    <li ref={rowRef} className={`experience-row ${promotion ? "experience-promotion" : ""}`}>
      <span className={`experience-dot ${visible ? "is-revealed" : ""}`} aria-hidden="true"><span /></span>
      <motion.div className="experience-date" initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}>
        {node.date}
      </motion.div>
      <motion.div className="experience-copy" initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}>
        {promotion && <span className="experience-milestone">CAREER MILESTONE</span>}
        <h3>{node.title}</h3>
        <p className="experience-employer">{node.subtitle}</p>
        <p className="experience-description">{node.description}</p>
      </motion.div>
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
          <div><p className="section-kicker">EXPERIENCE</p><h2>From trainee to<br /><span className="accent">Jr Application Developer.</span></h2></div>
          <p>Joined ENKE Consulting as a trainee, delivered across production applications, and earned a promotion in three months.</p>
        </div>
        <div ref={timelineRef} className="experience-timeline">
          <div className="experience-track" aria-hidden="true">
            <motion.div className="experience-progress" style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} />
          </div>
          <ol className="experience-rows">{timelineNodes.map(node => <ExperienceRow key={node.id} node={node} />)}</ol>
        </div>
      </div>
      <Bug id="exp-bug" className="bottom-8 right-6" />
    </section>
  )
}
