import { useState, useCallback } from 'react'
import { CommunityTab, CommunityDiscussion, CommunityMember, CommunityEvent } from '../communityData'

export interface CommunityManagementState {
  activeTab: CommunityTab
  selectedDiscussion: CommunityDiscussion | null
  selectedMember: CommunityMember | null
  selectedEvent: CommunityEvent | null
  showNewPost: boolean
  showNewEvent: boolean
  isMenuOpen: boolean
}

export const useCommunityManagement = () => {
  const [state, setState] = useState<CommunityManagementState>({
    activeTab: 'discussions',
    selectedDiscussion: null,
    selectedMember: null,
    selectedEvent: null,
    showNewPost: false,
    showNewEvent: false,
    isMenuOpen: false
  })

  // Tab management
  const setActiveTab = useCallback((tab: CommunityTab) => {
    setState(prev => ({
      ...prev,
      activeTab: tab,
      // Clear selections when switching tabs
      selectedDiscussion: null,
      selectedMember: null,
      selectedEvent: null
    }))
  }, [])

  // Discussion management
  const selectDiscussion = useCallback((discussion: CommunityDiscussion | null) => {
    setState(prev => ({ ...prev, selectedDiscussion: discussion }))
  }, [])

  const toggleNewPost = useCallback(() => {
    setState(prev => ({ ...prev, showNewPost: !prev.showNewPost }))
  }, [])

  // Member management
  const selectMember = useCallback((member: CommunityMember | null) => {
    setState(prev => ({ ...prev, selectedMember: member }))
  }, [])

  // Event management
  const selectEvent = useCallback((event: CommunityEvent | null) => {
    setState(prev => ({ ...prev, selectedEvent: event }))
  }, [])

  const toggleNewEvent = useCallback(() => {
    setState(prev => ({ ...prev, showNewEvent: !prev.showNewEvent }))
  }, [])

  // Menu management
  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
  }, [])

  const closeMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: false }))
  }, [])

  // Clear all selections
  const clearSelections = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedDiscussion: null,
      selectedMember: null,
      selectedEvent: null,
      showNewPost: false,
      showNewEvent: false
    }))
  }, [])

  // Handle discussion click (with view increment)
  const handleDiscussionClick = useCallback((discussion: CommunityDiscussion, onViewIncrement?: (id: number) => void) => {
    selectDiscussion(discussion)
    if (onViewIncrement) {
      onViewIncrement(discussion.id)
    }
  }, [selectDiscussion])

  // Handle member follow/unfollow
  const handleMemberFollow = useCallback((memberId: number, onFollow?: (id: number) => void) => {
    if (onFollow) {
      onFollow(memberId)
    }
  }, [])

  // Handle event registration
  const handleEventRegistration = useCallback((eventId: number, onRegister?: (id: number) => void) => {
    if (onRegister) {
      onRegister(eventId)
    }
  }, [])

  return {
    state,
    setActiveTab,
    selectDiscussion,
    selectMember,
    selectEvent,
    toggleNewPost,
    toggleNewEvent,
    toggleMenu,
    closeMenu,
    clearSelections,
    handleDiscussionClick,
    handleMemberFollow,
    handleEventRegistration
  }
}