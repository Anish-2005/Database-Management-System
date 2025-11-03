import { useState, useMemo } from 'react'
import { DocumentationItem, DocumentationCategory, documentationCategories } from '../documentationData'

export const useDocumentationFilters = (docs: DocumentationItem[]) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<DocumentationCategory | null>('Getting Started')

  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const matchesCategory = !activeCategory || activeCategory === "All" || doc.category === activeCategory
      const matchesSearch = !searchQuery ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [docs, activeCategory, searchQuery])

  const categories = documentationCategories

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredDocs,
    categories
  }
}