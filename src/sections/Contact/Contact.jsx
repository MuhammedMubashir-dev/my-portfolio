// sections/Contact/Contact.jsx

import { motion } from "framer-motion"
import { Mail, MessageCircle, Github, ArrowUpRight, Send } from "lucide-react"

export default function Contact() {
  const contacts = [
    { label: "Email",    value: "muhammedmubashirwork@gmail.com", href: "mailto:muhammedmubashirwork@gmail.com", icon: Mail },
    { label: "WhatsApp", value: "+91 8089433955",                 href: "https://wa.me/918089433955",            icon: MessageCircle },
    { label: "GitHub",   value: "MuhammedMubashir-dev",           href: "https://github.com/MuhammedMubashir-dev", icon: Github },
  ]

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-5 md:px-6 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: "var(--muted)" }}
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Let's build
            <br />
            <span style={{ color: "var(--accent)" }}>something real.</span>
          </motion.h2>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-base md:text-xl leading-relaxed mb-8 md:mb-10" style={{ color: "var(--muted)" }}>
              Whether it's a product, a business platform,
              or a mobile application — I'm always excited
              to work on meaningful ideas.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="inline-flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "var(--accent)" }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Open to freelance & full-time
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — CONTACT ROWS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {contacts.map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  data-hover
                  className="group flex items-center justify-between py-5 md:py-6 cursor-pointer"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onClick={() => window.open(contact.href, "_blank")}
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div
                      className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "var(--accent-dim)"
                        e.currentTarget.style.borderColor = "var(--accent)"
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "var(--surface)"
                        e.currentTarget.style.borderColor = "var(--border)"
                      }}
                    >
                      <Icon size={15} strokeWidth={1.5} style={{ color: "var(--muted)" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>
                        {contact.label}
                      </p>
                      <p className="text-sm md:text-base truncate transition duration-300" style={{ color: "var(--text)" }}>
                        {contact.value}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 ml-3"
                    style={{ color: "var(--accent)" }}
                  />
                </motion.div>
              )
            })}
          </motion.div>

        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 md:mt-20 pt-8 md:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 md:gap-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Response within 24 hours
          </p>
          <motion.button
            data-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open("mailto:muhammedmubashirwork@gmail.com", "_blank")}
            className="flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm md:text-base"
            style={{ background: "var(--accent)", color: "#111111" }}
          >
            <Send size={14} strokeWidth={2} />
            Get In Touch
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}