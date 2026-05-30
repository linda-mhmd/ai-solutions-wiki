---
title: "UML Overview"
description: "The Unified Modeling Language, a standardized visual notation for specifying, constructing, and documenting software systems through 14 diagram types."
date: 2026-03-28
categories: [Glossary]
tags: [uml, software-modeling, diagrams, software-engineering, object-oriented]
last_updated: 2026-05-30
---

The Unified Modeling Language (UML) is a standardized visual modeling language for specifying, constructing, and documenting the artifacts of software systems. It provides a common notation that developers, architects, and business analysts use to communicate system structure and behavior, independent of any specific programming language or development methodology.

## Diagram Categories

UML defines 14 diagram types organized into two broad categories.

**Structural diagrams** describe the static aspects of a system - what exists and how it is organized.

- **Class Diagram** - Classes, attributes, methods, and relationships (association, inheritance, composition). The most widely used UML diagram.
- **Object Diagram** - Instances of classes at a specific point in time, showing actual data values.
- **Component Diagram** - System components and their interfaces and dependencies.
- **Deployment Diagram** - Physical deployment of software artifacts on hardware nodes.
- **Package Diagram** - Organization of model elements into packages and their dependencies.
- **Composite Structure Diagram** - Internal structure of a class and the collaborations it enables.
- **Profile Diagram** - Extensions to the UML metamodel for specific domains.

**Behavioral diagrams** describe the dynamic aspects of a system - what happens and how things change over time.

- **Use Case Diagram** - Actors, use cases, and system boundaries.
- **Activity Diagram** - Workflows and business process flows with concurrency support.
- **State Machine Diagram** - States and transitions of an object over its lifetime.
- **Sequence Diagram** - Object interactions ordered by time.
- **Communication Diagram** - Object interactions emphasizing structural relationships.
- **Timing Diagram** - State changes along a time axis, used for real-time systems.
- **Interaction Overview Diagram** - High-level flow combining multiple interaction diagrams.

## How UML Is Used in Practice

Most teams use a subset of UML rather than all 14 diagram types. Class diagrams, sequence diagrams, use case diagrams, and activity diagrams cover the majority of modeling needs. UML diagrams are often informal sketches on whiteboards rather than formal, tool-generated specifications. The value is in communication, not in the precision of the notation.

UML can be used at different levels of detail: as a sketch (informal communication aid), as a blueprint (detailed specification for implementation), or as a programming language (executable UML, where models are compiled directly to code).

## Origins and History

UML emerged from the "method wars" of the early 1990s, when competing object-oriented methodologies proliferated. Grady Booch (Booch method), James Rumbaugh (OMT), and Ivar Jacobson (OOSE) joined forces at Rational Software to unify their approaches [1]. UML 1.0 was submitted to the Object Management Group (OMG) and adopted as a standard in 1997 [2]. UML 2.0, released in 2005, expanded the language to 14 diagram types and formalized the metamodel. The current version is UML 2.5.1 (2017).

## Sources

1. Booch, G., Rumbaugh, J., & Jacobson, I. (2005). *The Unified Modeling Language User Guide*. 2nd Edition. Addison-Wesley.
2. Object Management Group (1997). "UML 1.0 Specification." [https://www.omg.org/spec/UML/](https://www.omg.org/spec/UML/)
