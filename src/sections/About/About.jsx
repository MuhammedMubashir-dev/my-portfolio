import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, FileCheck2, Languages, MapPin, Network } from "lucide-react"
import { profile } from "../../data/profile"
import ProfileAvatar from "./ProfileAvatar"

const principles = [
  {
    icon: Network,
    title: "Define the API contract first",
    text: "I align with backend developers on request and response structures before building screens, and verify endpoints directly whenever behavior is unexpected.",
  },
  {
    icon: FileCheck2,
    title: "Handle incomplete data deliberately",
    text: "Pagination, duplicate records, and stale responses are handled explicitly and covered by regression tests before a release.",
  },
  {
    icon: Languages,
    title: "Build for every user's language",
    text: "I deliver English, Arabic, and Malayalam interfaces with right-to-left layouts across point-of-sale, storefront, and delivery products.",
  },
]

const facts = ["Open to remote and on-site Flutter roles", "Available immediately", "Speaks English and Malayalam"]

export default function About() {
  const reducedMotion = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.4, delay: reducedMotion ? 0 : delay },
  })
  return (
    <section id="about" className="section-shell about-section">
      <div className="section-container">
        <motion.div className="work-heading" {...reveal()}>
          <div><p className="section-kicker">02 / ABOUT</p><h2>How I work</h2></div>
          <p>What a product team can expect from me, from API contract to release.</p>
        </motion.div>
        <div className="about-summary-grid mt-9 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
          <motion.div {...reveal(0.04)}>
            <ProfileAvatar />
          </motion.div>
          <motion.div className="about-summary-copy" {...reveal(0.08)}>
            <p className="about-name">{profile.name}</p>
            <p className="about-role">{profile.role} · {profile.company}</p>
            <p className="about-intro mt-5">My primary focus is <mark>Flutter mobile</mark> and <mark>point-of-sale</mark> applications, with supporting React Native and React/Next.js experience.</p>
            <ul className="about-stack" aria-label="Quick facts">
              <li><MapPin size={12} aria-hidden="true" /> Kerala, India</li>
              {facts.map(fact => <li key={fact}>{fact}</li>)}
            </ul>
            <a href="#contact" className="about-contact">Get in touch <ArrowUpRight size={16} /></a>
          </motion.div>
        </div>
        <div className="about-strengths">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <motion.article key={title} className="about-strength" {...reveal(0.06 + index * 0.05)}>
              <div className="about-strength-top">
                <span className="about-strength-icon"><Icon size={18} aria-hidden="true" /></span>
                <span className="about-strength-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
