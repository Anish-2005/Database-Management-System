import { useState, useEffect } from 'react'
import {
  progressStats,
  recentActivity,
  achievements,
  skillProgress,
  learningInsights,
  type ProgressStats,
  type RecentActivity,
  type Achievement,
  type SkillProgress,
  type LearningInsight
} from '../progressData'

export function useProgressData() {
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
    progressStats,
    recentActivity,
    achievements,
    skillProgress,
    learningInsights,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
  }
}