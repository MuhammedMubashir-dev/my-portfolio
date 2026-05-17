// components/shared/Footer.jsx

import { Mail, MessageCircle, Github, ArrowUpRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: "Email",    icon: Mail,          href: "mailto:muhammedmubashirwork@gmail.com"  },
    { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/918089433955"             },
    { label: "GitHub",   icon: Github,        href: "https://github.com/MuhammedMubashir-dev" },
  ]

  return (
    <footer
      className="px-5 md:px-6 py-8 md:py-10"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* LEFT */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span
              className="text-sm font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Mubashir
              <span style={{ color: "var(--accent)" }}>.</span>
            </span>
            <span className="hidden sm:inline text-sm" style={{ color: "var(--border)" }}>—</span>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 flex-wrap">
            {links.map(({ label, icon: Icon, href }) => (
              <button
                key={label}
                data-hover
                onClick={() => window.open(href, "_blank")}
                className="group flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300"
                style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--accent)"
                  e.currentTarget.style.color = "var(--accent)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)"
                  e.currentTarget.style.color = "var(--muted)"
                }}
              >
                <Icon size={12} strokeWidth={1.5} />
                <span className="hidden sm:inline">{label}</span>
                <ArrowUpRight
                  size={10}
                  strokeWidth={1.5}
                  className="opacity-0 group-hover:opacity-100 transition duration-300"
                />
              </button>
            ))}
          </div>

        </div>

      </div>
    </footer>
  )
}