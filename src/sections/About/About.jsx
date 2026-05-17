// sections/About/About.jsx

import { motion } from "framer-motion"
import { Briefcase, ArrowRight } from "lucide-react"

export default function About() {
  const highlights = [
    "Building production applications",
    "Debugging real API issues",
    "Creating scalable UI systems",
    "Working across web and mobile"
  ]

  return (
    <section
      id="about"
      className="py-16 md:py-16 lg:py-32 px-6 overflow-hidden"

      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "var(--muted)" }}
          >
            About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            More than
            <br />
            <span style={{ color: "var(--accent)" }}>just frontend.</span>
          </motion.h2>
        </div>

        {/* BODY */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-20 items-start">

          {/* LEFT — PARAGRAPHS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
              I'm Muhammed Mubashir, a product-focused developer
              from Kerala currently building real-world applications
              at ENKE Consulting Services.
            </p>

            <p className="text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
              I work across React, Next.js, and Flutter —
              building features, integrating APIs,
              solving production bugs,
              and improving user experiences in live products.
            </p>

            <p className="text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
              My experience includes commerce platforms,
              business applications, mobile workflows,
              search systems, and performance-focused interfaces.
            </p>
          </motion.div>

          {/* RIGHT — HIGHLIGHTS + COMPANY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5"
          >

            {/* HIGHLIGHT ROWS */}
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group flex items-center justify-between py-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <p
                    className="transition duration-300"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
                  >
                    {item}
                  </p>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    style={{ color: "var(--accent)" }}
                  />
                </motion.div>
              ))}
            </div>

            {/* COMPANY TAG */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-dim)", border: "1px solid var(--accent)" }}
              >
                <Briefcase size={15} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>
                  Currently at
                </p>
                <p className="text-sm font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}>
                  ENKE Consulting Services
                </p>
              </div>

              {/* LIVE DOT */}
              <div className="ml-auto flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--accent)" }}
                />
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  Active
                </span>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}