import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { useEffect, useState, useSyncExternalStore } from "react"
import { projects } from "../../data/projects"
import { caseStudies } from "../../data/caseStudies"
import Bug from "../../components/shared/Bug"
import { openProject, projectNavigationEvent } from "../../lib/projectNavigation"
import { detailInsertionIndex } from "../../lib/projectLayout"
import ScreenshotViewer from "./ScreenshotViewer"

const stories = {
  5: { problem: "A single point-of-sale platform for everyday retail operations.", metric: { value: "25+", label: "listing and reporting screens consolidated onto a shared interface with Excel export" }, result: "Delivered 52 merged pull requests since July, covering validated report exports, bilingual invoice generation, Day Close, and a three-language interface." },
  6: { problem: "A customer app for ordering, paying, and tracking laundry services.", metric: { value: "67%", label: "reduction in API requests on the order-history screen, from six calls to two" }, result: "Delivered Razorpay checkout, saved-address management, and update and maintenance prompts for Android and iOS." },
  2: { problem: "A field app that guides delivery staff through every pickup and handoff.", metric: { value: "4", label: "delivery stages, each with independent pagination and date filtering" }, result: "Resolved OTP verification and loading failures, and identified a server-side timezone mismatch behind missing orders." },
  4: { problem: "A networking app that connects professionals to the right business profile.", metric: { value: "2", label: "native platforms behind a single LinkedIn sign-in flow, with Kotlin on Android and Swift on iOS" }, result: "Implemented PKCE-based authentication, deferred deep linking that persists through startup, and shareable company profiles." },
  1: { problem: "One commerce platform serving many branded storefronts.", metric: { value: "7", label: "storefront theme packs developed and maintained on a shared Next.js codebase" }, result: "Delivered tenant-aware Stripe and Razorpay checkout, a WhatsApp ordering flow, and localized themes." },
  3: { problem: "A bilingual storefront for English- and Arabic-speaking customers.", metric: { value: "2", label: "languages supported with right-to-left layouts, SEO metadata, and sitemaps" }, result: "Delivered CMS-driven content and product pages with Incremental Static Regeneration." },
}
const filters = ["All work", "Web", "Mobile", "POS"]
const projectOrder = [5, 6, 2, 4, 1, 3]
const projectAccents = {
  1: "#d9a45d",
  2: "#ffb15c",
  3: "#72d39a",
  4: "#8c85ff",
  5: "#62b5f6",
  6: "#ff7d68",
}
const orderedProjects = [...projects].sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id))

const linkedProject = hash => {
  const match = hash.match(/^#project-(\d+)$/)
  const id = match ? Number(match[1]) : null
  return projects.some(project => project.id === id) ? id : null
}

const singleColumnQuery = "(max-width: 960px)"
const isSingleColumn = () => window.matchMedia(singleColumnQuery).matches
const subscribeToWorkLayout = onChange => {
  const media = window.matchMedia(singleColumnQuery)
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function ProjectDetails({ project, featured, onClose }) {
  const caseStudy = caseStudies[project.id]
  return (
    <section id={`details-${project.id}`} className="work-detail-panel" role="region" aria-labelledby={`details-title-${project.id}`}
      style={{ "--project-accent": projectAccents[project.id] }}>
      <header className="work-detail-header">
        <div>
          <p className="work-detail-kicker">{caseStudy ? "CASE STUDY" : "MY CONTRIBUTION"}</p>
          <h4 id={`details-title-${project.id}`}>{project.name}</h4>
          <p className="case-study-role">{project.role} · {project.year}</p>
        </div>
        <button type="button" className="work-detail-close" aria-label={`Close ${project.name} details`} onClick={onClose}>Close details <X size={17} /></button>
      </header>
      <div className={`work-detail-body ${featured ? "no-gallery" : ""}`}>
        {!featured && <ProjectGallery project={project} />}
        <div className="case-study-details">
          {!featured && <p className="work-detail-result">{stories[project.id].result}</p>}
        {caseStudy ? <>
          <h5 className="case-study-title">{caseStudy.title}</h5>
          <div className="case-study-sections">
            {caseStudy.sections.map(section => <div className="case-study-section" key={section.heading}><h6>{section.heading}</h6><p>{section.text}</p></div>)}
          </div>
          <details className="case-study-more"><summary>Other work on this project</summary><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></details>
        </> : <><p className="work-detail-description">{project.description}</p><ul className="work-detail-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></>}
        <p className="case-study-role work-detail-stack">Tech stack: {project.stack.join(" · ")}</p>
        </div>
      </div>
    </section>
  )
}

function ProjectGallery({ project, featured }) {
  const [current, setCurrent] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const mobile = project.screenshotType === "mobile"
  const images = project.images ?? []
  if (!images.length) return null
  return (
    <div className={`project-gallery ${mobile ? "project-gallery-mobile" : "project-gallery-web"} ${featured ? "featured-gallery" : ""}`}>
      <div className="gallery-label"><span>{project.imageLabels?.[current] ?? (project.id === 5 ? "POINT OF SALE" : mobile ? "MOBILE APPLICATION" : "WEB EXPERIENCE")}</span><span>{String(projectOrder.indexOf(project.id) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
      <div className={mobile ? "gallery-phone" : "gallery-browser"}>
        {!mobile && <div className="gallery-chrome" aria-hidden="true"><i /><i /><i /><span>{project.name}</span></div>}
        <div className="gallery-viewport">
          <AnimatePresence initial={false} mode="wait">
            <motion.img key={images[current]} src={images[current]} alt={`${project.name} — ${project.imageLabels?.[current] ?? `screen ${current + 1} of ${images.length}`}`} loading="lazy" decoding="async"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} />
          </AnimatePresence>
        </div>
      </div>
      <div className="gallery-actions">
        {images.length > 1 && <div className="gallery-controls">
          <button type="button" onClick={() => setCurrent(value => (value - 1 + images.length) % images.length)} aria-label={`Previous ${project.name} screenshot`}><ChevronLeft size={17} /></button>
          <span aria-live="polite">{String(current + 1).padStart(2, "0")} <span>/ {String(images.length).padStart(2, "0")}</span></span>
          <button type="button" onClick={() => setCurrent(value => (value + 1) % images.length)} aria-label={`Next ${project.name} screenshot`}><ChevronRight size={17} /></button>
        </div>}
        <button type="button" className="gallery-expand" aria-haspopup="dialog"
          aria-label={`Expand ${project.name} screenshot`} onClick={() => setViewerOpen(true)}>
          <Maximize2 size={15} aria-hidden="true" />Expand screenshot
        </button>
      </div>
      {viewerOpen && <ScreenshotViewer project={project} current={current} onChange={setCurrent} onClose={() => setViewerOpen(false)} />}
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState("All work")
  const [expanded, setExpanded] = useState(() => linkedProject(window.location.hash))
  const singleColumn = useSyncExternalStore(subscribeToWorkLayout, isSingleColumn, () => false)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    let frame
    const revealProject = (hash, { focus = false } = {}) => {
      const id = linkedProject(hash)
      if (id === null) return
      setFilter("All work")
      setExpanded(id)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const article = document.getElementById(`project-${id}`)
        article?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" })
        if (focus) article?.focus({ preventScroll: true })
      })
    }
    const onHashChange = () => revealProject(window.location.hash, { focus: true })
    const onProjectRequest = event => revealProject(event.detail, { focus: true })
    const onProjectLink = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href^="#project-"]') : null
      if (link) {
        event.preventDefault()
        openProject(link.getAttribute("href"))
      }
    }
    revealProject(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    window.addEventListener(projectNavigationEvent, onProjectRequest)
    document.addEventListener("click", onProjectLink)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
      window.removeEventListener(projectNavigationEvent, onProjectRequest)
      document.removeEventListener("click", onProjectLink)
      cancelAnimationFrame(frame)
    }
  }, [reducedMotion])
  const filtered = orderedProjects.filter(project => filter === "All work" || (filter === "POS" ? project.id === 5 : filter === "Mobile" ? project.screenshotType === "mobile" : [1, 3].includes(project.id)))
  const expandedProject = filtered.find(project => project.id === expanded)
  const detailsAfter = detailInsertionIndex(filtered.map(project => project.id), expanded, { singleColumn, featuredFirst: filter === "All work" })
  const closeDetails = () => {
    document.getElementById(`project-toggle-${expanded}`)?.focus({ preventScroll: true })
    setExpanded(null)
  }

  return (
    <section id="projects" className="section-shell selected-work">
      <div className="section-container">
        <div className="work-heading">
          <div><p className="section-kicker">01 / PROJECTS</p><h2>Ideas into<br /><span className="accent">everyday products.</span></h2></div>
          <p>A few things I’ve helped bring to life.<br />Real constraints, real releases, real users.</p>
        </div>
        <div className="work-toolbar">
          <div className="work-filters" role="group" aria-label="Filter projects">
            {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setExpanded(null) }} className={filter === item ? "is-active" : ""}>{item}{item === "All work" && <span>{String(projects.length).padStart(2, "0")}</span>}</button>)}
          </div>
          <span className="work-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</span>
        </div>
        <div className="work-grid">
          {filtered.flatMap((project, index) => {
            const story = stories[project.id]
            const isOpen = expanded === project.id
            const featured = filter === "All work" && index === 0
            const caseStudy = caseStudies[project.id]
            const card = (
              <motion.article id={`project-${project.id}`} key={project.id} tabIndex={-1}
                style={{ "--project-accent": projectAccents[project.id] }}
                className={`work-card ${featured ? "work-card-featured" : "work-card-compact"}`}
                initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.5 }}>
                {featured ? <ProjectGallery project={project} featured /> : <div className={`compact-thumb ${project.screenshotType === "mobile" ? "compact-thumb-mobile" : "compact-thumb-web"}`} aria-hidden="true"><img src={project.images[0]} alt="" loading="lazy" decoding="async" /></div>}
                <div className="work-card-copy">
                  <div className="work-meta"><span>{featured ? `FEATURED / ${project.id === 5 ? "FLUTTER POS" : "FLUTTER MOBILE"}` : project.type}</span><span className="production-label"><span className="status-dot" />{project.status}</span></div>
                  <h3>{project.name}</h3>
                  <p className="work-problem">{story.problem}</p>
                  <div className="work-metric"><strong>{story.metric.value}</strong><span>{story.metric.label}</span></div>
                  {featured && <p className="work-result-line">{story.result}</p>}
                  <div className="work-stack">{project.stack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>
                  <button id={`project-toggle-${project.id}`} type="button" className="case-study-toggle" aria-expanded={isOpen} aria-controls={isOpen ? `details-${project.id}` : undefined} onClick={() => setExpanded(isOpen ? null : project.id)}>
                    {isOpen ? "Close details" : caseStudy ? "Read case study" : "My contribution"}<ChevronDown size={17} style={{ transform: isOpen ? "rotate(180deg)" : undefined }} />
                  </button>
                </div>
              </motion.article>
            )
            return index === detailsAfter && expandedProject
              ? [card, <ProjectDetails key={`details-${expandedProject.id}`} project={expandedProject} featured={filter === "All work" && filtered[0]?.id === expandedProject.id} onClose={closeDetails} />]
              : [card]
          })}
        </div>
        <div className="work-endnote"><p>Have something in mind? Let’s talk through it.</p><a href="#contact">Get in touch <ArrowUpRight size={18} /></a></div>
      </div>
      <Bug id="proj-bug" className="top-12 right-8" />
    </section>
  )
}
