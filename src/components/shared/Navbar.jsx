import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import AnimatedLogo from "../svg/AnimatedLogo"
import useActiveSection from "../../hooks/useActiveSection"

const navLinks = [
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Impact", href: "#achievements", sectionId: "achievements" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
]

const sectionIds = navLinks.map((link) => link.sectionId)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigationRef = useRef(null)
  const menuRef = useRef(null)
  const triggerRef = useRef(null)
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const navigation = navigationRef.current
    const menu = menuRef.current
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    const siblings = [...navigation.parentElement.children]
      .filter(element => element !== navigation)
      .map(element => ({ element, inert: element.inert }))
    menu.inert = false
    document.body.style.overflow = "hidden"
    siblings.forEach(({ element }) => { element.inert = true })

    const focusable = () => [...navigation.querySelectorAll('a[href], button:not([disabled])')]
      .filter(element => element.getClientRects().length && !element.closest("[inert]"))
    const firstLink = menu.querySelector("a[href]")
    firstLink?.focus({ preventScroll: true })
    const onKeyDown = event => {
      if (event.key === "Escape") {
        event.preventDefault()
        setMenuOpen(false)
      } else if (event.key === "Tab") {
        const elements = focusable()
        const first = elements[0]
        const last = elements.at(-1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    const onFocus = event => {
      if (!navigation.contains(event.target)) firstLink?.focus({ preventScroll: true })
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    onDesktop()
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("focusin", onFocus)
    desktop.addEventListener("change", onDesktop)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("focusin", onFocus)
      desktop.removeEventListener("change", onDesktop)
      document.body.style.overflow = previousOverflow
      siblings.forEach(({ element, inert }) => { element.inert = inert })
      // AnimatePresence retains the closing overlay briefly; it must not receive focus.
      menu.inert = true
      if (trigger?.getClientRects().length) trigger.focus({ preventScroll: true })
      else navigation.querySelector('nav[aria-label="Primary navigation"] a')?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={navigationRef} role={menuOpen ? "dialog" : undefined}
      aria-modal={menuOpen ? true : undefined} aria-label={menuOpen ? "Navigation menu" : undefined}>
      <header className="fixed top-0 left-0 z-50 flex w-full justify-center pointer-events-none px-4 pt-4 transition-all duration-300">
        <motion.div
          layout
          initial={false}
          animate={{
            width: scrolled ? "min(100%, 860px)" : "100%",
            borderRadius: scrolled ? "999px" : "0px",
            backgroundColor: scrolled ? "rgba(27, 28, 22, 0.85)" : "rgba(15, 16, 13, 0)",
            backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
            border: scrolled ? "1px solid rgba(246, 242, 232, 0.1)" : "1px solid transparent",
            y: scrolled ? 8 : 0,
            padding: scrolled ? "0 24px" : "0 32px",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex h-16 w-full items-center justify-between max-w-7xl"
        >
          <a
            href="#hero"
            aria-label="Mubashir home"
            className="flex items-center gap-3 font-bold"
            style={{ fontFamily: "var(--font-display)" }}
            onClick={closeMenu}
          >
            <AnimatedLogo className="flex-none rounded-lg" />
            <span className="hidden text-sm uppercase tracking-[0.18em] text-[var(--muted-strong)] sm:inline">
              Mubashir
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#contact" className="button-primary min-h-[38px] px-5 text-xs">
              Hire me
            </a>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[var(--bg)] px-5 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
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
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.sectionId

                return (
                  <motion.a
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-5 border-b border-[var(--border-soft)] py-5 ${
                      isActive ? "text-[var(--text)]" : ""
                    }`}
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
                )
              })}

              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                href="#contact"
                onClick={closeMenu}
                className="button-primary mt-8 w-full min-h-[48px]"
              >
                Start a conversation
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
