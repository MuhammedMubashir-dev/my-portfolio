import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { Hand } from "lucide-react"
import BrandIcon from "../../components/shared/BrandIcon"
import "./profile-avatar.css"

// Illustrated avatar: Notionists style by Zoish via DiceBear (CC0).
export default function ProfileAvatar() {
  const element = useRef(null)
  const visible = useInView(element, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()
  const [waving, setWaving] = useState(false)
  const timer = useRef(null)
  const wave = (duration = 1800) => {
    clearTimeout(timer.current)
    setWaving(true)
    timer.current = setTimeout(() => setWaving(false), duration)
  }
  useEffect(() => {
    if (!visible || reducedMotion) return
    const delay = setTimeout(() => wave(), 500)
    return () => clearTimeout(delay)
  }, [visible, reducedMotion])
  useEffect(() => () => clearTimeout(timer.current), [])

  return <div ref={element} className={`profile-avatar${waving ? " is-waving" : ""}`}
    onPointerEnter={event => event.pointerType === "mouse" && wave(1400)}>
    <div className="profile-avatar-stage">
      <img className="profile-avatar-pose profile-avatar-phone" src="/images/avatar-phone.svg" alt="Illustrated developer holding a phone" width="160" height="160" />
      <img className="profile-avatar-pose profile-avatar-wave" src="/images/avatar-wave.svg" alt="" aria-hidden="true" width="160" height="160" />
    </div>
    <span className="profile-avatar-badge profile-avatar-badge-a" aria-hidden="true"><BrandIcon name="Flutter" size={16} /></span>
    <span className="profile-avatar-badge profile-avatar-badge-b" aria-hidden="true"><BrandIcon name="React Native" size={16} /></span>
    <span className="profile-avatar-badge profile-avatar-badge-c" aria-hidden="true"><BrandIcon name="Next.js" size={14} /></span>
    {!reducedMotion && <button type="button" className="profile-avatar-greet" onClick={() => wave()}>
      <Hand size={13} aria-hidden="true" /> Say hello
    </button>}
  </div>
}
