// sections/Projects/Projects.jsx

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "../../data/projects"
import { ArrowUpRight, ChevronDown, Layers, CheckCircle2 } from "lucide-react"

export default function Projects() {
  const [expanded, setExpanded] = useState(null)

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id))

  return (
    <section
      id="projects"
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
            Projects
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Real products.
            <br />
            <span style={{ color: "var(--accent)" }}>Real engineering.</span>
          </motion.h2>
        </div>

        {/* PROJECTS LIST */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {projects.map((project, index) => {
            const isOpen = expanded === project.id

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderBottom: "1px solid var(--border)" }}
              >

                {/* ROW — clickable header */}
                <div
                  data-hover
                  className="group grid lg:grid-cols-12 gap-6 py-10 px-4 -mx-4 cursor-pointer transition-all duration-500 rounded-xl"
                  style={{ background: isOpen ? "var(--surface)" : "transparent" }}
                  onMouseEnter={e => {
                    if (!isOpen) e.currentTarget.style.background = "var(--surface)"
                  }}
                  onMouseLeave={e => {
                    if (!isOpen) e.currentTarget.style.background = "transparent"
                  }}
                  onClick={() => toggle(project.id)}
                >

                  {/* INDEX + NAME */}
                  <div className="lg:col-span-5 flex items-start gap-5">
                    <motion.span
                      animate={{ opacity: isOpen ? 1 : 0.25 }}
                      className="text-4xl font-bold leading-none mt-1 flex-shrink-0"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--accent)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>

                    <div>
                      <h3
                        className="text-2xl md:text-3xl font-bold mb-1 transition duration-300"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--text)",
                        }}
                      >
                        {project.name}
                      </h3>
                      <p
                        className="text-xs uppercase tracking-widest"
                        style={{ color: "var(--muted)" }}
                      >
                        {project.type}
                      </p>
                    </div>
                  </div>

                  {/* DESCRIPTION — visible on desktop, hidden when expanded */}
                  <div className="lg:col-span-5 flex items-center">
                    <p
                      className="text-sm leading-relaxed line-clamp-2"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* STATUS + CHEVRON */}
                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                    <span
                      className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        color: "var(--accent)",
                        border: "1px solid var(--accent)",
                        opacity: 0.85,
                      }}
                    >
                      {project.status}
                    </span>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                        style={{ color: "var(--muted)" }}
                      />
                    </motion.div>
                  </div>

                </div>

                {/* EXPANDED PANEL */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="grid lg:grid-cols-12 gap-8 pb-10 px-4"
                      >

                        {/* HIGHLIGHTS */}
                        <div className="lg:col-span-6 lg:col-start-2">
                          <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2
                              size={13}
                              strokeWidth={1.5}
                              style={{ color: "var(--accent)" }}
                            />
                            <p
                              className="text-xs uppercase tracking-widest"
                              style={{ color: "var(--muted)" }}
                            >
                              Highlights
                            </p>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-2">
                            {project.highlights.map((item, i) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2"
                              >
                                <span
                                  className="mt-1 flex-shrink-0"
                                  style={{ color: "var(--accent)" }}
                                >
                                  →
                                </span>
                                <p
                                  className="text-sm leading-relaxed"
                                  style={{ color: "var(--muted)" }}
                                >
                                  {item}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* STACK */}
                        <div className="lg:col-span-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Layers
                              size={13}
                              strokeWidth={1.5}
                              style={{ color: "var(--accent)" }}
                            />
                            <p
                              className="text-xs uppercase tracking-widest"
                              style={{ color: "var(--muted)" }}
                            >
                              Tech Stack
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.06 }}
                                className="text-xs px-3 py-1.5 rounded-full"
                                style={{
                                  border: "1px solid var(--border)",
                                  color: "var(--muted)",
                                  background: "var(--bg)",
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}