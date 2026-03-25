"use client"

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react"
import Link from "next/link"
import { Database, Menu, X, Sparkles, ChevronDown } from "lucide-react"
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

const primaryNavItems = [
  { name: "Home", href: "/" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Labs", href: "/labs" },
  { name: "Practice", href: "/practice" },
  { name: "Resources", href: "/resources" },
]

const secondaryNavItems = [
  { name: "Progress", href: "/progress" },
  { name: "Documentation", href: "/documentation" },
  { name: "Community", href: "/community" },
  { name: "Pricing", href: "/pricing" },
  { name: "Settings", href: "/settings" },
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
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  const menuOpen = isMenuOpen ?? localMenuOpen
  const setMenuOpen = (open: boolean) => {
    if (setIsMenuOpen) {
      setIsMenuOpen(open)
    } else {
      setLocalMenuOpen(open)
    }
  }

  const activePage = useMemo(() => currentPage.toLowerCase(), [currentPage])
  const isSecondaryActive = secondaryNavItems.some(
    (item) => item.name.toLowerCase() === activePage
  )

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!moreMenuRef.current) return
      if (!moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      setIsMoreOpen(false)
    }
  }, [menuOpen])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-violet-400/25 bg-[#150718]/84 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.01]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700/90 via-fuchsia-600/85 to-orange-500/80 ring-1 ring-violet-200/35">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide brand-gradient">QuantumDB</p>
            <p className="hidden text-xs text-slate-200/80 sm:block">{subtitle}</p>
          </div>
        </Link>

        <nav className="hidden items-center lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-violet-400/30 bg-[#2a1133]/75 p-1">
            {primaryNavItems.map((item) => {
              const isActive = item.name.toLowerCase() === activePage
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/55 via-fuchsia-500/45 to-orange-500/30 text-white shadow-lg shadow-violet-900/35"
                      : "text-slate-300 hover:bg-[#33163d]/80 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="relative ml-2" ref={moreMenuRef}>
            <button
              onClick={() => setIsMoreOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                isSecondaryActive || isMoreOpen
                  ? "border-violet-300/45 bg-violet-500/18 text-violet-100"
                  : "border-violet-400/20 bg-[#27112f]/70 text-slate-300 hover:border-violet-300/35 hover:text-white"
              }`}
            >
              More
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-violet-300/30 bg-[#1a0a20]/95 p-2 shadow-2xl shadow-violet-950/50">
                {secondaryNavItems.map((item) => {
                  const isActive = item.name.toLowerCase() === activePage
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMoreOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-violet-500/22 text-white"
                          : "text-slate-300 hover:bg-[#34163f]/75 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
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
                className="rounded-lg border border-violet-300/30 bg-[#2a1133]/75 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:border-orange-300/45 hover:bg-[#371a41]/85"
              >
                Sign In
              </Link>
            ))}
        </div>

        <button
          className="rounded-lg border border-violet-300/35 bg-[#2a1133]/80 p-2 text-slate-100 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-violet-400/25 bg-[#1a0a20]/96 px-4 py-4 lg:hidden">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Main
              </p>
              <nav className="grid gap-1">
                {primaryNavItems.map((item) => {
                  const isActive = item.name.toLowerCase() === activePage
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-violet-600/45 to-orange-500/25 text-white ring-1 ring-violet-300/35"
                          : "text-slate-300 hover:bg-[#34163f]/75 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Explore
              </p>
              <nav className="grid grid-cols-2 gap-1">
                {secondaryNavItems.map((item) => {
                  const isActive = item.name.toLowerCase() === activePage
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-violet-500/30 text-white"
                          : "text-slate-300 hover:bg-[#34163f]/75 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {!loading && !user && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-1 block rounded-lg border border-violet-300/30 bg-[#2a1133]/85 px-3 py-2 text-center text-sm font-medium text-slate-100"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
