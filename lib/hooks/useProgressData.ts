import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
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
  const [userProgressData, setUserProgressData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

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

  // Fetch user progress data when user is logged in
  useEffect(() => {
    const fetchUserProgressData = async () => {
      if (!user?.uid) {
        setUserProgressData(null)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/progress/data?userId=${user.uid}`)
        if (response.ok) {
          const data = await response.json()
          setUserProgressData(data.data)
        }
      } catch (error) {
        console.error('Error fetching user progress data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProgressData()
  }, [user?.uid])

  // Use user data if available, otherwise use static data
  const currentStats = userProgressData?.stats || progressStats
  const currentActivity = userProgressData?.recentActivity || recentActivity
  const currentAchievements = userProgressData?.achievements || achievements
  const currentSkillProgress = userProgressData?.skillProgress || skillProgress
  const currentInsights = userProgressData?.learningInsights || learningInsights

  return {
    progressStats: currentStats,
    recentActivity: currentActivity,
    achievements: currentAchievements,
    skillProgress: currentSkillProgress,
    learningInsights: currentInsights,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
    userProgressData,
    isLoggedIn: !!user?.uid,
    isLoading
  }
}