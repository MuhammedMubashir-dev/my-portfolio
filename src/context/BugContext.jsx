import { createContext, useContext, useState, useCallback } from "react"

const BugContext = createContext()

export function BugProvider({ children }) {
  const [squashedBugs, setSquashedBugs] = useState([])

  const squashBug = useCallback((id) => {
    setSquashedBugs((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id]
      }
      return prev
    })
  }, [])

  return (
    <BugContext.Provider value={{ squashedBugs, squashBug, totalBugs: 3 }}>
      {children}
    </BugContext.Provider>
  )
}

export function useBugContext() {
  const context = useContext(BugContext)
  if (!context) {
    throw new Error("useBugContext must be used within a BugProvider")
  }
  return context
}
