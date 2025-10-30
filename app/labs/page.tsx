"use client"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Search, FolderPlus, ArrowUpRight, X, Rocket, Sparkles, Plus, Filter, Pause, Play, Menu, Trash, ExternalLink, Calendar, User, Clock, Star, Users, Target, BookOpen, Code, BarChart3, Layers, Zap } from "lucide-react"
import * as THREE from 'three'
import Navbar from "../../components/Navbar"
import Background from "../../components/Background"

// Default labs data
const defaultLabs: Lab[] = [
  {
    id: "1",
    title: "E-Commerce Database Design Lab",
    description: "Design and implement a comprehensive e-commerce database from scratch. Learn to model complex relationships, handle inventory management, and optimize for high-volume transactions.",
    category: "Design",
    difficulty: "Intermediate" as const,
    duration: "180 min",
    completed: false,
    rating: 4.9,
    students: 245,
    instructor: "Dr. Sarah Chen",
    instructorAvatar: "SC",
    icon: Database,
    gradient: "from-blue-500 to-cyan-500",
    topics: ["E-commerce Schema", "Order Management", "Inventory Tracking", "Customer Analytics", "Payment Processing"],
    prerequisites: ["Basic SQL", "Database Design Fundamentals"],
    learningObjectives: [
      "Design a scalable e-commerce database schema",
      "Implement complex relationships and constraints",
      "Create efficient queries for business analytics",
      "Handle concurrent transactions and data integrity",
      "Optimize database performance for high traffic"
    ],
    codeExamples: [
      {
        title: "Customer and Order Schema",
        language: "sql",
        code: `-- Customer Management
CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  account_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

-- Product Catalog
CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT,
  stock_quantity INT DEFAULT 0,
  min_stock_level INT DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Order Processing
CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address TEXT,
  payment_method VARCHAR(50),
  tracking_number VARCHAR(100),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);`
      }
    ],
    quizQuestions: 12,
    handsOnExercises: 8,
    estimatedTime: "3 hours",
    collaborators: 3,
    lastUpdated: "2024-01-15",
    version: "2.1",
    environment: "MySQL 8.0",
    technologies: ["MySQL", "phpMyAdmin", "SQL Workbench"],
    tags: ["E-commerce", "Schema Design", "Order Management", "Inventory"]
  },
  {
    id: "2",
    title: "Real-time Analytics Dashboard",
    description: "Build a real-time analytics system for social media data. Learn to handle streaming data, create materialized views, and implement efficient aggregation queries.",
    category: "Analytics",
    difficulty: "Advanced" as const,
    duration: "240 min",
    completed: true,
    rating: 4.8,
    students: 189,
    instructor: "Prof. Michael Rodriguez",
    instructorAvatar: "MR",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500",
    topics: ["Streaming Data", "Materialized Views", "Time-series Analysis", "Real-time Queries", "Data Aggregation"],
    prerequisites: ["Advanced SQL", "Database Performance", "Basic Analytics"],
    learningObjectives: [
      "Design schemas for time-series data",
      "Implement real-time data ingestion",
      "Create efficient aggregation queries",
      "Build materialized views for performance",
      "Handle high-volume data streams"
    ],
    codeExamples: [
      {
        title: "Real-time Social Media Analytics",
        language: "sql",
        code: `-- Social Media Posts Table
CREATE TABLE posts (
  post_id BIGINT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content TEXT,
  platform ENUM('twitter', 'facebook', 'instagram', 'linkedin') NOT NULL,
  posted_at TIMESTAMP NOT NULL,
  likes_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  engagement_score DECIMAL(5,2) GENERATED ALWAYS AS (
    (likes_count * 1.0 + shares_count * 2.0 + comments_count * 1.5) /
    GREATEST(TIMESTAMPDIFF(HOUR, posted_at, NOW()), 1)
  ) STORED,
  INDEX idx_user_platform (user_id, platform),
  INDEX idx_posted_at (posted_at),
  INDEX idx_engagement (engagement_score DESC)
);

-- Real-time Analytics View
CREATE OR REPLACE VIEW realtime_analytics AS
SELECT
  platform,
  DATE_FORMAT(posted_at, '%Y-%m-%d %H:00:00') as hour_bucket,
  COUNT(*) as posts_count,
  SUM(likes_count) as total_likes,
  SUM(shares_count) as total_shares,
  SUM(comments_count) as total_comments,
  AVG(engagement_score) as avg_engagement,
  COUNT(DISTINCT user_id) as active_users
FROM posts
WHERE posted_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY platform, hour_bucket
ORDER BY hour_bucket DESC, platform;

-- Trending Topics Analysis
CREATE TABLE trending_topics (
  topic_id INT PRIMARY KEY AUTO_INCREMENT,
  topic_name VARCHAR(100) NOT NULL,
  platform ENUM('twitter', 'facebook', 'instagram', 'linkedin') NOT NULL,
  mention_count INT DEFAULT 0,
  first_mentioned TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_mentioned TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  trend_score DECIMAL(8,4) DEFAULT 0,
  is_trending BOOLEAN DEFAULT FALSE,
  UNIQUE KEY unique_topic_platform (topic_name, platform),
  INDEX idx_trend_score (trend_score DESC),
  INDEX idx_platform_trending (platform, is_trending)
);`
      }
    ],
    quizQuestions: 15,
    handsOnExercises: 10,
    estimatedTime: "4 hours",
    collaborators: 5,
    lastUpdated: "2024-01-20",
    version: "3.0",
    environment: "PostgreSQL 15",
    technologies: ["PostgreSQL", "TimescaleDB", "Apache Kafka", "Grafana"],
    tags: ["Analytics", "Real-time", "Streaming", "Materialized Views"]
  },
  {
    id: "3",
    title: "Multi-tenant SaaS Database Architecture",
    description: "Design and implement a multi-tenant database architecture for a SaaS application. Learn about data isolation, tenant management, and scalable database design patterns.",
    category: "Architecture",
    difficulty: "Advanced" as const,
    duration: "300 min",
    completed: false,
    rating: 4.9,
    students: 156,
    instructor: "Dr. Emily Watson",
    instructorAvatar: "EW",
    icon: Layers,
    gradient: "from-green-500 to-emerald-500",
    topics: ["Multi-tenancy", "Data Isolation", "Tenant Management", "Scalable Architecture", "Security Models"],
    prerequisites: ["Database Design", "System Architecture", "Security Concepts"],
    learningObjectives: [
      "Implement different multi-tenancy patterns",
      "Design secure data isolation strategies",
      "Create efficient tenant management systems",
      "Handle cross-tenant queries and analytics",
      "Implement scalable database architectures"
    ],
    codeExamples: [
      {
        title: "Multi-tenant Schema Design",
        language: "sql",
        code: `-- Tenant Management
CREATE TABLE tenants (
  tenant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  status ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  settings JSONB DEFAULT '{}',
  plan_type ENUM('free', 'basic', 'premium', 'enterprise') DEFAULT 'free',
  max_users INT DEFAULT 10,
  storage_limit_gb INT DEFAULT 1
);

-- Shared Tables with Tenant Isolation
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('admin', 'user', 'viewer') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  UNIQUE KEY unique_email_per_tenant (tenant_id, email),
  INDEX idx_tenant_active (tenant_id, is_active)
);

-- Tenant-specific Data Tables
CREATE TABLE tenant_data (
  data_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  table_name VARCHAR(100) NOT NULL,
  record_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id),
  INDEX idx_tenant_table (tenant_id, table_name),
  INDEX idx_created_at (created_at)
);

-- Row Level Security Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON users
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

ALTER TABLE tenant_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_data_isolation ON tenant_data
  FOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::UUID);`
      }
    ],
    quizQuestions: 18,
    handsOnExercises: 12,
    estimatedTime: "5 hours",
    collaborators: 7,
    lastUpdated: "2024-01-25",
    version: "2.5",
    environment: "PostgreSQL 15",
    technologies: ["PostgreSQL", "Node.js", "Express", "JWT", "Redis"],
    tags: ["Multi-tenant", "SaaS", "Architecture", "Security"]
  },
  {
    id: "4",
    title: "Database Migration & ETL Pipeline",
    description: "Learn to design and implement robust database migration strategies and ETL pipelines. Handle schema changes, data transformation, and maintain data integrity during migrations.",
    category: "DevOps",
    difficulty: "Intermediate" as const,
    duration: "210 min",
    completed: false,
    rating: 4.7,
    students: 203,
    instructor: "Alex Thompson",
    instructorAvatar: "AT",
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
    topics: ["Database Migrations", "ETL Pipelines", "Data Transformation", "Schema Evolution", "Version Control"],
    prerequisites: ["SQL Proficiency", "Programming Basics", "Database Design"],
    learningObjectives: [
      "Design migration strategies for schema changes",
      "Implement ETL pipelines for data processing",
      "Handle data transformation and validation",
      "Manage database versioning and rollbacks",
      "Ensure data integrity during migrations"
    ],
    codeExamples: [
      {
        title: "Migration Framework Implementation",
        language: "python",
        code: `import psycopg2
import json
from datetime import datetime
from typing import Dict, List, Any

class DatabaseMigrator:
    def __init__(self, connection_string: str):
        self.conn = psycopg2.connect(connection_string)
        self._init_migration_table()

    def _init_migration_table(self):
        """Initialize migration tracking table"""
        with self.conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS schema_migrations (
                    id SERIAL PRIMARY KEY,
                    migration_name VARCHAR(255) UNIQUE NOT NULL,
                    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    checksum VARCHAR(64) NOT NULL,
                    status ENUM('applied', 'failed', 'rolled_back') DEFAULT 'applied'
                );
            """)
        self.conn.commit()

    def apply_migration(self, migration_name: str, up_sql: str):
        """Apply a database migration"""
        try:
            # Check if already applied
            with self.conn.cursor() as cursor:
                cursor.execute(
                    "SELECT id FROM schema_migrations WHERE migration_name = %s",
                    (migration_name,)
                )
                if cursor.fetchone():
                    print(f"Migration {migration_name} already applied")
                    return

            # Apply migration
            with self.conn.cursor() as cursor:
                cursor.execute(up_sql)

                # Record migration
                checksum = self._calculate_checksum(up_sql)
                cursor.execute("""
                    INSERT INTO schema_migrations (migration_name, checksum)
                    VALUES (%s, %s)
                """, (migration_name, checksum))

            self.conn.commit()
            print(f"Successfully applied migration: {migration_name}")

        except Exception as e:
            self.conn.rollback()
            print(f"Failed to apply migration {migration_name}: {e}")
            raise

    def rollback_migration(self, migration_name: str, down_sql: str):
        """Rollback a database migration"""
        try:
            with self.conn.cursor() as cursor:
                cursor.execute(down_sql)

                # Remove migration record
                cursor.execute(
                    "DELETE FROM schema_migrations WHERE migration_name = %s",
                    (migration_name,)
                )

            self.conn.commit()
            print(f"Successfully rolled back migration: {migration_name}")

        except Exception as e:
            self.conn.rollback()
            print(f"Failed to rollback migration {migration_name}: {e}")
            raise

# Example migration
def migrate_user_profiles():
    migrator = DatabaseMigrator("postgresql://user:pass@localhost:5432/myapp")

    # Migration: Add user profiles table
    up_sql = """
    CREATE TABLE user_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        bio TEXT,
        avatar_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
    """

    down_sql = """
    DROP TABLE IF EXISTS user_profiles;
    """

    migrator.apply_migration("add_user_profiles_table", up_sql)
    # To rollback: migrator.rollback_migration("add_user_profiles_table", down_sql)`
      }
    ],
    quizQuestions: 10,
    handsOnExercises: 6,
    estimatedTime: "3.5 hours",
    collaborators: 4,
    lastUpdated: "2024-01-18",
    version: "1.8",
    environment: "PostgreSQL 15",
    technologies: ["Python", "PostgreSQL", "Docker", "Git", "CI/CD"],
    tags: ["Migration", "ETL", "DevOps", "Data Transformation"]
  },
  {
    id: "5",
    title: "Graph Database Social Network Analysis",
    description: "Explore graph databases by building a social network analysis system. Learn graph traversal, relationship modeling, and complex network queries using Neo4j.",
    category: "Graph Databases",
    difficulty: "Advanced" as const,
    duration: "270 min",
    completed: false,
    rating: 4.8,
    students: 134,
    instructor: "Carlos Mendoza",
    instructorAvatar: "CM",
    icon: Database,
    gradient: "from-cyan-500 to-blue-500",
    topics: ["Graph Theory", "Social Networks", "Cypher Queries", "Graph Algorithms", "Network Analysis"],
    prerequisites: ["Database Fundamentals", "Basic Graph Theory", "SQL Knowledge"],
    learningObjectives: [
      "Model complex relationships using graph databases",
      "Write efficient Cypher queries for graph traversal",
      "Implement social network algorithms",
      "Analyze network structures and patterns",
      "Optimize graph database performance"
    ],
    codeExamples: [
      {
        title: "Social Network Graph Model",
        language: "cypher",
        code: `// Create User Nodes
CREATE (u1:User {
  userId: "user_001",
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28,
  location: "San Francisco",
  interests: ["technology", "hiking", "photography"],
  createdAt: datetime(),
  isActive: true
})

CREATE (u2:User {
  userId: "user_002",
  name: "Bob Smith",
  email: "bob@example.com",
  age: 32,
  location: "New York",
  interests: ["finance", "gaming", "cooking"],
  createdAt: datetime(),
  isActive: true
})

// Create Friendship Relationships
MATCH (u1:User {userId: "user_001"}), (u2:User {userId: "user_002"})
CREATE (u1)-[:FRIENDS_WITH {
  since: date("2023-06-15"),
  friendshipStrength: 0.8,
  mutualFriends: 5
}]->(u2)

// Create Post Nodes and Interactions
CREATE (p1:Post {
  postId: "post_001",
  content: "Excited about the new database conference!",
  createdAt: datetime(),
  likes: 15,
  shares: 3,
  visibility: "public"
})

MATCH (u1:User {userId: "user_001"}), (p1:Post {postId: "post_001"})
CREATE (u1)-[:POSTED]->(p1)

MATCH (u2:User {userId: "user_002"}), (p1:Post {postId: "post_001"})
CREATE (u2)-[:LIKED {likedAt: datetime()}]->(p1)

// Create Interest-based Connections
MATCH (u1:User), (u2:User)
WHERE u1 <> u2
  AND size([x IN u1.interests WHERE x IN u2.interests]) > 0
CREATE (u1)-[:SHARES_INTEREST {
  commonInterests: [x IN u1.interests WHERE x IN u2.interests],
  strength: size([x IN u1.interests WHERE x IN u2.interests]) * 0.2
}]->(u2)

// Query: Find mutual friends
MATCH (user:User {userId: "user_001"})-[:FRIENDS_WITH]-(friend1:User)-[:FRIENDS_WITH]-(friend2:User)-[:FRIENDS_WITH]-(user)
WHERE friend1 <> friend2
RETURN friend2.name as MutualFriend,
       count(*) as ConnectionStrength
ORDER BY ConnectionStrength DESC

// Query: Find users with similar interests
MATCH (user:User {userId: "user_001"})-[r:SHARES_INTEREST]->(similar:User)
RETURN similar.name,
       r.commonInterests,
       r.strength as SimilarityScore
ORDER BY SimilarityScore DESC
LIMIT 10

// Query: Analyze network influence
MATCH (user:User)
OPTIONAL MATCH (user)-[:POSTED]->(post:Post)
OPTIONAL MATCH (post)<-[:LIKED]-(liker:User)
OPTIONAL MATCH (user)<-[:FRIENDS_WITH]-(friend:User)
RETURN user.name,
       count(DISTINCT post) as PostsCount,
       count(DISTINCT liker) as TotalLikes,
       count(DISTINCT friend) as FriendsCount,
       (count(DISTINCT liker) + count(DISTINCT friend)) as InfluenceScore
ORDER BY InfluenceScore DESC
LIMIT 20`
      }
    ],
    quizQuestions: 14,
    handsOnExercises: 9,
    estimatedTime: "4.5 hours",
    collaborators: 6,
    lastUpdated: "2024-01-22",
    version: "2.2",
    environment: "Neo4j 5.0",
    technologies: ["Neo4j", "Cypher", "Graph Algorithms", "Python", "NetworkX"],
    tags: ["Graph Database", "Social Network", "Cypher", "Network Analysis"]
  },
  {
    id: "6",
    title: "Time-Series Data & IoT Analytics",
    description: "Build an IoT analytics platform handling time-series sensor data. Learn about time-series databases, data retention policies, and real-time analytics for IoT applications.",
    category: "IoT",
    difficulty: "Advanced" as const,
    duration: "330 min",
    completed: false,
    rating: 4.9,
    students: 98,
    instructor: "Dr. James Wilson",
    instructorAvatar: "JW",
    icon: BarChart3,
    gradient: "from-indigo-500 to-purple-500",
    topics: ["Time-Series Databases", "IoT Data", "Sensor Analytics", "Data Retention", "Real-time Processing"],
    prerequisites: ["Database Systems", "Programming", "Basic Statistics"],
    learningObjectives: [
      "Design time-series database schemas",
      "Handle high-volume IoT data streams",
      "Implement data retention and compression",
      "Create real-time analytics dashboards",
      "Optimize queries for time-series data"
    ],
    codeExamples: [
      {
        title: "IoT Sensor Data Pipeline",
        language: "sql",
        code: `-- TimescaleDB Hypertable for Sensor Data
CREATE TABLE sensor_readings (
  time TIMESTAMPTZ NOT NULL,
  sensor_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  location_id TEXT,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  pressure DECIMAL(7,2),
  battery_level DECIMAL(5,2),
  signal_strength INTEGER,
  metadata JSONB
);

-- Convert to Hypertable (TimescaleDB)
SELECT create_hypertable('sensor_readings', 'time', if_not_exists => TRUE);

-- Create indexes for efficient queries
CREATE INDEX idx_sensor_readings_sensor_time ON sensor_readings (sensor_id, time DESC);
CREATE INDEX idx_sensor_readings_device_time ON sensor_readings (device_id, time DESC);
CREATE INDEX idx_sensor_readings_location_time ON sensor_readings (location_id, time DESC);

-- Data retention policy (keep 1 year of raw data, older data aggregated)
SELECT add_retention_policy('sensor_readings', INTERVAL '1 year');

-- Continuous aggregate for hourly summaries
CREATE MATERIALIZED VIEW hourly_sensor_summary
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 hour', time) AS bucket,
  sensor_id,
  device_id,
  location_id,
  AVG(temperature) as avg_temperature,
  MIN(temperature) as min_temperature,
  MAX(temperature) as max_temperature,
  AVG(humidity) as avg_humidity,
  AVG(pressure) as avg_pressure,
  COUNT(*) as reading_count,
  MIN(battery_level) as min_battery_level
FROM sensor_readings
GROUP BY bucket, sensor_id, device_id, location_id
WITH NO DATA;

-- Enable automatic refresh
SELECT add_continuous_aggregate_policy('hourly_sensor_summary',
  start_offset => INTERVAL '3 hours',
  end_offset => INTERVAL '1 hour',
  schedule_interval => INTERVAL '1 hour');

-- Real-time anomaly detection
CREATE OR REPLACE FUNCTION detect_temperature_anomaly(
  sensor_id TEXT,
  current_temp DECIMAL,
  time_window INTERVAL DEFAULT '1 hour'
) RETURNS BOOLEAN AS $$
DECLARE
  avg_temp DECIMAL;
  std_dev DECIMAL;
  threshold DECIMAL := 2.0; -- 2 standard deviations
BEGIN
  SELECT
    AVG(temperature),
    STDDEV(temperature)
  INTO avg_temp, std_dev
  FROM sensor_readings
  WHERE sensor_id = $1
    AND time >= NOW() - time_window;

  IF avg_temp IS NULL OR std_dev IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN ABS(current_temp - avg_temp) > (threshold * std_dev);
END;
$$ LANGUAGE plpgsql;

-- Alert system for anomalies
CREATE TABLE sensor_alerts (
  alert_id SERIAL PRIMARY KEY,
  sensor_id TEXT NOT NULL,
  alert_type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  metadata JSONB
);

-- Trigger for temperature anomalies
CREATE OR REPLACE FUNCTION check_sensor_anomaly()
RETURNS TRIGGER AS $$
BEGIN
  IF detect_temperature_anomaly(NEW.sensor_id, NEW.temperature) THEN
    INSERT INTO sensor_alerts (sensor_id, alert_type, severity, message, metadata)
    VALUES (
      NEW.sensor_id,
      'temperature_anomaly',
      CASE
        WHEN NEW.temperature > 50 THEN 'critical'
        WHEN NEW.temperature > 40 THEN 'high'
        ELSE 'medium'
      END,
      format('Temperature anomaly detected: %s°C', NEW.temperature),
      jsonb_build_object(
        'sensor_id', NEW.sensor_id,
        'temperature', NEW.temperature,
        'device_id', NEW.device_id,
        'location_id', NEW.location_id
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sensor_anomaly_trigger
  AFTER INSERT ON sensor_readings
  FOR EACH ROW EXECUTE FUNCTION check_sensor_anomaly();

-- Analytics queries
-- Recent sensor health check
SELECT
  sensor_id,
  device_id,
  location_id,
  AVG(battery_level) as avg_battery,
  MAX(time) as last_reading,
  COUNT(*) as total_readings,
  AVG(signal_strength) as avg_signal,
  CASE
    WHEN MAX(time) < NOW() - INTERVAL '1 hour' THEN 'offline'
    WHEN AVG(battery_level) < 20 THEN 'low_battery'
    WHEN AVG(signal_strength) < 30 THEN 'weak_signal'
    ELSE 'healthy'
  END as status
FROM sensor_readings
WHERE time >= NOW() - INTERVAL '24 hours'
GROUP BY sensor_id, device_id, location_id;

-- Predictive maintenance alerts
SELECT
  sensor_id,
  device_id,
  linear_regression(
    EXTRACT(epoch FROM time),
    battery_level
  ) as battery_drain_rate,
  CASE
    WHEN linear_regression(EXTRACT(epoch FROM time), battery_level) < -0.1
    THEN 'Battery draining abnormally'
    ELSE 'Battery health normal'
  END as battery_health
FROM sensor_readings
WHERE time >= NOW() - INTERVAL '7 days'
GROUP BY sensor_id, device_id
HAVING COUNT(*) > 10;`
      }
    ],
    quizQuestions: 16,
    handsOnExercises: 11,
    estimatedTime: "5.5 hours",
    collaborators: 8,
    lastUpdated: "2024-01-28",
    version: "3.1",
    environment: "TimescaleDB",
    technologies: ["TimescaleDB", "PostgreSQL", "Python", "MQTT", "Grafana", "InfluxDB"],
    tags: ["Time-Series", "IoT", "Analytics", "Sensor Data"]
  }
]

type Lab = {
  id: string
  title: string
  description: string
  tags?: string[]
  link?: string
  createdAt?: string
  author?: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  completed: boolean
  rating: number
  students: number
  instructor: string
  instructorAvatar: string
  icon: any
  gradient: string
  topics: string[]
  prerequisites: string[]
  learningObjectives: string[]
  codeExamples: Array<{
    title: string
    code: string
    language: string
  }>
  quizQuestions: number
  handsOnExercises: number
  estimatedTime: string
  collaborators?: number
  lastUpdated?: string
  version?: string
  environment: string
  technologies: string[]
}

function LabCard({ lab, onRequestEdit, onRequestDelete, onOpenDetail }: { lab: Lab; onRequestEdit: (lab: Lab) => void; onRequestDelete?: (lab: Lab) => void; onOpenDetail: (lab: Lab) => void }) {
  const IconComponent = lab.icon || Database

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative p-6 rounded-3xl bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer"
      onClick={() => onOpenDetail(lab)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${lab.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${lab.gradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header with icon and metadata */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center shadow-lg shadow-purple-500/25 transition-transform group-hover:scale-105`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${
                lab.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                lab.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {lab.difficulty}
              </span>
              <span className="text-xs text-slate-400 mt-1">{lab.duration}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium text-white">{lab.rating}</span>
            </div>
            <span className="text-xs text-slate-400">{lab.students} students</span>
          </div>
        </div>

        {/* Title and description */}
        <div className="flex-1 mb-4">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all line-clamp-2">
            {lab.title}
          </h3>
          <p className="text-sm text-slate-400 mb-3 line-clamp-3">{lab.description}</p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs font-medium text-slate-300">
              {lab.instructorAvatar}
            </div>
            <span className="text-xs text-slate-400">by {lab.instructor}</span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
              {lab.category}
            </span>
            {(lab.tags || []).slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (lab.link) window.open(lab.link, '_blank')
              }}
              className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors"
            >
              Open
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRequestEdit(lab)
              }}
              className="px-3 py-1 bg-slate-800/40 hover:bg-slate-700/40 rounded-md text-sm text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              Edit
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onRequestDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRequestDelete(lab)
                }}
                title="Delete lab"
                className="p-2 rounded-md bg-red-600/10 hover:bg-red-600/20 text-red-300 border border-red-700/20"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                alert(`Launching ${lab.title}`)
              }}
              className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-sm text-white shadow-md"
            >
              Launch
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function LabDetailModal({ lab, onClose, onRequestEdit, onRequestDelete }: { lab: Lab; onClose: () => void; onRequestEdit: (lab: Lab) => void; onRequestDelete?: (lab: Lab) => void }) {
  const [sqlSchema, setSqlSchema] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [erDiagram, setErDiagram] = useState<string | null>(null)
  const [relationshipDiagram, setRelationshipDiagram] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'code' | 'resources'>('overview')

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

  const [scrollY, setScrollY] = useState(0)

  // Save animation state to localStorage
  useEffect(() => {
    localStorage.setItem('animation-playing', JSON.stringify(isPlaying))
  }, [isPlaying])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/labs?labId=${encodeURIComponent(lab.id)}`)
        const data = await res.json()
        if (res.ok && data?.doc) {
          setSqlSchema(data.doc.sqlSchema || '')
          // In a real app, you'd fetch the actual diagram files here
          // For now, we'll just set placeholder states
          setErDiagram(data.doc.erDiagram || null)
          setRelationshipDiagram(data.doc.relationshipDiagram || null)
        }
      } catch (e) {
        console.error('Failed to fetch lab details:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchLabDetails()
  }, [lab.id])

  const IconComponent = lab.icon || Database

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'code', label: 'Code Examples', icon: Code },
    { id: 'resources', label: 'Resources', icon: Database }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{lab.title}</h2>
              <p className="text-slate-400">{lab.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onRequestEdit(lab)}
              className="px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              Edit
            </button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-6 border-b border-slate-800">
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-800/40 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${lab.gradient} flex items-center justify-center mx-auto mb-2`}>
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{lab.duration}</div>
                    <div className="text-xs text-slate-400">Duration</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${lab.gradient} flex items-center justify-center mx-auto mb-2`}>
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{lab.rating}</div>
                    <div className="text-xs text-slate-400">Rating</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${lab.gradient} flex items-center justify-center mx-auto mb-2`}>
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{lab.students}</div>
                    <div className="text-xs text-slate-400">Students</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${lab.gradient} flex items-center justify-center mx-auto mb-2`}>
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{lab.quizQuestions}</div>
                    <div className="text-xs text-slate-400">Questions</div>
                  </div>
                </div>

                {/* Instructor & Difficulty */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/20 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Instructor</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-lg font-medium text-slate-300">
                        {lab.instructorAvatar}
                      </div>
                      <div>
                        <div className="font-medium text-white">{lab.instructor}</div>
                        <div className="text-sm text-slate-400">Database Expert</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/20 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Lab Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Difficulty:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lab.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                          lab.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {lab.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="text-white">{lab.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Environment:</span>
                        <span className="text-white">{lab.environment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Version:</span>
                        <span className="text-white">{lab.version}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="bg-slate-800/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {lab.prerequisites.map((prereq, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-slate-800/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {lab.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                {/* Topics Covered */}
                <div className="bg-slate-800/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Topics Covered</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {lab.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lab Statistics */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{lab.quizQuestions}</div>
                    <div className="text-sm text-slate-400">Quiz Questions</div>
                  </div>
                  <div className="bg-slate-800/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{lab.handsOnExercises}</div>
                    <div className="text-sm text-slate-400">Hands-on Exercises</div>
                  </div>
                  <div className="bg-slate-800/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{lab.collaborators || 0}</div>
                    <div className="text-sm text-slate-400">Collaborators</div>
                  </div>
                </div>

                {/* Technologies Used */}
                <div className="bg-slate-800/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {lab.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'code' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                {lab.codeExamples.map((example, index) => (
                  <div key={index} className="bg-slate-800/20 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">{example.title}</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <pre className="text-sm text-slate-300 overflow-x-auto">
                        <code className={`language-${example.language}`}>{example.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                {/* SQL Schema */}
                <div className="bg-slate-800/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">SQL Schema</h3>
                  {loading ? (
                    <div className="p-8 text-center">
                      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-400">Loading schema...</p>
                    </div>
                  ) : sqlSchema ? (
                    <pre className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-slate-300 overflow-x-auto">
                      {sqlSchema}
                    </pre>
                  ) : (
                    <div className="p-8 text-center bg-slate-900/20 border border-slate-700 rounded-lg">
                      <p className="text-slate-400">No SQL schema available</p>
                    </div>
                  )}
                </div>

                {/* Diagrams */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* ER Diagram */}
                  <div className="bg-slate-800/20 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">ER Diagram</h3>
                    {loading ? (
                      <div className="h-48 bg-slate-900/20 border border-slate-700 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : erDiagram ? (
                      <div className="bg-slate-900/20 border border-slate-700 rounded-lg p-4">
                        <img
                          src={erDiagram}
                          alt="ER Diagram"
                          className="w-full h-48 object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-slate-900/20 border border-slate-700 rounded-lg flex items-center justify-center">
                        <p className="text-slate-400">No ER diagram available</p>
                      </div>
                    )}
                  </div>

                  {/* Relationship Diagram */}
                  <div className="bg-slate-800/20 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Relationship Model</h3>
                    {loading ? (
                      <div className="h-48 bg-slate-900/20 border border-slate-700 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : relationshipDiagram ? (
                      <div className="bg-slate-900/20 border border-slate-700 rounded-lg p-4">
                        <img
                          src={relationshipDiagram}
                          alt="Relationship Model"
                          className="w-full h-48 object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-slate-900/20 border border-slate-700 rounded-lg flex items-center justify-center">
                        <p className="text-slate-400">No relationship model available</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onRequestEdit(lab)}
              className="px-6 py-3 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              Edit Lab
            </button>
            {onRequestDelete && (
              <button
                onClick={() => onRequestDelete(lab)}
                className="px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-300 border border-red-700/20 rounded-xl transition-colors"
              >
                Delete Lab
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-400">
              Last updated: {lab.lastUpdated}
            </div>
            <button
              onClick={() => alert(`Launching ${lab.title}`)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
            >
              Launch Lab
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LabsPage() {
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [instructorFilter, setInstructorFilter] = useState<string | null>(null)
  // Lab data
    const [labs, setLabs] = useState<Lab[]>(defaultLabs)
  const [loadingLabs, setLoadingLabs] = useState(false)
  const [creating, setCreating] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  // Load animation state from localStorage after mount
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
  const [showAdd, setShowAdd] = useState(false)
  const [passcodeInput, setPasscodeInput] = useState("")
  const [passcodeVerified, setPasscodeVerified] = useState(false)
  const [showPassPrompt, setShowPassPrompt] = useState(false)
  const [pendingAction, setPendingAction] = useState<null | 'openCreate' | 'openEdit' | 'delete'>(null)
  const [editingLab, setEditingLab] = useState<Lab | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Lab | null>(null)
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null) // New state for detail modal
  
  // resource fields for sidebar
  const [erFile, setErFile] = useState<File | null>(null)
  const [relFile, setRelFile] = useState<File | null>(null)
  const [sqlSchema, setSqlSchema] = useState("")
  const [erPreview, setErPreview] = useState<string | null>(null)
  const [relPreview, setRelPreview] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newTags, setNewTags] = useState("")
  const [newLink, setNewLink] = useState("")
  const PASSCODE = 'letmein123'

  const tags = useMemo(() => {
    const set = new Set()
    ;(labs || []).forEach((l) => (l.tags || []).forEach((t) => set.add(t)))
    return Array.from(set) as string[]
  }, [labs])

  const filtered = useMemo(() => {
    return (labs || []).filter((lab) => {
      const hay = (lab.title + " " + lab.description + " " + (lab.tags || []).join(" ") + " " + lab.instructor + " " + lab.category + " " + lab.environment).toLowerCase()
      const matchesQuery = query.trim() ? hay.includes(query.toLowerCase()) : true
      const matchesTag = activeTag ? (lab.tags || []).includes(activeTag) : true
      const matchesDifficulty = difficultyFilter ? lab.difficulty === difficultyFilter : true
      const matchesCategory = categoryFilter ? lab.category === categoryFilter : true
      const matchesInstructor = instructorFilter ? lab.instructor === instructorFilter : true
      return matchesQuery && matchesTag && matchesDifficulty && matchesCategory && matchesInstructor
    })
  }, [labs, query, activeTag, difficultyFilter, categoryFilter, instructorFilter])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoadingLabs(true)
        const res = await fetch('/api/labs/meta')
        const data = await res.json()
        if (!mounted) return
        if (res.ok && data?.labs) {
          // Merge API labs with default labs, keeping default data for existing labs
          const apiLabs = data.labs.map((d: any) => ({ id: d.id, title: d.title, description: d.description, tags: d.tags || [], link: d.link || '#' }))
          const mergedLabs = defaultLabs.map(defaultLab => {
            const apiLab = apiLabs.find((al: any) => al.id === defaultLab.id)
            return apiLab ? { ...defaultLab, ...apiLab } : defaultLab
          })
          // Add any new labs from API that aren't in defaults
          const newLabs = apiLabs.filter((al: any) => !defaultLabs.some(dl => dl.id === al.id))
          setLabs([...mergedLabs, ...newLabs])
        } else {
          // Use default labs if API fails
          setLabs(defaultLabs)
        }
      } catch (err) {
        // Use default labs if API fails
        setLabs(defaultLabs)
      } finally {
        if (mounted) setLoadingLabs(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  // Clear previews when the sidebar is closed
  useEffect(() => {
    if (!showAdd) {
      setErPreview(null)
      setRelPreview(null)
    }
  }, [showAdd])

  const handleOpenDetail = (lab: Lab) => {
    setSelectedLab(lab)
  }

  const handleCloseDetail = () => {
    setSelectedLab(null)
  }

  const handleRequestOpenCreate = () => {
    if (passcodeVerified) {
      setEditingLab(null)
      setShowAdd(true)
    } else {
      setPendingAction('openCreate')
      setShowPassPrompt(true)
    }
  }

  const handleRequestEdit = (lab: Lab) => {
    if (passcodeVerified) {
      setEditingLab(lab)
      setNewTitle(lab.title)
      setNewDescription(lab.description)
      setNewTags((lab.tags || []).join(','))
      setNewLink(lab.link || '')
      ;(async () => {
        try {
          const res = await fetch(`/api/labs?labId=${encodeURIComponent(lab.id)}`)
          const data = await res.json()
          if (res.ok && data?.doc) {
            setSqlSchema(data.doc.sqlSchema || '')
          }
        } catch (e) {}
      })()
      setShowAdd(true)
    } else {
      setPendingAction('openEdit')
      setEditingLab(lab)
      setShowPassPrompt(true)
    }
  }

  const handleRequestDelete = (lab: Lab) => {
    if (passcodeVerified) {
      if (!confirm(`Delete lab "${lab.title}"? This cannot be undone.`)) return
      void handleDeleteConfirmed(lab)
    } else {
      setPendingAction('delete')
      setDeleteTarget(lab)
      setShowPassPrompt(true)
    }
  }

  const handleDeleteConfirmed = async (lab: Lab) => {
    try {
      const res = await fetch(`/api/labs/meta?labId=${encodeURIComponent(lab.id)}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        alert(data?.error || 'Failed to delete lab')
        return
      }
      setLabs((s) => s.filter((l) => l.id !== lab.id))
      if (editingLab && editingLab.id === lab.id) {
        setShowAdd(false)
        setEditingLab(null)
      }
      if (selectedLab && selectedLab.id === lab.id) {
        setSelectedLab(null)
      }
    } catch (err: any) {
      alert(err?.message || 'Error deleting lab')
    } finally {
      setPendingAction(null)
      setDeleteTarget(null)
    }
  }

  const handleVerifyPasscode = () => {
    if (passcodeInput === PASSCODE) {
      setPasscodeVerified(true)
      setShowPassPrompt(false)
      setPasscodeInput("")
      if (pendingAction === 'openCreate') {
        setEditingLab(null)
        setShowAdd(true)
      } else if (pendingAction === 'openEdit' && editingLab) {
        setNewTitle(editingLab.title)
        setNewDescription(editingLab.description)
        setNewTags((editingLab.tags || []).join(','))
        setNewLink(editingLab.link || '')
        ;(async () => {
          try {
            const res = await fetch(`/api/labs?labId=${encodeURIComponent(editingLab.id)}`)
            const data = await res.json()
            if (res.ok && data?.doc) {
              setSqlSchema(data.doc.sqlSchema || '')
            }
          } catch (e) {}
        })()
        setShowAdd(true)
      } else if (pendingAction === 'delete' && deleteTarget) {
        // proceed with deletion after passcode verification
        void handleDeleteConfirmed(deleteTarget)
      }
      setPendingAction(null)
    } else {
      alert('Incorrect passcode')
    }
  }

  const handleCreateOrUpdate = async () => {
    try {
      setCreating(true)
      const tagsArr = newTags.split(',').map(t => t.trim()).filter(Boolean)
      const payload: any = { title: newTitle || 'Untitled Lab', description: newDescription || '', tags: tagsArr, link: newLink || '#' }
      if (editingLab) payload.id = editingLab.id

      const res = await fetch('/api/labs/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) {
        alert(data?.error || 'Failed to save lab')
        return
      }

      const savedLab = data.lab

      if (erFile || relFile || sqlSchema) {
        const fd = new FormData()
        fd.append('labId', savedLab.id)
        if (erFile) fd.append('erDiagram', erFile, erFile.name)
        if (relFile) fd.append('relationship', relFile, relFile.name)
        if (sqlSchema) fd.append('sqlSchema', sqlSchema)
        await fetch('/api/labs', { method: 'POST', body: fd })
      }

      setLabs((s) => [savedLab, ...s.filter(l => l.id !== savedLab.id)])
      setNewTitle('')
      setNewDescription('')
      setNewTags('')
      setNewLink('')
      setErFile(null)
      setRelFile(null)
      setErPreview(null)
      setRelPreview(null)
      setSqlSchema('')
      setEditingLab(null)
      setShowAdd(false)
    } catch (err: any) {
      alert(err?.message || 'Error')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-24 relative overflow-hidden">
      <Background isPlaying={isPlaying} />

      {/* Navigation */}
      <Navbar
        currentPage="Labs"
        subtitle="Database Labs"
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Database className="w-7 h-7 text-white" />
              </div>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quantum Labs
              </h1>
              <p className="text-slate-400 mt-2">Interactive database experiments and research playground</p>
            </div>
          </div>

          <motion.button 
            onClick={handleRequestOpenCreate}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Lab
          </motion.button>
        </motion.header>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6 p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
        >
          {/* Search */}
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                aria-label="Search labs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-900/40 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Search labs, instructors, categories, or descriptions..."
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tags Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Tags</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(null)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTag === null 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                  }`}
                >
                  All Tags
                </motion.button>
                {tags.slice(0, 3).map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTag === tag 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Target className="w-4 h-4" />
                <span className="text-sm">Difficulty</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDifficultyFilter(null)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    difficultyFilter === null 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                  }`}
                >
                  All Levels
                </motion.button>
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDifficultyFilter(difficultyFilter === level ? null : level)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      difficultyFilter === level 
                        ? `bg-gradient-to-r ${
                            level === 'Beginner' ? 'from-green-500 to-emerald-500' :
                            level === 'Intermediate' ? 'from-yellow-500 to-orange-500' :
                            'from-red-500 to-pink-500'
                          } text-white shadow-lg` 
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Database className="w-4 h-4" />
                <span className="text-sm">Category</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategoryFilter(null)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    categoryFilter === null 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                  }`}
                >
                  All Categories
                </motion.button>
                {Array.from(new Set(labs.map(lab => lab.category))).slice(0, 2).map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategoryFilter(categoryFilter === category ? null : category)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      categoryFilter === category 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25' 
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Instructor Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <User className="w-4 h-4" />
                <span className="text-sm">Instructor</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInstructorFilter(null)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    instructorFilter === null 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25' 
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                  }`}
                >
                  All Instructors
                </motion.button>
                {Array.from(new Set(labs.map(lab => lab.instructor))).slice(0, 2).map((instructor) => (
                  <motion.button
                    key={instructor}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInstructorFilter(instructorFilter === instructor ? null : instructor)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      instructorFilter === instructor 
                        ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25' 
                        : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
                    }`}
                  >
                    {instructor?.split(' ')[0] || 'Unknown'}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(activeTag || difficultyFilter || categoryFilter || instructorFilter) && (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTag(null)
                  setDifficultyFilter(null)
                  setCategoryFilter(null)
                  setInstructorFilter(null)
                  setQuery('')
                }}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl text-white shadow-lg shadow-slate-600/25 hover:shadow-xl hover:shadow-slate-600/40 transition-all"
              >
                Clear All Filters
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Labs Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
        >
          {filtered.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl">
              <div className="w-16 h-16 bg-slate-800/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No labs found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setQuery(''); setActiveTag(null); }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg shadow-purple-500/25"
              >
                Clear Filters
              </motion.button>
            </div>
          ) : (
            filtered.map((lab) => (
              <LabCard 
                key={lab.id} 
                lab={lab} 
                onRequestEdit={handleRequestEdit} 
                onRequestDelete={handleRequestDelete} 
                onOpenDetail={handleOpenDetail}
              />
            ))
          )}
        </motion.div>

        {/* Mobile Floating Action Button */}
        <motion.button 
          onClick={handleRequestOpenCreate}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 z-50"
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Lab Detail Modal */}
      <AnimatePresence>
        {selectedLab && (
          <LabDetailModal 
            lab={selectedLab}
            onClose={handleCloseDetail}
            onRequestEdit={handleRequestEdit}
            onRequestDelete={handleRequestDelete}
          />
        )}
      </AnimatePresence>

      {/* Add/Edit Lab Sidebar */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-50">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setShowAdd(false)} 
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full lg:w-[480px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {editingLab ? 'Edit Lab' : 'Create Lab'}
                    </h2>
                    <p className="text-slate-400 text-sm">Configure your database experiment</p>
                  </div>
                  <motion.button 
                    onClick={() => setShowAdd(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Lab Title</label>
                      <input 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        placeholder="Enter lab title"
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Description</label>
                      <input 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        placeholder="Brief description of the lab"
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Tags</label>
                      <input 
                        value={newTags} 
                        onChange={(e) => setNewTags(e.target.value)} 
                        placeholder="comma,separated,tags"
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">External Link</label>
                      <input 
                        value={newLink} 
                        onChange={(e) => setNewLink(e.target.value)} 
                        placeholder="https://..."
                        className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Lab Resources
                    </h3>

                    <div className="space-y-6">
                      {/* ER Diagram */}
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-3 block">ER Diagram</label>
                        <div className="space-y-3">
                          <input 
                            id="er-input" 
                            type="file" 
                            accept=".dia,image/*" 
                            onChange={(e) => {
                              const f = e.target.files?.[0] ?? null
                              setErFile(f)
                              if (f && f.type.startsWith('image/')) {
                                const reader = new FileReader()
                                reader.onload = () => setErPreview(String(reader.result))
                                reader.readAsDataURL(f)
                              } else {
                                setErPreview(null)
                              }
                            }} 
                            className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-colors"
                          />
                          {erFile && (
                            <div className="text-sm text-slate-400 bg-slate-800/20 rounded-lg p-3">
                              Selected: {erFile.name}
                            </div>
                          )}
                          {erPreview && (
                            <div className="mt-2">
                              <img src={erPreview} alt="ER preview" className="rounded-lg border border-slate-700 max-h-48 w-full object-contain" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Relationship Model */}
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-3 block">Relationship Model</label>
                        <div className="space-y-3">
                          <input 
                            id="rel-input" 
                            type="file" 
                            accept=".dia,image/*" 
                            onChange={(e) => {
                              const f = e.target.files?.[0] ?? null
                              setRelFile(f)
                              if (f && f.type.startsWith('image/')) {
                                const reader = new FileReader()
                                reader.onload = () => setRelPreview(String(reader.result))
                                reader.readAsDataURL(f)
                              } else {
                                setRelPreview(null)
                              }
                            }} 
                            className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition-colors"
                          />
                          {relFile && (
                            <div className="text-sm text-slate-400 bg-slate-800/20 rounded-lg p-3">
                              Selected: {relFile.name}
                            </div>
                          )}
                          {relPreview && (
                            <div className="mt-2">
                              <img src={relPreview} alt="Relationship preview" className="rounded-lg border border-slate-700 max-h-48 w-full object-contain" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SQL Schema */}
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-3 block">SQL Schema</label>
                        <textarea 
                          value={sqlSchema} 
                          onChange={(e) => setSqlSchema(e.target.value)} 
                          rows={8} 
                          placeholder="CREATE TABLE users (...);"
                          className="w-full p-3 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors text-sm font-mono resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-800">
                    <div className="text-xs text-slate-500 flex-1">
                      Supported: .dia files, images. Image files show previews.
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button 
                        onClick={() => { setShowAdd(false); setEditingLab(null); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                      >
                        Cancel
                      </motion.button>
                      <motion.button 
                        onClick={handleCreateOrUpdate}
                        disabled={creating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {creating ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {editingLab ? 'Updating...' : 'Creating...'}
                          </span>
                        ) : (
                          editingLab ? 'Update Lab' : 'Create Lab'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Passcode Prompt */}
      <AnimatePresence>
        {showPassPrompt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setShowPassPrompt(false)} 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Authentication Required</h3>
                <p className="text-slate-400">Enter passcode to modify labs</p>
              </div>
              
              <input 
                value={passcodeInput} 
                onChange={(e) => setPasscodeInput(e.target.value)} 
                type="password"
                placeholder="Enter passcode"
                className="w-full p-4 rounded-xl bg-slate-800/40 border border-slate-700 focus:border-purple-500/50 focus:outline-none transition-colors mb-6"
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyPasscode()}
              />
              
              <div className="flex gap-3">
                <motion.button 
                  onClick={() => setShowPassPrompt(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-colors border border-slate-700"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  onClick={handleVerifyPasscode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                >
                  Verify
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

