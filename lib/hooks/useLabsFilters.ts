// lib/hooks/useLabsFilters.ts
import { useState, useEffect, useMemo } from 'react'
import { Lab, LabDifficulty } from '../labsData'

interface LabsFilterPreferences {
  showCompleted: boolean
  difficultyFilter: LabDifficulty | null
  sortBy: 'default' | 'rating' | 'duration' | 'difficulty' | 'students'
  categoryFilter: string | null
}

export function useLabsFilters(labs: Lab[], userPreferences: LabsFilterPreferences) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Advanced filter states
  const [difficultyFilter, setDifficultyFilter] = useState<LabDifficulty | null>(null)
  const [durationFilter, setDurationFilter] = useState<string>('all') // 'all', 'short', 'medium', 'long'
  const [ratingFilter, setRatingFilter] = useState<number>(0) // minimum rating
  const [instructorFilter, setInstructorFilter] = useState<string>('')
  const [technologyFilter, setTechnologyFilter] = useState<string>('')
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

  // Get unique categories from labs
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(labs.map(lab => lab.category)))
    return ['All', ...uniqueCategories]
  }, [labs])

  // Get unique technologies from labs
  const technologies = useMemo(() => {
    const uniqueTechnologies = Array.from(new Set(
      labs.flatMap(lab => lab.technologies || [])
    ))
    return ['', ...uniqueTechnologies.sort()]
  }, [labs])

  // Filtered labs with debounced search
  const filteredLabs = useMemo(() => {
    return labs
      .filter(lab => {
        const matchesCategory = activeCategory === null || activeCategory === "All" || lab.category === activeCategory
        const matchesSearch = searchDebounce === "" ||
          lab.title.toLowerCase().includes(searchDebounce.toLowerCase()) ||
          lab.description.toLowerCase().includes(searchDebounce.toLowerCase()) ||
          lab.topics.some(topic => topic.toLowerCase().includes(searchDebounce.toLowerCase())) ||
          lab.instructor.toLowerCase().includes(searchDebounce.toLowerCase()) ||
          lab.tags?.some(tag => tag.toLowerCase().includes(searchDebounce.toLowerCase()))
        const matchesDifficulty = !difficultyFilter || lab.difficulty === difficultyFilter
        const matchesCompleted = userPreferences.showCompleted || !lab.completed

        // Duration filter
        const durationMinutes = parseInt(lab.duration.split(' ')[0])
        const matchesDuration = durationFilter === 'all' ||
          (durationFilter === 'short' && durationMinutes <= 120) ||
          (durationFilter === 'medium' && durationMinutes > 120 && durationMinutes <= 240) ||
          (durationFilter === 'long' && durationMinutes > 240)

        // Rating filter
        const matchesRating = lab.rating >= ratingFilter

        // Instructor filter
        const matchesInstructor = instructorFilter === '' ||
          lab.instructor.toLowerCase().includes(instructorFilter.toLowerCase())

        // Technology filter
        const matchesTechnology = technologyFilter === '' ||
          lab.technologies?.some(tech => tech.toLowerCase().includes(technologyFilter.toLowerCase()))

        return matchesCategory && matchesSearch && matchesDifficulty && matchesCompleted &&
               matchesDuration && matchesRating && matchesInstructor && matchesTechnology
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
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          case 'students':
            return b.students - a.students
          default:
            return 0
        }
      })
  }, [labs, activeCategory, searchDebounce, difficultyFilter, userPreferences.showCompleted, userPreferences.sortBy, durationFilter, ratingFilter, instructorFilter, technologyFilter])

  const clearFilters = () => {
    setActiveCategory(null)
    setSearchQuery("")
    setDifficultyFilter(null)
    setDurationFilter('all')
    setRatingFilter(0)
    setInstructorFilter('')
    setTechnologyFilter('')
  }

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
    technologyFilter,
    setTechnologyFilter,
    isLoading,
    searchDebounce,

    // Computed values
    filteredLabs,
    categories,
    technologies,

    // Actions
    clearFilters
  }
}