// lib/hooks/usePracticeData.ts
import { useState, useEffect } from "react"
import { practiceChallenges, practiceAchievements, practiceStats, PracticeChallenge } from "../practiceData"

export const usePracticeData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-500/10"
      case "Intermediate": return "text-yellow-400 bg-yellow-500/10"
      case "Advanced": return "text-red-400 bg-red-500/10"
      default: return "text-slate-400 bg-slate-500/10"
    }
  }

  const updatedStats = practiceStats.map(stat => ({
    ...stat,
    value: stat.label === "Challenges Completed" ? completedChallenges.size : stat.value
  }))

  return {
    practiceChallenges,
    practiceAchievements,
    practiceStats: updatedStats,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
    completedChallenges,
    setCompletedChallenges,
    getDifficultyColor,
  }
}