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
              <SectionKicker>Skill set</SectionKicker>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 }}
              className="section-title"
            >
              The stack I use to turn product ideas into working systems.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-4 text-base leading-7 text-[var(--muted)]"
          >
            My focus is not collecting tools. It is combining the right ones to build clear user
            flows, reliable integrations, and UI that survives production detail.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Wrench

            return (
              <motion.article
                key={group.category}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.52,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="skill-card surface-panel relative flex min-h-72 flex-col p-6"
              >
                <div className="relative flex h-full flex-col">
                  <div className="mb-8 flex items-start justify-between gap-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)]">
                      <AnimatedTechIcon icon={Icon} className="text-[var(--accent)]" size={19} strokeWidth={1.8} />
                    </span>
                    <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h3 className="text-2xl">{group.category}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{group.summary}</p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}

          <motion.a
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ delay: skills.length * 0.05, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            href="#contact"
            className="skill-card surface-panel relative flex min-h-72 flex-col justify-between p-6"
          >
            <div className="relative">
              <p className="section-kicker">Next</p>
              <h3 className="mt-5 text-3xl">
                Have a feature that needs a steady builder?
              </h3>
            </div>
            <div className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
              Start a project
              <AnimatedArrow />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
