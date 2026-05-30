---
title: "Trees and Binary Search Trees"
description: "Hierarchical data structures including BSTs, AVL trees, red-black trees, and B-trees for efficient searching and storage."
date: 2026-03-28
categories: [Glossary]
tags: [trees, BST, AVL, red-black-tree, B-tree, data-structures, algorithms]
last_updated: 2026-05-30
---

Trees are hierarchical data structures consisting of nodes connected by edges, with a single root node and no cycles. Binary search trees (BSTs) impose an ordering property that enables efficient searching, insertion, and deletion. Self-balancing variants guarantee logarithmic performance.

## Origins and History

Tree structures in computing trace back to the earliest days of information processing. The binary search tree concept was independently described by several researchers in the late 1950s and early 1960s. AVL trees, the first self-balancing BST, were invented by Georgy Adelson-Velsky and Evgenii Landis in 1962 and published in their Soviet mathematics paper "An Algorithm for the Organization of Information." Red-black trees were invented by Rudolf Bayer in 1972 (as symmetric binary B-trees) and refined by Leonidas Guibas and Robert Sedgewick in 1978, who introduced the red-black coloring scheme. B-trees were invented by Rudolf Bayer and Edward McCreight at Boeing Scientific Research Labs in 1970, designed specifically for efficient disk-based storage where minimizing disk reads is critical.

## Core Variants

A **Binary Search Tree** maintains the invariant that all values in the left subtree are less than the node and all values in the right subtree are greater. Unbalanced BSTs degrade to O(n) for skewed inputs. **AVL trees** maintain strict balance (height difference between subtrees is at most 1) through rotations after insertions and deletions, guaranteeing O(log n) operations. **Red-black trees** maintain approximate balance using node coloring rules that require fewer rotations than AVL trees, making them preferred for implementations with frequent insertions and deletions. They are used internally in Java's TreeMap, C++'s std::map, and Linux's Completely Fair Scheduler. **B-trees** are multi-way balanced trees where each node can hold multiple keys, minimizing tree height and disk I/O. They are the standard data structure for database indexes and file systems.

## Practical Applications

BST variants power database indexing (B-trees and B+ trees), in-memory ordered collections (red-black trees in standard libraries), file systems (B-trees in NTFS, ext4, HFS+), and spatial indexing (R-trees, k-d trees for multidimensional data).

## Sources

1. Adelson-Velsky, G.M. and Landis, E.M. (1962). "An Algorithm for the Organization of Information." *Proceedings of the USSR Academy of Sciences*, 146, 263-266.
2. Bayer, R. and McCreight, E. (1970). "Organization and Maintenance of Large Ordered Indices." *Acta Informatica*, 1(3), 173-189.
3. Guibas, L.J. and Sedgewick, R. (1978). "A Dichromatic Framework for Balanced Trees." *19th Annual Symposium on Foundations of Computer Science*, IEEE.
