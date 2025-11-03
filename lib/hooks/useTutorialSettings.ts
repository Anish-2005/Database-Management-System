import { useState, useEffect } from 'react'

interface UserPreferences {
  showCompleted: boolean
  difficultyFilter: string | null
  sortBy: 'default' | 'rating' | 'duration' | 'difficulty'
  theme: 'dark' | 'light'
  notifications: boolean
}

interface Settings {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  autoSave: boolean
  showCompleted: boolean
  difficultyFilter: string[]
  categoryFilter: string[]
  sortBy: string
  itemsPerPage: number
}

export function useTutorialSettings() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    showCompleted: true,
    difficultyFilter: null,
    sortBy: 'default',
    theme: 'dark',
    notifications: true
  })

  const [settings, setSettings] = useState<Settings>({
    theme: 'dark',
    notifications: true,
    autoSave: true,
    showCompleted: true,
    difficultyFilter: [],
    categoryFilter: [],
    sortBy: 'newest',
    itemsPerPage: 12
  })

  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('user-preferences')
    const savedSettings = localStorage.getItem('tutorial-settings')

    if (savedPreferences) {
      setUserPreferences({ ...userPreferences, ...JSON.parse(savedPreferences) })
    }
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) })
    }
  }, [])

  // Save user preferences to localStorage
  useEffect(() => {
    localStorage.setItem('user-preferences', JSON.stringify(userPreferences))
  }, [userPreferences])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('tutorial-settings', JSON.stringify(settings))
  }, [settings])

  // Settings functions
  const resetSettings = () => {
    setSettings({
      theme: 'dark',
      notifications: true,
      autoSave: true,
      showCompleted: true,
      difficultyFilter: [],
      categoryFilter: [],
      sortBy: 'newest',
      itemsPerPage: 12
    })
  }

  const saveSettings = () => {
    // Apply settings to user preferences
    setUserPreferences(prev => ({
      ...prev,
      showCompleted: settings.showCompleted,
      theme: settings.theme === 'system' ? 'dark' : settings.theme,
      notifications: settings.notifications
    }))
  }

  const resetAllProgress = () => {
    localStorage.removeItem('tutorial-bookmarks')
    localStorage.removeItem('tutorial-favorites')
    localStorage.removeItem('tutorial-progress')
  }

  return {
    // State
    userPreferences,
    setUserPreferences,
    settings,
    setSettings,
    showResetConfirm,
    setShowResetConfirm,

    // Functions
    resetSettings,
    saveSettings,
    resetAllProgress
  }
}