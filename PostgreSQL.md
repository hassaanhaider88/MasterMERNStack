# PostgreSQL

### From Basic to Advanced

PostgreSQL  
|-- Core Concepts & Data Model  
|-- Installation & Basic Commands (psql)  
|-- Data Types  
|-- DDL – Tables, Constraints, Indexes  
|-- DML – CRUD & SELECT  
|-- Joins, Subqueries, CTEs  
|-- Functions, Procedures, Triggers  
|-- Transactions & Concurrency  
|-- Performance & Indexes  
|-- Advanced Features (2024–2026)  
|-- PostgreSQL in Node.js (pg / TypeORM / Prisma / Drizzle)

### 1. Core Concepts & Data Model

```
|-- Database
    One cluster → many databases
    Each database is isolated (different schemas, users, objects)

|-- Schema
    Logical namespace inside a database (public is default)
    CREATE SCHEMA blog;

|-- Table
    CREATE TABLE users (
      id BIGSERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

|-- Row / Record / Tuple

|-- Column Types (see section 3)

|-- MVCC (Multi-Version Concurrency Control)
    → Readers don’t block writers, writers don’t block readers

|-- Transaction Isolation Levels
    READ UNCOMMITTED | READ COMMITTED (default) | REPEATABLE READ | SERIALIZABLE
```

### 2. Basic Commands (psql)

```
|-- psql -U postgres -d mydb -h localhost
    \l               → list databases
    \c mydb          → connect to database
    \dt              → list tables
    \d+ users        → describe table with details
    \dn              → list schemas
    \du              → list roles/users
    \?               → help
    \h SELECT        → syntax help for command

|-- \i filename.sql  → execute file
```

### 3. Data Types (most important in 2026)

```
|-- Numeric
    SMALLINT, INTEGER, BIGINT, SMALLSERIAL / SERIAL / BIGSERIAL
    NUMERIC(precision, scale) / DECIMAL
    REAL / DOUBLE PRECISION
    money (discouraged)

|-- Character
    CHAR(n) (fixed), VARCHAR(n), TEXT (preferred)

|-- Boolean
    BOOLEAN / BOOL

|-- Temporal
    DATE, TIME [WITH TIME ZONE], TIMESTAMP [WITHOUT TIME ZONE], TIMESTAMPTZ (preferred)
    INTERVAL

|-- JSON / JSONB
    JSON  → stored as text
    JSONB → binary, indexed, faster, operators @> <@ ? ?& ?| @?

|-- Arrays
    INTEGER[], TEXT[], JSONB[]

|-- UUID
    UUID (uuid-ossp extension or gen_random_uuid())

|-- Range Types
    INT4RANGE, DATERANGE, TSTZRANGE, etc.

|-- Geometric
    POINT, LINE, BOX, PATH, POLYGON, CIRCLE

|-- Network
    CIDR, INET, MACADDR

|-- Other
    BYTEA (binary), TSVECTOR / TSVQUERY (full-text search), XML
```

### 4. DDL – Tables, Constraints, Indexes

```
|-- CREATE TABLE
    CREATE TABLE orders (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

|-- Constraints
    PRIMARY KEY, UNIQUE, NOT NULL, CHECK, FOREIGN KEY ... ON DELETE/UPDATE (CASCADE | RESTRICT | SET NULL | SET DEFAULT | NO ACTION)

|-- Indexes
    CREATE INDEX idx_users_email ON users(email);
    CREATE UNIQUE INDEX idx_orders_user_status ON orders(user_id, status) WHERE status = 'active';  → partial
    CREATE INDEX idx_orders_gin ON orders USING GIN (tags);  → for JSONB / arrays

|-- Generated columns (stored / virtual)
    generated always as (first_name || ' ' || last_name) stored
```

### 5. DML – CRUD & SELECT

```
|-- INSERT
    INSERT INTO users (email, name) VALUES ('a@example.com', 'Hassaan')
    INSERT INTO ... SELECT ... (from other table)
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name

|-- SELECT
    SELECT id, email, created_at
    FROM users
    WHERE created_at >= NOW() - INTERVAL '30 days'
    ORDER BY created_at DESC
    LIMIT 20 OFFSET 40;

|-- UPDATE / DELETE
    UPDATE users SET last_login = NOW() WHERE id = 123
    DELETE FROM orders WHERE status = 'cancelled' AND created_at < NOW() - INTERVAL '90 days'

|-- RETURNING
    INSERT INTO ... RETURNING id, created_at
```

### 6. Joins, Subqueries, CTEs, Window Functions

```
|-- Joins
    INNER JOIN / LEFT / RIGHT / FULL OUTER JOIN / CROSS JOIN
    NATURAL JOIN / USING (column)

|-- Subqueries
    WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000)

|-- Common Table Expressions (WITH)
    WITH recent_orders AS (
      SELECT * FROM orders WHERE created_at > NOW() - INTERVAL '7 days'
    )
    SELECT u.email, COUNT(*) FROM users u
    JOIN recent_orders ro ON u.id = ro.user_id
    GROUP BY u.email;

|-- Window Functions
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at)
    RANK() / DENSE_RANK() / NTILE(4)
    LAG() / LEAD() / FIRST_VALUE() / LAST_VALUE()
    SUM(...) OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)
```

### 7. Functions, Procedures, Triggers

```
|-- Function (returns value)
    CREATE OR REPLACE FUNCTION get_full_name(first TEXT, last TEXT)
    RETURNS TEXT AS $$
      SELECT first || ' ' || last;
    $$ LANGUAGE SQL IMMUTABLE;

|-- Procedure (no return, can do DML)
    CREATE PROCEDURE archive_old_orders()
    LANGUAGE SQL
    AS $$
      DELETE FROM orders WHERE created_at < NOW() - INTERVAL '365 days';
    $$;

|-- Trigger
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
```

### 8. Transactions & Concurrency

```
|-- BEGIN; COMMIT; ROLLBACK;
    SAVEPOINT sp1; ROLLBACK TO sp1;

|-- Isolation levels
    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

|-- Advisory locks
    pg_advisory_xact_lock(key)
```

### 9. Performance & Indexes

```
|-- EXPLAIN ANALYZE SELECT ...
|-- Sequential Scan vs Index Scan vs Bitmap Heap Scan vs Index Only Scan
|-- VACUUM / ANALYZE / VACUUM FULL / REINDEX
|-- Autovacuum tuning
|-- Partitioning (declarative since PG 10)
    PARTITION BY RANGE (created_at)
```

### 10. Advanced / Modern Features (PG 16–17, 2025–2026)

```
|-- Logical Replication (publisher / subscriber)
|-- Parallel query improvements
|-- JSON_TABLE (SQL/JSON)
|-- MERGE command (UPSERT advanced)
|-- Incremental materialized views (REFRESH MATERIALIZED VIEW incrementally)
|-- pgvector (vector similarity search – very popular with AI)
    CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops)
|-- Full-text search enhancements
|-- ICU collation support improvements
|-- Built-in MERGE support (PG 15+)
```

### Minimal Modern Node.js + PostgreSQL Example (using pg + TypeScript – 2026 style)

```ts
// db.ts
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// users.ts
import { pool } from './db';

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: Date;
}

export async function getRecentUsers(): Promise<User[]> {
  const result = await pool.query<User>(`
    SELECT id, email, name, created_at
    FROM users
    WHERE created_at >= NOW() - INTERVAL '30 days'
    ORDER BY created_at DESC
    LIMIT 50
  `);
  return result.rows;
}

export async function createUser(email: string, name: string): Promise<User> {
  const result = await pool.query<User>(
    `INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *`,
    [email, name]
  );
  return result.rows[0];
}
```
