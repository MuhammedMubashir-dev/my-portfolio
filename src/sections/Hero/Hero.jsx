import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react"
import { useEffect, useState } from "react"
import AnimatedArrow from "../../components/svg/AnimatedArrow"
import AnimatedSparkle from "../../components/svg/AnimatedSparkle"
import HeroAmbient from "../../components/svg/HeroAmbient"

const roles = [
  "Product Engineer",
  "React Developer",
  "Mobile Developer",
  "API Integrator",
]

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Flutter",
  "REST APIs",
  "Tailwind",
]

const profileRows = [
  { label: "Based in", value: "Kerala, India", icon: MapPin },
  {
    label: "Current focus",
    value: "Production web and mobile apps",
    icon: Sparkles,
  },
  {
    label: "Working with",
    value: "React, Next.js, Flutter, APIs",
    icon: ArrowRight,
  },
]

const proofPoints = [
  { value: "4+", label: "Production projects" },
  { value: "10+", label: "API integrations" },
  { value: "40+", label: "Production fixes" },
]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentRole((previous) => (previous + 1) % roles.length)
    }, 2200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="section-shell relative flex min-h-screen items-center overflow-hidden pt-32 md:pt-36"
    >
      <HeroAmbient />

      <div className="section-container relative z-[1] w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="min-w-0 lg:col-span-7"
          >
            <div className="mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-2">
              <span className="h-2 w-2 flex-none rounded-full bg-[var(--success)]" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Product Engineer • Open to exciting opportunities
              </p>
            </div>

            <h1 className="hero-name font-bold">
              Muhammed
              <span className="block text-[var(--accent)]">
                Mubashir
              </span>
            </h1>

            <div className="mt-7 flex h-8 items-center gap-3 overflow-hidden">
              <AnimatedSparkle className="text-[var(--accent)]" />

              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[currentRole]}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted-strong)] md:text-base"
                >
                  {roles[currentRole]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              I build production-ready web and mobile experiences
              across React, Next.js, Flutter, and REST APIs, with a
              practical focus on shipping features, fixing real
              issues, and making product workflows easier to use.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#projects"
                className="button-primary"
              >
                View projects
                <AnimatedArrow />
              </a>

              <a
                href="mailto:muhammedmubashirwork@gmail.com"
                className="button-secondary"
              >
                <Mail size={18} strokeWidth={2} />
                Contact me
              </a>

              <a
                href="/muhammed-mubashir-resume.docx"
                download="Muhammed-Mubashir-Resume.docx"
                className="button-secondary"
              >
                <Download size={18} strokeWidth={2} />
                Resume
              </a>

              <a
                href="https://github.com/MuhammedMubashir-dev"
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
                aria-label="Open GitHub profile"
              >
                <Github size={18} strokeWidth={2} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/muhammed-mubashir-k/"
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
                aria-label="Open LinkedIn profile"
              >
                <Linkedin size={18} strokeWidth={2} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.18,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="surface-panel min-w-0 lg:col-span-5 xl:ml-4"
          >
            <div className="p-6 md:p-8">
              <p className="section-kicker">
                Profile signal
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl">
                Frontend craft with production ownership.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Comfortable moving from UI details to API
                debugging, delivery workflows, checkout flows,
                search behavior, and performance improvements.
              </p>
            </div>

            <div className="border-t border-[var(--border-soft)]">
              {profileRows.map(
                ({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 border-b border-[var(--border-soft)] px-6 py-4 last:border-b-0 md:px-8"
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="mt-1 text-[var(--accent)]"
                    />

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {label}
                      </p>

                      <p className="mt-1 text-sm text-[var(--text)]">
                        {value}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-3 border-t border-[var(--border-soft)]">
              {proofPoints.map((item) => (
                <div
                  key={item.label}
                  className="border-r border-[var(--border-soft)] p-4 last:border-r-0 md:p-5"
                >
                  <p className="font-display text-3xl font-bold text-[var(--accent)]">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.38,
            duration: 0.6,
          }}
          className="mt-16 border-t border-[var(--border-soft)] pt-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
              Core stack
            </span>

            {techStack.map((tech) => (
              <span
                key={tech}
                className="chip"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}