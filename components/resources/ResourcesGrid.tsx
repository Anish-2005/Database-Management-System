import { motion } from "framer-motion"
import { ExternalLink, Download, Copy, Check } from "lucide-react"
import { type Resource } from "../../lib/resourcesData"

interface ResourcesGridProps {
  filteredResources: Resource[]
  copiedId: string | null
  copyToClipboard: (text: string, id: string) => void
}

export function ResourcesGrid({ filteredResources, copiedId, copyToClipboard }: ResourcesGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
    >
      {filteredResources.map((resource, index) => {
        const Icon = resource.icon
        return (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
            }}
            className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">{resource.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {resource.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content Preview */}
              {resource.content && (
                <div className="mb-4">
                  <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-3">
                    <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
                      {resource.content.split('\n')[0]}...
                    </pre>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="px-2 py-1 bg-slate-800/50 rounded-full text-xs">
                    {resource.type}
                  </span>
                  <span>{resource.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  {resource.content && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(resource.content!, resource.id.toString())}
                      className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                      title="Copy content"
                    >
                      {copiedId === resource.id.toString() ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </motion.button>
                  )}

                  {resource.externalUrl ? (
                    <motion.a
                      href={resource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                      title="Open external link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  ) : resource.downloadUrl ? (
                    <motion.a
                      href={resource.downloadUrl}
                      download
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                      title="Download resource"
                    >
                      <Download className="w-4 h-4" />
                    </motion.a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}