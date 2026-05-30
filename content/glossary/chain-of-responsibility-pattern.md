---
title: "Chain of Responsibility Pattern"
description: "A behavioral design pattern that passes a request along a chain of handlers, where each handler decides whether to process the request or pass it to the next handler."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, chain-of-responsibility, request-handling, object-oriented-design]
related:
  - glossary/command-pattern
  - glossary/mediator-pattern
  - glossary/decorator-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Chain of Responsibility pattern is a behavioral design pattern that avoids coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. It chains the receiving objects and passes the request along the chain until an object handles it.

## Origins and History

The Chain of Responsibility pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern was inspired by event handling systems in graphical user interfaces, where a mouse click or keyboard event propagates from the innermost widget up through parent containers until one handles it. The MacApp framework's event-handling mechanism and the HelpHandler example in ET++ were key influences on the pattern's formalization.

## How It Works

The **Handler** declares an interface for handling requests and optionally holds a reference to the next handler in the chain. Each **ConcreteHandler** either handles requests it is responsible for or forwards them to the next handler. The **Client** initiates the request by sending it to the first handler in the chain.

When a request is issued, it travels along the chain until a handler processes it or the chain ends. The sender does not know which handler will ultimately process the request, and handlers do not know the overall chain structure beyond their immediate successor.

## When to Use It

Use Chain of Responsibility when more than one object may handle a request and the handler is not known in advance, when you want to issue a request to one of several objects without specifying the receiver explicitly, or when the set of handlers should be configurable dynamically. Common applications include middleware pipelines in web frameworks (Express.js, ASP.NET Core), logging frameworks with severity-based routing, approval workflows, and event bubbling in UI systems.

## Common Pitfalls

If no handler in the chain processes the request, it may silently fall off the end without any response. This requires a default handler at the end of the chain or an explicit error for unhandled requests. Long chains introduce latency as the request passes through many handlers. Debugging is harder because the processing path is determined at runtime, making it non-obvious which handler will execute.

## Relationship to Other Patterns

Chain of Responsibility is often used with Composite, where a component's parent acts as its successor. Command encapsulates requests as objects that could be sent through the chain. Decorator has a similar recursive structure but always forwards to the wrapped object, while Chain of Responsibility handlers may stop propagation.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Freeman, E., Robson, E. (2004). *Head First Design Patterns*. O'Reilly Media.
3. Nystrom, R. (2014). *Game Programming Patterns*. Genever Benning.
