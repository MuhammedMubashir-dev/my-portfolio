import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Download, RotateCcw, Smartphone, Globe2 } from "lucide-react"
import { useState } from "react"
import Bug from "../../components/shared/Bug"

function ProductStage() {
  const reducedMotion = useReducedMotion()
  const [replay, setReplay] = useState(0)
  const entrance = (delay, x = 0, y = 30) => ({
    initial: reducedMotion ? false : { opacity: 0, x, y, scale: 0.97 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { duration: 0.8, delay: reducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <div className="product-showcase">
      <div className="showcase-heading">
        <span><span className="status-dot" /> FROM MY WORKBENCH</span>
        <button type="button" className="replay-button" onClick={() => setReplay(value => value + 1)} aria-label="Replay product animation">
          <RotateCcw size={13} /> Replay
        </button>
      </div>
      <div className="product-stage" key={replay}>
        <div className="stage-orbit stage-orbit-one" aria-hidden="true" />
        <div className="stage-orbit stage-orbit-two" aria-hidden="true" />
        <motion.div className="browser-product" {...entrance(0.15, -24)}>
          <div className="browser-chrome" aria-hidden="true">
            <div className="browser-dots"><i /><i /><i /></div>
            <span>eposmob / point of sale</span>
            <Globe2 size={12} />
          </div>
          <div className="browser-screen">
            <motion.img src="/images/projects/epos/billing.webp" alt="EPOSMOB desktop POS: billing, order items, and payment summary"
              width="1577" height="859" fetchPriority="high"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.55, duration: 0.7 }} />
          </div>
          <div className="product-caption"><span>EPOSMOB</span><span>Flutter · Point of sale</span></div>
        </motion.div>
        <motion.div className="phone-product" {...entrance(0.85, 35, 65)}>
          <div className="phone-speaker" aria-hidden="true" />
          <img src="/images/projects/ganvin/bag-screen.webp" alt="Ganvin mobile app bag management screen" width="360" height="760" />
          <div className="phone-home" aria-hidden="true" />
        </motion.div>
        <motion.div className="stage-note" {...entrance(1.2, -12, 12)}>
          <span className="stage-note-icon"><Smartphone size={17} /></span>
          <div><strong>Mobile. POS. Shipped.</strong><span>Real screens from production work</span></div>
        </motion.div>
        <span className="stage-coordinate" aria-hidden="true">01 / FLUTTER + DART</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="hero" className="section-shell portfolio-hero">
      <div className="section-container">
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="hero-eyebrow"><span className="status-dot" /> AVAILABLE FOR NEW OPPORTUNITIES</p>
            <p className="hero-introduction">Hey, I’m Muhammed Mubashir.</p>
            <p className="hero-specialization">Flutter Developer · Mobile &amp; POS Applications</p><h1 className="hero-headline">Made for people.<br /><span>Built to work.</span></h1>
            <p className="hero-description">I build Flutter applications for everyday business—from the first sale to the last delivery.</p>
            <p className="hero-secondary">Also building for the web with React &amp; Next.js.</p><div className="hero-actions">
              <a href="#projects" className="button-primary">Explore my work <ArrowUpRight size={18} /></a>
              <a href="/muhammed-mubashir-k-resume-flutter.pdf" download="Muhammed-Mubashir-Flutter-Resume.pdf" className="hero-resume"><Download size={16} /> Download résumé</a>
            </div>
            <p className="hero-location">Application Developer at ENKE <span> / </span> Kerala, India</p>
          </motion.div>
          <ProductStage />
        </div>
        <div className="hero-bottom">
          <div className="hero-proof"><strong>7+</strong><span>products shipped</span><i /><strong>Flutter & Dart</strong><span>Mobile · POS · React & Next.js</span></div>
          <a href="#projects" className="scroll-cue">SELECTED WORK <ArrowDown size={15} /></a>
        </div>
      </div>
      <Bug id="hero-bug" className="hero-hidden-bug" />
    </section>
  )
}

