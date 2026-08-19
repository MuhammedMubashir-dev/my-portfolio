import { useContext } from "react"
import { BugContext } from "./BugContextValue"

export default function useBugContext() {
  const context = useContext(BugContext)
  if (!context) {
    throw new Error("useBugContext must be used within a BugProvider")
  }
  return context
}
