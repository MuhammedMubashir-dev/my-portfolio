import { Component, lazy, Suspense, useCallback, useState } from "react"
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { ArrowUpRight, RotateCcw } from "lucide-react"
import { projects } from "../../data/projects"
import "./project-collage.css"

const DeviceScene = lazy(() => import("./DeviceScene"))
const selections = [
  {
    id: 5,
    label: "EPOSMOB",
    description: "Billing, inventory & retail operations",
    views: [{ image: 0, label: "Billing" }, { image: 2, label: "Stock" }, { image: 1, label: "Day close" }],
  },
  {
    id: 6,
    label: "Ganvin Customer",
    description: "Laundry ordering & payments",
    views: [{ image: 0, label: "Order bag" }, { image: 2, label: "Checkout" }],
  },
]

const featuredProjects = selections.map((selection, index) => {
  const project = projects.find(item => item.id === selection.id)
  return {
    ...selection,
    number: String(index + 1).padStart(2, "0"),
    views: selection.views.map(view => ({ ...view, src: project.images[view.image] })),
  }
})

class DeviceSceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError?.() }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function DevicePoster({ views }) {
  return <div className="device-poster" aria-hidden="true">
    <img src={`/models/previews/devices-${views[0]}-${views[1]}.webp`} alt="" width="1290" height="963"
      decoding="async" fetchPriority="high" />
  </div>
}

export default function ProjectCollage() {
  const reducedMotion = useReducedMotion()
  const [views, setViews] = useState([0, 0])
  const [attempt, setAttempt] = useState(0)
  const [retrying, setRetrying] = useState(false)
  const [replay, setReplay] = useState(0)
  const [previewReady, setPreviewReady] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)
  const onReady = useCallback(() => setPreviewReady(true), [])
  const onError = useCallback(() => { setPreviewReady(false); setPreviewFailed(true) }, [])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 110, damping: 24 })
  const springY = useSpring(pointerY, { stiffness: 110, damping: 24 })
  const laptopImage = featuredProjects[0].views[views[0]].src
  const phoneImage = featuredProjects[1].views[views[1]].src
  const previewState = previewFailed ? "failed" : previewReady ? "ready" : "loading"

  async function retryPreview() {
    setRetrying(true)
    try {
      const { resetDeviceAssets } = await import("./deviceAssets")
      resetDeviceAssets(featuredProjects.flatMap(project => project.views.map(view => view.src)))
      setPreviewReady(false)
      setPreviewFailed(false)
      setAttempt(value => value + 1)
    } catch {
      // Keep the screenshots and retry available if the connection is still down.
      return
    } finally {
      setRetrying(false)
    }
  }

  function moveDevices(event) {
    if (reducedMotion || event.pointerType !== "mouse") return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  return <figure className="project-collage" aria-label="Selected company projects: EPOSMOB and Ganvin Customer">
    <div className="collage-heading"><span>SELECTED WORK</span><span>Mobile / Point of sale</span></div>
    <div id="featured-device-preview" className="device-stage" data-preview-state={previewState}
      aria-busy={previewState === "loading"} onPointerMove={moveDevices}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
      <DevicePoster views={views} />
      <DeviceSceneBoundary key={attempt} onError={onError} fallback={<button type="button" className="device-retry"
        onClick={retryPreview} disabled={retrying}>{retrying ? "Retrying preview…" : "Retry 3D preview"}</button>}>
        <Suspense fallback={null}>
          <DeviceScene laptopImage={laptopImage} phoneImage={phoneImage}
            springX={springX} springY={springY} reducedMotion={reducedMotion} replay={replay}
            onReady={onReady} />
        </Suspense>
      </DeviceSceneBoundary>
      <p className="device-load-status" role="status">
        {previewState === "loading" ? <><span className="device-load-spinner" aria-hidden="true" />Loading 3D preview</> :
          previewState === "failed" ? "Image preview available" : <span className="sr-only">3D preview ready</span>}
      </p>
      {previewReady && !reducedMotion && <button type="button" className="device-replay"
        onClick={() => setReplay(value => value + 1)} aria-label="Replay device animation">
        <RotateCcw size={13} aria-hidden="true" /><span>Replay</span>
      </button>}
    </div>
    <figcaption className="collage-projects">
      {featuredProjects.map((project, projectIndex) => <div className="collage-project" key={project.id}>
        <a className="collage-project-link" href={"#project-" + project.id}>
          <span className="collage-project-number">{project.number}</span>
          <span><strong>{project.label}</strong><span>{project.description}</span></span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <div className="collage-views" role="group" aria-label={project.label + " screenshots"}>
          {project.views.map((view, viewIndex) => <button key={view.src} type="button"
            aria-pressed={views[projectIndex] === viewIndex} aria-controls="featured-device-preview"
            onClick={() => setViews(current => current.map((value, index) => index === projectIndex ? viewIndex : value))}>
            {view.label}
          </button>)}
        </div>
        <a className="collage-full-image" href={project.views[views[projectIndex]].src} target="_blank" rel="noreferrer"
          aria-label={`View full-size ${project.label} ${project.views[views[projectIndex]].label} screenshot`}>
          Full-size screenshot <ArrowUpRight size={12} aria-hidden="true" />
        </a>
        <p className="sr-only" aria-live="polite">{project.label + ": " + project.views[views[projectIndex]].label + " screenshot"}</p>
      </div>)}
    </figcaption>
  </figure>
}
