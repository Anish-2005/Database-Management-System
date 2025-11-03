"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Settings, Moon, Sun, Monitor, Bell, BellOff, Trash2, Save, RotateCcw } from "lucide-react"

interface SettingsModalProps {
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  settings: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    autoSave: boolean
    showCompleted: boolean
    difficultyFilter: string[]
    categoryFilter: string[]
    sortBy: string
    itemsPerPage: number
  }
  setSettings: (settings: any) => void
  resetSettings: () => void
  saveSettings: () => void
  resetProgress: () => void
  showResetConfirm: boolean
  setShowResetConfirm: (show: boolean) => void
}

export default function SettingsModal({
  showSettings,
  setShowSettings,
  settings,
  setSettings,
  resetSettings,
  saveSettings,
  resetProgress,
  showResetConfirm,
  setShowResetConfirm
}: SettingsModalProps) {
  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'duration', label: 'Shortest First' },
    { value: 'popularity', label: 'Most Popular' }
  ]

  const itemsPerPageOptions = [12, 24, 36, 48]

  const updateSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }))
  }

  return (
    <AnimatePresence>
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                  <p className="text-slate-400">Customize your learning experience</p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowSettings(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6 space-y-8">
                {/* Theme Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-300">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {themeOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <motion.button
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateSetting('theme', option.value)}
                            className={`p-4 rounded-xl border transition-all ${
                              settings.theme === option.value
                                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">{option.label}</div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-3">
                        {settings.notifications ? (
                          <Bell className="w-5 h-5 text-purple-400" />
                        ) : (
                          <BellOff className="w-5 h-5 text-slate-500" />
                        )}
                        <div>
                          <div className="text-white font-medium">Push Notifications</div>
                          <div className="text-sm text-slate-400">Receive updates about new tutorials and progress</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateSetting('notifications', !settings.notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notifications ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-3">
                        <Save className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-white font-medium">Auto-save Progress</div>
                          <div className="text-sm text-slate-400">Automatically save your learning progress</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateSetting('autoSave', !settings.autoSave)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.autoSave ? 'bg-green-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Display Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Display Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div>
                        <div className="text-white font-medium">Show Completed Tutorials</div>
                        <div className="text-sm text-slate-400">Display tutorials you've already finished</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateSetting('showCompleted', !settings.showCompleted)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.showCompleted ? 'bg-blue-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.showCompleted ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </motion.button>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-300">Default Sort Order</label>
                      <select
                        value={settings.sortBy}
                        onChange={(e) => updateSetting('sortBy', e.target.value)}
                        className="w-full p-3 bg-slate-800/40 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-slate-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-300">Items Per Page</label>
                      <select
                        value={settings.itemsPerPage}
                        onChange={(e) => updateSetting('itemsPerPage', parseInt(e.target.value))}
                        className="w-full p-3 bg-slate-800/40 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                      >
                        {itemsPerPageOptions.map((option) => (
                          <option key={option} value={option} className="bg-slate-800">
                            {option} items
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Default Filters */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Default Filters</h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-300">Difficulty Levels</label>
                      <div className="flex flex-wrap gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                          <motion.button
                            key={level}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const current = settings.difficultyFilter
                              const updated = current.includes(level)
                                ? current.filter((d: string) => d !== level)
                                : [...current, level]
                              updateSetting('difficultyFilter', updated)
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              settings.difficultyFilter.includes(level)
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                                : 'bg-slate-800/40 text-slate-400 border border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            {level}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-slate-300">Categories</label>
                      <div className="flex flex-wrap gap-2">
                        {['SQL', 'NoSQL', 'Database Design', 'Performance', 'Security'].map((category) => (
                          <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const current = settings.categoryFilter
                              const updated = current.includes(category)
                                ? current.filter((c: string) => c !== category)
                                : [...current, category]
                              updateSetting('categoryFilter', updated)
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              settings.categoryFilter.includes(category)
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                                : 'bg-slate-800/40 text-slate-400 border border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Trash2 className="w-5 h-5 text-red-400" />
                          <div>
                            <div className="text-white font-medium">Reset All Progress</div>
                            <div className="text-sm text-slate-400">This will permanently delete all your learning progress</div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowResetConfirm(true)}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-colors"
                        >
                          Reset Progress
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetSettings}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    saveSettings()
                    setShowSettings(false)
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
                >
                  Save Settings
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowResetConfirm(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Reset All Progress?</h3>
                <p className="text-slate-400 mb-6">
                  This action cannot be undone. All your completed tutorials, quiz scores, and learning progress will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      resetProgress()
                      setShowResetConfirm(false)
                      setShowSettings(false)
                    }}
                    className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-colors"
                  >
                    Reset Progress
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
