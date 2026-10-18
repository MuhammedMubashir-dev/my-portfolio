import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react"
import ProjectCollage from "./ProjectCollage"
import Bug from "../../components/shared/Bug"
import ClaudeMascot from "../../components/svg/ClaudeMascot"
import { profile, resumeDownloads } from "../../data/profile"

export default function Hero() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="hero" className="section-shell portfolio-hero">
      <div className="section-container">
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="hero-eyebrow"><span className="status-dot" /> AVAILABLE FOR NEW OPPORTUNITIES</p>
            <p className="hero-introduction">Hi, I&rsquo;m <strong>{profile.name}</strong></p>
            <h1 className="hero-headline"><span>Flutter</span> &amp;<br />React Native<br />Developer</h1>
            <p className="hero-description">I build Flutter and React Native apps for retail, point of sale, and delivery, covering billing, ordering, payments, and authentication.</p>
            <div className="hero-actions">
              <a href="#projects" className="button-primary">View projects <ArrowUpRight size={18} /></a>
              <div className="hero-resumes" aria-label="Download a résumé">
                {resumeDownloads.map(resume => <a key={resume.id} href={resume.pdf} download={`${resume.filename}.pdf`} className="hero-resume" aria-label={`Download ${resume.label.toLowerCase()} (PDF)`}><Download size={16} aria-hidden="true" /> Download {resume.label.toLowerCase()}</a>)}
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
        <div className="hero-floor" title="Claude Code pairs with me on reviews, refactors, and release checks"><ClaudeMascot size={32} className="hero-mascot" /></div>
      </div>
      <Bug id="hero-bug" className="hero-hidden-bug" />
    </section>
  )
}
