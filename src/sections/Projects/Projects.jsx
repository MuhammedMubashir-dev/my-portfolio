import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { projects } from "../../data/projects"
import { caseStudies } from "../../data/caseStudies"
import Bug from "../../components/shared/Bug"

const stories = {
  1: { problem: "Different storefronts. One shared platform.", contribution: "Built reusable theme packs, product discovery, and checkout flows for a multi-tenant commerce platform.", result: "Localized storefronts with integrated payments." },
  2: { problem: "Help delivery staff manage each pickup and handoff.", contribution: "Built date-filtered bag lists, independent pagination, maps, and OTP verification workflows.", result: "Four delivery stages with fixes for OTP failures and endless loading." },
  6: { problem: "Make ordering and paying easier for customers.", contribution: "Integrated Razorpay checkout, improved order loading, and added app-update and maintenance flows.", result: "My Orders API calls reduced from six to two by reusing responses." },
  3: { problem: "A storefront for English and Arabic customers.", contribution: "Connected CMS content and commerce APIs, added localization, and improved the Next.js architecture.", result: "Bilingual storefront with SEO, sitemaps, and ISR-backed content." },
  4: { problem: "Make business connections easier to discover.", contribution: "Built company profiles, connection requests, subscriptions, and deep-link journeys in React Native.", result: "Shareable profiles and connected navigation across mobile releases." },
  5: { problem: "Bring everyday retail operations into one app.", contribution: "Built billing, inventory, purchase, and day-close workflows in Flutter.", result: "English and Arabic receipts, reporting, and retail workflows." },
}
const filters = ["All work", "Web", "Mobile", "POS"]
const projectOrder = [5, 6, 2, 1, 3, 4]
const orderedProjects = [...projects].sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id))

function ProjectGallery({ project, featured }) {
  const [current, setCurrent] = useState(0)
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
            <motion.img key={images[current]} src={images[current]} alt={`${project.name} — ${project.imageLabels?.[current] ?? `screen ${current + 1} of ${images.length}`}`} loading="lazy"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }} />
          </AnimatePresence>
        </div>
      </div>
      {images.length > 1 && <div className="gallery-controls">
        <button type="button" onClick={() => setCurrent(value => (value - 1 + images.length) % images.length)} aria-label={`Previous ${project.name} screenshot`}><ChevronLeft size={17} /></button>
        <span aria-live="polite">{String(current + 1).padStart(2, "0")} <span>/ {String(images.length).padStart(2, "0")}</span></span>
        <button type="button" onClick={() => setCurrent(value => (value + 1) % images.length)} aria-label={`Next ${project.name} screenshot`}><ChevronRight size={17} /></button>
      </div>}
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState("All work")
  const [expanded, setExpanded] = useState(null)
  const reducedMotion = useReducedMotion()
  const filtered = orderedProjects.filter(project => filter === "All work" || (filter === "POS" ? project.id === 5 : filter === "Mobile" ? project.screenshotType === "mobile" : [1, 3].includes(project.id)))

  return (
    <section id="projects" className="section-shell selected-work">
      <div className="section-container">
        <div className="work-heading">
          <div><p className="section-kicker">01 / SELECTED WORK</p><h2>Ideas into<br /><span className="accent">everyday products.</span></h2></div>
          <p>A few things I’ve helped bring to life.<br />Real constraints, real releases, real users.</p>
        </div>
        <div className="work-toolbar">
          <div className="work-filters" role="group" aria-label="Filter projects">
            {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setExpanded(null) }} className={filter === item ? "is-active" : ""}>{item}{item === "All work" && <span>{String(projects.length).padStart(2, "0")}</span>}</button>)}
          </div>
          <span className="work-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"} <span> / 2 more private</span></span>
        </div>
        <div className="work-grid">
          {filtered.map((project, index) => {
            const story = stories[project.id]
            const isOpen = expanded === project.id
            const featured = filter === "All work" && index < 2
            const caseStudy = caseStudies[project.id]
            return (
              <motion.article id={`project-${project.id}`} key={project.id} className={`work-card ${featured ? "work-card-featured" : ""}`}
                initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.5 }}>
                <ProjectGallery project={project} featured={featured} />
                <div className="work-card-copy">
                  <div className="work-meta"><span>{featured ? `FEATURED / ${project.id === 5 ? "FLUTTER POS" : "FLUTTER MOBILE"}` : project.type}</span><span className="production-label"><span className="status-dot" />{project.status}</span></div>
                  <h3>{project.name}</h3>
                  <p className="work-problem">{story.problem}</p>
                  <p className="work-contribution">{story.contribution}</p>
                  <div className="work-result"><span>DELIVERED</span><p>{story.result}</p></div>
                  <div className="work-stack">{project.stack.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>
                  <button type="button" className="case-study-toggle" aria-expanded={isOpen} aria-controls={`details-${project.id}`} onClick={() => setExpanded(isOpen ? null : project.id)}>
                    {isOpen ? "Close details" : caseStudy ? "Read case study" : "My contribution"}<ChevronDown size={17} style={{ transform: isOpen ? "rotate(180deg)" : undefined }} />
                  </button>
                  <div id={`details-${project.id}`} hidden={!isOpen} className="case-study-details">
                    <p className="case-study-role">{project.role} · {project.year}</p>
                    {caseStudy ? <>
                      <h4 className="case-study-title">{caseStudy.title}</h4>
                      {caseStudy.sections.map(section => <div className="case-study-section" key={section.heading}><h5>{section.heading}</h5><p>{section.text}</p></div>)}
                      <details className="case-study-more"><summary>Other work on this project</summary><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></details>
                    </> : <><p>{project.description}</p><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul></>}
                    <p className="case-study-role">Full stack: {project.stack.join(" · ")}</p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
        <div className="work-endnote"><p>Have something in mind? Let’s talk through it.</p><a href="#contact">Start a conversation <ArrowUpRight size={18} /></a></div>
      </div>
      <Bug id="proj-bug" className="top-12 right-8" />
    </section>
  )
}
