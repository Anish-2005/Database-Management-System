import { motion, AnimatePresence } from "framer-motion"
import { Download, Share2, XCircle, Copy, Check, ThumbsUp, ExternalLink } from "lucide-react"
import { DocumentationItem } from "../../lib/documentationData"

interface DocumentationDetailModalProps {
  activeDoc: DocumentationItem | null
  copiedCodeId: string | null
  onClose: () => void
  onCopyCode: (code: string, codeId: string) => void
}

export const DocumentationDetailModal = ({
  activeDoc,
  copiedCodeId,
  onClose,
  onCopyCode
}: DocumentationDetailModalProps) => {
  if (!activeDoc) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeDoc.gradient} flex items-center justify-center`}>
                <activeDoc.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{activeDoc.title}</h2>
                <p className="text-slate-400 text-sm">{activeDoc.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
              >
                <Download className="w-5 h-5 text-slate-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
              >
                <Share2 className="w-5 h-5 text-slate-400" />
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-400" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            <div className="prose prose-invert max-w-none">
              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Overview</h3>
                <p className="text-slate-300 leading-relaxed">{activeDoc.content.overview}</p>
              </div>

              {/* Sections */}
              {activeDoc.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">{section.content}</p>

                  {section.code && (
                    <div className="relative bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <span className="text-sm text-slate-400">Code Example</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onCopyCode(section.code!, `${activeDoc.id}-${index}`)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all ${
                            copiedCodeId === `${activeDoc.id}-${index}`
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-slate-700/50 text-slate-400 hover:text-slate-300 border border-slate-600'
                          }`}
                        >
                          {copiedCodeId === `${activeDoc.id}-${index}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </motion.button>
                      </div>
                      <div className="p-4">
                        <pre className="text-sm text-slate-300 overflow-x-auto">
                          <code>{section.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Last updated: {activeDoc.lastUpdated}
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700 text-sm"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on GitHub
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}