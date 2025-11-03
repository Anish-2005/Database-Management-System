"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock, Trophy, Target, BookOpen } from "lucide-react"

interface LearningAnalyticsSectionProps {
  tutorials: any[]
  tutorialProgress: Record<number, number>
}

export default function LearningAnalyticsSection({
  tutorials,
  tutorialProgress
}: LearningAnalyticsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-3xl" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Your Learning Analytics</h2>
          <p className="text-slate-400">Track your progress and achievements across all tutorials</p>
        </div>

        {/* Analytics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Total Progress</h3>
                <p className="text-sm text-slate-400">Overall completion</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {Math.round((Object.values(tutorialProgress).filter(p => p === 100).length / tutorials.length) * 100)}%
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{
                  width: `${(Object.values(tutorialProgress).filter(p => p === 100).length / tutorials.length) * 100}%`
                }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-xs text-slate-500">
              {Object.values(tutorialProgress).filter(p => p === 100).length} of {tutorials.length} completed
            </p>
          </motion.div>

          {/* Study Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Study Time</h3>
                <p className="text-sm text-slate-400">Time invested</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {Math.round(Object.values(tutorialProgress).reduce((acc, progress, idx) => {
                const tutorial = tutorials[idx]
                if (tutorial) {
                  const duration = parseInt(tutorial.duration.split(' ')[0])
                  return acc + (duration * progress / 100)
                }
                return acc
              }, 0))} min
            </div>
            <div className="text-sm text-slate-400">Estimated completion time</div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Achievements</h3>
                <p className="text-sm text-slate-400">Milestones reached</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {Object.values(tutorialProgress).filter(p => p === 100).length >= 5 ? '🏆' :
               Object.values(tutorialProgress).filter(p => p === 100).length >= 3 ? '🥈' :
               Object.values(tutorialProgress).filter(p => p === 100).length >= 1 ? '🥉' : '🎯'}
            </div>
            <div className="text-sm text-slate-400">
              {Object.values(tutorialProgress).filter(p => p === 100).length === 0 ? 'Start your journey!' :
               Object.values(tutorialProgress).filter(p => p === 100).length < 3 ? 'Keep going!' :
               Object.values(tutorialProgress).filter(p => p === 100).length < 5 ? 'Great progress!' : 'Master achieved!'}
            </div>
          </motion.div>

          {/* Learning Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Current Focus</h3>
                <p className="text-sm text-slate-400">Active learning</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {Object.values(tutorialProgress).filter(p => p > 0 && p < 100).length}
            </div>
            <div className="text-sm text-slate-400">Tutorials in progress</div>
          </motion.div>
        </div>

        {/* Progress by Category */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Progress by Category</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Fundamentals', 'SQL', 'Design', 'Performance', 'Security', 'Analytics'].map((category, index) => {
              const categoryTutorials = tutorials.filter(t => t.category === category)
              const completedInCategory = categoryTutorials.filter(t =>
                tutorialProgress[t.id] === 100
              ).length
              const progress = categoryTutorials.length > 0 ? (completedInCategory / categoryTutorials.length) * 100 : 0

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-300">{category}</span>
                    <span className="text-xs text-slate-500">{completedInCategory}/{categoryTutorials.length}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {Object.entries(tutorialProgress)
              .filter(([_, progress]) => progress > 0)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([tutorialId, progress]) => {
                const tutorial = tutorials.find(t => t.id === parseInt(tutorialId))
                if (!tutorial) return null

                return (
                  <motion.div
                    key={tutorialId}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tutorial.gradient} flex items-center justify-center flex-shrink-0`}>
                      <tutorial.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">{tutorial.title}</h4>
                      <p className="text-xs text-slate-400">{tutorial.category} • {tutorial.difficulty}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-purple-400">{progress}%</div>
                      <div className="w-20 bg-slate-700 rounded-full h-1 mt-1">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            {Object.keys(tutorialProgress).length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No activity yet. Start learning to see your progress here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
