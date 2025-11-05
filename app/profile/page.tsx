'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Bookmark, Database, Code, User } from 'lucide-react'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'
import CursorAnimation from '../../components/CursorAnimation'
import { useAuth } from '../../lib/contexts/AuthContext'
import { ProfileHeader, SavedItemsSection, EmptyState } from '../../components/profile'

interface SavedItem {
  id: string | number
  title: string
  category?: string
  difficulty?: string
  type: 'tutorial' | 'lab'
  icon?: string
  gradient?: string
}

export default function ProfilePage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [savedTutorials, setSavedTutorials] = useState<SavedItem[]>([])
  const [favoritedTutorials, setFavoritedTutorials] = useState<SavedItem[]>([])
  const [savedLabs, setSavedLabs] = useState<SavedItem[]>([])
  const [favoritedLabs, setFavoritedLabs] = useState<SavedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/')
    }
  }, [user, router, isLoading])

  // Fetch user's saved items
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) {
        console.log('No user UID found:', user)
        return
      }

      console.log('Fetching data for user:', user.uid)

      try {
        setIsLoading(true)

        // Fetch tutorial interactions
        const tutorialResponse = await fetch(`/api/tutorials/interactions?userId=${user.uid}`)
        if (tutorialResponse.ok) {
          const tutorialData = await tutorialResponse.json()
          console.log('Tutorial data:', tutorialData)

          // Get tutorial details for saved items
          const tutorialDetailsResponse = await fetch('/api/tutorials')
          if (tutorialDetailsResponse.ok) {
            const tutorialResponseData = await tutorialDetailsResponse.json()
            const allTutorials = tutorialResponseData.data || []
            console.log('All tutorials:', allTutorials)

            const savedTutorialItems = tutorialData.bookmarks.map((id: number) =>
              allTutorials.find((t: any) => t.id === id)
            ).filter(Boolean)

            const favoritedTutorialItems = tutorialData.favorites.map((id: number) =>
              allTutorials.find((t: any) => t.id === id)
            ).filter(Boolean)

            console.log('Saved tutorial items:', savedTutorialItems)
            console.log('Favorited tutorial items:', favoritedTutorialItems)

            setSavedTutorials(savedTutorialItems.map((t: any) => ({ ...t, type: 'tutorial' })))
            setFavoritedTutorials(favoritedTutorialItems.map((t: any) => ({ ...t, type: 'tutorial' })))
          }
        }

        // Fetch lab interactions
        const labResponse = await fetch(`/api/labs/interactions?userId=${user.uid}`)
        if (labResponse.ok) {
          const labData = await labResponse.json()
          console.log('Lab data:', labData)

          // Get lab details for saved items
          const labDetailsResponse = await fetch('/api/labs/data')
          if (labDetailsResponse.ok) {
            const labResponseData = await labDetailsResponse.json()
            const allLabs = labResponseData.data || []
            console.log('All labs:', allLabs)

            const savedLabItems = labData.bookmarks.map((id: string) =>
              allLabs.find((l: any) => l.id === id)
            ).filter(Boolean)

            const favoritedLabItems = labData.favorites.map((id: string) =>
              allLabs.find((l: any) => l.id === id)
            ).filter(Boolean)

            console.log('Saved lab items:', savedLabItems)
            console.log('Favorited lab items:', favoritedLabItems)

            setSavedLabs(savedLabItems.map((l: any) => ({ ...l, type: 'lab' })))
            setFavoritedLabs(favoritedLabItems.map((l: any) => ({ ...l, type: 'lab' })))
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user?.uid) {
      fetchUserData()
    }
  }, [user?.uid])

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
          <p className="text-slate-400">You need to be signed in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      <Background isPlaying={isPlaying} />
      <CursorAnimation />
      <Navbar
        currentPage="profile"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ProfileHeader user={user} />

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Saved Tutorials */}
              <SavedItemsSection
                title="Tutorials"
                icon={Code}
                savedItems={savedTutorials}
                favoritedItems={favoritedTutorials}
                bookmarkIcon={Bookmark}
                heartIcon={Heart}
                gradientColor="purple-500"
                textColor="text-purple-400"
              />

              {/* Saved Labs */}
              <SavedItemsSection
                title="Labs"
                icon={Database}
                savedItems={savedLabs}
                favoritedItems={favoritedLabs}
                bookmarkIcon={Bookmark}
                heartIcon={Heart}
                gradientColor="cyan-500"
                textColor="text-cyan-400"
              />

              {/* Empty State */}
              {savedTutorials.length === 0 && favoritedTutorials.length === 0 &&
               savedLabs.length === 0 && favoritedLabs.length === 0 && (
                <EmptyState />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}