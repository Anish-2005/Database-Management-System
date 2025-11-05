"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Users, Star, CheckCircle, Target, Copy, Check, PlayCircle, ArrowRight, Database, Code, BookOpen, Award, Calendar, GitBranch, BarChart3, Layers, Zap, Brain, TrendingUp } from "lucide-react"
import { Lab } from '../../lib/labsData'

interface LabDetailModalProps {
  selectedLab: Lab | null
  onClose: () => void
  getDifficultyColor: (difficulty: string) => string
  copiedCodeId: string | null
  copyToClipboard: (code: string, codeId: string) => void
  onEditLab?: (lab: Lab) => void
  onDeleteLab?: (labId: string) => void
}

export default function LabDetailModal({
  selectedLab,
  onClose,
  getDifficultyColor,
  copiedCodeId,
  copyToClipboard,
  onEditLab,
  onDeleteLab
}: LabDetailModalProps) {
  // Icon mapping function to convert string icon names to components
  const getIconComponent = (iconName: string | any) => {
    // If it's already a component, return it
    if (typeof iconName === 'function') return iconName
    
    // Map string names to icon components
    const iconMap: Record<string, any> = {
      Database,
      BarChart3,
      Layers,
      Zap,
      Target,
      Brain,
      TrendingUp,
      Code
    }
    return iconMap[iconName] || Database
  }

  if (!selectedLab) return null

  const IconComponent = getIconComponent(selectedLab.icon)

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
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedLab.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${selectedLab.gradient} opacity-50 blur-xl`}></div>
                <IconComponent className="w-10 h-10 text-white relative z-10 drop-shadow-lg" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-white">{selectedLab.title}</h2>
                <p className="text-slate-400">{selectedLab.description}</p>
              </div>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedLab.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{selectedLab.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{selectedLab.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>{selectedLab.environment}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedLab.difficulty)}`}>
                  {selectedLab.difficulty}
                </span>
              </div>

              {/* Topics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What You'll Build</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedLab.topics.map((topic: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {selectedLab.prerequisites && selectedLab.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Prerequisites</h3>
                  <div className="grid md:grid-cols-1 gap-3">
                    {selectedLab.prerequisites.map((prereq: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700"
                      >
                        <BookOpen className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <span className="text-slate-300">{prereq}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Objectives */}
              {selectedLab.learningObjectives && selectedLab.learningObjectives.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Learning Objectives</h3>
                  <div className="grid md:grid-cols-1 gap-3">
                    {selectedLab.learningObjectives.map((objective: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700"
                      >
                        <Target className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{objective}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {selectedLab.technologies && selectedLab.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.technologies.map((tech: string, index: number) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 bg-slate-800/40 border border-slate-700 rounded-full text-sm text-slate-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Examples */}
              {selectedLab.codeExamples && selectedLab.codeExamples.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Code Examples</h3>
                  <div className="space-y-4">
                    {selectedLab.codeExamples.map((example: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-4 border-b border-slate-700">
                          <h4 className="text-sm font-medium text-slate-300">{example.title}</h4>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(example.code, `${selectedLab.id}-${index}`)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all ${
                              copiedCodeId === `${selectedLab.id}-${index}`
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-slate-700/50 text-slate-400 hover:text-slate-300 border border-slate-600'
                            }`}
                          >
                            {copiedCodeId === `${selectedLab.id}-${index}` ? (
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
                          <pre className="text-sm text-slate-300 overflow-x-auto bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                            <code className={`language-${example.language || 'sql'}`}>{example.code}</code>
                          </pre>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{selectedLab.quizQuestions}</div>
                  <div className="text-sm text-slate-400">Quiz Questions</div>
                </div>
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-green-400 mb-1">{selectedLab.handsOnExercises}</div>
                  <div className="text-sm text-slate-400">Hands-on Exercises</div>
                </div>
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{selectedLab.rating}</div>
                  <div className="text-sm text-slate-400">Average Rating</div>
                </div>
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{selectedLab.collaborators || 0}</div>
                  <div className="text-sm text-slate-400">Collaborators</div>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {selectedLab.instructorAvatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium">{selectedLab.instructor}</h4>
                    <Award className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-sm text-slate-400">Lab Instructor</p>
                </div>
                {selectedLab.lastUpdated && (
                  <div className="text-right text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Updated {selectedLab.lastUpdated}</span>
                    </div>
                    {selectedLab.version && (
                      <div className="flex items-center gap-1 mt-1">
                        <GitBranch className="w-4 h-4" />
                        <span>v{selectedLab.version}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  {onEditLab && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEditLab(selectedLab)}
                      className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                    >
                      Edit Lab
                    </motion.button>
                  )}
                  {onDeleteLab && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDeleteLab(selectedLab.id)}
                      className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-colors border border-red-500/30"
                    >
                      Delete Lab
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                  >
                    Download Resources
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-3"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Lab
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}