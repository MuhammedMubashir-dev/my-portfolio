import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import { profile } from "../../data/profile"
import ProfileAvatar from "./ProfileAvatar"

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
          <div><p className="section-kicker">02 / PROFILE</p><h2>About me</h2></div>
          <p>How I approach development and work with a product team.</p>
        </motion.div>
        <div className="about-summary-grid mt-9 grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
          <motion.div {...reveal(0.04)}>
            <ProfileAvatar />
          </motion.div>
          <motion.div className="about-summary-copy" {...reveal(0.08)}>
            <p className="about-name">{profile.name}</p>
            <p className="about-role">{profile.role} · {profile.company}</p>
            <p className="about-intro mt-5">My primary focus is <mark>Flutter mobile</mark> and <mark>point-of-sale</mark> applications, with supporting React Native and React/Next.js experience.</p>
            <p className="about-description">I work with backend developers on API contracts, investigate application issues, and verify changes through regression tests and release checks.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="about-location !mt-0"><MapPin size={15} aria-hidden="true" /> Kerala, India</div>
              <a href="#contact" className="about-contact !mt-0">Contact me <ArrowUpRight size={16} /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
