"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Award,
  CheckCircle,
  PlayCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Brain,
  Database,
  Code,
  Menu,
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Users,
  Sparkles,
  Crown,
  Medal,
  Flame,
  Timer,
  Check,
  X as XIcon,
  AlertCircle,
  Info,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function ProgressPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('animation-playing')
      return saved !== null ? JSON.parse(saved) : true
    }
    return true
  })
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null)

  // Mock progress data
  const progressStats = {
    totalTutorials: 24,
    completedTutorials: 18,
    totalPracticeSessions: 45,
    completedPracticeSessions: 32,
    totalScore: 8750,
    currentStreak: 7,
    longestStreak: 12,
    averageScore: 85,
    timeSpent: 28.5, // hours
    achievements: 8,
    totalAchievements: 15
  }

  const recentActivity = [
    {
      id: 1,
      type: "tutorial",
      title: "Advanced SQL Joins",
      status: "completed",
      score: 95,
      timeSpent: "45 min",
      date: "2024-01-15",
      category: "SQL"
    },
    {
      id: 2,
      type: "practice",
      title: "Database Design Challenge",
      status: "completed",
      score: 88,
      timeSpent: "1h 20min",
      date: "2024-01-14",
      category: "Design"
    },
    {
      id: 3,
      type: "tutorial",
      title: "NoSQL Fundamentals",
      status: "in_progress",
      score: null,
      timeSpent: "30 min",
      date: "2024-01-14",
      category: "NoSQL"
    },
    {
      id: 4,
      type: "achievement",
      title: "SQL Master",
      status: "earned",
      score: null,
      timeSpent: null,
      date: "2024-01-13",
      category: "Achievement"
    }
  ]

  const achievements = [
    {
      id: "sql_master",
      title: "SQL Master",
      description: "Complete all SQL tutorials with 90%+ average score",
      icon: Crown,
      progress: 100,
      earned: true,
      earnedDate: "2024-01-13",
      rarity: "legendary",
      points: 500
    },
    {
      id: "practice_warrior",
      title: "Practice Warrior",
      description: "Complete 30 practice challenges",
      icon: Trophy,
      progress: 100,
      earned: true,
      earnedDate: "2024-01-12",
      rarity: "epic",
      points: 300
    },
    {
      id: "streak_master",
      title: "Streak Master",
      description: "Maintain a 10-day learning streak",
      icon: Flame,
      progress: 70,
      earned: false,
      earnedDate: null,
      rarity: "rare",
      points: 200
    },
    {
      id: "speed_demon",
      title: "Speed Demon",
      description: "Complete a tutorial in under 15 minutes with 90%+ score",
      icon: Zap,
      progress: 0,
      earned: false,
      earnedDate: null,
      rarity: "rare",
      points: 150
    },
    {
      id: "database_explorer",
      title: "Database Explorer",
      description: "Explore 5 different database systems",
      icon: Database,
      progress: 60,
      earned: false,
      earnedDate: null,
      rarity: "uncommon",
      points: 100
    }
  ]

  const skillProgress = [
    { skill: "SQL Fundamentals", progress: 95, level: "Expert", color: "from-green-500 to-emerald-500" },
    { skill: "Database Design", progress: 82, level: "Advanced", color: "from-blue-500 to-cyan-500" },
    { skill: "NoSQL", progress: 68, level: "Intermediate", color: "from-purple-500 to-pink-500" },
    { skill: "Performance Tuning", progress: 45, level: "Beginner", color: "from-orange-500 to-red-500" },
    { skill: "Security", progress: 32, level: "Beginner", color: "from-red-500 to-pink-500" }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "from-yellow-500 to-orange-500"
      case "epic": return "from-purple-500 to-pink-500"
      case "rare": return "from-blue-500 to-cyan-500"
      case "uncommon": return "from-green-500 to-emerald-500"
      default: return "from-gray-500 to-slate-500"
    }
  }

  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case "tutorial":
        return status === "completed" ? CheckCircle : PlayCircle
      case "practice":
        return status === "completed" ? Trophy : Target
      case "achievement":
        return Award
      default:
        return Activity
    }
  }

  const getActivityColor = (type: string, status: string) => {
    if (status === "completed" || status === "earned") {
      switch (type) {
        case "tutorial": return "text-green-400"
        case "practice": return "text-blue-400"
        case "achievement": return "text-yellow-400"
        default: return "text-slate-400"
      }
    }
    return "text-slate-400"
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Progress"
        subtitle="Progress Dashboard"
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
              <BarChart3 className="w-4 h-4" />
              Learning Analytics
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Progress
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Track your learning journey, celebrate achievements, and visualize your growth
              in database management and SQL mastery.
            </p>
          </motion.div>

          {/* Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                label: "Tutorials Completed",
                value: `${progressStats.completedTutorials}/${progressStats.totalTutorials}`,
                percentage: Math.round((progressStats.completedTutorials / progressStats.totalTutorials) * 100),
                icon: BookOpen,
                color: "from-blue-500 to-cyan-500",
                trend: "+3 this week"
              },
              {
                label: "Practice Sessions",
                value: `${progressStats.completedPracticeSessions}/${progressStats.totalPracticeSessions}`,
                percentage: Math.round((progressStats.completedPracticeSessions / progressStats.totalPracticeSessions) * 100),
                icon: Target,
                color: "from-purple-500 to-pink-500",
                trend: "+5 this week"
              },
              {
                label: "Current Streak",
                value: `${progressStats.currentStreak} days`,
                percentage: Math.round((progressStats.currentStreak / progressStats.longestStreak) * 100),
                icon: Flame,
                color: "from-orange-500 to-red-500",
                trend: "Keep it up!"
              },
              {
                label: "Total Score",
                value: progressStats.totalScore.toLocaleString(),
                percentage: progressStats.averageScore,
                icon: Trophy,
                color: "from-green-500 to-emerald-500",
                trend: `${progressStats.averageScore}% avg`
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400 mb-3">{stat.label}</div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">{stat.percentage}% • {stat.trend}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Skill Development</h2>
              <div className="flex gap-2">
                {["week", "month", "all"].map((timeframe) => (
                  <motion.button
                    key={timeframe}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedTimeframe === timeframe
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {skillProgress.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center`}>
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          skill.level === "Expert" ? "bg-green-500/20 text-green-400" :
                          skill.level === "Advanced" ? "bg-blue-500/20 text-blue-400" :
                          skill.level === "Intermediate" ? "bg-purple-500/20 text-purple-400" :
                          "bg-orange-500/20 text-orange-400"
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{skill.progress}%</div>
                      <div className="text-sm text-slate-400">Complete</div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <motion.div
                      className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Achievements</h2>
              <div className="text-sm text-slate-400">
                {progressStats.achievements}/{progressStats.totalAchievements} unlocked
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-6 rounded-3xl border transition-all duration-300 ${
                      achievement.earned
                        ? 'bg-slate-900/30 backdrop-blur-sm border-slate-700 hover:border-purple-500/50'
                        : 'bg-slate-900/20 backdrop-blur-sm border-slate-700/50 opacity-75'
                    }`}
                  >
                    {achievement.earned && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        achievement.earned
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}`
                          : 'bg-slate-700'
                      }`}>
                        <Icon className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-slate-400'}`} />
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          achievement.earned ? 'text-white' : 'text-slate-400'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3">{achievement.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              achievement.rarity === "legendary" ? "bg-yellow-500/20 text-yellow-400" :
                              achievement.rarity === "epic" ? "bg-purple-500/20 text-purple-400" :
                              achievement.rarity === "rare" ? "bg-blue-500/20 text-blue-400" :
                              "bg-green-500/20 text-green-400"
                            }`}>
                              {achievement.rarity}
                            </span>
                            <span className="text-xs text-slate-500">{achievement.points} pts</span>
                          </div>

                          {achievement.earned && (
                            <div className="text-xs text-slate-500">
                              Earned {achievement.earnedDate}
                            </div>
                          )}
                        </div>

                        {!achievement.earned && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
              <div className="flex gap-2">
                {["all", "tutorial", "practice", "achievement"].map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {recentActivity
                .filter(activity => selectedCategory === "all" || activity.type === selectedCategory)
                .map((activity, index) => {
                  const Icon = getActivityIcon(activity.type, activity.status)
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          activity.status === "completed" || activity.status === "earned"
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                            : 'bg-slate-700'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            activity.status === "completed" || activity.status === "earned"
                              ? 'text-white'
                              : 'text-slate-400'
                          }`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                              {activity.score && (
                                <span className="px-2 py-1 bg-slate-800/50 rounded-full">
                                  {activity.score}% score
                                </span>
                              )}
                              {activity.timeSpent && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {activity.timeSpent}
                                </span>
                              )}
                              <span>{activity.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              activity.type === "tutorial" ? "bg-blue-500/20 text-blue-400" :
                              activity.type === "practice" ? "bg-purple-500/20 text-purple-400" :
                              "bg-yellow-500/20 text-yellow-400"
                            }`}>
                              {activity.category}
                            </span>
                            <span className={`text-sm ${
                              activity.status === "completed" || activity.status === "earned"
                                ? 'text-green-400'
                                : 'text-slate-400'
                            }`}>
                              {activity.status === "completed" ? "Completed" :
                               activity.status === "earned" ? "Earned" : "In Progress"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </motion.div>

          {/* Learning Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Learning Insights</h2>
                <p className="text-slate-400">AI-powered recommendations to accelerate your progress</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Focus on Performance Tuning",
                    description: "Your weakest area. Complete the optimization tutorials to improve.",
                    icon: TrendingUp,
                    color: "from-orange-500 to-red-500",
                    action: "Start Tutorial"
                  },
                  {
                    title: "Practice More Joins",
                    description: "Complex joins are challenging you. More practice will help.",
                    icon: Target,
                    color: "from-blue-500 to-cyan-500",
                    action: "Practice Now"
                  },
                  {
                    title: "Maintain Your Streak",
                    description: "You're on a 7-day streak! Keep learning daily to build habits.",
                    icon: Flame,
                    color: "from-green-500 to-emerald-500",
                    action: "Continue Learning"
                  }
                ].map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <insight.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{insight.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{insight.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-2 px-4 bg-gradient-to-r ${insight.color} text-white rounded-xl font-medium shadow-lg`}
                    >
                      {insight.action}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}