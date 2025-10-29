"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Info,
  BookOpen,
  Target,
  BarChart3,
  Users,
  Award,
  Sparkles,
  Database,
  Code,
  Play,
  Pause,
  Menu,
  X,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Shield,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Crown,
  Trophy,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function AboutPage() {
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

  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  const features = [
    {
      id: "interactive-tutorials",
      title: "Interactive Tutorials",
      description: "Learn database concepts through hands-on, interactive tutorials with real-time feedback and progress tracking.",
      icon: BookOpen,
      gradient: "from-blue-500 to-cyan-500",
      details: [
        "Step-by-step guided learning",
        "Interactive code editors",
        "Real-time syntax validation",
        "Progress tracking and certificates",
        "Multiple difficulty levels"
      ]
    },
    {
      id: "practice-challenges",
      title: "Practice Challenges",
      description: "Test your skills with coding challenges, quizzes, and real-world database scenarios.",
      icon: Target,
      gradient: "from-purple-500 to-pink-500",
      details: [
        "SQL query challenges",
        "Database design problems",
        "Performance optimization tasks",
        "Timed coding assessments",
        "Instant feedback and hints"
      ]
    },
    {
      id: "progress-tracking",
      title: "Progress Analytics",
      description: "Comprehensive dashboard with detailed analytics, achievements, and personalized learning recommendations.",
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500",
      details: [
        "Detailed progress reports",
        "Skill assessment charts",
        "Achievement system",
        "Learning streak tracking",
        "Personalized recommendations"
      ]
    },
    {
      id: "resource-library",
      title: "Resource Library",
      description: "Extensive collection of documentation, tools, references, and external resources for database professionals.",
      icon: Database,
      gradient: "from-orange-500 to-red-500",
      details: [
        "Official documentation links",
        "Tool recommendations",
        "SQL reference guides",
        "Best practices articles",
        "Community resources"
      ]
    },
    {
      id: "ai-powered",
      title: "AI-Powered Learning",
      description: "Intelligent learning recommendations and adaptive difficulty based on your performance and learning style.",
      icon: Brain,
      gradient: "from-cyan-500 to-blue-500",
      details: [
        "Adaptive learning paths",
        "Personalized recommendations",
        "Smart difficulty adjustment",
        "Performance analysis",
        "Learning pattern recognition"
      ]
    },
    {
      id: "community-driven",
      title: "Community Driven",
      description: "Learn with a global community of database professionals, share knowledge, and collaborate on projects.",
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      details: [
        "Discussion forums",
        "Code sharing platform",
        "Mentorship programs",
        "Collaborative challenges",
        "Expert Q&A sessions"
      ]
    }
  ]

  const stats = [
    { label: "Active Learners", value: "50K+", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Tutorials Completed", value: "2.1M+", icon: BookOpen, color: "from-purple-500 to-pink-500" },
    { label: "Practice Challenges", value: "500+", icon: Target, color: "from-green-500 to-emerald-500" },
    { label: "Success Rate", value: "94%", icon: Trophy, color: "from-orange-500 to-red-500" },
    { label: "Countries Reached", value: "120+", icon: Globe, color: "from-cyan-500 to-blue-500" },
    { label: "Hours of Content", value: "200+", icon: Clock, color: "from-pink-500 to-rose-500" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Data Analyst",
      company: "TechCorp",
      content: "QuantumDB transformed my understanding of databases. The interactive tutorials made complex concepts easy to grasp.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Database Administrator",
      company: "DataFlow Inc",
      content: "The practice challenges are incredibly realistic. They prepared me perfectly for real-world database scenarios.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Software Engineer",
      company: "InnovateLabs",
      content: "The progress tracking and achievements keep me motivated. I've learned more in 3 months than I did in a year of self-study.",
      avatar: "EW",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="About"
        subtitle="About Platform"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div className="relative z-10 pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-sm font-medium text-cyan-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Info className="w-4 h-4" />
              About QuantumDB
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Database Learning
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              QuantumDB is an innovative, AI-powered learning platform designed to make database
              management accessible, engaging, and effective for everyone, from beginners to experts.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl mb-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10 text-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                To democratize database education by providing an immersive, interactive learning
                experience that combines cutting-edge technology with proven pedagogical methods.
                We believe that understanding databases shouldn't be a privilege reserved for
                computer science graduates—it should be accessible to anyone with curiosity and determination.
              </p>
            </div>
          </motion.div>

          {/* Platform Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Discover what makes QuantumDB the most comprehensive database learning platform available
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isExpanded = expandedFeature === feature.id

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                            <p className="text-sm text-slate-400">{feature.description}</p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
                          className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-slate-700 pt-4"
                          >
                            <ul className="space-y-2">
                              {feature.details.map((detail, detailIndex) => (
                                <motion.li
                                  key={detailIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: detailIndex * 0.1 }}
                                  className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span>{detail}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Learners Say</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Real feedback from real learners who have transformed their careers with QuantumDB
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision & Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision & Values</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The principles that guide everything we do at QuantumDB
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "We constantly push the boundaries of educational technology to create better learning experiences.",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Heart,
                  title: "Accessibility",
                  description: "Quality education should be available to everyone, regardless of background or location.",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: Shield,
                  title: "Quality",
                  description: "We maintain the highest standards in our content, ensuring accuracy and relevance.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Learning is better together. We foster a supportive community of learners and educators.",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10 text-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their understanding of databases.
                Start learning today and unlock your potential in database management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/tutorials"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                >
                  Start Learning Now
                </motion.a>
                <motion.a
                  href="/practice"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-700/50 transition-all"
                >
                  Try Practice Challenges
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}