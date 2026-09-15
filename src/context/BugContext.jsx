import { useCallback, useState } from "react"
import { BugContext } from "./BugContextValue"

export function BugProvider({ children }) {
  const [squashedBugs, setSquashedBugs] = useState([])
  const resetBugs = useCallback(() => setSquashedBugs([]), [])

  const squashBug = useCallback((id) => {
    setSquashedBugs((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id]
      }
      return prev
    })
  }, [])

  return (
    <BugContext.Provider value={{ squashedBugs, squashBug, resetBugs, totalBugs: 3 }}>
      {children}
    </BugContext.Provider>
  )
}
