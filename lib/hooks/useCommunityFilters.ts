import { useState, useMemo, useCallback } from 'react'
import { CommunityDiscussion, CommunityMember, CommunityEvent, COMMUNITY_FILTERS } from '../communityData'

export interface CommunityFiltersState {
  searchQuery: string
  activeFilter: string | null
  sortBy: 'recent' | 'popular' | 'reputation' | 'date'
  sortOrder: 'asc' | 'desc'
}

export const useCommunityFilters = () => {
  const [filters, setFilters] = useState<CommunityFiltersState>({
    searchQuery: '',
    activeFilter: null,
    sortBy: 'recent',
    sortOrder: 'desc'
  })

  // Update search query with debouncing
  const updateSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }))
  }, [])

  // Update active filter
  const updateActiveFilter = useCallback((filter: string | null) => {
    setFilters(prev => ({ ...prev, activeFilter: filter }))
  }, [])

  // Update sorting
  const updateSorting = useCallback((sortBy: CommunityFiltersState['sortBy'], sortOrder: CommunityFiltersState['sortOrder'] = 'desc') => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder }))
  }, [])

  // Filter discussions
  const filterDiscussions = useCallback((discussions: CommunityDiscussion[]) => {
    return discussions.filter(discussion => {
      const matchesFilter = !filters.activeFilter || filters.activeFilter === "All" || discussion.category === filters.activeFilter
      const matchesSearch = !filters.searchQuery ||
        discussion.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        discussion.author.name.toLowerCase().includes(filters.searchQuery.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [filters])

  // Sort discussions
  const sortDiscussions = useCallback((discussions: CommunityDiscussion[]) => {
    return [...discussions].sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'popular':
          comparison = b.likes - a.likes
          break
        case 'reputation':
          comparison = b.author.reputation - a.author.reputation
          break
        case 'recent':
        default:
          // For demo purposes, sort by id (newer first)
          comparison = b.id - a.id
          break
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filters])

  // Filter members
  const filterMembers = useCallback((members: CommunityMember[]) => {
    return members.filter(member => {
      const matchesSearch = !filters.searchQuery ||
        member.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        member.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        member.bio.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()))

      return matchesSearch
    })
  }, [filters])

  // Sort members
  const sortMembers = useCallback((members: CommunityMember[]) => {
    return [...members].sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'reputation':
          comparison = b.reputation - a.reputation
          break
        case 'popular':
          comparison = b.followers - a.followers
          break
        case 'recent':
        default:
          // Sort by join date (newer first)
          comparison = new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
          break
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filters])

  // Filter events
  const filterEvents = useCallback((events: CommunityEvent[]) => {
    return events.filter(event => {
      const matchesSearch = !filters.searchQuery ||
        event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        event.host.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()))

      return matchesSearch
    })
  }, [filters])

  // Sort events
  const sortEvents = useCallback((events: CommunityEvent[]) => {
    return [...events].sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'popular':
          comparison = b.attendees - a.attendees
          break
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case 'recent':
        default:
          comparison = b.id - a.id
          break
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filters])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      activeFilter: null,
      sortBy: 'recent',
      sortOrder: 'desc'
    })
  }, [])

  return {
    filters,
    updateSearchQuery,
    updateActiveFilter,
    updateSorting,
    filterDiscussions,
    sortDiscussions,
    filterMembers,
    sortMembers,
    filterEvents,
    sortEvents,
    clearFilters,
    availableFilters: COMMUNITY_FILTERS
  }
}