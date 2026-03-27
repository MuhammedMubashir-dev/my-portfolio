import { Mail, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0f] border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

        {/* LEFT */}
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">
            Muhammed Mubashir K
          </span>. All rights reserved.
        </p>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          <a href="#hero" className="hover:text-violet-400 transition">
            Home
          </a>

          <a href="#projects" className="hover:text-violet-400 transition">
            Projects
          </a>

          <a
            href="mailto:muhammedmubashirwork@gmail.com"
            className="flex items-center gap-1 hover:text-violet-400 transition"
          >
            <Mail size={16} />
            Email
          </a>

          <a
            href="https://wa.me/918089433955?text=Hi%20Muhammed%20Mubashir%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20website%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-violet-400 transition"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

        </div>

      </div>
    </footer>
  )
}