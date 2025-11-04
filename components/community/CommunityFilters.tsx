import { motion } from "framer-motion"
import { Search, Plus } from "lucide-react"
import { COMMUNITY_FILTERS } from "../../lib/communityData"

interface CommunityFiltersProps {
  searchQuery: string
  activeFilter: string | null
  onSearchChange: (query: string) => void
  onFilterChange: (filter: string | null) => void
  onNewPostClick: () => void
}

export const CommunityFilters = ({
  searchQuery,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onNewPostClick
}: CommunityFiltersProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row gap-6 items-start lg:items-center p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
    >
      {/* Search */}
      <div className="flex-1 w-full">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            placeholder="Search discussions, topics, or users..."
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {COMMUNITY_FILTERS.map((filter) => (
          <motion.button
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(filter === "All" ? null : filter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              (activeFilter === filter || (filter === "All" && activeFilter === null))
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* New Post Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNewPostClick}
        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-lg shadow-green-500/25 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        New Post
      </motion.button>
    </motion.div>
  )
}