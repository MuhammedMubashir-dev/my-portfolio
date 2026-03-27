import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 bg-[#0b0b0f]"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="block text-white">Hi, I’m</span>
          <span className="block bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            Muhammed Mubashir K
          </span>
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
        >
          A passionate Frontend Developer crafting modern, fast, and
          user-friendly web experiences using React, Tailwind CSS, and
          Framer Motion.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-lg shadow-violet-500/30 transition"
          >
            View Projects
            <ArrowRight size={18} />
          </a>

          <a
            href="mailto:muhammedmubashirwork@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:border-violet-500 transition"
          >
            <Mail size={18} />
            Contact Me
          </a>
        </motion.div>

      </div>
    </section>
  )
}