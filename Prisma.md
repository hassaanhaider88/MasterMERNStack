# Prisma

### From Basic to Advanced
Prisma  
|-- Core Concepts & Architecture  
|-- Prisma Schema (schema.prisma)  
|-- Data Modeling & Relations  
|-- Prisma Client Generation & Usage  
|-- CRUD Operations & Queries  
|-- Filtering, Pagination, Sorting  
|-- Transactions & Batch Operations  
|-- Relations & Includes / Select  
|-- Middleware & Query Extensions  
|-- Prisma Migrate & Schema Evolution  
|-- Advanced Features (2025–2026)  
|-- Integration Patterns (Node.js, Express, NestJS, TypeScript)

### 1. Core Concepts & Architecture

```
|-- Prisma ORM
    Type-safe database client generator
    Works with: PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, CockroachDB, PlanetScale, etc.

|-- Three main parts
    1. Prisma Schema (schema.prisma)   → single source of truth
    2. Prisma CLI                         → generate client, migrate, studio, etc.
    3. Prisma Client                      → auto-generated, type-safe query builder

|-- npx prisma init
    → creates prisma/ folder with schema.prisma + .env

|-- npx prisma generate
    → regenerates @prisma/client after schema changes

|-- npx prisma db push   (prototyping / schema-first)
    npx prisma migrate dev   (production-grade migrations)
```

### 2. Prisma Schema (schema.prisma)

```
datasource db {
  provider = "postgresql" | "mysql" | "sqlite" | "mongodb" | "sqlserver" | "cockroachdb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "fullTextIndex", "driverAdapters", ...]
}

model User {
  id        BigInt    @id @default(autoincrement())
  email     String    @unique
  name      String?
  posts     Post[]
  profile   Profile?  @relation(fields: [profileId], references: [id])
  profileId Int?
  createdAt DateTime  @default(now())
  @@index([email])
}
```

### 3. Data Modeling & Relations

```
|-- Scalars
    String, Int, BigInt, Float, Decimal, Boolean, DateTime, Json, Bytes, Unsupported("citext")

|-- Attributes
    @id @default(autoincrement() | uuid() | cuid() | dbgenerated())
    @unique
    @default(now() | dbgenerated("gen_random_uuid()"))
    @map("column_name")
    @@id([field1, field2])
    @@unique([field1, field2])
    @@index([field], map: "idx_name")
    @@map("table_name")

|-- Relations
    1:1     → User profile   Profile?
    1:n     → User posts      Post[]
    m:n     → Post categories Category[]   (implicit or explicit via _ join table)
    Self-relation → User followedBy User[] @relation("Follows")

|-- MongoDB specifics
    id        String   @id @default(auto()) @map("_id") @db.ObjectId
    @@map("users")
```

### 4. Prisma Client Generation & Usage

```
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// or ESM
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

### 5. CRUD Operations & Queries

```
|-- Create
    prisma.user.create({ data: { email: "a@example.com", name: "Hassaan" } })
    prisma.user.createMany({ data: [{...}, {...}] })

|-- Read
    prisma.user.findUnique({ where: { id: 123 } })
    prisma.user.findFirst({ where: { email: { startsWith: "h" } } })
    prisma.user.findMany({
      where: { posts: { some: { published: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
      skip: 20
    })

|-- Update
    prisma.user.update({ where: { id: 123 }, data: { name: "New Name" } })
    prisma.user.updateMany({ where: {...}, data: { status: "active" } })

|-- Delete
    prisma.user.delete({ where: { id: 123 } })
    prisma.user.deleteMany({ where: { email: { endsWith: "@test.com" } } })
```

### 6. Filtering, Pagination, Sorting

```
where: {
  AND: [...],
  OR: [...],
  NOT: {...},
  email: { contains: "gmail", mode: "insensitive" },
  age: { gte: 18, lte: 65 },
  posts: { none: { title: { contains: "draft" } } }
}

orderBy: { createdAt: 'desc' } | [{ age: 'asc' }, { name: 'desc' }]

take / skip   (limit / offset)

cursor-based pagination
prisma.post.findMany({
  take: 10,
  cursor: { id: lastSeenId },
  skip: 1,
  orderBy: { id: 'asc' }
})
```

### 7. Relations & Includes / Select

```
prisma.user.findMany({
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    },
    profile: true
  }
})

select: {
  id: true,
  email: true,
  posts: {
    select: { title: true, published: true }
  }
}
```

### 8. Transactions & Batch Operations

```
await prisma.$transaction([
  prisma.user.create({ data: {...} }),
  prisma.post.create({ data: {...} })
])

// interactive transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({...})
  await tx.post.create({ data: { authorId: user.id, ... }})
  return user
}, { maxWait: 5000, timeout: 10000 })
```

### 9. Middleware & Query Extensions (Prisma Client extensions)

```
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null } // soft delete
        return query(args)
      }
    }
  },
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`
        }
      }
    }
  },
  model: {
    user: {
      async softDelete(id) {
        return this.update({ where: { id }, data: { deletedAt: new Date() } })
      }
    }
  }
})
```

### 10. Prisma Migrate & Schema Evolution

```
npx prisma migrate dev --name init
npx prisma migrate deploy   (production)
npx prisma migrate resolve --applied 202103...
npx prisma db push          (schema prototyping – no migration history)
npx prisma studio           → visual database browser
```

### 11. Advanced / Modern Features (2025–2026 – Prisma 5.x / 6.x)

```
|-- Prisma Postgres (new dedicated database offering)
|-- Driver Adapters (connect to non-supported DBs via http / ws)
|-- Accelerate (connection pooling + caching layer)
|-- Pulse (real-time database events / change streams)
|-- Full-text search & vectors (pgvector support)
    @@fulltext([title, content])
    where: { _fullText: { search: "prisma orm" } }

|-- Interactive transactions with timeout
|-- Raw queries / $queryRaw / $executeRaw
|-- Prisma Client extensions (model, query, result, client)
|-- Better MongoDB support (atomic updates, transactions)
```

### Minimal Modern Prisma + Express + TypeScript Example (2026 style)

```ts
// prisma/schema.prisma (excerpt)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
}

// src/index.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { posts: { take: 3, orderBy: { createdAt: 'desc' } } },
    orderBy: { id: 'desc' },
    take: 20
  });
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    }
  });
  res.status(201).json(user);
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```
