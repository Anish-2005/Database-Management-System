import { useState, useEffect } from 'react'
import { resources, categories, featuredTools, type Resource } from '../resourcesData'

export function useResourcesData() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  // Load animation state from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('animation-playing')
    if (saved !== null) {
      setIsPlaying(JSON.parse(saved))
    }
  }, [])

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  return {
    resources,
    categories,
    featuredTools,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
  }
}