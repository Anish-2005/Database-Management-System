import { useState, useEffect, useMemo } from 'react'

interface Tutorial {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  completed: boolean
  rating: number
  students: number
  instructor: string
  instructorAvatar: string
  icon: string
  gradient: string
  topics: string[]
  prerequisites: string[]
  learningObjectives: string[]
  codeExamples: Array<{ title: string; code: string }>
  quizQuestions: number
  handsOnExercises: number
  quizData?: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
}

interface UserPreferences {
  showCompleted: boolean
  difficultyFilter: string | null
  sortBy: 'default' | 'rating' | 'duration' | 'difficulty'
  theme: 'dark' | 'light'
  notifications: boolean
}

export function useTutorialFilters(tutorials: Tutorial[], userPreferences: UserPreferences) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Advanced filter states
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [durationFilter, setDurationFilter] = useState<string>('all') // 'all', 'short', 'medium', 'long'
  const [ratingFilter, setRatingFilter] = useState<number>(0) // minimum rating
  const [instructorFilter, setInstructorFilter] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchDebounce, setSearchDebounce] = useState('')

  // Debounced search
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setSearchDebounce(searchQuery)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filtered tutorials with debounced search
  const filteredTutorials = useMemo(() => {
    return tutorials
      .filter(tutorial => {
        const matchesCategory = activeCategory === null || activeCategory === "All" || tutorial.category === activeCategory
        const matchesSearch = searchDebounce === "" ||
          tutorial.title.toLowerCase().includes(searchDebounce.toLowerCase()) ||
          tutorial.description.toLowerCase().includes(searchDebounce.toLowerCase()) ||
          tutorial.topics.some(topic => topic.toLowerCase().includes(searchDebounce.toLowerCase())) ||
          tutorial.instructor.toLowerCase().includes(searchDebounce.toLowerCase())
        const matchesDifficulty = !difficultyFilter || tutorial.difficulty === difficultyFilter
        const matchesCompleted = userPreferences.showCompleted || !tutorial.completed

        // Duration filter
        const durationMinutes = parseInt(tutorial.duration.split(' ')[0])
        const matchesDuration = durationFilter === 'all' ||
          (durationFilter === 'short' && durationMinutes <= 60) ||
          (durationFilter === 'medium' && durationMinutes > 60 && durationMinutes <= 120) ||
          (durationFilter === 'long' && durationMinutes > 120)

        // Rating filter
        const matchesRating = tutorial.rating >= ratingFilter

        // Instructor filter
        const matchesInstructor = instructorFilter === '' ||
          tutorial.instructor.toLowerCase().includes(instructorFilter.toLowerCase())

        return matchesCategory && matchesSearch && matchesDifficulty && matchesCompleted &&
               matchesDuration && matchesRating && matchesInstructor
      })
      .sort((a, b) => {
        switch (userPreferences.sortBy) {
          case 'rating':
            return b.rating - a.rating
          case 'duration':
            const durationA = parseInt(a.duration.split(' ')[0])
            const durationB = parseInt(b.duration.split(' ')[0])
            return durationA - durationB
          case 'difficulty':
            const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
            return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
          default:
            return 0
        }
      })
  }, [tutorials, activeCategory, searchDebounce, difficultyFilter, userPreferences.showCompleted, userPreferences.sortBy, durationFilter, ratingFilter, instructorFilter])

  return {
    // Filter states
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    showAdvancedFilters,
    setShowAdvancedFilters,
    difficultyFilter,
    setDifficultyFilter,
    durationFilter,
    setDurationFilter,
    ratingFilter,
    setRatingFilter,
    instructorFilter,
    setInstructorFilter,
    isLoading,
    searchDebounce,

    // Computed values
    filteredTutorials
  }
}