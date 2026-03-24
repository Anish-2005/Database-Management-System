"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Database, Menu, X } from "lucide-react"
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
  const setMenuOpen = setIsMenuOpen ?? setLocalMenuOpen

  const activePage = useMemo(() => currentPage.toLowerCase(), [currentPage])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 ring-1 ring-slate-700">
            <Database className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-slate-100">QuantumDB</p>
            <p className="hidden text-xs text-slate-400 sm:block">{subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = item.name.toLowerCase() === activePage
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {showLaunchDemo && (
            <button className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800">
              Request Demo
            </button>
          )}
          {!loading &&
            (user ? (
              <UserProfile />
            ) : (
              <Link
                href="/login"
                className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
              >
                Sign In
              </Link>
            ))}
        </div>

        <button
          className="rounded-md border border-slate-700 bg-slate-900 p-2 text-slate-200 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950/96 px-4 py-4 lg:hidden">
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const isActive = item.name.toLowerCase() === activePage
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-slate-800 text-slate-100"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
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
                className="mt-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-center text-sm font-medium text-slate-200"
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
