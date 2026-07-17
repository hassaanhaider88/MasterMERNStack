# The Complete MongoDB Guide — From Basic to Advanced (2026 Edition)

A deep, example-driven reference covering everything from documents and BSON to sharding, transactions, vector search, and production architecture. Every concept is paired with a real-world scenario so you understand not just *what* a feature does, but *when* and *why* you'd reach for it.

---

## Table of Contents

1. [Introduction: What MongoDB Is and Why It Exists](#1-introduction-what-mongodb-is-and-why-it-exists)
2. [Core Concepts & Data Model](#2-core-concepts--data-model)
3. [Installation & Setup](#3-installation--setup)
4. [MongoDB Shell (mongosh) & Basic Commands](#4-mongodb-shell-mongosh--basic-commands)
5. [CRUD Operations — Deep Dive](#5-crud-operations--deep-dive)
6. [Query Operators — Deep Dive](#6-query-operators--deep-dive)
7. [Aggregation Pipeline — Deep Dive](#7-aggregation-pipeline--deep-dive)
8. [Indexes & Performance](#8-indexes--performance)
9. [Schema Design Patterns](#9-schema-design-patterns)
10. [Data Modeling: Embedding vs. Referencing](#10-data-modeling-embedding-vs-referencing)
11. [Drivers & Node.js Integration](#11-drivers--nodejs-integration)
12. [Transactions (Multi-Document ACID)](#12-transactions-multi-document-acid)
13. [Replication & Replica Sets](#13-replication--replica-sets)
14. [Sharding](#14-sharding)
15. [Administration & Security](#15-administration--security)
16. [Backup & Restore](#16-backup--restore)
17. [Change Streams](#17-change-streams)
18. [GridFS — Storing Large Files](#18-gridfs--storing-large-files)
19. [Schema Validation](#19-schema-validation)
20. [Views](#20-views)
21. [Capped Collections & Time Series Collections](#21-capped-collections--time-series-collections)
22. [Monitoring & Performance Tuning](#22-monitoring--performance-tuning)
23. [Advanced / Modern Features (2024–2026)](#23-advanced--modern-features-20242026)
24. [MongoDB Atlas](#24-mongodb-atlas)
25. [Best Practices & Anti-Patterns](#25-best-practices--anti-patterns)
26. [Full Real-World Project: E-Commerce API](#26-full-real-world-project-e-commerce-api)
27. [Cheat Sheet / Quick Reference](#27-cheat-sheet--quick-reference)

---

## 1. Introduction: What MongoDB Is and Why It Exists

MongoDB is a **document-oriented NoSQL database**. Instead of storing data in rows and columns like a relational database (MySQL, PostgreSQL), it stores data as **BSON documents** — binary-encoded JSON-like objects — grouped into **collections**.

### Why it exists: the problem it solves

Imagine you're building an e-commerce product catalog. In a relational database, a single product might require joining 5–6 tables: `products`, `product_variants`, `product_images`, `product_reviews`, `product_specs`, `categories`. Every time you fetch a product page, you run a multi-table `JOIN`.

In MongoDB, you model the product as **one document** that contains its variants, images, and specs as nested arrays/objects. One query, one round trip, no joins:

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Wireless Mechanical Keyboard",
  "price": 89.99,
  "category": "Electronics/Keyboards",
  "variants": [
    { "color": "Black", "sku": "KB-BLK-01", "stock": 42 },
    { "color": "White", "sku": "KB-WHT-01", "stock": 17 }
  ],
  "images": ["kb-black-1.jpg", "kb-black-2.jpg"],
  "specs": { "switchType": "Brown", "connectivity": "Bluetooth 5.0", "battery": "4000mAh" },
  "avgRating": 4.6,
  "reviewCount": 312
}
```

This is the core trade-off to understand for the rest of this guide: **MongoDB optimizes for how your application reads and writes data, not for eliminating data duplication.** Relational databases normalize data to avoid redundancy; MongoDB often *denormalizes* (duplicates) data deliberately so a single query can satisfy a whole page load.

### When to choose MongoDB vs. a relational database

| Use MongoDB when... | Use a relational DB when... |
|---|---|
| Your data is naturally hierarchical/nested (catalogs, CMS content, user profiles) | You need complex multi-table joins with strict referential integrity |
| Schema evolves frequently (startups, rapid iteration) | Schema is stable and well-understood (accounting, banking ledgers) |
| You need horizontal scale-out across many servers | You need strong, complex multi-row transactions across many tables |
| You're storing semi-structured or polymorphic data (IoT events, logs, activity feeds) | You need heavy reporting/OLAP with ad-hoc SQL joins |
| You want geospatial, full-text, or vector search built in | You're already deeply invested in SQL tooling/ORMs |

Real companies using MongoDB in production: e-commerce catalogs (eBay), content management (Forbes), IoT telemetry pipelines, gaming leaderboards (Electronic Arts), and increasingly, **AI application memory/RAG stores** via Atlas Vector Search.

---

## 2. Core Concepts & Data Model

### 2.1 Document

A **document** is the basic unit of data in MongoDB — analogous to a *row* in SQL, but far more flexible. It's stored as **BSON** (Binary JSON), a binary-encoded superset of JSON that adds types JSON doesn't have natively (dates, binary data, ObjectId, Decimal128, etc.).

- **Max document size: 16 MB.** This is a deliberate ceiling to keep documents fast to transfer over the wire and to discourage unbounded array growth (see Section 9's "Bucket Pattern" for how time-series data works around this).
- Fields can hold **any BSON type**, including other documents (nesting) and arrays of documents.
- Field order is preserved but generally shouldn't be relied upon for logic.

**Real-world example:** A user profile document for a SaaS app naturally nests preferences and addresses instead of needing three separate tables:

```json
{
  "_id": ObjectId("650f1e2a3b4c5d6e7f8a9b0c"),
  "email": "hassan@example.com",
  "name": "Hassaan Haider",
  "createdAt": ISODate("2025-03-14T10:00:00Z"),
  "preferences": { "theme": "dark", "newsletter": true, "language": "en" },
  "addresses": [
    { "type": "home", "city": "Lahore", "zip": "54000" },
    { "type": "work", "city": "Karachi", "zip": "74200" }
  ],
  "roles": ["user", "beta-tester"]
}
```

### 2.2 Collection

A **collection** is a grouping of documents — analogous to a *table*, but **schema-less by default**: two documents in the same collection can have entirely different fields. This flexibility is powerful but double-edged; Section 19 (Schema Validation) shows how to add guardrails when you need them.

- Naming: lowercase is conventional (`users`, `orders`, `product_catalog`).
- Cannot start with `system.` (reserved for internal collections) or contain `$`.
- Collections are created automatically on first insert, or explicitly with `db.createCollection()` (required if you want options like capped size, validation rules, or a time-series config upfront).

### 2.3 Database

A single MongoDB server (or cluster) can host **multiple databases**, each an isolated namespace of collections — similar to how one MySQL server hosts multiple schemas.

- Naming restrictions: no `/ \ . " $` or null characters; case-sensitive on Linux/Mac.
- Reserved database names: `admin` (auth/privileges), `local` (replication metadata, never replicated itself), `config` (sharding metadata).
- **Real-world pattern:** a multi-tenant SaaS product might use one database per large enterprise customer (`db_acme_corp`, `db_globex`) for strong data isolation, while smaller customers share a `db_shared` database with a `tenantId` field on every document.

### 2.4 ObjectId

Every document needs a unique `_id` field, MongoDB's primary key. If you don't supply one, MongoDB auto-generates an **ObjectId** — a 12-byte identifier:

```
| 4 bytes: Unix timestamp | 5 bytes: random value (per process) | 3 bytes: incrementing counter |
```

This structure means ObjectIds are **roughly sortable by creation time** without needing a separate `createdAt` field — a trick many real applications rely on (e.g., `db.orders.find().sort({ _id: -1 }).limit(10)` gets the 10 most recent orders cheaply). You can extract the embedded timestamp:

```js
ObjectId("650f1e2a3b4c5d6e7f8a9b0c").getTimestamp()
// ISODate("2023-09-24T12:34:34.000Z")
```

You can also supply your own `_id` (a string, a number, a compound object) — useful when your data already has a natural unique key, like an email address or an external system's UUID, to avoid a redundant index.

### 2.5 BSON Types Reference

| Type | Example | Notes |
|---|---|---|
| Double | `3.14` | Default number type from most drivers |
| String | `"hello"` | UTF-8 |
| Object | `{ a: 1 }` | Embedded document |
| Array | `[1, 2, 3]` | Can hold mixed types |
| Binary Data | `BinData(0, "...")` | Files, hashes, encrypted blobs |
| ObjectId | `ObjectId("...")` | 12-byte unique identifier |
| Boolean | `true` / `false` | |
| Date | `ISODate("2026-01-01")` | Stored as 64-bit ms since Unix epoch, UTC |
| Null | `null` | |
| Regular Expression | `/^abc/i` | Usable directly in queries |
| Int32 | `NumberInt(42)` | 32-bit integer |
| Timestamp | internal | **Not** the same as `Date` — used internally for oplog ordering, don't use for app data |
| Int64 (Long) | `NumberLong(123456789012)` | 64-bit integer |
| Decimal128 | `NumberDecimal("19.99")` | Exact decimal — **use this for money**, never `Double` |
| MinKey / MaxKey | internal | Comparison boundaries, used in sharding |

**Real-world gotcha:** A fintech app storing prices as `Double` (`19.99`) will eventually hit floating-point rounding errors after enough aggregation (`$sum`) across thousands of transactions. Always use `Decimal128` for currency:

```js
db.invoices.insertOne({ amount: NumberDecimal("1999.95"), currency: "USD" })
```

---

## 3. Installation & Setup

You have three realistic paths in 2026:

### 3.1 MongoDB Atlas (cloud, recommended for most projects)

Atlas is MongoDB's managed cloud service. For learning or a real production app, this is the fastest path — a free M0 cluster gives you 512 MB of storage with no credit card required.

1. Create an account at `cloud.mongodb.com`.
2. Create a free cluster, choose a cloud provider/region close to your users.
3. Add a database user (username/password or SCRAM auth) and whitelist your IP (or `0.0.0.0/0` for development only — never in production).
4. Copy the connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```

### 3.2 Local install (Linux/Mac/Windows)

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

### 3.3 Docker (fastest for local dev/testing)

```bash
docker run -d --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -v mongo_data:/data/db \
  mongo:7.0
```

**Real-world tip:** most teams run MongoDB via Docker Compose alongside their app for local dev, then point staging/production at Atlas — keeping environment parity without managing a real cluster locally:

```yaml
# docker-compose.yml
services:
  mongo:
    image: mongo:7.0
    ports: ["27017:27017"]
    volumes: ["mongo_data:/data/db"]
  app:
    build: .
    environment:
      MONGODB_URI: mongodb://mongo:27017/myapp
    depends_on: [mongo]
volumes:
  mongo_data:
```

---

## 4. MongoDB Shell (mongosh) & Basic Commands

`mongosh` is the modern MongoDB shell (a Node.js-based REPL, replacing the legacy `mongo` shell deprecated in v6.0). It's your primary tool for ad-hoc queries, admin tasks, and debugging.

### 4.1 Connecting

```bash
mongosh "mongodb://localhost:27017"
mongosh "mongodb+srv://cluster0.abcde.mongodb.net/myapp" --username admin
mongosh --host localhost --port 27017 --username admin --password secret --authenticationDatabase admin
```

### 4.2 Navigating databases and collections

```js
show dbs                       // list all databases
use ecommerce                  // switch to (or create) database "ecommerce"
db                             // print current database name
show collections               // list collections in current db
show users                     // list users with access to current db
db.getCollectionNames()        // programmatic version of `show collections`
db.dropDatabase()              // ⚠ deletes the current database entirely
```

### 4.3 Inspecting server & database health

```js
db.stats()                     // storage size, doc count, avg object size for current db
db.serverStatus()              // connections, memory, opcounters, uptime
db.collection.stats()          // size, index sizes, avg doc size for one collection
db.hello()                     // replica set / topology info (replaces isMaster)
db.currentOp()                 // currently running operations — vital for diagnosing a stuck server
```

**Real-world example:** you notice your app is slow. First move in `mongosh`:

```js
db.currentOp({ "secs_running": { "$gt": 5 } })
```

This surfaces any operation that's been running more than 5 seconds — often reveals a missing index causing a full collection scan under load.

### 4.4 Running JavaScript in the shell

`mongosh` is a real JS environment, so you can script repetitive admin tasks directly:

```js
// Bulk-tag all users who signed up in 2025 as "legacy"
db.users.find({ createdAt: { $lt: ISODate("2026-01-01") } }).forEach(u => {
  db.users.updateOne({ _id: u._id }, { $set: { cohort: "legacy" } });
});
```

---

## 5. CRUD Operations — Deep Dive

We'll use a running real-world example throughout this section: a `products` collection for an e-commerce store.

### 5.1 Create (Insert)

```js
// Single document
db.products.insertOne({
  name: "Wireless Mouse",
  price: 24.99,
  category: "Electronics",
  stock: 150,
  tags: ["wireless", "ergonomic"],
  createdAt: new Date()
})
// → { acknowledged: true, insertedId: ObjectId("...") }

// Multiple documents at once (much faster than looping insertOne)
db.products.insertMany([
  { name: "USB-C Hub", price: 39.99, category: "Electronics", stock: 80 },
  { name: "Laptop Stand", price: 29.99, category: "Accessories", stock: 200 }
])
// → { acknowledged: true, insertedIds: { '0': ObjectId(...), '1': ObjectId(...) } }
```

**Real-world note:** `insertMany` by default is **ordered** — if document 3 of 10 fails validation, documents 1–2 are inserted and 4–10 are *not attempted*. Pass `{ ordered: false }` when importing a large batch (e.g., a CSV of 10,000 products) and you want MongoDB to skip bad rows and insert everything else rather than stopping at the first failure:

```js
db.products.insertMany(bigBatch, { ordered: false })
```

### 5.2 Read (Find)

```js
// Find all products under $30, sorted cheapest first
db.products.find({ price: { $lt: 30 } }).sort({ price: 1 })

// Find one specific product by id
db.products.findOne({ _id: ObjectId("650f1e2a3b4c5d6e7f8a9b0c") })

// Pagination: page 3, 20 items per page
db.products.find().sort({ createdAt: -1 }).skip(40).limit(20)

// Projection: only return name and price, hide _id
db.products.find({ category: "Electronics" }, { name: 1, price: 1, _id: 0 })
```

**Real-world pagination warning:** `.skip()` gets progressively slower on large collections because MongoDB still has to walk past every skipped document. For a product catalog with millions of items, use **range-based (cursor) pagination** instead — remember the last seen `_id` and query past it:

```js
// Page 1
db.products.find().sort({ _id: 1 }).limit(20)
// Page 2 — instead of skip(20), use the last _id from page 1
db.products.find({ _id: { $gt: lastSeenId } }).sort({ _id: 1 }).limit(20)
```

### 5.3 Update

```js
// $set — update specific fields, leave the rest untouched
db.products.updateOne(
  { _id: ObjectId("650f1e2a3b4c5d6e7f8a9b0c") },
  { $set: { price: 21.99, "meta.lastEdited": new Date() } }
)

// $inc — atomically increment/decrement a number (crucial for counters, inventory)
db.products.updateOne(
  { _id: ObjectId("650f1e2a3b4c5d6e7f8a9b0c") },
  { $inc: { stock: -1 } }        // decrement stock by 1 on each sale
)

// $push — append to an array (e.g., adding a review)
db.products.updateOne(
  { _id: productId },
  { $push: { reviews: { user: "alice", rating: 5, comment: "Great!" } } }
)

// $addToSet — like $push but avoids duplicates (e.g., unique tags)
db.products.updateOne({ _id: productId }, { $addToSet: { tags: "bestseller" } })

// $pull — remove matching elements from an array
db.products.updateOne({ _id: productId }, { $pull: { tags: "discontinued" } })

// updateMany — apply to every matching document
db.products.updateMany(
  { category: "Electronics" },
  { $mul: { price: 0.9 } }       // 10% off every electronics item $mul use of multiplying with number
)

// upsert — update if it exists, insert if it doesn't (idempotent writes)
db.inventory_counts.updateOne(
  { warehouse: "LHR-1", sku: "KB-BLK-01" },
  { $inc: { count: 10 } },
  { upsert: true }
)
```

**Why `$inc` matters in the real world:** if you instead did `find()` → read `stock` in app code → subtract 1 → `updateOne` to write it back, two simultaneous purchases could both read `stock: 1`, both decide it's available, and both "succeed" — overselling your last unit. `$inc` is **atomic at the document level**, so concurrent decrements are always safe without extra locking.

### 5.4 Replace

`replaceOne` swaps an *entire* document (except `_id`) — different from `updateOne`, which only touches the fields you specify:

```js
db.products.replaceOne(
  { _id: productId },
  { name: "Wireless Mouse v2", price: 27.99, category: "Electronics", stock: 100 }
)
```

⚠ Any field not in the replacement document (like `tags` or `reviews`) is **deleted**. This is a common real-world bug when developers mean to use `updateOne` with `$set` but call `replaceOne` instead and wipe out nested data.

### 5.5 Delete

```js
db.products.deleteOne({ _id: productId })
db.products.deleteMany({ stock: 0, discontinued: true })   // cleanup job
```

**Real-world pattern — soft deletes:** production apps rarely hard-delete user-facing data. Instead:

```js
db.products.updateOne({ _id: productId }, { $set: { deletedAt: new Date() } })
// then every read query adds: { deletedAt: null }
```
This preserves audit trails and lets you "undelete," at the cost of remembering to filter deleted docs everywhere (a partial index — Section 8 — helps enforce this).

### 5.6 Bulk Operations

When you need to make many different writes efficiently in one round trip (e.g., processing a batch of 500 cart checkouts), `bulkWrite` beats looping individual calls:

```js
db.products.bulkWrite([
  { insertOne: { document: { name: "New Item", price: 9.99 } } },
  { updateOne: { filter: { sku: "KB-BLK-01" }, update: { $inc: { stock: -5 } } } },
  { deleteOne: { filter: { sku: "DISCONTINUED-1" } } },
  { updateMany: { filter: { category: "Old" }, update: { $set: { archived: true } } } }
], { ordered: false })
```
Real-world win: a nightly inventory-sync job reconciling 50,000 SKUs against a supplier feed runs in one network round trip instead of 50,000, dropping sync time from minutes to seconds.

---

## 6. Query Operators — Deep Dive

### 6.1 Comparison Operators

| Operator | Meaning | Example |
|---|---|---|
| `$eq` | equals | `{ status: { $eq: "active" } }` (same as `{ status: "active" }`) |
| `$ne` | not equals | `{ status: { $ne: "banned" } }` |
| `$gt` / `$gte` | greater than / or equal | `{ age: { $gt: 18 } }` |
| `$lt` / `$lte` | less than / or equal | `{ price: { $lte: 100 } }` |
| `$in` | value in array | `{ category: { $in: ["Electronics", "Toys"] } }` |
| `$nin` | value not in array | `{ status: { $nin: ["banned", "suspended"] } }` |

**Real-world example — flash sale query:** find in-stock electronics priced between $10–$50:
```js
db.products.find({
  category: "Electronics",
  price: { $gte: 10, $lte: 50 },
  stock: { $gt: 0 }
})
```

### 6.2 Logical Operators

```js
// $and (usually implicit — top-level fields are AND'd by default)
db.orders.find({ $and: [{ status: "shipped" }, { total: { $gt: 100 } }] })

// $or — at least one condition matches
db.users.find({ $or: [{ role: "admin" }, { role: "moderator" }] })

// $nor — none of the conditions match
db.products.find({ $nor: [{ stock: 0 }, { discontinued: true }] })

// $not — negates a condition (used inside a field, not top-level)
db.products.find({ price: { $not: { $gt: 100 } } })
```

**Real-world example — fraud-risk query combining AND/OR:**
```js
// Flag orders that are (high value AND new account) OR (many failed payment attempts)
db.orders.find({
  $or: [
    { $and: [{ total: { $gt: 1000 } }, { "customer.accountAgeDays": { $lt: 3 } }] },
    { failedPaymentAttempts: { $gte: 3 } }
  ]
})
```

### 6.3 Element Operators

```js
db.users.find({ phoneNumber: { $exists: true } })       // has the field at all
db.users.find({ middleName: { $exists: false } })       // field is absent
db.products.find({ price: { $type: "double" } })        // check BSON type
db.orders.find({ items: { $size: 3 } })                 // array has exactly 3 elements
```

### 6.4 Array Operators

```js
// $all — array contains ALL specified values (order doesn't matter)
db.products.find({ tags: { $all: ["wireless", "bestseller"] } })

// $elemMatch — at least one array element matches ALL given conditions simultaneously
db.products.find({
  reviews: { $elemMatch: { rating: { $gte: 4 }, verified: true } }
})
```

**Why `$elemMatch` matters — a classic real-world bug:** without it, this query
```js
db.products.find({ "reviews.rating": { $gte: 4 }, "reviews.verified": true })
```
matches a product if *any* review has rating ≥ 4 **and separately** *any* review is verified — they don't have to be the *same* review! If review #1 has `rating: 5, verified: false` and review #2 has `rating: 2, verified: true`, this document still (incorrectly) matches. `$elemMatch` fixes this by requiring one single array element to satisfy both conditions.

### 6.5 Evaluation Operators

```js
// $regex — pattern matching (use a text index instead for large-scale search, see below)
db.products.find({ name: { $regex: "^Wireless", $options: "i" } })

// $expr — compare two fields within the SAME document
db.orders.find({ $expr: { $gt: ["$amountPaid", "$amountDue"] } })   // overpayments

// $jsonSchema — validate structure inline in a query (more common in schema validation, Section 19)
db.products.find({ $jsonSchema: { required: ["price"], properties: { price: { minimum: 0 } } } })

// $mod — modulo
db.orders.find({ orderNumber: { $mod: [2, 0] } })   // even order numbers
```

**Real-world `$expr` example:** find every order where the customer was charged more than the cart total (a billing bug):
```js
db.orders.find({ $expr: { $gt: ["$chargedAmount", "$cartTotal"] } })
```

### 6.6 Geospatial Operators

MongoDB has native geospatial support once you create a `2dsphere` index:

```js
db.stores.createIndex({ location: "2dsphere" })

// Find stores within 5km of a user's GPS position
db.stores.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [74.3587, 31.5204] }, // [lng, lat] — Lahore
      $maxDistance: 5000  // meters
    }
  }
})

// Find all delivery zones that contain a given point
db.deliveryZones.find({
  boundary: { $geoIntersects: { $geometry: { type: "Point", coordinates: [74.3587, 31.5204] } } }
})
```

**Real-world use case:** a food delivery app uses `$near` to power "restaurants near me," and `$geoIntersects` to check "is this address inside our delivery radius" before allowing checkout.

### 6.7 Text Search

```js
db.articles.createIndex({ title: "text", body: "text" })

db.articles.find({ $text: { $search: "mongodb aggregation performance" } })

// Rank by relevance
db.articles.find(
  { $text: { $search: "mongodb performance" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```
Real-world note: `$text` is fine for basic keyword search on a blog or docs site. For a real production search experience (typo-tolerance, fuzzy matching, faceting, autocomplete), use **Atlas Search** (built on Lucene, covered in Section 23) instead.

---

## 7. Aggregation Pipeline — Deep Dive

The aggregation pipeline is MongoDB's framework for transforming and analyzing data — think of it as a series of data-processing stages, each taking the previous stage's output as input, similar to Unix pipes.

**Real-world scenario for this section:** a `sales` collection for an online store, and we want various business reports from it.

```js
// Sample document shape
{
  _id: ObjectId("..."),
  customer: "alice@example.com",
  region: "Punjab",
  status: "completed",
  items: [
    { product: "Keyboard", qty: 1, price: 89.99 },
    { product: "Mouse", qty: 2, price: 24.99 }
  ],
  amount: 139.97,
  date: ISODate("2026-06-15")
}
```

### 7.1 Core Stages

**`$match`** — filters documents (put this early to shrink the pipeline's working set, ideally so it can use an index):
```js
{ $match: { status: "completed", date: { $gte: ISODate("2026-01-01") } } }
```

**`$group`** — the workhorse for aggregation, groups documents by a key and computes per-group values:
```js
{
  $group: {
    _id: "$region",
    totalRevenue: { $sum: "$amount" },
    orderCount: { $sum: 1 },
    avgOrderValue: { $avg: "$amount" },
    maxOrder: { $max: "$amount" }
  }
}
```

**`$sort`, `$limit`, `$skip`** — same semantics as in `find()`, but usable mid-pipeline:
```js
{ $sort: { totalRevenue: -1 } }, { $limit: 5 }
```

**`$project` / `$unset`** — reshape output, include/exclude/compute fields:
```js
{ $project: { customer: 1, amount: 1, year: { $year: "$date" } } }
```

**`$unwind`** — flattens an array field into one output document per array element (essential before grouping on array data):
```js
{ $unwind: "$items" }
```

**`$lookup`** — a left-outer join against another collection:
```js
{
  $lookup: {
    from: "customers",
    localField: "customer",
    foreignField: "email",
    as: "customerInfo"
  }
}
```

### 7.2 Full Real-World Pipeline: "Top-Selling Products Per Region This Quarter"

```js
db.sales.aggregate([
  // 1. Only completed orders this quarter
  { $match: {
      status: "completed",
      date: { $gte: ISODate("2026-04-01"), $lt: ISODate("2026-07-01") }
  }},

  // 2. Flatten line items so we can group per-product
  { $unwind: "$items" },

  // 3. Group by region + product, summing quantity and revenue
  { $group: {
      _id: { region: "$region", product: "$items.product" },
      unitsSold: { $sum: "$items.qty" },
      revenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } }
  }},

  // 4. Sort within the pipeline by revenue descending
  { $sort: { revenue: -1 } },

  // 5. Re-group by region, keeping only top 3 products per region
  { $group: {
      _id: "$_id.region",
      topProducts: { $push: { product: "$_id.product", unitsSold: "$unitsSold", revenue: "$revenue" } }
  }},
  { $project: { region: "$_id", topProducts: { $slice: ["$topProducts", 3] }, _id: 0 } }
])
```

This single query replaces what would otherwise be several application-layer loops and in-memory aggregation — pushing the heavy lifting to the database, which can use indexes and run close to the data.

### 7.3 More Essential Stages

```js
// $addFields / $set — add computed fields without dropping existing ones
{ $addFields: { profitMargin: { $subtract: ["$revenue", "$cost"] } } }

// $facet — run multiple aggregation "sub-pipelines" in parallel from the same input,
// perfect for building a single dashboard-summary API response
{
  $facet: {
    byRegion: [ { $group: { _id: "$region", total: { $sum: "$amount" } } } ],
    byStatus: [ { $group: { _id: "$status", count: { $sum: 1 } } } ],
    topOrders: [ { $sort: { amount: -1 } }, { $limit: 5 } ]
  }
}

// $bucket — histogram-style grouping into custom ranges
{
  $bucket: {
    groupBy: "$amount",
    boundaries: [0, 50, 100, 250, 500, 1000],
    default: "1000+",
    output: { count: { $sum: 1 } }
  }
}
// 0-100
// 101-300
// 301+

// $sortByCount — shorthand: group by a field and count, sorted descending
{ $sortByCount: "$region" }

// $unionWith — combine results from another collection (e.g., merging 2025 archive + current sales)
{ $unionWith: { coll: "sales_archive_2025", pipeline: [ { $match: { status: "completed" } } ] } }

// $merge — write aggregation output directly into another collection (great for materialized views)
{ $merge: { into: "daily_sales_summary", whenMatched: "replace", whenNotMatched: "insert" } }

// $replaceRoot — promote a nested object to become the top-level document
{ $replaceRoot: { newRoot: "$customerInfo" } }
```

### 7.4 Window Functions (`$setWindowFields`) — running totals, rankings

Introduced to bring SQL-style window functions (`RANK() OVER (PARTITION BY ...)`) into the aggregation pipeline — huge for analytics without exporting data elsewhere.

```js
// Running monthly revenue total per region, plus each order's rank within its region
db.sales.aggregate([
  { $setWindowFields: {
      partitionBy: "$region",
      sortBy: { date: 1 },
      output: {
        runningTotal: { $sum: "$amount", window: { documents: ["unbounded", "current"] } },
        rankInRegion: { $rank: {} }
      }
  }}
])
```

**Real-world use:** a sales dashboard showing "cumulative revenue this month" as a line chart, computed entirely in the database rather than post-processed in application code.

### 7.5 Performance Rule of Thumb

1. `$match` and `$sort` as early as possible — they can use indexes only when they're the *first* stage(s).
2. `$project`/`$unset` early to shrink documents flowing through later stages.
3. Avoid `$unwind` on huge arrays before `$match` if you can filter first.
4. Use `.explain("executionStats")` on the aggregation, same as with `find()` (see Section 8).
5. For pipelines that recompute the same expensive report repeatedly (e.g., a daily summary), use `$merge` to materialize results into a summary collection once, rather than re-aggregating raw data on every dashboard load.

---

## 8. Indexes & Performance

An index is a separate data structure (a B-tree) that lets MongoDB find documents without scanning the entire collection (a "COLLSCAN"). This is the single highest-leverage topic for real-world performance — an unindexed query on a 10-million-document collection can take seconds; the same query indexed correctly takes milliseconds.

### 8.1 Basic Indexes

```js
db.products.createIndex({ category: 1 })     // ascending
db.products.createIndex({ price: -1 })       // descending (direction matters for compound + sort)
db.products.getIndexes()                     // list all indexes on a collection
db.products.dropIndex("category_1")          // remove one
```

### 8.2 Compound Indexes

An index on multiple fields together. **Field order matters enormously** — this is one of the most common real-world MongoDB mistakes.

```js
db.orders.createIndex({ customerId: 1, status: 1, date: -1 })
```

The **ESR rule** (Equality, Sort, Range) is the standard guideline for ordering compound index fields:
1. **Equality** fields first (`customerId: 1` — an exact match)
2. **Sort** fields next (`date: -1` — if you sort results)
3. **Range** fields last (`status` if queried with `$in`/`$gt`, etc.)

**Real-world example:** an orders dashboard query:
```js
db.orders.find({ customerId: "cust_123", status: { $in: ["shipped", "delivered"] } }).sort({ date: -1 })
```
The compound index `{ customerId: 1, date: -1, status: 1 }` lets MongoDB: jump straight to this customer's orders (equality), walk them already in date order (avoiding an in-memory sort), then filter by status — all using one index, no separate sort step.

**Prefix rule:** a compound index on `{ a: 1, b: 1, c: 1 }` can also serve queries on `{ a: 1 }` alone or `{ a: 1, b: 1 }` alone, but **not** `{ b: 1 }` or `{ c: 1 }` alone — only left-to-right prefixes of the index are usable.

### 8.3 Multikey Indexes (indexing arrays)

If you index a field that holds an array, MongoDB automatically creates a "multikey" index — one index entry per array element:

```js
db.products.createIndex({ tags: 1 })
db.products.find({ tags: "wireless" })   // uses the multikey index efficiently
```

### 8.4 Text Indexes

```js
db.articles.createIndex({ title: "text", body: "text" })
```
Only one text index is allowed per collection (though it can cover multiple fields), and it can't be combined with certain other index types in a compound index.

### 8.5 Hashed Indexes (for sharding)

```js
db.users.createIndex({ userId: "hashed" })
```
Used almost exclusively as a **shard key** to spread writes evenly (see Section 14) — hashing destroys the natural ordering, so it's not useful for range queries.

### 8.6 Geospatial Indexes

```js
db.stores.createIndex({ location: "2dsphere" })  // Earth-like sphere geometry (GeoJSON)
db.grid.createIndex({ position: "2d" })          // flat plane, legacy — used for simple 2D grids/games
```

### 8.7 TTL (Time-To-Live) Indexes — automatic expiration

MongoDB will automatically delete documents once a date field passes a threshold — perfect for sessions, temporary tokens, and logs.

```js
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })   // expire after 1 hour
```

**Real-world example:** a password-reset-token collection auto-cleans itself so expired, unused tokens never linger in the database as a security liability:
```js
db.passwordResetTokens.createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 })  // 15 minutes
```

### 8.8 Partial Indexes

Index only a *subset* of documents matching a filter — smaller index, faster writes, less disk.

```js
db.orders.createIndex(
  { customerId: 1 },
  { partialFilterExpression: { status: "active" } }
)
```
**Real-world use:** enforcing a soft-delete pattern (Section 5.5) with a *unique* partial index — a product's SKU must be unique **among non-deleted** products, but you can reuse the SKU after a soft delete:
```js
db.products.createIndex(
  { sku: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null } }
)
```

### 8.9 Sparse Indexes

Only indexes documents where the field *exists* — useful for optional fields present on a minority of documents (e.g., a `referralCode` only some users have).

```js
db.users.createIndex({ referralCode: 1 }, { sparse: true, unique: true })
```

### 8.10 Collation (locale-aware / case-insensitive sorting & matching)

```js
db.products.createIndex({ name: 1 }, { collation: { locale: "en", strength: 2 } })
// strength: 2 → case-insensitive comparisons
db.products.find({ name: "keyboard" }).collation({ locale: "en", strength: 2 })  // matches "Keyboard" too
```
Real-world need: an app with international users wants "café" and "cafe" or "Motörhead"/"Motorhead" to sort/search sensibly per locale rules, not raw byte order.

### 8.11 Covered Queries

A query is "covered" when **every field it needs — both filter and projection — exists in the index itself**, so MongoDB never has to touch the actual documents on disk. These are the fastest possible reads.

```js
db.products.createIndex({ category: 1, name: 1, price: 1 })

// Covered: category is filtered, name/price are projected, _id is explicitly excluded
db.products.find(
  { category: "Electronics" },
  { name: 1, price: 1, _id: 0 }
)
```

### 8.12 Reading Query Plans with `.explain()`

```js
db.orders.find({ customerId: "cust_123" }).explain("executionStats")
```

Key fields to check in the output:
- `winningPlan.stage`: `"IXSCAN"` (good, used an index) vs `"COLLSCAN"` (bad, scanned everything)
- `executionStats.totalDocsExamined` vs `nReturned`: if examined ≫ returned, your index isn't selective enough or is missing
- `executionStats.executionTimeMillis`: raw timing

**Real-world debugging story:** a support dashboard query that used to return in 40ms started taking 8 seconds after the `orders` collection grew past 2 million documents. `.explain("executionStats")` showed `COLLSCAN` with `totalDocsExamined: 2,000,000` for a query filtering on `{ supportAgentId, status }`. Adding a compound index `{ supportAgentId: 1, status: 1 }` dropped `totalDocsExamined` to ~50 and execution time back under 10ms.

### 8.13 Index Trade-offs (the part beginners skip)

Indexes aren't free:
- Every index adds overhead to **every write** (insert/update/delete) because the index structure must also be updated.
- Indexes consume RAM — MongoDB performs best when the "working set" (frequently accessed data + indexes) fits in memory.
- **Rule of thumb:** index the fields you filter/sort on in your most frequent and most performance-sensitive queries — don't index every field "just in case." Use `db.collection.aggregate([{ $indexStats: {} }])` periodically to find and drop indexes that are never actually used.

---

## 9. Schema Design Patterns

MongoDB's flexibility means *you* decide the shape of your data. Picking the right pattern is the difference between a snappy app and one that falls over at scale. Below are the patterns that show up constantly in production systems, each with a concrete scenario.

### 9.1 Embedding Pattern (1:1, 1:few)

Store related data as a nested object/array **inside the parent document** when it's almost always read together and doesn't grow unbounded.

**Example — a blog post and its comments (if comments are capped/few):**
```json
{
  "_id": "...",
  "title": "Understanding MongoDB Indexes",
  "author": "hassan",
  "comments": [
    { "user": "alice", "text": "Great post!", "date": "..." },
    { "user": "bob", "text": "Very helpful, thanks.", "date": "..." }
  ]
}
```
One query fetches the post and its comments together — ideal for a blog with light comment volume.

### 9.2 Referencing Pattern (1:many, many:many)

Store a reference (usually the `_id`) to a related document in another collection, and join with `$lookup` when needed — just like a foreign key.

**Example — a book and its (huge, unbounded) list of reviews:**
```json
// books collection
{ "_id": "book_42", "title": "Dune", "author": "Frank Herbert" }

// reviews collection — one document per review, referencing the book
{ "_id": "...", "bookId": "book_42", "user": "sam", "rating": 5, "text": "..." }
```
If you embedded reviews directly in the book document, a wildly popular book could accumulate tens of thousands of reviews and blow past the 16MB document limit, plus every review edit would rewrite the whole (increasingly huge) book document.

### 9.3 Subset Pattern

Embed only the **most relevant slice** of a large related dataset directly, and reference the rest.

**Example — a product page showing only its 5 most recent/helpful reviews inline, with the rest paginated separately:**
```json
{
  "_id": "product_1",
  "name": "Keyboard",
  "topReviews": [ /* 5 most helpful reviews, embedded for fast page load */ ],
  "reviewCount": 312
}
```
The full review list lives in a separate `reviews` collection, queried only if the user clicks "see all reviews."

### 9.4 Bucket Pattern (time-series data)

Instead of one document per data point (which is wasteful — huge index overhead, tiny documents), group readings into time-bucketed documents.

**Example — IoT temperature sensor readings, bucketed by hour:**
```json
{
  "sensorId": "sensor_42",
  "hour": ISODate("2026-07-14T09:00:00Z"),
  "readings": [
    { "ts": ISODate("2026-07-14T09:00:12Z"), "temp": 22.4 },
    { "ts": ISODate("2026-07-14T09:00:24Z"), "temp": 22.5 }
  ],
  "count": 2,
  "sum": 44.9
}
```
Instead of one document per reading (potentially millions per sensor per day), you get one document per sensor-hour — dramatically fewer index entries and documents to scan. (Note: MongoDB's native **Time Series Collections**, Section 21, now automate this bucketing for you — the manual bucket pattern is still useful to understand and occasionally still hand-rolled for custom aggregation needs.)

### 9.5 Computed Pattern

Pre-calculate and store expensive aggregate values instead of recomputing them on every read.

**Example — instead of running `$avg` over thousands of reviews every time a product page loads:**
```json
{ "_id": "product_1", "name": "Keyboard", "avgRating": 4.6, "reviewCount": 312 }
```
Update `avgRating`/`reviewCount` incrementally whenever a new review is inserted (often via `$inc` + a recalculated average, or a scheduled batch job), trading a bit of write complexity for vastly cheaper, instant reads.

### 9.6 Outlier / Extended Reference Pattern

Handle the rare document that breaks your normal assumptions (e.g., a celebrity account with 50 million followers when 99.9% of users have under 1,000).

**Example — a social app normally embeds a user's last 20 posts on their profile document, but for the rare viral account, followers/posts overflow into a separate collection once a threshold is crossed**, keeping the "normal case" fast while gracefully degrading for outliers instead of letting one huge document blow up a shard.

### 9.7 Versioning Pattern

Keep historical versions of a document instead of overwriting, common for contracts, CMS content, or compliance-sensitive records.

```json
{ "_id": "doc_1", "version": 3, "content": "...", "previousVersions": ["doc_1_v1", "doc_1_v2"] }
```
Or store each version as a fully separate document with a shared `documentId` and a `version` number, querying `.sort({ version: -1 }).limit(1)` for "current."

### 9.8 Polymorphic Pattern

Store different "shapes" of related entities in a single collection, differentiated by a `type` field — natural fit for MongoDB's schema flexibility.

**Example — a `notifications` collection serving many notification types in one app inbox:**
```json
{ "_id": "...", "userId": "u1", "type": "friend_request", "fromUser": "u2", "read": false }
{ "_id": "...", "userId": "u1", "type": "order_shipped", "orderId": "o1", "trackingUrl": "...", "read": false }
{ "_id": "...", "userId": "u1", "type": "price_drop", "productId": "p1", "oldPrice": 99, "newPrice": 79 }
```
The app renders each differently based on `type`, but they all share pagination, read/unread status, and timestamps in one query.

### 9.9 Attribute Pattern

For documents with many optional/sparse fields that vary a lot (e.g., product specs across wildly different categories — a TV has "screen size," a shoe has "size" and "width"), move those into a flexible `attributes` array instead of dozens of sparsely-populated top-level fields:

```json
{
  "_id": "product_1",
  "name": "55-inch Smart TV",
  "attributes": [
    { "k": "screenSize", "v": "55in" },
    { "k": "resolution", "v": "4K" },
    { "k": "smartOS", "v": "GoogleTV" }
  ]
}
```
Then a single index on `attributes.k` + `attributes.v` can support filtering across *any* attribute, rather than needing a separate index per possible spec field.

---

## 10. Data Modeling: Embedding vs. Referencing

This deserves its own section because it's the #1 design decision you'll make repeatedly, and getting it wrong is the most common source of real-world MongoDB pain.

### 10.1 The Decision Framework

Ask these questions, roughly in order:

1. **Is the relationship 1:1, 1:few, 1:many, or many:many?**
   - 1:1 or 1:few (a user and their 3 shipping addresses) → **embed**.
   - 1:many where "many" is unbounded (a blog and its comments, potentially thousands) → **reference**.
   - many:many (students and courses, products and categories) → **reference**, often with an index on the reference field on both sides.

2. **Is the data read together, or independently?**
   - A product and its variants are almost always displayed together → embed.
   - A customer and their order history are usually viewed separately (customer profile page vs. order history page) → reference.

3. **How fast does the embedded array grow, and is there a ceiling?**
   - A product's 5 image URLs: bounded, safe to embed.
   - A viral post's likes (could be millions): **never embed** — reference, or better, just store a `likeCount` integer (Computed Pattern) and keep individual likes in a separate collection if you need the list.

4. **Does the embedded data change independently and frequently?**
   - If a "referenced" piece of data changes often and is embedded/duplicated in many places, every change requires updating N documents. If N is small and changes are rare, that's fine (denormalize for read speed). If N is huge or changes are frequent, reference instead.

### 10.2 Worked Example: Blog Platform

| Relationship | Cardinality | Decision | Why |
|---|---|---|---|
| Post ↔ Author | many:1 | **Reference** author's `_id`, embed a *denormalized snapshot* (`authorName`, `authorAvatar`) | Full author profile lives independently; embedding just name/avatar avoids a `$lookup` on every post list render |
| Post ↔ Tags | many:many | **Embed** tag strings directly in an array on the post | Tags are small, bounded, and always read with the post |
| Post ↔ Comments | 1:many (unbounded) | **Reference** — separate `comments` collection with `postId` | Popular posts could have thousands of comments; embedding risks the 16MB limit and makes every comment edit rewrite the whole post |
| Post ↔ View Count | 1:1 computed | **Embed as a computed field** (`viewCount: 48213`) | Cheap, frequently-read, doesn't need per-view granularity on the post itself |

### 10.3 Extended Reference (hybrid) — the pattern real systems actually use most

Most production schemas aren't pure embedding or pure referencing — they **duplicate a small, stable subset of a referenced document** for read performance, while keeping the full record elsewhere.

```json
// orders collection
{
  "_id": "order_1",
  "customerId": "cust_123",
  "customerSnapshot": { "name": "Ali Raza", "email": "ali@example.com" },  // extended reference
  "items": [ { "productId": "p1", "name": "Keyboard", "priceAtPurchase": 89.99 } ]
}
```
Why `customerSnapshot` and `priceAtPurchase` matter: **an order must reflect what was true at the time of purchase**, not the customer's current name or a product's current price (which may change tomorrow). This is a real-world requirement, not just a performance optimization — historical orders must be immutable snapshots even if the referenced entities change later.

### 10.4 When to Denormalize vs. Normalize — the guiding principle

> **"Data that is accessed together should be stored together."** — MongoDB's core modeling philosophy, the inverse of relational normalization's "store data once, join when needed."

The cost of denormalization (duplicated data, potential inconsistency) is paid at **write time** (you must update duplicates). The cost of normalization (joins, multiple round trips) is paid at **read time**. Most applications read far more often than they write (a product page might be viewed 10,000 times for every 1 price update) — so MongoDB schemas typically lean toward embedding/denormalizing to optimize the dominant operation.

---

## 11. Drivers & Node.js Integration

### 11.1 Official Node.js Driver (low-level, full control)

```js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  maxPoolSize: 20,          // max simultaneous connections in the pool
  minPoolSize: 5,           // keep this many warm even when idle
  serverSelectionTimeoutMS: 5000,
  retryWrites: true,
  w: "majority"              // write concern — wait for majority ack (durability)
});

await client.connect();
const db = client.db("ecommerce");
const products = db.collection("products");

// Create
const result = await products.insertOne({ name: "Keyboard", price: 89.99 });

// Read
const product = await products.findOne({ _id: new ObjectId(id) });
const list = await products.find({ category: "Electronics" }).sort({ price: 1 }).limit(20).toArray();

// Update
await products.updateOne({ _id: new ObjectId(id) }, { $set: { price: 79.99 } });

// Delete
await products.deleteOne({ _id: new ObjectId(id) });

// Graceful shutdown
process.on('SIGINT', async () => { await client.close(); process.exit(0); });
```

**Real-world connection pooling note:** create **one `MongoClient` per application process**, reused across every request — never open a new connection per HTTP request. `MongoClient` internally manages a connection pool; opening/closing per-request exhausts the database's max connections under load and adds latency.

### 11.2 Mongoose (ODM — schema enforcement + convenience)

Mongoose adds schema definitions, validation, middleware ("hooks"), and a more expressive query API on top of the native driver — the most popular choice for Express/Node.js apps that want structure without leaving JavaScript.

```js
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGODB_URI);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: mongoose.Decimal128, required: true, min: 0 },
  category: { type: String, enum: ["Electronics", "Accessories", "Toys"] },
  tags: [String],
  stock: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });   // auto-manages createdAt/updatedAt

// Instance method
productSchema.methods.isInStock = function () { return this.stock > 0; };

// Middleware ("hook") — real-world example: auto-generate a URL slug before saving
productSchema.pre('save', function (next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  next();
});

const Product = mongoose.model('Product', productSchema);

// Usage
const p = await Product.create({ name: "Wireless Mouse", price: 24.99, category: "Electronics" });
const cheap = await Product.find({ price: { $lt: 30 } }).sort({ price: 1 });
await Product.updateOne({ _id: p._id }, { $inc: { stock: -1 } });
```

### 11.3 Mongoose Relationships (`populate`)

```js
const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: Number }]
});
const Order = mongoose.model('Order', orderSchema);

// populate() performs the $lookup-equivalent join automatically
const order = await Order.findById(orderId).populate('customer').populate('items.product');
```

### 11.4 Native Driver vs. Mongoose — when to use which

| | Native Driver | Mongoose |
|---|---|---|
| Best for | Microservices, performance-critical paths, full aggregation pipeline control | Typical CRUD-heavy apps, teams wanting schema safety in a schema-less DB |
| Schema enforcement | None (do it yourself, or use Section 19's `$jsonSchema`) | Built-in, with validators and custom types |
| Overhead | Minimal | Some (schema casting, middleware) — usually negligible in practice |
| Real-world pick | High-throughput analytics/ETL services | Standard Express/NestJS REST APIs |

### 11.5 Modern Connection String Options (production-grade)

```js
mongodb+srv://user:pass@cluster0.abcde.mongodb.net/mydb?retryWrites=true&w=majority&readPreference=secondaryPreferred&maxPoolSize=50
```
- `retryWrites=true`: automatically retries a write once if it fails due to a transient network blip or replica set failover — essential for resilience.
- `w=majority`: write concern requiring acknowledgment from a majority of replica set members before considering a write "successful" (durability vs. speed trade-off, more in Section 13).
- `readPreference=secondaryPreferred`: route reads to secondary replicas when available, reducing load on the primary — common for read-heavy analytics dashboards that can tolerate slightly stale data.

---

## 12. Transactions (Multi-Document ACID)

Since MongoDB 4.0 (replica sets) and 4.2 (sharded clusters), MongoDB supports full ACID transactions across multiple documents and even multiple collections — closing the gap with relational databases for operations that must succeed or fail *together*.

### 12.1 Why you need them: the classic real-world example — bank transfer

Moving money from Account A to Account B requires **both** the debit and the credit to happen, or **neither** — you can never have money vanish or be duplicated because a server crashed between the two writes.

```js
const session = client.startSession();

try {
  await session.withTransaction(async () => {
    const accounts = client.db("bank").collection("accounts");

    const debit = await accounts.updateOne(
      { _id: "accountA", balance: { $gte: 500 } },   // guard: enough funds
      { $inc: { balance: -500 } },
      { session }
    );
    if (debit.modifiedCount === 0) throw new Error("Insufficient funds");

    await accounts.updateOne(
      { _id: "accountB" },
      { $inc: { balance: 500 } },
      { session }
    );

    await client.db("bank").collection("transferLog").insertOne(
      { from: "accountA", to: "accountB", amount: 500, date: new Date() },
      { session }
    );
  });
  console.log("Transfer succeeded");
} catch (e) {
  console.error("Transfer aborted, all changes rolled back:", e);
} finally {
  await session.endSession();
}
```

If the process crashes after the debit but before the credit, MongoDB automatically rolls back the entire transaction — Account A's balance is restored. Nothing is left half-done.

### 12.2 Another real-world case: e-commerce checkout

Placing an order often needs to atomically: (1) decrement stock, (2) create the order document, (3) clear the cart. If stock decrements but order creation fails, you've sold a phantom item with no record of the sale — a transaction prevents that:

```js
await session.withTransaction(async () => {
  const stockUpdate = await products.updateOne(
    { _id: productId, stock: { $gte: qty } },
    { $inc: { stock: -qty } },
    { session }
  );
  if (stockUpdate.modifiedCount === 0) throw new Error("Out of stock");

  await orders.insertOne({ customerId, productId, qty, status: "placed" }, { session });
  await carts.updateOne({ customerId }, { $set: { items: [] } }, { session });
});
```

### 12.3 When *not* to reach for a transaction

Transactions have real performance overhead (extra coordination across the replica set) and lock contention risk. **Before reaching for one, ask: can this be modeled as a single atomic document update instead?** Because a single document write in MongoDB is *always* atomic, many "transaction-shaped" problems disappear if you embed the related data.

```js
// Instead of a transaction across "products" and "inventoryLog" collections...
// ...embed both in one atomic update using $inc + $push in a single call:
await products.updateOne(
  { _id: productId },
  { $inc: { stock: -1 }, $push: { inventoryLog: { change: -1, reason: "sale", date: new Date() } } }
)
```
**Rule of thumb:** reach for transactions when you truly need atomicity across *separate collections/documents* (payments, inventory-plus-order, multi-account transfers); prefer good single-document schema design for everything else.

### 12.4 Read/Write Concerns (durability vs. speed dial)

- **Write Concern (`w`)**: how many replica set members must acknowledge a write before it's considered successful.
  - `w: 1` — just the primary (fast, but a crash before replication loses the write).
  - `w: "majority"` — a majority of the replica set (safe default for anything important — payments, orders).
- **Read Concern**: what guarantee a read gives about the data's durability/consistency.
  - `"local"` — fastest, might read data that's later rolled back on failover.
  - `"majority"` — only reads data acknowledged by a majority (won't ever be rolled back).
  - `"linearizable"` — strongest, guarantees you see the absolute latest majority-committed write, at a latency cost.

**Real-world tuning:** an analytics dashboard reading aggregate stats can safely use `readConcern: "local"` on a secondary for speed; a payment confirmation read *must* use `readConcern: "majority"` to avoid showing a user a "successful" payment that later gets rolled back during a failover.

---

## 13. Replication & Replica Sets

A **replica set** is a group of MongoDB servers (nodes) maintaining identical copies of the same data — MongoDB's mechanism for **high availability** (surviving server failure) and **read scaling**.

### 13.1 Anatomy of a Replica Set

- **Primary**: the only node that accepts writes. All writes go through it and are replicated to secondaries via the **oplog** (operations log, a capped collection recording every write).
- **Secondaries**: continuously replicate the primary's oplog and can serve reads (if the driver's read preference allows it).
- **Arbiter** (optional): a vote-only node with no data, used to break ties in elections when you can't afford a full extra data-bearing node.

**Minimum production topology: 3 data-bearing nodes** (1 primary + 2 secondaries) — this survives the loss of any single node without losing write availability, because the remaining 2 can still form a majority to elect a new primary.

```js
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1.example.com:27017" },
    { _id: 1, host: "mongo2.example.com:27017" },
    { _id: 2, host: "mongo3.example.com:27017" }
  ]
})

rs.status()          // current health/roles of all members
rs.conf()            // replica set configuration
rs.stepDown()         // force the current primary to step down (planned maintenance)
```

### 13.2 Automatic Failover — the real-world payoff

If the primary crashes (hardware failure, OS crash, network partition), the remaining nodes hold an **election** and promote a secondary to primary — typically within a few seconds, with **no manual intervention**. A properly configured driver (with `retryWrites=true`) transparently retries in-flight writes against the new primary.

**Real-world scenario:** at 3 AM, the cloud provider hosting your primary node has a hardware fault. Without a replica set, your app is down until someone is paged and manually restores from backup — potentially hours of downtime. With a 3-node replica set, a secondary is elected primary within seconds; most users never notice.

### 13.3 Read Preference

Controls which replica set member(s) the driver routes reads to:

| Mode | Behavior |
|---|---|
| `primary` (default) | Always read from primary — strongest consistency |
| `primaryPreferred` | Primary if available, else a secondary |
| `secondary` | Always read from a secondary — offloads the primary |
| `secondaryPreferred` | Secondary if available, else primary |
| `nearest` | Lowest network latency member, regardless of role |

**Real-world use:** route heavy reporting queries to `secondary` so they don't compete with the primary's write throughput and user-facing read latency; keep transactional reads (checking current inventory before a sale) on `primary` to avoid replication lag showing stale stock.

### 13.4 Replication Lag — the trade-off to understand

Secondaries apply oplog entries asynchronously, so there's always some (usually milliseconds, but can spike under load) delay before a secondary reflects the primary's latest write. If your app reads from a secondary immediately after writing to the primary, it might not see its own write yet — a classic real-world bug ("I just saved my profile picture but it's not showing!"). Fixes: read-your-own-writes via `readPreference: primary` for that specific query, or use **causal consistency** sessions, which guarantee a client always sees its own prior writes regardless of which node it reads from.

```js
const session = client.startSession({ causalConsistency: true });
```

---

## 14. Sharding

Sharding is MongoDB's **horizontal scaling** mechanism — splitting a collection's data across multiple servers ("shards") when a single replica set can no longer handle the data volume or throughput, even with more RAM/disk on one machine (vertical scaling has a ceiling; sharding doesn't).

### 14.1 When you actually need it

Most applications **never need sharding** — a well-indexed replica set handles surprisingly large workloads (hundreds of GB to low TBs, tens of thousands of ops/sec). Reach for sharding when you hit one of:
- Total data size exceeds what fits comfortably on one server's disk/RAM.
- Write throughput exceeds what a single primary can handle, even after indexing/hardware tuning.
- You need to geographically distribute data (e.g., EU user data physically stored in EU data centers for GDPR compliance — "zone sharding").

**Real-world example:** a global IoT platform ingesting 500,000 sensor readings per second cannot be served by a single primary node no matter how powerful — writes are sharded across dozens of shards, each handling a slice of the sensor ID space.

### 14.2 Architecture

```
Application
     |
  mongos (query router) ── mongos ── mongos     (one or more, stateless, route queries)
     |
  config servers (replica set)                  (store cluster metadata: which shard has which data range)
     |
Shard 1 (replica set)   Shard 2 (replica set)   Shard 3 (replica set)   ...
```
Each shard is itself a full replica set (for high availability). The application talks to `mongos`, which transparently routes each query to the correct shard(s) — from the app's perspective, it still looks like one database.

### 14.3 Choosing a Shard Key — the most consequential decision in sharding

The shard key determines how documents are distributed across shards. **A bad shard key is very hard to fix after the fact** and can cause severe hotspotting.

```js
sh.enableSharding("ecommerce")
sh.shardCollection("ecommerce.orders", { customerId: "hashed" })
```

- **Ranged sharding** (`{ customerId: 1 }`): keeps documents with nearby key values on the same shard — great for range queries (`find customers A–M`), but risks a "hot shard" if writes cluster around one value range (e.g., using an incrementing order number as the shard key means *all* new writes hit the *same* shard).
- **Hashed sharding** (`{ customerId: "hashed" }`): hashes the key to distribute writes evenly across shards — solves hotspotting, but range queries become inefficient (a query for "orders 1000–2000" now has to hit every shard, since consecutive keys are scattered).
- **Zoned/Zone sharding**: manually map ranges of a shard key to specific shards, often used for geographic data residency (EU customer data pinned to EU-hosted shards).

**Real-world hotspot disaster (a real anti-pattern to avoid):** a team shards a `logs` collection on `{ timestamp: 1 }`. Since all new log writes have an ever-increasing timestamp, every single new write lands on the *same* shard (whichever owns the newest range) — completely defeating the purpose of sharding. Fix: shard on `{ serviceId: "hashed" }` or a compound key like `{ serviceId: 1, timestamp: 1 }` to spread writes across services while still allowing efficient per-service time-range queries.

### 14.4 Key Sharding Commands

```js
sh.status()                                    // cluster overview: shards, chunks, balancer status
db.orders.getShardDistribution()               // how a sharded collection's data spreads across shards
sh.startBalancer() / sh.stopBalancer()         // control automatic chunk rebalancing
sh.addShard("shard4/mongo10.example.com:27017")// add a new shard as the cluster grows
```

The **balancer** automatically migrates "chunks" (contiguous ranges of shard-key values) between shards to keep data evenly distributed as it grows — usually running quietly in the background, but real-world ops teams schedule balancer windows (`sh.startBalancer()`/`stopBalancer()` on a cron) to avoid the extra I/O from chunk migrations during peak traffic hours.

---

## 15. Administration & Security

### 15.1 Authentication Mechanisms

| Mechanism | Use case |
|---|---|
| SCRAM-SHA-256 | Default username/password auth, fine for most deployments |
| x.509 certificates | Mutual TLS auth for services/microservices, no shared passwords |
| LDAP | Enterprise environments integrating with existing corporate directories |
| Kerberos | Enterprise/Windows-domain environments |
| AWS IAM (Atlas only) | Auth using existing AWS IAM roles — no separate DB credentials to manage for services already running in AWS |

### 15.2 Role-Based Access Control (RBAC)

```js
use admin
db.createUser({
  user: "appUser",
  pwd: passwordPrompt(),               // prompts securely instead of hardcoding in the script
  roles: [ { role: "readWrite", db: "ecommerce" } ]
})

db.createUser({
  user: "analyticsReadOnly",
  pwd: passwordPrompt(),
  roles: [ { role: "read", db: "ecommerce" } ]
})

db.createUser({
  user: "dba",
  pwd: passwordPrompt(),
  roles: [ { role: "dbAdmin", db: "ecommerce" }, { role: "clusterMonitor", db: "admin" } ]
})
```

**Built-in roles you'll actually use:**
- `read` / `readWrite` — scoped to one database, the most common app-service roles.
- `dbAdmin` — schema/index management, no data read/write.
- `clusterAdmin` — replica set/sharding administration.
- `userAdmin` — can create/manage other users (careful who gets this).
- `root` — full superuser (avoid using for application connections; reserve for human admin access, ideally MFA-gated).

**Real-world principle of least privilege:** your Node.js app's connection string should use a `readWrite`-scoped user limited to its own database — **never** the admin/root account. If that connection string ever leaks (committed to git by accident, exposed in a client-side bundle), the blast radius is contained to one database instead of the entire cluster.

### 15.3 Custom Roles (fine-grained permissions)

```js
db.createRole({
  role: "orderProcessor",
  privileges: [
    { resource: { db: "ecommerce", collection: "orders" }, actions: ["find", "update"] },
    { resource: { db: "ecommerce", collection: "products" }, actions: ["find"] }
  ],
  roles: []
})
```
**Real-world use case:** a payment-processing microservice needs to update order status and read (but never write) product prices — a custom role enforces exactly that, so a compromised or buggy service can't, say, delete the entire product catalog.

### 15.4 TLS/SSL (encryption in transit)

```bash
mongod --tlsMode requireTLS --tlsCertificateKeyFile /etc/ssl/mongodb.pem
```
```
mongodb://user:pass@host:27017/mydb?tls=true
```
Non-negotiable for any production deployment where the database and application aren't on a fully trusted private network — without it, credentials and data travel in plaintext over the wire.

### 15.5 Encryption at Rest

MongoDB Enterprise/Atlas support encrypting the underlying data files on disk (via WiredTiger's native encryption or the OS/cloud provider's disk encryption) — protects against someone physically stealing a disk or an unauthorized snapshot copy. Atlas enables this by default on all paid tiers.

### 15.6 Auditing

```js
// mongod.conf
auditLog:
  destination: file
  format: JSON
  path: /var/log/mongodb/audit.json
```
Logs authentication attempts, authorization checks, and CRUD operations — a compliance requirement (SOC 2, HIPAA, PCI-DSS) for many real-world production systems, letting security teams answer "who accessed/changed this record, and when?"

### 15.7 Network Security Checklist (real-world production baseline)

1. Never expose `mongod` directly to the public internet — bind to private IPs, use a VPC/VPN, or Atlas's IP allowlist / VPC peering.
2. Always require authentication (`--auth` / `security.authorization: enabled`) — a shocking number of real-world data breaches have been *unauthenticated* MongoDB instances left open on default ports and indexed by search engines like Shodan.
3. Use TLS for all client↔server and inter-node traffic.
4. Rotate credentials regularly; use a secrets manager (AWS Secrets Manager, HashiCorp Vault) rather than hardcoding connection strings.
5. Enable auditing for anything handling regulated data.

---

## 16. Backup & Restore

### 16.1 `mongodump` / `mongorestore` (logical backup — portable, human-inspectable BSON)

```bash
# Full backup of one database
mongodump --uri="mongodb://localhost:27017" --db=ecommerce --out=/backups/2026-07-14

# Backup a single collection
mongodump --uri="..." --db=ecommerce --collection=orders --out=/backups/orders-only

# Restore
mongorestore --uri="mongodb://localhost:27017" /backups/2026-07-14

# Restore into a differently-named database (e.g., spinning up a staging copy of prod)
mongorestore --uri="..." --nsFrom="ecommerce.*" --nsTo="ecommerce_staging.*" /backups/2026-07-14
```

**Real-world use:** a common workflow is a nightly `mongodump` of production, automatically restored into a staging environment each morning — giving the QA team realistic data without QA ever touching production credentials.

### 16.2 Filesystem Snapshots (faster, for large deployments)

For large production clusters, logical dumps become slow (hours for TB-scale data). Instead, take a **filesystem-level snapshot** of the underlying data volume (LVM snapshot, EBS snapshot on AWS, or Atlas's built-in continuous backups) while the WiredTiger storage engine is in a consistent state. This is near-instantaneous regardless of data size and is what Atlas uses under the hood for its automated backup feature.

### 16.3 Point-in-Time Recovery

Atlas (and self-managed setups combining periodic snapshots + oplog archiving) support restoring to **any specific second** in the recent past, not just to the last snapshot — critical for recovering from something like an accidental `deleteMany({})` run against the wrong environment.

**Real-world disaster story this protects against:** an engineer runs a cleanup script against production instead of staging (wrong `MONGODB_URI` in their `.env`), wiping the `orders` collection. Without point-in-time recovery, you're restoring from last night's backup and losing a full day of orders. With it, you restore to 30 seconds before the mistake and lose almost nothing.

### 16.4 Backup Strategy Checklist

- [ ] Automated, regularly scheduled backups (not manual/ad-hoc).
- [ ] Backups stored in a **different** region/availability zone than the primary data (protects against a full regional outage).
- [ ] Regularly **test restores** — an untested backup is not a real backup; teams have discovered too late that their backup files were corrupted or incomplete.
- [ ] Retention policy aligned with compliance needs (e.g., 7 years for some financial records).
- [ ] Access to backups is itself access-controlled and audited (a backup file is a full copy of your data — as sensitive as the live database).

---

## 17. Change Streams

Change Streams let your application **subscribe to real-time data changes** (inserts, updates, deletes, replaces) on a collection, database, or entire cluster — built on the same oplog mechanism that powers replication, exposed as an easy-to-consume API. This replaces older, hackier approaches like polling the database on a timer.

### 17.1 Basic Usage

```js
const changeStream = db.collection("orders").watch();

changeStream.on("change", (change) => {
  console.log(change.operationType);   // "insert", "update", "delete", "replace"
  console.log(change.fullDocument);    // the new document (for inserts; use fullDocument option for updates)
});
```

### 17.2 Real-World Example: Live Order Dashboard

An operations team wants a dashboard that updates the instant a new order comes in, without refreshing the page or polling every few seconds:

```js
const pipeline = [
  { $match: { operationType: "insert" } }
];

const changeStream = db.collection("orders").watch(pipeline);

changeStream.on("change", (change) => {
  io.emit("newOrder", change.fullDocument);   // push to connected clients via WebSocket (Socket.io)
});
```
The frontend receives a live push the instant `orders.insertOne()` runs anywhere in the system — no polling, minimal latency, minimal load on the database compared to a client polling `find()` every 2 seconds.

### 17.3 Real-World Example: Cache Invalidation

```js
db.collection("products").watch([
  { $match: { operationType: { $in: ["update", "replace", "delete"] } } }
]).on("change", async (change) => {
  await redisClient.del(`product:${change.documentKey._id}`);   // invalidate stale Redis cache entry
});
```
Whenever a product document changes for *any* reason (an admin edit, a batch price-sync job, a manual `mongosh` fix) — the cache is automatically invalidated, keeping a Redis-cached API layer consistent without every single write path needing to remember to also clear the cache.

### 17.4 Resuming After a Disconnect

Change streams support resuming exactly where you left off after a network blip or app restart, using a `resumeToken` — essential for not missing events in production:

```js
let resumeToken = await loadLastSavedResumeToken();   // from your own persistent storage

const changeStream = db.collection("orders").watch([], { resumeAfter: resumeToken });
changeStream.on("change", async (change) => {
  await processChange(change);
  await saveResumeToken(change._id);   // persist after successfully processing
});
```

---

## 18. GridFS — Storing Large Files

Regular documents cap out at 16MB, so storing a large video, a high-res image library, or PDF archive directly in a document isn't an option. **GridFS** is MongoDB's built-in convention for storing files larger than 16MB (or, more commonly today, any file you want versioned/queryable alongside the rest of your data) by splitting them into chunks.

### 18.1 How it Works

GridFS splits a file into 255KB chunks (default) across two collections:
- `fs.files` — metadata (filename, size, upload date, custom metadata)
- `fs.chunks` — the actual binary chunks, each referencing its parent file's `_id`

```js
import { GridFSBucket } from 'mongodb';

const bucket = new GridFSBucket(db, { bucketName: "uploads" });

// Upload
fs.createReadStream("./contract.pdf")
  .pipe(bucket.openUploadStream("contract.pdf", { metadata: { userId: "u1", type: "legal" } }));

// Download
bucket.openDownloadStreamByName("contract.pdf").pipe(fs.createWriteStream("./downloaded.pdf"));

// Find file metadata
const files = await bucket.find({ "metadata.userId": "u1" }).toArray();

// Delete
await bucket.delete(fileId);
```

### 18.2 Real-World Trade-off: GridFS vs. Object Storage (S3, etc.)

**Most real-world production systems in 2026 store large files in dedicated object storage (Amazon S3, Google Cloud Storage, Cloudflare R2) rather than GridFS**, and store only the S3 URL/key in a MongoDB document:

```json
{ "_id": "doc_1", "filename": "contract.pdf", "s3Key": "contracts/2026/doc_1.pdf", "sizeBytes": 245000 }
```

| | GridFS | Object Storage (S3, etc.) |
|---|---|---|
| Setup complexity | None — it's just MongoDB | Separate service to provision |
| Cost at scale | Consumes your (often pricier) database storage/IOPS | Purpose-built, cheaper at scale, has CDN integration |
| Best for | Small-to-medium deployments, files that need to be queried/filtered alongside other document data, or when you want everything in one system for simplicity | Production apps serving lots of large media (images, video, backups) |

**Rule of thumb:** reach for GridFS when you want file storage colocated with your data for simplicity (small apps, admin tools, internal systems) or need to run MongoDB queries against file metadata. Reach for S3-style object storage for anything user-facing and media-heavy at real scale — it's cheaper and has better CDN/streaming support.

---

## 19. Schema Validation

MongoDB is schema-less by default, but production applications almost always want *some* guardrails to prevent malformed data from a buggy script or a rushed manual `mongosh` edit. **Schema Validation** using `$jsonSchema` lets you enforce structure at the database level — a safety net independent of whatever validation your application (or Mongoose) already does.

### 19.1 Defining Validation Rules

```js
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      properties: {
        name: { bsonType: "string", minLength: 1, description: "must be a non-empty string" },
        price: { bsonType: ["double", "decimal"], minimum: 0, description: "must be a positive number" },
        category: {
          enum: ["Electronics", "Accessories", "Toys", "Books"],
          description: "must be one of the allowed categories"
        },
        stock: { bsonType: "int", minimum: 0 },
        tags: { bsonType: "array", items: { bsonType: "string" } }
      }
    }
  },
  validationLevel: "strict",     // "strict" (all writes) or "moderate" (only new/modified docs, existing invalid docs untouched)
  validationAction: "error"      // "error" (reject the write) or "warn" (log only, allow it through)
})
```

### 19.2 Adding Validation to an Existing Collection

```js
db.runCommand({
  collMod: "products",
  validator: { $jsonSchema: { /* ... */ } },
  validationAction: "warn"   // real-world tip: start with "warn" to see what WOULD be rejected, before enforcing
})
```

**Real-world rollout pattern:** when adding validation to a collection that already has years of production data (some of it inevitably messy), start with `validationAction: "warn"` and `validationLevel: "moderate"`. Monitor logs for a week to see how many existing documents would fail, clean those up, *then* switch to `"error"`/`"strict"`. Flipping straight to strict enforcement on a live collection can suddenly start rejecting legitimate writes from edge cases you didn't anticipate.

### 19.3 Why Use This *Alongside* Mongoose/App-Level Validation, Not Instead Of

Application-level validation (Mongoose schemas, custom code) is easy to bypass — a one-off admin script, a different microservice writing to the same collection, or a direct `mongosh` fix during an incident can all skip it. Database-level `$jsonSchema` validation is the last line of defense that applies **no matter what wrote the data**.

---

## 20. Views

A **view** is a read-only, computed collection defined by an aggregation pipeline over an underlying collection — evaluated on-the-fly at query time (not materialized/stored, unless you use `$merge`/`$out` explicitly, or an **On-Demand Materialized View**).

### 20.1 Creating a View

```js
db.createView(
  "activeCustomers",          // view name
  "customers",                 // source collection
  [ { $match: { status: "active", lastLoginAt: { $gte: ISODate("2026-01-01") } } } ]
)

db.activeCustomers.find({ region: "Punjab" })   // query it just like a normal collection
```

### 20.2 Real-World Use Cases

**Simplifying a complex, frequently-reused query for other developers:**
```js
db.createView("orderSummaries", "orders", [
  { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customer" } },
  { $unwind: "$customer" },
  { $project: { orderId: "$_id", customerName: "$customer.name", total: "$amount", date: 1 } }
])
```
Now any teammate (or a BI tool like Metabase/Tableau connecting directly to MongoDB) can query `orderSummaries` without needing to understand or repeat the underlying `$lookup` logic every time.

**Restricting access to sensitive fields** (combined with RBAC from Section 15): grant a support-team role read access only to a view that excludes payment details, rather than the raw `orders` collection:
```js
db.createView("ordersForSupport", "orders", [
  { $project: { paymentDetails: 0, internalNotes: 0 } }
])
```

### 20.3 Views vs. Materialized Views (`$merge`)

A regular view re-runs its pipeline **every single time it's queried** — fine for lightweight transformations, but expensive for a heavy aggregation queried often. For expensive, infrequently-changing reports (e.g., a "monthly revenue by region" summary), materialize the result into a real collection on a schedule instead:

```js
// Run this nightly via a cron job / scheduled function, not on every page load
db.sales.aggregate([
  { $match: { /* this month */ } },
  { $group: { _id: "$region", total: { $sum: "$amount" } } },
  { $merge: { into: "monthlyRevenueSummary", whenMatched: "replace", whenNotMatched: "insert" } }
])
```
Dashboard reads then hit `monthlyRevenueSummary` directly — instant, since the expensive aggregation already ran once overnight instead of on every page load.

---

## 21. Capped Collections & Time Series Collections

### 21.1 Capped Collections

A fixed-size collection that automatically overwrites its **oldest** documents once it hits its size limit — behaves like a circular buffer. Insertion order is preserved and guaranteed, making them naturally fast for both writes and sequential reads.

```js
db.createCollection("appLogs", { capped: true, size: 100000000, max: 500000 })
// size: max size in bytes (100MB here); max: optional max document count
```

**Real-world use case:** a rolling application log or a "recent activity feed" (last N events) where you genuinely don't care about anything older than the cap — old entries are automatically evicted with zero cleanup logic required, unlike a regular collection where you'd need a separate TTL index or cron job to prune it.

Restrictions: no `deleteOne`/`deleteMany` (docs are only removed by the automatic overwrite), and you can't grow a document's size after insert (would break the fixed-size packing) — fine for immutable log-style records, wrong choice for anything you'll update later.

### 21.2 Time Series Collections (native, since MongoDB 5.0)

Purpose-built collection type for time-stamped measurement data (IoT sensors, financial ticks, application metrics) — MongoDB automatically applies the Bucket Pattern (Section 9.4) under the hood, giving you huge storage and query-performance wins **without you having to hand-roll the bucketing logic**.

```js
db.createCollection("weatherReadings", {
  timeseries: {
    timeField: "timestamp",
    metaField: "stationId",     // groups related readings for efficient bucketing
    granularity: "minutes"       // hint: "seconds" | "minutes" | "hours" — expected time between readings
  },
  expireAfterSeconds: 2592000    // optional: auto-delete data older than 30 days, TTL-style
})

// Insert like any normal collection — you don't manage buckets yourself
db.weatherReadings.insertOne({ timestamp: new Date(), stationId: "station_42", temp: 22.4, humidity: 61 })

// Query and aggregate normally too
db.weatherReadings.aggregate([
  { $match: { stationId: "station_42", timestamp: { $gte: ISODate("2026-07-01") } } },
  { $group: { _id: { $dateTrunc: { date: "$timestamp", unit: "hour" } }, avgTemp: { $avg: "$temp" } } }
])
```

**Real-world win:** an IoT platform migrating a hand-rolled bucket-pattern collection to a native time series collection saw storage shrink dramatically (MongoDB's specialized columnar-style compression for time series data) and simplified their ingestion code — no more manually managing bucket documents, `$push`, and rollover logic; the database handles it transparently.

---

## 22. Monitoring & Performance Tuning

### 22.1 Command-Line Tools

```bash
mongostat              # live rolling view: ops/sec, memory, connections, network — the "top" of MongoDB
mongotop               # per-collection read/write time — quickly spot which collection is hottest
```

### 22.2 The Profiler (finding slow queries automatically)

```js
db.setProfilingLevel(1, { slowms: 100 })   // log every query slower than 100ms
db.setProfilingLevel(2)                     // log EVERY operation (verbose — dev/debug only, never production)

db.system.profile.find().sort({ ts: -1 }).limit(10)   // review recent slow operations
```

**Real-world workflow:** enable profiling with `slowms: 100` in staging under realistic load-test traffic before a big launch. Review `system.profile` for the worst offenders, run `.explain()` on each, and add missing indexes *before* the traffic spike happens in production — far better than discovering the problem live during a marketing campaign.

### 22.3 Key Metrics to Watch in Production

| Metric | Where | Why it matters |
|---|---|---|
| Cache hit ratio | `db.serverStatus().wiredTiger.cache` | Low hit ratio means your working set doesn't fit in RAM — reads are hitting disk, which is much slower |
| Connections used vs. limit | `db.serverStatus().connections` | Approaching the limit means requests will start queuing/failing — usually a connection-pool misconfiguration in the app, not a real capacity issue |
| Replication lag | `rs.printSecondaryReplicationInfo()` | High lag means secondaries are falling behind — stale reads if you're using `secondaryPreferred` |
| Queue depth (`globalLock.currentQueue`) | `db.serverStatus()` | Operations waiting on locks — a sign of contention, often from a long-running unindexed query blocking others |
| Index hit rate | `$indexStats` aggregation stage | Confirms your indexes are actually being used, not just present |

### 22.4 Common Real-World Performance Anti-Patterns (and fixes)

1. **Unbounded array growth** — a `notifications` array embedded directly on the `user` document, growing forever. *Fix:* move to a separate referenced collection (Section 9.2) once it's unbounded, or cap it (keep only the last 50 with `$slice` on push).
2. **Missing compound indexes for common query shapes** — filtering + sorting without a matching compound index forces an expensive in-memory sort. *Fix:* apply the ESR rule (Section 8.2).
3. **`$regex` searches without anchoring** (`{ name: { $regex: "keyboard" } }` — no `^`) can't use a standard index efficiently since the match could start anywhere in the string. *Fix:* use a text index or Atlas Search for real search functionality; anchor with `^` when you specifically need prefix matching.
4. **Using `skip()` for deep pagination** on large collections (Section 5.2). *Fix:* range/cursor-based pagination.
5. **Not using projections** — fetching entire large documents when the app only needs 2 fields, wasting network bandwidth and cache space. *Fix:* always project only what you need, especially in high-traffic list endpoints.
6. **N+1 query patterns** — looping over results and issuing a separate query per item instead of a single `$lookup` or `$in` query. *Fix:* batch with `$in`, or use `$lookup` in an aggregation pipeline.
7. **Case-sensitive text search assumed to "just work"** — a query for `"Keyboard"` misses `"keyboard"` without a collation-aware index or explicit collation on the query (Section 8.10).

---

## 23. Advanced / Modern Features (2024–2026)

### 23.1 Atlas Vector Search — the feature powering the current wave of AI apps

Stores and searches high-dimensional vector embeddings (from OpenAI, Voyage AI, open-source embedding models, etc.) alongside your regular document data, enabling **semantic/similarity search** and **Retrieval-Augmented Generation (RAG)** pipelines for AI applications.

```js
// 1. Create a vector index (via Atlas UI, CLI, or driver)
{
  "fields": [
    { "type": "vector", "path": "embedding", "numDimensions": 1536, "similarity": "cosine" },
    { "type": "filter", "path": "category" }
  ]
}

// 2. Store documents with their embeddings
db.articles.insertOne({
  title: "Understanding MongoDB Indexes",
  content: "...",
  category: "database",
  embedding: [0.0123, -0.0456, /* ...1536 dims from an embedding model... */]
})

// 3. Query by semantic similarity
db.articles.aggregate([
  {
    $vectorSearch: {
      index: "vector_idx",
      path: "embedding",
      queryVector: userQueryEmbedding,   // computed via an embedding API call in your app
      numCandidates: 100,
      limit: 10,
      filter: { category: "database" }    // combine vector search with normal metadata filtering
    }
  },
  { $project: { title: 1, content: 1, score: { $meta: "vectorSearchScore" } } }
])
```

**Real-world use case:** a customer support chatbot embeds every help-article and past resolved ticket, then for each incoming user question, runs a `$vectorSearch` to retrieve the most semantically relevant articles/tickets — even if the user's wording doesn't literally match any keywords — and feeds them to an LLM as context (the "R" in RAG). The major advantage over a dedicated vector database (Pinecone, Weaviate): your operational data and vector embeddings live in **one system**, so a single query can combine metadata filters ("only articles from this product line") with semantic similarity — no syncing two separate databases.

### 23.2 Atlas Search (full-text, Lucene-based)

A much more capable alternative to the basic `$text` operator (Section 6.7) — typo-tolerance, fuzzy matching, autocomplete, faceted search, custom relevance scoring, and highlighting, powered by an embedded Apache Lucene index.

```js
db.products.aggregate([
  {
    $search: {
      index: "productSearch",
      text: { query: "wireles keybord", path: "name", fuzzy: { maxEdits: 2 } }  // typo-tolerant
    }
  },
  { $limit: 10 }
])
```
**Real-world use:** an e-commerce site's search bar needs to return "Wireless Keyboard" even when a user types "wireles keybord" — plain `$text` search would return nothing; Atlas Search's fuzzy matching handles it gracefully, matching the experience users expect from Google/Amazon-style search.

### 23.3 Queryable Encryption

Lets you run **equality queries directly against encrypted fields** — sensitive data (SSNs, medical record numbers, payment details) stays encrypted at rest, in transit, *and in memory on the server*, while the application can still query it. Even a database administrator with full server access cannot see the plaintext values.

```js
// Configured via an encryptedFieldsMap at collection creation
const encryptedFieldsMap = {
  "insurance.patients": {
    fields: [
      { path: "ssn", bsonType: "string", queries: { queryType: "equality" } }
    ]
  }
};
// The driver transparently encrypts on write and can query on the encrypted field directly
await patients.findOne({ ssn: "123-45-6789" });   // works, even though ssn is encrypted server-side
```
**Real-world driver:** healthcare and fintech applications under HIPAA/PCI-DSS increasingly require that sensitive fields are never visible in plaintext to database operators/cloud providers — Queryable Encryption satisfies this without sacrificing the ability to query that data.

### 23.4 Columnar Storage / Analytics Acceleration

Atlas can maintain a columnar copy of designated fields optimized for analytical (aggregation-heavy, scan-many-documents) workloads, distinct from the normal row-oriented (document-oriented) storage used for typical operational CRUD — giving faster performance for BI/reporting-style queries without needing to ETL data into a separate data warehouse.

### 23.5 Online Archive

Automatically moves older, infrequently-accessed data (based on rules you define, e.g., "orders older than 2 years") from your primary cluster to cheaper cloud object storage, while keeping it **transparently queryable** through the same connection — the driver/app doesn't need separate logic to query "hot" vs. "archived" data.

**Real-world cost win:** an app with 5 years of order history, but where 95% of queries only touch the last 90 days, uses Online Archive to keep the expensive, high-performance cluster storage small and fast, while older records remain queryable (just slightly slower) from cheap object storage — often cutting cluster costs substantially without any code changes.

### 23.6 Search Facets, Highlighting, and Synonyms (Atlas Search extras)

```js
{ $search: { facet: { operator: { text: { query: "keyboard", path: "name" } },
    facets: { categoryFacet: { type: "string", path: "category" } } } } }
```
Powers the "Electronics (142) · Accessories (38)" filter sidebars common on e-commerce/marketplace sites — computed directly by the search index rather than a separate aggregation.

---

## 24. MongoDB Atlas

Atlas is MongoDB's fully-managed cloud database service, and in 2026 it's how the large majority of new MongoDB deployments are run — it removes most of the operational burden covered in Sections 13–16 (replication setup, sharding, backups, patching).

### 24.1 What Atlas Manages For You

- **Automated provisioning** of replica sets and sharded clusters across AWS, GCP, or Azure.
- **Automated backups** with point-in-time recovery (Section 16.3).
- **Automatic minor-version patching** and easy major-version upgrades.
- **Built-in monitoring/alerting** dashboards (replacing manual `mongostat`/profiler workflows for most day-to-day needs).
- **Auto-scaling** compute and storage based on load.
- **Network security**: VPC peering, private endpoints, IP allowlisting.
- **Atlas Search & Vector Search** (Section 23) as integrated features, no separate infrastructure.
- **Atlas Data Federation**: query across multiple data sources (Atlas clusters, S3 files) with a single query.
- **Atlas App Services**: serverless functions, triggers (react to change streams without managing your own worker process), and a GraphQL/HTTPS API layer directly over your data.

### 24.2 Cluster Tiers (rough mental model, verify current pricing/specs on Atlas directly)

- **M0/M2/M5 (Shared/Free tier)** — learning, prototypes, small side projects.
- **Dedicated tiers (M10+)** — production workloads, dedicated resources, VPC peering support.
- **Serverless / Flex** — pay-per-operation, good for spiky or unpredictable traffic without provisioning a fixed cluster size.

### 24.3 Real-World Reason Most Teams Choose Atlas Over Self-Hosting

Running MongoDB yourself means your team owns replica set failover testing, security patching, backup verification, sharding operations, and 3 AM pages when a node dies. Atlas converts nearly all of that into "read the docs, click the right settings" — for most engineering teams, the ongoing DevOps cost of self-hosting a highly-available, correctly-secured MongoDB deployment easily outweighs Atlas's subscription cost, especially below a certain scale where you'd need a dedicated database-ops person anyway.

---

## 25. Best Practices & Anti-Patterns

### 25.1 Best Practices Checklist

- **Model for your queries, not for theoretical purity.** Look at your application's actual read/write patterns first, then design the schema — not the other way around.
- **Use the ESR rule** for compound indexes (Equality, Sort, Range).
- **Use `Decimal128` for money**, never `Double`.
- **Use projections** to avoid over-fetching, especially on list/feed endpoints.
- **Prefer atomic single-document updates** (`$inc`, `$push`, etc.) over read-modify-write cycles in application code.
- **Reach for transactions only when truly needed** across multiple documents/collections — good schema design eliminates most "needs."
- **Use `w: "majority"`** for anything where losing a write is unacceptable (orders, payments, user account changes).
- **Reuse one `MongoClient`** per application process; never open a connection per request.
- **Add schema validation (`$jsonSchema`)** as a safety net even if your app already validates client-side/ORM-side.
- **Monitor `.explain()` output** for your most frequent and most critical queries before they become production incidents.
- **Use TTL indexes** for naturally-expiring data (sessions, tokens, temp records) instead of manual cleanup cron jobs.
- **Test backups by actually restoring them**, on a schedule, not just taking them.
- **Principle of least privilege** for every database user/service account.

### 25.2 Anti-Patterns to Avoid

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Massive unbounded arrays embedded in a document | Risks hitting the 16MB doc limit; every update rewrites the whole array | Reference pattern, or the Subset pattern |
| Sharding on a monotonically increasing key (timestamp, auto-increment ID) | All new writes hit one shard — hotspotting, defeats the purpose of sharding | Hashed shard key, or a compound key mixing a high-cardinality field |
| Using `skip()` for pagination on large collections | Gets progressively slower — O(n) cost to skip n documents | Range/cursor-based pagination |
| No indexes on foreign-key-style reference fields (`customerId`, `productId`) | `$lookup` and filter queries fall back to full collection scans | Index every field you `$lookup`/filter on |
| Storing money as `Double` | Floating-point rounding errors compound over many transactions | `Decimal128` |
| One giant "god" collection with wildly inconsistent document shapes and no `type` discriminator | Impossible to index or query efficiently, hard to reason about | Polymorphic pattern *with* a `type` field, or split into separate collections if shapes diverge too much |
| Treating MongoDB like a relational database (heavy normalization, many small `$lookup`-joined collections for everything) | Loses MongoDB's core performance advantage — single-query reads | Embed data that's read together; reference sparingly |
| No connection pooling / a `MongoClient` per request | Connection exhaustion under load, added per-request latency | One shared client, tuned `maxPoolSize` |
| Leaving `mongod` open to `0.0.0.0` with no auth (a real, disturbingly common breach vector) | Publicly indexed, trivially discovered and wiped/ransomed by bots scanning the internet | Auth required, network firewalling, never bind to a public interface without it |
| Adding an index for every field "just in case" | Slows down every write, wastes RAM | Index based on actual query patterns; use `$indexStats` to prune unused indexes |

---

## 26. Full Real-World Project: E-Commerce API

This ties together data modeling, CRUD, aggregation, indexing, transactions, and validation into one working example — a minimal but production-shaped Express + MongoDB e-commerce backend.

### 26.1 Schema Design Decisions (applying Sections 9–10)

- **`products`**: embeds variants/images/specs (bounded, always read together) — Embedding Pattern.
- **`products.avgRating`/`reviewCount`**: pre-computed fields — Computed Pattern.
- **`reviews`**: separate collection referencing `productId` (unbounded 1:many) — Referencing Pattern.
- **`orders`**: embeds a snapshot of purchased items (`name`, `priceAtPurchase`) — Extended Reference Pattern, so historical orders don't change if a product's price changes later.
- **`carts`**: embedded array of `{ productId, qty }` — small, bounded, always read/written as a whole per user.

### 26.2 Project Structure

```
ecommerce-api/
├── server.js
├── db.js
├── models/
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── products.js
│   └── orders.js
└── package.json
```

### 26.3 `db.js` — Shared Connection

```js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  maxPoolSize: 20,
  retryWrites: true,
  w: "majority"
});

let db;
export async function connectDB() {
  await client.connect();
  db = client.db("ecommerce");
  console.log("MongoDB connected");
  return db;
}
export function getDB() { return db; }
export { client };
```

### 26.4 `models/Product.js` — Schema Validation + Indexes at Startup

```js
import { getDB } from '../db.js';

export async function initProductCollection() {
  const db = getDB();
  const collections = await db.listCollections({ name: "products" }).toArray();

  if (collections.length === 0) {
    await db.createCollection("products", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price", "category", "stock"],
          properties: {
            name: { bsonType: "string", minLength: 1 },
            price: { bsonType: ["double", "decimal"], minimum: 0 },
            category: { bsonType: "string" },
            stock: { bsonType: "int", minimum: 0 },
            avgRating: { bsonType: "double", minimum: 0, maximum: 5 },
            reviewCount: { bsonType: "int", minimum: 0 }
          }
        }
      },
      validationAction: "error"
    });
  }

  const products = db.collection("products");
  await products.createIndex({ category: 1, price: 1 });       // ESR: equality then range
  await products.createIndex({ name: "text" });                 // basic search
  await products.createIndex({ sku: 1 }, { unique: true, sparse: true });
}
```

### 26.5 `routes/products.js` — CRUD + Aggregation Endpoints

```js
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const router = express.Router();

// List products with filtering, sorting, pagination
router.get('/', async (req, res) => {
  const db = getDB();
  const { category, minPrice, maxPrice, cursor, limit = 20 } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (cursor) filter._id = { $gt: new ObjectId(cursor) };   // cursor-based pagination (Section 5.2)

  const products = await db.collection("products")
    .find(filter)
    .sort({ _id: 1 })
    .limit(parseInt(limit))
    .project({ name: 1, price: 1, category: 1, avgRating: 1, images: { $slice: 1 } })
    .toArray();

  res.json({ products, nextCursor: products.length ? products.at(-1)._id : null });
});

// Get single product with its top reviews (Subset Pattern in action)
router.get('/:id', async (req, res) => {
  const db = getDB();
  const product = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

// Business report: top-selling products this month (Aggregation, Section 7)
router.get('/reports/top-sellers', async (req, res) => {
  const db = getDB();
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const results = await db.collection("orders").aggregate([
    { $match: { status: "completed", createdAt: { $gte: startOfMonth } } },
    { $unwind: "$items" },
    { $group: {
        _id: "$items.productId",
        name: { $first: "$items.name" },
        unitsSold: { $sum: "$items.qty" },
        revenue: { $sum: { $multiply: ["$items.qty", "$items.priceAtPurchase"] } }
    }},
    { $sort: { revenue: -1 } },
    { $limit: 10 }
  ]).toArray();

  res.json(results);
});

export default router;
```

### 26.6 `routes/orders.js` — Checkout with a Transaction (Section 12)

```js
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDB, client } from '../db.js';

const router = express.Router();

router.post('/checkout', async (req, res) => {
  const db = getDB();
  const { customerId, items } = req.body;   // items: [{ productId, qty }]
  const session = client.startSession();

  try {
    let orderId;
    await session.withTransaction(async () => {
      const orderItems = [];

      for (const { productId, qty } of items) {
        const product = await db.collection("products").findOne(
          { _id: new ObjectId(productId) }, { session }
        );
        if (!product || product.stock < qty) {
          throw new Error(`Insufficient stock for ${product?.name ?? productId}`);
        }

        await db.collection("products").updateOne(
          { _id: new ObjectId(productId) },
          { $inc: { stock: -qty } },
          { session }
        );

        // Extended Reference Pattern: snapshot name/price at time of purchase
        orderItems.push({
          productId: product._id, name: product.name, qty, priceAtPurchase: product.price
        });
      }

      const total = orderItems.reduce((sum, i) => sum + i.qty * i.priceAtPurchase, 0);

      const orderResult = await db.collection("orders").insertOne({
        customerId, items: orderItems, amount: total, status: "completed", createdAt: new Date()
      }, { session });
      orderId = orderResult.insertedId;

      await db.collection("carts").updateOne(
        { customerId }, { $set: { items: [] } }, { session }
      );
    });

    res.status(201).json({ orderId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  } finally {
    await session.endSession();
  }
});

export default router;
```

### 26.7 `server.js` — Wiring It Together

```js
import express from 'express';
import { connectDB } from './db.js';
import { initProductCollection } from './models/Product.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

const app = express();
app.use(express.json());

await connectDB();
await initProductCollection();

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(3000, () => console.log('API running on port 3000'));
```

This project demonstrates, end to end: schema validation guarding data integrity, ESR-compliant indexes backing the exact queries the app runs, cursor-based pagination that stays fast at scale, an aggregation pipeline powering a real business report, and a transaction ensuring checkout is all-or-nothing — the same patterns you'd find in a real production MongoDB-backed service.

---

## 27. Cheat Sheet / Quick Reference

### CRUD
```js
db.c.insertOne({...})              db.c.insertMany([{...}])
db.c.find({...})                   db.c.findOne({...})
db.c.updateOne(f, {$set:{...}})    db.c.updateMany(f, {$inc:{...}})
db.c.replaceOne(f, {...})          db.c.deleteOne({...})   db.c.deleteMany({...})
db.c.bulkWrite([{insertOne:{...}}, {updateOne:{...}}])
```

### Query Operators
```
Comparison: $eq $ne $gt $gte $lt $lte $in $nin
Logical:    $and $or $not $nor
Element:    $exists $type
Array:      $all $elemMatch $size
Evaluation: $regex $expr $mod $jsonSchema
Geo:        $near $geoWithin $geoIntersects
Text:       $text { $search: "..." }
```

### Update Operators
```
$set $unset $inc $mul $min $max $rename
$push $pull $addToSet $pop
Modifiers: $each $slice $sort (used with $push)
```

### Aggregation Stages
```
$match $group $project $unset $sort $limit $skip
$unwind $lookup $addFields/$set $replaceRoot
$facet $bucket $sortByCount $unionWith $merge $out
$setWindowFields (window functions)  $vectorSearch  $search
```

### Index Types
```js
db.c.createIndex({ field: 1 })                                  // single/compound
db.c.createIndex({ field: "text" })                              // text
db.c.createIndex({ field: "2dsphere" })                          // geospatial
db.c.createIndex({ field: "hashed" })                             // hashed (sharding)
db.c.createIndex({ field: 1 }, { expireAfterSeconds: 3600 })      // TTL
db.c.createIndex({ field: 1 }, { unique: true, sparse: true })    // sparse unique
db.c.createIndex({ field: 1 }, { partialFilterExpression: {...} })// partial
```

### Diagnostics
```js
db.c.find({...}).explain("executionStats")
db.currentOp({ secs_running: { $gt: 5 } })
db.c.getIndexes()
db.c.aggregate([{ $indexStats: {} }])
db.serverStatus()   db.stats()   db.c.stats()
```

### Replica Set / Sharding
```js
rs.initiate({...})   rs.status()   rs.stepDown()
sh.enableSharding("db")
sh.shardCollection("db.coll", { key: "hashed" })
sh.status()   db.c.getShardDistribution()
```

### Transactions
```js
const session = client.startSession();
await session.withTransaction(async () => {
  await coll.updateOne(filter, update, { session });
});
await session.endSession();
```

### Backup
```bash
mongodump --uri="..." --db=mydb --out=/backups/latest
mongorestore --uri="..." /backups/latest
```

---

## Closing Notes

MongoDB rewards designing your schema **around your application's actual access patterns** rather than abstract data purity — that single mindset shift (Section 10) explains most of the differences you'll notice coming from a relational background. Start simple: model documents the way your app reads them, add indexes that match your real queries (Section 8's ESR rule), reach for transactions only when you truly need cross-document atomicity (Section 12), and layer in sharding, Atlas Search, or Vector Search (Section 23) only once you have a concrete need for them — not preemptively.