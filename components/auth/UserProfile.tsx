// components/auth/UserProfile.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { User, LogOut, Settings, ChevronDown, Edit3 } from "lucide-react"
import { useAuth } from "../../lib/contexts/AuthContext"

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const { user, logout, updateUserProfile } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName)
    }
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsEditing(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile({ displayName })
      setIsEditing(false)
    } catch (error) {
      console.error('Profile update error:', error)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'User'
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-colors"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            getInitials(getDisplayName())
          )}
        </div>

        {/* Name */}
        <span className="text-sm font-medium text-slate-300 hidden lg:block">
          {getDisplayName()}
        </span>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Profile Header */}
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(getDisplayName())
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdateProfile()
                        if (e.key === 'Escape') setIsEditing(false)
                      }}
                      className="w-full px-2 py-1 bg-slate-800/50 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      autoFocus
                    />
                  ) : (
                    <div className="text-white font-medium text-sm truncate">
                      {getDisplayName()}
                    </div>
                  )}
                  <div className="text-slate-400 text-xs truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm">Edit Profile</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false)
                  // Could open settings modal here
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </button>

              <div className="border-t border-slate-800 my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}