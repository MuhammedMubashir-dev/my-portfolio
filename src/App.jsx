import "./App.css"

import BackToTop from "./components/shared/BackToTop"
import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
import ScrollProgress from "./components/shared/ScrollProgress"
import About from "./sections/About/About"
import Achievements from "./sections/Achievements/Achievements"
import Contact from "./sections/Contact/Contact"
import Experience from "./sections/Experience/Experience"
import Hero from "./sections/Hero/Hero"
import Projects from "./sections/Projects/Projects"
import Skills from "./sections/Skills/Skills"
import { BugProvider } from "./context/BugContext"
import BugCelebration from "./components/shared/BugCelebration"

export default function App() {
  return (
    <BugProvider>
      <div className="page-shell">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Achievements />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <BugCelebration />
      </div>
    </BugProvider>
  )
}
