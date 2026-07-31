---
title: "Where to Store Files in Your App"
description: "User uploads, images, documents, backups—a practical guide to where different types of files should live in a vibecoder's app."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, storage, files, database, cloud, uploads, images]
faqs:
  - question: "Can I just store everything in my database?"
    answer: "Technically yes, but you shouldn't. Databases are optimized for structured data (text, numbers, relationships), not binary files. Storing images in a database makes it bloated, slow, and expensive to back up. Store a URL/path in the database, store the actual file elsewhere."
  - question: "What about local disk storage on my server?"
    answer: "Works for small projects, but has problems: files are gone if the server dies, you can't easily scale to multiple servers, and serving large files ties up your server. Cloud storage solves these problems for very little cost."
  - question: "How do I handle file uploads from users?"
    answer: "Two approaches: (1) Upload to your server, then transfer to cloud storage—simpler to implement. (2) Get a signed URL from your backend, upload directly from browser to cloud storage—more scalable. For starting out, approach 1 is fine."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Store structured data (users, posts, settings) in your database. Store files (images, uploads, documents) in cloud storage like S3 or R2. Store sensitive config (API keys) in environment variables. Store code in Git. Don't mix these up—each storage type exists for a reason.
{{< /quickanswer >}}

## The decision guide

| What you're storing | Where it goes | Why |
|---------------------|---------------|-----|
| User data (email, name, settings) | **Database** (Postgres, Supabase) | Structured, queryable, relational |
| User uploads (profile pics, files) | **Cloud storage** (S3, R2) | Large binary files, served directly |
| App assets (logos, fonts, icons) | **Git** + static hosting | Part of the codebase, rarely changes |
| API keys, secrets | **Environment variables** | Never in code, never in database |
| Database dumps | **Cloud storage** (different bucket) | Disaster recovery |
| Logs | **Log service** or cloud storage | Searchable, rotated, archived |

## User uploads: the most common question

When users upload files to your app:

### Don't: Store files in the database

```sql
-- BAD: Storing images as binary data
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  avatar BYTEA  -- Don't do this
);
```

Problems:
- Database becomes huge (gigabytes of images)
- Backups become slow and expensive
- Can't use CDNs to serve images fast
- Every image request hits your database

### Do: Store file URLs in the database

```sql
-- GOOD: Store URL/path to the file
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  avatar_url TEXT  -- "https://storage.example.com/avatars/123.jpg"
);
```

The actual file lives in cloud storage (S3, R2, Supabase Storage). The database just knows where to find it.

### Upload flow

```
User selects file
       ↓
Frontend sends file to your backend
       ↓
Backend uploads file to cloud storage
       ↓
Cloud storage returns URL
       ↓
Backend saves URL to database
       ↓
Frontend displays image from cloud URL
```

## Code example: handling uploads

### With Supabase Storage (simplest)

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadAvatar(userId, file) {
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`${userId}/avatar.jpg`, file, {
      upsert: true
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(`${userId}/avatar.jpg`);

  // Save URL to user record
  await supabase
    .from('users')
    .update({ avatar_url: publicUrl })
    .eq('id', userId);

  return publicUrl;
}
```

### With S3 (more control)

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

async function uploadAvatar(userId, fileBuffer, contentType) {
  const key = `avatars/${userId}/avatar.jpg`;

  await s3.send(new PutObjectCommand({
    Bucket: 'my-app-uploads',
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  }));

  const url = `https://my-app-uploads.s3.amazonaws.com/${key}`;

  // Save URL to your database
  await db.users.update({
    where: { id: userId },
    data: { avatar_url: url }
  });

  return url;
}
```

## Static assets vs user uploads

**Static assets** (logos, icons, CSS, JS):
- Part of your codebase
- Checked into Git
- Deployed with your app
- Served by your hosting platform (Vercel, Netlify)
- Change rarely, cached aggressively

**User uploads** (profile pics, documents):
- Not in your codebase
- Stored in cloud storage
- URL saved in database
- Can be huge (videos, PDFs)
- Change when users change them

Don't mix these. Your app's logo goes in `/public/logo.png`. User profile pics go in cloud storage.

## Where to store different file types

### Images (profile pics, product photos)

**Store in**: Cloud storage (S3, R2, Supabase Storage)
**Reference in**: Database (URL field)
**Serve via**: CDN for fast global delivery

Consider:
- Resize on upload (don't store 10MB photos for tiny avatars)
- Generate thumbnails for lists/previews
- Use modern formats (WebP) for smaller files

### Documents (PDFs, spreadsheets, user files)

**Store in**: Cloud storage (private bucket)
**Reference in**: Database (URL + metadata)
**Access via**: Signed URLs (time-limited access)

Consider:
- Validate file types (don't accept executables)
- Scan for malware if handling untrusted uploads
- Set access controls (who can download what)

### Videos

**Store in**: Cloud storage or specialized video hosting
**For serious video**: Use Mux, Cloudflare Stream, or AWS MediaConvert

Consider:
- Videos are huge—storage costs add up
- Transcoding for different quality levels
- Streaming vs download

### Backups

**Store in**: Cloud storage (separate bucket, different region)
**Keep**: Multiple versions, retained for weeks/months

See [What are backups?](/basics/what-are-backups/) for details.

### Logs

**Store in**: Log management service (Logtail, Datadog) or cloud storage

Don't:
- Store logs only on your server (they die with the server)
- Keep logs forever (costs add up, privacy concerns)

Do:
- Rotate logs (keep last 30 days, archive older)
- Make logs searchable
- Set retention policies

## Environment variables and secrets

**Never store in**:
- Code (will end up on GitHub)
- Database (unnecessary exposure)
- Cloud storage (overkill, hard to manage)

**Store in**: Environment variables

```bash
# .env file (never commit this)
DATABASE_URL=postgres://user:pass@host:5432/db
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_live_...
```

Your hosting platform (Vercel, Railway, etc.) provides a place to set these securely.

See [What is an environment variable?](/basics/what-is-an-environment-variable/) for details.

## Organizing cloud storage

### Bucket structure

One approach:
```
my-app-uploads/          # User-generated content
├── avatars/
│   └── {userId}/avatar.jpg
├── documents/
│   └── {userId}/{filename}
└── products/
    └── {productId}/images/

my-app-backups/          # Database dumps, logs
├── database/
│   └── backup-2026-07-30.sql.gz
└── logs/
```

Another approach—separate buckets per concern:
```
my-app-avatars/
my-app-documents/
my-app-backups/
```

### Naming files

Avoid conflicts with unique identifiers:
```
# Bad - common names collide
avatar.jpg
document.pdf

# Good - unique per user/entity
users/123/avatar.jpg
documents/abc123-report.pdf

# Also good - UUIDs
uploads/550e8400-e29b-41d4-a716-446655440000.jpg
```

## Public vs private files

### Public (anyone can view)
- Profile pictures
- Product images
- Public documents

Set bucket policy to allow public read, or make individual objects public.

### Private (authenticated access only)
- User documents
- Sensitive uploads
- Backups

Keep bucket private. Generate signed URLs when someone needs access:

```javascript
// Generate URL that expires in 1 hour
const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

// User can download using this URL, but only for 1 hour
```

## Cost considerations

Storage is cheap. Egress (downloads) can be expensive.

| Service | Storage | Egress |
|---------|---------|--------|
| S3 | ~$0.023/GB/month | ~$0.09/GB |
| R2 | ~$0.015/GB/month | **Free** |
| Supabase | 1GB free, then $0.021/GB | Included |

If your app serves lots of images to users, Cloudflare R2's free egress is significant.

For most vibecoders:
- Storage costs: $1-10/month
- Egress costs: $0-50/month (depends on traffic)

Compare to AI API costs ($50-500/month) and hosting ($0-50/month).

## Migrations and vendor lock-in

Cloud storage is fairly portable:
- S3 API is the de facto standard
- R2, MinIO, Supabase Storage are S3-compatible
- Migrating = copying files + updating URLs in database

To make migration easier:
- Don't hardcode bucket URLs everywhere
- Use environment variables for base URLs
- Consider a storage abstraction layer

## Quick reference

| Type | Store in | Reference in | Access via |
|------|----------|--------------|------------|
| User profile pics | Cloud storage | Database URL | CDN / direct |
| User documents | Cloud storage (private) | Database URL | Signed URLs |
| App logos/icons | Git / static hosting | Code imports | Build process |
| API keys | Environment variables | `process.env` | Runtime |
| User data | Database | N/A | Queries |
| Database backups | Cloud storage | N/A | Manual / scripts |

## Further reading

- [What is cloud storage?](/basics/what-is-cloud-storage/): The underlying technology
- [What are backups?](/basics/what-are-backups/): Protecting your data
- [What is an environment variable?](/basics/what-is-an-environment-variable/): Storing secrets
- [What is a database?](/basics/what-is-a-database/): Structured data storage
- [Supabase Storage docs](https://supabase.com/docs/guides/storage)
- [Cloudflare R2 docs](https://developers.cloudflare.com/r2/)
