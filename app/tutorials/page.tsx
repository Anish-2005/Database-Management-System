"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
  Bookmark,
  Heart,
  Settings,
  TrendingUp,
  Award,
  CheckSquare,
  User,
  Copy,
  Check,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"
import HeaderSection from "../../components/tutorials/HeaderSection"
import SearchFiltersSection from "../../components/tutorials/SearchFiltersSection"
import AdvancedFiltersSection from "../../components/tutorials/AdvancedFiltersSection"
import TutorialsGridSection from "../../components/tutorials/TutorialsGridSection"
import LearningPathSection from "../../components/tutorials/LearningPathSection"
import LearningAnalyticsSection from "../../components/tutorials/LearningAnalyticsSection"
import TutorialDetailModal from "../../components/tutorials/TutorialDetailModal"
import SettingsModal from "../../components/tutorials/SettingsModal"

// Tutorials Container Component - Manages all state and logic
function TutorialsContainer() {
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
  const [showSettings, setShowSettings] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Advanced filter states
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [durationFilter, setDurationFilter] = useState<string>('all') // 'all', 'short', 'medium', 'long'
  const [ratingFilter, setRatingFilter] = useState<number>(0) // minimum rating
  const [instructorFilter, setInstructorFilter] = useState<string>('')
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchDebounce, setSearchDebounce] = useState('')

  // User interaction states
  const [bookmarkedTutorials, setBookmarkedTutorials] = useState<Set<number>>(new Set())
  const [favoriteTutorials, setFavoriteTutorials] = useState<Set<number>>(new Set())
  const [tutorialProgress, setTutorialProgress] = useState<Record<number, number>>({})
  const [userPreferences, setUserPreferences] = useState({
    showCompleted: true,
    difficultyFilter: null as string | null,
    sortBy: 'default' as 'default' | 'rating' | 'duration' | 'difficulty',
    theme: 'dark' as 'dark' | 'light',
    notifications: true
  })

  // Settings modal states
  const [settings, setSettings] = useState({
    theme: 'dark' as 'light' | 'dark' | 'system',
    notifications: true,
    autoSave: true,
    showCompleted: true,
    difficultyFilter: [] as string[],
    categoryFilter: [] as string[],
    sortBy: 'newest',
    itemsPerPage: 12
  })
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Load user data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('tutorial-bookmarks')
    const savedFavorites = localStorage.getItem('tutorial-favorites')
    const savedProgress = localStorage.getItem('tutorial-progress')
    const savedPreferences = localStorage.getItem('user-preferences')
    const savedSettings = localStorage.getItem('tutorial-settings')

    if (savedBookmarks) {
      setBookmarkedTutorials(new Set(JSON.parse(savedBookmarks)))
    }
    if (savedFavorites) {
      setFavoriteTutorials(new Set(JSON.parse(savedFavorites)))
    }
    if (savedProgress) {
      setTutorialProgress(JSON.parse(savedProgress))
    }
    if (savedPreferences) {
      setUserPreferences({ ...userPreferences, ...JSON.parse(savedPreferences) })
    }
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) })
    }
  }, [])

  // Save user data to localStorage
  useEffect(() => {
    localStorage.setItem('tutorial-bookmarks', JSON.stringify([...bookmarkedTutorials]))
  }, [bookmarkedTutorials])

  useEffect(() => {
    localStorage.setItem('tutorial-favorites', JSON.stringify([...favoriteTutorials]))
  }, [favoriteTutorials])

  useEffect(() => {
    localStorage.setItem('tutorial-progress', JSON.stringify(tutorialProgress))
  }, [tutorialProgress])

  useEffect(() => {
    localStorage.setItem('user-preferences', JSON.stringify(userPreferences))
  }, [userPreferences])

  useEffect(() => {
    localStorage.setItem('tutorial-settings', JSON.stringify(settings))
  }, [settings])

  // User interaction functions
  const toggleBookmark = (tutorialId: number) => {
    setBookmarkedTutorials(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(tutorialId)) {
        newBookmarks.delete(tutorialId)
      } else {
        newBookmarks.add(tutorialId)
      }
      return newBookmarks
    })
  }

  const toggleFavorite = (tutorialId: number) => {
    setFavoriteTutorials(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(tutorialId)) {
        newFavorites.delete(tutorialId)
      } else {
        newFavorites.add(tutorialId)
      }
      return newFavorites
    })
  }

  const updateProgress = (tutorialId: number, progress: number) => {
    setTutorialProgress(prev => ({
      ...prev,
      [tutorialId]: Math.max(0, Math.min(100, progress))
    }))
  }

  const markCompleted = (tutorialId: number) => {
    updateProgress(tutorialId, 100)
  }

  const resetProgress = (tutorialId: number) => {
    updateProgress(tutorialId, 0)
  }

  // Copy code to clipboard
  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCodeId(codeId)
      setTimeout(() => setCopiedCodeId(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Quiz functions
  const handleQuizAnswer = (questionId: number, answerIndex: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const submitQuiz = (tutorialId: number) => {
    setQuizSubmitted(prev => ({
      ...prev,
      [tutorialId]: true
    }))
  }

  const calculateQuizScore = (tutorial: any) => {
    if (!tutorial.quizData) return 0
    let correct = 0
    tutorial.quizData.forEach((question: any) => {
      if (quizAnswers[question.id] === question.correctAnswer.toString()) {
        correct++
      }
    })
    return Math.round((correct / tutorial.quizData.length) * 100)
  }

  const resetQuiz = (tutorialId: number) => {
    setQuizAnswers({})
    setQuizSubmitted(prev => ({
      ...prev,
      [tutorialId]: false
    }))
  }

  // Settings functions
  const resetSettings = () => {
    setSettings({
      theme: 'dark',
      notifications: true,
      autoSave: true,
      showCompleted: true,
      difficultyFilter: [],
      categoryFilter: [],
      sortBy: 'newest',
      itemsPerPage: 12
    })
  }

  const saveSettings = () => {
    // Apply settings to user preferences
    setUserPreferences(prev => ({
      ...prev,
      showCompleted: settings.showCompleted,
      theme: settings.theme === 'system' ? 'dark' : settings.theme,
      notifications: settings.notifications
    }))
  }

  const resetAllProgress = () => {
    setBookmarkedTutorials(new Set())
    setFavoriteTutorials(new Set())
    setTutorialProgress({})
    localStorage.removeItem('tutorial-bookmarks')
    localStorage.removeItem('tutorial-favorites')
    localStorage.removeItem('tutorial-progress')
  }

  // Debounced search
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setSearchDebounce(searchQuery)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Tutorial data
  const tutorials = [
    {
      id: 1,
      title: "Introduction to Relational Databases",
      description: "Master the fundamentals of relational database design, understand data modeling concepts, and learn basic SQL operations that form the foundation of database management.",
      category: "Fundamentals",
      difficulty: "Beginner",
      duration: "45 min",
      completed: false,
      rating: 4.8,
      students: 1250,
      instructor: "Dr. Sarah Chen",
      instructorAvatar: "SC",
      icon: Database,
      gradient: "from-blue-500 to-cyan-500",
      topics: ["Tables", "Primary Keys", "Relationships", "Basic SQL", "Data Types", "Constraints"],
      prerequisites: ["Basic computer literacy"],
      learningObjectives: [
        "Understand relational database concepts",
        "Create and manage database tables",
        "Write basic SQL queries (SELECT, INSERT, UPDATE, DELETE)",
        "Design simple database schemas"
      ],
      codeExamples: [
        {
          title: "Creating a Users Table",
          code: `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
        }
      ],
      quizQuestions: 5,
      handsOnExercises: 3,
      quizData: [
        {
          id: 1,
          question: "What is the purpose of a PRIMARY KEY constraint?",
          options: [
            "To ensure data is sorted alphabetically",
            "To uniquely identify each record in a table",
            "To automatically generate sequential numbers",
            "To allow duplicate values in a column"
          ],
          correctAnswer: 1,
          explanation: "A PRIMARY KEY constraint uniquely identifies each record in a table and ensures that no duplicate or null values exist in the key column(s)."
        },
        {
          id: 2,
          question: "Which SQL statement is used to create a new table?",
          options: [
            "INSERT INTO",
            "UPDATE table_name",
            "CREATE TABLE",
            "SELECT * FROM"
          ],
          correctAnswer: 2,
          explanation: "The CREATE TABLE statement is used to create a new table in a database."
        },
        {
          id: 3,
          question: "What does AUTO_INCREMENT do in MySQL?",
          options: [
            "Automatically sorts table data",
            "Generates unique sequential numbers",
            "Creates automatic backups",
            "Validates email addresses"
          ],
          correctAnswer: 1,
          explanation: "AUTO_INCREMENT automatically generates a unique sequential number when a new record is inserted into a table."
        },
        {
          id: 4,
          question: "What is the purpose of the UNIQUE constraint?",
          options: [
            "Allows only one NULL value",
            "Prevents duplicate values in a column",
            "Speeds up queries automatically",
            "Converts data types automatically"
          ],
          correctAnswer: 1,
          explanation: "The UNIQUE constraint ensures that all values in a column are different and prevents duplicate entries."
        },
        {
          id: 5,
          question: "What data type would you use to store email addresses?",
          options: [
            "INT",
            "VARCHAR(100)",
            "DATE",
            "BOOLEAN"
          ],
          correctAnswer: 1,
          explanation: "VARCHAR(100) is appropriate for email addresses as it can store variable-length strings up to 100 characters."
        }
      ]
    },
    {
      id: 2,
      title: "Advanced SQL Queries & Optimization",
      description: "Dive deep into complex SQL queries, master JOIN operations, subqueries, window functions, and learn query optimization techniques for maximum performance.",
      category: "SQL",
      difficulty: "Intermediate",
      duration: "90 min",
      completed: true,
      rating: 4.9,
      students: 890,
      instructor: "Prof. Michael Rodriguez",
      instructorAvatar: "MR",
      icon: Code,
      gradient: "from-purple-500 to-pink-500",
      topics: ["JOINs", "Subqueries", "Window Functions", "CTEs", "Query Optimization", "Indexes"],
      prerequisites: ["Basic SQL knowledge", "Understanding of database design"],
      learningObjectives: [
        "Master complex JOIN operations (INNER, LEFT, RIGHT, FULL)",
        "Write efficient subqueries and CTEs",
        "Use window functions for advanced analytics",
        "Optimize query performance with proper indexing",
        "Analyze query execution plans"
      ],
      codeExamples: [
        {
          title: "Complex JOIN with Analytics",
          code: `SELECT
  u.username,
  COUNT(o.id) as total_orders,
  SUM(o.total_amount) as total_spent,
  AVG(o.total_amount) as avg_order_value,
  ROW_NUMBER() OVER (ORDER BY SUM(o.total_amount) DESC) as rank
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2024-01-01'
GROUP BY u.id, u.username
ORDER BY total_spent DESC;`
        }
      ],
      quizQuestions: 8,
      handsOnExercises: 5
    },
    {
      id: 3,
      title: "Database Normalization & Design",
      description: "Learn the art of database design through normalization principles. Understand how to eliminate data redundancy and maintain data integrity across complex schemas.",
      category: "Design",
      difficulty: "Intermediate",
      duration: "60 min",
      completed: false,
      rating: 4.7,
      students: 675,
      instructor: "Dr. Emily Watson",
      instructorAvatar: "EW",
      icon: Layers,
      gradient: "from-green-500 to-emerald-500",
      topics: ["1NF", "2NF", "3NF", "BCNF", "Denormalization", "ER Diagrams", "Functional Dependencies"],
      prerequisites: ["Basic database concepts", "Understanding of relationships"],
      learningObjectives: [
        "Apply normalization forms (1NF through BCNF)",
        "Identify and resolve data anomalies",
        "Design efficient database schemas",
        "Create Entity-Relationship diagrams",
        "Understand when to denormalize for performance"
      ],
      codeExamples: [
        {
          title: "Normalized Table Structure",
          code: `-- Before Normalization (1NF violation)
CREATE TABLE orders (
  order_id INT,
  customer_name VARCHAR(100),
  customer_address VARCHAR(200),
  product_names VARCHAR(500), -- Multiple values in one field
  quantities VARCHAR(100)    -- Multiple values in one field
);

-- After Normalization (3NF)
CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(200)
);

CREATE TABLE products (
  product_id INT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2)
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);`
        }
      ],
      quizQuestions: 6,
      handsOnExercises: 4
    },
    {
      id: 4,
      title: "Database Performance & Optimization",
      description: "Master the techniques of database performance tuning, indexing strategies, query optimization, and monitoring tools to achieve lightning-fast database operations.",
      category: "Performance",
      difficulty: "Advanced",
      duration: "120 min",
      completed: false,
      rating: 4.9,
      students: 543,
      instructor: "Alex Thompson",
      instructorAvatar: "AT",
      icon: Zap,
      gradient: "from-orange-500 to-red-500",
      topics: ["Indexing Strategies", "Query Plans", "EXPLAIN Analysis", "Performance Monitoring", "Caching", "Partitioning"],
      prerequisites: ["Intermediate SQL knowledge", "Database design experience"],
      learningObjectives: [
        "Design optimal indexing strategies",
        "Analyze and optimize query execution plans",
        "Implement effective caching mechanisms",
        "Monitor database performance metrics",
        "Apply partitioning and sharding techniques",
        "Troubleshoot performance bottlenecks"
      ],
      codeExamples: [
        {
          title: "Index Optimization Strategy",
          code: `-- Analyze slow query
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE customer_id = 12345
  AND order_date BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY total_amount DESC;

-- Create composite index for better performance
CREATE INDEX idx_orders_customer_date_amount
ON orders (customer_id, order_date, total_amount DESC);

-- Analyze index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE tablename = 'orders';`
        }
      ],
      quizQuestions: 10,
      handsOnExercises: 6
    },
    {
      id: 5,
      title: "Database Security & Best Practices",
      description: "Learn comprehensive database security principles, implement access controls, protect against SQL injection, and follow industry security standards.",
      category: "Security",
      difficulty: "Intermediate",
      duration: "75 min",
      completed: false,
      rating: 4.6,
      students: 432,
      instructor: "Lisa Park",
      instructorAvatar: "LP",
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      topics: ["Authentication", "Authorization", "Encryption", "SQL Injection Prevention", "Access Controls", "Audit Logging"],
      prerequisites: ["Basic database knowledge", "Understanding of SQL"],
      learningObjectives: [
        "Implement secure authentication mechanisms",
        "Configure role-based access controls",
        "Prevent SQL injection attacks",
        "Apply encryption for data at rest and in transit",
        "Set up comprehensive audit logging",
        "Follow security best practices and compliance standards"
      ],
      codeExamples: [
        {
          title: "Secure User Authentication",
          code: `-- Create roles with minimal privileges
CREATE ROLE app_user LOGIN PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE ecommerce TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;

-- Grant specific table permissions
GRANT SELECT, INSERT ON TABLE users TO app_user;
GRANT SELECT ON TABLE products TO app_user;

-- Use parameterized queries to prevent SQL injection
-- Instead of: SELECT * FROM users WHERE username = '$username'
PREPARE user_query (text) AS
SELECT * FROM users WHERE username = $1;
EXECUTE user_query ('john_doe');

-- Encrypt sensitive data
CREATE EXTENSION IF NOT EXISTS pgcrypto;

UPDATE users
SET encrypted_ssn = pgp_sym_encrypt(ssn, 'encryption_key')
WHERE ssn IS NOT NULL;`
        }
      ],
      quizQuestions: 7,
      handsOnExercises: 4
    },
    {
      id: 6,
      title: "Data Warehousing & Analytics",
      description: "Explore the world of data warehousing, ETL processes, dimensional modeling, and business intelligence to transform raw data into actionable insights.",
      category: "Analytics",
      difficulty: "Advanced",
      duration: "105 min",
      completed: false,
      rating: 4.8,
      students: 321,
      instructor: "Dr. James Wilson",
      instructorAvatar: "JW",
      icon: BarChart3,
      gradient: "from-cyan-500 to-blue-500",
      topics: ["ETL Processes", "Star Schema", "OLAP", "Data Marts", "Dimensional Modeling", "Business Intelligence"],
      prerequisites: ["Intermediate SQL", "Basic analytics concepts"],
      learningObjectives: [
        "Design star and snowflake schemas",
        "Implement ETL pipelines",
        "Create OLAP cubes for multidimensional analysis",
        "Build data marts for specific business needs",
        "Apply dimensional modeling techniques",
        "Generate business intelligence reports"
      ],
      codeExamples: [
        {
          title: "Star Schema Design",
          code: `-- Fact Table: Sales Facts
CREATE TABLE fact_sales (
  sales_key SERIAL PRIMARY KEY,
  date_key INTEGER REFERENCES dim_date(date_key),
  customer_key INTEGER REFERENCES dim_customer(customer_key),
  product_key INTEGER REFERENCES dim_product(product_key),
  store_key INTEGER REFERENCES dim_store(store_key),
  sales_amount DECIMAL(10,2),
  quantity_sold INTEGER,
  discount_amount DECIMAL(10,2)
);

-- Dimension Table: Customer
CREATE TABLE dim_customer (
  customer_key SERIAL PRIMARY KEY,
  customer_id INTEGER,
  customer_name VARCHAR(100),
  email VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50),
  country VARCHAR(50),
  customer_segment VARCHAR(20)
);

-- Sample OLAP Query
SELECT
  dd.year,
  dd.quarter,
  dc.customer_segment,
  dp.product_category,
  SUM(fs.sales_amount) as total_sales,
  AVG(fs.sales_amount) as avg_sale_amount,
  COUNT(DISTINCT fs.customer_key) as unique_customers
FROM fact_sales fs
JOIN dim_date dd ON fs.date_key = dd.date_key
JOIN dim_customer dc ON fs.customer_key = dc.customer_key
JOIN dim_product dp ON fs.product_key = dp.product_key
WHERE dd.year = 2024
GROUP BY dd.year, dd.quarter, dc.customer_segment, dp.product_category
ORDER BY dd.quarter, total_sales DESC;`
        }
      ],
      quizQuestions: 9,
      handsOnExercises: 5
    },
    {
      id: 7,
      title: "NoSQL Databases with MongoDB",
      description: "Discover the power of NoSQL databases. Learn MongoDB document model, aggregation pipelines, and when to choose NoSQL over traditional RDBMS.",
      category: "NoSQL",
      difficulty: "Intermediate",
      duration: "80 min",
      completed: false,
      rating: 4.7,
      students: 678,
      instructor: "Carlos Mendoza",
      instructorAvatar: "CM",
      icon: Database,
      gradient: "from-green-500 to-teal-500",
      topics: ["Document Model", "MongoDB Operations", "Aggregation Pipeline", "Indexing", "Replication", "Sharding"],
      prerequisites: ["Basic programming knowledge", "Understanding of JSON"],
      learningObjectives: [
        "Understand document-based data modeling",
        "Perform CRUD operations in MongoDB",
        "Build complex aggregation pipelines",
        "Design optimal indexing strategies",
        "Configure replication and sharding",
        "Choose between SQL and NoSQL databases"
      ],
      codeExamples: [
        {
          title: "MongoDB Aggregation Pipeline",
          code: `// Complex aggregation with multiple stages
db.orders.aggregate([
  // Stage 1: Filter orders from 2024
  {
    $match: {
      orderDate: {
        $gte: new Date("2024-01-01"),
        $lt: new Date("2025-01-01")
      }
    }
  },

  // Stage 2: Join with customers collection
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },

  // Stage 3: Unwind customer array
  {
    $unwind: "$customer"
  },

  // Stage 4: Group by customer and month
  {
    $group: {
      _id: {
        customerId: "$customerId",
        year: { $year: "$orderDate" },
        month: { $month: "$orderDate" }
      },
      customerName: { $first: "$customer.name" },
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: "$totalAmount" },
      avgOrderValue: { $avg: "$totalAmount" }
    }
  },

  // Stage 5: Sort by total amount
  {
    $sort: { totalAmount: -1 }
  }
])`
        }
      ],
      quizQuestions: 7,
      handsOnExercises: 4
    },
    {
      id: 8,
      title: "Database Administration & DevOps",
      description: "Learn essential database administration skills, backup strategies, monitoring, automation, and DevOps practices for database management.",
      category: "DevOps",
      difficulty: "Advanced",
      duration: "95 min",
      completed: false,
      rating: 4.8,
      students: 445,
      instructor: "Rachel Kim",
      instructorAvatar: "RK",
      icon: Shield,
      gradient: "from-indigo-500 to-purple-500",
      topics: ["Backup & Recovery", "Monitoring", "Automation", "Migration", "High Availability", "Disaster Recovery"],
      prerequisites: ["Intermediate database knowledge", "Basic Linux/Unix commands"],
      learningObjectives: [
        "Implement comprehensive backup strategies",
        "Set up monitoring and alerting systems",
        "Automate database maintenance tasks",
        "Perform database migrations safely",
        "Configure high availability solutions",
        "Develop disaster recovery plans"
      ],
      codeExamples: [
        {
          title: "Automated Backup Script",
          code: `#!/bin/bash
# Automated PostgreSQL backup script

BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="ecommerce"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform backup with compression
pg_dump -h localhost -U backup_user -d $DB_NAME \\
  --format=custom \\
  --compress=9 \\
  --file=$BACKUP_DIR/\\\${DB_NAME}_$DATE.backup

# Verify backup integrity
if pg_restore --list $BACKUP_DIR/\\\${DB_NAME}_$DATE.backup > /dev/null; then
  echo "Backup successful: \\\${DB_NAME}_$DATE.backup"

  # Clean up old backups
  find $BACKUP_DIR -name "\\\${DB_NAME}_*.backup" -mtime +$RETENTION_DAYS -delete

  # Send notification
  curl -X POST -H 'Content-type: application/json' \\
    --data '{"text":"Database backup completed successfully"}' \\
    $SLACK_WEBHOOK_URL
else
  echo "Backup failed!"
  exit 1
fi`
        }
      ],
      quizQuestions: 8,
      handsOnExercises: 5
    },
    {
      id: 9,
      title: "Machine Learning with Databases",
      description: "Integrate machine learning capabilities with databases. Learn about ML-enhanced queries, predictive analytics, and AI-powered database features.",
      category: "AI/ML",
      difficulty: "Advanced",
      duration: "110 min",
      completed: false,
      rating: 4.9,
      students: 298,
      instructor: "Dr. Amanda Foster",
      instructorAvatar: "AF",
      icon: Sparkles,
      gradient: "from-pink-500 to-rose-500",
      topics: ["ML-Enhanced Queries", "Predictive Analytics", "Natural Language Processing", "Recommendation Systems", "Anomaly Detection"],
      prerequisites: ["Advanced SQL", "Basic machine learning concepts", "Python programming"],
      learningObjectives: [
        "Implement ML functions in SQL queries",
        "Build predictive models using database data",
        "Create recommendation systems",
        "Apply natural language processing to queries",
        "Detect anomalies and patterns automatically"
      ],
      codeExamples: [
        {
          title: "Predictive Analytics with SQL",
          code: `-- Customer churn prediction using ML functions
WITH customer_features AS (
  SELECT
    customer_id,
    -- Recency: days since last order
    DATEDIFF(CURVE, MAX(order_date), CURRENT_DATE) as recency,

    -- Frequency: total orders in last 12 months
    COUNT(CASE WHEN order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
                THEN 1 END) as frequency_12m,

    -- Monetary: total spent in last 12 months
    SUM(CASE WHEN order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
             THEN total_amount END) as monetary_12m,

    -- Average order value
    AVG(total_amount) as avg_order_value,

    -- Customer lifetime
    DATEDIFF(MONTH, first_order_date, CURRENT_DATE) as customer_lifetime_months

  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY customer_id
)

-- Apply ML prediction model
SELECT
  customer_id,
  recency,
  frequency_12m,
  monetary_12m,
  -- Use ML_PREDICT function for churn probability
  ML_PREDICT('churn_model', ARRAY[recency, frequency_12m, monetary_12m,
                                   avg_order_value, customer_lifetime_months])
    AS churn_probability,

  -- Categorize risk level
  CASE
    WHEN ML_PREDICT('churn_model', ARRAY[recency, frequency_12m, monetary_12m,
                                         avg_order_value, customer_lifetime_months]) > 0.8
    THEN 'High Risk'
    WHEN ML_PREDICT('churn_model', ARRAY[recency, frequency_12m, monetary_12m,
                                         avg_order_value, customer_lifetime_months]) > 0.5
    THEN 'Medium Risk'
    ELSE 'Low Risk'
  END as risk_level

FROM customer_features
ORDER BY churn_probability DESC;`
        }
      ],
      quizQuestions: 9,
      handsOnExercises: 6
    }
  ]

  const categories = ["All", "Fundamentals", "SQL", "Design", "Performance", "Security", "Analytics", "NoSQL", "DevOps", "AI/ML"]

  // Filtered tutorials with debounced search
  const filteredTutorials = tutorials
    .filter(tutorial => {
      const matchesCategory = activeCategory === null || activeCategory === "All" || tutorial.category === activeCategory
      const matchesSearch = searchDebounce === "" ||
        tutorial.title.toLowerCase().includes(searchDebounce.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchDebounce.toLowerCase()) ||
        tutorial.topics.some(topic => topic.toLowerCase().includes(searchDebounce.toLowerCase())) ||
        tutorial.instructor.toLowerCase().includes(searchDebounce.toLowerCase())
      const matchesDifficulty = !difficultyFilter || tutorial.difficulty === difficultyFilter
      const matchesCompleted = userPreferences.showCompleted || !tutorial.completed

      // Duration filter
      const durationMinutes = parseInt(tutorial.duration.split(' ')[0])
      const matchesDuration = durationFilter === 'all' ||
        (durationFilter === 'short' && durationMinutes <= 60) ||
        (durationFilter === 'medium' && durationMinutes > 60 && durationMinutes <= 120) ||
        (durationFilter === 'long' && durationMinutes > 120)

      // Rating filter
      const matchesRating = tutorial.rating >= ratingFilter

      // Instructor filter
      const matchesInstructor = instructorFilter === '' ||
        tutorial.instructor.toLowerCase().includes(instructorFilter.toLowerCase())

      return matchesCategory && matchesSearch && matchesDifficulty && matchesCompleted &&
             matchesDuration && matchesRating && matchesInstructor
    })
    .sort((a, b) => {
      switch (userPreferences.sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'duration':
          const durationA = parseInt(a.duration.split(' ')[0])
          const durationB = parseInt(b.duration.split(' ')[0])
          return durationA - durationB
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        default:
          return 0
      }
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
    <>
      {/* Header Section */}
      <HeaderSection />

      {/* Search and Filters Section */}
      <SearchFiltersSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        setShowSettings={setShowSettings}
      />

      {/* Advanced Filters Section */}
      <AdvancedFiltersSection
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        instructorFilter={instructorFilter}
        setInstructorFilter={setInstructorFilter}
      />

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

      {/* Tutorials Grid Section */}
      <TutorialsGridSection
        isLoading={isLoading}
        filteredTutorials={filteredTutorials}
        bookmarkedTutorials={bookmarkedTutorials}
        favoriteTutorials={favoriteTutorials}
        tutorialProgress={tutorialProgress}
        toggleBookmark={toggleBookmark}
        toggleFavorite={toggleFavorite}
        setSelectedTutorial={setSelectedTutorial}
        getDifficultyColor={getDifficultyColor}
      />

      {/* Learning Path Section */}
      <LearningPathSection />

      {/* Learning Analytics Section */}
      <LearningAnalyticsSection
        tutorialProgress={tutorialProgress}
        tutorials={tutorials}
      />

      {/* Tutorial Detail Modal */}
      <TutorialDetailModal
        selectedTutorial={selectedTutorial}
        setSelectedTutorial={setSelectedTutorial}
        getDifficultyColor={getDifficultyColor}
        copiedCodeId={copiedCodeId}
        copyToClipboard={copyToClipboard}
        showQuiz={showQuiz}
        setShowQuiz={setShowQuiz}
        quizAnswers={quizAnswers}
        handleQuizAnswer={handleQuizAnswer}
        quizSubmitted={quizSubmitted}
        submitQuiz={submitQuiz}
        calculateQuizScore={calculateQuizScore}
        resetQuiz={resetQuiz}
      />

      {/* Settings Modal */}
      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        settings={settings}
        setSettings={setSettings}
        resetSettings={resetSettings}
        saveSettings={saveSettings}
        resetProgress={resetAllProgress}
        showResetConfirm={showResetConfirm}
        setShowResetConfirm={setShowResetConfirm}
      />
    </>
  )
}

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
          <TutorialsContainer />
        </div>
      </div>
    </div>
  )
}
