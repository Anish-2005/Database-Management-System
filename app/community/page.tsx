"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import Footer from "../../components/Footer"
import { useCommunityData } from "../../lib/hooks/useCommunityData"
import { useCommunityFilters } from "../../lib/hooks/useCommunityFilters"
import { useCommunityManagement } from "../../lib/hooks/useCommunityManagement"
import { CommunityHeader } from "../../components/community/CommunityHeader"
import { CommunityStats } from "../../components/community/CommunityStats"
import { CommunityTabs } from "../../components/community/CommunityTabs"
import { CommunityFilters } from "../../components/community/CommunityFilters"
import { DiscussionsList } from "../../components/community/DiscussionsList"
import { MembersGrid } from "../../components/community/MembersGrid"
import { EventsGrid } from "../../components/community/EventsGrid"

export default function CommunityPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const { data, incrementDiscussionViews } = useCommunityData()
  const { filters, updateSearchQuery, updateActiveFilter, filterDiscussions, sortDiscussions, filterMembers, sortMembers, filterEvents, sortEvents } = useCommunityFilters()
  const {
    state,
    setActiveTab,
    toggleNewPost,
    handleDiscussionClick,
    handleMemberFollow,
    handleEventRegistration,
    toggleMenu,
    closeMenu
  } = useCommunityManagement()

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

  // Filtered and sorted data
  const filteredDiscussions = sortDiscussions(filterDiscussions(data.discussions))
  const filteredMembers = sortMembers(filterMembers(data.members))
  const filteredEvents = sortEvents(filterEvents(data.events))

  return (
    <div className="app-shell">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Community"
        subtitle="Connect | Share | Learn"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={state.isMenuOpen}
        setIsMenuOpen={(open: boolean) => (open ? toggleMenu() : closeMenu())}
      />

      <div className="app-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <CommunityHeader />

          {/* Community Stats */}
          <CommunityStats />

          {/* Tabs */}
          <CommunityTabs activeTab={state.activeTab} onTabChange={setActiveTab} />

          {/* Discussions Tab */}
          {state.activeTab === 'discussions' && (
            <div className="space-y-8">
              {/* Search and Filters */}
              <CommunityFilters
                searchQuery={filters.searchQuery}
                activeFilter={filters.activeFilter}
                onSearchChange={updateSearchQuery}
                onFilterChange={updateActiveFilter}
                onNewPostClick={toggleNewPost}
              />

              {/* Discussions List */}
              <DiscussionsList
                discussions={filteredDiscussions}
                onDiscussionClick={(discussion) => handleDiscussionClick(discussion, incrementDiscussionViews)}
              />
            </div>
          )}

          {/* Members Tab */}
          {state.activeTab === 'members' && (
            <MembersGrid
              members={filteredMembers}
              onMemberFollow={handleMemberFollow}
            />
          )}

          {/* Events Tab */}
          {state.activeTab === 'events' && (
            <EventsGrid
              events={filteredEvents}
              onEventRegister={handleEventRegistration}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
