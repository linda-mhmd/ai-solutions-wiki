---
title: "Facade Pattern"
description: "A structural design pattern that provides a simplified interface to a complex subsystem, reducing the coupling between clients and subsystem components."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, facade, simplification, object-oriented-design]
related:
  - glossary/adapter-pattern
  - glossary/mediator-pattern
  - glossary/proxy-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Facade pattern is a structural design pattern that provides a unified, simplified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use without hiding the subsystem classes for clients that need direct access.

## Origins and History

The Facade pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The concept of providing a simplified entry point to a complex system predates the GoF book and was common in procedural systems through module interfaces. The GoF formalized it as a way to reduce coupling in large object-oriented systems, noting that structuring a system into subsystems and providing facades to each subsystem reduces the number of objects clients need to understand and interact with.

## How It Works

The **Facade** class knows which subsystem classes are responsible for which requests. It delegates client requests to the appropriate subsystem objects. The **Subsystem classes** implement subsystem functionality and handle work assigned by the Facade, but they have no knowledge of the Facade itself.

The Facade does not encapsulate the subsystem. Clients that need fine-grained control can still access subsystem classes directly. The Facade simply provides a convenient default path for the most common operations.

## When to Use It

Use Facade when you want to provide a simple interface to a complex subsystem that evolves over time, when there are many dependencies between clients and implementation classes that you want to minimize, or when you want to layer your subsystems with each layer having a facade as its entry point. It is commonly seen in SDK design, API wrappers, service aggregation layers, and framework initialization routines.

## Common Pitfalls

A Facade can become a "god object" that grows to encompass too many operations, accumulating business logic that should live in the subsystem. This defeats the pattern's purpose. The Facade should delegate, not implement. Additionally, a Facade that completely hides the subsystem may prevent advanced users from accessing capabilities they need, so it should complement rather than replace direct subsystem access.

## Relationship to Other Patterns

Facade simplifies access to a subsystem; Adapter wraps a single class to change its interface; Mediator centralizes communication between objects that know each other. Abstract Factory can be used alongside Facade to provide a factory for subsystem objects through the facade interface.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Martin, R.C. (2017). *Clean Architecture*. Prentice Hall.
