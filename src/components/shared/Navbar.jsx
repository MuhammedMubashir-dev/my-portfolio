// components/shared/Navbar.jsx

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: "About",    href: "#about"    },
    { label: "Skills",   href: "#skills"   },
    { label: "Projects", href: "#projects" },
    { label: "Contact",  href: "#contact"  },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const handleNav = (href) => {
    window.location.href = href
    setMenuOpen(false)
  }

  return (
    <>
      <header
        style={{
          background: scrolled ? "rgba(17,17,17,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <button
            data-hover
            onClick={() => handleNav("#hero")}
            className="text-xl font-bold tracking-tight hover:opacity-70 transition duration-300"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Mubashir
            <span style={{ color: "var(--accent)" }}>.</span>
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                data-hover
                onClick={() => handleNav(link.href)}
                className="relative text-xs uppercase tracking-widest transition duration-300 group"
                style={{ color: "var(--muted)" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--accent)" }}
                />
              </button>
            ))}

            <button
              data-hover
              onClick={() => handleNav("#contact")}
              className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-300"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--accent)"
                e.currentTarget.style.color = "#111111"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "var(--accent)"
              }}
            >
              Hire Me
            </button>
          </nav>

          {/* HAMBURGER BUTTON — mobile only */}
          <button
            data-hover
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-px origin-center"
              style={{ background: "var(--text)" }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px"
              style={{ background: "var(--text)" }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-px origin-center"
              style={{ background: "var(--text)" }}
            />
          </button>

        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8"
            style={{ background: "var(--bg)" }}
          >
            {/* NAV LINKS */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className="group flex items-center gap-4 py-4 w-full border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span
                      className="text-xs uppercase tracking-widest transition duration-300"
                      style={{ color: "var(--muted)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-4xl font-bold tracking-tight transition duration-300 group-hover:translate-x-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text)",
                        display: "inline-block",
                        transition: "transform 0.3s ease, color 0.3s ease",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
                    >
                      {link.label}
                    </span>
                    <span
                      className="ml-auto text-xl opacity-0 group-hover:opacity-100 transition duration-300"
                      style={{ color: "var(--accent)" }}
                    >
                      →
                    </span>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* BOTTOM — CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-12"
            >
              <button
                onClick={() => handleNav("#contact")}
                className="px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest"
                style={{ background: "var(--accent)", color: "#111111" }}
              >
                Hire Me
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}