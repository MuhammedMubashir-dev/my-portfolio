import { AnimatePresence, motion, LayoutGroup } from "framer-motion"
import { CheckCircle2, ChevronDown, Layers3, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState, useEffect, useCallback } from "react"
import AnimatedArrow from "../../components/svg/AnimatedArrow"
import SectionKicker from "../../components/svg/SectionKicker"
import { projects } from "../../data/projects"
import Bug from "../../components/shared/Bug"

function ImageCarousel({ images, projectName, screenshotType }) {
  const [current, setCurrent] = useState(0)
  const isMobile = screenshotType === "mobile"

  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(next, 3500)
    return () => clearInterval(timer)
  }, [next, images.length])

  if (isMobile) {
    return (
      <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-[rgba(0,0,0,0.3)] border border-[var(--border-soft)] p-4">
        <div className="flex gap-3 justify-center items-end">
          {images.map((src, i) => (
            <motion.div
              key={src}
              onClick={() => setCurrent(i)}
              animate={{ scale: i === current ? 1 : 0.88, opacity: i === current ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              className="relative flex-none cursor-pointer"
              style={{ width: images.length === 2 ? "45%" : "30%" }}
            >
              <div className="rounded-2xl overflow-hidden border-2 border-[rgba(255,255,255,0.1)] shadow-xl" style={{ aspectRatio: "9/19" }}>
                <img
                  src={src}
                  alt={`${projectName} screen ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl mb-6 bg-[var(--bg-soft)] border border-[var(--border-soft)]" style={{ aspectRatio: "16/9" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${projectName} screenshot ${current + 1}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] text-white backdrop-blur-sm hover:bg-[rgba(0,0,0,0.75)] transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(0,0,0,0.5)] text-white backdrop-blur-sm hover:bg-[rgba(0,0,0,0.75)] transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const filters = [
  { id: "all", label: "All Projects" },
  { id: "commerce", label: "E-Commerce" },
  { id: "nextjs", label: "Next.js" },
  { id: "flutter", label: "Flutter" },
  { id: "reactnative", label: "React Native" },
]

function getProjectCategories(project) {
  const typeLower = project.type.toLowerCase()
  const stackLower = project.stack.join(" ").toLowerCase()
  const categories = ["all"]

  if (typeLower.includes("commerce") || typeLower.includes("storefront")) categories.push("commerce")
  if (stackLower.includes("next.js") || stackLower.includes("nextjs")) categories.push("nextjs")
  if (stackLower.includes("flutter") || stackLower.includes("dart")) categories.push("flutter")
  if (stackLower.includes("react native")) categories.push("reactnative")

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
            className="mt-8 md:mt-10 flex items-center gap-2 md:gap-3 p-2 rounded-lg border border-[var(--border-soft)] bg-[rgba(27,28,22,0.5)] w-full max-w-full overflow-x-auto hide-scrollbar md:w-fit md:overflow-visible"
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

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--muted)]">
          <p>
            Showing <span className="font-bold text-[var(--text)]">{filteredProjects.length}</span> of{" "}
            <span className="font-bold text-[var(--text)]">{projects.length}</span> production projects
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 font-bold text-[var(--accent)]">
            Discuss a build
            <AnimatedArrow />
          </a>
        </div>

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
                    {project.images?.length > 0 && (
                      <ImageCarousel images={project.images} projectName={project.name} screenshotType={project.screenshotType} />
                    )}

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
                          className="project-expand mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)]"
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
