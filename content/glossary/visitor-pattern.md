---
title: "Visitor Pattern"
description: "A behavioral design pattern that lets you add new operations to existing object structures without modifying the classes of the elements on which it operates."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, visitor, double-dispatch, object-oriented-design]
related:
  - glossary/composite-pattern
  - glossary/iterator-pattern
  - glossary/interpreter-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Visitor pattern is a behavioral design pattern that lets you define new operations on elements of an object structure without changing the classes of the elements it operates on. It achieves this by separating algorithms from the objects on which they operate.

## Origins and History

The Visitor pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern addresses a limitation of most object-oriented languages: while it is easy to add new element types (by adding classes), adding new operations across an existing set of element types requires modifying every class. Visitor inverts this trade-off, making it easy to add operations but hard to add element types. The pattern relies on double dispatch, a technique where the operation executed depends on both the visitor type and the element type.

## How It Works

The **Visitor** interface declares a `visit()` method for each element type in the object structure (e.g., `visitConcreteElementA()`, `visitConcreteElementB()`). **ConcreteVisitors** implement these methods with operation-specific logic for each element type. The **Element** interface declares an `accept(visitor)` method. **ConcreteElements** implement `accept()` by calling the appropriate visitor method, passing `this` as an argument. The **ObjectStructure** (often a Composite) holds elements and provides a way to iterate over them, allowing a visitor to visit each element.

The double dispatch mechanism works as follows: the client calls `element.accept(visitor)`, the element calls `visitor.visitConcreteElementX(this)`, and the visitor executes the operation specific to that element type.

## When to Use It

Use Visitor when an object structure contains many classes with differing interfaces and you want to perform operations that depend on their concrete types, when many distinct and unrelated operations need to be performed on objects in a structure and you want to avoid polluting those classes with these operations, or when the element class hierarchy is stable but new operations are added frequently. Common applications include compiler AST traversal, document export to multiple formats, and static analysis tools.

## Common Pitfalls

Adding a new element type requires updating every visitor class with a new `visit()` method, violating the Open-Closed Principle for the visitor hierarchy. The pattern breaks encapsulation because visitors often need access to element internals. It can also be conceptually complex for developers unfamiliar with double dispatch.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Palsberg, J., Jay, C.B. (1998). "The Essence of the Visitor Pattern." *COMPSAC '98*.
3. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
