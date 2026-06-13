import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Impact", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <a
            href="#hero"
            className="flex items-center gap-3 font-bold"
            style={{ fontFamily: "var(--font-display)" }}
            onClick={closeMenu}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] text-sm">
              MM
            </span>
            <span className="hidden text-sm uppercase tracking-[0.18em] text-[var(--muted-strong)] sm:inline">
              Mubashir
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="chip border-[var(--border-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
              Available
            </span>
            <a href="#contact" className="button-primary min-h-10 px-5 text-sm">
              Hire me
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] px-5 pt-28 lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              aria-label="Mobile navigation"
              className="section-container"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center gap-5 border-b border-[var(--border-soft)] py-5"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-4xl font-bold transition-transform group-hover:translate-x-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </span>
                </motion.a>
              ))}

              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                href="#contact"
                onClick={closeMenu}
                className="button-primary mt-8 w-full"
              >
                Start a conversation
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
