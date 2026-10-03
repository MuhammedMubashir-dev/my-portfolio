import {
  siAlgolia,
  siClaude,
  siDart,
  siEslint,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGooglechrome,
  siGooglemaps,
  siJavascript,
  siNextdotjs,
  siPostman,
  siRazorpay,
  siReact,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons"

const brandIcons = {
  Flutter: siFlutter,
  Dart: siDart,
  React: siReact,
  "React Native": siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  Stripe: siStripe,
  Razorpay: siRazorpay,
  "Google Maps": siGooglemaps,
  "Firebase Cloud Messaging": siFirebase,
  Algolia: siAlgolia,
  Git: siGit,
  GitHub: siGithub,
  Postman: siPostman,
  Figma: siFigma,
  "Chrome DevTools": siGooglechrome,
  Claude: siClaude,
  Vite: siVite,
  ESLint: siEslint,
}

const brandColors = {
  Flutter: "#54C5F8",
  Dart: "#59C3C3",
  React: "#61DAFB",
  "React Native": "#61DAFB",
  "Next.js": "#F6F2E8",
  TypeScript: "#65A8EC",
  JavaScript: "#F7DF1E",
  "Tailwind CSS": "#38BDF8",
  Stripe: "#A69FFF",
  Razorpay: "#7CA0ED",
  "Google Maps": "#79C88A",
  "Firebase Cloud Messaging": "#FFCA28",
  Algolia: "#A79FFF",
  Git: "#f05032",
  GitHub: "#f6f2e8",
  Postman: "#ff6c37",
  Figma: "#f24e1e",
  "Chrome DevTools": "#4285f4",
  Claude: "#d97757",
  Vite: "#bd34fe",
  ESLint: "#a855f7",
}

function CodexMark({ size }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 5 3.5 9.5 8 14" />
      <path d="m16 5 4.5 4.5L16 14" />
      <path d="m13.5 4-3 12" />
    </svg>
  )
}

export default function BrandIcon({ name, size = 18 }) {
  if (name === "Codex") {
    return <CodexMark size={size} />
  }

  const icon = brandIcons[name]

  if (!icon) return null

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: brandColors[name] }}
    >
      <path d={icon.path} />
    </svg>
  )
}
