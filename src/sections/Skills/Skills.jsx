// sections/Skills/Skills.jsx

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { skills } from "../../data/skills"
import {
  Monitor, Smartphone, Server, Database,
  Wrench, Zap, Search, ArrowUpRight
} from "lucide-react"

const categoryIcons = {
  "Frontend":             Monitor,
  "Mobile":               Smartphone,
  "Backend & APIs":       Server,
  "Database":             Database,
  "Tools":                Wrench,
  "Product Engineering":  Zap,
  "Search & Performance": Search,
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <section
      id="skills"
      className="py-32 px-6 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "var(--muted)" }}
          >
            Skill Set
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Tools I use to
            <br />
            <span style={{ color: "var(--accent)" }}>ship products.</span>
          </motion.h2>
        </div>

        {/* GRID */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: "1px", background: "var(--border)" }}
        >
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Wrench
            const isActive = activeCategory === group.category

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-hover
                className="group relative p-7 cursor-pointer overflow-hidden transition-all duration-300"
                style={{ background: isActive ? "var(--surface)" : "var(--bg)" }}
                onMouseEnter={() => setActiveCategory(group.category)}
                onMouseLeave={() => setActiveCategory(null)}
              >

                {/* HOVER GLOW */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 20%, var(--accent-dim) 0%, transparent 65%)",
                  }}
                />

                {/* TOP ROW — ICON + INDEX */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? "var(--accent-dim)" : "var(--surface)",
                      border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                    }}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                    />
                  </div>

                  <span
                    className="text-3xl font-bold leading-none transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: isActive ? "var(--accent)" : "var(--border)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* CATEGORY LABEL */}
                <h3
                  className="text-sm font-semibold uppercase tracking-widest mb-5 relative z-10 transition duration-300"
                  style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
                >
                  {group.category}
                </h3>

                {/* SKILL PILLS */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  <AnimatePresence>
                    {group.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xs px-3 py-1.5 rounded-full transition-all duration-300"
                        style={{
                          border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                          color: isActive ? "var(--text)" : "var(--muted)",
                          background: isActive ? "var(--accent-dim)" : "transparent",
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                {/* BOTTOM ACCENT LINE */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  animate={{ width: isActive ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: "var(--accent)" }}
                />

              </motion.div>
            )
          })}

          {/* 8th SLOT — CTA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: skills.length * 0.07,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            data-hover
            className="group relative p-7 cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-300"
            style={{ background: "var(--surface)", minHeight: "200px" }}
            onClick={() => window.location.href = "#contact"}
          >

            {/* GLOW */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 80% 80%, var(--accent-dim) 0%, transparent 65%)",
              }}
            />

            <p
              className="text-xs uppercase tracking-widest relative z-10"
              style={{ color: "var(--muted)" }}
            >
              Got a project?
            </p>

            <div className="relative z-10">
              <p
                className="text-2xl font-bold leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                Let's build
                <br />
                <span style={{ color: "var(--accent)" }}>together.</span>
              </p>

              <div
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 group-hover:bg-accent"
                style={{
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--accent)"
                  e.currentTarget.style.color = "#111111"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "var(--accent)"
                }}
              >
                Get in touch
                <ArrowUpRight size={12} strokeWidth={1.5} />
              </div>
            </div>

            {/* BOTTOM LINE */}
            <motion.div
              className="absolute bottom-0 left-0 h-px"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: "var(--accent)" }}
            />

          </motion.div>

        </div>

      </div>
    </section>
  )
}