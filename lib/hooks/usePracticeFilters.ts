// lib/hooks/usePracticeFilters.ts
import { useState } from "react"
import { practiceCategories, PracticeChallenge } from "../practiceData"

export const usePracticeFilters = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChallenges = (challenges: PracticeChallenge[]) => {
    return challenges.filter(challenge => {
      const matchesCategory = activeCategory === null || activeCategory === "All" || challenge.category === activeCategory
      const matchesSearch = searchQuery === "" ||
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredChallenges,
    categories: practiceCategories,
  }
}