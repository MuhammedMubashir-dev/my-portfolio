import { motion } from "framer-motion"
import { ExternalLink, Layers } from "lucide-react"

const projects = [
  {
    title: "Business Landing Page",
    description:
      "A modern business landing page built with React, focusing on conversions, performance, and clean UI.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://business-landing4.netlify.app",
  },
  {
    title: "Event Website",
    description:
      "A premium event website demo with smooth animations, elegant layout, and responsive design.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://eventlanding-demo.netlify.app",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0b0b0f]">
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
              Projects
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            A selection of demo projects showcasing my frontend skills and
            design approach.
          </p>
        </motion.div>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition"
            >
              {/* HEADER */}
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-violet-400" />
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* TECH STACK */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* LINK */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition text-sm font-medium"
              >
                Live Demo
                <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}