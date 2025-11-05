'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Bookmark, Database, Code, User, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'
import CursorAnimation from '../../components/CursorAnimation'
import { useAuth } from '../../lib/contexts/AuthContext'

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
      if (!user?.uid) return

      try {
        setIsLoading(true)

        // Fetch tutorial interactions
        const tutorialResponse = await fetch(`/api/tutorials/interactions?userId=${user.uid}`)
        if (tutorialResponse.ok) {
          const tutorialData = await tutorialResponse.json()

          // Get tutorial details for saved items
          const tutorialDetailsResponse = await fetch('/api/tutorials')
          if (tutorialDetailsResponse.ok) {
            const allTutorials = await tutorialDetailsResponse.json()

            const savedTutorialItems = tutorialData.bookmarks.map((id: number) =>
              allTutorials.find((t: any) => t.id === id)
            ).filter(Boolean)

            const favoritedTutorialItems = tutorialData.favorites.map((id: number) =>
              allTutorials.find((t: any) => t.id === id)
            ).filter(Boolean)

            setSavedTutorials(savedTutorialItems.map((t: any) => ({ ...t, type: 'tutorial' })))
            setFavoritedTutorials(favoritedTutorialItems.map((t: any) => ({ ...t, type: 'tutorial' })))
          }
        }

        // Fetch lab interactions
        const labResponse = await fetch(`/api/labs/interactions?userId=${user.uid}`)
        if (labResponse.ok) {
          const labData = await labResponse.json()

          // Get lab details for saved items
          const labDetailsResponse = await fetch('/api/labs/data')
          if (labDetailsResponse.ok) {
            const allLabs = await labDetailsResponse.json()

            const savedLabItems = labData.bookmarks.map((id: string) =>
              allLabs.find((l: any) => l.id === id)
            ).filter(Boolean)

            const favoritedLabItems = labData.favorites.map((id: string) =>
              allLabs.find((l: any) => l.id === id)
            ).filter(Boolean)

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

  const handleItemClick = (item: SavedItem) => {
    if (item.type === 'tutorial') {
      router.push(`/tutorials?tutorial=${item.id}`)
    } else {
      router.push(`/labs?lab=${item.id}`)
    }
  }

  const ItemCard = ({ item, icon: Icon }: { item: SavedItem; icon: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleItemClick(item)}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:bg-slate-800/70 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
            <Icon className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            {item.category && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300">
                {item.category}
              </span>
            )}
            {item.difficulty && (
              <span className={getDifficultyColor(item.difficulty)}>
                {item.difficulty}
              </span>
            )}
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 capitalize">
              {item.type}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-6 border border-purple-500/30">
              <User className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Your Profile
            </h1>
            <p className="text-xl text-slate-300">
              Welcome back, {user.displayName || user.email?.split('@')[0] || 'User'}!
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Saved Tutorials */}
              {(savedTutorials.length > 0 || favoritedTutorials.length > 0) && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"></div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
                      <Code className="w-5 h-5 text-purple-400" />
                      <h2 className="text-xl font-semibold text-purple-400">
                        Tutorials
                      </h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedTutorials.map((tutorial) => (
                      <ItemCard key={`saved-tutorial-${tutorial.id}`} item={tutorial} icon={Bookmark} />
                    ))}
                    {favoritedTutorials.map((tutorial) => (
                      <ItemCard key={`favorited-tutorial-${tutorial.id}`} item={tutorial} icon={Heart} />
                    ))}
                  </div>
                </section>
              )}

              {/* Saved Labs */}
              {(savedLabs.length > 0 || favoritedLabs.length > 0) && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1"></div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                      <Database className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-xl font-semibold text-cyan-400">
                        Labs
                      </h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedLabs.map((lab) => (
                      <ItemCard key={`saved-lab-${lab.id}`} item={lab} icon={Bookmark} />
                    ))}
                    {favoritedLabs.map((lab) => (
                      <ItemCard key={`favorited-lab-${lab.id}`} item={lab} icon={Heart} />
                    ))}
                  </div>
                </section>
              )}

              {/* Empty State */}
              {savedTutorials.length === 0 && favoritedTutorials.length === 0 &&
               savedLabs.length === 0 && favoritedLabs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 mb-6">
                    <Bookmark className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-300">No saved items yet</h3>
                  <p className="text-slate-500 mb-6">
                    Start exploring tutorials and labs to save your favorites!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => router.push('/tutorials')}
                      className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/30 transition-colors"
                    >
                      Browse Tutorials
                    </button>
                    <button
                      onClick={() => router.push('/labs')}
                      className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg border border-cyan-500/30 transition-colors"
                    >
                      Browse Labs
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}