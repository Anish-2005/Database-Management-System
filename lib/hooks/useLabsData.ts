// lib/hooks/useLabsData.ts
import { useState, useEffect } from 'react'
import { defaultLabs, Lab } from '../labsData'

export function useLabsData() {
  const [labs, setLabs] = useState<Lab[]>(defaultLabs)
  const [isLoading, setIsLoading] = useState(false)

  // Load labs data from localStorage on mount
  useEffect(() => {
    const savedLabs = localStorage.getItem('labs-data')
    if (savedLabs) {
      try {
        const parsedLabs = JSON.parse(savedLabs)
        setLabs(parsedLabs)
      } catch (error) {
        console.error('Failed to parse saved labs data:', error)
        // Fall back to default labs
        setLabs(defaultLabs)
      }
    }
  }, [])

  // Save labs data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('labs-data', JSON.stringify(labs))
  }, [labs])

  const updateLab = (id: string, updates: Partial<Lab>) => {
    setLabs(prevLabs =>
      prevLabs.map(lab =>
        lab.id === id ? { ...lab, ...updates } : lab
      )
    )
  }

  const addLab = (newLab: Lab) => {
    setLabs(prevLabs => [...prevLabs, newLab])
  }

  const deleteLab = (id: string) => {
    setLabs(prevLabs => prevLabs.filter(lab => lab.id !== id))
  }

  const toggleLabCompletion = (id: string) => {
    setLabs(prevLabs =>
      prevLabs.map(lab =>
        lab.id === id ? { ...lab, completed: !lab.completed } : lab
      )
    )
  }

  return {
    labs,
    isLoading,
    setLabs,
    updateLab,
    addLab,
    deleteLab,
    toggleLabCompletion
  }
}