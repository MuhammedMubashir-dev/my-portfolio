export function detailInsertionIndex(projectIds, expandedId, { singleColumn = false, featuredFirst = false } = {}) {
  const selectedIndex = projectIds.indexOf(expandedId)
  if (selectedIndex === -1) return -1
  if (singleColumn || (featuredFirst && selectedIndex === 0)) return selectedIndex

  const pairOffset = featuredFirst ? 1 : 0
  const pairEnd = pairOffset + Math.floor((selectedIndex - pairOffset) / 2) * 2 + 1
  return Math.min(pairEnd, projectIds.length - 1)
}
