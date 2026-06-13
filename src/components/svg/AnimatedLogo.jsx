export default function AnimatedLogo({ className = "" }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#1B1C16" stroke="rgba(246, 242, 232, 0.1)" />
      <path
        className="svg-logo-mark"
        d="M16 44V20H23.1L32 32.6L40.9 20H48V44H41.2V30.4L34.1 40.1H29.9L22.8 30.4V44H16Z"
        fill="none"
        stroke="#F6F2E8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle className="svg-logo-accent" cx="49" cy="47" r="4" fill="#FF7A2F" />
    </svg>
  )
}
