// App.jsx

import "./App.css"

import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"

import Hero from "./sections/Hero/Hero"
import About from "./sections/About/About"
import Achievements from "./sections/Achievements/Achievements"
import Skills from "./sections/Skills/Skills"
import Projects from "./sections/Projects/Projects"
import Contact from "./sections/Contact/Contact"

export default function App() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)" }} className="overflow-x-hidden">

      <Navbar />

      <main className="pt-24">
        <Hero />
        <About />
        <Achievements />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />

    </div>
  )
}