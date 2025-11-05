import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EmptyState() {
  const router = useRouter()

  return (
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
  )
}