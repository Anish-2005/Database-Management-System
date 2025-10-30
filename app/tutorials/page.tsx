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
  Bookmark,
  Heart,
  Settings,
  TrendingUp,
  Award,
  CheckSquare,
  User,
  Copy,
  Check,} from "lucide-react"
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

  // Load user data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('tutorial-bookmarks')
    const savedFavorites = localStorage.getItem('tutorial-favorites')
    const savedProgress = localStorage.getItem('tutorial-progress')
    const savedPreferences = localStorage.getItem('user-preferences')

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

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

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
pg_dump -h localhost -U backup_user -d $DB_NAME \
  --format=custom \
  --compress=9 \
  --file=$BACKUP_DIR/\${DB_NAME}_$DATE.backup

# Verify backup integrity
if pg_restore --list $BACKUP_DIR/\${DB_NAME}_$DATE.backup > /dev/null; then
  echo "Backup successful: \${DB_NAME}_$DATE.backup"

  # Clean up old backups
  find $BACKUP_DIR -name "\${DB_NAME}_*.backup" -mtime +$RETENTION_DAYS -delete

  # Send notification
  curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Database backup completed successfully"}' \
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

  // Debounced search
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setSearchDebounce(searchQuery)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

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

            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 border border-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Advanced Filters */}
          <motion.div
            initial={false}
            animate={{ height: showAdvancedFilters ? 'auto' : 0, opacity: showAdvancedFilters ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setDifficultyFilter(null)
                    setDurationFilter('all')
                    setRatingFilter(0)
                    setInstructorFilter('')
                  }}
                  className="px-4 py-2 text-sm bg-slate-800/40 hover:bg-slate-700/40 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  Clear All
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Difficulty</label>
                  <div className="flex gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <motion.button
                        key={level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDifficultyFilter(difficultyFilter === level ? null : level)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          difficultyFilter === level
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Duration</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'short', label: '≤60min' },
                      { value: 'medium', label: '60-120min' },
                      { value: 'long', label: '>120min' }
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDurationFilter(option.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          durationFilter === option.value
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                            : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Min Rating</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/30 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-purple-500 [&::-moz-range-thumb]:to-pink-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-purple-500/30"
                    />
                    <span className="text-sm text-slate-300 min-w-[3rem]">{ratingFilter.toFixed(1)}★</span>
                  </div>
                </div>

                {/* Instructor Filter */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Instructor</label>
                  <input
                    value={instructorFilter}
                    onChange={(e) => setInstructorFilter(e.target.value)}
                    placeholder="Search instructor..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 placeholder:text-slate-500 text-slate-300 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>

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

          {/* Tutorials Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          >
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700"
                >
                  <div className="animate-pulse">
                    <div className="w-12 h-12 bg-slate-700 rounded-2xl mb-4"></div>
                    <div className="h-6 bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-slate-700 rounded-full w-16"></div>
                      <div className="h-6 bg-slate-700 rounded-full w-20"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <div className="h-4 bg-slate-700 rounded w-12"></div>
                        <div className="h-4 bg-slate-700 rounded w-16"></div>
                      </div>
                      <div className="h-6 bg-slate-700 rounded-full w-16"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : filteredTutorials.length === 0 ? (
              // No results
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full text-center py-16"
              >
                <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No tutorials found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              // Tutorial cards
              filteredTutorials.map((tutorial, index) => {
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

                  {/* Code Preview Overlay */}
                  {tutorial.codeExamples && tutorial.codeExamples.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute inset-4 bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none"
                    >
                      <div className="p-4 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-medium text-slate-300">Code Preview</span>
                        </div>
                        <pre className="text-xs text-slate-400 flex-1 overflow-hidden bg-slate-800/50 p-2 rounded border border-slate-700">
                          <code className="language-sql">
                            {tutorial.codeExamples[0].code.split('\n').slice(0, 6).join('\n')}
                            {tutorial.codeExamples[0].code.split('\n').length > 6 && '\n...'}
                          </code>
                        </pre>
                      </div>
                    </motion.div>
                  )}

                  <div className="relative z-20">
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

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(tutorial.id)
                          }}
                          className={`p-2 rounded-xl transition-all ${
                            bookmarkedTutorials.has(tutorial.id)
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-slate-800/40 text-slate-400 hover:text-blue-400 border border-slate-700 hover:border-blue-500/30'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedTutorials.has(tutorial.id) ? 'fill-current' : ''}`} />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(tutorial.id)
                          }}
                          className={`p-2 rounded-xl transition-all ${
                            favoriteTutorials.has(tutorial.id)
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-slate-800/40 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favoriteTutorials.has(tutorial.id) ? 'fill-current' : ''}`} />
                        </motion.button>
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

                    {/* Progress Bar */}
                    {tutorialProgress[tutorial.id] !== undefined && tutorialProgress[tutorial.id] > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span>Progress</span>
                          <span>{tutorialProgress[tutorial.id]}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${tutorialProgress[tutorial.id]}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )}

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
            }))} 
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

          {/* Learning Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Your Learning Analytics</h2>
                <p className="text-slate-400">Track your progress and achievements across all tutorials</p>
              </div>

              {/* Analytics Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Progress */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Total Progress</h3>
                      <p className="text-sm text-slate-400">Overall completion</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {Math.round((Object.values(tutorialProgress).filter(p => p === 100).length / tutorials.length) * 100)}%
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(Object.values(tutorialProgress).filter(p => p === 100).length / tutorials.length) * 100}%`
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {Object.values(tutorialProgress).filter(p => p === 100).length} of {tutorials.length} completed
                  </p>
                </motion.div>

                {/* Study Time */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Study Time</h3>
                      <p className="text-sm text-slate-400">Time invested</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {Math.round(Object.values(tutorialProgress).reduce((acc, progress, idx) => {
                      const tutorial = tutorials[idx]
                      if (tutorial) {
                        const duration = parseInt(tutorial.duration.split(' ')[0])
                        return acc + (duration * progress / 100)
                      }
                      return acc
                    }, 0))} min
                  </div>
                  <div className="text-sm text-slate-400">Estimated completion time</div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Achievements</h3>
                      <p className="text-sm text-slate-400">Milestones reached</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {Object.values(tutorialProgress).filter(p => p === 100).length >= 5 ? '🏆' :
                     Object.values(tutorialProgress).filter(p => p === 100).length >= 3 ? '🥈' :
                     Object.values(tutorialProgress).filter(p => p === 100).length >= 1 ? '🥉' : '🎯'}
                  </div>
                  <div className="text-sm text-slate-400">
                    {Object.values(tutorialProgress).filter(p => p === 100).length === 0 ? 'Start your journey!' :
                     Object.values(tutorialProgress).filter(p => p === 100).length < 3 ? 'Keep going!' :
                     Object.values(tutorialProgress).filter(p => p === 100).length < 5 ? 'Great progress!' : 'Master achieved!'}
                  </div>
                </motion.div>

                {/* Learning Streak */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Current Focus</h3>
                      <p className="text-sm text-slate-400">Active learning</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {Object.values(tutorialProgress).filter(p => p > 0 && p < 100).length}
                  </div>
                  <div className="text-sm text-slate-400">Tutorials in progress</div>
                </motion.div>
              </div>

              {/* Progress by Category */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">Progress by Category</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Fundamentals', 'SQL', 'Design', 'Performance', 'Security', 'Analytics'].map((category, index) => {
                    const categoryTutorials = tutorials.filter(t => t.category === category)
                    const completedInCategory = categoryTutorials.filter(t =>
                      tutorialProgress[t.id] === 100
                    ).length
                    const progress = categoryTutorials.length > 0 ? (completedInCategory / categoryTutorials.length) * 100 : 0

                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-300">{category}</span>
                          <span className="text-xs text-slate-500">{completedInCategory}/{categoryTutorials.length}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-3">
                  {Object.entries(tutorialProgress)
                    .filter(([_, progress]) => progress > 0)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([tutorialId, progress]) => {
                      const tutorial = tutorials.find(t => t.id === parseInt(tutorialId))
                      if (!tutorial) return null

                      return (
                        <motion.div
                          key={tutorialId}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                        >
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tutorial.gradient} flex items-center justify-center flex-shrink-0`}>
                            <tutorial.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">{tutorial.title}</h4>
                            <p className="text-xs text-slate-400">{tutorial.category} • {tutorial.difficulty}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-purple-400">{progress}%</div>
                            <div className="w-20 bg-slate-700 rounded-full h-1 mt-1">
                              <motion.div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  {Object.keys(tutorialProgress).length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No activity yet. Start learning to see your progress here!</p>
                    </div>
                  )}
                </div>
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

                  {/* Code Examples */}
                  {selectedTutorial.codeExamples && selectedTutorial.codeExamples.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Code Examples</h3>
                      <div className="space-y-4">
                        {selectedTutorial.codeExamples.map((example: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden"
                          >
                            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                              <h4 className="text-sm font-medium text-slate-300">{example.title}</h4>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => copyToClipboard(example.code, `${selectedTutorial.id}-${index}`)}
                                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all ${
                                  copiedCodeId === `${selectedTutorial.id}-${index}`
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-slate-700/50 text-slate-400 hover:text-slate-300 border border-slate-600'
                                }`}
                              >
                                {copiedCodeId === `${selectedTutorial.id}-${index}` ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </>
                                )}
                              </motion.button>
                            </div>
                            <div className="p-4">
                              <pre className="text-sm text-slate-300 overflow-x-auto bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                                <code className="language-sql">{example.code}</code>
                              </pre>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning Objectives */}
                  {selectedTutorial.learningObjectives && selectedTutorial.learningObjectives.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Learning Objectives</h3>
                      <div className="grid md:grid-cols-1 gap-3">
                        {selectedTutorial.learningObjectives.map((objective: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700"
                          >
                            <Target className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{objective}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tutorial Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{selectedTutorial.quizQuestions}</div>
                      <div className="text-sm text-slate-400">Quiz Questions</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-green-400 mb-1">{selectedTutorial.handsOnExercises}</div>
                      <div className="text-sm text-slate-400">Hands-on Exercises</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-purple-400 mb-1">{selectedTutorial.rating}</div>
                      <div className="text-sm text-slate-400">Average Rating</div>
                    </div>
                  </div>

                  {/* Interactive Quiz */}
                  {selectedTutorial.quizData && selectedTutorial.quizData.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Knowledge Check</h3>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowQuiz(!showQuiz)}
                          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors text-sm"
                        >
                          {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                        </motion.button>
                      </div>

                      <AnimatePresence>
                        {showQuiz && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4"
                          >
                            {/* Quiz Questions */}
                            {selectedTutorial.quizData.map((question: any, index: number) => (
                              <motion.div
                                key={question.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-slate-800/40 rounded-xl border border-slate-700"
                              >
                                <h4 className="text-white font-medium mb-3">{index + 1}. {question.question}</h4>
                                <div className="space-y-2">
                                  {question.options.map((option: string, optionIndex: number) => {
                                    const isSelected = quizAnswers[question.id] === optionIndex.toString()
                                    const isCorrect = optionIndex === question.correctAnswer
                                    const isSubmitted = quizSubmitted[selectedTutorial.id]
                                    const showResult = isSubmitted && (isSelected || isCorrect)

                                    return (
                                      <motion.button
                                        key={optionIndex}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => !isSubmitted && handleQuizAnswer(question.id, optionIndex.toString())}
                                        disabled={isSubmitted}
                                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                                          showResult && isCorrect
                                            ? 'bg-green-500/20 border-green-500/50 text-green-300'
                                            : showResult && isSelected && !isCorrect
                                            ? 'bg-red-500/20 border-red-500/50 text-red-300'
                                            : isSelected
                                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                                            : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            showResult && isCorrect ? 'border-green-400' :
                                            showResult && isSelected && !isCorrect ? 'border-red-400' :
                                            isSelected ? 'border-purple-400' : 'border-slate-500'
                                          }`}>
                                            {(showResult && isCorrect) || isSelected ? (
                                              <div className={`w-2 h-2 rounded-full ${
                                                showResult && isCorrect ? 'bg-green-400' :
                                                isSelected ? 'bg-purple-400' : 'bg-slate-400'
                                              }`} />
                                            ) : null}
                                          </div>
                                          <span className="text-sm">{option}</span>
                                        </div>
                                      </motion.button>
                                    )
                                  })}
                                </div>

                                {/* Show explanation after submission */}
                                {quizSubmitted[selectedTutorial.id] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                                  >
                                    <p className="text-sm text-slate-300">{question.explanation}</p>
                                  </motion.div>
                                )}
                              </motion.div>
                            ))}

                            {/* Quiz Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                              <div className="text-sm text-slate-400">
                                {quizSubmitted[selectedTutorial.id] && (
                                  <span className={`font-medium ${
                                    calculateQuizScore(selectedTutorial) >= 80 ? 'text-green-400' :
                                    calculateQuizScore(selectedTutorial) >= 60 ? 'text-yellow-400' : 'text-red-400'
                                  }`}>
                                    Score: {calculateQuizScore(selectedTutorial)}%
                                  </span>
                                )}
                              </div>

                              <div className="flex gap-3">
                                {quizSubmitted[selectedTutorial.id] ? (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => resetQuiz(selectedTutorial.id)}
                                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-slate-300 hover:text-white transition-colors"
                                  >
                                    Retake Quiz
                                  </motion.button>
                                ) : (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => submitQuiz(selectedTutorial.id)}
                                    disabled={Object.keys(quizAnswers).length !== selectedTutorial.quizData.length}
                                    className={`px-4 py-2 rounded-xl transition-colors ${
                                      Object.keys(quizAnswers).length === selectedTutorial.quizData.length
                                        ? 'bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 hover:text-green-300'
                                        : 'bg-slate-700/50 border border-slate-600 text-slate-500 cursor-not-allowed'
                                    }`}
                                  >
                                    Submit Quiz
                                  </motion.button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

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

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">User Preferences</h2>
                </div>

                <motion.button
                  onClick={() => setShowSettings(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6">
                {/* Display Options */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Display Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Show completed tutorials</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setUserPreferences(prev => ({ ...prev, showCompleted: !prev.showCompleted }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          userPreferences.showCompleted ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-md"
                          animate={{ x: userPreferences.showCompleted ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Enable notifications</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setUserPreferences(prev => ({ ...prev, notifications: !prev.notifications }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          userPreferences.notifications ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-md"
                          animate={{ x: userPreferences.notifications ? 24 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Filtering Options */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Filtering Options</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Difficulty Filter</label>
                      <select
                        value={userPreferences.difficultyFilter || ''}
                        onChange={(e) => setUserPreferences(prev => ({
                          ...prev,
                          difficultyFilter: e.target.value || null
                        }))}
                        className="w-full px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="">All Difficulties</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Sort By</label>
                      <select
                        value={userPreferences.sortBy}
                        onChange={(e) => setUserPreferences(prev => ({
                          ...prev,
                          sortBy: e.target.value as any
                        }))}
                        className="w-full px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700 text-slate-300 focus:outline-none focus:border-purple-500/50"
                      >
                        <option value="default">Default Order</option>
                        <option value="rating">Highest Rated</option>
                        <option value="duration">Shortest First</option>
                        <option value="difficulty">Easiest First</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Theme Options */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                  <div className="flex gap-3">
                    {[
                      { value: 'dark', label: 'Dark', icon: '🌙' },
                      { value: 'light', label: 'Light', icon: '☀️' }
                    ].map((theme) => (
                      <motion.button
                        key={theme.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUserPreferences(prev => ({ ...prev, theme: theme.value as any }))}
                        className={`flex-1 px-4 py-3 rounded-xl border transition-all ${
                          userPreferences.theme === theme.value
                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                            : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-lg mb-1 block">{theme.icon}</span>
                        <span className="text-sm">{theme.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* User Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-purple-400">{bookmarkedTutorials.size}</div>
                      <div className="text-sm text-slate-400">Bookmarked</div>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-pink-400">{favoriteTutorials.size}</div>
                      <div className="text-sm text-slate-400">Favorites</div>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-cyan-400">
                        {Object.values(tutorialProgress).filter(p => p === 100).length}
                      </div>
                      <div className="text-sm text-slate-400">Completed</div>
                    </div>
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                      <div className="text-2xl font-bold text-green-400">
                        {Math.round(Object.values(tutorialProgress).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(tutorialProgress).length))}%
                      </div>
                      <div className="text-sm text-slate-400">Avg Progress</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setBookmarkedTutorials(new Set())
                      setFavoriteTutorials(new Set())
                      setTutorialProgress({})
                      localStorage.removeItem('tutorial-bookmarks')
                      localStorage.removeItem('tutorial-favorites')
                      localStorage.removeItem('tutorial-progress')
                    }}
                    className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-colors"
                  >
                    Reset Progress
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Done
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}