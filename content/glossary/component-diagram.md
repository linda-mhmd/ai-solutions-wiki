---
title: "Component Diagram"
description: "A UML structural diagram that shows the organization of system components, their interfaces, and the dependencies between them."
date: 2026-03-28
categories: [Glossary]
tags: [uml, component-diagram, software-architecture, structural-diagrams, dependencies]
last_updated: 2026-05-30
---

A component diagram is a UML structural diagram that shows how a system is decomposed into components, what interfaces those components expose and consume, and how they depend on each other. It models the system at a higher level of abstraction than class diagrams, focusing on the organization of deployable software units rather than individual classes.

## Key Elements

**Components** are drawn as rectangles with the `<<component>>` stereotype or the traditional component icon (a rectangle with two small rectangles protruding from the left side). Each component represents a modular, replaceable unit of the system that encapsulates its implementation behind well-defined interfaces. Examples include AuthenticationService, PaymentGateway, OrderProcessor, or NotificationEngine.

**Provided interfaces** are the services a component offers to other components. They are drawn as a small circle (lollipop notation) attached to the component. A PaymentGateway component might provide an IPaymentProcessing interface.

**Required interfaces** are the services a component needs from other components. They are drawn as a half-circle (socket notation) attached to the component. An OrderProcessor might require IPaymentProcessing to process payments.

**Assembly connectors** join a provided interface to a matching required interface, shown as a ball-and-socket connection. This visually communicates which components depend on which services.

**Dependencies** are dashed arrows showing that one component depends on another, without specifying the interface. They are used when the relationship is less formal or when interface detail is unnecessary.

**Ports** represent distinct interaction points on a component, each potentially exposing different interfaces. A component might have separate ports for its public API, administrative interface, and event publication.

## Internal Structure

A component can show its internal structure by nesting sub-components within it. This hierarchical decomposition allows modeling at multiple levels of abstraction. A top-level OrderManagement component might contain OrderProcessor, InventoryChecker, and ShippingCalculator sub-components with their own internal wiring.

## Practical Use

Component diagrams are useful for architectural documentation, showing the major building blocks of a system and their interactions. They support discussions about modularity, replaceability, and system evolution. In microservices architectures, each service naturally maps to a component. In monolithic applications, components represent logical modules with defined interfaces.

Component diagrams also support deployment planning by identifying which components need to communicate, informing decisions about network topology, service placement, and API design.

## Origins and History

The concept of software components emerged from the desire to build systems from reusable, interchangeable parts. Component-based software engineering was advocated at the 1968 NATO Software Engineering Conference [1]. UML formalized component diagrams as part of its structural diagram set. UML 2.0 (2005) significantly improved component diagram notation with ports, provided/required interface notation, and internal structure [2].

## Sources

1. McIlroy, M.D. (1968). "Mass-Produced Software Components." *NATO Software Engineering Conference*, Garmisch, Germany.
2. Object Management Group (2017). "Unified Modeling Language Specification Version 2.5.1." [https://www.omg.org/spec/UML/2.5.1](https://www.omg.org/spec/UML/2.5.1)
