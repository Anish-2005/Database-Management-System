"use client"

import { motion } from "framer-motion"
import { Search, Filter, Settings } from "lucide-react"

interface SearchFiltersSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: string | null
  setActiveCategory: (category: string | null) => void
  categories: string[]
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  setShowSettings: (show: boolean) => void
}

export default function SearchFiltersSection({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  showAdvancedFilters,
  setShowAdvancedFilters,
  setShowSettings
}: SearchFiltersSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-12 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
    >
      {/* Search */}
      <div className="flex-1 w-full">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            placeholder="Search tutorials, topics, or skills..."
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Category:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category === "All" ? null : category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                (activeCategory === category || (category === "All" && activeCategory === null))
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Settings Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSettings(true)}
        className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 border border-slate-700 text-slate-400 hover:text-white transition-all"
      >
        <Settings className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}
