import { AnimatePresence, motion } from "framer-motion"
import { BriefcaseBusiness, CheckCircle2, Code2, Rocket, TerminalSquare } from "lucide-react"
import { useState } from "react"
import AnimatedTechIcon from "../../components/svg/AnimatedTechIcon"
import SectionKicker from "../../components/svg/SectionKicker"

const strengths = [
  {
    title: "Feature ownership",
    description: "I take requirements from UI through API states, edge cases, and production release.",
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

const jsonProfile = `{
  "status": 200,
  "endpoint": "/api/v1/engineer/mubashir",
  "data": {
    "name": "Muhammed Mubashir",
    "role": "Jr Application Developer",
    "location": "Kerala, India",
    "company": "ENKE Consulting Services LLP",
    "focus": [
      "React.js & Next.js interfaces",
      "Flutter & React Native mobile apps",
      "REST API integration",
      "E-commerce, POS & business networking"
    ],
    "philosophy": "Build practical, shipped software that solves real business problems."
  }
}`

export default function About() {
  const [viewMode, setViewMode] = useState("ui") // 'ui' or 'json'

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
              Product-minded developer for practical software.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-7 min-w-0"
          >
            {/* Toggle Switch */}
            <div className="mb-8 flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] p-1 w-max">
              <button
                type="button"
                onClick={() => setViewMode("ui")}
                className={`relative rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  viewMode === "ui" ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {viewMode === "ui" && (
                  <motion.span
                    layoutId="about-toggle"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    style={{ zIndex: -1 }}
                  />
                )}
                UI View
              </button>
              <button
                type="button"
                onClick={() => setViewMode("json")}
                className={`relative flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  viewMode === "json" ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {viewMode === "json" && (
                  <motion.span
                    layoutId="about-toggle"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    style={{ zIndex: -1 }}
                  />
                )}
                <TerminalSquare size={14} />
                API View
              </button>
            </div>

            <div className="relative min-h-[220px] w-full max-w-full">
              <AnimatePresence mode="wait">
                {viewMode === "ui" ? (
                  <motion.div
                    key="ui-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 text-lg leading-8 text-[var(--muted)] md:text-xl"
                  >
                    <p>
                      I am Muhammed Mubashir, a Kerala-based Jr Application Developer currently shipping production applications at ENKE Consulting Services LLP.
                    </p>
                    <p>
                      I build across the full stack — React, Next.js, Flutter, and React Native — delivering 7+ production applications across e-commerce, POS, logistics, and business networking. From multi-tenant platforms to mobile point-of-sale systems, I focus on shipping software that drives real business value.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="json-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[#0a0a0a] p-5 shadow-2xl"
                  >
                    <pre className="text-sm leading-relaxed md:text-base overflow-x-auto">
                      <code className="text-[#e5c07b]">
                        {jsonProfile.split("\n").map((line, i) => {
                          // Simple mock syntax highlighting
                          let coloredLine = line
                          coloredLine = coloredLine.replace(/"(.*?)":/g, '<span class="text-[#e06c75]">"$1"</span>:')
                          coloredLine = coloredLine.replace(/: "(.*?)"/g, ': <span class="text-[#98c379]">"$1"</span>')
                          coloredLine = coloredLine.replace(/: ([0-9]+)/g, ': <span class="text-[#d19a66]">$1</span>')
                          return (
                            <span key={i} className="block" dangerouslySetInnerHTML={{ __html: coloredLine }} />
                          )
                        })}
                      </code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
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
                  <AnimatedTechIcon icon={Icon} className="text-[var(--accent)]" size={19} strokeWidth={1.8} />
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
                  <p className="text-[var(--text)] font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
