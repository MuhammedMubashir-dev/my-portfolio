import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github, Mail, MessageCircle, Send } from "lucide-react"

const contacts = [
  {
    label: "Email",
    value: "muhammedmubashirwork@gmail.com",
    href: "mailto:muhammedmubashirwork@gmail.com",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: "+91 8089433955",
    href: "https://wa.me/918089433955",
    icon: MessageCircle,
  },
  {
    label: "GitHub",
    value: "MuhammedMubashir-dev",
    href: "https://github.com/MuhammedMubashir-dev",
    icon: Github,
  },
]

const fitItems = [
  "React or Next.js product interfaces",
  "Flutter app screens and workflows",
  "API integrations, checkout, auth, search, and production fixes",
]

export default function Contact() {
  return (
    <section id="contact" className="section-shell pb-20">
      <div className="section-container">
        <div className="surface-panel w-full max-w-full overflow-hidden">
          <div className="grid min-w-0 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="min-w-0 border-b border-[var(--border-soft)] p-6 md:p-10 lg:col-span-7 lg:border-b-0 lg:border-r"
            >
              <p className="section-kicker">Contact</p>
              <h2 className="mt-4 max-w-full text-4xl md:text-6xl">
                Have a product, feature, or workflow to build?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                I am open to freelance work and full-time opportunities where the work is practical,
                user-facing, and close to real product needs.
              </p>

              <div className="mt-9 space-y-4">
                {fitItems.map((item) => (
                  <div key={item} className="flex min-w-0 gap-3 text-[var(--muted-strong)]">
                    <ArrowRight
                      size={17}
                      strokeWidth={1.8}
                      className="mt-1 flex-none text-[var(--accent)]"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:muhammedmubashirwork@gmail.com" className="button-primary">
                  <Send size={17} strokeWidth={2} />
                  Send email
                </a>
                <a
                  href="https://wa.me/918089433955"
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  Message on WhatsApp
                </a>
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
                  {contacts.map(({ label, value, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 border-b border-[var(--border-soft)] py-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--bg-soft)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                          <Icon size={18} strokeWidth={1.8} />
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
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
