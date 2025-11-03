import {
  BookOpen,
  Database,
  Code,
  FileText,
  Wrench,
  Shield,
  Zap,
  Terminal,
  Server,
} from "lucide-react"

export interface Resource {
  id: number
  title: string
  description: string
  category: string
  type: string
  icon: any
  gradient: string
  downloadUrl?: string
  externalUrl?: string
  content?: string
  tags: string[]
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "SQL Cheat Sheet",
    description: "Comprehensive SQL syntax reference with examples for all major databases",
    category: "Reference",
    type: "Cheat Sheet",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    downloadUrl: "#",
    content: `SELECT * FROM users WHERE age > 18;
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
UPDATE users SET name = 'Jane' WHERE id = 1;
DELETE FROM users WHERE id = 1;`,
    tags: ["SQL", "Reference", "Syntax"]
  },
  {
    id: 2,
    title: "Database Design Principles",
    description: "Complete guide to database normalization, ER modeling, and best practices",
    category: "Documentation",
    type: "Guide",
    icon: BookOpen,
    gradient: "from-purple-500 to-pink-500",
    externalUrl: "https://example.com/db-design",
    tags: ["Design", "Normalization", "ERD"]
  },
  {
    id: 3,
    title: "PostgreSQL Documentation",
    description: "Official PostgreSQL documentation and reference manual",
    category: "Documentation",
    type: "Official Docs",
    icon: Database,
    gradient: "from-green-500 to-emerald-500",
    externalUrl: "https://www.postgresql.org/docs/",
    tags: ["PostgreSQL", "Official", "Reference"]
  },
  {
    id: 4,
    title: "MySQL Workbench",
    description: "Visual database design tool for MySQL with ER diagramming",
    category: "Tools",
    type: "Software",
    icon: Wrench,
    gradient: "from-orange-500 to-red-500",
    externalUrl: "https://www.mysql.com/products/workbench/",
    tags: ["MySQL", "Design", "ERD"]
  },
  {
    id: 5,
    title: "Database Performance Tuning",
    description: "Advanced techniques for optimizing database performance and query execution",
    category: "Documentation",
    type: "Guide",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    externalUrl: "#",
    tags: ["Performance", "Optimization", "Indexing"]
  },
  {
    id: 6,
    title: "SQLZoo Interactive Exercises",
    description: "Interactive SQL learning platform with hands-on exercises",
    category: "Learning",
    type: "Interactive",
    icon: Code,
    gradient: "from-cyan-500 to-blue-500",
    externalUrl: "https://sqlzoo.net/",
    tags: ["SQL", "Practice", "Interactive"]
  },
  {
    id: 7,
    title: "MongoDB University",
    description: "Free courses and certifications for MongoDB database management",
    category: "Learning",
    type: "Courses",
    icon: Database,
    gradient: "from-green-500 to-teal-500",
    externalUrl: "https://university.mongodb.com/",
    tags: ["MongoDB", "Courses", "Certification"]
  },
  {
    id: 8,
    title: "Database Security Best Practices",
    description: "Comprehensive security guidelines for database administrators",
    category: "Documentation",
    type: "Security Guide",
    icon: Shield,
    gradient: "from-red-500 to-pink-500",
    externalUrl: "#",
    tags: ["Security", "Best Practices", "Administration"]
  },
  {
    id: 9,
    title: "DBeaver Community Edition",
    description: "Free universal database tool for developers and database administrators",
    category: "Tools",
    type: "Software",
    icon: Terminal,
    gradient: "from-slate-500 to-slate-600",
    externalUrl: "https://dbeaver.io/",
    tags: ["Database Tool", "Free", "Universal"]
  },
  {
    id: 10,
    title: "Database System Concepts",
    description: "Classic textbook on database systems by Silberschatz, Korth, and Sudarshan",
    category: "Books",
    type: "Textbook",
    icon: BookOpen,
    gradient: "from-purple-600 to-indigo-600",
    externalUrl: "#",
    tags: ["Textbook", "Theory", "Comprehensive"]
  },
  {
    id: 11,
    title: "Redis Documentation",
    description: "Complete documentation for Redis in-memory data structure store",
    category: "Documentation",
    type: "Official Docs",
    icon: Database,
    gradient: "from-red-600 to-red-700",
    externalUrl: "https://redis.io/documentation",
    tags: ["Redis", "NoSQL", "Documentation"]
  },
  {
    id: 12,
    title: "Docker for Database Development",
    description: "Learn to use Docker containers for database development and testing",
    category: "Tools",
    type: "Guide",
    icon: Server,
    gradient: "from-blue-600 to-cyan-600",
    externalUrl: "#",
    tags: ["Docker", "Development", "Containers"]
  }
]

export const categories = ["All", "Documentation", "Reference", "Tools", "Learning", "Books"]

export const featuredTools = [
  {
    name: "DBeaver",
    description: "Universal database tool for developers",
    features: ["Multi-database support", "ER diagrams", "SQL editor"],
    icon: Database,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "pgAdmin",
    description: "PostgreSQL administration and development platform",
    features: ["Query tool", "Backup/Restore", "Monitoring"],
    icon: Server,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "MySQL Workbench",
    description: "Visual database design tool for MySQL",
    features: ["ER modeling", "SQL development", "Server administration"],
    icon: Wrench,
    gradient: "from-orange-500 to-red-500"
  }
]