export default function ContactNetwork() {
  return (
    <div className="contact-network" aria-hidden="true">
      <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="160" cy="160" r="118" stroke="rgba(246, 242, 232, 0.1)" strokeWidth="1" />
        <circle
          className="svg-orbit-ring-reverse"
          cx="160"
          cy="160"
          r="86"
          stroke="rgba(255, 122, 47, 0.24)"
          strokeWidth="1"
          strokeDasharray="6 10"
        />

        <path
          className="svg-flow-path"
          d="M72 160 H248 M160 72 V248 M96 96 L224 224 M224 96 L96 224"
          stroke="rgba(246, 242, 232, 0.18)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <path
          className="svg-draw-path"
          d="M72 160 C112 112, 112 208, 160 160 C208 112, 208 208, 248 160"
          stroke="#FF7A2F"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        <circle className="svg-pulse-node" cx="72" cy="160" r="5" fill="#FF7A2F" />
        <circle className="svg-pulse-node-delayed" cx="160" cy="160" r="7" fill="#B8F06A" />
        <circle className="svg-pulse-node-slow" cx="248" cy="160" r="5" fill="#FF9A5F" />
        <circle className="svg-pulse-node" cx="96" cy="96" r="3.5" fill="rgba(246, 242, 232, 0.7)" />
        <circle className="svg-pulse-node-slow" cx="224" cy="224" r="3.5" fill="rgba(246, 242, 232, 0.7)" />
      </svg>
    </div>
  )
}
