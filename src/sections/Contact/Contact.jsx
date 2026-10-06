import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Download, FileText, Github, Linkedin, Mail, MessageCircle, Send, Truck, Check } from "lucide-react"
import { useState } from "react"
import AnimatedArrow from "../../components/svg/AnimatedArrow"
import AnimatedTechIcon from "../../components/svg/AnimatedTechIcon"
import ContactNetwork from "../../components/svg/ContactNetwork"
import SectionKicker from "../../components/svg/SectionKicker"
import { profile, resumeDownloads } from "../../data/profile"

const contacts = [
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: profile.phone,
    href: profile.whatsapp,
    icon: MessageCircle,
  },
  {
    id: "github",
    label: "GitHub",
    value: "MuhammedMubashir-dev",
    href: profile.github,
    icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: profile.name,
    href: profile.linkedin,
    icon: Linkedin,
  },
]

const fitItems = [
  "Flutter POS, reporting & delivery applications",
  "React Native features for Android & iOS",
  "React & Next.js storefronts and checkout",
  "API integrations, authentication & payment flows",
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async (e) => {
    e.preventDefault()
    const email = profile.email

    try {
      if (!navigator.clipboard?.writeText) {
        window.location.href = `mailto:${email}`
        return
      }
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <section id="contact" className="section-shell pb-20">
      <div className="section-container">
        <div className="surface-panel relative w-full max-w-full overflow-hidden">
          <ContactNetwork />
          <div className="relative z-[1] grid min-w-0 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="min-w-0 border-b border-[var(--border-soft)] p-6 md:p-10 lg:col-span-7 lg:border-b-0 lg:border-r"
            >
              <SectionKicker>Contact</SectionKicker>
              <h2 className="mt-4 max-w-full text-4xl md:text-6xl">
                Need product features built with care?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                I am open to Flutter and cross-platform mobile roles in Kerala or with remote teams, as well as freelance projects. I bring mobile experience and supporting React/Next.js skills, from API integration to release checks.
              </p>

              <div className="mt-9 space-y-4">
                {fitItems.map((item) => (
                  <div key={item} className="flex min-w-0 gap-3 text-[var(--muted-strong)]">
                    <AnimatedArrow className="mt-1 flex-none text-[var(--accent)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={`mailto:${profile.email}`} className="button-primary">
                  <Send size={17} strokeWidth={2} />
                  Send email
                </a>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  Message on WhatsApp
                </a>
              </div>
              <div className="contact-resumes" aria-label="Résumé downloads">
                {resumeDownloads.map(resume => <div key={resume.id} className="resume-download-row">
                  <div><h3>{resume.label}</h3><p>{resume.description}</p></div>
                  <div className="resume-download-links">
                    <a href={resume.pdf} download={`${resume.filename}.pdf`}><Download size={16} /> PDF<span className="sr-only"> · {resume.label}</span></a>
                    <a href={resume.word} download={`${resume.filename}.docx`}><FileText size={16} /> Word<span className="sr-only"> · {resume.label}</span></a>
                  </div>
                </div>)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.08 }}
              className="min-w-0 lg:col-span-5"
            >
              <div className="p-6 md:p-10">
                <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-soft)] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Response within 24 hours
                  </span>
                </div>

                <div className="mt-8 border-t border-[var(--border-soft)]">
                  {contacts.map(({ id, label, value, href, icon: Icon }) => {
                    if (id === "email") {
                      return (
                        <button
                          type="button"
                          key={label}
                          onClick={handleCopyEmail}
                          className="group relative flex w-full items-center justify-between gap-4 border-b border-[var(--border-soft)] py-5 text-left overflow-hidden"
                          aria-live="polite"
                        >
                          <div className="flex min-w-0 items-center gap-4 relative z-10 bg-[var(--surface)]">
                            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                              <AnimatedTechIcon icon={copied ? Check : Icon} size={18} strokeWidth={1.8} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                                {label} {copied ? "(Copied!)" : ""}
                              </span>
                              <span className="mt-1 block truncate text-sm text-[var(--text)] md:text-base">
                                {value}
                              </span>
                            </span>
                          </div>

                          <AnimatePresence>
                            {copied && (
                              <motion.div
                                initial={{ x: -60, opacity: 0 }}
                                animate={{ x: "100%", opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute left-0 z-0 flex items-center"
                              >
                                <Truck size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: 100 }}
                                  transition={{ duration: 1.5 }}
                                  className="h-px bg-[var(--accent)] ml-2"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <ArrowUpRight
                            size={17}
                            strokeWidth={1.8}
                            className="relative z-10 flex-none text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </button>
                      )
                    }

                    return (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="group flex items-center justify-between gap-4 border-b border-[var(--border-soft)] py-5"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                            <AnimatedTechIcon icon={Icon} size={18} strokeWidth={1.8} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                              {label}
                            </span>
                            <span className="mt-1 block truncate text-sm text-[var(--text)] md:text-base">
                              {value}
                            </span>
                          </span>
                        </div>
                        <ArrowUpRight
                          size={17}
                          strokeWidth={1.8}
                          className="flex-none text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
