import {
  siClaude,
  siEslint,
  siFigma,
  siGit,
  siGithub,
  siGooglechrome,
  siPostman,
  siVite,
  siVscodium,
} from "simple-icons"

const brandIcons = {
  "VS Code": siVscodium,
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
  "VS Code": "#007acc",
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
