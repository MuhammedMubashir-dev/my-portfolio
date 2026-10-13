import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useId, useRef } from "react"
import { createPortal } from "react-dom"
import "./screenshot-viewer.css"

export default function ScreenshotViewer({ project, current, onChange, onClose }) {
  const dialogRef = useRef(null)
  const viewportRef = useRef(null)
  const titleId = useId()
  const captionId = useId()
  const images = project.images
  const label = project.imageLabels?.[current] ?? `Screen ${current + 1}`

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const root = document.documentElement
    const body = document.body
    const previousRootOverflow = root.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousScrollbarGutter = root.style.scrollbarGutter

    // The native modal traps focus and makes the rest of the page inert.
    dialog.showModal()
    window.dispatchEvent(new CustomEvent("portfolio:screenshot-viewer", { detail: { open: true } }))
    root.style.scrollbarGutter = "stable"
    root.style.overflow = "hidden"
    body.style.overflow = "hidden"

    return () => {
      if (dialog.open) dialog.close()
      root.style.overflow = previousRootOverflow
      body.style.overflow = previousBodyOverflow
      root.style.scrollbarGutter = previousScrollbarGutter
      window.dispatchEvent(new CustomEvent("portfolio:screenshot-viewer", { detail: { open: false } }))
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [])

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [current])

  const navigate = direction => onChange((current + direction + images.length) % images.length)

  return createPortal(
    <dialog ref={dialogRef} className="screenshot-viewer" aria-labelledby={titleId} aria-describedby={captionId}
      data-lenis-prevent onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
      onKeyDown={event => {
        if (event.key === "Tab") {
          const focusable = [...event.currentTarget.querySelectorAll('button:not([disabled]), [tabindex="0"]')]
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
          return
        }
        if (images.length < 2 || event.altKey || event.ctrlKey || event.metaKey) return
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault()
          navigate(event.key === "ArrowLeft" ? -1 : 1)
        }
      }}>
      <header className="screenshot-viewer-header">
        <div>
          <p className="screenshot-viewer-kicker">PROJECT SCREENSHOT</p>
          <h2 id={titleId}>{project.name}</h2>
        </div>
        <button type="button" className="screenshot-viewer-close" onClick={onClose} autoFocus>
          <span>Close</span><X size={18} aria-hidden="true" />
        </button>
      </header>
      <div ref={viewportRef} className="screenshot-viewer-viewport" tabIndex={0} aria-label="Scrollable screenshot" data-lenis-prevent>
        <img className={`screenshot-viewer-image ${project.screenshotType === "mobile" ? "screenshot-viewer-image-mobile" : ""}`}
          src={images[current]} alt={`${project.name} — ${label}`} decoding="async" />
      </div>
      <footer className="screenshot-viewer-footer">
        <div className="screenshot-viewer-caption" aria-live="polite" aria-atomic="true">
          <p id={captionId}>{label}</p>
          <span>Screenshot {current + 1} of {images.length}</span>
        </div>
        {images.length > 1 && <div className="screenshot-viewer-controls" role="group" aria-label="Browse screenshots">
          <button type="button" onClick={() => navigate(-1)} aria-label={`Previous ${project.name} screenshot`}><ChevronLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => navigate(1)} aria-label={`Next ${project.name} screenshot`}><ChevronRight size={20} aria-hidden="true" /></button>
        </div>}
      </footer>
    </dialog>,
    document.body,
  )
}
