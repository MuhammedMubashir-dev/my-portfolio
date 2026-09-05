import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { BriefcaseBusiness, Download, Github, Languages, Linkedin, Mail, PackageCheck } from "lucide-react"
import { useEffect, useState } from "react"
import AnimatedArrow from "../../components/svg/AnimatedArrow"
import AnimatedSparkle from "../../components/svg/AnimatedSparkle"
import HeroAmbient from "../../components/svg/HeroAmbient"
import Bug from "../../components/shared/Bug"

const roles = [
  "React & Next.js Developer",
  "Flutter & React Native Builder",
  "Commerce Platform Engineer",
  "API Integration Specialist",
]

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Flutter",
  "React Native",
  "REST APIs",
  "Tailwind",
]

const heroStats = [
  {
    value: "7+",
    label: "Products shipped",
    icon: PackageCheck,
  },
  {
    value: "8+",
    label: "Storefront themes",
    icon: BriefcaseBusiness,
  },
  {
    value: "3+",
    label: "Arabic-ready apps",
    icon: Languages,
  },
]

const proofPoints = [
  "Promoted from trainee in 3 months",
  "Checkout, payments, search, maps, and POS workflows",
  "Frontend ownership across web and mobile releases",
]

function TerminalEffect({ style }) {
  const [step, setStep] = useState(0)
  const [text, setText] = useState("")
  const command = `npx init-engineer --name="Mubashir"`

  useEffect(() => {
    if (step === 0) {
      let i = 0
      const interval = setInterval(() => {
        setText(command.slice(0, i + 1))
        i++
        if (i === command.length) {
          clearInterval(interval)
          setTimeout(() => setStep(1), 400)
        }
      }, 50)
      return () => clearInterval(interval)
    }

    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 600)
      return () => clearTimeout(timer)
    }
  }, [step, command])

  return (
    <motion.aside
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.18,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="surface-panel min-w-0 lg:col-span-5 xl:ml-4 overflow-hidden flex flex-col font-mono text-sm shadow-2xl rounded-lg"
    >
      {/* Mac Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[rgba(246,242,232,0.03)] border-b border-[var(--border-soft)]">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-2 text-xs text-[var(--muted)] font-sans">bash — ~</span>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 text-[var(--text)] flex flex-col gap-2 min-h-[320px]">
        <div className="flex gap-2">
          <span className="text-[var(--accent)] font-bold">❯</span>
          <span>
            {text}
            {step === 0 && <span className="animate-pulse bg-[var(--text)] text-[var(--text)] w-2 h-4 inline-block ml-1 align-middle">_</span>}
          </span>
        </div>

        {step >= 1 && (
          <div className="text-[var(--muted)]">Resolving dependencies...</div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex flex-col gap-2"
          >
            <div className="text-[var(--success)] mb-2 flex items-center gap-2">
              <span>✔</span> Successfully initialized Jr Application Developer
            </div>
            
            <div className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4">
              <span className="text-[var(--muted)] text-right">Location:</span>
              <span className="font-semibold">Kerala, India</span>

              <span className="text-[var(--muted)] text-right">Status:</span>
              <span className="text-[var(--accent)] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
                Available for work
              </span>

              <span className="text-[var(--muted)] text-right mt-2">Focus:</span>
              <span className="mt-2 text-[var(--muted-strong)]">Production web and mobile apps</span>

              <span className="text-[var(--muted)] text-right">Stack:</span>
              <span className="flex flex-col gap-1">
                <span className="text-[#61dafb] font-semibold">React & Next.js</span>
                <span className="text-[#54c5f8] font-semibold">Flutter</span>
                <span className="text-[#61dafb] font-semibold">React Native</span>
                <span className="text-[#98c379] font-semibold">REST APIs</span>
              </span>
            </div>
            
            <div className="flex gap-2 mt-4">
              <span className="text-[var(--accent)] font-bold">❯</span>
              <span className="animate-pulse bg-[var(--text)] text-[var(--text)] w-2 h-4 inline-block ml-1 align-middle">_</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  )
}

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  // Parallax physics
  const { scrollY } = useScroll()
  const yBgDesktop = useTransform(scrollY, [0, 1000], [0, 400]) // Background moves slower down
  const yTextDesktop = useTransform(scrollY, [0, 1000], [0, 150]) // Text moves slightly slower down
  const yTerminalDesktop = useTransform(scrollY, [0, 1000], [0, -200]) // Terminal moves up faster

  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth >= 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const yBg = isDesktop ? yBgDesktop : 0
  const yText = isDesktop ? yTextDesktop : 0
  const yTerminal = isDesktop ? yTerminalDesktop : 0

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentRole((previous) => (previous + 1) % roles.length)
    }, 2200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="section-shell relative flex min-h-screen items-center overflow-hidden pt-24 md:pt-36"
    >
      <HeroAmbient style={{ y: yBg }} />

      <div className="section-container relative z-[1] w-full">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-end xl:gap-16">
          <motion.div
            style={{ y: yText }}
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
                Jr Application Developer at ENKE • Open to new opportunities
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
              I build polished web and mobile product features with React, Next.js, Flutter, and React Native. My work spans commerce, POS, logistics, and business networking, with real releases behind the screenshots.
            </p>

            <div className="mt-6 grid max-w-2xl gap-2">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm font-medium leading-6 text-[var(--muted-strong)]">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {heroStats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="hero-stat">
                  <span className="hero-stat-icon">
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block text-2xl font-bold leading-none text-[var(--text)]">{value}</span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                      {label}
                    </span>
                  </span>
                </div>
              ))}
            </div>

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
                href="/muhammed-mubashir-k-resume-react.pdf"
                download="Muhammed-Mubashir-Resume.pdf"
                className="button-secondary"
              >
                <Download size={18} strokeWidth={2} />
                Resume PDF
              </a>

              <div className="flex gap-3">
                <a
                  href="https://github.com/MuhammedMubashir-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary button-icon"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} strokeWidth={2} />
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammed-mubashir-k/"
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary button-icon"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          </motion.div>

          <TerminalEffect style={{ y: yTerminal }} />
        </div>

        <Bug id="hero-bug" className="top-24 right-4 md:right-10 opacity-30 hover:opacity-100" />

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
