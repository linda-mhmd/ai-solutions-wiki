---
title: "Case Pattern: AI Recommendation Engine for an Online Retailer"
description: "Architecture and lessons from building a production recommendation system serving personalized product suggestions to 5 million monthly active users."
date: 2026-03-28
categories: [Case Patterns]
tags: [recommendation-engine, retail, personalization, e-commerce, machine-learning]
image: /img/shaping-ai/executive-network-glass-touch-notext.png
image_alt: "A suited executive touching a glass panel as a red node network spreads from the contact point, representing a recommendation engine that activates from a single user signal."
image_caption: "One touch. A network of signals. The engine finds the next product before the customer thinks to look."
last_updated: 2026-05-30
---

An online retailer with 5 million monthly active users and a catalog of 120,000 products needed to move beyond basic "customers also bought" recommendations. The existing rule-based system had a 2.1% click-through rate on recommendations and contributed 8% of total revenue. The goal was to deploy a personalized recommendation engine that could improve both metrics.

## The Architecture

The system combines collaborative filtering, content-based features, and real-time behavioral signals.

**Feature store** - A central feature store maintains three categories of features updated at different frequencies. User features (purchase history, browse history, category preferences, price sensitivity) update hourly. Product features (category, attributes, price, margin, inventory level, popularity) update daily. Interaction features (recent clicks, cart additions, time-on-page) update in real-time via a streaming pipeline.

**Candidate generation** - A two-stage retrieval process. First, collaborative filtering (users similar to you bought these) generates 500 candidates from the full catalog. Second, content-based filtering (products similar to what you have viewed) adds another 200 candidates. This narrows 120,000 products to approximately 700 candidates per request.

**Ranking model** - A gradient-boosted tree model scores each candidate on purchase probability, combining user features, product features, and contextual features (time of day, device type, referral source). The model outputs a relevance score for each candidate.

**Business rules layer** - Post-ranking filters apply business constraints: suppress out-of-stock items, boost high-margin products (within a relevance floor), enforce diversity (no more than 3 items from the same category in a recommendation set), and suppress recently purchased items.

## Key Lessons

**The cold start problem required multiple solutions.** New users with no history received popularity-based recommendations until they generated 3-5 interactions. New products with no interaction data were recommended based on content similarity to popular items in their category. Both cold start populations needed explicit handling rather than falling through to random or empty recommendations.

**Real-time signals had outsized impact.** Incorporating what the user was doing in the current session (categories browsed, price range viewed, search queries) improved click-through rate by 35% compared to using only historical features. A user browsing winter coats right now should see winter coat recommendations immediately, not the kitchen accessories they bought last month.

**Diversity constraints improved revenue despite lowering individual relevance scores.** Showing five highly relevant items from the same category produced lower total click-through than showing five items across three categories, even though each individual item in the diverse set had a lower relevance score. Users already in a category do not need more recommendations from that category - they need discovery.

**Offline metrics did not predict online performance.** The model with the best offline accuracy (measured on historical data) was not the best performing model in A/B tests. Historical data has survivorship bias - it only contains interactions with items that were actually shown. Online A/B testing was the only reliable way to compare model versions.

## Results

Click-through rate on recommendations increased from 2.1% to 5.8%. Revenue attributed to recommendations grew from 8% to 14% of total. Average order value increased by 7% as recommendations surfaced relevant products that users had not discovered through browsing. The recommendation system processes 50 million scoring requests per day with P95 latency under 80ms.
