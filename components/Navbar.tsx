import { useState, useEffect } from "react"
import {
  Database,
  Menu,
  X,
  Play,
  Pause,
  Rocket,
  Zap,
  Sparkles,
} from "lucide-react"
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Database },
    { name: "Tutorials", href: "/tutorials", icon: Sparkles },
    { name: "Labs", href: "/labs", icon: Zap },
    { name: "Practice", href: "/practice", icon: Play },
    { name: "Resources", href: "/resources", icon: Database },
    { name: "Progress", href: "/progress", icon: Rocket },
    { name: "About", href: "/about", icon: Menu }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-fade-in ${
        scrolled 
          ? 'backdrop-blur-2xl bg-slate-950/90 border-b border-purple-500/20 shadow-2xl shadow-purple-500/10' 
          : 'backdrop-blur-xl bg-slate-900/70 border-b border-slate-700/30'
      }`}
    >
      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
        {/* Logo Section */}
        <a
          href="/"
          className="flex items-center gap-3 group cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <div className="relative">
            {/* Pulsing outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-xl blur-xl opacity-40 animate-pulse-glow" />
            
            {/* Logo container */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/50 border border-purple-400/20 animate-glow-pulse">
              <Database className="w-7 h-7 text-white" />
              
              {/* Rotating particles */}
              <div className="absolute w-1 h-1 bg-white rounded-full animate-orbit-1" style={{ left: '50%', top: '50%' }} />
              <div className="absolute w-1 h-1 bg-white rounded-full animate-orbit-2" style={{ left: '50%', top: '50%' }} />
              <div className="absolute w-1 h-1 bg-white rounded-full animate-orbit-3" style={{ left: '50%', top: '50%' }} />
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="mr-8 font-bold text-2xl bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-purple-300 transition-all duration-300">
                QuantumDB
              </span>
            </div>
            <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
              {subtitle}
            </div>
          </div>
        </a>

        {/* 🌌 Enhanced Desktop Menu */}
<div className="hidden lg:flex items-center gap-3">
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
        className="relative px-4 py-2 rounded-xl transition-all duration-300 group"
      >
        {/* Animated Background */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-300 backdrop-blur-md ${
            isActive
              ? 'bg-gradient-to-r from-purple-600/20 to-pink-500/20 opacity-100 shadow-[0_0_12px_-2px_rgba(168,85,247,0.3)]'
              : isHovered
              ? 'bg-slate-800/40 opacity-100 shadow-inner'
              : 'opacity-0'
          }`}
        />

        {/* Glowing Border (Active) */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl border border-purple-500/40 animate-[pulse_2s_infinite]" />
        )}

        {/* Icon + Text */}
        <div className="relative z-10 flex items-center gap-2">
          <Icon
            className={`w-4 h-4 transition-all duration-300 ${
              isActive
                ? 'text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]'
                : 'text-slate-400 group-hover:text-purple-300'
            }`}
          />
          <span
            className={`text-sm font-medium transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
            }`}
          >
            {item.name}
          </span>
        </div>

        {/* Underline Glow */}
        <motion.div
          className="absolute -bottom-1 left-1/2 h-[2px] rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{
            width: isActive ? '100%' : isHovered ? '60%' : '0%',
            opacity: isActive || isHovered ? 1 : 0,
            x: '-50%',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </a>
    )
  })}
</div>


        {/* Control Buttons */}
        <div className="ml-8 hidden lg:flex items-center gap-3">
          {setIsPlaying && (
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-3 rounded-lg backdrop-blur-sm border transition-all group overflow-hidden transform duration-200 ${
                isPlaying
                  ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500/50 hover:bg-slate-700/60'
                  : 'bg-purple-500/20 border-purple-500/50 hover:border-purple-400/70 hover:bg-purple-500/30'
              }`}
              title={isPlaying ? 'Pause background animations' : 'Resume background animations'}
            >
              <div className={`absolute inset-0 transition-all duration-300 ${
                isPlaying
                  ? 'bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 animate-shimmer'
                  : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
              }`} />
              
              <motion.div
                animate={{ rotate: isPlaying ? 0 : 180 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                ) : (
                  <Play className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
                )}
              </motion.div>
              
              {/* Status indicator */}
              <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-green-400 shadow-green-400/50 shadow-lg' : 'bg-purple-400 shadow-purple-400/50 shadow-lg'
              }`} />
            </motion.button>
          )}

          {showLaunchDemo && !user && !loading && (
            <button className="relative px-6  bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-lg font-medium text-white overflow-hidden group hover:scale-105 active:scale-95 transform transition-all duration-200">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
              
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 blur-xl opacity-50 animate-pulse-slow" />

              <span className="relative flex items-center gap-2">
                Launch Demo
                <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          )}

          {/* Authentication */}
          {!loading && (
            user ? (
              <UserProfile />
            ) : (
              <a
                href="/login"
                className="px-6 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors inline-block"
              >
                Sign In
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all active:scale-95"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 animate-rotate-in" />
          ) : (
            <Menu className="w-6 h-6 animate-rotate-in" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-700/50 bg-slate-950/95 backdrop-blur-2xl overflow-hidden animate-slide-down">
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
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                      : 'hover:bg-slate-800/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {item.name}
                  </span>
                </a>
              )
            })}
            
            {showLaunchDemo && !user && !loading && (
              <div className="pt-4 border-t border-slate-700/50 animate-fade-in" style={{ animationDelay: `${navItems.length * 50}ms` }}>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform">
                  Launch Demo
                  <Rocket className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Authentication */}
            {!loading && (
              <div className="pt-4 border-t border-slate-700/50 animate-fade-in" style={{ animationDelay: `${(navItems.length + 1) * 50}ms` }}>
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {user.displayName || user.email?.split('@')[0]}
                        </div>
                        <div className="text-slate-400 text-xs">Signed in</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Handle logout
                        setIsMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <a
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                  >
                    Sign In
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {/* Removed - now using dedicated login page */}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
          50% { opacity: 0.6; transform: scaleX(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
        }
        @keyframes orbit-1 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(20px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        @keyframes orbit-2 {
          from { transform: translate(-50%, -50%) rotate(120deg) translateX(20px) rotate(-120deg); }
          to { transform: translate(-50%, -50%) rotate(480deg) translateX(20px) rotate(-480deg); }
        }
        @keyframes orbit-3 {
          from { transform: translate(-50%, -50%) rotate(240deg) translateX(20px) rotate(-240deg); }
          to { transform: translate(-50%, -50%) rotate(600deg) translateX(20px) rotate(-600deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.6); }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
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
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-orbit-1 { animation: orbit-1 3s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 3s linear infinite 1s; }
        .animate-orbit-3 { animation: orbit-3 3s linear infinite 2s; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-border-glow { animation: border-glow 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .animate-shine { animation: shine 2s linear infinite 1s; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-fade-in-left { animation: fade-in-left 0.4s ease-out forwards; }
        .animate-rotate-in { animation: rotate-in 0.2s ease-out; }
      `}</style>
    </nav>
  )
}