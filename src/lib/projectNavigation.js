export const projectNavigationEvent = "portfolio:open-project"

export function openProject(hash, { updateHash = true } = {}) {
  if (updateHash && window.location.hash !== hash) {
    window.location.hash = hash
    return
  }

  window.dispatchEvent(new CustomEvent(projectNavigationEvent, { detail: hash }))
}
