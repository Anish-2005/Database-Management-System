import {
  Crown,
  Trophy,
  Flame,
  Zap,
  Database,
  CheckCircle,
  PlayCircle,
  Target,
  Award,
  Activity,
  TrendingUp,
} from "lucide-react"

export interface ProgressStats {
  totalTutorials: number
  completedTutorials: number
  totalPracticeSessions: number
  completedPracticeSessions: number
  totalScore: number
  currentStreak: number
  longestStreak: number
  averageScore: number
  timeSpent: number
  achievements: number
  totalAchievements: number
}

export interface RecentActivity {
  id: number
  type: string
  title: string
  status: string
  score: number | null
  timeSpent: string | null
  date: string
  category: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  progress: number
  earned: boolean
  earnedDate: string | null
  rarity: string
  points: number
}

export interface SkillProgress {
  skill: string
  progress: number
  level: string
  color: string
}

export interface LearningInsight {
  title: string
  description: string
  icon: any
  color: string
  action: string
}

export const progressStats: ProgressStats = {
  totalTutorials: 24,
  completedTutorials: 18,
  totalPracticeSessions: 45,
  completedPracticeSessions: 32,
  totalScore: 8750,
  currentStreak: 7,
  longestStreak: 12,
  averageScore: 85,
  timeSpent: 28.5,
  achievements: 8,
  totalAchievements: 15
}

export const recentActivity: RecentActivity[] = [
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

export const achievements: Achievement[] = [
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

export const skillProgress: SkillProgress[] = [
  { skill: "SQL Fundamentals", progress: 95, level: "Expert", color: "from-green-500 to-emerald-500" },
  { skill: "Database Design", progress: 82, level: "Advanced", color: "from-blue-500 to-cyan-500" },
  { skill: "NoSQL", progress: 68, level: "Intermediate", color: "from-purple-500 to-pink-500" },
  { skill: "Performance Tuning", progress: 45, level: "Beginner", color: "from-orange-500 to-red-500" },
  { skill: "Security", progress: 32, level: "Beginner", color: "from-red-500 to-pink-500" }
]

export const learningInsights: LearningInsight[] = [
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
]

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary": return "from-yellow-500 to-orange-500"
    case "epic": return "from-purple-500 to-pink-500"
    case "rare": return "from-blue-500 to-cyan-500"
    case "uncommon": return "from-green-500 to-emerald-500"
    default: return "from-gray-500 to-slate-500"
  }
}

export const getActivityIcon = (type: string, status: string) => {
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

export const getActivityColor = (type: string, status: string) => {
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