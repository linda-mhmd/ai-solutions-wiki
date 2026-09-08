---
title: "Supabase vs Firebase vs AWS Amplify - Backend-as-a-Service for AI Apps"
description: "A constraint-driven comparison for teams building AI-powered apps: which of these three actually gates on exit cost and jurisdiction, and which one's vector search is native versus something you bolt on and pay for separately."
date: 2026-09-04
categories: [Comparisons]
tags: ["backend-as-a-service", "supabase", "firebase", "aws-amplify", "postgresql", "vector-search", "rag", "vendor-lock-in", "pricing"]
tools: ["supabase", "google-firebase", "aws-amplify"]
related:
  - guides/constraint-driven-comparisons
  - guides/software-licensing-and-vendor-lock-in
  - guides/cloud-exit-costs-and-data-gravity
  - glossary/vector-database
  - comparisons/weaviate-vs-pgvector
  - glossary/cloud-act
last_verified: 2026-09-04
last_updated: 2026-09-04
lastmod: 2026-09-04
---

A feature comparison of Supabase, Firebase, and AWS Amplify looks like a wash: all three give you auth, a database, file storage, serverless functions, and a client SDK, and all three now advertise an AI story. That symmetry is exactly what the [constraint-driven comparison methodology](/guides/constraint-driven-comparisons/) on this wiki warns against — it hides the two questions that actually decide this choice for an AI-powered application. First, what happens to your data model when the "database" needs to hold both relational application state and embeddings for retrieval-augmented generation (RAG)? Second, if the vendor relationship goes wrong — a pricing change, an acquisition, a compliance requirement that appears after launch — what does leaving actually cost? These are not features on a checklist. They are constraints that rule options in or out before a single API call is compared.

## What each one actually is

**Supabase** is an open-source backend-as-a-service built around plain PostgreSQL. Auth (GoTrue), the auto-generated REST/GraphQL layer (PostgREST), realtime, and storage are separate open-source components Supabase packages and operates as a managed platform; the core stack is Apache-2.0/MIT licensed and ships as an official Docker Compose setup for self-hosting.[^1][^2] Because the database is Postgres, vector search is the `pgvector` extension running in the same instance as your relational tables, not a bolted-on service.[^3]

**Firebase** is Google's fully managed application platform, built on Firestore, a proprietary NoSQL document database with no self-hosted or open-source equivalent. It has no exit path other than exporting data out of Google's infrastructure entirely. For AI features it connects to Vertex AI and, on-device, to ML Kit; see [Google Firebase](/tools/google-firebase/) and [Cloud Firestore](/tools/google-firestore/) for the platform-level detail this page does not repeat.

**AWS Amplify** is not a database product at all — it is a hosting/CI-CD layer and a code-generation library that provisions and connects to standard AWS services (Cognito for auth, AppSync + DynamoDB for data by default, S3 for storage, Lambda for functions) inside the customer's own AWS account. As of Amplify Gen 2 (the current, TypeScript-first generation), AWS explicitly recommends Gen 2 for new projects; Gen 1 remains supported only for "high-priority bugs and essential security updates," and the two generations cannot coexist in one app.[^4] Gen 2's Data library defaults to DynamoDB through AppSync but can connect to an existing PostgreSQL or MySQL database instead of provisioning its own.[^5]

## The constraints that decide this, not the features

Four categories from the [general constraint framework](/guides/constraint-driven-comparisons/) carry real weight here, plus one that is specific to AI/RAG workloads and doesn't fit neatly into the general list.

**Vendor lock-in and exit cost.** Of the three, only Supabase has a documented, licensed, working self-host path. Firebase and Amplify do not — Amplify's resources live in your AWS account, which is a different (and lesser) kind of portability than being able to run the whole stack anywhere, including off any hyperscaler.

**Cost structure.** The three bill on fundamentally different units — compute-hours plus storage/egress overage (Supabase), per-document-operation (Firestore), and a hosting/CI-CD layer billed separately from the AWS backend services it provisions (Amplify) — so a like-for-like number requires your own traffic shape, not a vendor's example.

**Internal capability.** Self-hosting Supabase, wiring Amplify's AppSync resolvers to Bedrock, and operating within Firebase's opinionated defaults each assume a different operational skill the team either has or must build.

**Trust and jurisdiction.** All three vendors' *managed* offerings are US-headquartered companies subject to the same jurisdictional exposure discussed in [the US CLOUD Act](/glossary/cloud-act/); the only one of the three where that exposure is structurally avoidable is Supabase, and only via the self-hosted path run by a non-US operator.

**AI/RAG data-model fit** (the domain-specific constraint this comparison exists for). Whether vector search is native to the database you already have, or a separate service you must provision, secure, and pay for regardless of whether it's queried, changes both the architecture and the bill.

## Gates

These rule an option out entirely for a reader who has the stated requirement — they are not weighed against the rest of the comparison.

- **A hard requirement to self-host, or to run entirely outside a US hyperscaler's control plane** (data residency mandate with no exception for a US-owned processor, a contractual ban on Google/AWS dependency, air-gapped deployment) gates out Firebase and Amplify outright. Neither has a self-hosted or non-hyperscaler deployment mode; Supabase's Docker Compose stack does. Note the caveat directly from Supabase's own documentation: self-hosted deployments do not inherit the hosted platform's compliance controls automatically — HIPAA and SOC 2 posture on a self-hosted instance is the adopter's responsibility to build and audit, not something Supabase configures for you.[^6]
- **A single-cloud mandate that names AWS as the only approved vendor** gates out Firebase (Google-only, no AWS deployment mode exists). **A single-cloud mandate naming GCP** gates out Amplify (AWS-only). This sounds obvious stated this way, but it is frequently missed when the mandate lives in a security review from a year before the backend decision, not the backend decision itself.
- **A requirement that user credentials be portable to a future identity provider without forcing a password reset** gates out any architecture built on Amazon Cognito as its auth layer (which most Amplify apps use). AWS's own reference architecture for exporting Cognito user data is explicit that "it does not export sensitive information, such as user passwords."[^7] There is no supported path to extract password hashes from Cognito at all — migrating away means every user resets their password. Firebase Authentication and Supabase's GoTrue have the same practical limitation for password hashes (neither vendor exposes them either), so this is not a reason to prefer Firebase or Supabase over Amplify specifically — it is a reason to gate out *any* of the three if credential portability without a forced reset is the actual requirement, and to plan for a reset flow if it isn't.

## Tradeoffs

These are genuinely worth weighing, not disqualifying.

**Vector search: native-and-relational vs. native-with-limits vs. not-yours-to-provide.**

| | Supabase | Firebase (Firestore) | AWS Amplify |
|---|---|---|---|
| Vector capability | `pgvector` extension, same Postgres instance as relational data[^3] | Native vector field type + `findNearest` query[^8] | None built in; delegates to Amazon Bedrock Knowledge Bases[^9] |
| Search method | ANN (HNSW or IVFFlat indexes) | **Exact** KNN via a flat index — not ANN[^8] | Depends entirely on the vector store chosen for the Bedrock Knowledge Base |
| Known scale limits | Practical limit is Postgres/index tuning, not a hard vendor cap | Max embedding dimension 2048; Standard edition returns at most 1,000 documents per query; no realtime listeners on vector queries[^8] | None documented by Amplify — the limits belong to whichever store (OpenSearch Serverless or Aurora Postgres/pgvector) backs the Knowledge Base |
| Relational filtering alongside vector search | Native — same SQL query, joins and `WHERE` clauses included | Composite index required to pre-filter by scalar fields alongside the vector query[^8] | Handled by the Bedrock Knowledge Base's own metadata filtering, a separate system from Amplify's data layer |
| What you provision | Nothing extra — it's an extension you enable | Nothing extra — it's a field type | A Bedrock Knowledge Base **and** its backing vector store; Amplify's own docs warn that the default option, OpenSearch Serverless, "has a default cost whether or not you use it"[^9] |

The practical read: Supabase's RAG path is the fewest moving parts because the vector index lives beside the data it's retrieving context for. Firestore's vector search is genuinely native — not an afterthought — but exact KNN and a 1,000-row return cap on Standard edition make it a fit for smaller, well-scoped corpora rather than an open-ended knowledge base; teams hitting that ceiling are pushed toward Firestore Enterprise edition or an external vector store regardless. Amplify's AI Kit gives you a well-documented Conversation/Knowledge Base route into Bedrock, but the vector layer itself is always a separate AWS resource you stand up, secure, and — in OpenSearch Serverless's case — pay a baseline for whether or not it's being queried.

**Pricing model shape, not a single number.** Supabase Pro is $25/month with an included $10 compute credit (covering one Micro instance), 8 GB database storage before $0.125/GB overage, 250 GB egress before $0.09/GB, and 100,000 MAUs before $0.00325/MAU; Team moves to $599/month for SOC 2/ISO 27001 posture and SLA-backed support.[^1] Firestore on the Blaze (pay-as-you-go) plan bills per document read, write, and delete plus storage and egress, with rates that vary by region — Google routes pricing lookups to its regional pricing pages rather than publishing one flat table, so a same-shaped workload can cost differently depending on where the database lives.[^10] Amplify's own pricing page covers only the hosting/CI-CD layer — free build minutes up to 1,000/month then $0.01/minute, 5 GB of CDN storage free then $0.023/GB, 15 GB of data transfer free then $0.15/GB — and states plainly that "backend services (databases, authentication, APIs) have separate pricing structures through their respective AWS services."[^11] That last point is a structural difference, not a footnote: an Amplify total cost of ownership is the sum of Amplify Hosting, DynamoDB or your external database, Cognito, AppSync, Lambda, and (for AI features) Bedrock and its Knowledge Base backing store — each billed and capped independently, versus Supabase's and Firebase's single consolidated bill.

**Internal capability required.** Firebase asks the least backend expertise of a team — the tradeoff is the least control. Supabase Cloud is comparably low-effort to Firebase for teams that never self-host; the self-hosting path (the thing that makes the exit-cost gate above real) requires genuine Postgres operations capability. Amplify assumes comfort with AWS's service model even though Gen 2's TypeScript-first backend definitions lower that bar versus Gen 1's CLI-and-console workflow.[^4][^5]

## What this comparison cannot resolve

Which region Firestore or a Supabase project should be deployed in for a specific regulatory reading of data residency is a legal question this page cannot answer generally — see [data sovereignty](/glossary/data-sovereignty/) for the vocabulary and take it to counsel for the specific jurisdiction. The actual dollar cost at your traffic shape requires your own read/write ratio, MAU count, and egress pattern run through each vendor's calculator — the unit-price comparison above is real, but multiplying it out on invented numbers would be exactly the sales-collateral move this methodology exists to avoid. Whether a self-hosted Supabase deployment meets a specific compliance framework (HIPAA, FedRAMP, a specific customer's security questionnaire) depends on how the adopter configures and audits that deployment — Supabase's own documentation is explicit that this is not inherited automatically from the hosted platform's certifications.[^6] And this comparison does not cover collaborative/realtime editing depth, mobile offline-sync maturity, or admin-UI quality — real differences, but ones that don't gate or trade off the same way the constraints above do; they're a feature comparison, and this page deliberately isn't one.

## Further reading

- [Constraint-driven comparisons](/guides/constraint-driven-comparisons/): the methodology behind this page's structure.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): how to price an exit before you need one.
- [Cloud exit costs and data gravity](/guides/cloud-exit-costs-and-data-gravity/): what actually makes leaving a platform expensive, beyond the license.
- [Vector database](/glossary/vector-database/): the general concept behind `pgvector`, Firestore's vector field, and Bedrock Knowledge Bases' backing stores.
- [Weaviate vs pgvector](/comparisons/weaviate-vs-pgvector/): the dedicated-vector-database-vs-Postgres-extension question in full, for when pgvector's scale ceiling is the binding constraint.
- [The US CLOUD Act](/glossary/cloud-act/): the jurisdictional exposure that applies to all three vendors' managed offerings.
- [Supabase](/tools/supabase/), [Google Firebase](/tools/google-firebase/), [Cloud Firestore](/tools/google-firestore/), [pgvector](/tools/pgvector/), [AWS Amplify](/tools/aws-amplify/): platform-level detail this comparison intentionally does not repeat.

## Sources

[^1]: Supabase, "Pricing": [https://supabase.com/pricing](https://supabase.com/pricing)
[^2]: Supabase Docs, "Self-Hosting" and "Self-Hosting with Docker": [https://supabase.com/docs/guides/self-hosting](https://supabase.com/docs/guides/self-hosting) / [https://supabase.com/docs/guides/self-hosting/docker](https://supabase.com/docs/guides/self-hosting/docker)
[^3]: Supabase Docs, "AI & Vectors: Vector columns" (pgvector): [https://supabase.com/docs/guides/ai/vector-columns](https://supabase.com/docs/guides/ai/vector-columns)
[^4]: AWS Amplify Docs, "FAQ" (Gen 1 vs Gen 2 support status): [https://docs.amplify.aws/react/how-amplify-works/faq/](https://docs.amplify.aws/react/how-amplify-works/faq/)
[^5]: AWS Amplify Docs, "Connect to existing data sources": [https://docs.amplify.aws/react/build-a-backend/data/connect-to-existing-data-sources/](https://docs.amplify.aws/react/build-a-backend/data/connect-to-existing-data-sources/)
[^6]: Supabase Docs, "HIPAA compliance and Supabase": [https://supabase.com/docs/guides/security/hipaa-compliance](https://supabase.com/docs/guides/security/hipaa-compliance)
[^7]: AWS, "Cognito User Profiles Export Reference Architecture — Overview / Limitations": [https://docs.aws.amazon.com/solutions/latest/cognito-user-profiles-export-reference-architecture/overview.html](https://docs.aws.amazon.com/solutions/latest/cognito-user-profiles-export-reference-architecture/overview.html)
[^8]: Google Cloud, "Search with vector embeddings" (Firestore vector search): [https://docs.cloud.google.com/firestore/native/docs/vector-search](https://docs.cloud.google.com/firestore/native/docs/vector-search)
[^9]: AWS Amplify Docs, "Knowledge Base": [https://docs.amplify.aws/react/ai/conversation/knowledge-base/](https://docs.amplify.aws/react/ai/conversation/knowledge-base/)
[^10]: Firebase Docs, "Understand Cloud Firestore billing" and Google Cloud Firestore pricing: [https://firebase.google.com/docs/firestore/pricing](https://firebase.google.com/docs/firestore/pricing) / [https://cloud.google.com/firestore/pricing](https://cloud.google.com/firestore/pricing)
[^11]: AWS Amplify, "Pricing": [https://aws.amazon.com/amplify/pricing/](https://aws.amazon.com/amplify/pricing/)
