'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Plus, Search, Filter, Target, User, X, Sparkles, Users } from 'lucide-react'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'
import CursorAnimation from '../../components/CursorAnimation'
import LabsHeader from '../../components/labs/LabsHeader'
import LabsFilters from '../../components/labs/LabsFilters'
import LabsGrid from '../../components/labs/LabsGrid'
import LabDetailModal from '../../components/labs/LabDetailModal'
import LabForm from '../../components/labs/LabForm'
import PasscodePrompt from '../../components/labs/PasscodePrompt'
import { useLabsData } from '../../lib/hooks/useLabsData'
import { useLabsFilters } from '../../lib/hooks/useLabsFilters'
import { useLabsManagement } from '../../lib/hooks/useLabsManagement'

export default function LabsPage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const {
    labs,
    isLoading,
    updateLab,
    addLab,
    deleteLab
  } = useLabsData()

  const userPreferences = {
    showCompleted: true,
    difficultyFilter: null,
    sortBy: 'default' as const,
    categoryFilter: null
  }

  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
    filteredLabs
  } = useLabsFilters(labs, userPreferences)

  // Separate pre-existing and manually added labs
  const preExistingLabs = filteredLabs.filter(lab => lab.isPreExisting !== false)
  const manuallyAddedLabs = filteredLabs.filter(lab => lab.isPreExisting === false)

  const {
    selectedLab,
    isCreateModalOpen,
    isEditModalOpen,
    isDetailModalOpen,
    isPasscodePromptOpen,
    pendingAction,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
    openPasscodePrompt,
    closePasscodePrompt,
    toggleBookmark,
    toggleFavorite,
    getProgress,
    isBookmarked,
    isFavorite
  } = useLabsManagement()

  const handleLabClick = (lab: any) => {
    openDetailModal(lab)
  }

  const handleCreateLab = () => {
    openPasscodePrompt(openCreateModal)
  }

  const handleEditLab = (lab: any) => {
    openPasscodePrompt(() => openEditModal(lab))
  }

  const handleDeleteLab = (labId: string) => {
    openPasscodePrompt(() => deleteLab(labId))
  }

  const handleSaveLab = (labData: any) => {
    if (selectedLab) {
      // Editing existing lab
      updateLab(selectedLab.id, labData)
    } else {
      // Creating new lab - mark as manually added
      const newLab = {
        ...labData,
        id: Date.now().toString(),
        completed: false,
        isPreExisting: false
      }
      addLab(newLab)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30'
      case 'Intermediate':
        return 'px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
      case 'Advanced':
        return 'px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30'
      default:
        return 'px-2 py-1 rounded-full text-xs font-medium bg-slate-500/20 text-slate-400 border border-slate-500/30'
    }
  }

  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      <Background isPlaying={isPlaying} />
      <CursorAnimation />
      <Navbar 
        currentPage="labs" 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <LabsHeader />

          {/* Filters */}
          <LabsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            showAdvancedFilters={false}
            setShowAdvancedFilters={() => {}}
            onCreateLab={handleCreateLab}
            isLoading={isLoading}
          />

          {/* Labs Grid */}
          {manuallyAddedLabs.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"></div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h2 className="text-lg font-semibold text-purple-400">
                      Manually Added Labs ({manuallyAddedLabs.length})
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"></div>
                </div>
              </motion.div>
              
              <LabsGrid
                isLoading={isLoading}
                filteredLabs={manuallyAddedLabs}
                labProgress={Object.fromEntries(labs.map(lab => [lab.id, getProgress(lab.id)]))}
                bookmarkedLabs={new Set(labs.filter(lab => isBookmarked(lab.id)).map(lab => lab.id))}
                favoriteLabs={new Set(labs.filter(lab => isFavorite(lab.id)).map(lab => lab.id))}
                toggleBookmark={toggleBookmark}
                toggleFavorite={toggleFavorite}
                onLabClick={handleLabClick}
                getDifficultyColor={getDifficultyColor}
              />
            </>
          )}

          {preExistingLabs.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={manuallyAddedLabs.length > 0 ? "mt-12 mb-8" : "mb-8"}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1"></div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-lg font-semibold text-cyan-400">
                      Course Labs ({preExistingLabs.length})
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1"></div>
                </div>
              </motion.div>

              <LabsGrid
                isLoading={isLoading}
                filteredLabs={preExistingLabs}
                labProgress={Object.fromEntries(labs.map(lab => [lab.id, getProgress(lab.id)]))}
                bookmarkedLabs={new Set(labs.filter(lab => isBookmarked(lab.id)).map(lab => lab.id))}
                favoriteLabs={new Set(labs.filter(lab => isFavorite(lab.id)).map(lab => lab.id))}
                toggleBookmark={toggleBookmark}
                toggleFavorite={toggleFavorite}
                onLabClick={handleLabClick}
                getDifficultyColor={getDifficultyColor}
              />
            </>
          )}

          {filteredLabs.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-6">
                <Search className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-300">No labs found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LabDetailModal
        selectedLab={selectedLab}
        onClose={closeDetailModal}
        getDifficultyColor={getDifficultyColor}
        copiedCodeId={null}
        copyToClipboard={copyToClipboard}
        onEditLab={handleEditLab}
        onDeleteLab={handleDeleteLab}
      />

      <LabForm
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={isCreateModalOpen ? closeCreateModal : closeEditModal}
        onSave={handleSaveLab}
        editingLab={isEditModalOpen ? selectedLab : null}
      />

      <PasscodePrompt
        isOpen={isPasscodePromptOpen}
        onClose={closePasscodePrompt}
        onSuccess={() => {
          if (pendingAction) {
            pendingAction()
          }
        }}
        title="Lab Management Access"
        description="Please enter the passcode to create, edit, or delete labs."
      />
    </div>
  )
}