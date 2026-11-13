---
title: "Part 1: Storage and databases"
description: "Part 1 of If You Were an AWS Service, a fun intro to AWS: the answers that picked Amazon S3, Amazon Aurora, Aurora DSQL and Amazon DynamoDB at AWS Hero Summit Seattle 2025, and what each service does."
date: 2026-11-12
last_updated: 2026-11-13
lastmod: 2026-11-13
weight: 1
part: 1
group: "Storage & databases"
summary: "Where data lives: S3 for files, Aurora and Aurora DSQL for relational data, DynamoDB for fast key-value data."
tags: ["aws", "beginner", "video", "storage", "database"]
services: ["aws-s3", "amazon-dynamodb"]
---

This part is about where data lives.

### Amazon S3

> **The answers:** S3, because it is basic but useful. Because it is simple. Infinitely scalable. Old school and trustworthy. Eleven nines reliable. Easy and cheaper. The service the world runs on.

S3 gets more answers than any other service in the film. S3 is AWS's object storage service. You keep data as objects in buckets and get them back by name. It has two main moves: PUT stores a file, GET gives it back. A normal (general purpose) bucket has no real folders. Every file has a name, its key, and the slashes in that name only look like folders. Only the newer directory buckets keep data in real directories.

The explainers take the answers in turn:

- **Eleven nines reliable.** Durability and availability are two separate numbers. Durability is how safely your data is kept. Availability is whether you can reach it.
- **Infinitely scalable.** There is no limit on how much data you store. The limit is per object: a single file can be up to fifty terabytes, ten times the old limit of five, since December 2025.
- **Easy and cheaper.** A lifecycle rule moves data you rarely need to cheaper storage classes on its own. Getting it back from the coldest class, Glacier Deep Archive, takes hours: a standard retrieval typically finishes within twelve.
- **Old school.** S3 launched on 14 March 2006.

### Amazon Aurora and Aurora DSQL

> **The answers:** one person picks Aurora, another Aurora DSQL. Their reasons are in the full video.

Aurora is AWS's fully managed relational database engine, compatible with MySQL and PostgreSQL. It cuts your data into 10 GiB segments and copies each one six ways, across three Availability Zones. Aurora DSQL is a serverless, distributed relational database for transactions. It became generally available in May 2025.

### Amazon DynamoDB

> **The answer:** DynamoDB, because it is speedy, efficient, and like a Swiss army knife.

DynamoDB is a serverless, fully managed NoSQL database with single-digit millisecond performance at any scale. The explainer opens the Swiss army knife: it holds key-value items and documents, streams every change, runs all-or-nothing transactions and replicates tables across Regions. The knife has a catch too: AWS's own documentation calls DynamoDB data modelling a challenging skill to learn.

## Sources

1. AWS, "Amazon S3 increases the maximum object size to 50 TB" (2 December 2025): https://aws.amazon.com/about-aws/whats-new/2025/12/amazon-s3-maximum-object-size-50-tb/
2. AWS News Blog, "Twenty years of Amazon S3 and building what's next" (13 March 2026), for the 14 March 2006 launch: https://aws.amazon.com/blogs/aws/twenty-years-of-amazon-s3-and-building-whats-next/
3. Amazon S3 User Guide, "Organizing objects in the Amazon S3 console by using folders" (flat structure of general purpose buckets): https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-folders.html
4. Amazon S3 User Guide, "Working with directory buckets": https://docs.aws.amazon.com/AmazonS3/latest/userguide/directory-buckets-overview.html
5. Amazon S3 User Guide, "Managing the lifecycle of objects": https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
6. Amazon S3 User Guide, "Understanding archive retrieval options" (Deep Archive standard retrievals within 12 hours): https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html
7. Amazon Aurora User Guide, "What is Amazon Aurora?": https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html
8. Amazon Aurora, availability and durability FAQ (10 GiB segments, six copies across three Availability Zones): https://docs.aws.amazon.com/rds/latest/auroraextendedcontent/aurora-faq-availability-and-durability.html
9. AWS, "Amazon Aurora DSQL is now generally available" (27 May 2025): https://aws.amazon.com/about-aws/whats-new/2025/05/amazon-aurora-dsql-generally-available/
10. Amazon DynamoDB product page ("single-digit millisecond performance at any scale"): https://aws.amazon.com/dynamodb/
11. Amazon DynamoDB Developer Guide, "What is Amazon DynamoDB?": https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html
12. Amazon DynamoDB Developer Guide, "Data modeling for DynamoDB tables" ("can be a challenging skill to learn"): https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/data-modeling.html
