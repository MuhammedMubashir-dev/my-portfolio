export default function HeroAmbient() {
  return (
    <div className="hero-ambient" aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="320"
          cy="320"
          r="248"
          stroke="rgba(246, 242, 232, 0.08)"
          strokeWidth="1"
        />
        <circle
          className="svg-orbit-ring"
          cx="320"
          cy="320"
          r="198"
          stroke="rgba(255, 122, 47, 0.22)"
          strokeWidth="1"
          strokeDasharray="8 14"
        />
        <circle
          className="svg-orbit-ring-reverse"
          cx="320"
          cy="320"
          r="148"
          stroke="rgba(246, 242, 232, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 10"
        />

        <path
          className="svg-draw-path"
          d="M96 420 C180 300, 260 500, 320 320 S460 140, 544 220"
          stroke="#FF7A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        <path
          className="svg-flow-path"
          d="M160 180 L320 320 L480 180"
          stroke="rgba(246, 242, 232, 0.28)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        <circle className="svg-pulse-node" cx="96" cy="420" r="5" fill="#FF7A2F" />
        <circle className="svg-pulse-node-delayed" cx="320" cy="320" r="6" fill="#B8F06A" />
        <circle className="svg-pulse-node-slow" cx="544" cy="220" r="4" fill="#FF9A5F" />

        <rect
          x="286"
          y="96"
          width="68"
          height="68"
          rx="12"
          stroke="rgba(246, 242, 232, 0.14)"
          strokeWidth="1"
          transform="rotate(12 320 130)"
        />
        <rect
          x="452"
          y="452"
          width="52"
          height="52"
          rx="10"
          stroke="rgba(255, 122, 47, 0.28)"
          strokeWidth="1"
          transform="rotate(-18 478 478)"
        />
      </svg>
    </div>
  )
}
