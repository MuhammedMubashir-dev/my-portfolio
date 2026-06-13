import { useEffect, useState } from "react"

export default function useActiveSection(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset
      let current = sections[0]?.id ?? ""

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          current = section.id
        }
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [sectionIds, offset])

  return activeSection
}
