import { motion } from "framer-motion"
import { Mail, Send, MessageCircle } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#0b0b0f]">
      <div className="max-w-4xl mx-auto text-center">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Let’s{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Have a project in mind or want to collaborate?  
            I’d love to hear from you.
          </p>
        </motion.div>

        {/* CONTACT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ y: -6 }}
          className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/40 transition"
        >
          <div className="flex flex-col items-center gap-6">

            {/* EMAIL DISPLAY */}
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="text-violet-400" />
              <span className="text-sm md:text-base">
                muhammedmubashirwork@gmail.com
              </span>
            </div>

            {/* EMAIL BUTTON */}
            <a
              href="mailto:muhammedmubashirwork@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-lg shadow-violet-500/30 transition"
            >
              Send Email
              <Send size={18} />
            </a>

            {/* WHATSAPP BUTTON */}
            <a
              href="https://wa.me/918089433955?text=Hi%20Muhammed%20Mubashir%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 transition font-medium"
            >
              <MessageCircle size={18} className="text-violet-400" />
              Chat on WhatsApp
            </a>

          </div>
        </motion.div>

      </div>
    </section>
  )
}