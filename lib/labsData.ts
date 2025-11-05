// lib/labsData.ts
import { Database, BarChart3, Layers, Zap, Target, Brain, TrendingUp } from "lucide-react"

export type LabDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface LabCodeExample {
  title: string
  code: string
  language: string
}

export interface Lab {
  id: string
  title: string
  description: string
  tags?: string[]
  link?: string
  createdAt?: string
  author?: string
  category: string
  difficulty: LabDifficulty
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
  codeExamples: LabCodeExample[]
  quizQuestions: number
  handsOnExercises: number
  estimatedTime: string
  collaborators?: number
  lastUpdated?: string
  version?: string
  environment: string
  technologies: string[]
  isPreExisting?: boolean
}

export const defaultLabs: Lab[] = [
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
    tags: ["E-commerce", "Schema Design", "Order Management", "Inventory"],
    isPreExisting: true
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
    tags: ["Analytics", "Real-time", "Streaming", "Materialized Views"],
    isPreExisting: true
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
    tags: ["Multi-tenant", "SaaS", "Architecture", "Security"],
    isPreExisting: true
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
    tags: ["Migration", "ETL", "DevOps", "Data Transformation"],
    isPreExisting: true
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
    tags: ["Graph Database", "Social Network", "Cypher", "Network Analysis"],
    isPreExisting: true
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
    tags: ["Time-Series", "IoT", "Analytics", "Sensor Data"],
    isPreExisting: true
  }
]

export const PASSCODE = 'letmein123'