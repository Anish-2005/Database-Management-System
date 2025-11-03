import { motion } from "framer-motion"
import { Bookmark } from "lucide-react"
import { DocumentationItem } from "../../lib/documentationData"

interface DocumentationGridProps {
  docs: DocumentationItem[]
  bookmarkedDocs: Set<number>
  toggleBookmark: (docId: number) => void
  onDocClick: (doc: DocumentationItem) => void
}

export const DocumentationGrid = ({
  docs,
  bookmarkedDocs,
  toggleBookmark,
  onDocClick
}: DocumentationGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {docs.map((doc, index) => {
        const Icon = doc.icon
        const isBookmarked = bookmarkedDocs.has(doc.id)

        return (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer group"
            onClick={() => onDocClick(doc)}
          >
            {/* Bookmark Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                toggleBookmark(doc.id)
              }}
              className={`absolute top-4 right-4 p-2 rounded-xl transition-all z-10 ${
                isBookmarked
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-800/40 text-slate-400 hover:text-blue-400 border border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>

            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${doc.gradient} flex items-center justify-center shadow-lg mb-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
              {doc.title}
            </h3>

            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
              {doc.description}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full">
                {doc.category}
              </span>
              <span>{doc.readTime} read</span>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">
              <span>Updated {doc.lastUpdated}</span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}