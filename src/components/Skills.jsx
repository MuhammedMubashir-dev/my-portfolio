import { motion } from "framer-motion"
import { Code, Braces, FileCode, Atom, Wind, Sparkles } from "lucide-react"

const skills = [
  {
    name: "HTML",
    level: "Advanced",
    icon: <FileCode className="text-violet-400" size={28} />,
  },
  {
    name: "CSS",
    level: "Advanced",
    icon: <Code className="text-violet-400" size={28} />,
  },
  {
    name: "JavaScript",
    level: "Intermediate",
    icon: <Braces className="text-violet-400" size={28} />,
  },
  {
    name: "React",
    level: "Intermediate",
    icon: <Atom className="text-violet-400" size={28} />,
  },
  {
    name: "Tailwind CSS",
    level: "Advanced",
    icon: <Wind className="text-violet-400" size={28} />,
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#0b0b0f]">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            My{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Technologies I use to build modern, fast, and scalable web experiences.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition"
            >
              <div className="flex items-center gap-4 mb-3">
                {skill.icon}
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>
              </div>
              <p className="text-sm text-gray-400">
                {skill.level}
              </p>
            </motion.div>
          ))}
        </div>

        {/* NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center justify-center gap-2 text-gray-400 text-sm"
        >
          <Sparkles className="text-violet-400" size={16} />
          Always learning through real-world projects
        </motion.div>

      </div>
    </section>
  )
}