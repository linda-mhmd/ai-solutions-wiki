---
title: "Amazon DynamoDB - Fully Managed NoSQL Database"
description: "Amazon DynamoDB is a fully managed, serverless NoSQL database that delivers single-digit millisecond performance at any scale for key-value and document workloads."
date: 2026-03-28
categories: [Tools]
tags: [AWS, nosql, database, serverless, key-value, "aws-service"]
related:
  - tools/azure-cosmos-db
  - tools/google-firestore
  - tools/google-cloud-bigtable
  - tools/aws-lambda
  - glossary/nosql-databases
  - glossary/serverless
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
layer: data
provider: aws
pricing_model: payg
maturity: production
---

Amazon DynamoDB is a fully managed NoSQL database service provided by AWS that supports key-value and document data models. It delivers consistent single-digit millisecond response times at any scale, making it a foundational service for applications that require low-latency data access. DynamoDB handles table creation, scaling, backups, and replication without requiring database administration. For AI workloads, DynamoDB serves as a fast metadata store, session state backend, feature store for real-time inference, and event-driven data source via DynamoDB Streams.

Official documentation: https://docs.aws.amazon.com/dynamodb/
Pricing: https://aws.amazon.com/dynamodb/pricing/
Service quotas: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html

## What a NoSQL key-value database is, in plain words

Before the AWS specifics, the foundation. A traditional **relational database** (such as PostgreSQL or MySQL) stores data in tables of rows and columns and lets you join those tables together with SQL. That model is powerful, but joins and a fixed schema can get slow and hard to scale once a single table holds enormous amounts of data.

A **NoSQL database** trades some of that flexibility for scale and speed. DynamoDB is a **key-value and document** store: every item is found by a **primary key** (think of it as a unique label), and the database is built so that looking up an item by its key stays fast no matter how many items there are. There are no joins. Instead, you design your tables around the exact queries your application will run. See {{< relref "glossary/nosql-databases" >}} and {{< relref "glossary/data-modeling" >}} for the background concepts.

DynamoDB is also **serverless**: you do not provision or patch servers, and capacity grows and shrinks with your traffic. See {{< relref "glossary/serverless" >}}. Because it is distributed across many machines and AWS Regions, its consistency behaviour is shaped by the tradeoffs in the {{< relref "glossary/cap-theorem" >}} and {{< relref "glossary/pacelc-theorem" >}}: by default a read can be eventually consistent (very fast, but may briefly miss the newest write), and you can request a strongly consistent read when you need the latest value.

In an AI application, this is the layer that holds the small, fast-changing facts a model and its surrounding code need: chat session state, user and document metadata, a {{< relref "glossary/feature-store" >}} of features for real-time inference, and an audit trail of agent actions.

## Key Capabilities

- **Serverless Scaling** - Automatically scales throughput capacity up and down based on traffic patterns with on-demand or provisioned capacity modes, requiring no capacity planning for unpredictable workloads. Since the November 2024 price cut, on-demand is AWS's recommended default for most workloads
- **Single-Digit Millisecond Latency** - Consistent low-latency reads and writes regardless of table size, critical for real-time AI inference pipelines that require fast feature lookups. DynamoDB Accelerator (DAX) adds an in-memory cache for microsecond reads
- **DynamoDB Streams** - Captures a time-ordered sequence of item-level modifications (a form of {{< relref "glossary/change-data-capture" >}}), enabling event-driven architectures where data changes trigger AWS Lambda functions for AI processing
- **Global Tables** - Fully managed multi-region, multi-active replication for globally distributed applications. Replication is eventually consistent by default. As of June 30, 2025, global tables also offer optional multi-Region strong consistency, giving a recovery point objective (RPO) of zero for the most critical reads
- **Zero-ETL Analytics** - Changes to a table can be replicated automatically into Amazon Redshift, Amazon SageMaker Lakehouse, and Amazon OpenSearch Service, so you can run analytics and machine learning queries without building your own ETL pipelines

## AWS/Cloud Equivalent

DynamoDB is AWS's flagship NoSQL database. Azure Cosmos DB offers similar globally distributed NoSQL capabilities with additional multi-model support (graph, Cassandra, MongoDB APIs). Google Cloud Firestore provides a document database with real-time synchronization and offline support, while Google Cloud Bigtable targets wide-column analytical workloads at petabyte scale. DynamoDB's pricing model based on read/write capacity units and its deep integration with Lambda and other AWS services make it the natural choice within the AWS ecosystem.

## Origins and History

Amazon DynamoDB was launched on January 18, 2012, building on the principles described in the 2007 Dynamo paper (Giuseppe DeCandia, Werner Vogels, and colleagues), presented at the ACM Symposium on Operating Systems Principles (SOSP). That paper described the internal key-value store Amazon used for its shopping cart and other highly available services. Dynamo (2007) and DynamoDB (2012) are separate systems that share design principles but have very different implementations. DynamoDB delivered those distributed systems concepts as a fully managed cloud service. DynamoDB Streams launched in 2015, enabling event-driven architectures. Global Tables for multi-region replication followed in 2017. On-demand capacity mode, which eliminated the need for provisioned throughput planning, was introduced at re:Invent 2018. The service later added PartiQL (a SQL-compatible query language), export to Amazon S3, and integration with AWS Glue for ETL processing.

## Recent Developments (2024 to 2026)

- **On-demand and global tables price cuts (November 1, 2024)** - On-demand throughput pricing dropped by 50 percent, and replicated write pricing for global tables fell by up to 67 percent. AWS now positions on-demand as the default and recommended mode for most workloads.
- **Configurable point-in-time recovery (January 2025)** - The PITR backup window is now configurable per table from 1 to 35 days (it was previously fixed at 35), which helps meet compliance requirements for shorter retention.
- **Multi-Region strong consistency for global tables (generally available June 30, 2025)** - Previewed at re:Invent 2024 and now GA, this lets globally distributed applications read the latest committed data from any Region with a zero RPO, for use cases such as inventory and financial transactions.
- **Zero-ETL integrations** - Managed integrations into Amazon Redshift, Amazon SageMaker Lakehouse, and Amazon OpenSearch Service keep operational DynamoDB data in sync with analytics and search without custom pipelines.

## Best Practices

AWS publishes specific design guidance for DynamoDB. The official [Best practices for designing and architecting with DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html) guide covers partition key design, secondary indexes, and single-table modelling, and includes the DynamoDB Well-Architected Lens. For the broader cloud architecture context, see the [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) and {{< relref "foundations/well-architected" >}}. The core idea: model your tables around your application's access patterns rather than normalising data as you would in a relational database.

## Sources

1. AWS. "Amazon DynamoDB Documentation." https://docs.aws.amazon.com/dynamodb/
2. AWS. "Amazon DynamoDB (product page)." https://aws.amazon.com/dynamodb/
3. AWS. "Best practices for designing and architecting with DynamoDB." https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html
4. DeCandia, G., Hastorun, D., Jampani, M., Kakulapati, G., Lakshman, A., Pilchin, A., Sivasubramanian, S., Vosshall, P., Vogels, W. "Dynamo: Amazon's Highly Available Key-value Store." ACM SOSP, 2007. https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf
5. AWS. "Amazon DynamoDB global tables with multi-Region strong consistency is now generally available." June 30, 2025. https://aws.amazon.com/about-aws/whats-new/2025/06/amazon-dynamo-db-global-tables-multi-region-strong-consistency-generally-available/
6. AWS. "Amazon DynamoDB now supports configurable point-in-time-recovery periods." January 2025. https://aws.amazon.com/about-aws/whats-new/2025/01/amazon-dynamodb-configurable-point-in-time-recovery-periods
7. AWS. "Amazon DynamoDB reduces prices for on-demand throughput and global tables." November 2024. https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-dynamo-db-reduces-prices-on-demand-throughput-global-tables
