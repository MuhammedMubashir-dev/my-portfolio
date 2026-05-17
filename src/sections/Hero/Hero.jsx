// sections/Hero/Hero.jsx

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownRight, Sparkles } from "lucide-react"

export default function Hero() {
  const roles = ["Product Engineer", "React Developer", "Flutter Builder", "API Integrator"]
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  const techStack = ["React", "Next.js", "TypeScript", "Flutter", "REST APIs"]

  // Staggered letter animation for the name
  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const firstName = "Muhammed"
  const lastName  = "Mubashir - K"

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between px-6 pt-20 md:pt-32 pb-12"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">

        {/* TOP LABEL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          <p
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "var(--muted)" }}
          >
            Available for work • Kerala, India
          </p>
        </motion.div>

        {/* MAIN HEADING — letter by letter */}
        <div className="mb-10 overflow-hidden">

          {/* FIRST NAME */}
          <div
            className="flex flex-wrap leading-none tracking-tight"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              fontFamily: "var(--font-display)",
              color: "var(--text)",
            }}
          >
            {firstName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* LAST NAME — accent color, slight delay */}
          <div
            className="flex flex-wrap leading-none tracking-tight"
            style={{
              fontSize: "clamp(3rem, 10vw, 9rem)",
              fontFamily: "var(--font-display)",
              color: "var(--accent)",
            }}
          >
            {lastName.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={firstName.length + i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

        </div>

        {/* ANIMATED ROLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-10 flex items-center gap-3 overflow-hidden h-8"
        >
          <Sparkles
            size={14}
            strokeWidth={1.5}
            style={{ color: "var(--accent)", flexShrink: 0 }}
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              {roles[currentRole]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* DESCRIPTION + BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: "var(--muted)" }}
          >
            Shipping real features, debugging real problems,
            and building production applications
            for web and mobile.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              data-hover
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "#projects"}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-medium"
              style={{ background: "var(--accent)", color: "#111111" }}
            >
              View Projects
              <ArrowDownRight size={16} strokeWidth={2} />
            </motion.button>

            <motion.button
              data-hover
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = "#contact"}
              className="px-8 py-4 rounded-full font-medium transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--text)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* BOTTOM — TECH STACK STRIP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="max-w-7xl mx-auto w-full mt-16 pt-8 flex flex-wrap items-center gap-x-10 gap-y-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--border)" }}
        >
          Stack
        </span>

        {techStack.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.08 }}
            className="text-sm transition duration-300"
            style={{ color: "var(--muted)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

    </section>
  )
}