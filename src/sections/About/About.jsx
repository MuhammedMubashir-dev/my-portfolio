import { motion } from "framer-motion"
import { BriefcaseBusiness, CheckCircle2, Code2, Rocket } from "lucide-react"
import AnimatedTechIcon from "../../components/svg/AnimatedTechIcon"
import SectionKicker from "../../components/svg/SectionKicker"

const strengths = [
  {
    title: "Feature ownership",
    description: "I can take a product requirement through UI, API states, edge cases, and release.",
    icon: Rocket,
  },
  {
    title: "Production debugging",
    description: "I trace problems through frontend behavior, API responses, filters, and data shape.",
    icon: Code2,
  },
  {
    title: "Web and mobile range",
    description: "I work across React, Next.js, and Flutter without losing sight of the user flow.",
    icon: CheckCircle2,
  },
]

const experienceRows = [
  "Commerce storefronts and admin workflows",
  "Search, filtering, cart, checkout, and profile modules",
  "OTP authentication, payment flows, and order notifications",
  "Mobile delivery, maps, pagination, and API issue debugging",
]

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <SectionKicker>About</SectionKicker>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 }}
              className="section-title"
            >
              Product-minded developer for practical, shipped software.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-7"
          >
            <div className="space-y-6 text-lg leading-8 text-[var(--muted)] md:text-xl">
              <p>
                I am Muhammed Mubashir, a Kerala-based developer currently building real-world
                applications at ENKE Consulting Services.
              </p>
              <p>
                My work sits close to the product: React and Next.js interfaces, Flutter screens,
                REST API integrations, search and filtering systems, checkout flows, payment states,
                and the production bugs that appear when real users meet real business rules.
              </p>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {strengths.map(({ title, description, icon: Icon }, index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.18 + index * 0.06 }}
                  className="surface-panel p-5"
                >
                  <AnimatedTechIcon icon={Icon} className="text-[var(--accent)]" />
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 grid gap-8 border-t border-[var(--border-soft)] pt-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] px-4 py-2">
              <BriefcaseBusiness size={16} strokeWidth={1.8} className="text-[var(--accent)]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                Currently at ENKE Consulting Services
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-[var(--border-soft)]">
              {experienceRows.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-5 border-b border-[var(--border-soft)] py-5"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[var(--muted-strong)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
