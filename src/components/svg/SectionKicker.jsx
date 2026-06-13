import SectionAccent from "./SectionAccent"

export default function SectionKicker({ children, className = "" }) {
  return (
    <div className={`section-kicker-wrap ${className}`}>
      <p className="section-kicker">{children}</p>
      <SectionAccent />
    </div>
  )
}
