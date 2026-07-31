---
title: "Databases Compared"
description: "PostgreSQL, MySQL, MongoDB, Redis, SQLite, Supabase, PlanetScale—which database should you use? An honest comparison of use cases, tradeoffs, and when to choose each."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, databases, postgresql, mysql, mongodb, redis, sqlite, supabase, planetscale]
faqs:
  - question: "Which database should I use for my first project?"
    answer: "PostgreSQL via Supabase or Railway. It's the most versatile, well-documented, and has the best tooling. You can't go wrong starting with Postgres."
  - question: "When should I use NoSQL over SQL?"
    answer: "NoSQL shines for: document storage with varying schemas, caching (Redis), real-time subscriptions, and when your data doesn't have relationships. For most apps with users, orders, products—SQL is simpler."
  - question: "Is SQLite good enough for production?"
    answer: "Yes, for many apps. SQLite handles thousands of concurrent users on a single server. It's used by Pieter Levels for apps with millions of users. Consider it for read-heavy apps or when simplicity matters."
last_updated: 2026-07-30
---

{{< quickanswer >}}
**PostgreSQL** is the versatile default for most apps. **MySQL** works when you need it, often for legacy reasons. **MongoDB** fits document-oriented, schema-flexible needs. **Redis** is for caching and real-time. **SQLite** is perfect for simpler apps or embedded use. **Supabase** gives you Postgres plus auth and real-time. **PlanetScale** offers serverless MySQL. When in doubt: PostgreSQL.
{{< /quickanswer >}}

## Database categories

| Category | Examples | Best for |
|----------|----------|----------|
| **Relational (SQL)** | PostgreSQL, MySQL, SQLite | Structured data, relationships |
| **Document (NoSQL)** | MongoDB, CouchDB | Flexible schemas, documents |
| **Key-Value** | Redis, DynamoDB | Caching, sessions, simple lookups |
| **Graph** | Neo4j, Neptune | Highly connected data |
| **Vector** | Pinecone, pgvector | AI/ML embeddings, similarity search |
| **Time-series** | TimescaleDB, InfluxDB | Metrics, IoT, logs |

---

## PostgreSQL

The "world's most advanced open source database." The safe default.

### What it is
- Relational database with advanced features
- ACID compliant (data integrity guaranteed)
- Extensible (plugins, custom types)
- 35+ years of development

### When to use
- Most web applications
- When you need reliability and data integrity
- Complex queries and reporting
- When you're not sure what to pick

### Code example
```sql
-- Create tables with relationships
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false
);

-- Query with join
SELECT users.name, posts.title
FROM users
JOIN posts ON users.id = posts.user_id
WHERE posts.published = true;
```

### Strengths
- **Reliability**: Battle-tested, ACID compliant
- **Features**: JSON, full-text search, geospatial, arrays
- **Extensions**: pgvector for AI, TimescaleDB for time-series
- **Standard SQL**: Skills transfer everywhere
- **Tooling**: Excellent ORMs, admin tools, monitoring

### Weaknesses
- **Horizontal scaling**: Harder than NoSQL (but possible)
- **Operational overhead**: Needs tuning for performance
- **Strict schema**: Migrations required for changes

### Managed options

| Service | Free tier | Starting price | Notes |
|---------|-----------|----------------|-------|
| **Supabase** | 500MB | $25/mo | Includes auth, realtime, storage |
| **Neon** | 512MB | $19/mo | Serverless, branches |
| **Railway** | $5 credit | ~$5/mo | Simple, per-use pricing |
| **Render** | 90 days | $7/mo | Good value |
| **AWS RDS** | 12 months | ~$15/mo | Enterprise-ready |

---

## MySQL

The original web database. Still powers most of the internet.

### What it is
- Relational database, widely deployed
- Powers WordPress, many legacy systems
- Owned by Oracle (but open source)
- Fork: MariaDB (community-driven)

### When to use
- WordPress or PHP applications
- Legacy systems already using MySQL
- When hosting only offers MySQL
- PlanetScale (serverless MySQL)

### Code example
```sql
-- Similar to PostgreSQL
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MySQL-specific: INSERT ... ON DUPLICATE KEY
INSERT INTO users (email, name)
VALUES ('user@example.com', 'John')
ON DUPLICATE KEY UPDATE name = VALUES(name);
```

### Strengths
- **Ubiquity**: Available everywhere, huge community
- **Performance**: Fast for read-heavy workloads
- **Replication**: Easy primary-replica setup
- **PlanetScale**: Serverless MySQL is excellent

### Weaknesses
- **Fewer features**: Less advanced than PostgreSQL
- **Oracle ownership**: Some community concerns
- **Strict mode off by default**: Can cause data issues

### Managed options

| Service | Free tier | Starting price | Notes |
|---------|-----------|----------------|-------|
| **PlanetScale** | 5GB | $29/mo | Serverless, branching |
| **Railway** | $5 credit | ~$5/mo | Simple setup |
| **AWS RDS** | 12 months | ~$15/mo | Enterprise-ready |

### MySQL vs PostgreSQL

| Aspect | MySQL | PostgreSQL |
|--------|-------|------------|
| Features | Good | Better |
| Performance | Good for reads | Good overall |
| JSON support | Good | Better |
| Extensions | Limited | Excellent |
| Community | Huge | Large |
| Default choice | Legacy, PHP | Modern apps |

---

## MongoDB

The document database. Flexible schemas, JSON-like documents.

### What it is
- NoSQL document database
- Stores JSON-like documents (BSON)
- Schema-flexible (no migrations)
- Horizontal scaling built-in

### When to use
- Varying document structures
- Rapid prototyping (schema changes freely)
- When data doesn't fit relational model
- Content management, catalogs

### Code example
```javascript
// Node.js with MongoDB driver
const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);
const db = client.db('myapp');

// Insert document (no schema required)
await db.collection('users').insertOne({
  email: 'user@example.com',
  name: 'John',
  preferences: {
    theme: 'dark',
    notifications: ['email', 'push']
  },
  tags: ['premium', 'early-adopter']
});

// Query with nested fields
const user = await db.collection('users').findOne({
  'preferences.theme': 'dark'
});
```

### Strengths
- **Flexibility**: No schema migrations
- **Scaling**: Horizontal scaling is native
- **Developer experience**: JSON feels natural
- **Atlas**: Excellent managed service
- **Aggregation**: Powerful data pipeline

### Weaknesses
- **No joins** (traditionally): Must denormalize or use $lookup
- **Consistency tradeoffs**: Not ACID by default (improved recently)
- **Query limitations**: Some queries are awkward
- **Overused**: Often chosen when SQL would be simpler

### Managed options

| Service | Free tier | Starting price | Notes |
|---------|-----------|----------------|-------|
| **MongoDB Atlas** | 512MB | ~$9/mo | Official, excellent |
| **Railway** | $5 credit | ~$5/mo | Simple setup |

### When NOT to use MongoDB
- Heavy relationships between data
- Need complex transactions
- Reporting and analytics
- When PostgreSQL JSON would work

---

## Redis

The in-memory data store. Caching, sessions, real-time.

### What it is
- In-memory key-value store
- Extremely fast (sub-millisecond)
- Data structures: strings, lists, sets, hashes
- Pub/sub for real-time messaging

### When to use
- Caching database queries
- Session storage
- Rate limiting
- Real-time leaderboards
- Pub/sub messaging
- Job queues (with BullMQ, etc.)

### Code example
```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Simple caching
async function getUser(id) {
  // Check cache first
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Query database
  const user = await db.users.findUnique({ where: { id } });
  
  // Cache for 1 hour
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  
  return user;
}

// Rate limiting
async function checkRateLimit(ip) {
  const key = `ratelimit:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 60); // 60 second window
  }
  return count <= 100; // 100 requests per minute
}
```

### Strengths
- **Speed**: In-memory = microsecond latency
- **Data structures**: Lists, sets, sorted sets, streams
- **Pub/sub**: Real-time messaging built-in
- **Atomic operations**: Race-condition safe

### Weaknesses
- **Memory cost**: RAM is expensive
- **Persistence tradeoffs**: Can lose data on crash
- **Not a primary database**: Use alongside SQL/NoSQL
- **Data size limits**: Everything must fit in memory

### Managed options

| Service | Free tier | Starting price | Notes |
|---------|-----------|----------------|-------|
| **Upstash** | 10K commands/day | $0.2/100K cmd | Serverless |
| **Railway** | $5 credit | ~$5/mo | Simple |
| **Render** | 25MB | $7/mo | Managed |
| **Redis Cloud** | 30MB | $5/mo | Official |

---

## SQLite

The embedded database. One file, zero configuration.

### What it is
- Self-contained, file-based database
- No server process (embedded in app)
- Full SQL support
- Used by billions of devices

### When to use
- Single-server applications
- Local development
- Mobile and desktop apps
- Read-heavy workloads
- When simplicity matters most

### Code example
```javascript
// Node.js with better-sqlite3
const Database = require('better-sqlite3');
const db = new Database('myapp.db');

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT
  )
`);

// Insert
const insert = db.prepare('INSERT INTO users (email, name) VALUES (?, ?)');
insert.run('user@example.com', 'John');

// Query
const user = db.prepare('SELECT * FROM users WHERE email = ?')
  .get('user@example.com');
```

### Strengths
- **Simplicity**: No server, just a file
- **Performance**: Incredibly fast for reads
- **Reliability**: Extremely well-tested
- **Zero config**: Works immediately
- **Portable**: Copy the file, copy the database

### Weaknesses
- **Single writer**: Only one write at a time
- **No network access**: Must be on same server
- **Scaling limits**: One server only (but that's often enough)
- **Backups**: Must handle file backups yourself

### Production use
SQLite is production-ready for many apps:
- **Litestream**: Continuous replication to S3
- **LiteFS**: Distributed SQLite by Fly.io
- **Turso**: Managed SQLite at the edge

### When SQLite is enough
- Less than 100K daily active users (often)
- Read-heavy (10:1 read:write ratio)
- Single server deployment
- Simplicity is a priority

---

## Supabase

PostgreSQL with batteries included.

### What it is
- Managed PostgreSQL
- Plus: authentication, real-time, storage, edge functions
- Open source alternative to Firebase
- Use Postgres directly or via client libraries

### When to use
- Need database + auth + storage together
- Real-time subscriptions
- Quick prototyping with full features
- Firebase alternative with SQL

### Code example
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

// Query (uses PostgREST under the hood)
const { data: users } = await supabase
  .from('users')
  .select('*')
  .eq('active', true);

// Insert
const { data, error } = await supabase
  .from('users')
  .insert({ email: 'user@example.com', name: 'John' });

// Real-time subscription
supabase
  .channel('users')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'users' },
    (payload) => console.log('New user:', payload.new)
  )
  .subscribe();

// Authentication
const { user } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});
```

### Strengths
- **All-in-one**: DB + auth + storage + real-time
- **PostgreSQL**: Full Postgres underneath
- **Real-time**: Built-in subscriptions
- **Row-level security**: Secure by design
- **Good free tier**: 500MB database

### Weaknesses
- **Abstraction**: Some Postgres features hidden
- **Vendor coupling**: Using Supabase APIs
- **Pricing jumps**: Free → $25/mo jump
- **Self-hosting**: Possible but complex

### Pricing

| Tier | Cost | Database | Notes |
|------|------|----------|-------|
| Free | $0 | 500MB | 2 projects |
| Pro | $25/mo | 8GB | Everything unlimited |
| Team | $599/mo | More | SOC2, priority support |

---

## PlanetScale

Serverless MySQL with branching.

### What it is
- Serverless MySQL database
- Built on Vitess (powers YouTube)
- Database branching like Git
- Horizontal scaling built-in

### When to use
- Need serverless MySQL
- Want database branching workflow
- High-scale applications
- Teams wanting safe schema changes

### Code example
```javascript
import { connect } from '@planetscale/database';

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
});

// Query
const results = await conn.execute(
  'SELECT * FROM users WHERE email = ?',
  ['user@example.com']
);

// Transactions (using execute)
await conn.execute('BEGIN');
try {
  await conn.execute('INSERT INTO users (email) VALUES (?)', ['user@example.com']);
  await conn.execute('INSERT INTO audit (action) VALUES (?)', ['user_created']);
  await conn.execute('COMMIT');
} catch (e) {
  await conn.execute('ROLLBACK');
  throw e;
}
```

### Strengths
- **Serverless**: Scales to zero, scales up automatically
- **Branching**: Deploy requests like PRs for schemas
- **Performance**: Vitess handles massive scale
- **Edge-ready**: Low-latency globally

### Weaknesses
- **No foreign keys**: Disabled for scaling reasons
- **MySQL only**: No PostgreSQL option
- **Pricing**: Can get expensive at scale
- **Learning curve**: Branching workflow is new

### Pricing

| Tier | Cost | Storage | Notes |
|------|------|---------|-------|
| Hobby | Free | 5GB | Development only |
| Scaler | $29/mo | 10GB | Production-ready |
| Enterprise | Custom | Unlimited | SLA, support |

---

## Quick comparison

| Database | Type | Best for | Managed options |
|----------|------|----------|-----------------|
| PostgreSQL | Relational | Most apps | Supabase, Neon, Railway |
| MySQL | Relational | Legacy, PHP | PlanetScale, Railway |
| MongoDB | Document | Flexible schemas | Atlas |
| Redis | Key-value | Caching, real-time | Upstash, Railway |
| SQLite | Embedded | Simple apps | Turso, LiteFS |
| Supabase | Postgres+ | Full-stack apps | Supabase |
| PlanetScale | MySQL | Serverless MySQL | PlanetScale |

## Decision flowchart

```
Building a typical web app?
  → PostgreSQL (via Supabase or Neon)

Need caching or sessions?
  → Redis (Upstash for serverless)

Rapidly prototyping, schema unknown?
  → MongoDB or Supabase
  
Simple app, single server?
  → SQLite
  
Need real-time subscriptions?
  → Supabase or MongoDB
  
Want serverless MySQL?
  → PlanetScale
  
Already using MySQL ecosystem?
  → PlanetScale or managed MySQL
  
Not sure?
  → PostgreSQL
```

## Cost comparison (small app)

| Option | Monthly cost | Includes |
|--------|--------------|----------|
| Supabase Free | $0 | 500MB Postgres + auth |
| Railway Postgres | ~$5 | Usage-based |
| Neon Free | $0 | 512MB, serverless |
| PlanetScale Hobby | $0 | 5GB MySQL |
| MongoDB Atlas Free | $0 | 512MB |
| Turso Free | $0 | 8GB SQLite |

## The honest take

**For most projects**: Start with PostgreSQL. Supabase gives you the most features for free. Neon gives you serverless Postgres.

**For caching**: Add Redis (Upstash is great serverless option).

**For simplicity**: Consider SQLite. It handles more than people think.

**Don't overthink it**: Pick Postgres, start building. Database choice rarely makes or breaks an app—your code and product matter more.

**Avoid premature optimization**: You probably don't need sharding, read replicas, or fancy scaling until you have real traffic problems.

## Further reading

- [What is a database?](/basics/what-is-a-database/): Database fundamentals
- [Deployment platforms compared](/basics/deployment-platforms-compared/): Where to host
- [Choosing where to deploy](/basics/choosing-where-to-deploy/): Matching workloads to platforms
- [What is caching?](/basics/what-is-caching/): Caching fundamentals
