import { useState, useEffect } from "react"
import { Database, Menu, X, Play, Pause, Rocket, Zap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "../lib/contexts/AuthContext"
import UserProfile from "./auth/UserProfile"

interface NavbarProps {
  currentPage?: string
  subtitle?: string
  showLaunchDemo?: boolean
  isPlaying?: boolean
  setIsPlaying?: (playing: boolean) => void
  isMenuOpen?: boolean
  setIsMenuOpen?: (open: boolean) => void
}

const navItems = [
  { name: "Home", href: "/", icon: Database },
  { name: "Tutorials", href: "/tutorials", icon: Sparkles },
  { name: "Labs", href: "/labs", icon: Zap },
  { name: "Practice", href: "/practice", icon: Play },
  { name: "Resources", href: "/resources", icon: Database },
  { name: "Progress", href: "/progress", icon: Rocket },
  { name: "About", href: "/about", icon: Menu }
]

export default function Navbar({
  currentPage = "home",
  subtitle = "Next-Gen Database System",
  showLaunchDemo = true,
  isPlaying = true,
  setIsPlaying = () => {},
  isMenuOpen = false,
  setIsMenuOpen = () => {},
}: NavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-fade-in ${
        scrolled
          ? "backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/70"
          : "backdrop-blur-lg bg-slate-900/70 border-b border-slate-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 group cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <div className="relative w-11 h-11 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400/30">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="mr-6 font-bold text-2xl bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent">
                QuantumDB
              </span>
            </div>
            <div className="text-xs text-slate-400">{subtitle}</div>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = item.name.toLowerCase() === currentPage.toLowerCase()
            const Icon = item.icon
            const isHovered = hoveredItem === item.name

            return (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-3 py-2 rounded-lg transition-colors duration-150"
              >
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-150 ${
                    isHovered ? "bg-slate-800/50" : "opacity-0"
                  }`}
                />
                <div className="relative z-10 flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-purple-300" : "text-slate-400 group-hover:text-purple-200"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <motion.div
                  className="absolute -bottom-1 left-1/2 h-[2px] rounded-full bg-purple-400/70"
                  animate={{
                    width: isActive ? "100%" : isHovered ? "60%" : "0%",
                    opacity: isActive || isHovered ? 1 : 0,
                    x: "-50%",
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </a>
            )
          })}
        </div>

        {/* Controls */}
        <div className="ml-6 hidden lg:flex items-center gap-3">
          {setIsPlaying && (
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`p-3 rounded-lg border transition-colors duration-150 ${
                isPlaying
                  ? "bg-slate-800/60 border-slate-700 hover:bg-slate-700"
                  : "bg-purple-500/20 border-purple-500/40 hover:bg-purple-500/30"
              }`}
              title={isPlaying ? "Pause background animations" : "Resume background animations"}
            >
              <motion.div animate={{ rotate: isPlaying ? 0 : 180 }} transition={{ duration: 0.2 }}>
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-slate-200" />
                ) : (
                  <Play className="w-4 h-4 text-purple-200" />
                )}
              </motion.div>
            </motion.button>
          )}

          {showLaunchDemo && !user && !loading && (
            <button className="px-5 py-2 bg-purple-600/80 hover:bg-purple-600 rounded-lg font-medium text-white flex items-center gap-2 transition-colors duration-150">
              Launch Demo
              <Rocket className="w-4 h-4" />
            </button>
          )}

          {!loading && (user ? (
            <UserProfile />
          ) : (
            <a
              href="/login"
              className="px-6 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-slate-200 hover:text-white transition-colors"
            >
              Sign In
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all active:scale-95"
        >
          {isMenuOpen ? <X className="w-6 h-6 animate-rotate-in" /> : <Menu className="w-6 h-6 animate-rotate-in" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/60 bg-slate-950/90 backdrop-blur-xl overflow-hidden animate-slide-down">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item, index) => {
              const isActive = item.name.toLowerCase() === currentPage.toLowerCase()
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all animate-fade-in-left ${
                    isActive ? "bg-slate-800/70 border border-slate-700" : "hover:bg-slate-800/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-purple-300" : "text-slate-400"}`} />
                  <span className={`text-sm font-medium ${isActive ? "text-white" : "text-slate-200"}`}>
                    {item.name}
                  </span>
                </a>
              )
            })}

            {showLaunchDemo && !user && !loading && (
              <div className="pt-4 border-t border-slate-700/50 animate-fade-in" style={{ animationDelay: `${navItems.length * 50}ms` }}>
                <button className="w-full px-6 py-3 bg-purple-600/80 hover:bg-purple-600 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-colors duration-150">
                  Launch Demo
                  <Rocket className="w-4 h-4" />
                </button>
              </div>
            )}

            {!loading && (
              <div className="pt-4 border-t border-slate-700/50 animate-fade-in" style={{ animationDelay: `${(navItems.length + 1) * 50}ms` }}>
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {user.displayName || user.email?.split("@")[0]}
                        </div>
                        <div className="text-slate-400 text-xs">Signed in</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <a
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-6 py-3 bg-purple-600/80 hover:bg-purple-600 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-colors duration-150"
                  >
                    Sign In
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes rotate-in {
          from { transform: rotate(-90deg); opacity: 0; }
          to { transform: rotate(0deg); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-slide-down { animation: slide-down 0.25s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 0.3s ease-out forwards; }
        .animate-rotate-in { animation: rotate-in 0.2s ease-out; }
      `}</style>
    </nav>
  )
}
