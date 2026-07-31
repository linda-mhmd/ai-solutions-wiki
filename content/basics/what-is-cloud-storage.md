---
title: "What is Cloud Storage?"
description: "Cloud storage is file storage on someone else's servers, accessible from anywhere. S3, R2, Google Cloud Storage—here's what they are, how they work, and when to use them."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, cloud, storage, s3, object-storage, files, infrastructure]
faqs:
  - question: "Is cloud storage the same as a database?"
    answer: "No. Databases store structured data—rows, columns, queries. Cloud storage stores files—images, videos, documents, backups. You'd store a user's profile picture in cloud storage, but their username and email in a database. Many apps use both."
  - question: "Why not just store files on my server?"
    answer: "You can, but files on a server disk have problems: they're gone if the server dies, they don't scale easily, and they're harder to serve globally. Cloud storage handles redundancy, backups, and global distribution automatically."
  - question: "How much does cloud storage cost?"
    answer: "Very little for small projects. S3 costs about $0.023 per GB per month for storage. A 10GB app would cost about $0.23/month for storage (plus small fees for requests). Cloudflare R2 is even cheaper with no egress fees. Most vibecoders won't spend more than a few dollars monthly."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Cloud storage is file storage that lives on servers run by Amazon, Google, Cloudflare, or similar providers. Instead of saving files to your computer or your own server, you upload them to a service that handles redundancy, backups, and global access. When someone loads an image from your app, it's served from cloud storage, not from your server's disk.
{{< /quickanswer >}}

## Why cloud storage exists

Storing files on your own server has problems:

- **Single point of failure**: Server disk dies? Files gone.
- **Doesn't scale**: Server runs out of disk space? You have to migrate.
- **Slow for distant users**: Files served from one location are slow for users far away.
- **Eats server resources**: Serving large files ties up your server instead of handling requests.

Cloud storage solves all of these:

- **Redundant by default**: Files stored across multiple data centers
- **Scales infinitely**: Store terabytes without thinking about disk space
- **Global distribution**: Files served from locations near users (via CDN)
- **Separate from your app**: Your server handles logic; cloud storage handles files

## Object storage vs file storage

Traditional file storage (like your hard drive) organizes files in folders with paths: `/users/photos/image.jpg`.

**Object storage** (what cloud services use) stores files as objects with:
- A **key** (basically a path/name): `users/photos/image.jpg`
- The **data** (the actual file contents)
- **Metadata** (content type, size, custom tags)

The key difference: object storage is flat. There are no real folders—the "/" in the key is just part of the name. This makes it massively scalable.

Services like S3 simulate folders in their UI, but underneath it's all flat key-value storage.

## The major cloud storage services

### Amazon S3 (Simple Storage Service)

The original and most widely used. "S3" has become almost generic for object storage.

- **Durability**: 99.999999999% (eleven 9s)—essentially, your files won't disappear
- **Availability**: 99.99%
- **Integration**: Works with everything in AWS and most third-party tools
- **Cost**: ~$0.023/GB/month storage + fees for requests and data transfer out

```bash
# AWS CLI example
aws s3 cp image.jpg s3://my-bucket/images/image.jpg
```

### Cloudflare R2

S3-compatible storage with no egress fees (the big differentiator).

- **No egress fees**: You don't pay when users download files
- **S3-compatible**: Works with S3 tools and SDKs
- **Built-in CDN**: Cloudflare's global network
- **Cost**: ~$0.015/GB/month, no egress

For apps with lots of downloads (images, videos, user content), R2 can be significantly cheaper than S3.

### Google Cloud Storage

Google's equivalent to S3.

- **Integration**: Best if you're already in Google Cloud
- **Cost**: Similar to S3
- **Multi-regional options**: Data replicated across regions automatically

### Azure Blob Storage

Microsoft's object storage.

- **Integration**: Best for Azure/.NET environments
- **Tiers**: Hot, cool, and archive for different access patterns

### Supabase Storage

Built on S3, but integrated with Supabase's auth and database.

- **Row-level security**: Control access based on your database rules
- **Simple API**: Easy to use from frontend
- **Good for**: Supabase users who want integrated storage

### Vercel Blob

Vercel's native storage, optimized for Next.js apps.

- **Edge-optimized**: Fast global distribution
- **Simple API**: Works seamlessly with Vercel projects
- **Good for**: Vercel users who want simple file uploads

## How cloud storage works

### Buckets

Storage is organized into **buckets**—named containers for your files. A bucket is like a top-level folder:

- `my-app-images` - user uploads
- `my-app-backups` - database backups
- `my-app-assets` - static assets

Bucket names are globally unique (across all users of the service), so you might need something like `my-app-prod-images`.

### Keys (file paths)

Within a bucket, files are identified by keys:

```
my-bucket/
├── images/
│   ├── users/
│   │   ├── 123/avatar.jpg
│   │   └── 456/avatar.jpg
│   └── products/
│       └── widget.png
└── documents/
    └── report.pdf
```

The key for the avatar would be: `images/users/123/avatar.jpg`

### URLs

Each object gets a URL:

```
https://my-bucket.s3.amazonaws.com/images/users/123/avatar.jpg
https://my-bucket.r2.cloudflarestorage.com/images/users/123/avatar.jpg
```

You can serve these directly, or put a CDN in front for better performance.

### Access control

By default, objects are private. Options for access:

- **Public read**: Anyone with the URL can download
- **Private**: Only authenticated requests can access
- **Signed URLs**: Generate temporary URLs that expire
- **Bucket policies**: Rules about who can do what

For user-uploaded content (profile pictures), you typically make them public read.
For sensitive files (documents, backups), keep them private and use signed URLs.

## Common use cases

### User uploads

When users upload profile pictures, documents, or files:

```javascript
// Pseudocode: handling file upload
async function handleUpload(file, userId) {
  const key = `users/${userId}/avatar.${file.extension}`;
  await s3.upload(file, key);
  return `https://my-bucket.s3.amazonaws.com/${key}`;
}
```

### Static assets

Images, fonts, and other assets for your app. Often served through a CDN.

### Database backups

Daily database dumps stored safely off your server:

```bash
pg_dump $DATABASE_URL | gzip | aws s3 cp - s3://backups/db-$(date +%Y%m%d).sql.gz
```

### Large file distribution

Software downloads, video content, datasets—anything too large to serve from your app server.

### Data archiving

Old data you need to keep but rarely access. Services offer cheaper "cold" storage tiers for this.

## Pricing model

Cloud storage typically charges for:

| Component | What it means |
|-----------|---------------|
| **Storage** | Per GB per month stored |
| **PUT/POST** | Each upload request |
| **GET** | Each download request |
| **Egress** | Data transferred out (downloads) |

**Egress is often the surprise cost**. If your app serves lots of images, egress fees add up fast. This is why Cloudflare R2's "no egress fees" is significant.

### Example: S3 pricing for a small app

- 10 GB stored: $0.23/month
- 100,000 GET requests: $0.04/month
- 10 GB egress: $0.90/month
- **Total**: ~$1.17/month

For most vibecoders, storage costs are trivial compared to AI API costs.

## Storage vs CDN

**Cloud storage** = where files live
**CDN** = how files are served fast

A CDN (Content Delivery Network) caches your files at edge locations worldwide. When someone in Tokyo requests an image, they get it from a Tokyo server, not from the US.

Many setups combine both:
1. Files stored in S3
2. CloudFront (AWS's CDN) or Cloudflare in front
3. Users hit the CDN, which caches popular files

Cloudflare R2 includes CDN by default. S3 requires adding CloudFront separately.

## Storage classes and tiers

Most providers offer different tiers for different access patterns:

| Tier | Use case | Cost |
|------|----------|------|
| **Standard** | Frequently accessed files | Higher storage, lower retrieval |
| **Infrequent Access** | Accessed monthly | Lower storage, higher retrieval |
| **Archive** | Rarely accessed (backups) | Very cheap storage, expensive/slow retrieval |

For most apps, Standard tier is fine. Use Archive for backups you hope to never need.

## Security considerations

### Never expose credentials

S3 access keys in your frontend code = disaster. Anyone can upload, delete, or download everything.

```javascript
// WRONG - credentials in frontend
const s3 = new S3Client({
  accessKeyId: 'AKIA...',  // Anyone can see this
  secretAccessKey: '...'
});

// RIGHT - use signed URLs from your backend
const uploadUrl = await getSignedUploadUrl(); // Backend generates this
await fetch(uploadUrl, { method: 'PUT', body: file });
```

### Validate uploads

Don't trust file extensions. Users can upload malicious files. Validate:
- File type (check actual content, not just extension)
- File size (set limits)
- Sanitize filenames

### Use signed URLs for private content

For files that shouldn't be public, generate temporary signed URLs:

```javascript
// URL valid for 1 hour
const signedUrl = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: 'private-docs',
  Key: 'sensitive-report.pdf'
}), { expiresIn: 3600 });
```

## Choosing a storage provider

| If you're using... | Consider... |
|-------------------|-------------|
| **AWS** | S3 (obvious choice) |
| **Vercel** | Vercel Blob or R2 |
| **Supabase** | Supabase Storage |
| **Any platform, high download volume** | Cloudflare R2 (no egress) |
| **Google Cloud** | Google Cloud Storage |
| **Self-hosting** | MinIO (S3-compatible, self-hosted) |

For most vibecoders: **Cloudflare R2** or **Supabase Storage** are the simplest choices with good free tiers.

## Further reading

- [What are backups?](/basics/what-are-backups/): Using cloud storage for disaster recovery
- [Where to store files in your app](/basics/where-to-store-files/): Practical guide for vibecoders
- [What is a CDN?](/glossary/cdn/): Content delivery networks
- [What is the cloud?](/basics/what-is-the-cloud/): The broader infrastructure picture
- [AWS S3 documentation](https://docs.aws.amazon.com/s3/)
- [Cloudflare R2 documentation](https://developers.cloudflare.com/r2/)
