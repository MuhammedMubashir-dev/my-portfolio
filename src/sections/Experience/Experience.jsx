import { motion } from "framer-motion"
import { BriefcaseBusiness, CalendarDays, Code2, GitBranch, Wrench } from "lucide-react"
import AnimatedTechIcon from "../../components/svg/AnimatedTechIcon"
import SectionKicker from "../../components/svg/SectionKicker"

const responsibilities = [
  "Building and improving React, Next.js, and Flutter product features",
  "Integrating REST APIs and debugging live product workflows",
  "Working on commerce, mobile, search, checkout, and business modules",
  "Fixing production issues with UI states, filters, validation, and data flow",
]

const focusAreas = [
  { label: "Current stage", value: "3rd month", icon: CalendarDays },
  { label: "Company", value: "ENKE Consulting Services", icon: BriefcaseBusiness },
  { label: "Work type", value: "Production product engineering", icon: Wrench },
  { label: "Stack", value: "React, Next.js, Flutter, REST APIs", icon: Code2 },
]

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <SectionKicker>Experience</SectionKicker>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 }}
              className="section-title"
            >
              Currently building production software at ENKE.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.14 }}
              className="section-lede"
            >
              In my 3rd month at ENKE Consulting Services, I am gaining hands-on experience across
              real client-facing products, API integrations, production fixes, and user-facing
              feature work.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.16 }}
            className="surface-panel overflow-hidden lg:col-span-7"
          >
            <div className="grid border-b border-[var(--border-soft)] md:grid-cols-2">
              {focusAreas.map(({ label, value, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`flex gap-4 p-6 ${
                    index % 2 === 0 ? "md:border-r" : ""
                  } border-[var(--border-soft)] ${index < 2 ? "border-b" : ""}`}
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)] text-[var(--accent)]">
                    <AnimatedTechIcon icon={Icon} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {label}
                    </p>
                    <p className="mt-1 text-base font-bold text-[var(--text)]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <GitBranch size={17} strokeWidth={1.8} className="text-[var(--accent)]" />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                  What I am working on
                </p>
              </div>

              <div className="border-t border-[var(--border-soft)]">
                {responsibilities.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-5 border-b border-[var(--border-soft)] py-4"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-[var(--muted-strong)] md:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
