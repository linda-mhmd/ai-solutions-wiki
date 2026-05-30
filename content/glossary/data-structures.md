---
title: "Data Structures for AI Applications"
description: "Arrays, hash maps, trees, graphs, queues, and vector stores - how the choice of data structure shapes the performance of AI pipelines."
date: 2026-03-26
categories: [Glossary]
tags: ["cs-fundamentals", "beginner", "data-structures", "arrays", "trees", "graphs", "algorithms"]
related:
  - glossary/time-complexity
  - guides/sorting-algorithms-for-ai
  - patterns/tiered-analysis
last_updated: 2026-05-30
---

A data structure is a way of organizing data in memory that enables specific operations efficiently. The choice of data structure determines whether an operation takes microseconds or minutes. In AI pipelines that process thousands of frames, documents, or records, this difference is the difference between a usable system and one that cannot run in production.

## Arrays

An array stores elements in contiguous memory positions, indexed by position. Access to any element is O(1) by index. Arrays are the natural structure for ordered sequences.

In AI applications, arrays appear everywhere: a sequence of video frames, a batch of images passed to a model, the sequence of tokens in a prompt, a series of time-stamped measurements. NumPy arrays and PyTorch tensors are multi-dimensional arrays optimized for mathematical operations.

The key property: arrays are cache-friendly. Sequential access patterns (iterating over every element) benefit from CPU cache prefetching, making them fast in practice even for large datasets.

## Hash Maps (Dictionaries)

A hash map stores key-value pairs and provides O(1) average-case lookup, insertion, and deletion by key. Python's `dict` is a hash map.

In AI pipelines, hash maps solve the lookup problem: given an ID, find its associated data instantly. Examples:

- **Face ID lookup**: When Rekognition returns a face ID for a detected person, a hash map maps face ID to person metadata (name, role, relevance score). This lookup is O(1) regardless of how many faces are tracked.
- **Frame score cache**: After scoring a frame, store the result in a hash map keyed by frame ID. Avoid recomputing scores for frames seen multiple times.
- **Configuration lookup**: Model parameters, threshold values, and routing rules stored in dictionaries for O(1) access.

A linear search for a face ID in a list of 10,000 tracked faces is O(n) - 10,000 comparisons. A hash map makes it O(1) - one lookup. At scale, this difference is meaningful.

## Trees

Trees are hierarchical data structures where each node has child nodes. Several tree variants appear in AI systems:

**Binary search trees**: Each node has at most two children; left subtree values are smaller, right subtree values are larger. Enables O(log n) search, insertion, and deletion. The balanced variants (AVL trees, red-black trees) guarantee O(log n) in the worst case.

**Decision trees**: The basis of classical ML algorithms (random forests, gradient boosting). Each internal node is a feature test; leaves are predictions. Inference is O(depth) per example.

**Trie (prefix tree)**: A tree structure for strings where each path from root to leaf spells out a key. Used for autocomplete, spell-check, and token vocabulary lookup in language models.

**B-trees**: The data structure behind database indexes and filesystems. Optimized for disk storage patterns, enabling efficient range queries. SQL database indexes are typically B-trees.

## Graphs

A graph is a set of nodes connected by edges. Graphs are the natural structure for representing relationships.

**Agent workflows as graphs**: CrewAI and LangGraph represent agent pipelines as directed graphs. Nodes are agents or tasks; edges are the flow of information between them. Graph traversal determines execution order.

**Knowledge graphs**: Structured representations of entities and their relationships. Used in RAG systems to supplement vector similarity with structured knowledge.

**Dependency graphs**: Build systems and pipeline orchestrators (Step Functions, Airflow) represent task dependencies as directed acyclic graphs (DAGs). Topological sort determines execution order.

## Queues and Stacks

**Queue (FIFO - First In, First Out)**: Elements are added to the back and removed from the front. SQS (Simple Queue Service) is a distributed queue. In AI pipelines, queues decouple producers (video uploads, API requests) from consumers (processing workers). This enables horizontal scaling: add more workers to consume faster.

**Stack (LIFO - Last In, First Out)**: Elements are added and removed from the same end. The call stack in any program is a stack: function calls push frames; returns pop them. Recursion depth limits are stack size limits.

## Vector Stores: Specialized Arrays for AI

A vector store is a database optimized for storing and searching high-dimensional vectors (embeddings). It is effectively an array of floating-point vectors with specialized indexing for similarity search.

Standard array lookup is O(1) by index but O(n) for similarity search (you must compare the query to every stored vector). Vector stores use approximate nearest-neighbor (ANN) indexing structures - HNSW (Hierarchical Navigable Small World), IVF (Inverted File Index) - to reduce similarity search to approximately O(log n).

This is the core data structure of RAG: embeddings of documents are stored in a vector store, and queries retrieve the most similar documents in sublinear time. Examples: Pinecone, Weaviate, pgvector, FAISS.

## Choosing the Right Structure

| Problem | Data Structure | Complexity |
|---------|---------------|------------|
| Look up face by ID | Hash map | O(1) |
| Find top-k scoring clips | Array + sort | O(n log n) |
| Find similar embeddings | Vector store | ~O(log n) |
| Execute agents in order | DAG + topological sort | O(V + E) |
| Process uploads in order | Queue | O(1) enqueue/dequeue |
| Search sorted clip list | Binary search | O(log n) |

The data structure is not an implementation detail - it defines the performance characteristics of the system.

## Sources

- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press. (Definitive reference for arrays, trees, hash tables, graphs, and complexity analysis, the standard algorithms textbook.)
- Knuth, D. E. (1997). *The Art of Computer Programming*, Vol. 1: Fundamental Algorithms (3rd ed.). Addison-Wesley. (Foundational treatment of data structures including linked lists, trees, and stacks; original mathematical analysis of algorithm performance.)
- Sedgewick, R., & Wayne, K. (2011). *Algorithms* (4th ed.). Addison-Wesley. (Practical implementations of core data structures; covers heaps, hash tables, balanced trees, and graphs with Java implementations.)
