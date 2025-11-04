// Community data types and sample data
export interface CommunityAuthor {
  name: string
  avatar: string
  role: string
  reputation: number
}

export interface CommunityDiscussion {
  id: number
  author: CommunityAuthor
  title: string
  content: string
  category: string
  tags: string[]
  likes: number
  comments: number
  views: number
  timestamp: string
  isPinned: boolean
  hasAcceptedAnswer: boolean
}

export interface CommunityMember {
  id: number
  name: string
  avatar: string
  role: string
  company: string
  location: string
  bio: string
  reputation: number
  posts: number
  answers: number
  followers: number
  following: number
  badges: string[]
  skills: string[]
  joinDate: string
  social?: {
    github?: string
    twitter?: string
    linkedin?: string
  }
}

export interface CommunityEvent {
  id: number
  title: string
  description: string
  type: string
  date: string
  time: string
  duration: string
  host: string
  attendees: number
  maxAttendees: number
  isOnline: boolean
  location?: string
  tags: string[]
  gradient: string
}

export type CommunityTab = 'discussions' | 'members' | 'events'

export const COMMUNITY_FILTERS = [
  "All",
  "Performance",
  "Security",
  "Architecture",
  "DevOps",
  "Database Comparison"
] as const

export const COMMUNITY_STATS = [
  {
    label: "Active Members",
    value: "12,500+",
    iconName: "Users",
    color: "from-purple-500 to-pink-500"
  },
  {
    label: "Discussions",
    value: "8,234",
    iconName: "MessageSquare",
    color: "from-cyan-500 to-blue-500"
  },
  {
    label: "Questions Answered",
    value: "15,678",
    iconName: "Award",
    color: "from-green-500 to-emerald-500"
  },
  {
    label: "Total Reputation",
    value: "2.5M",
    iconName: "Star",
    color: "from-yellow-500 to-orange-500"
  }
] as const

export const SAMPLE_DISCUSSIONS: CommunityDiscussion[] = [
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

export const SAMPLE_MEMBERS: CommunityMember[] = [
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

export const SAMPLE_EVENTS: CommunityEvent[] = [
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