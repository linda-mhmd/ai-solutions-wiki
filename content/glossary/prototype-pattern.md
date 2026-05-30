---
title: "Prototype Pattern"
description: "A creational design pattern that creates new objects by cloning an existing instance, avoiding the cost of standard construction."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, creational-patterns, GoF, prototype, cloning, object-oriented-design]
related:
  - glossary/factory-method-pattern
  - glossary/abstract-factory-pattern
  - glossary/builder-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Prototype pattern is a creational design pattern that specifies the kind of object to create using a prototypical instance and creates new objects by copying that prototype. Instead of building objects from scratch through constructors, the pattern produces new instances by cloning an existing object.

## Origins and History

The Prototype pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The concept has deep roots in prototype-based programming languages. The Self programming language (1986, developed by David Ungar and Randall B. Smith at Xerox PARC) was built entirely around prototypal object creation rather than class-based instantiation. JavaScript, designed by Brendan Eich in 1995, adopted prototype-based inheritance as its core object model, making the pattern fundamental to web development.

## How It Works

The pattern involves a **Prototype** interface that declares a `clone()` method. **ConcretePrototype** classes implement this method by returning a copy of themselves. A **Client** creates new objects by asking a prototype to clone itself rather than calling a constructor.

Cloning can be **shallow** (copying field values, where reference fields still point to the same objects) or **deep** (recursively copying all referenced objects so the clone is fully independent). The choice depends on whether the cloned object needs to share mutable state with the original.

A prototype registry or manager can store a catalog of pre-configured prototypes keyed by name or type, allowing clients to look up and clone prototypes dynamically.

## When to Use It

Prototype is appropriate when the classes to instantiate are specified at runtime, when you want to avoid building a hierarchy of factory classes that parallels the product hierarchy, when object creation is expensive and cloning is significantly cheaper, or when objects have only a few combinations of state and it is more convenient to maintain a set of prototypes than to instantiate the class manually each time.

## Common Pitfalls

Deep cloning complex object graphs with circular references is difficult to implement correctly. Languages without built-in clone support require manual implementation of copy logic for every field, which is error-prone and must be updated whenever fields change. Shallow copies that inadvertently share mutable state lead to subtle bugs where modifying the clone affects the original.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Ungar, D., Smith, R.B. (1987). "Self: The Power of Simplicity." *ACM SIGPLAN Notices*, 22(12).
3. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
