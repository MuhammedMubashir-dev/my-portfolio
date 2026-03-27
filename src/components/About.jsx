import { motion } from "framer-motion"
import { Code, Sparkles, Rocket } from "lucide-react"

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-[#0b0b0f]"
    >
      <div className="max-w-6xl mx-auto">

        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            About{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Who I am and how I create meaningful digital experiences.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-300 leading-relaxed"
          >
            <p>
              I’m <span className="text-white font-medium">Muhammed Mubashir K</span>,
              a frontend developer focused on building fast, responsive,
              and visually engaging websites.
            </p>

            <p className="mt-4">
              I specialize in <span className="text-white">React</span>,
              <span className="text-white"> Tailwind CSS</span>, and
              <span className="text-white"> Framer Motion</span>,
              creating smooth user experiences with modern UI design.
            </p>

            <p className="mt-4">
              My goal is simple — help businesses and individuals stand out
              online with clean design, strong performance, and premium
              animations.
            </p>
          </motion.div>

          {/* HIGHLIGHTS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6"
          >
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <Code className="text-violet-400" />
                <h3 className="font-semibold text-white">Clean Code</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Well-structured, readable, and scalable frontend code.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="text-violet-400" />
                <h3 className="font-semibold text-white">Modern UI</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Minimal, elegant designs with smooth interactions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <Rocket className="text-violet-400" />
                <h3 className="font-semibold text-white">Performance</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Fast-loading, responsive websites optimized for all devices.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}