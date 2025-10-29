"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Search,
  Filter,
  Database,
  Code,
  Layers,
  Zap,
  Shield,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Target,
  Trophy,
  Users,
  Calendar,
  PlayCircle,
  Pause,
  RotateCcw,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function TutorialsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  // Load animation state from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('animation-playing')
    if (saved !== null) {
      setIsPlaying(JSON.parse(saved))
    }
  }, [])

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null)

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  // Tutorial data
  const tutorials = [
    {
      id: 1,
      title: "Introduction to Relational Databases",
      description: "Learn the fundamentals of relational database design and SQL basics",
      category: "Fundamentals",
      difficulty: "Beginner",
      duration: "45 min",
      completed: false,
      rating: 4.8,
      students: 1250,
      icon: Database,
      gradient: "from-blue-500 to-cyan-500",
      topics: ["Tables", "Primary Keys", "Relationships", "Basic SQL"]
    },
    {
      id: 2,
      title: "Advanced SQL Queries",
      description: "Master complex queries with JOINs, subqueries, and window functions",
      category: "SQL",
      difficulty: "Intermediate",
      duration: "90 min",
      completed: true,
      rating: 4.9,
      students: 890,
      icon: Code,
      gradient: "from-purple-500 to-pink-500",
      topics: ["JOINs", "Subqueries", "Window Functions", "CTEs"]
    },
    {
      id: 3,
      title: "Database Normalization",
      description: "Understanding normalization forms and database design principles",
      category: "Design",
      difficulty: "Intermediate",
      duration: "60 min",
      completed: false,
      rating: 4.7,
      students: 675,
      icon: Layers,
      gradient: "from-green-500 to-emerald-500",
      topics: ["1NF", "2NF", "3NF", "BCNF", "Denormalization"]
    },
    {
      id: 4,
      title: "Performance Optimization",
      description: "Learn indexing strategies, query optimization, and performance tuning",
      category: "Performance",
      difficulty: "Advanced",
      duration: "120 min",
      completed: false,
      rating: 4.9,
      students: 543,
      icon: Zap,
      gradient: "from-orange-500 to-red-500",
      topics: ["Indexing", "Query Plans", "EXPLAIN", "Optimization"]
    },
    {
      id: 5,
      title: "Database Security Essentials",
      description: "Implement security best practices and protect against common threats",
      category: "Security",
      difficulty: "Intermediate",
      duration: "75 min",
      completed: false,
      rating: 4.6,
      students: 432,
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      topics: ["Authentication", "Authorization", "Encryption", "SQL Injection"]
    },
    {
      id: 6,
      title: "Data Warehousing Concepts",
      description: "Introduction to data warehousing, ETL processes, and analytics",
      category: "Analytics",
      difficulty: "Advanced",
      duration: "105 min",
      completed: false,
      rating: 4.8,
      students: 321,
      icon: BarChart3,
      gradient: "from-cyan-500 to-blue-500",
      topics: ["ETL", "Star Schema", "OLAP", "Data Marts"]
    }
  ]

  const categories = ["All", "Fundamentals", "SQL", "Design", "Performance", "Security", "Analytics"]

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesCategory = activeCategory === null || activeCategory === "All" || tutorial.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400 bg-green-500/10"
      case "Intermediate": return "text-yellow-400 bg-yellow-500/10"
      case "Advanced": return "text-red-400 bg-red-500/10"
      default: return "text-slate-400 bg-slate-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Tutorials"
        subtitle="Learn • Practice • Master"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="w-4 h-4" />
              Interactive Learning Platform
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Master Database
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tutorials designed to take you from beginner to expert in database management systems.
              Learn at your own pace with interactive content and hands-on exercises.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-12 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
          >
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  placeholder="Search tutorials, topics, or skills..."
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2 text-slate-400">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Category:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category === "All" ? null : category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      (activeCategory === category || (category === "All" && activeCategory === null))
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tutorials Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          >
            {filteredTutorials.map((tutorial, index) => {
              const Icon = tutorial.icon
              return (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                  }}
                  className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedTutorial(tutorial)}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tutorial.gradient} flex items-center justify-center shadow-lg mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{tutorial.description}</p>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      {tutorial.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{tutorial.students}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty}
                        </span>
                        {tutorial.completed && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-4 pt-4 border-t border-slate-700/50">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-300">{tutorial.rating}</span>
                      <span className="text-sm text-slate-500">•</span>
                      <span className="text-sm text-slate-500">{tutorial.category}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Learning Path */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Your Learning Journey</h2>
                <p className="text-slate-400">Follow our structured learning path to become a database expert</p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "Foundation", desc: "Database basics & SQL", progress: 100 },
                  { step: 2, title: "Design", desc: "Schema design & normalization", progress: 75 },
                  { step: 3, title: "Advanced", desc: "Performance & optimization", progress: 45 },
                  { step: 4, title: "Mastery", desc: "Architecture & scaling", progress: 20 }
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold">
                      {phase.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{phase.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{phase.desc}</p>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${phase.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{phase.progress}% Complete</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tutorial Detail Modal */}
      <AnimatePresence>
        {selectedTutorial && (
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
        )}
      </AnimatePresence>
    </div>
  )
}