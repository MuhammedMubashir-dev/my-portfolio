import { motion } from "framer-motion"
import {
  ArrowRight,
  CreditCard,
  Database,
  Globe,
  Layers,
  Monitor,
  Search,
  Server,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react"
import AnimatedArrow from "../../components/svg/AnimatedArrow"
import AnimatedTechIcon from "../../components/svg/AnimatedTechIcon"
import SectionKicker from "../../components/svg/SectionKicker"
import { skills } from "../../data/skills"

const categoryIcons = {
  Frontend: Monitor,
  Mobile: Smartphone,
  "API Integration": Server,
  "Commerce Platforms": Zap,
  "Payments & Integrations": CreditCard,
  "Multi-Tenant & Themes": Layers,
  "Localization & SEO": Globe,
  "Product Engineering": Wrench,
  Tools: Search,
}

const getBentoClasses = (category) => {
  switch (category) {
    case "Frontend":
      return "md:col-span-2 xl:col-span-2 bg-[rgba(255,122,47,0.03)]"
    case "Commerce Platforms":
    case "Multi-Tenant & Themes":
      return "md:col-span-2 xl:col-span-2"
    default:
      return "md:col-span-1 xl:col-span-1"
  }
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <SectionKicker>Skill set & Architecture</SectionKicker>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 }}
              className="section-title"
            >
              The tools I use to turn business constraints into shipped products.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-4 text-base leading-7 text-[var(--muted)]"
          >
            I don't just collect frameworks. I master the specific tools required to build reliable user flows, integrate messy APIs, and ensure UI survives production reality.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-flow-dense">
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Wrench
            const bentoClasses = getBentoClasses(group.category)

            return (
              <motion.article
                key={group.category}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.52,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`skill-card surface-panel relative flex flex-col p-6 lg:p-8 overflow-hidden ${bentoClasses}`}
              >
                {/* Subtle spotlight glow for Bento boxes */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--accent)] opacity-5 blur-[80px] pointer-events-none" />

                <div className="relative flex h-full flex-col z-10">
                  <div className="mb-6 flex items-start justify-between gap-5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)]">
                      <AnimatedTechIcon icon={Icon} className="text-[var(--accent)]" size={19} strokeWidth={1.8} />
                    </span>
                    <span className="section-number text-xs tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white">{group.category}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{group.summary}</p>

                  <div className="mt-auto pt-8 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip bg-[rgba(246,242,232,0.02)] border-[var(--border-soft)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}

          <motion.a
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ delay: skills.length * 0.05, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            href="#contact"
            className="skill-card surface-panel relative flex flex-col justify-center items-center text-center p-8 md:col-span-2 xl:col-span-4 border-[var(--accent)] bg-[rgba(255,122,47,0.02)] group overflow-hidden min-h-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(255,122,47,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <p className="section-kicker mx-auto">Next</p>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white">
                Need a feature built right?
              </h3>
            </div>
            <div className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] uppercase tracking-wider">
              Start a project
              <AnimatedArrow />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
