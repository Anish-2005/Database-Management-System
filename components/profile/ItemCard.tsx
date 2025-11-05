import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SavedItem {
  id: string | number
  title: string
  category?: string
  difficulty?: string
  type: 'tutorial' | 'lab'
  icon?: string
  gradient?: string
}

interface ItemCardProps {
  item: SavedItem
  icon: LucideIcon
}

export function ItemCard({ item, icon: Icon }: ItemCardProps) {
  const router = useRouter()

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

  return (
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
}