---
title: "Heaps and Priority Queues"
description: "Tree-based data structures that efficiently support finding and extracting the minimum or maximum element."
date: 2026-03-28
categories: [Glossary]
tags: [heaps, priority-queues, heap-sort, data-structures, algorithms]
last_updated: 2026-05-30
---

A heap is a specialized tree-based data structure that satisfies the heap property: in a max-heap, each parent node is greater than or equal to its children; in a min-heap, each parent is less than or equal to its children. A priority queue is an abstract data type typically implemented using a heap, supporting efficient insertion and extraction of the highest-priority element.

## Origins and History

The binary heap was introduced by J.W.J. Williams in 1964 in his paper presenting heap sort, a comparison-based sorting algorithm that uses a heap to sort elements in O(n log n) time. Robert Floyd improved the heap construction step the same year, showing that a heap can be built from an unordered array in O(n) time (bottom-up heap construction). The Fibonacci heap was introduced by Michael Fredman and Robert Tarjan in 1987, providing amortized O(1) for decrease-key operations, which improved the theoretical complexity of Dijkstra's algorithm and Prim's algorithm. Brodal queues (1996) achieved the same bounds in worst case rather than amortized.

## How It Works

A **binary heap** is a complete binary tree stored efficiently in an array where the parent of element at index i is at index (i-1)/2, and children are at indices 2i+1 and 2i+2. Insertion adds the element at the end and "sifts up" to restore the heap property. Extraction removes the root (min or max), moves the last element to the root, and "sifts down." Both operations run in O(log n) time. A **priority queue** exposes three core operations: insert (add an element with a priority), peek (view the highest-priority element without removing it), and extract (remove and return the highest-priority element).

## Practical Applications

Priority queues are used in Dijkstra's shortest-path algorithm, A* search, Huffman coding (building the code tree), operating system process schedulers (priority-based scheduling), event-driven simulations, and median-finding with two heaps. Heap sort provides guaranteed O(n log n) worst-case sorting with O(1) extra space. Standard library implementations include Python's heapq module, Java's PriorityQueue, and C++'s priority_queue.

## Sources

1. Williams, J.W.J. (1964). "Algorithm 232: Heapsort." *Communications of the ACM*, 7(6), 347-348.
2. Fredman, M.L. and Tarjan, R.E. (1987). "Fibonacci Heaps and Their Uses in Improved Network Optimization Algorithms." *Journal of the ACM*, 34(3), 596-615.
3. Cormen, T.H., Leiserson, C.E., Rivest, R.L., and Stein, C. (2009). *Introduction to Algorithms*, 3rd ed. MIT Press, Chapter 6.
