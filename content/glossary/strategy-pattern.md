---
title: "Strategy Pattern"
description: "A behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, strategy, algorithms, object-oriented-design]
related:
  - glossary/state-pattern
  - glossary/template-method-pattern
  - glossary/command-pattern
  - glossary/bridge-pattern
last_updated: 2026-05-30
---

The Strategy pattern is a behavioral design pattern that defines a family of algorithms, encapsulates each one in a separate class, and makes them interchangeable. It lets the algorithm vary independently from the clients that use it.

## Origins and History

The Strategy pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern formalized a practice already common in Smalltalk and C++ codebases: extracting varying algorithmic behavior into separate objects rather than embedding it in conditional statements. The GoF described it as an alternative to subclassing for varying behavior, using composition (has-a) instead of inheritance (is-a) to select algorithms at runtime.

## How It Works

The **Strategy** interface declares a method common to all supported algorithms. **ConcreteStrategy** classes implement specific algorithm variants. The **Context** maintains a reference to a Strategy object and delegates the algorithmic work to it. The Context may expose a setter allowing clients to switch strategies at runtime, or the strategy may be provided at construction time.

Clients configure the Context with the appropriate ConcreteStrategy. When the Context needs to perform the algorithm, it calls the strategy's method. The Context does not know which concrete algorithm is executing.

## When to Use It

Use Strategy when you have multiple related algorithms and want to switch between them at runtime, when you want to avoid conditional statements for selecting algorithm variants, when classes differ only in their behavior and you want to configure a class with one of many behaviors, or when an algorithm uses data that clients should not know about (encapsulating algorithm-specific data structures). Common applications include sorting algorithms, payment processing methods, compression strategies, routing algorithms, and validation rule selection.

## Common Pitfalls

Clients must be aware of different strategies and choose appropriately, which shifts selection complexity to the client. If strategies require different initialization parameters, the Strategy interface may need to be more complex or the Context must provide a general-purpose data-passing mechanism. For trivial algorithms, the overhead of separate strategy classes can be excessive; lambdas or function objects in modern languages often provide a lighter-weight alternative.

## Relationship to Other Patterns

Strategy uses composition to change behavior; Template Method uses inheritance. State has the same structure but different intent (state-driven transitions vs. client-selected algorithms). Bridge separates abstraction from implementation at a structural level, while Strategy does so at a behavioral level.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Bloch, J. (2008). *Effective Java*, 2nd Edition. Addison-Wesley.
