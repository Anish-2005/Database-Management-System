"use client"

import { motion } from "framer-motion"
import { Search, Filter, Settings, Plus } from "lucide-react"

interface LabsFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: string | null
  setActiveCategory: (category: string | null) => void
  categories: string[]
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  onCreateLab: () => void
  isLoading?: boolean
}

export default function LabsFilters({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onCreateLab,
  isLoading = false
}: LabsFiltersProps) {
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
            placeholder="Search labs, technologies, or instructors..."
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-purple-500 rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
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

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Advanced Filters Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`p-3 rounded-xl transition-all ${
            showAdvancedFilters
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-slate-800/40 hover:bg-slate-700/40 border border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        {/* Create Lab Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateLab}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Lab</span>
        </motion.button>
      </div>
    </motion.div>
  )
}