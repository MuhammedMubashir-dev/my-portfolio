export const projectNavigationEvent = "portfolio:open-project"

export function openProject(hash, { updateHash = true } = {}) {
  window.dispatchEvent(new CustomEvent(projectNavigationEvent, { detail: hash }))
  if (updateHash && window.location.hash !== hash) window.location.hash = hash
}
