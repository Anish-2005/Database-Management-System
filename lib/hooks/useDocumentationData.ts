import { useState, useEffect } from 'react'
import { DocumentationItem, documentationData } from '../documentationData'

export const useDocumentationData = () => {
  const [docs, setDocs] = useState<DocumentationItem[]>(documentationData)
  const [bookmarkedDocs, setBookmarkedDocs] = useState<Set<number>>(new Set())

  // Load bookmarked docs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('documentation-bookmarks')
    if (saved) {
      try {
        const bookmarks = JSON.parse(saved)
        setBookmarkedDocs(new Set(bookmarks))
      } catch (error) {
        console.error('Failed to load bookmarks:', error)
      }
    }
  }, [])

  // Save bookmarked docs to localStorage
  useEffect(() => {
    localStorage.setItem('documentation-bookmarks', JSON.stringify([...bookmarkedDocs]))
  }, [bookmarkedDocs])

  const toggleBookmark = (docId: number) => {
    setBookmarkedDocs(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(docId)) {
        newBookmarks.delete(docId)
      } else {
        newBookmarks.add(docId)
      }
      return newBookmarks
    })
  }

  const isBookmarked = (docId: number) => bookmarkedDocs.has(docId)

  return {
    docs,
    setDocs,
    bookmarkedDocs,
    toggleBookmark,
    isBookmarked
  }
}