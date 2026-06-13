import { ArrowUpRight, Github, Mail, MessageCircle } from "lucide-react"
import AnimatedLogo from "../svg/AnimatedLogo"

const links = [
  {
    label: "Email",
    icon: Mail,
    href: "mailto:muhammedmubashirwork@gmail.com",
  },
  {
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/918089433955",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/MuhammedMubashir-dev",
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-soft)] px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href="#hero"
            className="inline-flex items-center gap-3 font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <AnimatedLogo className="flex-none rounded-lg" />
            Mubashir<span className="accent">.</span>
          </a>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Copyright {currentYear}. Built with React and Vite.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {links.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Icon size={13} strokeWidth={1.8} />
              {label}
              <ArrowUpRight
                size={12}
                strokeWidth={1.8}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
