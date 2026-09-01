import { motion } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Braces,
  Bug,
  Code2,
  CreditCard,
  Database,
  Figma,
  GitBranch,
  Github,
  Globe,
  Layers,
  Monitor,
  Search,
  Send,
  Sparkles,
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
  "IDE & Tools": Code2,
}

const toolIcons = {
  "VS Code": Code2,
  Git: GitBranch,
  GitHub: Github,
  Postman: Send,
  Figma,
  "Chrome DevTools": Bug,
  Claude: Sparkles,
  Codex: Bot,
  Vite: Zap,
  ESLint: BadgeCheck,
}

const getBentoClasses = (category) => {
  switch (category) {
    case "Frontend":
      return "md:col-span-2 xl:col-span-2 bg-[rgba(255,122,47,0.03)]"
    case "Commerce Platforms":
    case "Multi-Tenant & Themes":
      return "md:col-span-2 xl:col-span-2"
    case "IDE & Tools":
      return "md:col-span-2 xl:col-span-2"
    default:
      return "md:col-span-1 xl:col-span-1"
  }
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

const getSkillInitial = (index) => {
  const directions = [
    { x: -28, y: 0 },
    { x: 0, y: 28 },
    { x: 28, y: 0 },
    { x: 0, y: -18 },
  ]

  return directions[index % directions.length]
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

        <motion.div
          className="mt-8 grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-flow-dense"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Wrench
            const bentoClasses = getBentoClasses(group.category)
            const initialOffset = getSkillInitial(index)

            return (
              <motion.article
                key={group.category}
                variants={{
                  hidden: {
                    opacity: 0,
                    scale: 0.94,
                    rotateX: 8,
                    ...initialOffset,
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    rotateX: 0,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: 0.62,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className={`skill-card surface-panel relative flex flex-col p-5 lg:p-6 overflow-hidden ${bentoClasses}`}
              >
                {/* Subtle spotlight glow for Bento boxes */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[var(--accent)] opacity-5 blur-[80px] pointer-events-none" />

                <div className="relative flex h-full flex-col z-10">
                  <div className="mb-4 flex items-start justify-between gap-5">
                    <motion.span
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)]"
                      variants={{
                        hidden: { scale: 0.7, rotate: -8 },
                        visible: {
                          scale: 1,
                          rotate: 0,
                          transition: { type: "spring", stiffness: 380, damping: 22 },
                        },
                      }}
                    >
                      <AnimatedTechIcon icon={Icon} className="text-[var(--accent)]" size={19} strokeWidth={1.8} />
                    </motion.span>
                    <span className="section-number text-xs tracking-[0.2em]">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white">{group.category}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{group.summary}</p>

                  {group.category === "IDE & Tools" ? (
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-5 sm:grid-cols-4">
                      {group.items.map((item, itemIndex) => {
                        const ToolIcon = toolIcons[item] ?? Braces

                        return (
                          <motion.div
                            key={item}
                            className="group/tool flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-lg border border-[var(--border-soft)] bg-[rgba(246,242,232,0.025)] p-3 text-center"
                            variants={{
                              hidden: { opacity: 0, y: 12, rotate: -2 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                rotate: 0,
                                transition: { delay: itemIndex * 0.035, duration: 0.32 },
                              },
                            }}
                            whileHover={{ y: -4, borderColor: "rgba(255, 122, 47, 0.48)" }}
                          >
                            <motion.span
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,122,47,0.28)] bg-[var(--accent-dim)] text-[var(--accent)]"
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                duration: 2.6,
                                delay: itemIndex * 0.12,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <AnimatedTechIcon icon={ToolIcon} size={18} strokeWidth={1.85} />
                            </motion.span>
                            <span className="text-xs font-bold uppercase leading-4 tracking-[0.12em] text-[var(--muted-strong)]">
                              {item}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {group.items.map((item, itemIndex) => (
                        <motion.span
                          key={item}
                          className="chip bg-[rgba(246,242,232,0.02)] border-[var(--border-soft)]"
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { delay: itemIndex * 0.025, duration: 0.28 },
                            },
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}

          <motion.a
            variants={{
              hidden: { opacity: 0, y: 26, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            href="#contact"
            className="skill-card surface-panel relative flex flex-col justify-center items-center text-center p-6 md:col-span-2 xl:col-span-4 border-[var(--accent)] bg-[rgba(255,122,47,0.02)] group overflow-hidden min-h-[120px]"
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
        </motion.div>
      </div>
    </section>
  )
}
