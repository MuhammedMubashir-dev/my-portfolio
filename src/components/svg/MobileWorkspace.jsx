import { useEffect, useId, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { ArrowUpRight, Layers2, MousePointer2, Pause, Play } from "lucide-react"
import "./mobile-workspace.css"

const WIDTH = 960
const HEIGHT = 780
const TRAIL_COUNT = 5
const LAYERS = [
  { name: "architecture", depth: 0.35 },
  { name: "interfaces", depth: 1 },
  { name: "details", depth: 1.7 },
]

function blobPath(x, y, radius, phase) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2
    const size = radius * (1 + Math.sin(angle * 3 + phase) * 0.07 + Math.cos(angle * 2 - phase) * 0.04)
    return [x + Math.cos(angle) * size, y + Math.sin(angle) * size]
  })
  const midpoint = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const start = midpoint(points.at(-1), points[0])
  return `M${start.join(" ")} ${points.map((point, index) => `Q${point.join(" ")} ${midpoint(point, points[(index + 1) % points.length]).join(" ")}`).join(" ")} Z`
}

export default function MobileWorkspace() {
  const reducedMotion = useReducedMotion()
  const [outline, setOutline] = useState(false)
  const [paused, setPaused] = useState(false)
  const id = useId().replace(/:/g, "")
  const svgRef = useRef(null)
  const blobRef = useRef(null)
  const trailRefs = useRef([])
  const maskRef = useRef(null)
  const controllerRef = useRef(null)
  const figureRef = useRef(null)

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const target = { x: WIDTH / 2, y: HEIGHT / 2, opacity: 0 }
    const current = { ...target }
    const offset = { x: 0, y: 0 }
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ ...target }))
    let frame = 0
    let lastTime = 0
    let visible = true

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      target.opacity = 0
      current.opacity = 0
      maskRef.current?.setAttribute("opacity", "0")
      offset.x = 0
      offset.y = 0
      svgRef.current?.style.setProperty("--workspace-x", "0px")
      svgRef.current?.style.setProperty("--workspace-y", "0px")
    }
    const motionAllowed = () => !reducedMotion && !paused && !outline && visible && !document.hidden
    const syncMotion = () => figureRef.current?.setAttribute("data-animate", String(motionAllowed()))
    const enabled = () => media.matches && motionAllowed()
    const draw = time => {
      frame = 0
      if (!enabled()) { stop(); return }
      const elapsed = lastTime ? Math.min(40, time - lastTime) : 16
      lastTime = time
      const follow = 1 - Math.exp(-elapsed / 55)
      current.x += (target.x - current.x) * follow
      current.y += (target.y - current.y) * follow
      current.opacity += (target.opacity - current.opacity) * (1 - Math.exp(-elapsed / 110))
      const desiredX = target.opacity ? (target.x / WIDTH - 0.5) * 20 : 0
      const desiredY = target.opacity ? (target.y / HEIGHT - 0.5) * 14 : 0
      offset.x += (desiredX - offset.x) * follow
      offset.y += (desiredY - offset.y) * follow
      svgRef.current?.style.setProperty("--workspace-x", `${offset.x.toFixed(2)}px`)
      svgRef.current?.style.setProperty("--workspace-y", `${offset.y.toFixed(2)}px`)
      blobRef.current?.setAttribute("d", blobPath(current.x, current.y, 125, time * 0.0008))
      maskRef.current?.setAttribute("opacity", current.opacity.toFixed(3))
      trail.forEach((point, index) => {
        const previous = index === 0 ? current : trail[index - 1]
        const blend = 1 - Math.exp(-elapsed / (75 + index * 22))
        point.x += (previous.x - point.x) * blend
        point.y += (previous.y - point.y) * blend
        const circle = trailRefs.current[index]
        circle?.setAttribute("cx", point.x.toFixed(2))
        circle?.setAttribute("cy", point.y.toFixed(2))
      })
      if (target.opacity || current.opacity > 0.003) frame = requestAnimationFrame(draw)
      else stop()
    }
    const start = () => { if (!frame && enabled()) frame = requestAnimationFrame(draw) }
    controllerRef.current = {
      move(event) {
        if (event.pointerType !== "mouse" || !enabled()) return
        const bounds = svgRef.current?.getBoundingClientRect()
        if (!bounds?.width || !bounds.height) return
        target.x = Math.max(0, Math.min(WIDTH, ((event.clientX - bounds.left) / bounds.width) * WIDTH))
        target.y = Math.max(0, Math.min(HEIGHT, ((event.clientY - bounds.top) / bounds.height) * HEIGHT))
        if (current.opacity < 0.01) {
          current.x = target.x
          current.y = target.y
          trail.forEach(point => { point.x = target.x; point.y = target.y })
        }
        target.opacity = 1
        start()
      },
      leave() { target.opacity = 0; start() },
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncMotion()
      if (!visible) stop()
    })
    if (svgRef.current) observer.observe(svgRef.current)
    const suspend = () => { stop(); syncMotion() }
    syncMotion()
    media.addEventListener("change", stop)
    window.addEventListener("blur", stop)
    document.addEventListener("visibilitychange", suspend)
    return () => {
      stop()
      observer.disconnect()
      media.removeEventListener("change", stop)
      window.removeEventListener("blur", stop)
      document.removeEventListener("visibilitychange", suspend)
      controllerRef.current = null
    }
  }, [reducedMotion, outline, paused])

  return (
    <figure ref={figureRef} className="mobile-workspace" data-reduced-motion={Boolean(reducedMotion)} data-outline={outline}>
      <div className="workspace-heading">
        <span><span className="status-dot" /> CONNECTED APPLICATIONS</span>
        <button type="button" className="workspace-view" aria-pressed={outline} onClick={() => setOutline(value => !value)}>
          <Layers2 size={14} aria-hidden="true" /> {outline ? "Colour view" : "Outline view"}
        </button>
      </div>
      <svg ref={svgRef} className="workspace-scene" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby={`${id}-title ${id}-description`}
        onPointerMove={event => controllerRef.current?.move(event)} onPointerLeave={() => controllerRef.current?.leave()} onPointerCancel={() => controllerRef.current?.leave()}>
        <title id={`${id}-title`}>A world of connected applications</title>
        <desc id={`${id}-description`}>A mobile application framed by a sculptural orange arch, with floating commerce and delivery interfaces, a package, and a printed receipt. Move the pointer to explore the layers and reveal the outline.</desc>
        <defs>
          <filter id={`${id}-soft-edge`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
          <g id={`${id}-reveal-shape`} ref={maskRef} opacity="0">
            <path ref={blobRef} />
            {Array.from({ length: TRAIL_COUNT }, (_, i) => <circle key={i} ref={node => { trailRefs.current[i] = node }} cx="480" cy="390" r={92 - i * 12} opacity={0.48 - i * 0.075} />)}
          </g>
          <mask id={`${id}-colour-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={WIDTH} height={HEIGHT} style={{ maskType: "luminance" }}>
            <rect width={WIDTH} height={HEIGHT} fill="white" />
            <use href={`#${id}-reveal-shape`} fill="black" filter={`url(#${id}-soft-edge)`} />
          </mask>
          <mask id={`${id}-outline-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={WIDTH} height={HEIGHT} style={{ maskType: "luminance" }}>
            <rect width={WIDTH} height={HEIGHT} fill="black" />
            <use href={`#${id}-reveal-shape`} fill="white" filter={`url(#${id}-soft-edge)`} />
          </mask>
        </defs>
        {LAYERS.map(layer => (
          <g key={layer.name} className={`workspace-layer workspace-layer-${layer.name}`} style={{ "--depth": layer.depth }}>
            <g className="workspace-colour" opacity={outline ? 0 : 1} mask={`url(#${id}-colour-mask)`}>
              <g className="workspace-parallax"><g className="workspace-drift">
                <image href={`/artwork/world-${layer.name}.svg`} width={WIDTH} height={HEIGHT} />
              </g></g>
            </g>
            <g className="workspace-outline" mask={outline ? undefined : `url(#${id}-outline-mask)`}>
              <g className="workspace-parallax"><g className="workspace-drift">
                <image href={`/artwork/world-${layer.name}-outline.svg`} width={WIDTH} height={HEIGHT} />
              </g></g>
            </g>
          </g>
        ))}
        <g className="workspace-signals" aria-hidden="true">
          <path d="M218 111C255 74 312 62 366 76" />
          <path d="M815 197C866 212 890 257 875 294" />
        </g>
      </svg>
      <figcaption className="workspace-caption">
        <span className="workspace-pointer-hint"><MousePointer2 size={12} aria-hidden="true" /> Move to explore</span>
        <span className="workspace-static-hint">Mobile · Commerce · Delivery</span>
        <div className="workspace-tools">
          {!reducedMotion && <button type="button" className="workspace-motion" aria-pressed={paused} aria-label={paused ? "Resume animation" : "Pause animation"} onClick={() => setPaused(value => !value)}>
            {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />} {paused ? "Play" : "Pause"}
          </button>}
          <a href="/artwork/connected-world.svg" download="Mubashir-Connected-World.svg">SVG <ArrowUpRight size={13} aria-hidden="true" /><span className="sr-only"> · Download illustration</span></a>
        </div>
      </figcaption>
    </figure>
  )
}
