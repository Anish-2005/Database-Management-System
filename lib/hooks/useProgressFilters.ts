import { useState, useMemo } from 'react'
import { recentActivity, type RecentActivity } from '../progressData'

export function useProgressFilters(activities: RecentActivity[] = recentActivity) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredActivity = useMemo(() => {
    return activities.filter(activity =>
      selectedCategory === "all" || activity.type === selectedCategory
    )
  }, [activities, selectedCategory])

  return {
    selectedTimeframe,
    setSelectedTimeframe,
    selectedCategory,
    setSelectedCategory,
    filteredActivity,
  }
}