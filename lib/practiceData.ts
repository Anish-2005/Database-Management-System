// lib/practiceData.ts
import {
  Code,
  Database,
  Zap,
  Target,
  Brain,
  TrendingUp,
  Trophy,
  Star,
  Clock
} from "lucide-react"

export interface PracticeQuestion {
  question: string
  type: "multiple-choice" | "code"
  correctAnswer: string
  options?: string[]
  hint?: string
}

export interface PracticeChallenge {
  id: number
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  points: number
  icon: any
  gradient: string
  type: "interactive" | "quiz"
  questions: PracticeQuestion[]
}

export interface PracticeAchievement {
  title: string
  desc: string
  icon: any
  unlocked: boolean
}

export interface PracticeStats {
  label: string
  value: number | string
  icon: any
  color: string
}

export const practiceChallenges: PracticeChallenge[] = [
  {
    id: 1,
    title: "SQL Query Builder",
    description: "Build correct SQL queries to retrieve data from sample databases",
    category: "SQL",
    difficulty: "Beginner",
    duration: "15 min",
    points: 100,
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    type: "interactive",
    questions: [
      {
        question: "Write a SQL query to select all customers from the 'customers' table:",
        type: "code",
        correctAnswer: "SELECT * FROM customers;",
        hint: "Use SELECT * to select all columns"
      },
      {
        question: "Which SQL clause is used to filter records?",
        type: "multiple-choice",
        options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
        correctAnswer: "WHERE"
      }
    ]
  },
  {
    id: 2,
    title: "Database Design Quiz",
    description: "Test your knowledge of database design principles and normalization",
    category: "Design",
    difficulty: "Intermediate",
    duration: "20 min",
    points: 150,
    icon: Database,
    gradient: "from-purple-500 to-pink-500",
    type: "quiz",
    questions: [
      {
        question: "What does 1NF stand for in database normalization?",
        type: "multiple-choice",
        options: ["First Normal Form", "First Network Form", "First Normalized Form", "First Node Form"],
        correctAnswer: "First Normal Form"
      },
      {
        question: "Which of the following is a primary key constraint?",
        type: "multiple-choice",
        options: ["UNIQUE", "NOT NULL", "PRIMARY KEY", "FOREIGN KEY"],
        correctAnswer: "PRIMARY KEY"
      }
    ]
  },
  {
    id: 3,
    title: "Performance Optimization",
    description: "Identify and fix performance issues in database queries",
    category: "Performance",
    difficulty: "Advanced",
    duration: "25 min",
    points: 200,
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
    type: "interactive",
    questions: [
      {
        question: "Which index type is best for range queries?",
        type: "multiple-choice",
        options: ["Hash Index", "B-Tree Index", "Bitmap Index", "Full-text Index"],
        correctAnswer: "B-Tree Index"
      }
    ]
  },
  {
    id: 4,
    title: "Security Challenges",
    description: "Learn to identify and prevent common database security vulnerabilities",
    category: "Security",
    difficulty: "Intermediate",
    duration: "18 min",
    points: 120,
    icon: Target,
    gradient: "from-red-500 to-pink-500",
    type: "quiz",
    questions: [
      {
        question: "What is SQL injection?",
        type: "multiple-choice",
        options: [
          "A type of database index",
          "A security vulnerability allowing malicious SQL code execution",
          "A method to optimize queries",
          "A database backup technique"
        ],
        correctAnswer: "A security vulnerability allowing malicious SQL code execution"
      }
    ]
  },
  {
    id: 5,
    title: "Data Modeling Workshop",
    description: "Design ER diagrams and understand entity relationships",
    category: "Design",
    difficulty: "Intermediate",
    duration: "30 min",
    points: 180,
    icon: Brain,
    gradient: "from-green-500 to-emerald-500",
    type: "interactive",
    questions: [
      {
        question: "What type of relationship exists between Customer and Order in most e-commerce systems?",
        type: "multiple-choice",
        options: ["One-to-One", "One-to-Many", "Many-to-Many", "No relationship"],
        correctAnswer: "One-to-Many"
      }
    ]
  },
  {
    id: 6,
    title: "Query Optimization Master",
    description: "Advanced techniques for optimizing complex database queries",
    category: "Performance",
    difficulty: "Advanced",
    duration: "35 min",
    points: 250,
    icon: TrendingUp,
    gradient: "from-cyan-500 to-blue-500",
    type: "interactive",
    questions: [
      {
        question: "What does EXPLAIN plan show?",
        type: "multiple-choice",
        options: [
          "Query execution time",
          "Query execution plan and cost",
          "Database size",
          "User permissions"
        ],
        correctAnswer: "Query execution plan and cost"
      }
    ]
  }
]

export const practiceCategories = ["All", "SQL", "Design", "Performance", "Security", "Analytics"]

export const practiceAchievements: PracticeAchievement[] = [
  { title: "SQL Master", desc: "Completed 10 SQL challenges", icon: Code, unlocked: true },
  { title: "Query Optimizer", desc: "Score 95%+ on performance challenges", icon: Zap, unlocked: true },
  { title: "Database Architect", desc: "Complete all design challenges", icon: Database, unlocked: false }
]

export const practiceStats: PracticeStats[] = [
  { label: "Challenges Completed", value: 0, icon: Trophy, color: "from-yellow-500 to-orange-500" },
  { label: "Total Points", value: 1250, icon: Star, color: "from-purple-500 to-pink-500" },
  { label: "Current Streak", value: 7, icon: Zap, color: "from-green-500 to-emerald-500" },
  { label: "Global Rank", value: "#42", icon: TrendingUp, color: "from-cyan-500 to-blue-500" }
]