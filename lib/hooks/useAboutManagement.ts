import { useState, useCallback } from 'react'

export interface AboutManagementState {
  expandedFeature: string | null
  isMenuOpen: boolean
}

export const useAboutManagement = () => {
  const [state, setState] = useState<AboutManagementState>({
    expandedFeature: null,
    isMenuOpen: false
  })

  // Feature expansion management
  const toggleFeatureExpansion = useCallback((featureId: string | null) => {
    setState(prev => ({
      ...prev,
      expandedFeature: prev.expandedFeature === featureId ? null : featureId
    }))
  }, [])

  const expandFeature = useCallback((featureId: string) => {
    setState(prev => ({ ...prev, expandedFeature: featureId }))
  }, [])

  const collapseFeature = useCallback(() => {
    setState(prev => ({ ...prev, expandedFeature: null }))
  }, [])

  // Menu management
  const toggleMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))
  }, [])

  const openMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: true }))
  }, [])

  const closeMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMenuOpen: false }))
  }, [])

  // Clear all expansions
  const clearExpansions = useCallback(() => {
    setState(prev => ({
      ...prev,
      expandedFeature: null
    }))
  }, [])

  return {
    state,
    toggleFeatureExpansion,
    expandFeature,
    collapseFeature,
    toggleMenu,
    openMenu,
    closeMenu,
    clearExpansions
  }
}