---
title: "Memento Pattern"
description: "A behavioral design pattern that captures and externalizes an object's internal state so it can be restored later, without violating encapsulation."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, memento, undo, state-management, object-oriented-design]
related:
  - glossary/command-pattern
  - glossary/state-pattern
  - glossary/iterator-pattern
  - glossary/encapsulation
last_updated: 2026-05-30
---

The Memento pattern is a behavioral design pattern that captures and externalizes an object's internal state without violating encapsulation, so that the object can be restored to this state later. It enables undo mechanisms and state snapshots.

## Origins and History

The Memento pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern addressed the need for undo/redo and checkpoint/rollback functionality in editors and transactional systems while preserving object encapsulation. The challenge was allowing an object's state to be saved externally without exposing its internal structure, which would break encapsulation and create tight coupling between the object and its clients.

## How It Works

The **Originator** is the object whose state needs to be saved. It creates a Memento containing a snapshot of its current internal state and can restore its state from a Memento. The **Memento** stores the internal state of the Originator. It has two interfaces: a wide interface for the Originator (which can access internal state) and a narrow interface for the Caretaker (which can only pass mementos around). The **Caretaker** is responsible for keeping the Memento but never examines or operates on its contents.

The Originator creates a memento before a potentially reversible operation. The Caretaker stores it (typically in a stack or list). To undo, the Caretaker passes the memento back to the Originator, which restores its state.

## When to Use It

Use Memento when a snapshot of an object's state must be saved so it can be restored later, and when a direct interface to obtaining the state would expose implementation details and break encapsulation. Common applications include text editor undo/redo, transaction rollback in databases, game save states, and form wizard "back" functionality.

## Common Pitfalls

Mementos can consume significant memory if the originator's state is large or if many snapshots are stored. Frequent memento creation in high-frequency operations can cause performance degradation. Some languages make it difficult to enforce the narrow/wide interface distinction, leading to caretakers that can access memento internals. Incremental mementos (storing only deltas) can reduce memory usage but add complexity.

## Relationship to Other Patterns

Command uses Memento to store state needed for undoing operations. Memento can be used with Iterator to capture iteration state for bookmarking positions in a traversal.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
