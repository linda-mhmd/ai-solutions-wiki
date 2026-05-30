---
title: "Association Rule Mining"
description: "Pattern discovery techniques including Apriori and FP-Growth algorithms for finding frequent itemsets and meaningful associations in transactional data."
date: 2026-03-28
categories: [Glossary]
tags: [association-rules, Apriori, FP-Growth, pattern-discovery, unsupervised-learning]
related:
  - glossary/unsupervised-learning
  - glossary/clustering
  - glossary/anomaly-detection
  - glossary/naive-bayes
last_updated: 2026-05-30
---

Association rule mining discovers interesting relationships and patterns in large transactional datasets. The classic application is market basket analysis - finding which products are frequently purchased together - but it applies broadly to any domain where co-occurrence patterns are valuable: web clickstream analysis, medical diagnosis patterns, and network intrusion detection.

## Core Concepts

An association rule has the form `{A, B} -> {C}`, meaning when items A and B appear together, item C is also likely to appear. Three metrics evaluate rule quality:

**Support** measures how frequently an itemset appears in the dataset. `Support({bread, butter}) = (transactions containing both) / (total transactions)`. Low-support rules are rare and potentially unreliable.

**Confidence** measures how often the rule is correct. `Confidence({bread} -> {butter}) = Support({bread, butter}) / Support({bread})`. High confidence means the consequent usually appears when the antecedent does.

**Lift** measures how much more likely the consequent is given the antecedent, compared to its baseline frequency. `Lift = Confidence / Support(consequent)`. Lift above 1 indicates a positive association, below 1 indicates a negative association, and exactly 1 means independence. Lift corrects for the popularity bias that confidence alone does not capture.

## Algorithms

**Apriori** is the foundational algorithm. It uses the downward closure property - if an itemset is infrequent, all its supersets are also infrequent. This allows aggressive pruning of the search space. Apriori generates candidate itemsets level by level, scanning the database at each level to count support. It is conceptually simple but requires multiple database scans.

**FP-Growth (Frequent Pattern Growth)** compresses the database into a compact data structure called an FP-tree, then extracts frequent itemsets directly from this tree without candidate generation. It requires only two database scans and is significantly faster than Apriori on large datasets. FP-Growth is the preferred algorithm in practice.

**Eclat** uses a vertical data format (item -> set of transaction IDs) and set intersection operations to count support. It is competitive with FP-Growth and simpler to implement.

## Practical Considerations

Setting the minimum support threshold is critical. Too low and the algorithm produces an overwhelming number of rules, most of which are spurious. Too high and interesting niche patterns are missed. Start with a higher threshold and lower it gradually.

Redundant and trivial rules are a common problem. Filtering by lift (typically > 1.5), minimum confidence (> 0.5), and maximum rule length helps surface actionable patterns. Domain knowledge is essential for evaluating whether discovered rules are genuinely useful.

## When to Use It

Use association rule mining for market basket analysis, recommendation systems, cross-selling strategies, and any scenario where discovering co-occurrence patterns adds business value. It is also useful for feature engineering - discovered associations can become input features for predictive models.

## Sources

- Agrawal, R., Imielinski, T., & Swami, A. (1993). Mining association rules between sets of items in large databases. *ACM SIGMOD 1993*. (Original association rules paper; introduced support and confidence metrics.)
- Agrawal, R., & Srikant, R. (1994). Fast algorithms for mining association rules. *VLDB 1994*. (Apriori algorithm.)
- Han, J., Pei, J., & Yin, Y. (2000). Mining frequent patterns without candidate generation. *ACM SIGMOD 2000*. (FP-Growth algorithm; practical improvement over Apriori.)
