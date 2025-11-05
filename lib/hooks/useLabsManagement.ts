// lib/hooks/useLabsManagement.ts
import { useState, useEffect } from 'react'
import { Lab } from '../labsData'

interface User {
  uid: string
}

export function useLabsManagement(user?: User | null) {
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isPasscodePromptOpen, setIsPasscodePromptOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const [labProgress, setLabProgress] = useState<Record<string, number>>({})
  const [bookmarkedLabs, setBookmarkedLabs] = useState<Set<string>>(new Set())
  const [favoriteLabs, setFavoriteLabs] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  // Load user data - from API if authenticated, localStorage if not
  useEffect(() => {
    const loadData = async () => {
      if (user?.uid) {
        // Load from API for authenticated users
        setIsLoading(true)
        try {
          const response = await fetch(`/api/labs/interactions?userId=${user.uid}`)
          if (response.ok) {
            const data = await response.json()
            setBookmarkedLabs(new Set(data.bookmarks || []))
            setFavoriteLabs(new Set(data.favorites || []))
            setLabProgress(data.progress || {})
          }
        } catch (error) {
          console.error('Error loading lab interactions:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        // Load from localStorage for anonymous users
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
      }
    }

    loadData()
  }, [user?.uid])

  // Save to localStorage for anonymous users
  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('lab-progress', JSON.stringify(labProgress))
    }
  }, [labProgress, user?.uid])

  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('lab-bookmarks', JSON.stringify([...bookmarkedLabs]))
    }
  }, [bookmarkedLabs, user?.uid])

  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('lab-favorites', JSON.stringify([...favoriteLabs]))
    }
  }, [favoriteLabs, user?.uid])

  // API call helper
  const updateInteraction = async (labId: string, action: string, value?: any) => {
    if (!user?.uid) return

    try {
      const response = await fetch('/api/labs/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          labId,
          action,
          value
        }),
      })

      if (!response.ok) {
        console.error('Failed to update lab interaction')
      }
    } catch (error) {
      console.error('Error updating lab interaction:', error)
    }
  }

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
  const toggleBookmark = async (labId: string) => {
    const newBookmarks = new Set(bookmarkedLabs)
    const wasBookmarked = newBookmarks.has(labId)

    if (wasBookmarked) {
      newBookmarks.delete(labId)
    } else {
      newBookmarks.add(labId)
    }

    setBookmarkedLabs(newBookmarks)

    // Update API if user is authenticated
    if (user?.uid) {
      await updateInteraction(labId, 'bookmark', !wasBookmarked)
    }
  }

  const toggleFavorite = async (labId: string) => {
    const newFavorites = new Set(favoriteLabs)
    const wasFavorited = newFavorites.has(labId)

    if (wasFavorited) {
      newFavorites.delete(labId)
    } else {
      newFavorites.add(labId)
    }

    setFavoriteLabs(newFavorites)

    // Update API if user is authenticated
    if (user?.uid) {
      await updateInteraction(labId, 'favorite', !wasFavorited)
    }
  }

  const updateProgress = async (labId: string, progress: number) => {
    const newProgress = Math.max(0, Math.min(100, progress))
    setLabProgress(prev => ({
      ...prev,
      [labId]: newProgress
    }))

    // Update API if user is authenticated
    if (user?.uid) {
      await updateInteraction(labId, 'progress', newProgress)
    }
  }

  const markCompleted = async (labId: string) => {
    await updateProgress(labId, 100)
  }

  const resetProgress = async (labId: string) => {
    await updateProgress(labId, 0)
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
    isLoading,

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