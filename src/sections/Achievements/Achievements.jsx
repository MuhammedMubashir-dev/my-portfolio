import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import BrandIcon from "../../components/shared/BrandIcon"
import { achievements } from "../../data/achievements"

const contributionSummaries = {
  1: "Built filtered exports with complete pagination and data validation, separate from the visible report state.",
  2: "Integrated customer Razorpay checkout and improved staff delivery lists, maps, and OTP verification.",
  3: "Implemented LinkedIn sign-in with PKCE and native modules for Android and iOS.",
  4: "Built reusable storefront themes with payment integration and English/Arabic localization.",
}

export default function Achievements() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="achievements" className="section-shell impact-section">
      <div className="section-container">
        <motion.div className="work-heading" initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.4 }}>
          <div><p className="section-kicker">04 / IMPACT</p><h2>Selected contributions</h2></div>
          <p>Open a project to see the work behind each contribution.</p>
        </motion.div>
        <div className="contribution-ledger">
          {achievements.map((item, index) => (
            <motion.a key={item.id} href={`#project-${item.projectId}`} className="impact-summary-row group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--border-soft)] py-5 md:grid-cols-[minmax(180px,.6fr)_minmax(0,1fr)_auto]"
              aria-label={`${item.project}: ${item.title}. View project details.`}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.035 }}>
              <span className="flex items-center gap-3 text-sm text-[var(--muted-strong)]"><BrandIcon name={item.brand} size={20} /><span>{item.project}</span></span>
              <span className="col-start-1 min-w-0 md:col-auto">
                <span className="block text-base font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">{item.title}</span>
                <span className="mt-2 block text-sm leading-7 text-[var(--muted-strong)]">{contributionSummaries[item.id]}</span>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" className="col-start-2 row-span-2 row-start-1 text-[var(--accent)] md:col-auto md:row-auto md:row-span-1" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
