// Pixel mascot from the Claude Code terminal, redrawn on a 16 x 10 grid.
export default function ClaudeMascot({ size = 24, className = "", label = "Claude Code mascot" }) {
  const accessibility = label ? { role: "img", "aria-label": label } : { "aria-hidden": true }
  return (
    <svg className={`claude-mascot ${className}`} width={size} height={Math.round(size * 0.625)} viewBox="0 0 16 10"
      shapeRendering="crispEdges" {...accessibility}>
      <g className="claude-mascot-body">
        <rect x="2" y="0" width="12" height="8" fill="#D97757" />
        <rect x="0" y="4" width="16" height="2" fill="#D97757" />
        <rect className="claude-mascot-eye" x="4" y="2" width="1" height="2" fill="#fff" />
        <rect className="claude-mascot-eye" x="11" y="2" width="1" height="2" fill="#fff" />
      </g>
      <rect className="claude-mascot-leg claude-mascot-leg-a" x="3" y="8" width="1" height="2" fill="#D97757" />
      <rect className="claude-mascot-leg claude-mascot-leg-b" x="5" y="8" width="1" height="2" fill="#D97757" />
      <rect className="claude-mascot-leg claude-mascot-leg-a" x="10" y="8" width="1" height="2" fill="#D97757" />
      <rect className="claude-mascot-leg claude-mascot-leg-b" x="12" y="8" width="1" height="2" fill="#D97757" />
    </svg>
  )
}
