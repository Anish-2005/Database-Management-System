import { useState, useMemo } from 'react'
import { recentActivity, type RecentActivity } from '../progressData'

export function useProgressFilters() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredActivity = useMemo(() => {
    return recentActivity.filter(activity =>
      selectedCategory === "all" || activity.type === selectedCategory
    )
  }, [selectedCategory])

  return {
    selectedTimeframe,
    setSelectedTimeframe,
    selectedCategory,
    setSelectedCategory,
    filteredActivity,
  }
}