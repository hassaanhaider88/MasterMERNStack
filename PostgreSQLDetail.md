# PostgreSQL Complete Guide — Basic to Advanced (2026)

Deep reference, every concept + real-world example. Terse prose, full technical depth, code exact.

---

## Table of Contents

1. [Intro: What Postgres Is, Why Exists](#1-intro-what-postgres-is-why-exists)
2. [Core Concepts & Data Model](#2-core-concepts--data-model)
3. [Installation & Setup](#3-installation--setup)
4. [psql — Basic Commands](#4-psql--basic-commands)
5. [Data Types — Deep Dive](#5-data-types--deep-dive)
6. [DDL: Tables, Constraints, Indexes](#6-ddl-tables-constraints-indexes)
7. [DML: CRUD & SELECT — Deep Dive](#7-dml-crud--select--deep-dive)
8. [Joins, Subqueries, CTEs](#8-joins-subqueries-ctes)
9. [Window Functions](#9-window-functions)
10. [Functions, Procedures, Triggers](#10-functions-procedures-triggers)
11. [Transactions & Concurrency (MVCC)](#11-transactions--concurrency-mvcc)
12. [Indexes & Performance](#12-indexes--performance)
13. [Views & Materialized Views](#13-views--materialized-views)
14. [JSON / JSONB — Deep Dive](#14-json--jsonb--deep-dive)
15. [Full-Text Search](#15-full-text-search)
16. [Partitioning](#16-partitioning)
17. [Replication & High Availability](#17-replication--high-availability)
18. [Backup & Restore](#18-backup--restore)
19. [Security & Roles](#19-security--roles)
20. [Extensions Ecosystem](#20-extensions-ecosystem)
21. [Connection Pooling](#21-connection-pooling)
22. [Monitoring & Performance Tuning](#22-monitoring--performance-tuning)
23. [Advanced / Modern Features (2024–2026)](#23-advanced--modern-features-20242026)
24. [PostgreSQL in Node.js (pg / TypeORM / Prisma / Drizzle)](#24-postgresql-in-nodejs-pg--typeorm--prisma--drizzle)
25. [Best Practices & Anti-Patterns](#25-best-practices--anti-patterns)
26. [Full Real-World Project: E-Commerce API](#26-full-real-world-project-e-commerce-api)
27. [Cheat Sheet / Quick Reference](#27-cheat-sheet--quick-reference)

---

## 1. Intro: What Postgres Is, Why Exists

PostgreSQL = relational, object-oriented DB. Strict schema, strong typing, full SQL standard + extensions. Rows in tables, tables tied by foreign keys, integrity enforced by constraints — opposite philosophy from MongoDB's flexible documents.

**Problem it solves:** e-commerce order needs strict correctness — `order.user_id` must reference real user, `amount` can't go negative, two orders can't double-spend same inventory unit under concurrent load. Relational model + ACID transactions + constraints make these guarantees *at the database level*, not just app code. App bug can't insert an order for nonexistent user — DB rejects it outright (FK violation).

```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL DEFAULT 'pending'
);
-- Insert with bad user_id → rejected immediately, no app-side check needed
```

### When Postgres over Mongo (and vice versa)

| Pick Postgres when... | Pick Mongo when... |
|---|---|
| Data relational, many entities reference each other (banking, inventory, ERP) | Data hierarchical/nested, read as one blob (catalogs, CMS) |
| Need strict multi-table integrity (FKs, CHECK constraints) | Schema evolves fast, structure varies per doc |
| Need complex joins, aggregate reporting, window functions | Need horizontal write scale across many servers |
| Team already SQL-fluent, needs mature tooling/ORMs | Need built-in geospatial/vector/full-text in one system |
| Regulatory/financial data needing strong consistency guarantees | Read-heavy, denormalized-for-speed workloads |

Real deployments: Postgres runs Instagram's core data, Stripe-style fintech ledgers, most SaaS backends via Supabase/Neon/RDS, and — since `pgvector` — a growing share of production RAG/AI-app vector stores too.

---

## 2. Core Concepts & Data Model

### 2.1 Database

One Postgres **cluster** (a running server instance) hosts many **databases**. Each fully isolated — no cross-database queries without extensions (`postgres_fdw`, `dblink`). Different from Mongo, where a client casually switches DBs mid-session; in Postgres, one connection = one database, period.

```sql
CREATE DATABASE ecommerce;
\c ecommerce
```

### 2.2 Schema

Namespace *inside* a database — groups tables logically. Default schema: `public`. Real-world use: multi-tenant SaaS puts each large customer in own schema (`tenant_acme`, `tenant_globex`) inside one database, sharing connection pool + backup routine but isolating table namespaces.

```sql
CREATE SCHEMA blog;
CREATE TABLE blog.posts (id BIGSERIAL PRIMARY KEY, title TEXT);
SET search_path TO blog, public;   -- default schema resolution order for session
```

### 2.3 Table / Row / Tuple

Table = structured rows, fixed columns, fixed types (unlike Mongo's flexible docs). Row = one record. Internally called "tuple" (MVCC versioning terminology — see 2.5).

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.4 MVCC (Multi-Version Concurrency Control)

Core mechanism making Postgres fast under concurrent load. Instead of locking rows for reads, every `UPDATE`/`DELETE` writes a **new row version**, old version kept until no transaction needs it anymore, then `VACUUM` reclaims space. Result: readers never block writers, writers never block readers (only writer-vs-writer on same row conflicts).

**Real-world payoff:** analytics dashboard running heavy `SELECT` against `orders` table doesn't block checkout `INSERT`s hitting same table simultaneously — impossible in older lock-based systems, standard behavior in Postgres.

### 2.5 Transaction Isolation Levels

| Level | Prevents | Real-world use |
|---|---|---|
| READ UNCOMMITTED | Nothing extra (Postgres treats same as READ COMMITTED) | N/A — Postgres doesn't implement dirty reads |
| READ COMMITTED (default) | Dirty reads | Most app code — each statement sees latest committed data |
| REPEATABLE READ | Dirty + non-repeatable reads | Report generation — same query run twice in one txn returns identical snapshot |
| SERIALIZABLE | All anomalies incl. phantom reads/write skew | Financial transfers, seat booking — full correctness under concurrency, cost = possible retry on conflict |

Deep dive + real transfer example in Section 11.

---

## 3. Installation & Setup

### 3.1 Managed (recommended, fastest path)

Skip ops. Options: **Supabase** (Postgres + auth + realtime + storage, generous free tier), **Neon** (serverless Postgres, branching like git), **AWS RDS/Aurora**, **Railway**, **DigitalOcean Managed DB**. Sign up, copy connection string:

```
postgresql://user:pass@host.neon.tech:5432/mydb?sslmode=require
```

### 3.2 Local install

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16
```

### 3.3 Docker (fastest local dev)

```bash
docker run -d --name pg \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=myapp \
  -p 5432:5432 \
  -v pg_data:/var/lib/postgresql/data \
  postgres:16
```

Real-world pattern: Docker Compose for local dev, managed Postgres (Supabase/RDS) for staging + prod — same as Mongo workflow, environment parity via `DATABASE_URL` env var swap.

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    ports: ["5432:5432"]
    volumes: ["pg_data:/var/lib/postgresql/data"]
volumes:
  pg_data:
```

---

## 4. psql — Basic Commands

```bash
psql -U postgres -d mydb -h localhost
psql "postgresql://user:pass@host:5432/mydb"
```

### Navigation

```
\l               list databases
\c mydb          connect to database
\dt              list tables (current schema)
\dt *.*          list tables across all schemas
\d+ users        describe table — columns, types, indexes, constraints, size
\dn              list schemas
\du              list roles/users
\df              list functions
\dv               list views
\x               toggle expanded output (readable wide rows)
\timing          toggle query timing display
\?               help — all backslash commands
\h SELECT        SQL syntax help for a command
\q               quit
```

### Scripting

```
\i script.sql            execute file
\o output.txt            redirect query output to file
\copy table TO 'f.csv' CSV HEADER    export table to CSV (client-side, no server file perms needed)
```

**Real-world debugging habit:** `\x auto` early in every session — auto-switches to expanded (vertical) display whenever a row is too wide for the terminal, saves constant manual toggling when inspecting wide tables like `orders` with 20+ columns.

---

## 5. Data Types — Deep Dive

### 5.1 Numeric

```sql
SMALLINT      -- 2 bytes, -32768 to 32767
INTEGER       -- 4 bytes, standard counter/FK type
BIGINT        -- 8 bytes, use for high-volume IDs (event logs, IoT)
SMALLSERIAL / SERIAL / BIGSERIAL   -- auto-incrementing, sugar for INTEGER + sequence
NUMERIC(precision, scale)          -- exact, arbitrary precision — USE FOR MONEY
DECIMAL                            -- alias for NUMERIC
REAL / DOUBLE PRECISION            -- floating point, NEVER for money (rounding errors compound)
money                              -- discouraged: locale-dependent formatting, awkward arithmetic
```

Real-world rule, same as Mongo: `price NUMERIC(12,2) NOT NULL` for any currency field. `DOUBLE PRECISION` on a ledger accumulates rounding drift over thousands of transactions — audit will eventually catch a mismatch.

### 5.2 Character

```sql
CHAR(n)      -- fixed-length, padded with spaces — rarely right choice
VARCHAR(n)   -- variable length, capped
TEXT         -- variable length, unlimited — PREFERRED default in Postgres (no perf penalty vs VARCHAR)
```

Real-world: just use `TEXT` everywhere unless a hard business-rule length limit exists (e.g., `VARCHAR(2)` for a country code) — Postgres doesn't optimize `VARCHAR(255)` any better than `TEXT`, unlike MySQL's old row-size assumptions.

### 5.3 Boolean

```sql
BOOLEAN   -- true / false / null (three-valued logic — null means unknown, not false)
```

### 5.4 Temporal

```sql
DATE                          -- just a date, no time
TIME [WITH TIME ZONE]         -- time only, avoid WITH TIME ZONE (confusing, rarely what you want)
TIMESTAMP [WITHOUT TIME ZONE] -- date+time, no zone info — ambiguous across regions
TIMESTAMPTZ                   -- date+time, stored UTC internally, converted on display — PREFERRED
INTERVAL                      -- duration: '3 days', '2 hours 30 minutes'
```

Real-world rule: **always `TIMESTAMPTZ`**, never plain `TIMESTAMP`, for anything user-facing across timezones — a `created_at TIMESTAMP` column becomes a nightmare the moment your app serves users in more than one timezone, since Postgres stores it with zero zone context and app code has to guess.

```sql
SELECT NOW() - INTERVAL '30 days';   -- 30 days ago, timezone-safe
```

### 5.5 JSON / JSONB

```sql
JSON    -- stored as exact text, re-parsed every read, no indexing support — rarely the right choice
JSONB   -- stored as parsed binary, indexable, faster ops — PREFERRED
```

Real-world use — a `products` table with a variable `specs` field per category (same problem Mongo's Attribute Pattern solves):
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specs JSONB
);
INSERT INTO products (name, specs) VALUES
  ('4K TV', '{"screenSize": "55in", "resolution": "4K"}'),
  ('Running Shoe', '{"size": 10, "width": "wide"}');
```

Operators:
```sql
specs @> '{"resolution": "4K"}'   -- contains — does specs include this key/value?
specs ? 'screenSize'              -- has key?
specs ?& array['screenSize','resolution']  -- has ALL these keys?
specs ?| array['screenSize','size']        -- has ANY of these keys?
specs -> 'screenSize'             -- get value (as jsonb)
specs ->> 'screenSize'            -- get value (as text)
specs #> '{a,b}'                  -- get nested value by path
```
GIN index makes these fast even at millions of rows — see Section 6.3/12.

### 5.6 Arrays

```sql
CREATE TABLE posts (id BIGSERIAL PRIMARY KEY, tags TEXT[]);
INSERT INTO posts (tags) VALUES ('{postgres,database,tutorial}');
SELECT * FROM posts WHERE 'postgres' = ANY(tags);
SELECT * FROM posts WHERE tags && ARRAY['postgres','mysql'];   -- overlap — any shared element
```
Real-world use: simple bounded tag lists — same territory Mongo handles with an embedded array. For anything unbounded/queried heavily, still better as a join table (`post_tags`).

### 5.7 UUID

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- provides gen_random_uuid() natively since PG 13+
CREATE TABLE sessions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), ...);
```
Real-world use: public-facing IDs (API resource IDs, session tokens) where you don't want to leak row count/insert order the way a sequential `BIGSERIAL` does. Trade-off: UUID primary keys are 4x the storage of `BIGINT` and hurt index locality (random insert order) — many teams use `BIGSERIAL` internally + expose a separate `UUID` "public_id" column for external use.

### 5.8 Range Types

```sql
CREATE TABLE bookings (room_id INT, during TSTZRANGE);
INSERT INTO bookings VALUES (101, '[2026-07-14 09:00, 2026-07-14 10:00)');

-- prevent overlapping bookings for same room, enforced by the DB itself
ALTER TABLE bookings ADD CONSTRAINT no_overlap
  EXCLUDE USING gist (room_id WITH =, during WITH &&);
```
Real-world win: meeting-room or hotel-booking systems get double-booking prevention as a **database constraint**, not fragile app-layer logic — an `EXCLUDE` constraint physically cannot be bypassed by a race condition the way an app-level check-then-insert can.

### 5.9 Geometric & Network Types

```sql
POINT, LINE, BOX, PATH, POLYGON, CIRCLE   -- native 2D geometry (PostGIS extension goes far beyond this for real GIS)
CIDR, INET, MACADDR                        -- IP/network data, validated + indexable natively
```
Real-world: an access-log table storing `client_ip INET` gets built-in subnet queries (`WHERE client_ip << '10.0.0.0/8'`) without string parsing.

### 5.10 Other

```sql
BYTEA               -- raw binary data (small files, hashes)
TSVECTOR / TSQUERY  -- full-text search types, see Section 15
XML                 -- rare in modern apps, legacy integration only
```

---

## 6. DDL: Tables, Constraints, Indexes

### 6.1 CREATE TABLE

```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6.2 Constraints — deep dive, each with real-world reason

```sql
-- PRIMARY KEY: unique + not null, one per table, usually the clustering-adjacent id
id BIGSERIAL PRIMARY KEY

-- UNIQUE: no duplicate values, multiple allowed per table
email TEXT UNIQUE NOT NULL

-- NOT NULL: field always required
name TEXT NOT NULL

-- CHECK: arbitrary boolean expression enforced on every row
amount NUMERIC CHECK (amount > 0)
age INT CHECK (age BETWEEN 0 AND 130)

-- FOREIGN KEY + referential actions
user_id BIGINT REFERENCES users(id) ON DELETE CASCADE   -- delete user → delete their orders
category_id INT REFERENCES categories(id) ON DELETE RESTRICT  -- block deleting category if orders reference it
manager_id BIGINT REFERENCES employees(id) ON DELETE SET NULL -- manager leaves → reports become unmanaged, not deleted
```

**Real-world choice matters:** `ON DELETE CASCADE` on `orders.user_id` means deleting a user wipes their entire order history — fine for a test account cleanup script, catastrophic for GDPR-style "delete my account" if finance needs order records retained for tax law. Real systems often use `ON DELETE RESTRICT` + a separate anonymization routine instead of hard delete + cascade.

### 6.3 Indexes

```sql
CREATE INDEX idx_users_email ON users(email);                       -- standard btree, default type
CREATE UNIQUE INDEX idx_orders_user_status ON orders(user_id, status)
  WHERE status = 'active';                                          -- partial — smaller, faster, targeted
CREATE INDEX idx_products_specs ON products USING GIN (specs);      -- JSONB containment queries
CREATE INDEX idx_posts_tags ON posts USING GIN (tags);              -- array membership queries
CREATE INDEX idx_stores_location ON stores USING GIST (location);   -- geometric/range nearest-neighbor
CREATE INDEX idx_events_time ON events USING BRIN (created_at);     -- huge append-only tables, tiny index
```

Index type cheat: **btree** (default, equality/range/sort — 95% of cases) · **GIN** (JSONB, arrays, full-text — "does this contain X") · **GiST** (geometric, range types, nearest-neighbor) · **BRIN** (block range — massive time-ordered tables like logs, index is tiny because it stores min/max per block, not per row) · **Hash** (equality only, rarely worth it over btree).

Real-world BRIN win: a 500-million-row `events` table storing IoT telemetry, insert-ordered by `created_at`. A btree index on `created_at` would be huge (tracks every row). BRIN index tracks only min/max timestamp per disk block — a few MB instead of GBs, and still fast for range queries because data is naturally clustered by insert order.

### 6.4 Generated Columns

```sql
ALTER TABLE users ADD COLUMN full_name TEXT
  GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED;
```
Computed once at write time, stored on disk, indexable. Real-world use: computed search-friendly fields, denormalized totals kept in sync automatically — no app code or trigger needed to keep `full_name` correct when `first_name`/`last_name` change.

---

## 7. DML: CRUD & SELECT — Deep Dive

Running example, same as Mongo guide: `products` table for e-commerce store.

### 7.1 INSERT

```sql
INSERT INTO products (name, price, category, stock)
VALUES ('Wireless Mouse', 24.99, 'Electronics', 150);

-- Multi-row insert — one round trip, much faster than looping
INSERT INTO products (name, price, category) VALUES
  ('USB-C Hub', 39.99, 'Electronics'),
  ('Laptop Stand', 29.99, 'Accessories');

-- INSERT ... SELECT — copy/derive rows from another table
INSERT INTO archived_orders SELECT * FROM orders WHERE created_at < NOW() - INTERVAL '2 years';

-- Upsert: ON CONFLICT DO UPDATE
INSERT INTO inventory_counts (warehouse, sku, count)
VALUES ('LHR-1', 'KB-BLK-01', 10)
ON CONFLICT (warehouse, sku) DO UPDATE SET count = inventory_counts.count + EXCLUDED.count;
```

`EXCLUDED` = the row that *would've* been inserted, reference it inside `DO UPDATE` — same idempotent-write pattern as Mongo's `upsert: true`.

### 7.2 SELECT

```sql
SELECT id, name, price
FROM products
WHERE category = 'Electronics' AND price BETWEEN 10 AND 50 AND stock > 0
ORDER BY price ASC
LIMIT 20 OFFSET 40;
```

**Real-world pagination warning, identical lesson to Mongo:** `OFFSET` on large tables scans + discards every skipped row — slow at depth. Fix: **keyset/cursor pagination**, same idea as Mongo's `_id`-based paging:

```sql
-- Page 1
SELECT id, name, price FROM products ORDER BY id LIMIT 20;
-- Page 2 — instead of OFFSET 20, filter past the last seen id
SELECT id, name, price FROM products WHERE id > 8734 ORDER BY id LIMIT 20;
```

### 7.3 UPDATE

```sql
UPDATE users SET last_login = NOW() WHERE id = 123;

-- Atomic decrement, same purpose as Mongo's $inc — prevents overselling under concurrent purchases
UPDATE products SET stock = stock - 1 WHERE id = 42 AND stock > 0;
-- check affected row count in app code — 0 rows updated means out of stock, reject the sale
```

**Why the `WHERE stock > 0` guard matters:** without it, two concurrent buyers could both read `stock=1` in app code, both decide "in stock," both `UPDATE ... SET stock = stock - 1`, ending at `stock = -1`. Doing the check *inside* the `UPDATE`'s `WHERE` clause makes it atomic — Postgres' row-level locking during the update guarantees only one of two concurrent updates "wins" the last unit; exact same lesson Mongo teaches with `$inc`.

```sql
-- UPDATE ... RETURNING — get the modified row back without a separate SELECT
UPDATE products SET price = price * 0.9 WHERE category = 'Electronics' RETURNING id, name, price;
```

### 7.4 DELETE

```sql
DELETE FROM orders WHERE status = 'cancelled' AND created_at < NOW() - INTERVAL '90 days';
```

**Real-world soft-delete pattern**, same as Mongo:
```sql
ALTER TABLE products ADD COLUMN deleted_at TIMESTAMPTZ;
UPDATE products SET deleted_at = NOW() WHERE id = 42;
-- every read query then adds: WHERE deleted_at IS NULL
-- partial index enforces uniqueness only among non-deleted rows:
CREATE UNIQUE INDEX idx_products_sku_active ON products(sku) WHERE deleted_at IS NULL;
```

### 7.5 RETURNING — get data back from any write

```sql
INSERT INTO orders (user_id, amount) VALUES (1, 89.99) RETURNING id, created_at;
DELETE FROM sessions WHERE expires_at < NOW() RETURNING id;   -- know exactly what got purged
```
Real-world value: skip a redundant `SELECT` after every `INSERT`/`UPDATE` — one round trip instead of two, meaningful at high request volume.

---

## 8. Joins, Subqueries, CTEs

### 8.1 Joins — deep dive

```sql
-- INNER JOIN: only rows matching in both tables
SELECT o.id, u.email FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- LEFT JOIN: all rows from left table, matched or NULL from right
-- Real-world use: list every product, showing review count as 0 if it has none, not omitting it
SELECT p.name, COUNT(r.id) AS review_count
FROM products p
LEFT JOIN reviews r ON r.product_id = p.id
GROUP BY p.id, p.name;

-- RIGHT JOIN: mirror of LEFT — rarely used, usually rewritten as LEFT JOIN with tables swapped
-- FULL OUTER JOIN: all rows from both sides, NULLs where no match
-- Real-world use: reconciliation report — orders with no matching payment record, AND payments with no matching order
SELECT o.id AS order_id, p.id AS payment_id
FROM orders o
FULL OUTER JOIN payments p ON o.id = p.order_id
WHERE o.id IS NULL OR p.id IS NULL;

-- CROSS JOIN: cartesian product — every row of A with every row of B
-- Real-world use: generating all (warehouse × product) combinations for an inventory-count template
SELECT w.name, p.name FROM warehouses w CROSS JOIN products p;
```

### 8.2 Subqueries

```sql
-- WHERE ... IN (subquery)
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);

-- Correlated subquery — references outer query, re-evaluated per row
SELECT p.name, (
  SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id
) AS review_count
FROM products p;

-- EXISTS — often faster than IN for large subquery results, short-circuits on first match
SELECT * FROM products p
WHERE EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id AND r.rating = 5);
```

### 8.3 Common Table Expressions (CTEs)

```sql
WITH recent_orders AS (
  SELECT * FROM orders WHERE created_at > NOW() - INTERVAL '7 days'
)
SELECT u.email, COUNT(*) AS order_count
FROM users u
JOIN recent_orders ro ON u.id = ro.user_id
GROUP BY u.email;
```

Real-world value: break a gnarly multi-step report into named, readable stages — same mental model as Mongo's aggregation pipeline stages, just SQL-flavored.

**Recursive CTE** — real-world use: employee org chart, category tree traversal:
```sql
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id FROM categories WHERE parent_id IS NULL  -- anchor: root categories
  UNION ALL
  SELECT c.id, c.name, c.parent_id
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id                        -- recursive: children of what we found so far
)
SELECT * FROM category_tree;
```
Walks an arbitrarily deep `Electronics > Computers > Laptops > Gaming Laptops` hierarchy in one query — no app-side recursive loop needed.

**`MATERIALIZED` / `NOT MATERIALIZED` hint** (PG 12+): by default Postgres may inline a CTE into the outer query (like a subquery) for better planning — force materialization when you specifically want the old "optimization fence" behavior (e.g., a CTE doing an expensive one-time computation you don't want re-evaluated per outer row):
```sql
WITH expensive_calc AS MATERIALIZED (SELECT ... )
SELECT * FROM expensive_calc WHERE ...;
```

---

## 9. Window Functions

Compute a value **across a set of related rows** without collapsing them into one row (unlike `GROUP BY`) — Postgres' equivalent to Mongo's `$setWindowFields` (Section 7.4 of the Mongo guide), same purpose, native SQL syntax.

### 9.1 Ranking Functions

```sql
-- Real-world: rank customers by total spend, per region
SELECT
  region, customer, total_spend,
  ROW_NUMBER() OVER (PARTITION BY region ORDER BY total_spend DESC) AS row_num,
  RANK()       OVER (PARTITION BY region ORDER BY total_spend DESC) AS rank,       -- ties share rank, gaps after
  DENSE_RANK() OVER (PARTITION BY region ORDER BY total_spend DESC) AS dense_rank, -- ties share rank, no gaps
  NTILE(4)     OVER (PARTITION BY region ORDER BY total_spend DESC) AS quartile    -- split into 4 buckets
FROM customer_totals;
```

`ROW_NUMBER` vs `RANK` vs `DENSE_RANK` difference matters in real reports: two customers tied for 2nd place — `ROW_NUMBER` arbitrarily picks one as 2, other as 3; `RANK` gives both 2, next customer jumps to 4; `DENSE_RANK` gives both 2, next customer is 3 (no gap).

### 9.2 Value Access Functions

```sql
-- LAG/LEAD: look at previous/next row without a self-join
-- Real-world: month-over-month revenue change
SELECT
  month, revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS change_from_last_month
FROM monthly_revenue;

-- FIRST_VALUE/LAST_VALUE: first/last row in the window frame
SELECT
  customer, order_date, amount,
  FIRST_VALUE(order_date) OVER (PARTITION BY customer ORDER BY order_date) AS first_order_date
FROM orders;
```

### 9.3 Aggregate Window Functions — running totals

```sql
-- Real-world: cumulative revenue per day, for a dashboard line chart
SELECT
  order_date, daily_revenue,
  SUM(daily_revenue) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM daily_sales;

-- Moving average — real-world: 7-day rolling average to smooth noisy daily numbers
SELECT
  order_date, daily_revenue,
  AVG(daily_revenue) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7day_avg
FROM daily_sales;
```

Frame clause (`ROWS BETWEEN ... AND ...`) controls exactly which rows factor into each row's calculation — this is the part that trips up people coming from `GROUP BY` thinking; window functions keep every row while still computing an aggregate *relative to a moving window* around it.

---

## 10. Functions, Procedures, Triggers

### 10.1 Functions (return a value)

```sql
CREATE OR REPLACE FUNCTION get_full_name(first TEXT, last TEXT)
RETURNS TEXT AS $$
  SELECT first || ' ' || last;
$$ LANGUAGE SQL IMMUTABLE;

SELECT get_full_name('Ali', 'Raza');   -- 'Ali Raza'
```

`IMMUTABLE` tells the planner this always returns same output for same input — enables caching/inlining optimizations. Use `STABLE` if it reads DB state but doesn't change within a query (e.g., reads `NOW()`... actually `NOW()` itself is STABLE), `VOLATILE` (default) if it has side effects or can change per call.

**PL/pgSQL** — procedural language, needed for loops/conditionals/exception handling beyond plain SQL:
```sql
CREATE OR REPLACE FUNCTION calculate_discount(price NUMERIC, customer_tier TEXT)
RETURNS NUMERIC AS $$
BEGIN
  IF customer_tier = 'gold' THEN
    RETURN price * 0.8;
  ELSIF customer_tier = 'silver' THEN
    RETURN price * 0.9;
  ELSE
    RETURN price;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

### 10.2 Procedures (no return value, can manage own transactions)

```sql
CREATE PROCEDURE archive_old_orders()
LANGUAGE SQL
AS $$
  INSERT INTO archived_orders SELECT * FROM orders WHERE created_at < NOW() - INTERVAL '365 days';
  DELETE FROM orders WHERE created_at < NOW() - INTERVAL '365 days';
$$;

CALL archive_old_orders();
```

Real-world use: scheduled maintenance jobs (via `pg_cron`, Section 20) — nightly archival, cleanup, materialized view refreshes — packaged as a callable unit instead of a loose script.

### 10.3 Triggers — react automatically to table changes

```sql
-- Function the trigger will call
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach it
CREATE TRIGGER update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
```

**Real-world trigger use cases:**
```sql
-- 1. Auto-maintain a denormalized counter (Computed Pattern, same idea as Mongo)
CREATE OR REPLACE FUNCTION update_review_count() RETURNS TRIGGER AS $$
BEGIN
  UPDATE products SET review_count = review_count + 1 WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_review_insert
AFTER INSERT ON reviews
FOR EACH ROW EXECUTE FUNCTION update_review_count();

-- 2. Audit log — capture every change to a sensitive table
CREATE OR REPLACE FUNCTION log_salary_change() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO salary_audit (employee_id, old_salary, new_salary, changed_at)
  VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_salary
BEFORE UPDATE OF salary ON employees
FOR EACH ROW WHEN (OLD.salary IS DISTINCT FROM NEW.salary)
EXECUTE FUNCTION log_salary_change();
```

`WHEN` clause on trigger 2: only fires when salary *actually* changes, not on every unrelated column update — matters for write performance on hot tables, skip the trigger function call entirely when condition false.

**Real-world caution:** triggers are invisible magic to anyone reading application code — a developer changing `products.stock` in app code has no idea a trigger elsewhere also touches `inventory_log` unless they specifically check the schema. Use sparingly, document heavily, prefer explicit application code for anything business-critical unless enforcing true data-integrity invariants.

---

## 11. Transactions & Concurrency (MVCC)

### 11.1 Basics

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 'A' AND balance >= 500;
UPDATE accounts SET balance = balance + 500 WHERE id = 'B';
INSERT INTO transfer_log (from_acct, to_acct, amount) VALUES ('A', 'B', 500);
COMMIT;
-- if anything fails: ROLLBACK;
```

Real-world example, identical purpose to Mongo Section 12's bank transfer: all three statements succeed together, or none do. Crash between statement 2 and 3 → Postgres automatically rolls back on reconnect, Account A's balance untouched.

### 11.2 Savepoints — partial rollback within a transaction

```sql
BEGIN;
INSERT INTO orders (user_id, amount) VALUES (1, 100);
SAVEPOINT before_discount;
UPDATE orders SET amount = amount * 0.5 WHERE user_id = 1;  -- oops, wrong logic
ROLLBACK TO before_discount;                                  -- undo just this step, keep the insert
COMMIT;
```
Real-world use: a complex batch procedure with an optional risky sub-step — save a checkpoint, try the risky part, roll back just that part on failure without losing everything already done in the transaction.

### 11.3 Isolation Levels in Practice

```sql
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ... reads and writes ...
COMMIT;
```

**Real-world SERIALIZABLE example — concert ticket booking:**
```sql
BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT seats_available FROM shows WHERE id = 1;   -- app checks: seats_available > 0
UPDATE shows SET seats_available = seats_available - 1 WHERE id = 1;
INSERT INTO tickets (show_id, user_id) VALUES (1, 42);
COMMIT;
```
Under `READ COMMITTED` (default), two concurrent bookings could both read `seats_available = 1`, both decide it's available, both commit — overselling the last seat (the same class of bug the earlier `UPDATE ... WHERE stock > 0` guard fixes at the single-statement level). `SERIALIZABLE` catches this at the transaction level: Postgres detects the conflict and forces one transaction to fail with a serialization error, which the app must catch and retry. Real-world trade-off: `SERIALIZABLE` costs some throughput (occasional forced retries under contention) in exchange for airtight correctness — worth it for payments/bookings, overkill for a blog's comment counter.

### 11.4 Advisory Locks — app-level locking primitive

```sql
SELECT pg_advisory_xact_lock(12345);   -- lock released automatically at transaction end
-- ... critical section ...
```
Real-world use: a scheduled job (e.g., nightly billing run) that must never run twice concurrently across multiple app server instances — each instance tries to grab the same advisory lock key before starting; only one succeeds, others skip or wait. Lighter weight than a full row lock since it's not tied to any actual table data.

### 11.5 Deadlocks

Two transactions each holding a lock the other needs → Postgres detects the cycle and kills one automatically (returns a `deadlock_detected` error), rather than hanging forever. Real-world mitigation: always acquire locks/update rows **in a consistent order** across your whole codebase (e.g., always update the lower `user_id` first in any transfer-like operation) — eliminates the most common deadlock pattern before it happens.

---

## 12. Indexes & Performance

### 12.1 EXPLAIN ANALYZE — reading query plans

```sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123 AND status = 'shipped';
```

Key output to check:
- `Seq Scan` (bad on large tables — full table read) vs `Index Scan` / `Index Only Scan` (good) vs `Bitmap Heap Scan` (good — used when matching many-but-not-all rows, combines index lookups efficiently)
- `actual time` vs `rows` — compare estimated vs actual row counts; big mismatch means stale statistics (run `ANALYZE`) or a bad plan
- `cost=X..Y` — planner's estimate, not real time — useful for comparing plans, not for absolute timing

**Real-world debugging story, same shape as the Mongo one:** a support dashboard query on `orders` slows from 40ms to 8s after the table crosses 2M rows. `EXPLAIN ANALYZE` shows `Seq Scan on orders (cost=0.00..48213.00 rows=2000000)`. Adding `CREATE INDEX idx_orders_agent_status ON orders(support_agent_id, status)` flips it to an `Index Scan`, execution drops under 10ms — identical lesson to the Mongo `.explain()` story, different syntax.

### 12.2 Index Scan Types — when each appears

| Plan node | Meaning | When it shows up |
|---|---|---|
| Seq Scan | Reads every row in the table | No usable index, or query matches too large a fraction of the table to benefit from one |
| Index Scan | Uses index, then fetches matching rows from the table (heap) | Selective query, index exists |
| Index Only Scan | Answers entirely from the index, never touches the table | Every needed column is in the index — Postgres' version of a Mongo "covered query" |
| Bitmap Heap Scan | Builds a bitmap of matching row locations from index(es), then fetches them in physical order | Matching a moderate-to-large fraction of rows — more efficient than repeated random Index Scan lookups |

### 12.3 VACUUM, ANALYZE, and Autovacuum

Because MVCC (Section 2.4) leaves old row versions behind after `UPDATE`/`DELETE`, Postgres needs `VACUUM` to reclaim that space and keep the table from bloating.

```sql
VACUUM orders;              -- reclaim dead row space for reuse (doesn't shrink file size on disk)
VACUUM FULL orders;         -- reclaims AND shrinks file size — but takes an exclusive lock, blocks reads/writes, use only in a maintenance window
ANALYZE orders;              -- refresh planner statistics (row counts, value distributions) — critical after big data changes
VACUUM ANALYZE orders;       -- do both together, common combo
```

**Autovacuum** runs these automatically in the background by default — real-world tuning need arises on high-churn tables (millions of updates/day): default thresholds can fall behind, causing bloat and slow queries. Fix: tune per-table:
```sql
ALTER TABLE orders SET (autovacuum_vacuum_scale_factor = 0.05);  -- vacuum more aggressively than the 20% default
```
**Real-world symptom of neglecting this:** a hot `sessions` table with constant `UPDATE`s slowly balloons to 10x its "real" data size because dead tuples pile up faster than default autovacuum settings clean them — queries get progressively slower for no obvious reason until someone checks `pg_stat_user_tables` and finds a massive `n_dead_tup` count.

### 12.4 REINDEX

```sql
REINDEX INDEX idx_orders_user_id;
REINDEX TABLE orders;              -- rebuild all indexes on a table
```
Real-world need: indexes can become bloated over time (similar cause to table bloat) or corrupted after a rare crash — `REINDEX` rebuilds them clean. Use `REINDEX CONCURRENTLY` (PG 12+) in production to avoid locking the table during the rebuild.

### 12.5 Choosing the Right Index — quick decision guide

- Equality/range lookups on scalar columns → **btree** (default, just `CREATE INDEX`)
- JSONB containment (`@>`), array membership (`&&`, `@>`) → **GIN**
- Geometric, range-type overlap, nearest-neighbor → **GiST**
- Huge, naturally time-ordered append-only tables → **BRIN**
- Full-text search → **GIN** on a `tsvector` column (Section 15)
- Multi-column queries filtering on several fields together → **compound btree index**, column order matters — put the most selective/most frequently-equality-filtered column first, same ESR-style thinking as Mongo Section 8.2

---

## 13. Views & Materialized Views

### 13.1 Views — saved query, re-run live every time

```sql
CREATE VIEW active_customers AS
SELECT * FROM customers WHERE status = 'active' AND last_login_at >= NOW() - INTERVAL '90 days';

SELECT * FROM active_customers WHERE region = 'Punjab';   -- query it like a normal table
```

Real-world use, same as Mongo's view (Section 20 of Mongo guide): hide a complex join behind a simple name for other developers/BI tools, or restrict sensitive columns:
```sql
CREATE VIEW orders_for_support AS
SELECT id, user_id, status, created_at FROM orders;   -- omit payment_details, internal_notes
GRANT SELECT ON orders_for_support TO support_role;
```

### 13.2 Materialized Views — saved query, computed once, stored on disk

```sql
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT DATE_TRUNC('month', created_at) AS month, SUM(amount) AS total
FROM orders WHERE status = 'completed'
GROUP BY 1;

REFRESH MATERIALIZED VIEW monthly_revenue;                 -- re-run + replace (locks reads during refresh)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;    -- no read lock, needs a unique index on the view first
```

Real-world use, same purpose as Mongo's `$merge` materialization (Section 20.3 of Mongo guide): an expensive monthly-revenue-by-region report queried constantly on a dashboard — compute once nightly via scheduled `REFRESH` (often through `pg_cron`, Section 20), dashboard reads hit the pre-computed table instantly instead of re-aggregating raw `orders` on every page load.

**`CONCURRENTLY` requirement:** needs a unique index on the materialized view first —
```sql
CREATE UNIQUE INDEX idx_monthly_revenue_month ON monthly_revenue(month);
```
without it, refresh blocks all reads for its duration — fine for a small internal report refreshed at 3 AM, unacceptable for anything user-facing during business hours.

---

## 14. JSON / JSONB — Deep Dive

Postgres' answer to Mongo's document flexibility, usable *within* a relational table — best of both worlds when only part of your schema needs it.

### 14.1 Storing & Querying

```sql
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO events (event_type, payload) VALUES
  ('page_view', '{"url": "/products/42", "referrer": "google", "device": "mobile"}');

-- Query nested values
SELECT * FROM events WHERE payload ->> 'device' = 'mobile';
SELECT * FROM events WHERE payload @> '{"url": "/products/42"}';

-- Aggregate over JSONB fields
SELECT payload ->> 'device' AS device, COUNT(*) FROM events GROUP BY 1;
```

Real-world use: an analytics-events table where every event type has a different payload shape (`page_view` has `url`/`referrer`, `purchase` has `amount`/`items`) — modeling this as rigid columns would need dozens of nullable fields or a separate table per event type (Postgres' answer to Mongo's Polymorphic Pattern, Section 9.8 of Mongo guide, but bolted onto a normal relational table with an `event_type` discriminator column).

### 14.2 Indexing JSONB — GIN

```sql
CREATE INDEX idx_events_payload ON events USING GIN (payload);
-- now containment queries use the index:
EXPLAIN ANALYZE SELECT * FROM events WHERE payload @> '{"device": "mobile"}';
-- → Bitmap Index Scan on idx_events_payload, not a full Seq Scan
```

**Targeted index on one specific key** (smaller, faster than indexing the whole JSONB blob, when you only ever query one field):
```sql
CREATE INDEX idx_events_device ON events ((payload ->> 'device'));
```

### 14.3 Updating JSONB in Place

```sql
UPDATE events SET payload = payload || '{"processed": true}'::jsonb WHERE id = 1;   -- merge/patch keys
UPDATE products SET specs = jsonb_set(specs, '{screenSize}', '"65in"') WHERE id = 1; -- update one nested key
UPDATE products SET specs = specs - 'discontinuedSpec' WHERE id = 1;                 -- remove a key
```

### 14.4 JSON_TABLE — turning JSON into rows (PG 17+, SQL/JSON standard)

```sql
SELECT jt.*
FROM events, JSON_TABLE(payload, '$' COLUMNS (
  url TEXT PATH '$.url',
  device TEXT PATH '$.device'
)) AS jt
WHERE event_type = 'page_view';
```
Real-world value: bridge JSONB data into a normal relational row shape for tools/reports expecting flat tabular output (BI dashboards, CSV exports) — no app-side parsing loop needed.

### 14.5 When to Reach for JSONB vs. a Normal Column vs. Going Full-Mongo

- **Normal typed column:** field exists on every row, has a fixed type, is queried/indexed constantly → always prefer this, get real type-checking + smaller storage.
- **JSONB column:** a genuinely variable, sparse, or evolving sub-structure attached to an otherwise relational entity (product specs, event payloads, feature flags, user preferences) → best of both worlds.
- **Whole document DB (Mongo) instead:** if the *majority* of your schema is variable/nested rather than just one column's worth → you've outgrown "relational table with a JSONB escape hatch," reach for a document model as the primary structure instead.

---

## 15. Full-Text Search

Native search support via `tsvector` (searchable document) and `tsquery` (search terms) types — Postgres' answer to Mongo's `$text` (Mongo guide Section 6.7), similarly basic-but-solid, similarly outgrown by dedicated search engines (Elasticsearch, Atlas Search-equivalent) at real scale.

### 15.1 Basic Usage

```sql
SELECT * FROM articles
WHERE to_tsvector('english', title || ' ' || body) @@ to_tsquery('english', 'postgres & performance');
```
`to_tsvector` normalizes text (lowercasing, stemming — "running" matches "run") into searchable tokens; `to_tsquery` parses search terms with boolean operators (`&` AND, `|` OR, `!` NOT).

### 15.2 Indexed, Production-Ready Setup

Computing `to_tsvector` on every query is slow at scale — store it as a generated column, index it:

```sql
ALTER TABLE articles ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || body)) STORED;

CREATE INDEX idx_articles_search ON articles USING GIN (search_vector);

SELECT * FROM articles WHERE search_vector @@ to_tsquery('english', 'postgres & tutorial');
```

### 15.3 Ranking Results

```sql
SELECT title, ts_rank(search_vector, query) AS rank
FROM articles, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC;
```

### 15.4 Real-World Limitation, Same Lesson as Mongo

`to_tsquery` has no typo tolerance — a user typing "postgre" or "postgress" gets zero results. Real production search (typo-tolerance, fuzzy matching, relevance tuning, faceting) reaches for `pg_trgm` extension (trigram similarity, handles typos reasonably) for a lighter fix, or an external engine (Elasticsearch, Meilisearch, Algolia) for a full-featured solution — exactly the same "built-in is fine for basic cases, dedicated search engine wins at real scale" lesson from the Mongo guide's Atlas Search section.

```sql
CREATE EXTENSION pg_trgm;
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);
SELECT * FROM products WHERE name % 'keybord';   -- similarity match, tolerates the typo
```

---

## 16. Partitioning

Splits one logical table into physically separate sub-tables ("partitions") behind the scenes — queries/inserts still target the parent table name, Postgres routes to the right partition automatically. Postgres' rough parallel to Mongo's sharding (Mongo guide Section 14), but for splitting data *within one server* rather than across many.

### 16.1 Range Partitioning — most common, time-based

```sql
CREATE TABLE events (
  id BIGSERIAL,
  created_at TIMESTAMPTZ NOT NULL,
  payload JSONB
) PARTITION BY RANGE (created_at);

CREATE TABLE events_2026_06 PARTITION OF events
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE events_2026_07 PARTITION OF events
  FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');

-- Insert automatically routes to the right partition
INSERT INTO events (created_at, payload) VALUES (NOW(), '{"type": "click"}');

-- Query automatically excludes irrelevant partitions ("partition pruning")
EXPLAIN SELECT * FROM events WHERE created_at >= '2026-07-01';
-- plan shows only events_2026_07 scanned, events_2026_06 skipped entirely
```

**Real-world win, direct parallel to Mongo's Bucket Pattern (Mongo guide Section 9.4):** a 500-million-row `events` table split into monthly partitions means a query for "this month's events" only ever touches one ~40M-row partition instead of scanning the full half-billion — and dropping old data is instant:
```sql
DROP TABLE events_2024_01;   -- instant, vs. a slow DELETE FROM events WHERE created_at < ... that scans + logs every row
```

### 16.2 List Partitioning — categorical split

```sql
CREATE TABLE orders (
  id BIGSERIAL, region TEXT NOT NULL, amount NUMERIC
) PARTITION BY LIST (region);

CREATE TABLE orders_asia PARTITION OF orders FOR VALUES IN ('Punjab', 'Sindh', 'KPK');
CREATE TABLE orders_other PARTITION OF orders FOR VALUES IN ('EU', 'US');
```
Real-world use: data-residency requirements (EU orders physically stored separately) — same motivating case as Mongo's zone sharding (Mongo guide Section 14.3).

### 16.3 Hash Partitioning — even distribution, no natural range/category

```sql
CREATE TABLE sessions (id UUID, user_id BIGINT) PARTITION BY HASH (user_id);
CREATE TABLE sessions_0 PARTITION OF sessions FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE sessions_1 PARTITION OF sessions FOR VALUES WITH (MODULUS 4, REMAINDER 1);
-- ... etc for REMAINDER 2, 3
```
Same purpose as Mongo's hashed shard key (Mongo guide Section 14.3) — spread writes evenly when there's no natural range to partition on, avoiding a hot partition.

### 16.4 Real-World Gotcha — Same Lesson as Mongo's Shard Key Choice

Choosing the wrong partition key is expensive to fix later (each partition is effectively a separate table under the hood). Partition on the column your queries *actually filter by most often* — a `created_at` range partition is useless if 90% of your queries filter by `customer_id` instead; you'd scan every partition on every query, losing all pruning benefit while paying the added complexity cost.