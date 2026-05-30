---
title: "Iterator Pattern"
description: "A behavioral design pattern that provides a way to access elements of an aggregate object sequentially without exposing its underlying representation."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, iterator, traversal, object-oriented-design]
related:
  - glossary/composite-pattern
  - glossary/visitor-pattern
  - glossary/factory-method-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Iterator pattern is a behavioral design pattern that provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It decouples traversal logic from the collection, allowing different traversal strategies over the same data structure.

## Origins and History

The Iterator pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). Iterators existed in practice long before the GoF book. The CLU programming language (1974, designed by Barbara Liskov at MIT) introduced iterators as a first-class language feature. Smalltalk's collection classes provided `do:` methods that iterated over elements using blocks. The GoF formalized the object-based iterator as a reusable pattern. Today, iterators are built into virtually every mainstream language: Java's `Iterator` interface, Python's iterator protocol (`__iter__`/`__next__`), C++'s STL iterators, and JavaScript's iteration protocol.

## How It Works

The **Iterator** interface declares methods for traversal: `next()`, `hasNext()`, and optionally `current()`. A **ConcreteIterator** implements these methods and tracks the current position in the traversal. The **Aggregate** interface declares a method for creating an Iterator. The **ConcreteAggregate** implements that method, returning a ConcreteIterator configured for its internal structure.

External iterators give clients explicit control over traversal by calling `next()`. Internal iterators accept a callback function and apply it to each element, controlling the iteration themselves. Modern languages support both styles.

## When to Use It

Use Iterator when you need to access a collection's contents without exposing its internal structure, when you want to support multiple simultaneous traversals of the same collection, when you want to provide a uniform interface for traversing different collection types, or when you need lazy evaluation of potentially infinite sequences. Common applications include database result set cursors, file system directory traversals, and stream processing pipelines.

## Common Pitfalls

Modifying a collection during iteration can cause undefined behavior or `ConcurrentModificationException` errors. Iterators that hold references to internal collection state may become invalid if the collection is mutated. Some iterator implementations load all elements eagerly, negating the memory benefits of lazy traversal.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Liskov, B., Guttag, J. (1986). *Abstraction and Specification in Program Development*. MIT Press.
3. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
