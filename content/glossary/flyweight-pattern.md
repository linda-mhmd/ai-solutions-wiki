---
title: "Flyweight Pattern"
description: "A structural design pattern that uses sharing to support large numbers of fine-grained objects efficiently by externalizing shared state."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, flyweight, memory-optimization, object-oriented-design]
related:
  - glossary/composite-pattern
  - glossary/singleton-pattern
  - glossary/proxy-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Flyweight pattern is a structural design pattern that uses sharing to support large numbers of fine-grained objects efficiently. It reduces memory consumption by separating an object's state into intrinsic (shared) and extrinsic (context-dependent) components, storing only the intrinsic state within the flyweight object.

## Origins and History

The Flyweight pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The name "flyweight" comes from boxing, denoting the lightest weight class. The pattern was inspired by text editors and document processing systems where each character could be represented as an object, but doing so naively would consume enormous memory. By sharing character objects (intrinsic state like glyph shape and font metrics) and storing position information externally (extrinsic state), the system could handle millions of characters with a minimal set of shared objects.

## How It Works

The **Flyweight** interface declares methods that accept extrinsic state as parameters. The **ConcreteFlyweight** stores intrinsic state that is shareable and independent of context. The **FlyweightFactory** creates and manages flyweight objects, ensuring that flyweights are shared properly by returning existing instances when possible. The **Client** maintains extrinsic state and passes it to flyweight methods when invoking operations.

The factory typically uses a hash map keyed by intrinsic state values. When a client requests a flyweight, the factory returns an existing one if available or creates a new one and adds it to the pool.

## When to Use It

Use Flyweight when an application uses a large number of objects that consume significant memory, when most object state can be made extrinsic (moved outside the object), when many groups of objects can be replaced by relatively few shared objects once extrinsic state is removed, and when the application does not depend on object identity. Common applications include character rendering, game tile maps, icon rendering, and caching immutable value objects.

## Common Pitfalls

Separating intrinsic from extrinsic state requires careful analysis and can complicate the design. If the extrinsic state is complex or expensive to compute, the overhead of passing it to every method call may outweigh the memory savings. Flyweight objects must be immutable with respect to their intrinsic state; accidentally allowing mutation breaks sharing and introduces subtle bugs across all clients sharing that instance.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
