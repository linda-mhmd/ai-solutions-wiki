---
title: "Decorator Pattern"
description: "A structural design pattern that attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, decorator, wrapper, object-oriented-design]
related:
  - glossary/adapter-pattern
  - glossary/composite-pattern
  - glossary/proxy-pattern
  - glossary/strategy-pattern
last_updated: 2026-05-30
---

The Decorator pattern is a structural design pattern that attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality by wrapping the original object with one or more decorator objects that add behavior before or after delegating to the wrapped component.

## Origins and History

The Decorator pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern was heavily influenced by the design of I/O stream classes in early object-oriented systems. Java's `java.io` package is a canonical example, where `BufferedInputStream`, `DataInputStream`, and other stream classes wrap a base `InputStream` to layer functionality. The GoF noted that inheritance-based extension leads to rigid hierarchies and class explosions when features can be combined in many ways.

## How It Works

The pattern has four participants. The **Component** interface defines the operations that can be decorated. The **ConcreteComponent** is the base object to which new behavior is added. The **Decorator** holds a reference to a Component and conforms to the same interface. The **ConcreteDecorator** adds its specific behavior by overriding methods, calling the wrapped component's method, and adding behavior before or after that call.

Decorators can be stacked: a component can be wrapped by multiple decorators, each adding its own layer of behavior. Because every decorator conforms to the Component interface, the wrapping is transparent to clients.

## When to Use It

Use Decorator when you need to add responsibilities to individual objects dynamically and transparently, when extension by subclassing is impractical due to the number of independent feature combinations, or when you want to add behavior that can be withdrawn. It is common in I/O streams, middleware pipelines, logging wrappers, and UI component styling.

## Common Pitfalls

Deep decorator chains create many small objects that are harder to debug, since the stack trace passes through multiple wrapper layers. Identity comparisons break because the decorated object is not the same reference as the original. The order of decorator wrapping can matter and produce different behavior, which may be non-obvious. Java's I/O library is frequently cited as a case where excessive decorator use makes simple operations verbose.

## Relationship to Other Patterns

Decorator changes an object's responsibilities; Adapter changes its interface; Proxy controls access to it. Composite and Decorator share recursive composition structure, but Composite focuses on aggregation while Decorator focuses on adding behavior. Strategy is an alternative when the varying behavior can be encapsulated in a separate object rather than wrapped around the original.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Bloch, J. (2008). *Effective Java*, 2nd Edition. Addison-Wesley.
