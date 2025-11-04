"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Check, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

// Default passcode - can be overridden via environment variable
const DEFAULT_PASSCODE = "admin123"

interface PasscodePromptProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  title?: string
  description?: string
  customPasscode?: string
}

export default function PasscodePrompt({
  isOpen,
  onClose,
  onSuccess,
  title = "Authentication Required",
  description = "Please enter the passcode to proceed with this action.",
  customPasscode
}: PasscodePromptProps) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Get passcode from environment or use custom or default
  const PASSCODE = customPasscode || process.env.NEXT_PUBLIC_ADMIN_PASSCODE || DEFAULT_PASSCODE

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPasscode('')
      setError('')
      setIsLoading(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a brief delay for authentication
    await new Promise(resolve => setTimeout(resolve, 500))

    if (passcode === PASSCODE) {
      setIsLoading(false)
      onSuccess()
      onClose()
    } else {
      setIsLoading(false)
      setError('Incorrect passcode. Please try again.')
      setPasscode('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e as any)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-slate-400 mb-4">{description}</p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-4"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Enter Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors text-center text-lg font-mono tracking-wider"
                  placeholder="••••••••"
                  maxLength={20}
                  autoFocus
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={isLoading || !passcode.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Verify</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Hint */}
            <div className="mt-6 p-3 bg-slate-800/40 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-500 text-center">
                <strong>Hint:</strong> Contact your system administrator for the passcode.
                {process.env.NODE_ENV === 'development' && (
                  <span className="block mt-1 text-yellow-400">
                    Dev Mode: Default passcode is "{DEFAULT_PASSCODE}"
                  </span>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
