"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, XCircle, Trophy } from "lucide-react"
import { PracticeChallenge } from "../../lib/practiceData"

interface PracticeModalProps {
  selectedChallenge: PracticeChallenge | null
  currentQuestion: number
  selectedAnswer: string | null
  setSelectedAnswer: (answer: string | null) => void
  showResult: boolean
  score: number
  onSubmitAnswer: () => void
  onCloseChallenge: () => void
  onStartChallenge: (challenge: PracticeChallenge) => void
  isSubmitting?: boolean
}

export const PracticeModal = ({
  selectedChallenge,
  currentQuestion,
  selectedAnswer,
  setSelectedAnswer,
  showResult,
  score,
  onSubmitAnswer,
  onCloseChallenge,
  onStartChallenge,
  isSubmitting = false
}: PracticeModalProps) => {
  if (!selectedChallenge) return null

  const question = selectedChallenge.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / selectedChallenge.questions.length) * 100
  const isLastQuestion = currentQuestion === selectedChallenge.questions.length - 1

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onCloseChallenge}
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
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedChallenge.gradient} flex items-center justify-center`}>
                <selectedChallenge.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedChallenge.title}</h2>
                <p className="text-slate-400">{selectedChallenge.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-slate-400">Score</div>
                <div className="text-lg font-bold text-white">{score}/{selectedChallenge.points}</div>
              </div>
              <motion.button
                onClick={onCloseChallenge}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                  <span>Question {currentQuestion + 1} of {selectedChallenge.questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {question.question}
                </h3>

                {/* Answer Options */}
                {question.type === "multiple-choice" ? (
                  <div className="space-y-3">
                    {question.options?.map((option: string, index: number) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAnswer(option)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          selectedAnswer === option
                            ? showResult
                              ? option === question.correctAnswer
                                ? 'bg-green-500/10 border-green-500 text-green-300'
                                : 'bg-red-500/10 border-red-500 text-red-300'
                              : 'bg-purple-500/10 border-purple-500 text-purple-300'
                            : showResult && option === question.correctAnswer
                            ? 'bg-green-500/10 border-green-500 text-green-300'
                            : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedAnswer === option ? 'border-current' : 'border-slate-600'
                          }`}>
                            {selectedAnswer === option && (
                              <div className="w-full h-full rounded-full bg-current scale-50" />
                            )}
                          </div>
                          <span>{option}</span>
                          {showResult && option === question.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                          )}
                          {showResult && selectedAnswer === option && option !== question.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      value={selectedAnswer || ""}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      disabled={showResult}
                      placeholder="Write your SQL query here..."
                      className="w-full p-4 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors text-slate-300 font-mono resize-none"
                      rows={6}
                    />
                    {showResult && (
                      <div className={`p-4 rounded-xl border ${
                        selectedAnswer === question.correctAnswer
                          ? 'bg-green-500/10 border-green-500 text-green-300'
                          : 'bg-red-500/10 border-red-500 text-red-300'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {selectedAnswer === question.correctAnswer ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                          <span className="font-semibold">
                            {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        {selectedAnswer !== question.correctAnswer && (
                          <div>
                            <div className="text-sm text-slate-400 mb-1">Correct answer:</div>
                            <code className="text-sm bg-slate-900/50 p-2 rounded font-mono">
                              {question.correctAnswer}
                            </code>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              {!showResult && (
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onSubmitAnswer}
                    disabled={!selectedAnswer || isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Answer"}
                  </motion.button>
                </div>
              )}

              {/* Completion Message */}
              {showResult && isLastQuestion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Challenge Completed!</h3>
                  <p className="text-slate-400 mb-4">You earned {score} points</p>
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onCloseChallenge}
                      className="px-6 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                    >
                      Close
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onStartChallenge(selectedChallenge)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25"
                    >
                      Try Again
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}