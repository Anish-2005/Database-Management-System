// lib/hooks/useLabsManagement.ts
import { useState, useEffect } from 'react'
import { Lab } from '../labsData'

export function useLabsManagement() {
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isPasscodePromptOpen, setIsPasscodePromptOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const [labProgress, setLabProgress] = useState<Record<string, number>>({})
  const [bookmarkedLabs, setBookmarkedLabs] = useState<Set<string>>(new Set())
  const [favoriteLabs, setFavoriteLabs] = useState<Set<string>>(new Set())

  // Load user data from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('lab-progress')
    const savedBookmarks = localStorage.getItem('lab-bookmarks')
    const savedFavorites = localStorage.getItem('lab-favorites')

    if (savedProgress) {
      setLabProgress(JSON.parse(savedProgress))
    }
    if (savedBookmarks) {
      setBookmarkedLabs(new Set(JSON.parse(savedBookmarks)))
    }
    if (savedFavorites) {
      setFavoriteLabs(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem('lab-progress', JSON.stringify(labProgress))
  }, [labProgress])

  useEffect(() => {
    localStorage.setItem('lab-bookmarks', JSON.stringify([...bookmarkedLabs]))
  }, [bookmarkedLabs])

  useEffect(() => {
    localStorage.setItem('lab-favorites', JSON.stringify([...favoriteLabs]))
  }, [favoriteLabs])

  // Modal management functions
  const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const openEditModal = (lab: Lab) => {
    setSelectedLab(lab)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedLab(null)
  }

  const openDetailModal = (lab: Lab) => {
    setSelectedLab(lab)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedLab(null)
  }

  const openPasscodePrompt = (action: () => void) => {
    setPendingAction(() => action)
    setIsPasscodePromptOpen(true)
  }

  const closePasscodePrompt = () => {
    setIsPasscodePromptOpen(false)
    setPendingAction(null)
  }

  // Lab interaction functions
  const toggleBookmark = (labId: string) => {
    setBookmarkedLabs(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(labId)) {
        newBookmarks.delete(labId)
      } else {
        newBookmarks.add(labId)
      }
      return newBookmarks
    })
  }

  const toggleFavorite = (labId: string) => {
    setFavoriteLabs(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(labId)) {
        newFavorites.delete(labId)
      } else {
        newFavorites.add(labId)
      }
      return newFavorites
    })
  }

  const updateProgress = (labId: string, progress: number) => {
    setLabProgress(prev => ({
      ...prev,
      [labId]: Math.max(0, Math.min(100, progress))
    }))
  }

  const markCompleted = (labId: string) => {
    updateProgress(labId, 100)
  }

  const resetProgress = (labId: string) => {
    updateProgress(labId, 0)
  }

  const getProgress = (labId: string): number => {
    return labProgress[labId] || 0
  }

  const isBookmarked = (labId: string): boolean => {
    return bookmarkedLabs.has(labId)
  }

  const isFavorite = (labId: string): boolean => {
    return favoriteLabs.has(labId)
  }

  return {
    // Modal states
    selectedLab,
    isCreateModalOpen,
    isEditModalOpen,
    isDetailModalOpen,
    isPasscodePromptOpen,
    pendingAction,

    // User interaction states
    labProgress,
    bookmarkedLabs,
    favoriteLabs,

    // Modal functions
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
    openPasscodePrompt,
    closePasscodePrompt,

    // Lab interaction functions
    toggleBookmark,
    toggleFavorite,
    updateProgress,
    markCompleted,
    resetProgress,
    getProgress,
    isBookmarked,
    isFavorite
  }
}