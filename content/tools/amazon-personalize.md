---
title: "Amazon Personalize - ML-Powered Recommendations"
description: "A comprehensive reference for Amazon Personalize: building recommendation engines, real-time personalization, and campaign management for enterprise applications."
date: 2026-03-28
categories: [Tools]
tags: [AWS, recommendations, ML, personalization, "aws-service"]
related:
  - tools/amazon-bedrock
  - tools/amazon-sagemaker
  - tools/aws-s3
  - tools/azure-personalizer
  - tools/google-recommendations-ai
layer: data
provider: aws
pricing_model: payg
maturity: production
last_updated: 2026-06-14
lastmod: 2026-06-14
enhanced_pass: "2026-06"
---

Amazon Personalize is a managed machine learning service that generates individualized recommendations for users. It uses the same recommendation technology that Amazon.com uses for product suggestions. You provide interaction data (user clicked item X, user purchased item Y), and Personalize trains models that predict what each user is most likely to engage with next. No ML expertise is required to get started, though the service exposes tuning parameters for teams that want fine-grained control.

Amazon Personalize has been generally available since 10 June 2019 and remains active and open to new customers as of June 2026. It is a fully managed service, so AWS runs the training infrastructure and the serving endpoints for you.

Official documentation: https://docs.aws.amazon.com/personalize/
Pricing: https://aws.amazon.com/personalize/pricing/
Service quotas: https://docs.aws.amazon.com/personalize/latest/dg/limits.html

## Foundations for Beginners

A few concepts make the rest of this page easier to follow.

- **Recommendation engine** - a system that predicts which items a person is most likely to want next, based on what they and other people have done before. Streaming "up next" rows and shopping "you might also like" rails are recommendation engines.
- **Collaborative filtering** - the core idea behind most recommenders: if two users behaved similarly in the past, each is likely to enjoy what the other engaged with. Personalize learns these patterns automatically from your interaction data.
- **Training** - the step where the service studies your historical data to build a model. See {{< relref "glossary/supervised-learning" >}} for the broader machine learning idea this builds on.
- **Inference** - using the trained model to answer a live request, here "what should I show this user?" See {{< relref "glossary/inference" >}}.
- **Embeddings** - numeric representations of items or text that place similar things close together, which is how the newer content-based recipe finds related items. See {{< relref "glossary/embeddings" >}}.
- **Managed service** - you supply data and configuration; AWS provisions, scales, and patches the underlying servers. You do not manage any machine learning infrastructure yourself.

In the AI stack, Personalize sits in the data and applications space: it turns behavioural data into a prediction your product can call at request time. It does not replace a large language model, and it is a different tool from a generative AI service like {{< relref "tools/amazon-bedrock" >}}.

## Core Concepts

**Dataset Group** - The top-level container. It holds three dataset types: Interactions (required, the event history of user-item actions), Items (optional metadata like category, price, genre), and Users (optional metadata like age segment, subscription tier).

**Solution** - A trained model. You select a recipe (algorithm type), Personalize trains on your data, and produces a solution version. Recipes include User-Personalization (general recommendations), Similar-Items (item-to-item), and Personalized-Ranking (reranking a supplied list).

**Campaign** - A deployed endpoint that serves real-time recommendations. You create a campaign from a solution version and call it via API to get recommendations for a specific user. Campaigns have a configurable minimum throughput (transactions per second) that affects cost.

**Event Tracker** - A real-time ingestion endpoint. As users interact with your application, you send events (clicks, views, purchases) to the tracker. Personalize incorporates these events into recommendations immediately, without retraining.

## Recipe Selection

Choosing the right recipe is the most consequential decision in a Personalize project.

**User-Personalization** is the default choice for most use cases. It generates a ranked list of items for a specific user based on their interaction history and the behavior patterns of similar users. This is the recipe to use for "recommended for you" experiences.

**Similar-Items** generates recommendations based on item co-occurrence in interaction data plus item metadata. Use this for "customers who viewed this also viewed" or "related products" experiences. It does not require a user context, making it useful for anonymous or new users.

**Personalized-Ranking** takes a list of items you supply and reranks them for a specific user. This is valuable when you have a curated list (search results, category page items) and want to personalize the ordering without changing the set.

**Trending-Now** surfaces items rising in popularity fastest across your users, refreshed as often as every 30 minutes. It is the recipe for fast-moving catalogs such as news, social posts, or new releases (added January 2023).

### The v2 recipes

In May 2024, AWS released **User-Personalization-v2** and **Personalized-Ranking-v2**, built on a Transformers architecture. They train on much larger catalogs (up to 5 million items and 3 billion interactions) with lower inference latency. AWS reports that the v2 recipes improved recommendation accuracy by up to 9 percent and recommendation coverage by up to 1.8 times compared with the previous versions. For new projects, prefer the v2 recipes unless you have a specific reason to use the originals. Note that v2 also changed the pricing shape (see Pricing below).

**Semantic-Similarity** (added 30 November 2025) is a content-based related-items recipe. Instead of relying on user-item co-occurrence, it builds embeddings from item titles and descriptions to find semantically similar items, which makes it strong for cold-start items and catalogs where meaning matters more than click patterns. It can train on up to 10 million items.

## Data Requirements

Personalize requires a minimum of 1,000 interaction records from at least 25 unique users (and at least two items) to train a model. These are floors, not targets: AWS recommends supplying considerably more historical data because larger datasets generally produce more accurate models. The interaction dataset must include a USER_ID, ITEM_ID, and TIMESTAMP (a Unix timestamp in seconds) at minimum.

Data quality matters more than quantity. Remove bot traffic, test accounts, and duplicate events before import. If your interaction data is sparse, supplement it with item and user metadata to help the model generalize.

## Real-Time vs Batch Recommendations

**Real-time** recommendations via campaigns are the primary pattern, designed for low-latency calls at request time. Use this for web and mobile applications where recommendations are generated at page load. The v2 recipes specifically target lower inference latency for large catalogs.

**Batch recommendations** generate recommendations for all users at once, outputting to S3. Use this for email campaigns, push notification targeting, or pre-computing recommendations for offline consumption. Batch jobs are significantly cheaper than maintaining a campaign endpoint.

## Cold Start Handling

New users with no interaction history are a common challenge. Personalize handles this through exploration: the User-Personalization recipe automatically balances exploitation (recommending items the model is confident about) with exploration (surfacing items that need more data). You can tune the exploration weight to control this balance.

For new items, include rich item metadata (categories, tags, descriptions) so the model can recommend them based on attribute similarity even before interaction data accumulates. The Semantic-Similarity recipe is purpose-built for this case, because it can match new items by the meaning of their descriptions before any interactions exist.

## Pricing

Personalize is pay as you go, with charges for data ingestion, training, and inference. The exact shape depends on which recipe family you use, so always check the official pricing page for current rates.

- **Legacy recipes** (the original User-Personalization, Personalized-Ranking, and the related-items recipes) bill real-time serving through a campaign with a minimum provisioned throughput measured in transactions per second (TPS). With this model the campaign hosting cost often dominates, so start at the minimum 1 TPS and scale up as traffic grows.
- **v2 recipes** changed the model: training is billed per interactions ingested, and inference is billed per recommendation request rather than per provisioned TPS hour. This usually maps more directly to real traffic and avoids paying for idle capacity.
- **Batch recommendations** are billed per request and write to S3, which is typically much cheaper than running a live endpoint for offline use cases like email or push targeting.

AWS Free Tier covers Amazon Personalize for the first two months of use (data processing, training interactions, and a quota of real-time requests). Confirm the current allowances on the pricing page before relying on them.

## Best Practices

For production deployments, review your design against the AWS Well-Architected Framework, in particular the [Machine Learning Lens](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/machine-learning-lens.html), which covers data quality, model retraining, monitoring, and cost trade-offs for ML workloads. Practical guidance specific to Personalize:

- Clean the interaction data before import. Remove bot traffic, test accounts, and duplicate events, since the model learns whatever patterns it is given. See {{< relref "glossary/data-quality" >}}.
- Enable automatic training (the default for all new custom solutions since April 2024) so the model refreshes on new behaviour without manual retraining. The discipline of retraining on fresh data is {{< relref "glossary/continuous-training" >}}.
- Use an Event Tracker to feed live interactions in real time, so recommendations reflect the current session, not only the last training run.
- Measure impact with A/B testing and metric attribution rather than assuming uplift.

For broader operational practices around running models in production, see {{< relref "glossary/mlops" >}}.
