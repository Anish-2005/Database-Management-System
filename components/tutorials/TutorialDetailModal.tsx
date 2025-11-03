"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Users, Star, CheckCircle, Target, Copy, Check, PlayCircle, ArrowRight } from "lucide-react"

interface Tutorial {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  completed: boolean
  rating: number
  students: number
  instructor: string
  instructorAvatar: string
  icon: any
  gradient: string
  topics: string[]
  codeExamples?: any[]
  learningObjectives?: string[]
  quizData?: any[]
  quizQuestions: number
  handsOnExercises: number
}

interface TutorialDetailModalProps {
  selectedTutorial: Tutorial | null
  setSelectedTutorial: (tutorial: Tutorial | null) => void
  getDifficultyColor: (difficulty: string) => string
  copiedCodeId: string | null
  copyToClipboard: (code: string, codeId: string) => void
  showQuiz: boolean
  setShowQuiz: (show: boolean) => void
  quizAnswers: Record<string, string>
  handleQuizAnswer: (questionId: number, answerIndex: string) => void
  quizSubmitted: Record<number, boolean>
  submitQuiz: (tutorialId: number) => void
  calculateQuizScore: (tutorial: Tutorial) => number
  resetQuiz: (tutorialId: number) => void
}

export default function TutorialDetailModal({
  selectedTutorial,
  setSelectedTutorial,
  getDifficultyColor,
  copiedCodeId,
  copyToClipboard,
  showQuiz,
  setShowQuiz,
  quizAnswers,
  handleQuizAnswer,
  quizSubmitted,
  submitQuiz,
  calculateQuizScore,
  resetQuiz
}: TutorialDetailModalProps) {
  if (!selectedTutorial) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedTutorial(null)}
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
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedTutorial.gradient} flex items-center justify-center`}>
                <selectedTutorial.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedTutorial.title}</h2>
                <p className="text-slate-400">{selectedTutorial.description}</p>
              </div>
            </div>

            <motion.button
              onClick={() => setSelectedTutorial(null)}
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
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedTutorial.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{selectedTutorial.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{selectedTutorial.rating}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedTutorial.difficulty)}`}>
                  {selectedTutorial.difficulty}
                </span>
              </div>

              {/* Topics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What You'll Learn</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedTutorial.topics.map((topic: string, index: number) => (
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
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Prerequisites</h3>
                <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <p className="text-slate-400">
                    {selectedTutorial.difficulty === "Beginner"
                      ? "No prior experience required. Basic computer literacy is helpful."
                      : selectedTutorial.difficulty === "Intermediate"
                      ? "Basic understanding of databases and SQL. Completion of beginner tutorials recommended."
                      : "Strong foundation in database concepts and SQL. Experience with database design preferred."
                    }
                  </p>
                </div>
              </div>

              {/* Code Examples */}
              {selectedTutorial.codeExamples && selectedTutorial.codeExamples.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Code Examples</h3>
                  <div className="space-y-4">
                    {selectedTutorial.codeExamples.map((example: any, index: number) => (
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
                            onClick={() => copyToClipboard(example.code, `${selectedTutorial.id}-${index}`)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all ${
                              copiedCodeId === `${selectedTutorial.id}-${index}`
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-slate-700/50 text-slate-400 hover:text-slate-300 border border-slate-600'
                            }`}
                          >
                            {copiedCodeId === `${selectedTutorial.id}-${index}` ? (
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
                            <code className="language-sql">{example.code}</code>
                          </pre>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Objectives */}
              {selectedTutorial.learningObjectives && selectedTutorial.learningObjectives.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Learning Objectives</h3>
                  <div className="grid md:grid-cols-1 gap-3">
                    {selectedTutorial.learningObjectives.map((objective: string, index: number) => (
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

              {/* Tutorial Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{selectedTutorial.quizQuestions}</div>
                  <div className="text-sm text-slate-400">Quiz Questions</div>
                </div>
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-green-400 mb-1">{selectedTutorial.handsOnExercises}</div>
                  <div className="text-sm text-slate-400">Hands-on Exercises</div>
                </div>
                <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{selectedTutorial.rating}</div>
                  <div className="text-sm text-slate-400">Average Rating</div>
                </div>
              </div>

              {/* Interactive Quiz */}
              {selectedTutorial.quizData && selectedTutorial.quizData.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Knowledge Check</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowQuiz(!showQuiz)}
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showQuiz && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        {/* Quiz Questions */}
                        {selectedTutorial.quizData.map((question: any, index: number) => (
                          <motion.div
                            key={question.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                          >
                            <h4 className="text-white font-medium mb-3">{index + 1}. {question.question}</h4>
                            <div className="space-y-2">
                              {question.options.map((option: string, optionIndex: number) => {
                                const isSelected = quizAnswers[question.id] === optionIndex.toString()
                                const isCorrect = optionIndex === question.correctAnswer
                                const isSubmitted = quizSubmitted[selectedTutorial.id]
                                const showResult = isSubmitted && (isSelected || isCorrect)

                                return (
                                  <motion.button
                                    key={optionIndex}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => !isSubmitted && handleQuizAnswer(question.id, optionIndex.toString())}
                                    disabled={isSubmitted}
                                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                                      showResult && isCorrect
                                        ? 'bg-green-500/20 border-green-500/50 text-green-300'
                                        : showResult && isSelected && !isCorrect
                                        ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                        : isSelected
                                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        showResult && isCorrect ? 'border-green-400' :
                                        showResult && isSelected && !isCorrect ? 'border-red-400' :
                                        isSelected ? 'border-purple-400' : 'border-slate-500'
                                      }`}>
                                        {(showResult && isCorrect) || isSelected ? (
                                          <div className={`w-2 h-2 rounded-full ${
                                            showResult && isCorrect ? 'bg-green-400' :
                                            isSelected ? 'bg-purple-400' : 'bg-slate-400'
                                          }`} />
                                        ) : null}
                                      </div>
                                      <span className="text-sm">{option}</span>
                                    </div>
                                  </motion.button>
                                )
                              })}
                            </div>

                            {/* Show explanation after submission */}
                            {quizSubmitted[selectedTutorial.id] && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                              >
                                <p className="text-sm text-slate-300">{question.explanation}</p>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}

                        {/* Quiz Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                          <div className="text-sm text-slate-400">
                            {quizSubmitted[selectedTutorial.id] && (
                              <span className={`font-medium ${
                                calculateQuizScore(selectedTutorial) >= 80 ? 'text-green-400' :
                                calculateQuizScore(selectedTutorial) >= 60 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                Score: {calculateQuizScore(selectedTutorial)}%
                              </span>
                            )}
                          </div>

                          <div className="flex gap-3">
                            {quizSubmitted[selectedTutorial.id] ? (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => resetQuiz(selectedTutorial.id)}
                                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-slate-300 hover:text-white transition-colors"
                              >
                                Retake Quiz
                              </motion.button>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => submitQuiz(selectedTutorial.id)}
                                disabled={Object.keys(quizAnswers).length !== selectedTutorial.quizData.length}
                                className={`px-4 py-2 rounded-xl transition-colors ${
                                  Object.keys(quizAnswers).length === selectedTutorial.quizData.length
                                    ? 'bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 hover:text-green-300'
                                    : 'bg-slate-700/50 border border-slate-600 text-slate-500 cursor-not-allowed'
                                }`}
                              >
                                Submit Quiz
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                  >
                    Add to Learning Path
                  </motion.button>
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
                  Start Tutorial
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
