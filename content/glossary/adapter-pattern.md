---
title: "Adapter Pattern"
description: "A structural design pattern that converts the interface of a class into another interface that clients expect, enabling incompatible interfaces to work together."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, adapter, wrapper, object-oriented-design]
related:
  - glossary/bridge-pattern
  - glossary/facade-pattern
  - glossary/decorator-pattern
  - glossary/proxy-pattern
last_updated: 2026-05-30
---

The Adapter pattern is a structural design pattern that converts the interface of a class into another interface that clients expect. It allows classes with incompatible interfaces to collaborate by wrapping one interface with a translation layer.

## Origins and History

The Adapter pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The concept mirrors the real-world electrical adapter that allows a plug designed for one outlet type to fit another. The pattern was already common practice in systems integration before the GoF formalized it. The authors documented two variants: the class adapter (using multiple inheritance) and the object adapter (using composition).

## How It Works

The pattern involves a **Target** interface that the client expects, an **Adaptee** class with an existing interface that is incompatible, and an **Adapter** that bridges the two.

In the **object adapter** variant, the Adapter holds a reference to an Adaptee instance and translates Target method calls into corresponding Adaptee method calls. This approach uses composition and is preferred in languages that do not support multiple inheritance.

In the **class adapter** variant, the Adapter inherits from both the Target and the Adaptee, overriding Target methods to delegate to inherited Adaptee behavior. This is possible in languages supporting multiple inheritance (C++) or interface implementation combined with class inheritance.

## When to Use It

Use Adapter when you want to use an existing class whose interface does not match what you need, when you are integrating third-party libraries or legacy systems whose APIs you cannot modify, or when you need to create a reusable class that cooperates with unrelated or unforeseen classes. It is one of the most common patterns in enterprise integration, where systems built at different times with different conventions must interoperate.

## Common Pitfalls

Overusing adapters creates unnecessary indirection layers that complicate debugging and increase maintenance burden. When adapting many methods, consider whether the Adaptee should be redesigned or replaced rather than wrapped. Adapters that perform complex data transformations beyond simple interface mapping can hide important business logic in an unexpected location.

## Relationship to Other Patterns

Adapter changes the interface of an existing object; Decorator enhances it without changing the interface; Proxy provides the same interface with controlled access. Facade defines a new simplified interface to a subsystem rather than adapting an existing one.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Martin, R.C. (2002). *Agile Software Development, Principles, Patterns, and Practices*. Prentice Hall.
