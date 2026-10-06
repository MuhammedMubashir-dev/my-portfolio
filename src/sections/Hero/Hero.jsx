import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from "lucide-react"
import ProjectCollage from "./ProjectCollage"
import Bug from "../../components/shared/Bug"
import { profile, resumeDownloads } from "../../data/profile"
import { projects } from "../../data/projects"

export default function Hero() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="hero" className="section-shell portfolio-hero">
      <div className="section-container">
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="hero-eyebrow"><span className="status-dot" /> AVAILABLE FOR NEW OPPORTUNITIES</p>
            <p className="hero-introduction">Hi, I&rsquo;m <strong>{profile.name}</strong></p>
            <h1 className="hero-headline">Mobile App<br /><span>Developer</span></h1>
            <p className="hero-specialization">Flutter · React Native · React · Next.js</p>
            <p className="hero-description">I build Flutter and React Native apps for retail, POS, and delivery, covering billing, ordering, payments, and authentication.</p>
            <div className="hero-actions">
              <a href="#projects" className="button-primary">View projects <ArrowUpRight size={18} /></a>
              <div className="hero-resumes" aria-label="Download a résumé">
                {resumeDownloads.map(resume => <a key={resume.id} href={resume.pdf} download={`${resume.filename}.pdf`} className="hero-resume"><Download size={16} /> {resume.label} (PDF)</a>)}
              </div>
              <div className="hero-socials">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a>
              </div>
            </div>
            <p className="hero-location">Currently at {profile.company} <span> / </span> Kerala, India</p>
          </motion.div>
          <ProjectCollage />
        </div>
        <div className="hero-bottom">
          <div className="hero-proof"><strong>{projects.length}</strong><span>featured company projects</span><i /><strong>Flutter &amp; React Native</strong><span>Mobile · POS · Supporting web experience</span></div>
          <a href="#projects" className="scroll-cue">SELECTED WORK <ArrowDown size={15} /></a>
        </div>
      </div>
      <Bug id="hero-bug" className="hero-hidden-bug" />
    </section>
  )
}
