import { useState, useEffect } from 'react'

interface User {
  uid: string
}

export function useTutorialInteractions(user?: User | null) {
  const [bookmarkedTutorials, setBookmarkedTutorials] = useState<Set<number>>(new Set())
  const [favoriteTutorials, setFavoriteTutorials] = useState<Set<number>>(new Set())
  const [tutorialProgress, setTutorialProgress] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Load user data - from API if authenticated, localStorage if not
  useEffect(() => {
    const loadData = async () => {
      if (user?.uid) {
        // Load from API for authenticated users
        setIsLoading(true)
        try {
          const response = await fetch(`/api/tutorials/interactions?userId=${user.uid}`)
          if (response.ok) {
            const data = await response.json()
            setBookmarkedTutorials(new Set(data.bookmarks || []))
            setFavoriteTutorials(new Set(data.favorites || []))
            setTutorialProgress(data.progress || {})
          }
        } catch (error) {
          console.error('Error loading tutorial interactions:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        // Load from localStorage for anonymous users
        const savedBookmarks = localStorage.getItem('tutorial-bookmarks')
        const savedFavorites = localStorage.getItem('tutorial-favorites')
        const savedProgress = localStorage.getItem('tutorial-progress')

        if (savedBookmarks) {
          setBookmarkedTutorials(new Set(JSON.parse(savedBookmarks)))
        }
        if (savedFavorites) {
          setFavoriteTutorials(new Set(JSON.parse(savedFavorites)))
        }
        if (savedProgress) {
          setTutorialProgress(JSON.parse(savedProgress))
        }
      }
    }

    loadData()
  }, [user?.uid])

  // Save to localStorage for anonymous users
  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('tutorial-bookmarks', JSON.stringify([...bookmarkedTutorials]))
    }
  }, [bookmarkedTutorials, user?.uid])

  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('tutorial-favorites', JSON.stringify([...favoriteTutorials]))
    }
  }, [favoriteTutorials, user?.uid])

  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('tutorial-progress', JSON.stringify(tutorialProgress))
    }
  }, [tutorialProgress, user?.uid])

  // API call helper
  const updateInteraction = async (tutorialId: number, action: string, value?: any) => {
    if (!user?.uid) return

    try {
      const response = await fetch('/api/tutorials/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          tutorialId,
          action,
          value
        }),
      })

      if (!response.ok) {
        console.error('Failed to update tutorial interaction')
      }
    } catch (error) {
      console.error('Error updating tutorial interaction:', error)
    }
  }

  // User interaction functions
  const toggleBookmark = async (tutorialId: number) => {
    const newBookmarks = new Set(bookmarkedTutorials)
    const wasBookmarked = newBookmarks.has(tutorialId)

    if (wasBookmarked) {
      newBookmarks.delete(tutorialId)
    } else {
      newBookmarks.add(tutorialId)
    }

    setBookmarkedTutorials(newBookmarks)

    // Update API if user is authenticated
    if (user?.uid) {
      await updateInteraction(tutorialId, 'bookmark', !wasBookmarked)
    }
  }

  const toggleFavorite = async (tutorialId: number) => {
    const newFavorites = new Set(favoriteTutorials)
    const wasFavorited = newFavorites.has(tutorialId)

    if (wasFavorited) {
      newFavorites.delete(tutorialId)
    } else {
      newFavorites.add(tutorialId)
    }

    setFavoriteTutorials(newFavorites)

    // Update API if user is authenticated
    if (user?.uid) {
      await updateInteraction(tutorialId, 'favorite', !wasFavorited)
    }
  }

  const updateProgress = async (tutorialId: number, progress: number) => {
    const newProgress = Math.max(0, Math.min(100, progress))
    setTutorialProgress(prev => ({
      ...prev,
      [tutorialId]: newProgress
    }))

    // Update API if user is authenticated
    if (user?.uid) {
      await updateInteraction(tutorialId, 'progress', newProgress)
    }
  }

  const markCompleted = async (tutorialId: number) => {
    await updateProgress(tutorialId, 100)
  }

  const resetProgress = async (tutorialId: number) => {
    await updateProgress(tutorialId, 0)
  }

  return {
    // State
    bookmarkedTutorials,
    favoriteTutorials,
    tutorialProgress,
    isLoading,

    // Functions
    toggleBookmark,
    toggleFavorite,
    updateProgress,
    markCompleted,
    resetProgress
  }
}