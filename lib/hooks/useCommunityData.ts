import { useState, useEffect } from 'react'
import {
  CommunityDiscussion,
  CommunityMember,
  CommunityEvent,
  SAMPLE_DISCUSSIONS,
  SAMPLE_MEMBERS,
  SAMPLE_EVENTS
} from '../communityData'

export interface CommunityDataState {
  discussions: CommunityDiscussion[]
  members: CommunityMember[]
  events: CommunityEvent[]
  isLoading: boolean
}

export const useCommunityData = () => {
  const [data, setData] = useState<CommunityDataState>({
    discussions: [],
    members: [],
    events: [],
    isLoading: true
  })

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      setData({
        discussions: SAMPLE_DISCUSSIONS,
        members: SAMPLE_MEMBERS,
        events: SAMPLE_EVENTS,
        isLoading: false
      })
    }

    loadData()
  }, [])

  // CRUD operations for discussions
  const addDiscussion = (discussion: Omit<CommunityDiscussion, 'id'>) => {
    const newDiscussion: CommunityDiscussion = {
      ...discussion,
      id: Math.max(...data.discussions.map(d => d.id)) + 1
    }

    setData(prev => ({
      ...prev,
      discussions: [newDiscussion, ...prev.discussions]
    }))

    return newDiscussion
  }

  const updateDiscussion = (id: number, updates: Partial<CommunityDiscussion>) => {
    setData(prev => ({
      ...prev,
      discussions: prev.discussions.map(discussion =>
        discussion.id === id ? { ...discussion, ...updates } : discussion
      )
    }))
  }

  const deleteDiscussion = (id: number) => {
    setData(prev => ({
      ...prev,
      discussions: prev.discussions.filter(discussion => discussion.id !== id)
    }))
  }

  // CRUD operations for members
  const addMember = (member: Omit<CommunityMember, 'id'>) => {
    const newMember: CommunityMember = {
      ...member,
      id: Math.max(...data.members.map(m => m.id)) + 1
    }

    setData(prev => ({
      ...prev,
      members: [newMember, ...prev.members]
    }))

    return newMember
  }

  const updateMember = (id: number, updates: Partial<CommunityMember>) => {
    setData(prev => ({
      ...prev,
      members: prev.members.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    }))
  }

  const deleteMember = (id: number) => {
    setData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== id)
    }))
  }

  // CRUD operations for events
  const addEvent = (event: Omit<CommunityEvent, 'id'>) => {
    const newEvent: CommunityEvent = {
      ...event,
      id: Math.max(...data.events.map(e => e.id)) + 1
    }

    setData(prev => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }))

    return newEvent
  }

  const updateEvent = (id: number, updates: Partial<CommunityEvent>) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    }))
  }

  const deleteEvent = (id: number) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== id)
    }))
  }

  // Like/unlike discussion
  const toggleDiscussionLike = (id: number) => {
    setData(prev => ({
      ...prev,
      discussions: prev.discussions.map(discussion =>
        discussion.id === id
          ? { ...discussion, likes: discussion.likes + (discussion.likes > 0 ? -1 : 1) }
          : discussion
      )
    }))
  }

  // Increment discussion views
  const incrementDiscussionViews = (id: number) => {
    setData(prev => ({
      ...prev,
      discussions: prev.discussions.map(discussion =>
        discussion.id === id
          ? { ...discussion, views: discussion.views + 1 }
          : discussion
      )
    }))
  }

  return {
    data,
    addDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addMember,
    updateMember,
    deleteMember,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleDiscussionLike,
    incrementDiscussionViews
  }
}