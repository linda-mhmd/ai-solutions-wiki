---
title: "Hash Tables"
description: "Data structures that map keys to values using hash functions for near-constant-time lookup, insertion, and deletion."
date: 2026-03-28
categories: [Glossary]
tags: [hash-tables, data-structures, hashing, dictionaries, algorithms]
last_updated: 2026-05-30
---

A hash table (hash map) is a data structure that implements an associative array, mapping keys to values using a hash function. The hash function computes an index into an array of buckets from which the desired value can be found, providing average-case O(1) time for lookups, insertions, and deletions.

## Origins and History

The concept of hashing for data storage was pioneered by Hans Peter Luhn at IBM, who described a hash-based lookup scheme in an internal IBM memorandum in January 1953. Arnold Dumey's 1956 article in *Computers and Automation* was the first published work describing hashing with open addressing. W. Wesley Peterson published the first formal analysis of hash table performance in 1957 in the *IBM Journal of Research and Development*. The technique became a standard part of computer science through its inclusion in Knuth's *The Art of Computer Programming, Volume 3* (1973). Today, hash tables are implemented as built-in data structures in virtually every programming language: Python's dict, Java's HashMap, JavaScript's objects and Map, C++'s unordered_map, and Go's map.

## How It Works

A hash table consists of an array of buckets and a hash function that maps keys to bucket indices. When a **collision** occurs (two keys map to the same index), the table resolves it using one of two strategies. **Separate chaining** stores multiple entries in the same bucket using a linked list, tree, or other collection. **Open addressing** probes for the next available slot using a probing sequence (linear probing, quadratic probing, or double hashing). The **load factor** (number of entries divided by number of buckets) determines when the table should be resized; typical implementations resize when the load factor exceeds 0.7-0.75.

## Practical Applications

Hash tables are the backbone of symbol tables in compilers, caching systems (memcached, Redis), database indexing (hash indexes), counting and frequency analysis, deduplication, and implementing sets. Consistent hashing (Karger et al., 1997) extends the concept for distributed systems, enabling load distribution across servers with minimal disruption when nodes are added or removed.

## Sources

1. Luhn, H.P. (1953). "A New Method of Recording and Searching Information." IBM Internal Memorandum.
2. Knuth, D.E. (1998). *The Art of Computer Programming, Volume 3: Sorting and Searching*, 2nd ed. Addison-Wesley, Chapter 6.4.
3. Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd ed. MIT Press, Chapter 11.
