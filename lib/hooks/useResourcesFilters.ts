import { useState, useMemo } from 'react'
import { resources, type Resource } from '../resourcesData'

export function useResourcesFilters() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = activeCategory === null || activeCategory === "All" || resource.category === activeCategory
      const matchesSearch = searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredResources,
  }
}