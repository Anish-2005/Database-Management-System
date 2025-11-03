export interface DocumentationSection {
  title: string
  content: string
  code?: string
}

export interface DocumentationContent {
  overview: string
  sections: DocumentationSection[]
}

export interface DocumentationItem {
  id: number
  title: string
  category: string
  icon: any // Lucide icon component
  gradient: string
  description: string
  content: DocumentationContent
  lastUpdated: string
  readTime: string
}

export const documentationCategories = [
  "All",
  "Getting Started",
  "SQL Reference",
  "Performance",
  "Security",
  "Architecture",
  "API Reference"
] as const

export type DocumentationCategory = typeof documentationCategories[number]

export const documentationData: DocumentationItem[] = [
  {
    id: 1,
    title: "Getting Started with QuantumDB",
    category: "Getting Started",
    icon: "BookOpen",
    gradient: "from-green-500 to-emerald-500",
    description: "Learn the basics of QuantumDB and set up your first database",
    content: {
      overview: "QuantumDB is a next-generation database management system designed for modern applications. This guide will help you get started quickly.",
      sections: [
        {
          title: "Installation",
          content: "Install QuantumDB using your preferred package manager",
          code: `# Using npm
npm install quantumdb

# Using yarn
yarn add quantumdb

# Using pip
pip install quantumdb`
        },
        {
          title: "Basic Configuration",
          content: "Configure your database connection",
          code: `const db = new QuantumDB({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'admin',
  password: 'secure_password'
});`
        }
      ]
    },
    lastUpdated: "Dec 1, 2024",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "SQL Query Reference",
    category: "SQL Reference",
    icon: "Code",
    gradient: "from-blue-500 to-cyan-500",
    description: "Complete reference for SQL queries and syntax",
    content: {
      overview: "Comprehensive guide to SQL queries in QuantumDB with examples and best practices.",
      sections: [
        {
          title: "SELECT Queries",
          content: "Retrieve data from your database",
          code: `-- Basic SELECT
SELECT * FROM users;

-- SELECT with WHERE clause
SELECT name, email FROM users
WHERE status = 'active';

-- SELECT with JOIN
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;`
        },
        {
          title: "INSERT Queries",
          content: "Add new records to your database",
          code: `-- Single insert
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com');

-- Multiple inserts
INSERT INTO users (name, email) VALUES
  ('Jane Smith', 'jane@example.com'),
  ('Bob Johnson', 'bob@example.com');`
        }
      ]
    },
    lastUpdated: "Dec 2, 2024",
    readTime: "15 min"
  },
  {
    id: 3,
    title: "Performance Optimization Guide",
    category: "Performance",
    icon: "Zap",
    gradient: "from-yellow-500 to-orange-500",
    description: "Optimize your database for maximum performance",
    content: {
      overview: "Learn advanced techniques to optimize query performance and database operations.",
      sections: [
        {
          title: "Index Optimization",
          content: "Create and manage indexes effectively",
          code: `-- Create a simple index
CREATE INDEX idx_users_email ON users(email);

-- Create a composite index
CREATE INDEX idx_orders_user_date
ON orders(user_id, order_date);

-- Create a partial index
CREATE INDEX idx_active_users
ON users(email) WHERE status = 'active';`
        },
        {
          title: "Query Analysis",
          content: "Analyze query performance",
          code: `-- Analyze query execution plan
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123
  AND order_date >= '2024-01-01';`
        }
      ]
    },
    lastUpdated: "Nov 30, 2024",
    readTime: "20 min"
  },
  {
    id: 4,
    title: "Security Best Practices",
    category: "Security",
    icon: "Shield",
    gradient: "from-red-500 to-pink-500",
    description: "Secure your database against threats",
    content: {
      overview: "Essential security practices to protect your database and data.",
      sections: [
        {
          title: "User Authentication",
          content: "Implement secure authentication",
          code: `-- Create a user with password
CREATE USER app_user
WITH PASSWORD 'secure_password';

-- Grant specific permissions
GRANT SELECT, INSERT, UPDATE
ON TABLE users TO app_user;`
        },
        {
          title: "SQL Injection Prevention",
          content: "Use parameterized queries",
          code: `// Bad - SQL Injection vulnerable
const query = \`SELECT * FROM users
  WHERE email = '\${userInput}'\`;

// Good - Parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userInput]);`
        }
      ]
    },
    lastUpdated: "Dec 3, 2024",
    readTime: "12 min"
  },
  {
    id: 5,
    title: "Database Architecture",
    category: "Architecture",
    icon: "Layers",
    gradient: "from-purple-500 to-pink-500",
    description: "Design scalable database architectures",
    content: {
      overview: "Learn how to design database architectures for scalability and reliability.",
      sections: [
        {
          title: "Schema Design",
          content: "Design normalized database schemas",
          code: `-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table with foreign key
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2),
  order_date TIMESTAMP DEFAULT NOW()
);`
        }
      ]
    },
    lastUpdated: "Nov 28, 2024",
    readTime: "18 min"
  },
  {
    id: 6,
    title: "API Reference",
    category: "API Reference",
    icon: "Terminal",
    gradient: "from-cyan-500 to-blue-500",
    description: "Complete API documentation and examples",
    content: {
      overview: "Comprehensive API reference for QuantumDB client libraries.",
      sections: [
        {
          title: "Connection API",
          content: "Manage database connections",
          code: `// Create connection
const db = new QuantumDB(config);

// Test connection
await db.connect();

// Close connection
await db.disconnect();`
        },
        {
          title: "Query API",
          content: "Execute queries programmatically",
          code: `// Simple query
const users = await db.query('SELECT * FROM users');

// Parameterized query
const user = await db.query(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// Transaction
await db.transaction(async (trx) => {
  await trx.query('INSERT INTO orders...');
  await trx.query('UPDATE inventory...');
});`
        }
      ]
    },
    lastUpdated: "Dec 4, 2024",
    readTime: "25 min"
  }
]