---
title: "Types of Storage Explained"
description: "Git repos, databases, S3 buckets, EBS volumes, NAS—what each type of storage is for, how they differ, and when to use which. A practical guide for builders."
date: 2026-07-30
level: 3
categories: [Basics]
tags: [storage, database, s3, ebs, nas, infrastructure, cloud, founder]
faqs:
  - question: "Why can't I just use one type of storage for everything?"
    answer: "Each storage type is optimized for different access patterns. Databases excel at queries and relationships. Object storage excels at large files served to many users. Block storage excels at low-latency server access. Using the wrong type means paying more for worse performance."
  - question: "What's the most expensive storage type?"
    answer: "It depends on access patterns, but generally: SSD block storage (EBS) > Database storage > Object storage (S3) > Archive storage. However, the real cost often comes from data transfer (egress), not storage itself."
  - question: "Should I worry about this as a beginner?"
    answer: "Not much at first. Start with what your platform provides (Supabase database, Vercel Blob, etc.). These decisions matter more as you scale. But understanding the basics helps you avoid expensive mistakes early."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Different types of storage exist because different data has different needs. Code goes in Git repos. Structured data (users, orders) goes in databases. Files (images, uploads) go in object storage (S3). Your server's operating system runs on block storage (EBS). Large shared files might use network-attached storage (NAS). Using the right type saves money and improves performance.
{{< /quickanswer >}}

## The storage landscape

| Type | What it is | Best for | Examples |
|------|------------|----------|----------|
| **Git repository** | Version-controlled code storage | Source code, config files | GitHub, GitLab |
| **Database** | Structured data with queries | User data, orders, relationships | PostgreSQL, MySQL, MongoDB |
| **Object storage** | Files accessed by URL | Images, uploads, backups | S3, R2, GCS |
| **Block storage** | Virtual hard drive | Server OS, databases, apps | EBS, Persistent Disks |
| **Network-attached storage (NAS)** | Shared file system over network | Large files accessed by multiple servers | EFS, FSx, NFS |
| **Archive storage** | Cold storage, rarely accessed | Backups, compliance data | S3 Glacier, Coldline |

## Git repositories: code storage

**What it is**: Version-controlled storage that tracks every change to every file, with full history.

**Best for**:
- Source code
- Configuration files
- Documentation (Markdown)
- Infrastructure as code (Terraform, etc.)
- Small data files that change over time

**Not for**:
- Large binary files (videos, datasets)
- User-generated content
- Secrets (use environment variables)
- Database dumps

**Cost**: GitHub is free for most uses. Storage limits exist but are generous (5GB for LFS).

**Key characteristic**: Complete history of every change. You can see who changed what, when, and why.

```bash
# Everything in your project folder goes in the repo
my-project/
├── src/           # Code - yes, put in repo
├── package.json   # Config - yes
├── .env           # Secrets - NO, add to .gitignore
└── uploads/       # User files - NO, use object storage
```

## Databases: structured data

**What it is**: Specialized storage optimized for queries, relationships, and transactions.

**Best for**:
- User accounts and profiles
- Orders, transactions, payments
- Posts, comments, likes
- Any data you need to query ("find all orders over $100 from last week")
- Data with relationships (users have orders, orders have items)

**Not for**:
- Large files (images, videos, PDFs)
- Logs (use specialized log storage)
- Static content that doesn't change

**Types**:
- **Relational (SQL)**: PostgreSQL, MySQL - structured tables with relationships
- **Document (NoSQL)**: MongoDB, DynamoDB - flexible JSON documents
- **Key-value**: Redis - fast lookups by key
- **Vector**: Pinecone, pgvector - AI embeddings and similarity search

**Cost**: Varies wildly. Managed databases (Supabase, PlanetScale, Neon) often have free tiers, then $10-50/month for small apps. Large-scale databases can cost thousands.

**Key characteristic**: You can ask questions about your data. "How many users signed up this week?" is a database query.

```sql
-- This is what databases are good at
SELECT users.name, COUNT(orders.id) as order_count
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.created_at > '2026-01-01'
GROUP BY users.id
ORDER BY order_count DESC;
```

## Object storage: files at scale

**What it is**: Flat storage for files, accessed by URL/key. No folders (just key names that look like paths).

**Best for**:
- User uploads (profile pictures, documents)
- Static assets (images, videos, audio)
- Backups and archives
- Large datasets
- Serving files to many users

**Not for**:
- Frequently updated files (each update is a new version)
- Small pieces of data you query (use a database)
- Files that need POSIX filesystem operations (use block/NAS)

**Services**:
- **AWS S3**: The original, most widely used
- **Cloudflare R2**: S3-compatible, no egress fees
- **Google Cloud Storage**: Google's equivalent
- **Supabase Storage**: Integrated with Supabase

**Cost**: Very cheap for storage (~$0.02/GB/month). Egress (downloads) can be expensive on S3 (~$0.09/GB), free on R2.

**Key characteristic**: Infinitely scalable, globally distributable, cheap. But you can't "query" it like a database.

```javascript
// Upload a file
await s3.putObject({
  Bucket: 'my-bucket',
  Key: 'users/123/avatar.jpg',
  Body: fileBuffer
});

// Get file URL
const url = `https://my-bucket.s3.amazonaws.com/users/123/avatar.jpg`;
```

## Block storage: virtual hard drives

**What it is**: A virtual disk attached to a server. Behaves exactly like a physical hard drive.

**Best for**:
- Server operating system
- Database storage (PostgreSQL's data files live on block storage)
- Applications that need filesystem access
- High-performance, low-latency access

**Not for**:
- Serving files directly to users (use object storage)
- Sharing between multiple servers (use NAS or object storage)
- Cost-sensitive bulk storage

**Services**:
- **AWS EBS**: Elastic Block Store
- **GCP Persistent Disks**
- **DigitalOcean Volumes**

**Cost**: More expensive than object storage. EBS gp3 is ~$0.08/GB/month. SSD (io2) can be $0.125/GB/month or more.

**Key characteristic**: Acts like a local disk with full filesystem semantics. Low latency. But attached to one server at a time.

```bash
# On your server, EBS appears as a mounted disk
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1      100G   25G   75G  25% /
/dev/xvdb       500G  100G  400G  20% /data  # EBS volume
```

## Network-attached storage (NAS): shared files

**What it is**: A filesystem accessible over the network by multiple servers simultaneously.

**Best for**:
- Files that multiple servers need to access
- Large media files (video editing, rendering)
- Legacy applications expecting a filesystem
- Shared application data across a cluster

**Not for**:
- Simple web apps (overkill, use object storage)
- High-transaction workloads (use a database)
- Serving files to end users (use object storage + CDN)

**Services**:
- **AWS EFS**: Elastic File System (NFS-based)
- **AWS FSx**: Windows file server or Lustre for HPC
- **GCP Filestore**
- **Self-hosted NAS**: Synology, TrueNAS

**Cost**: More expensive than object storage. EFS is ~$0.30/GB/month for standard. FSx varies by type.

**Key characteristic**: Multiple servers can read/write the same files. Useful for specific architectures, but often overkill.

## Archive storage: cold data

**What it is**: Very cheap storage for data you rarely access. Retrieval takes minutes to hours.

**Best for**:
- Old backups
- Compliance/legal data retention
- Logs you might need someday
- Anything you must keep but rarely read

**Not for**:
- Anything that needs quick access
- Active application data

**Services**:
- **S3 Glacier**: Instant retrieval (~$0.004/GB/month), Flexible (~$0.0036), Deep Archive (~$0.00099)
- **GCS Coldline/Archive**
- **Azure Archive Storage**

**Cost**: Extremely cheap storage, but retrieval has costs and delays.

**Key characteristic**: Set it and (mostly) forget it. Automated lifecycle policies can move data here.

## Comparison: storing user profile data

How would you store different parts of a user profile?

| Data | Storage type | Why |
|------|--------------|-----|
| Username, email, settings | **Database** | Queryable, relational, frequently accessed |
| Profile picture | **Object storage (S3)** | Binary file, served via CDN |
| Password hash | **Database** | Part of user record, accessed at login |
| Large uploaded documents | **Object storage** | Big files, accessed by URL |
| The URL to their documents | **Database** | Store reference, not the file itself |
| Account creation date | **Database** | Metadata, queryable |

## Comparison: storing application logs

| Log type | Early stage | At scale |
|----------|-------------|----------|
| Application logs | Console output, maybe a file | Log service (Datadog, Logtail) |
| Access logs | Hosting platform provides | Log aggregation + analytics |
| Error tracking | Sentry free tier | Sentry paid, or alternatives |
| Audit logs | Database table | Time-series database + archive |

At small scale, logs are simple. At scale, logs become a significant cost and engineering challenge.

## The decision flowchart

```
Is it code or configuration?
├── Yes → Git repository
└── No ↓

Is it structured data you need to query?
├── Yes → Database
└── No ↓

Is it a file users upload or download?
├── Yes → Object storage (S3/R2)
└── No ↓

Does your server's filesystem need direct access?
├── Yes → Block storage (EBS)
└── No ↓

Do multiple servers need to share it?
├── Yes → Consider NAS (EFS) or rearchitect to use object storage
└── No → You probably want object storage
```

## Cost comparison (approximate)

| Storage type | $/GB/month | Egress cost | Notes |
|--------------|------------|-------------|-------|
| Git (GitHub) | Free up to limits | Free | LFS has limits |
| S3 Standard | $0.023 | $0.09/GB | Egress adds up |
| Cloudflare R2 | $0.015 | **Free** | Big savings at scale |
| EBS gp3 | $0.08 | N/A | Attached to EC2 |
| EBS io2 | $0.125+ | N/A | High performance |
| EFS | $0.30 | N/A | Shared filesystem |
| RDS storage | $0.115 | N/A | Database underlying storage |
| S3 Glacier Instant | $0.004 | $0.03/GB | Cheap, slower retrieval |
| S3 Glacier Deep | $0.00099 | $0.02/GB + restore fees | Very cheap, hours to retrieve |

## Real-world example: a SaaS app

A typical SaaS might use:

```
Application:
├── Code → GitHub (free)
├── Database (Postgres)
│   ├── Users, subscriptions, app data
│   └── ~$25/month (Supabase Pro)
├── Object storage (R2)
│   ├── User uploads, generated reports
│   └── ~$5/month (50GB + free egress)
├── Server (Railway/Render)
│   ├── Includes some block storage
│   └── ~$20/month
└── Logs (Logtail)
    └── ~$0-20/month

Total early stage: ~$50-70/month
```

As you scale to thousands of users:

```
├── Database → $200-500/month (more data, read replicas)
├── Object storage → $50-200/month (more uploads)
├── Servers → $100-500/month (more capacity)
├── Logs → $100-300/month (more volume)
├── Backups → $50-100/month (more to back up)

Total growth stage: $500-1500/month
```

## Common mistakes

### Storing files in the database
Databases can store binary data (BLOB), but shouldn't. Your database becomes huge, slow, and expensive to back up.

### Storing structured data in S3
JSON files in S3 aren't queryable. If you need to ask "find all users who..." use a database.

### Using EBS when S3 would work
EBS is expensive and tied to one server. If files don't need filesystem semantics, use S3.

### Not planning for egress costs
S3 egress is $0.09/GB. A viral moment with 1TB of downloads = $90 surprise. Use R2 or CloudFront caching.

### Ignoring lifecycle policies
Old data should move to cheaper tiers automatically. S3 lifecycle policies do this.

## Further reading

- [Where to store files](/basics/where-to-store-files/): Practical guide for common scenarios
- [What is cloud storage?](/basics/what-is-cloud-storage/): Object storage deep dive
- [What are backups?](/basics/what-are-backups/): Protecting your data
- [Storage costs as you scale](/basics/storage-costs-as-you-scale/): Planning for growth
- [What is a database?](/basics/what-is-a-database/): Database fundamentals
