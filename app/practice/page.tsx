"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  Play,
  CheckCircle,
  XCircle,
  Target,
  Trophy,
  Clock,
  Star,
  Zap,
  Database,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  RotateCcw,
  Pause,
  PlayCircle,
  ArrowRight,
  BookOpen,
  Brain,
  Lightbulb,
  Award,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react"
import * as THREE from "three"
import Navbar from "../../components/Navbar"

export default function PracticePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())

  // Three.js Background (same as other pages)
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 15

    const createParticles = (count: number, color: number, size: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50
        positions[i + 1] = (Math.random() - 0.5) * 50
        positions[i + 2] = (Math.random() - 0.5) * 50

        colors[i] = (color >> 16 & 255) / 255
        colors[i + 1] = (color >> 8 & 255) / 255
        colors[i + 2] = (color & 255) / 255
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      })

      return new THREE.Points(geometry, material)
    }

    const particles1 = createParticles(2000, 0x6366f1, 0.1)
    const particles2 = createParticles(1500, 0x8b5cf6, 0.08)
    const particles3 = createParticles(1000, 0x06b6d4, 0.12)

    scene.add(particles1)
    scene.add(particles2)
    scene.add(particles3)

    const createDatabaseShape = (type: string, position: [number, number, number]) => {
      let geometry
      switch (type) {
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1, 1, 2, 8)
          break
        case 'cube':
          geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
          break
        case 'sphere':
          geometry = new THREE.SphereGeometry(1, 8, 6)
          break
        default:
          geometry = new THREE.ConeGeometry(1, 2, 6)
      }

      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.7,
        shininess: 100
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      return mesh
    }

    const shapes = [
      createDatabaseShape('cylinder', [-4, 0, 0]),
      createDatabaseShape('cube', [0, 0, 0]),
      createDatabaseShape('sphere', [4, 0, 0]),
    ]

    shapes.forEach(shape => scene.add(shape))

    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array([
      -4, 0, 0,  0, 0, 0,
      0, 0, 0,    4, 0, 0,
      -4, 0, 0,   4, 0, 0
    ])
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
      linewidth: 2
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const clock = new THREE.Clock()

    const animate = () => {
      if (!isPlaying) return

      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      particles1.rotation.x = elapsedTime * 0.1
      particles1.rotation.y = elapsedTime * 0.15
      particles2.rotation.x = -elapsedTime * 0.08
      particles2.rotation.y = -elapsedTime * 0.12
      particles3.rotation.x = elapsedTime * 0.05
      particles3.rotation.y = elapsedTime * 0.1

      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.2
        shape.rotation.y = elapsedTime * 0.3
        shape.position.y = Math.sin(elapsedTime + index) * 0.5
      })

      lines.rotation.z = elapsedTime * 0.1

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [isPlaying])

  // Practice challenges data
  const challenges = [
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

  const categories = ["All", "SQL", "Design", "Performance", "Security", "Analytics"]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = activeCategory === null || activeCategory === "All" || challenge.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.category.toLowerCase().includes(searchQuery.toLowerCase())
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

  const startChallenge = (challenge: any) => {
    setSelectedChallenge(challenge)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  const submitAnswer = () => {
    if (!selectedAnswer) return

    const question = selectedChallenge.questions[currentQuestion]
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) {
      setScore(prev => prev + Math.floor(selectedChallenge.points / selectedChallenge.questions.length))
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < selectedChallenge.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Challenge completed
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
        setTimeout(() => {
          setSelectedChallenge(null)
          setCurrentQuestion(0)
          setSelectedAnswer(null)
          setShowResult(false)
          setScore(0)
        }, 2000)
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Three.js Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-60 z-0"
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-[80px]"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navigation */}
      <Navbar
        currentPage="Practice"
        subtitle="Practice • Challenge • Excel"
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
              <Target className="w-4 h-4" />
              Interactive Practice Platform
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Test Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Database Skills
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Sharpen your database expertise with interactive challenges, quizzes, and coding exercises.
              Track your progress and earn points as you master database management.
            </p>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: "Challenges Completed", value: completedChallenges.size, icon: Trophy, color: "from-yellow-500 to-orange-500" },
              { label: "Total Points", value: 1250, icon: Star, color: "from-purple-500 to-pink-500" },
              { label: "Current Streak", value: 7, icon: Zap, color: "from-green-500 to-emerald-500" },
              { label: "Global Rank", value: "#42", icon: TrendingUp, color: "from-cyan-500 to-blue-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-start lg:items-center mb-12 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
          >
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                  placeholder="Search challenges, topics, or skills..."
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

          {/* Challenges Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          >
            {filteredChallenges.map((challenge, index) => {
              const Icon = challenge.icon
              const isCompleted = completedChallenges.has(challenge.id)

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                  }}
                  className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer overflow-hidden"
                  onClick={() => startChallenge(challenge)}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${challenge.gradient} flex items-center justify-center shadow-lg mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{challenge.description}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{challenge.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{challenge.points}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>{challenge.category}</span>
                        <span>{challenge.type}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Achievement Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Recent Achievements</h2>
                <p className="text-slate-400">Celebrate your progress and unlock new challenges</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "SQL Master", desc: "Completed 10 SQL challenges", icon: Code, unlocked: true },
                  { title: "Query Optimizer", desc: "Score 95%+ on performance challenges", icon: Zap, unlocked: true },
                  { title: "Database Architect", desc: "Complete all design challenges", icon: Database, unlocked: false }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                        : 'bg-slate-800/40 border-slate-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                        : 'bg-slate-700'
                    }`}>
                      <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`} />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.unlocked ? 'text-slate-300' : 'text-slate-500'}`}>
                      {achievement.desc}
                    </p>
                    {achievement.unlocked && (
                      <div className="mt-3 flex items-center gap-1 text-yellow-400">
                        <Trophy className="w-4 h-4" />
                        <span className="text-xs">Unlocked!</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {selectedChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedChallenge(null)}
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
                    onClick={() => setSelectedChallenge(null)}
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
                      <span>{Math.round(((currentQuestion + 1) / selectedChallenge.questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / selectedChallenge.questions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      {selectedChallenge.questions[currentQuestion].question}
                    </h3>

                    {/* Answer Options */}
                    {selectedChallenge.questions[currentQuestion].type === "multiple-choice" ? (
                      <div className="space-y-3">
                        {selectedChallenge.questions[currentQuestion].options.map((option: string, index: number) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedAnswer(option)}
                            disabled={showResult}
                            className={`w-full p-4 rounded-xl border transition-all text-left ${
                              selectedAnswer === option
                                ? showResult
                                  ? option === selectedChallenge.questions[currentQuestion].correctAnswer
                                    ? 'bg-green-500/10 border-green-500 text-green-300'
                                    : 'bg-red-500/10 border-red-500 text-red-300'
                                  : 'bg-purple-500/10 border-purple-500 text-purple-300'
                                : showResult && option === selectedChallenge.questions[currentQuestion].correctAnswer
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
                              {showResult && option === selectedChallenge.questions[currentQuestion].correctAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                              )}
                              {showResult && selectedAnswer === option && option !== selectedChallenge.questions[currentQuestion].correctAnswer && (
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
                            selectedAnswer === selectedChallenge.questions[currentQuestion].correctAnswer
                              ? 'bg-green-500/10 border-green-500 text-green-300'
                              : 'bg-red-500/10 border-red-500 text-red-300'
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              {selectedAnswer === selectedChallenge.questions[currentQuestion].correctAnswer ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <XCircle className="w-5 h-5" />
                              )}
                              <span className="font-semibold">
                                {selectedAnswer === selectedChallenge.questions[currentQuestion].correctAnswer ? 'Correct!' : 'Incorrect'}
                              </span>
                            </div>
                            {selectedAnswer !== selectedChallenge.questions[currentQuestion].correctAnswer && (
                              <div>
                                <div className="text-sm text-slate-400 mb-1">Correct answer:</div>
                                <code className="text-sm bg-slate-900/50 p-2 rounded font-mono">
                                  {selectedChallenge.questions[currentQuestion].correctAnswer}
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
                        onClick={submitAnswer}
                        disabled={!selectedAnswer}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Answer
                      </motion.button>
                    </div>
                  )}

                  {/* Completion Message */}
                  {showResult && currentQuestion === selectedChallenge.questions.length - 1 && (
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
                          onClick={() => setSelectedChallenge(null)}
                          className="px-6 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
                        >
                          Close
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startChallenge(selectedChallenge)}
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
        )}
      </AnimatePresence>
    </div>
  )
}