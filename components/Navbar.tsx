"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Database,
  Menu,
  X,
  Play,
  Pause,
  Rocket,
} from "lucide-react"

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
  currentPage = "",
  subtitle = "Next-Gen Database System",
  showLaunchDemo = false,
  isPlaying = true,
  setIsPlaying,
  isMenuOpen = false,
  setIsMenuOpen,
}: NavbarProps) {
  // Define navigation items - all pages should have consistent navigation
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Labs", href: "/labs" },
    { name: "Practice", href: "/practice" },
    { name: "Resources", href: "/resources" },
    { name: "Progress", href: "/progress" },
    { name: "About", href: "/about" }
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Database className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              QuantumDB
            </span>
            <div className="text-xs text-slate-400">{subtitle}</div>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors relative group ${
                item.name.toLowerCase() === currentPage.toLowerCase() ? "text-white" : "text-slate-300 hover:text-white"
              }`}
              whileHover={{ y: -2 }}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                layoutId={item.name.toLowerCase() === currentPage.toLowerCase() ? "navIndicator" : undefined}
              />
            </motion.a>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {setIsPlaying && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
          )}

          {showLaunchDemo && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-2"
            >
              Launch Demo
              <Rocket className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        {setIsMenuOpen && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        )}
      </div>

      {/* Mobile Menu */}
      {setIsMenuOpen && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-700 bg-slate-900/95 backdrop-blur-xl"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                    whileHover={{ x: 4 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                {showLaunchDemo && (
                  <div className="pt-4 border-t border-slate-700">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-white shadow-lg shadow-purple-500/25"
                    >
                      Launch Demo
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.nav>
  )
}