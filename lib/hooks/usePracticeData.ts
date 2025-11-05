// lib/hooks/usePracticeData.ts
import { useState, useEffect } from "react"
import { practiceChallenges, practiceAchievements, practiceStats, PracticeChallenge } from "../practiceData"
import { useAuth } from "../contexts/AuthContext"

export const usePracticeData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())
  const [userPracticeData, setUserPracticeData] = useState<any>(null)
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

  // Fetch user practice data when user is logged in
  useEffect(() => {
    const fetchUserPracticeData = async () => {
      if (!user?.uid) {
        setUserPracticeData(null)
        // Load from localStorage for non-logged-in users
        const saved = localStorage.getItem('practice_completed_challenges')
        if (saved) {
          setCompletedChallenges(new Set(JSON.parse(saved)))
        }
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/practice/data?userId=${user.uid}`)
        if (response.ok) {
          const data = await response.json()
          setUserPracticeData(data.data)

          // Update completed challenges from user data
          const completedIds = data.data.challengeProgress
            .filter((c: any) => c.completed)
            .map((c: any) => c.challengeId)
          setCompletedChallenges(new Set(completedIds))
        }
      } catch (error) {
        console.error('Error fetching user practice data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserPracticeData()
  }, [user?.uid])

  // Save completed challenges to localStorage for non-logged-in users
  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem('practice_completed_challenges', JSON.stringify([...completedChallenges]))
    }
  }, [completedChallenges, user?.uid])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-500/10"
      case "Intermediate": return "text-yellow-400 bg-yellow-500/10"
      case "Advanced": return "text-red-400 bg-red-500/10"
      default: return "text-slate-400 bg-slate-500/10"
    }
  }

  // Use user data if available, otherwise use static data
  const currentStats = userPracticeData?.stats || practiceStats.map(stat => ({
    ...stat,
    value: stat.label === "Challenges Completed" ? completedChallenges.size : stat.value
  }))

  const currentAchievements = userPracticeData?.achievements || practiceAchievements

  return {
    practiceChallenges,
    practiceAchievements: currentAchievements,
    practiceStats: currentStats,
    isMenuOpen,
    setIsMenuOpen,
    isPlaying,
    setIsPlaying,
    completedChallenges,
    setCompletedChallenges,
    getDifficultyColor,
    userPracticeData,
    isLoggedIn: !!user?.uid,
    isLoading
  }
}