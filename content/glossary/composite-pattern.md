---
title: "Composite Pattern"
description: "A structural design pattern that composes objects into tree structures to represent part-whole hierarchies, letting clients treat individual objects and compositions uniformly."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, composite, tree-structure, object-oriented-design]
related:
  - glossary/decorator-pattern
  - glossary/iterator-pattern
  - glossary/visitor-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Composite pattern is a structural design pattern that composes objects into tree structures to represent part-whole hierarchies. It allows clients to treat individual objects and compositions of objects uniformly through a common interface.

## Origins and History

The Composite pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern formalized a technique widely used in graphical systems, where drawings consist of shapes that can themselves contain other shapes. Early examples include the InterViews graphics framework and the ET++ application framework from the late 1980s, both of which used tree-structured object hierarchies for UI rendering.

## How It Works

The pattern defines three participants. The **Component** declares the common interface for both simple and composite objects, including operations like `draw()` or `calculatePrice()`, and optionally child-management methods. The **Leaf** represents primitive objects with no children and implements the Component interface directly. The **Composite** stores child Components and implements Component methods by delegating to its children, often aggregating results.

When a client calls an operation on a Composite, it recursively forwards the call to all its children. Leaves perform the actual work. Because Leaf and Composite share the same interface, client code does not need to distinguish between them.

## When to Use It

Use Composite when you want to represent part-whole hierarchies of objects, when you want clients to ignore the difference between compositions and individual objects, or when a structure can be nested to arbitrary depth. Common applications include file systems (files and directories), UI component trees, organization charts, and menu systems.

## Common Pitfalls

Making the Component interface too general can make it difficult to restrict which operations are valid for leaves versus composites. For instance, adding a child to a leaf is semantically invalid, and the pattern must decide whether to handle this at compile time (separate interfaces) or at runtime (throwing exceptions). Overly deep hierarchies can create performance issues with recursive traversal, and circular references in the tree lead to infinite loops.

## Relationship to Other Patterns

Composite is often traversed using Iterator. Visitor can apply operations across a Composite structure without modifying its classes. Decorator is structurally similar (both use recursive composition) but serves a different purpose: Decorator adds responsibilities, while Composite organizes a hierarchy.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Shalloway, A., Trott, J. (2004). *Design Patterns Explained*, 2nd Edition. Addison-Wesley.
