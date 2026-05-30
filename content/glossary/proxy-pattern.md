---
title: "Proxy Pattern"
description: "A structural design pattern that provides a surrogate or placeholder for another object to control access to it."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, structural-patterns, GoF, proxy, access-control, object-oriented-design]
related:
  - glossary/decorator-pattern
  - glossary/adapter-pattern
  - glossary/facade-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Proxy pattern is a structural design pattern that provides a surrogate or placeholder for another object to control access to it. The proxy has the same interface as the real object, so clients interact with it transparently.

## Origins and History

The Proxy pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The concept of a stand-in object dates back to early distributed computing systems, where local proxy objects represented remote resources. The GoF identified several variants: remote proxy, virtual proxy, protection proxy, and smart reference. The pattern remains fundamental in modern frameworks, from Java's `java.lang.reflect.Proxy` to JavaScript's built-in `Proxy` object (ES2015).

## How It Works

The **Subject** interface defines the common interface for the RealSubject and Proxy. The **RealSubject** is the actual object that the proxy represents. The **Proxy** maintains a reference to the RealSubject, controls access to it, and may be responsible for creating and destroying it. The proxy forwards requests to the RealSubject, performing additional operations before or after forwarding.

Common proxy variants include: **Remote Proxy** provides a local representative for an object in a different address space (RPC, gRPC stubs). **Virtual Proxy** delays creation of an expensive object until it is actually needed (lazy initialization). **Protection Proxy** controls access based on permissions. **Caching Proxy** stores results of expensive operations and returns cached values on repeated requests.

## When to Use It

Use Proxy when you need lazy initialization of a heavy object, when you need access control or permission checking before forwarding requests, when you want to log or audit access to an object, when the real object resides on a remote server, or when you want to cache results transparently. It is widely used in ORM frameworks (lazy loading of related entities), API clients (remote proxies), and security layers (protection proxies).

## Common Pitfalls

Proxies add a layer of indirection that increases response time. Virtual proxies with lazy initialization can cause unexpected latency spikes on first access. In concurrent systems, proxies that cache or defer initialization need careful synchronization. Proxy chains (proxy wrapping a proxy) compound these issues and complicate debugging.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
