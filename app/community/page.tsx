"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  Sparkles,
  Clock,
  ArrowUpRight,
  ThumbsUp,
  MessageCircle,
  Eye,
  Award,
  Star,
  Filter,
  Search,
  Plus,
  Bookmark,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  User,
  Calendar,
  Tag,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Building,
  GraduationCap
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

export default function CommunityPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeTab, setActiveTab] = useState<'discussions' | 'members' | 'events'>('discussions')
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showNewPost, setShowNewPost] = useState(false)

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

  // Community discussions data
  const discussions = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        role: "Database Architect",
        reputation: 2500
      },
      title: "Best Practices for Database Indexing in Large-Scale Applications",
      content: "I've been working on optimizing queries for a system with 50M+ records. Here are some strategies I've found effective...",
      category: "Performance",
      tags: ["Indexing", "Optimization", "MySQL"],
      likes: 145,
      comments: 32,
      views: 2340,
      timestamp: "2 hours ago",
      isPinned: true,
      hasAcceptedAnswer: true
    },
    {
      id: 2,
      author: {
        name: "Michael Rodriguez",
        avatar: "MR",
        role: "Data Engineer",
        reputation: 1850
      },
      title: "PostgreSQL vs MySQL: Performance Comparison for E-commerce",
      content: "I recently conducted a comprehensive benchmark comparing PostgreSQL 15 and MySQL 8.0 for e-commerce workloads...",
      category: "Database Comparison",
      tags: ["PostgreSQL", "MySQL", "Benchmarking"],
      likes: 98,
      comments: 45,
      views: 1890,
      timestamp: "5 hours ago",
      isPinned: false,
      hasAcceptedAnswer: true
    },
    {
      id: 3,
      author: {
        name: "Emily Watson",
        avatar: "EW",
        role: "Senior DBA",
        reputation: 3200
      },
      title: "Implementing Multi-tenant Database Architecture with Row-Level Security",
      content: "Looking for advice on implementing a robust multi-tenant system. What are the trade-offs between shared vs separate schemas?",
      category: "Architecture",
      tags: ["Multi-tenancy", "Security", "PostgreSQL"],
      likes: 76,
      comments: 28,
      views: 1250,
      timestamp: "1 day ago",
      isPinned: false,
      hasAcceptedAnswer: false
    },
    {
      id: 4,
      author: {
        name: "Alex Thompson",
        avatar: "AT",
        role: "Full Stack Developer",
        reputation: 1420
      },
      title: "Database Migration Strategies: Zero-Downtime Deployments",
      content: "Share your experiences with database migrations in production. How do you ensure zero downtime?",
      category: "DevOps",
      tags: ["Migration", "DevOps", "CI/CD"],
      likes: 54,
      comments: 19,
      views: 980,
      timestamp: "2 days ago",
      isPinned: false,
      hasAcceptedAnswer: false
    },
    {
      id: 5,
      author: {
        name: "Lisa Park",
        avatar: "LP",
        role: "Security Expert",
        reputation: 2100
      },
      title: "Preventing SQL Injection: Modern Approaches and Tools",
      content: "A comprehensive guide to securing your database applications against SQL injection attacks...",
      category: "Security",
      tags: ["Security", "SQL Injection", "Best Practices"],
      likes: 112,
      comments: 23,
      views: 1670,
      timestamp: "3 days ago",
      isPinned: true,
      hasAcceptedAnswer: true
    }
  ]

  // Community members data
  const members = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      avatar: "SC",
      role: "Database Architect",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      bio: "15+ years building scalable database systems. Passionate about performance optimization and mentoring.",
      reputation: 2500,
      posts: 156,
      answers: 342,
      followers: 890,
      following: 234,
      badges: ["Expert", "Mentor", "Top Contributor"],
      skills: ["PostgreSQL", "MongoDB", "Redis", "Performance Tuning"],
      joinDate: "Jan 2022",
      social: {
        github: "sarahchen",
        twitter: "@sarahchen_db",
        linkedin: "sarah-chen"
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "MR",
      role: "Data Engineer",
      company: "DataFlow Solutions",
      location: "New York, NY",
      bio: "Building data pipelines and analytics systems. Love working with distributed databases.",
      reputation: 1850,
      posts: 98,
      answers: 245,
      followers: 567,
      following: 189,
      badges: ["Contributor", "Helpful"],
      skills: ["Apache Kafka", "Spark", "Cassandra", "ETL"],
      joinDate: "Mar 2022"
    },
    {
      id: 3,
      name: "Emily Watson",
      avatar: "EW",
      role: "Senior DBA",
      company: "Enterprise Systems",
      location: "London, UK",
      bio: "Expert in database administration and high-availability systems. Oracle ACE.",
      reputation: 3200,
      posts: 203,
      answers: 478,
      followers: 1234,
      following: 321,
      badges: ["Expert", "Mentor", "Oracle ACE", "Top Contributor"],
      skills: ["Oracle", "PostgreSQL", "HA/DR", "Backup & Recovery"],
      joinDate: "Sep 2021"
    }
  ]

  // Community events data
  const events = [
    {
      id: 1,
      title: "Database Performance Workshop",
      description: "Join us for an intensive workshop on query optimization and indexing strategies",
      type: "Workshop",
      date: "Dec 15, 2024",
      time: "10:00 AM PST",
      duration: "3 hours",
      host: "Sarah Chen",
      attendees: 45,
      maxAttendees: 50,
      isOnline: true,
      tags: ["Performance", "Workshop"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "PostgreSQL 16 New Features Deep Dive",
      description: "Explore the latest features in PostgreSQL 16 with live demos and Q&A",
      type: "Webinar",
      date: "Dec 20, 2024",
      time: "2:00 PM EST",
      duration: "2 hours",
      host: "Michael Rodriguez",
      attendees: 120,
      maxAttendees: 200,
      isOnline: true,
      tags: ["PostgreSQL", "Webinar"],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      title: "Database Architecture Meetup",
      description: "In-person meetup to discuss modern database architecture patterns",
      type: "Meetup",
      date: "Jan 10, 2025",
      time: "6:00 PM PST",
      duration: "2 hours",
      host: "Emily Watson",
      attendees: 28,
      maxAttendees: 30,
      isOnline: false,
      location: "San Francisco, CA",
      tags: ["Architecture", "Networking"],
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  const filters = ["All", "Performance", "Security", "Architecture", "DevOps", "Database Comparison"]

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesFilter = !activeFilter || activeFilter === "All" || discussion.category === activeFilter
    const matchesSearch = !searchQuery ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Community"
        subtitle="Connect • Share • Learn"
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
              <Users className="w-4 h-4" />
              Global Database Community
            </motion.span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join the
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Connect with database professionals worldwide. Share knowledge, solve problems together,
              and stay updated with the latest in database technology.
            </p>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: "Active Members", value: "12,500+", icon: Users, color: "from-purple-500 to-pink-500" },
              { label: "Discussions", value: "8,234", icon: MessageSquare, color: "from-cyan-500 to-blue-500" },
              { label: "Questions Answered", value: "15,678", icon: Award, color: "from-green-500 to-emerald-500" },
              { label: "Total Reputation", value: "2.5M", icon: Star, color: "from-yellow-500 to-orange-500" }
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

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            {(['discussions', 'members', 'events'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Discussions Tab */}
          {activeTab === 'discussions' && (
            <div className="space-y-8">
              {/* Search and Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row gap-6 items-start lg:items-center p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
              >
                {/* Search */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      placeholder="Search discussions, topics, or users..."
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                      <Search className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap">
                  {filters.map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveFilter(filter === "All" ? null : filter)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        (activeFilter === filter || (filter === "All" && activeFilter === null))
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                          : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                      }`}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>

                {/* New Post Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNewPost(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white shadow-lg shadow-green-500/25 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </motion.button>
              </motion.div>

              {/* Discussions List */}
              <div className="space-y-4">
                {filteredDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer"
                    onClick={() => setSelectedPost(discussion)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Author Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0">
                        {discussion.author.avatar}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                                {discussion.title}
                              </h3>
                              {discussion.isPinned && (
                                <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
                                  Pinned
                                </span>
                              )}
                              {discussion.hasAcceptedAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              )}
                            </div>
                            <p className="text-slate-400 text-sm line-clamp-2 mb-3">{discussion.content}</p>
                            
                            {/* Author Info */}
                            <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                              <span className="text-slate-300">{discussion.author.name}</span>
                              <span>•</span>
                              <span>{discussion.author.role}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                {discussion.author.reputation}
                              </span>
                              <span>•</span>
                              <span>{discussion.timestamp}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2 flex-wrap mb-3">
                              <span className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                                {discussion.category}
                              </span>
                              {discussion.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.comments} comments</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all"
                >
                  {/* Member Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                      <p className="text-sm text-slate-400 mb-1">{member.role}</p>
                      <p className="text-xs text-slate-500">{member.company}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-400 mb-4 line-clamp-3">{member.bio}</p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-800/40 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{member.posts}</div>
                      <div className="text-xs text-slate-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{member.answers}</div>
                      <div className="text-xs text-slate-500">Answers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400">{member.reputation}</div>
                      <div className="text-xs text-slate-500">Rep</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {member.badges.map((badge) => (
                      <span key={badge} className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-sm"
                    >
                      Follow
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl border border-slate-700 text-slate-300"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all"
                >
                  {/* Event Header */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.gradient} flex items-center justify-center mb-4`}>
                    <Calendar className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <User className="w-4 h-4 text-green-400" />
                      <span>Hosted by {event.host}</span>
                    </div>
                    {!event.isOnline && (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin className="w-4 h-4 text-red-400" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Attendance */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      <span>{event.attendees} / {event.maxAttendees} attendees</span>
                      <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className={`bg-gradient-to-r ${event.gradient} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className={`px-2 py-1 bg-gradient-to-r ${event.gradient} bg-opacity-20 border border-purple-500/30 rounded-full text-xs text-white`}>
                      {event.type}
                    </span>
                    {event.isOnline && (
                      <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                        Online
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full px-4 py-2 bg-gradient-to-r ${event.gradient} rounded-xl text-white text-sm`}
                  >
                    Register Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// CheckCircle component
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
