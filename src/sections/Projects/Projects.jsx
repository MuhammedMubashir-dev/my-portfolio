import { AnimatePresence, motion, LayoutGroup } from "framer-motion"
import { ArrowRight, CheckCircle2, ChevronDown, Layers3, Filter } from "lucide-react"
import { useMemo, useState } from "react"
import AnimatedArrow from "../../components/svg/AnimatedArrow"
import SectionKicker from "../../components/svg/SectionKicker"
import { projects } from "../../data/projects"
import Bug from "../../components/shared/Bug"

const filters = [
  { id: "all", label: "All Projects" },
  { id: "commerce", label: "E-Commerce" },
  { id: "nextjs", label: "Next.js" },
  { id: "flutter", label: "Flutter" },
]

function getProjectCategories(project) {
  const typeLower = project.type.toLowerCase()
  const stackLower = project.stack.join(" ").toLowerCase()
  const categories = ["all"]

  if (typeLower.includes("commerce") || typeLower.includes("storefront")) categories.push("commerce")
  if (stackLower.includes("next.js") || stackLower.includes("nextjs")) categories.push("nextjs")
  if (stackLower.includes("flutter") || stackLower.includes("dart")) categories.push("flutter")

  return categories
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [expanded, setExpanded] = useState(projects[0]?.id ?? null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => getProjectCategories(project).includes(activeFilter))
  }, [activeFilter])

  const toggleProject = (projectId) => {
    setExpanded((current) => (current === projectId ? null : projectId))
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    setExpanded(null)
  }

  return (
    <section id="projects" className="section-shell relative">
      <Bug id="proj-bug" className="top-12 left-1/2 opacity-30 hover:opacity-100" />
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
              Production platforms built with real constraints.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-4 text-base leading-7 text-[var(--muted)]"
          >
            I focus on core product engineering: building clean interfaces, integrating heavily with APIs, handling complex data filtering, and shipping practical fixes.
          </motion.p>
        </div>

        <LayoutGroup id="project-filters">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-8 md:mt-10 flex items-center gap-2 md:gap-3 p-2 rounded-xl border border-[var(--border-soft)] bg-[rgba(27,28,22,0.5)] w-full max-w-full overflow-x-auto hide-scrollbar md:w-fit md:overflow-visible"
            role="tablist"
            aria-label="Filter projects"
          >
            <div className="pl-2 pr-1 text-[var(--muted)] flex-none">
              <Filter size={16} />
            </div>
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(filter.id)}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  className={`relative flex-none px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-lg ${
                    isActive ? "text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-filter"
                      className="absolute inset-0 rounded-lg bg-[var(--accent)]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              )
            })}
          </motion.div>
        </LayoutGroup>

        <motion.div layout className="mt-12 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isOpen = expanded === project.id
              const visibleHighlights = isOpen ? project.highlights : project.highlights.slice(0, 3)

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="project-card surface-panel relative p-6 md:p-8 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(255,122,47,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="mb-8 flex items-start justify-between gap-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                          {project.type}
                        </p>
                        <h3 className="mt-3 text-3xl md:text-4xl font-bold">{project.name}</h3>
                        {project.subtitle && (
                          <p className="mt-2 text-sm text-[var(--muted)]">{project.subtitle}</p>
                        )}
                      </div>
                      <span className="section-number text-xs tracking-[0.2em] opacity-40">{String(project.id).padStart(2, "0")}</span>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      <span className="chip border-[var(--accent)] text-[var(--accent)] font-bold bg-[rgba(255,122,47,0.05)]">
                        {project.status}
                      </span>
                      <span className="chip">{project.year}</span>
                      <span className="chip">{project.role}</span>
                    </div>

                    <p className="text-base leading-7 text-[var(--text)]">{project.description}</p>

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
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                              className="flex gap-3 text-sm leading-6 text-[var(--muted-strong)]"
                            >
                              <AnimatedArrow className="mt-1 flex-none text-[var(--accent)]" />
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
                          {isOpen ? "Show less" : "Read full implementation"}
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
                          Tech Stack
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="chip bg-[rgba(246,242,232,0.02)]">
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
        </motion.div>
      </div>
    </section>
  )
}
