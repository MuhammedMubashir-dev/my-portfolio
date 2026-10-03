import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, CheckCheck, Code2, MapPin, SearchCheck } from "lucide-react"
import BrandIcon from "../../components/shared/BrandIcon"
import { profile } from "../../data/profile"

const capabilities = [
  { brand: "Flutter", title: "Flutter development", text: "POS, retail reporting, laundry ordering, and staff delivery applications." },
  { brand: "React Native", title: "React Native development", text: "Android/iOS authentication, native modules, and deep-link navigation." },
  { brand: "Next.js", title: "React and Next.js development", text: "Commerce storefronts, reusable themes, localized interfaces, and checkout." },
]
const strengths = [
  { icon: Code2, title: "Feature development", text: "Responsive interfaces, API integration, application state, and error handling." },
  { icon: SearchCheck, title: "Debugging and integration", text: "Investigating requests, payloads, filtering, authentication, and lifecycle issues." },
  { icon: CheckCheck, title: "Testing and release support", text: "Regression tests, layout verification, and Android/iOS release configuration." },
]

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
          <div><p className="section-kicker">PROFILE</p><h2>About me</h2></div>
          <p>Mobile and web development experience across retail, logistics, and business networking.</p>
        </motion.div>
        <div className="about-layout">
          <motion.aside className="about-identity" {...reveal(0.04)} aria-label="Professional profile">
            <p className="about-name">{profile.name}</p>
            <p className="about-role">{profile.role}</p>
            <p className="about-company">{profile.company}</p>
            <div className="about-location"><MapPin size={15} aria-hidden="true" /> Kerala, India</div>
            <div className="about-availability"><span className="status-dot" /> Open to mobile developer opportunities</div>
            <a href="#contact" className="about-contact">Contact me <ArrowUpRight size={16} /></a>
          </motion.aside>
          <motion.div className="about-content" {...reveal(0.08)}>
            <p className="about-intro">I am a {profile.role} at {profile.company}, with a primary focus on Flutter mobile and point-of-sale applications.</p>
            <p className="about-description">My work includes billing and inventory workflows, reporting, payments, and pickup/delivery applications. I also develop React Native features for Android and iOS and contribute to React/Next.js commerce storefronts.</p>
            <p className="about-description">I work within existing company codebases, coordinate API contracts with backend developers, investigate application issues, and verify changes through regression tests and release checks.</p>
            <div className="about-capabilities">
              {capabilities.map(item => <div key={item.title} className="about-capability"><span className="about-capability-icon"><BrandIcon name={item.brand} size={22} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
            </div>
          </motion.div>
        </div>
        <div className="about-strengths">
          {strengths.map(({ icon: Icon, title, text }, index) => <motion.article key={title} className="about-strength" {...reveal(index * 0.04)}>
            <Icon size={20} aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
          </motion.article>)}
        </div>
      </div>
    </section>
  )
}
