---
title: "Layered Architecture"
description: "A software architecture pattern that organizes components into horizontal layers with strict dependency rules."
date: 2026-03-28
categories: [Glossary]
tags: [layered-architecture, architecture-patterns, software-design, separation-of-concerns]
last_updated: 2026-05-30
---

Layered architecture (also called n-tier architecture) organizes a software system into horizontal layers, where each layer provides services to the layer above it and consumes services from the layer below. Dependencies flow in one direction: upper layers depend on lower layers, never the reverse.

## Origins and History

The concept of layered system organization was demonstrated by Edsger Dijkstra in his 1968 paper "The Structure of the THE Multiprogramming System," which organized an operating system into six hierarchical layers, each building on the abstractions of the layer below. This was one of the earliest practical demonstrations of separation of concerns in software. The pattern became the dominant architecture for business applications in the 1990s and 2000s, particularly with the rise of three-tier web applications (presentation, business logic, data access). The ISO/OSI seven-layer networking model (1984) is another prominent application of layered thinking. While the pattern has been partially displaced by microservices and hexagonal architecture in distributed systems, it remains the default starting point for many application architectures.

## How It Works

A typical layered architecture has four layers. The **Presentation Layer** handles user interface and user interaction. The **Business Logic Layer** (or Application Layer) implements domain rules and workflows. The **Persistence Layer** (or Data Access Layer) manages data storage and retrieval. The **Database Layer** is the underlying data store. In a **strict** layered architecture, each layer can only call the layer immediately below it. In a **relaxed** (or open) layered architecture, a layer may bypass intermediate layers and call any lower layer directly. Each layer encapsulates its implementation details and exposes an interface to the layer above.

## Practical Applications

Layered architecture is used in enterprise applications (Spring-based Java applications, .NET applications with controller-service-repository layers), web applications, and as the mental model for many monolithic systems. Its strengths are simplicity, well-understood patterns, and ease of testing individual layers. Its weaknesses include potential performance overhead from layer traversal and a tendency toward monolithic deployments.

## Sources

1. Dijkstra, E.W. (1968). "The Structure of the 'THE'-Multiprogramming System." *Communications of the ACM*, 11(5), 341-346.
2. Buschmann, F. et al. (1996). *Pattern-Oriented Software Architecture, Volume 1: A System of Patterns*. Wiley, Chapter 2.
3. Richards, M. (2015). *Software Architecture Patterns*. O'Reilly Media.
