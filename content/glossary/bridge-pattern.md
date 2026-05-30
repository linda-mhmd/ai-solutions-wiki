---
title: "Bridge Pattern"
description: "A structural design pattern that decouples an abstraction from its implementation so that the two can vary independently."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, bridge, decoupling, object-oriented-design]
related:
  - glossary/adapter-pattern
  - glossary/strategy-pattern
  - glossary/abstract-factory-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Bridge pattern is a structural design pattern that separates an abstraction from its implementation, allowing both to evolve independently without affecting each other. It replaces inheritance-based binding between abstraction and implementation with composition-based binding.

## Origins and History

The Bridge pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern addressed a fundamental problem in object-oriented design: when both an abstraction and its implementation need to be extended through subclassing, a single inheritance hierarchy leads to a combinatorial explosion of classes. The GoF drew on experience with cross-platform UI frameworks where window abstractions needed to work across multiple windowing systems (X Window, IBM Presentation Manager).

## How It Works

The pattern has four participants. The **Abstraction** defines the high-level interface and maintains a reference to an **Implementor** object. The **RefinedAbstraction** extends the Abstraction with additional operations. The **Implementor** interface defines the low-level operations that concrete implementations must provide. **ConcreteImplementors** provide specific implementations of the Implementor interface.

The Abstraction delegates its work to the Implementor object it holds. Because the link between them is a composition reference rather than inheritance, either hierarchy can be extended without affecting the other. For example, adding a new RefinedAbstraction does not require any changes to existing Implementors, and vice versa.

## When to Use It

Use Bridge when you want to avoid a permanent binding between an abstraction and its implementation, when both abstractions and implementations should be extensible through subclassing, when changes to an implementation should not impact client code, or when you have a class explosion caused by combining multiple orthogonal dimensions of variation (such as shape types and rendering platforms).

## Common Pitfalls

Bridge adds complexity through extra indirection and is overkill when there is only one implementation or when the abstraction and implementation do not change independently. Developers sometimes confuse Bridge with Adapter; the key distinction is that Bridge is designed up front to let abstraction and implementation vary independently, while Adapter is applied after the fact to make incompatible interfaces work together.

## Relationship to Other Patterns

Bridge is often used with Abstract Factory, which can create and configure the bridge. Strategy is structurally similar but targets behavioral variation, while Bridge targets structural decoupling between abstraction layers and platform-specific code.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Shalloway, A., Trott, J. (2004). *Design Patterns Explained*, 2nd Edition. Addison-Wesley.
