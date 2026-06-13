import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronDown, Layers3 } from "lucide-react"
import { useMemo, useState } from "react"
import SectionKicker from "../../components/svg/SectionKicker"
import { projects } from "../../data/projects"

const filters = [
  { id: "all", label: "All work" },
  { id: "commerce", label: "Commerce" },
  { id: "mobile", label: "Mobile" },
]

function getProjectCategory(project) {
  if (project.type.toLowerCase().includes("mobile")) return "mobile"
  return "commerce"
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [expanded, setExpanded] = useState(projects[0]?.id ?? null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects
    return projects.filter((project) => getProjectCategory(project) === activeFilter)
  }, [activeFilter])

  const toggleProject = (projectId) => {
    setExpanded((current) => (current === projectId ? null : projectId))
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    setExpanded(null)
  }

  return (
    <section id="projects" className="section-shell">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <SectionKicker>Projects</SectionKicker>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.08 }}
              className="section-title"
            >
              Production work with real constraints and real users.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-4 text-base leading-7 text-[var(--muted)]"
          >
            These projects highlight the kind of work I like most: business logic, clean interfaces,
            API integration, and practical fixes that make products easier to operate.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(filter.id)}
                className={`filter-chip ${isActive ? "is-active" : ""}`}
              >
                {filter.label}
              </button>
            )
          })}
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
            const isOpen = expanded === project.id
            const visibleHighlights = isOpen ? project.highlights : project.highlights.slice(0, 3)

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ delay: index * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="project-card surface-panel relative p-6 md:p-7"
              >
                <div className="relative">
                  <div className="mb-8 flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {project.type}
                      </p>
                      <h3 className="mt-3 text-3xl md:text-4xl">{project.name}</h3>
                      {project.subtitle && (
                        <p className="mt-2 text-sm text-[var(--muted)]">{project.subtitle}</p>
                      )}
                    </div>
                    <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="chip border-[var(--accent)] text-[var(--accent)]">
                      {project.status}
                    </span>
                    <span className="chip">{project.year}</span>
                    <span className="chip">{project.role}</span>
                  </div>

                  <p className="text-base leading-7 text-[var(--muted)]">{project.description}</p>

                  <div className="mt-8">
                    <div className="mb-4 flex items-center gap-2">
                      <CheckCircle2 size={16} strokeWidth={1.8} className="text-[var(--accent)]" />
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                        What I handled
                      </p>
                    </div>

                    <ul className="space-y-3">
                      <AnimatePresence initial={false}>
                        {visibleHighlights.map((item) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex gap-3 text-sm leading-6 text-[var(--muted-strong)]"
                          >
                            <ArrowRight
                              size={15}
                              strokeWidth={1.8}
                              className="mt-1 flex-none text-[var(--accent)]"
                            />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>

                    {project.highlights.length > 3 && (
                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]"
                        aria-expanded={isOpen}
                      >
                        {isOpen ? "Show less" : "Show more"}
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                          <ChevronDown size={16} strokeWidth={2} />
                        </motion.span>
                      </button>
                    )}
                  </div>

                  <div className="mt-8 border-t border-[var(--border-soft)] pt-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Layers3 size={16} strokeWidth={1.8} className="text-[var(--accent)]" />
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Stack
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
