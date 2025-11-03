"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface AdvancedFiltersSectionProps {
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  difficultyFilter: string | null
  setDifficultyFilter: (difficulty: string | null) => void
  durationFilter: string
  setDurationFilter: (duration: string) => void
  ratingFilter: number
  setRatingFilter: (rating: number) => void
  instructorFilter: string
  setInstructorFilter: (instructor: string) => void
}

export default function AdvancedFiltersSection({
  showAdvancedFilters,
  setShowAdvancedFilters,
  difficultyFilter,
  setDifficultyFilter,
  durationFilter,
  setDurationFilter,
  ratingFilter,
  setRatingFilter,
  instructorFilter,
  setInstructorFilter
}: AdvancedFiltersSectionProps) {
  return (
    <>
      {/* Advanced Filters */}
      <motion.div
        initial={false}
        animate={{ height: showAdvancedFilters ? 'auto' : 0, opacity: showAdvancedFilters ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDifficultyFilter(null)
                setDurationFilter('all')
                setRatingFilter(0)
                setInstructorFilter('')
              }}
              className="px-4 py-2 text-sm bg-slate-800/40 hover:bg-slate-700/40 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              Clear All
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">Difficulty</label>
              <div className="flex gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDifficultyFilter(difficultyFilter === level ? null : level)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      difficultyFilter === level
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">Duration</label>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'short', label: '≤60min' },
                  { value: 'medium', label: '60-120min' },
                  { value: 'long', label: '>120min' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDurationFilter(option.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      durationFilter === option.value
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">Min Rating</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/30 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-purple-500 [&::-moz-range-thumb]:to-pink-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-purple-500/30"
                />
                <span className="text-sm text-slate-300 min-w-[3rem]">{ratingFilter.toFixed(1)}★</span>
              </div>
            </div>

            {/* Instructor Filter */}
            <div>
              <label className="block text-sm text-slate-400 mb-3">Instructor</label>
              <input
                value={instructorFilter}
                onChange={(e) => setInstructorFilter(e.target.value)}
                placeholder="Search instructor..."
                className="w-full px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 placeholder:text-slate-500 text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toggle Advanced Filters */}
      <div className="flex justify-center my-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
        </motion.button>
      </div>
    </>
  )
}
