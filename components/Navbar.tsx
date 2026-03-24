"use client"

import { useState, useMemo, type Dispatch, type SetStateAction } from "react"
import Link from "next/link"
import { Database, Menu, X, Sparkles } from "lucide-react"
import { useAuth } from "../lib/contexts/AuthContext"
import UserProfile from "./auth/UserProfile"

interface NavbarProps {
  currentPage?: string
  subtitle?: string
  showLaunchDemo?: boolean
  isPlaying?: boolean
  setIsPlaying?: (playing: boolean) => void
  isMenuOpen?: boolean
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void)
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Labs", href: "/labs" },
  { name: "Practice", href: "/practice" },
  { name: "Resources", href: "/resources" },
  { name: "Progress", href: "/progress" },
  { name: "Documentation", href: "/documentation" },
  { name: "Community", href: "/community" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
]

export default function Navbar({
  currentPage = "Home",
  subtitle = "Database Management Platform",
  showLaunchDemo = false,
  isMenuOpen,
  setIsMenuOpen,
}: NavbarProps) {
  const { user, loading } = useAuth()
  const [localMenuOpen, setLocalMenuOpen] = useState(false)

  const menuOpen = isMenuOpen ?? localMenuOpen
  const setMenuOpen = (open: boolean) => {
    if (setIsMenuOpen) {
      setIsMenuOpen(open)
    } else {
      setLocalMenuOpen(open)
    }
  }

  const activePage = useMemo(() => currentPage.toLowerCase(), [currentPage])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-indigo-400/20 bg-slate-950/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.01]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/85 to-cyan-400/70 ring-1 ring-violet-300/30">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide brand-gradient">QuantumDB</p>
            <p className="hidden text-xs text-slate-300/80 sm:block">{subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = item.name.toLowerCase() === activePage
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-violet-500/35 to-cyan-400/20 text-white ring-1 ring-violet-300/30"
                    : "text-slate-300 hover:bg-slate-900/65 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {showLaunchDemo && (
            <Link href="/pricing" className="btn-brand inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              View Plans
            </Link>
          )}
          {!loading &&
            (user ? (
              <UserProfile />
            ) : (
              <Link
                href="/login"
                className="rounded-lg border border-indigo-400/25 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:border-indigo-300/45 hover:bg-slate-800/80"
              >
                Sign In
              </Link>
            ))}
        </div>

        <button
          className="rounded-lg border border-indigo-400/30 bg-slate-900/70 p-2 text-slate-100 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-indigo-400/20 bg-slate-950/96 px-4 py-4 lg:hidden">
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const isActive = item.name.toLowerCase() === activePage
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-violet-500/35 to-cyan-400/20 text-white ring-1 ring-violet-300/30"
                      : "text-slate-300 hover:bg-slate-900/70 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            {!loading && !user && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg border border-indigo-400/25 bg-slate-900/75 px-3 py-2 text-center text-sm font-medium text-slate-100"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
