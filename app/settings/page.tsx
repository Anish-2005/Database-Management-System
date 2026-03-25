"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Bell,
  KeyRound,
  LogOut,
  Save,
  SlidersHorizontal,
  Trash2,
  UserCircle2,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import Footer from "../../components/Footer"
import { useAuth } from "../../lib/contexts/AuthContext"

type ThemeOption = "light" | "dark" | "system"

interface TutorialSettingsState {
  theme: ThemeOption
  notifications: boolean
  autoSave: boolean
  showCompleted: boolean
  difficultyFilter: string[]
  categoryFilter: string[]
  sortBy: string
  itemsPerPage: number
}

const defaultSettings: TutorialSettingsState = {
  theme: "dark",
  notifications: true,
  autoSave: true,
  showCompleted: true,
  difficultyFilter: [],
  categoryFilter: [],
  sortBy: "newest",
  itemsPerPage: 12,
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const { user, updateUserProfile, resetPassword, logout } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [settings, setSettings] = useState<TutorialSettingsState>(defaultSettings)

  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const hasChanges = useMemo(() => {
    if (!user) return false
    return (
      displayName !== (user.displayName || "") ||
      photoURL !== (user.photoURL || "")
    )
  }, [displayName, photoURL, user])

  useEffect(() => {
    const savedAnimation = localStorage.getItem("animation-playing")
    const savedTutorialSettings = localStorage.getItem("tutorial-settings")

    if (savedAnimation !== null) {
      setIsPlaying(Boolean(safeParse(savedAnimation, true)))
    }

    if (savedTutorialSettings) {
      setSettings((prev) => ({ ...prev, ...safeParse(savedTutorialSettings, defaultSettings) }))
    }
  }, [])

  useEffect(() => {
    if (!user) {
      setDisplayName("")
      setPhotoURL("")
      return
    }

    const providerPhoto = user.providerData?.find((provider) => provider.photoURL)?.photoURL
    setDisplayName(user.displayName || "")
    setPhotoURL(user.photoURL || providerPhoto || "")
  }, [user])

  const pushStatus = (type: "success" | "error", message: string) => {
    setStatus({ type, message })
    window.setTimeout(() => setStatus(null), 2800)
  }

  const savePreferences = () => {
    localStorage.setItem("animation-playing", JSON.stringify(isPlaying))
    localStorage.setItem("tutorial-settings", JSON.stringify(settings))

    const sortByMap = ["rating", "duration", "difficulty"].includes(settings.sortBy)
      ? settings.sortBy
      : "default"

    const userPreferences = {
      showCompleted: settings.showCompleted,
      difficultyFilter: settings.difficultyFilter[0] ?? null,
      sortBy: sortByMap,
      theme: settings.theme === "system" ? "dark" : settings.theme,
      notifications: settings.notifications,
    }

    localStorage.setItem("user-preferences", JSON.stringify(userPreferences))
    pushStatus("success", "Preferences saved.")
  }

  const restoreDefaults = () => {
    setIsPlaying(true)
    setSettings(defaultSettings)
    localStorage.setItem("animation-playing", JSON.stringify(true))
    localStorage.setItem("tutorial-settings", JSON.stringify(defaultSettings))
    localStorage.removeItem("user-preferences")
    pushStatus("success", "Default settings restored.")
  }

  const clearTutorialData = () => {
    localStorage.removeItem("tutorial-bookmarks")
    localStorage.removeItem("tutorial-favorites")
    localStorage.removeItem("tutorial-progress")
    pushStatus("success", "Tutorial data cleared.")
  }

  const clearLabsData = () => {
    localStorage.removeItem("lab-progress")
    localStorage.removeItem("lab-bookmarks")
    localStorage.removeItem("lab-favorites")
    localStorage.removeItem("labs-data")
    pushStatus("success", "Labs data cleared.")
  }

  const clearPracticeData = () => {
    localStorage.removeItem("practice_completed_challenges")
    pushStatus("success", "Practice data cleared.")
  }

  const clearDocumentationData = () => {
    localStorage.removeItem("documentation-bookmarks")
    pushStatus("success", "Documentation bookmarks cleared.")
  }

  const clearAllLocalData = () => {
    clearTutorialData()
    clearLabsData()
    clearPracticeData()
    clearDocumentationData()
    localStorage.removeItem("user-preferences")
    localStorage.removeItem("tutorial-settings")
    pushStatus("success", "All local app data has been reset.")
  }

  const saveProfile = async () => {
    if (!user) {
      pushStatus("error", "Sign in required.")
      return
    }

    try {
      await updateUserProfile({
        displayName: displayName || undefined,
        photoURL: photoURL || undefined,
      })
      pushStatus("success", "Profile updated.")
    } catch (error: any) {
      pushStatus("error", error?.message || "Failed to update profile.")
    }
  }

  const sendResetEmail = async () => {
    if (!user?.email) {
      pushStatus("error", "No email found for this account.")
      return
    }

    try {
      await resetPassword(user.email)
      pushStatus("success", "Password reset email sent.")
    } catch (error: any) {
      pushStatus("error", error?.message || "Failed to send reset email.")
    }
  }

  const signOutUser = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error: any) {
      pushStatus("error", error?.message || "Failed to sign out.")
    }
  }

  return (
    <div className="app-shell">
      <Background isPlaying={isPlaying} />
      <Navbar
        currentPage="Settings"
        subtitle="Preferences & Security"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="app-main">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <section className="surface-panel p-6 sm:p-8">
            <h1 className="section-title">Settings</h1>
            <p className="section-subtitle mt-2">
              All controls here are live and persist to your browser/local account.
            </p>
            {status && (
              <div
                className={`mt-4 rounded-lg border px-4 py-2 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                    : "border-red-400/30 bg-red-500/10 text-red-200"
                }`}
              >
                {status.message}
              </div>
            )}
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <article className="surface-panel p-6">
              <div className="mb-4 flex items-center gap-2 text-slate-100">
                <SlidersHorizontal className="h-4 w-4 text-orange-300" />
                <h2 className="font-semibold">Experience</h2>
              </div>

              <div className="space-y-4">
                <label className="setting-row flex items-center justify-between">
                  <span className="text-sm text-slate-200">Background Animations</span>
                  <input
                    type="checkbox"
                    checked={isPlaying}
                    onChange={(e) => setIsPlaying(e.target.checked)}
                    className="h-4 w-4 accent-violet-500"
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  Theme Preference
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings((prev) => ({ ...prev, theme: e.target.value as ThemeOption }))}
                    className="field-surface mt-2"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </label>

                <label className="setting-row flex items-center justify-between">
                  <span className="text-sm text-slate-200">Show Completed Tutorials</span>
                  <input
                    type="checkbox"
                    checked={settings.showCompleted}
                    onChange={(e) => setSettings((prev) => ({ ...prev, showCompleted: e.target.checked }))}
                    className="h-4 w-4 accent-violet-500"
                  />
                </label>
              </div>
            </article>

            <article className="surface-panel p-6">
              <div className="mb-4 flex items-center gap-2 text-slate-100">
                <Bell className="h-4 w-4 text-orange-300" />
                <h2 className="font-semibold">Learning Preferences</h2>
              </div>

              <div className="space-y-4">
                <label className="setting-row flex items-center justify-between">
                  <span className="text-sm text-slate-200">Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings((prev) => ({ ...prev, notifications: e.target.checked }))}
                    className="h-4 w-4 accent-violet-500"
                  />
                </label>

                <label className="setting-row flex items-center justify-between">
                  <span className="text-sm text-slate-200">Auto Save Progress</span>
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => setSettings((prev) => ({ ...prev, autoSave: e.target.checked }))}
                    className="h-4 w-4 accent-violet-500"
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  Default Sort Order
                  <select
                    value={settings.sortBy}
                    onChange={(e) => setSettings((prev) => ({ ...prev, sortBy: e.target.value }))}
                    className="field-surface mt-2"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Shortest First</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </label>

                <label className="block text-sm text-slate-300">
                  Items Per Page
                  <select
                    value={settings.itemsPerPage}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, itemsPerPage: Number.parseInt(e.target.value, 10) }))
                    }
                    className="field-surface mt-2"
                  >
                    {[12, 24, 36, 48].map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </article>
          </section>

          <section className="mt-6 surface-panel p-6">
            <div className="mb-4 flex items-center gap-2 text-slate-100">
              <UserCircle2 className="h-4 w-4 text-orange-300" />
              <h2 className="font-semibold">Account</h2>
            </div>

            {!user ? (
              <p className="text-sm text-slate-300">
                Sign in to edit account settings.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  Display Name
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="field-surface mt-2"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm text-slate-300">
                  Photo URL
                  <input
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="field-surface mt-2"
                    placeholder="https://..."
                  />
                </label>
              </div>
            )}

            {user && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={saveProfile}
                  disabled={!hasChanges}
                  className="btn-brand inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  Save Profile
                </button>
                <button
                  onClick={sendResetEmail}
                  className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500"
                >
                  <KeyRound className="mr-2 inline h-4 w-4" />
                  Send Password Reset
                </button>
                <button
                  onClick={signOutUser}
                  className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/20"
                >
                  <LogOut className="mr-2 inline h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </section>

          <section className="mt-6 surface-panel p-6">
            <h2 className="mb-4 font-semibold text-slate-100">Data Management</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <button
                onClick={clearTutorialData}
                className="setting-row text-left text-sm text-slate-200 hover:border-violet-300/40"
              >
                Clear Tutorial Data
              </button>
              <button
                onClick={clearLabsData}
                className="setting-row text-left text-sm text-slate-200 hover:border-violet-300/40"
              >
                Clear Labs Data
              </button>
              <button
                onClick={clearPracticeData}
                className="setting-row text-left text-sm text-slate-200 hover:border-violet-300/40"
              >
                Clear Practice Data
              </button>
              <button
                onClick={clearDocumentationData}
                className="setting-row text-left text-sm text-slate-200 hover:border-violet-300/40"
              >
                Clear Documentation Data
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Reset all local data and preferences? This cannot be undone.")) {
                    clearAllLocalData()
                    restoreDefaults()
                  }
                }}
                className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="mr-2 inline h-4 w-4" />
                Reset Everything
              </button>
            </div>
          </section>

          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={savePreferences} className="btn-brand">
              Save Preferences
            </button>
            <button
              onClick={restoreDefaults}
              className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500"
            >
              Restore Defaults
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
