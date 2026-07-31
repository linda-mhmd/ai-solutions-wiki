---
title: "What is SQL?"
description: "SQL is how you talk to databases. Want to get all users who signed up this month? Store a new order? Delete old records? You write SQL. Every app with data uses it."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, sql, database, queries, crud, postgres, mysql]
faqs:
  - question: "What's the difference between SQL and NoSQL?"
    answer: "SQL databases (PostgreSQL, MySQL) store data in tables with predefined schemas—structured rows and columns. NoSQL databases (MongoDB, DynamoDB) store documents or key-value pairs with flexible schemas. SQL is better for relational data; NoSQL for unstructured or rapidly changing data."
  - question: "Should I learn raw SQL or use an ORM?"
    answer: "Both. ORMs (like Prisma, Drizzle, or SQLAlchemy) are convenient for common operations, but you'll eventually need raw SQL for complex queries, debugging, or performance tuning. Start with an ORM, but understand what SQL it generates."
  - question: "What's SQL injection and why is it dangerous?"
    answer: "SQL injection is when user input becomes part of your SQL query, allowing attackers to run their own queries. It's one of the most common security vulnerabilities. Always use parameterized queries—never concatenate user input into SQL strings."
last_updated: 2026-07-30
---

{{< quickanswer >}}
SQL (Structured Query Language) is the language for interacting with relational databases. You use it to create, read, update, and delete data—the four operations called CRUD. When your app needs to store users, orders, posts, or any persistent data, you're probably using SQL behind the scenes.
{{< /quickanswer >}}

## What SQL does

Your app's data lives in a database. SQL is how you:

- **Create** new records: "Add this user to the database"
- **Read** existing records: "Get all orders from last week"
- **Update** records: "Change this user's email address"
- **Delete** records: "Remove cancelled subscriptions"

```sql
-- Create: Add a new user
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Read: Get all users
SELECT * FROM users;

-- Update: Change Alice's email
UPDATE users SET email = 'alice@new.com' WHERE name = 'Alice';

-- Delete: Remove Alice
DELETE FROM users WHERE name = 'Alice';
```

## Tables, rows, and columns

SQL databases organize data into **tables**—like spreadsheets:

**users table:**
| id | name | email | created_at |
|----|------|-------|------------|
| 1 | Alice | alice@example.com | 2026-01-15 |
| 2 | Bob | bob@example.com | 2026-03-22 |
| 3 | Carol | carol@example.com | 2026-07-01 |

- **Columns** define what data you store (id, name, email, created_at)
- **Rows** are individual records (each user is a row)
- **Tables** group related data (users, orders, posts, etc.)

## Essential SQL queries

### SELECT: Getting data

```sql
-- Get everything from users
SELECT * FROM users;

-- Get specific columns
SELECT name, email FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE created_at > '2026-06-01';

-- Sort results
SELECT * FROM users ORDER BY created_at DESC;

-- Limit results
SELECT * FROM users LIMIT 10;

-- Combine conditions
SELECT * FROM users 
WHERE created_at > '2026-01-01' 
  AND email LIKE '%@gmail.com'
ORDER BY name;
```

### INSERT: Adding data

```sql
-- Insert one row
INSERT INTO users (name, email) VALUES ('Dave', 'dave@example.com');

-- Insert multiple rows
INSERT INTO users (name, email) VALUES 
  ('Eve', 'eve@example.com'),
  ('Frank', 'frank@example.com');
```

### UPDATE: Modifying data

```sql
-- Update specific rows
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;

-- Update multiple columns
UPDATE users SET name = 'Alice Smith', email = 'alice.smith@example.com' WHERE id = 1;

-- ⚠️ Without WHERE, updates ALL rows
UPDATE users SET status = 'inactive';  -- Probably not what you wanted!
```

### DELETE: Removing data

```sql
-- Delete specific rows
DELETE FROM users WHERE id = 1;

-- Delete with condition
DELETE FROM users WHERE created_at < '2025-01-01';

-- ⚠️ Without WHERE, deletes ALL rows
DELETE FROM users;  -- Everything is gone!
```

## Relationships: Joining tables

Real apps have related data. Users have orders. Orders have items. SQL handles this with **JOIN**:

**orders table:**
| id | user_id | total | created_at |
|----|---------|-------|------------|
| 1 | 1 | 99.00 | 2026-07-01 |
| 2 | 2 | 150.00 | 2026-07-02 |
| 3 | 1 | 50.00 | 2026-07-03 |

```sql
-- Get all orders with user names
SELECT users.name, orders.total, orders.created_at
FROM orders
JOIN users ON orders.user_id = users.id;

-- Result:
-- | name  | total  | created_at |
-- | Alice | 99.00  | 2026-07-01 |
-- | Bob   | 150.00 | 2026-07-02 |
-- | Alice | 50.00  | 2026-07-03 |
```

## Aggregating data

SQL can compute summaries:

```sql
-- Count all users
SELECT COUNT(*) FROM users;

-- Count users by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as user_count
FROM users
GROUP BY DATE_TRUNC('month', created_at);

-- Sum all order totals
SELECT SUM(total) FROM orders;

-- Average order value per user
SELECT user_id, AVG(total) as avg_order
FROM orders
GROUP BY user_id;
```

## SQL in your code

You don't type SQL into a terminal—your code sends queries:

**Raw SQL (Node.js with pg):**
```javascript
const { Pool } = require('pg');
const pool = new Pool();

// Query with parameterized values (safe from injection!)
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
console.log(result.rows);
```

**Using an ORM (Prisma):**
```javascript
// The ORM generates SQL for you
const users = await prisma.user.findMany({
  where: { 
    createdAt: { gt: new Date('2026-06-01') }
  },
  orderBy: { createdAt: 'desc' }
});

// Prisma generates:
// SELECT * FROM "User" WHERE "createdAt" > '2026-06-01' ORDER BY "createdAt" DESC
```

## SQL injection: The #1 security mistake

**Never do this:**
```javascript
// ❌ DANGEROUS: User input directly in query
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// If userInput is: ' OR '1'='1
// Query becomes: SELECT * FROM users WHERE email = '' OR '1'='1'
// This returns ALL users!
```

**Always do this:**
```javascript
// ✅ SAFE: Parameterized query
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [userInput]  // Properly escaped
);
```

ORMs handle this automatically. If you write raw SQL, use parameterized queries.

## Common SQL databases

| Database | Best for | Notes |
|----------|----------|-------|
| **PostgreSQL** | Most apps | Feature-rich, reliable, free. Default choice. |
| **MySQL** | Legacy apps, WordPress | Popular, well-documented |
| **SQLite** | Small apps, prototypes | File-based, no server needed |
| **SQL Server** | Enterprise/Microsoft shops | Commercial, Windows-focused |

For vibecoders: PostgreSQL is the default recommendation. Services like Supabase, Neon, and Railway make it easy to get a Postgres database.

## Creating tables

You define your data structure with CREATE TABLE:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,           -- Auto-incrementing ID
  name VARCHAR(100) NOT NULL,      -- Required string, max 100 chars
  email VARCHAR(255) UNIQUE,       -- Must be unique
  created_at TIMESTAMP DEFAULT NOW()  -- Auto-set to current time
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),  -- Foreign key to users
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

With ORMs, you often define this in code (schema files) and the ORM generates the SQL.

## When to use SQL vs. NoSQL

**Use SQL (PostgreSQL, MySQL) when:**
- Data has clear relationships (users have orders have items)
- You need transactions (all-or-nothing operations)
- You want strong consistency guarantees
- Schema is relatively stable

**Use NoSQL (MongoDB, DynamoDB) when:**
- Data structure varies per record
- You need extreme horizontal scaling
- Schema changes frequently
- You're storing documents, not relational data

Most apps start with SQL. It handles 90% of use cases.

## Further reading

- [What is a database?](/basics/what-is-a-database/): The broader context
- [What is JSON?](/basics/what-is-json/): How data moves between your app and database
- [What is an API?](/basics/what-is-an-api/): How frontends talk to databases through backends
