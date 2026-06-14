import { motion } from "framer-motion"

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
      <motion.path
        d="M16 44V20H23.1L32 32.6L40.9 20H48V44H41.2V30.4L34.1 40.1H29.9L22.8 30.4V44H16Z"
        fill="none"
        stroke="#F6F2E8"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="49"
        cy="47"
        r="4"
        fill="#FF7A2F"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
