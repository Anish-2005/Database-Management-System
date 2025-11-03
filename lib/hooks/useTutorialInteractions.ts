import { useState, useEffect } from 'react'

export function useTutorialInteractions() {
  const [bookmarkedTutorials, setBookmarkedTutorials] = useState<Set<number>>(new Set())
  const [favoriteTutorials, setFavoriteTutorials] = useState<Set<number>>(new Set())
  const [tutorialProgress, setTutorialProgress] = useState<Record<number, number>>({})

  // Load user data from localStorage
  useEffect(() => {
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
  }, [])

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem('tutorial-bookmarks', JSON.stringify([...bookmarkedTutorials]))
  }, [bookmarkedTutorials])

  useEffect(() => {
    localStorage.setItem('tutorial-favorites', JSON.stringify([...favoriteTutorials]))
  }, [favoriteTutorials])

  useEffect(() => {
    localStorage.setItem('tutorial-progress', JSON.stringify(tutorialProgress))
  }, [tutorialProgress])

  // User interaction functions
  const toggleBookmark = (tutorialId: number) => {
    setBookmarkedTutorials(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(tutorialId)) {
        newBookmarks.delete(tutorialId)
      } else {
        newBookmarks.add(tutorialId)
      }
      return newBookmarks
    })
  }

  const toggleFavorite = (tutorialId: number) => {
    setFavoriteTutorials(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(tutorialId)) {
        newFavorites.delete(tutorialId)
      } else {
        newFavorites.add(tutorialId)
      }
      return newFavorites
    })
  }

  const updateProgress = (tutorialId: number, progress: number) => {
    setTutorialProgress(prev => ({
      ...prev,
      [tutorialId]: Math.max(0, Math.min(100, progress))
    }))
  }

  const markCompleted = (tutorialId: number) => {
    updateProgress(tutorialId, 100)
  }

  const resetProgress = (tutorialId: number) => {
    updateProgress(tutorialId, 0)
  }

  return {
    // State
    bookmarkedTutorials,
    favoriteTutorials,
    tutorialProgress,

    // Functions
    toggleBookmark,
    toggleFavorite,
    updateProgress,
    markCompleted,
    resetProgress
  }
}