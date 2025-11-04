// About page data types and sample data
export interface AboutFeature {
  id: string
  title: string
  description: string
  iconName: string
  gradient: string
  details: string[]
}

export interface AboutStat {
  label: string
  value: string
  iconName: string
  color: string
}

export interface AboutTestimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface AboutValue {
  iconName: string
  title: string
  description: string
  color: string
}

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    id: "interactive-tutorials",
    title: "Interactive Tutorials",
    description: "Learn database concepts through hands-on, interactive tutorials with real-time feedback and progress tracking.",
    iconName: "BookOpen",
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
    iconName: "Target",
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
    iconName: "BarChart3",
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
    iconName: "Database",
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
    iconName: "Brain",
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
    iconName: "Users",
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

export const ABOUT_STATS: AboutStat[] = [
  { label: "Active Learners", value: "50K+", iconName: "Users", color: "from-blue-500 to-cyan-500" },
  { label: "Tutorials Completed", value: "2.1M+", iconName: "BookOpen", color: "from-purple-500 to-pink-500" },
  { label: "Practice Challenges", value: "500+", iconName: "Target", color: "from-green-500 to-emerald-500" },
  { label: "Success Rate", value: "94%", iconName: "Trophy", color: "from-orange-500 to-red-500" },
  { label: "Countries Reached", value: "120+", iconName: "Globe", color: "from-cyan-500 to-blue-500" },
  { label: "Hours of Content", value: "200+", iconName: "Clock", color: "from-pink-500 to-rose-500" }
]

export const ABOUT_TESTIMONIALS: AboutTestimonial[] = [
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

export const ABOUT_VALUES: AboutValue[] = [
  {
    iconName: "Lightbulb",
    title: "Innovation",
    description: "We constantly push the boundaries of educational technology to create better learning experiences.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    iconName: "Heart",
    title: "Accessibility",
    description: "Quality education should be available to everyone, regardless of background or location.",
    color: "from-pink-500 to-rose-500"
  },
  {
    iconName: "Shield",
    title: "Quality",
    description: "We maintain the highest standards in our content, ensuring accuracy and relevance.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    iconName: "Users",
    title: "Community",
    description: "Learning is better together. We foster a supportive community of learners and educators.",
    color: "from-green-500 to-emerald-500"
  }
]