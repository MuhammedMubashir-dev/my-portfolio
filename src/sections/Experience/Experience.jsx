import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { BriefcaseBusiness, Code2, GitBranch, Wrench, TrendingUp, Rocket } from "lucide-react"
import { useRef } from "react"
import AnimatedTechIcon from "../../components/svg/AnimatedTechIcon"
import SectionKicker from "../../components/svg/SectionKicker"
import Bug from "../../components/shared/Bug"

const timelineNodes = [
  {
    id: 1,
    title: "Full Stack Developer Trainee",
    subtitle: "ENKE Consulting Services LLP",
    date: "Apr 2026",
    description: "Joined ENKE and ramped up on production codebases across Next.js, Flutter, and REST APIs. Built delivery management screens, API integrations, and contributed to the multi-tenant commerce platform from day one.",
    icon: Rocket,
  },
  {
    id: 2,
    title: "Multi-Project Delivery",
    subtitle: "5 concurrent client projects",
    date: "Apr – Jul 2026",
    description: "Shipped features across FUNZCART, Ganvin, Juice World, and Luzine Bakes — building theme packs, checkout flows, bilingual storefronts, and logistics workflows in parallel.",
    icon: Code2,
  },
  {
    id: 3,
    title: "Promoted to Jr Application Developer",
    subtitle: "ENKE Consulting Services LLP",
    date: "Jul 2026",
    description: "Promoted after 3 months based on consistent delivery across multiple production applications. Took on EPOSMOB (POS mobile app), Connect App (React Native), and expanded responsibilities across the full product stack.",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Full Stack Ownership",
    subtitle: "7+ production applications",
    date: "Present",
    description: "Owning features end-to-end across web and mobile — multi-tenant e-commerce, POS operations, business networking, and logistics. Building with React.js, Next.js, Flutter, and React Native.",
    icon: BriefcaseBusiness,
  },
]

export default function Experience() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Add a spring to smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform the 0-1 progress into a percentage for height
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="section-shell relative">
      <Bug id="exp-bug" className="bottom-20 left-10 md:left-24 opacity-30 hover:opacity-100" />
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end mb-16 md:mb-24">
          <div className="lg:col-span-8">
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
              From trainee to Jr Application Developer in 3 months.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-4 text-base leading-7 text-[var(--muted)]"
          >
            Joined ENKE Consulting as a trainee, delivered across 7+ production applications, and earned a promotion — all within my first few months.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto py-10">
          
          {/* The Track (Background Line) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border-soft)] -translate-x-1/2 rounded-full" />
          
          {/* The Glowing Animated Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-[var(--accent)] -translate-x-1/2 rounded-full origin-top"
          >
             {/* Glow effect on the line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[12px] -translate-x-1/2 bg-[var(--accent)] opacity-20 blur-[6px]" />
          </motion.div>

          <div className="relative z-10 flex flex-col gap-16 md:gap-24">
            {timelineNodes.map((node, index) => {
              const isEven = index % 2 === 0

              return (
                <div key={node.id} className="relative flex items-start md:justify-between w-full">
                  
                  {/* Left Side (Desktop) / Hidden (Mobile) */}
                  <div className={`hidden md:block w-[45%] text-right ${!isEven ? "md:order-1" : "md:order-3"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full flex flex-col justify-center"
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {node.date}
                      </span>
                      <h4 className="mt-2 text-2xl font-bold">{node.title}</h4>
                      <p className="mt-1 text-sm font-bold text-[var(--muted)]">{node.subtitle}</p>
                    </motion.div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="absolute left-0 md:left-1/2 md:order-2 flex items-center justify-center w-12 h-12 md:-translate-x-1/2 rounded-full border-2 border-[var(--border-soft)] bg-[var(--surface)] z-20 transition-colors duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute inset-0 rounded-full bg-[var(--bg)]"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.2 }}
                      className="relative z-10"
                    >
                      <AnimatedTechIcon icon={node.icon} size={18} strokeWidth={1.8} className="text-[var(--accent)]" />
                    </motion.div>
                  </div>

                  {/* Right Side (Desktop) / Main Content (Mobile) */}
                  <div className={`w-full pl-20 md:pl-0 md:w-[45%] ${!isEven ? "md:order-3 text-left" : "md:order-1 md:text-right"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="surface-panel p-5 md:p-6"
                    >
                      {/* Mobile Header (Hidden on Desktop) */}
                      <div className="md:hidden mb-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                          {node.date}
                        </span>
                        <h4 className="mt-2 text-xl font-bold">{node.title}</h4>
                        <p className="mt-1 text-xs font-bold text-[var(--muted)]">{node.subtitle}</p>
                      </div>

                      <p className="text-sm md:text-base leading-7 text-[var(--muted-strong)]">
                        {node.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
