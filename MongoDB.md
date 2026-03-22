# MongoDB

### From Basic to Advanced

MongoDB  
|-- Core Concepts & Data Model  
|-- MongoDB Shell (mongosh) & Basic Commands  
|-- CRUD Operations  
|-- Query Operators & Aggregation Pipeline  
|-- Indexes & Performance  
|-- Schema Design Patterns  
|-- Drivers & Node.js Integration (mongodb / mongoose)  
|-- Administration & Security  
|-- Advanced Features (2024–2026)

### 1. Core Concepts & Data Model

```
|-- Document
    |-- BSON (Binary JSON) document → max 16 MB
    |-- Fields can be any BSON type: string, number, boolean, array, object, ObjectId, Date, BinData, etc.

|-- Collection
    |-- Analogous to table (but schema-less / flexible)
    |-- Names: lowercase recommended, no $ or system. prefix

|-- Database
    |-- Multiple databases per server/cluster
    |-- Names: alphanumeric + _ - (no / \ . " $)

|-- ObjectId
    |-- 12-byte: 4-byte timestamp + 5-byte random + 3-byte counter
    |-- _id field (auto-generated if omitted)

|-- BSON Types (most common)
    |-- Double, String, Object, Array, Binary data, ObjectId, Boolean, Date, Null, Regex, JavaScript, Int32, Timestamp, Int64 (Long), Decimal128, MinKey/MaxKey
```

### 2. MongoDB Shell (mongosh) – Basic Commands

```
|-- mongosh [uri] [options]
    |-- --host, --port, --username, --password, --authenticationDatabase

|-- show dbs / show collections / show users

|-- use mydb                    → switch database

|-- db                           → current database

|-- db.getCollectionNames()
|-- db.stats() / db.serverStatus()
```

### 3. CRUD Operations (mongosh / driver syntax)

```
|-- Create / Insert
    db.collection.insertOne({ name: "Ali", age: 30 })
    db.collection.insertMany([ {}, {}, ... ])
    → returns insertedIds

|-- Read / Find
    db.collection.find({ age: { $gt: 25 } })
    db.collection.findOne({ _id: ObjectId("...") })
    .sort({ age: -1 })
    .limit(10)
    .skip(20)
    .project({ name: 1, age: 1, _id: 0 })

|-- Update
    db.collection.updateOne(filter, update, options)
    db.collection.updateMany(filter, update)
    → Operators: $set, $unset, $inc, $push, $pull, $addToSet, $rename, $min/$max, $mul
    → Options: { upsert: true }

|-- Replace
    db.collection.replaceOne(filter, replacementDoc, { upsert })

|-- Delete
    db.collection.deleteOne(filter)
    db.collection.deleteMany(filter)

|-- Bulk operations
    db.collection.bulkWrite([ { insertOne: {...} }, { updateOne: {...} }, ... ])
```

### 4. Query Operators & Aggregation Pipeline

```
|-- Comparison: $eq $ne $gt $gte $lt $lte $in $nin

|-- Logical: $and $or $not $nor

|-- Element: $exists $type $size (array)

|-- Evaluation: $regex $mod $jsonSchema $expr

|-- Array: $all $elemMatch $size

|-- Geospatial: $geoWithin $geoIntersects $near $nearSphere

|-- Text: $text (requires text index)

|-- Aggregation Pipeline Stages (most used)
    $match
    $project / $unset
    $group { _id: ..., count: { $sum: 1 }, avgAge: { $avg: "$age" } }
    $sort
    $limit / $skip
    $unwind (array field)
    $lookup (left outer join)
    $addFields / $set / $replaceRoot
    $sortByCount
    $facet
    $unionWith
    $merge / $out (write results to collection)
    $densify / $fill (time-series)
    $vectorSearch (Atlas Vector Search – 2024+)

|-- Aggregation Examples
    db.sales.aggregate([
      { $match: { status: "A" } },
      { $group: { _id: "$customer", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ])
```

### 5. Indexes & Performance

```
|-- db.collection.createIndex({ field: 1 })          → ascending
|-- { field: -1 }                                     → descending
|-- Compound: { lastName: 1, firstName: 1 }
|-- Multikey: indexes on arrays
|-- Text: { $text: { $search: "keyword" } } → createIndex({ content: "text" })
|-- Hashed: for sharding
|-- Geospatial: 2dsphere / 2d
|-- TTL: expireAfterSeconds → createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
|-- Partial: partialFilterExpression
|-- Sparse: ignores docs without indexed field
|-- Collation: case-insensitive, locale-aware
|-- Covered query: all fields in projection from index
|-- explain("executionStats") / .explain("allPlansExecution")
```

### 6. Schema Design Patterns (Common in 2026)

```
|-- Embedding (1:1, 1:few)
|-- Referencing (1:many, many:many) + $lookup
|-- Subset pattern
|-- Bucket pattern (time-series data)
|-- Computed pattern (pre-calculated fields)
|-- Outlier / Extended Reference
|-- Versioning / Document versioning
|-- Polymorphic / Single collection for multiple types
|-- Atlas Search / Vector Search for AI apps
```

### 7. Drivers & Node.js Integration

```
|-- Official Node.js driver (mongodb package)
    const { MongoClient } = require("mongodb")
    const client = new MongoClient(uri, { ...options })
    await client.connect()
    const db = client.db("mydb")
    const collection = db.collection("users")

|-- Mongoose (ODM – Object Document Mapper)
    const mongoose = require('mongoose')
    mongoose.connect(uri)
    const UserSchema = new Schema({ name: String, age: Number })
    const User = mongoose.model('User', UserSchema)
    await User.create({ name: "Hassaan" })
    await User.find({ age: { $gt: 20 } })

|-- Modern connection (2025–2026 style)
    await MongoClient.connect(uri, {
      maxPoolSize: 20,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: "majority"
    })
```

### 8. Administration & Security

```
|-- Authentication
    SCRAM-SHA-256 (default), x.509, LDAP, Kerberos, AWS IAM (Atlas)

|-- Roles: read, readWrite, dbAdmin, clusterAdmin, root, etc.
    db.createUser({ user: "admin", pwd: "...", roles: ["root"] })

|-- TLS/SSL
|-- Auditing
|-- Backup: mongodump / mongorestore
|-- Sharding: enableSharding, shardCollection
|-- Replica Set: rs.initiate(), rs.status()
|-- Transactions (multi-document ACID since 4.0)
    session.startTransaction()
    await collection.insertOne(..., { session })
    await session.commitTransaction()

|-- Change Streams
    collection.watch(pipeline, options)
```

### 9. Advanced / Modern Features (2024–2026)

```
|-- Time Series Collections
    db.createCollection("weather", {
      timeseries: { timeField: "timestamp", metaField: "station" }
    })

|-- Atlas Vector Search
    { $vectorSearch: { index: "vector_idx", path: "embedding", queryVector: [...], numCandidates: 100, limit: 10 } }

|-- Queryable Encryption (field-level encryption)
|-- Columnar Storage (for analytics – Atlas 2025+)
|-- Online Archive (cold data tier)
|-- Search facets, highlighting, synonyms
|-- Window functions in aggregation ($rank, $denseRank, $documentNumber, etc.)
```

### Minimal Modern Node.js + MongoDB Example (2026 style – ESM)

```js
// server.js
import { MongoClient } from 'mongodb';
import express from 'express';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const app = express();
app.use(express.json());

await client.connect();
const db = client.db('mydb');
const users = db.collection('users');

app.post('/users', async (req, res) => {
  const result = await users.insertOne(req.body);
  res.status(201).json({ id: result.insertedId });
});

app.get('/users/:id', async (req, res) => {
  const user = await users.findOne({ _id: new ObjectId(req.params.id) });
  user ? res.json(user) : res.status(404).json({ error: 'Not found' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
