import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { DocumentationCategory } from "../../lib/documentationData"

interface DocumentationFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeCategory: DocumentationCategory | null
  setActiveCategory: (category: DocumentationCategory | null) => void
  categories: readonly DocumentationCategory[]
}

export const DocumentationFilters = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories
}: DocumentationFiltersProps) => {
  return (
    <>
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="relative max-w-2xl mx-auto">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            placeholder="Search documentation..."
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-3 flex-wrap mb-12"
      >
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
      </motion.div>
    </>
  )
}