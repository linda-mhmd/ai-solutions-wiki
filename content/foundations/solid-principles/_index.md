---
title: "SOLID Principles"
description: "Five principles of object-oriented class design formulated by Robert C. Martin. A foundational framework for writing code that is easy to understand, extend, and maintain over time."
layout: single
tags: ["software-design", "oop", "architecture", "clean-code"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

The SOLID principles were introduced by Robert C. Martin in his 2000 paper "Design Principles and Design Patterns" and later consolidated in his 2002 book *Agile Software Development: Principles, Patterns, and Practices*. The acronym itself was coined by Michael Feathers. The five principles address a specific class of failure: software that starts manageable but becomes progressively harder to change as requirements evolve. Martin called these failure modes "rotting" - rigidity, fragility, immobility, viscosity, and needless complexity.

Each principle targets one of these failure modes. Together they describe a design philosophy that favors explicit contracts over implicit coupling, and composition over inheritance hierarchies.

---

## Single Responsibility Principle

A class should have only one reason to change.

The principle is not about doing one thing - a method can do one thing while a class coordinates many. It is about change: who or what in the organization could require this class to be modified? If the answer is "the billing team and the reporting team and the infrastructure team," the class has multiple responsibilities and multiple owners. When any of them changes their requirements, the class changes, and the other teams bear the risk.

```
// Violates SRP - handles both data and formatting
class UserReport:
    def get_user_data(user_id): ...
    def format_as_html(data): ...
    def format_as_csv(data): ...
    def save_to_file(content, path): ...

// Respects SRP - separated concerns
class UserRepository:
    def get_user_data(user_id): ...

class ReportFormatter:
    def format(data, format_type): ...

class ReportWriter:
    def save(content, path): ...
```

The practical test: can you describe what this class does without using the word "and"?

---

## Open/Closed Principle

Software entities should be open for extension but closed for modification.

Bertrand Meyer introduced this formulation in *Object-Oriented Software Construction* (1988). Martin reframed it in terms of abstractions: a class is closed for modification when its behavior can be changed by writing new code rather than editing existing code. This is achieved through dependency on abstractions rather than concretions.

```
// Closed for modification, open for extension via abstraction
interface NotificationChannel:
    def send(message: Message) -> None

class EmailNotification implements NotificationChannel:
    def send(message): ...

class SlackNotification implements NotificationChannel:
    def send(message): ...

class NotificationService:
    def __init__(channels: List[NotificationChannel]):
        self.channels = channels

    def notify(message):
        for channel in self.channels:
            channel.send(message)
```

Adding SMS notifications requires a new class, not a modification to `NotificationService`. The service is closed. Adding SMS to a switch statement inside `NotificationService` would violate OCP by requiring modification of tested, deployed code.

---

## Liskov Substitution Principle

Subtypes must be substitutable for their base types without altering the correctness of the program.

Barbara Liskov introduced this principle in her 1987 keynote "Data Abstraction and Hierarchy." The formal definition involves behavioral subtyping: a subtype must honor the preconditions, postconditions, and invariants of its supertype. Strengthening preconditions or weakening postconditions breaks substitutability.

The canonical violation is the Square/Rectangle problem. A `Square` is a `Rectangle` geometrically, but behaviorally it is not - setting width on a `Square` implicitly changes its height, violating the assumption a caller has when working with a `Rectangle`.

```
// Violates LSP - Square breaks Rectangle's invariant
class Rectangle:
    def set_width(w): self.width = w
    def set_height(h): self.height = h
    def area(): return self.width * self.height

class Square(Rectangle):
    def set_width(w):
        self.width = w
        self.height = w  // side effect breaks Rectangle contract

// LSP-compliant alternative: use a shared abstraction
interface Shape:
    def area() -> float

class Rectangle implements Shape: ...
class Square implements Shape: ...
```

In practice, LSP violations surface as `isinstance` checks in caller code - a signal that the abstraction hierarchy does not reflect behavioral compatibility.

---

## Interface Segregation Principle

Clients should not be forced to depend on methods they do not use.

Martin introduced ISP in response to a printer system design where a single interface forced all implementors to implement all operations, including those irrelevant to their purpose. The principle argues for narrow, focused interfaces over fat, general ones.

```
// Fat interface - violates ISP
interface Worker:
    def work()
    def eat()
    def sleep()

class Robot implements Worker:
    def work(): ...
    def eat(): raise NotImplemented  // forced to implement irrelevant method
    def sleep(): raise NotImplemented

// Segregated interfaces
interface Workable:
    def work()

interface HumanBehavior:
    def eat()
    def sleep()

class HumanWorker implements Workable, HumanBehavior: ...
class Robot implements Workable: ...
```

The downstream benefit is reduced coupling: changing the `HumanBehavior` interface does not force recompilation or retesting of `Robot`. This matters in large codebases where unnecessary recompilation cascades.

---

## Dependency Inversion Principle

High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details - details should depend on abstractions.

This is the most architectural of the five principles. It reorients the direction of dependency. In traditional layered design, high-level business logic imports low-level infrastructure - the application layer knows about the database layer. DIP inverts this: the application layer defines an interface, and the infrastructure layer implements it.

```
// Without DIP - high-level depends on low-level
class OrderService:
    def __init__(self):
        self.db = PostgresOrderRepository()  // concrete dependency

// With DIP - both depend on abstraction
interface OrderRepository:
    def save(order: Order) -> None
    def find_by_id(id: str) -> Order

class OrderService:
    def __init__(self, repo: OrderRepository):
        self.repo = repo  // depends on abstraction

class PostgresOrderRepository implements OrderRepository: ...
class InMemoryOrderRepository implements OrderRepository: ...  // useful in tests
```

DIP enables the architectural patterns that Martin codifies in Clean Architecture. It is the mechanism by which the dependency rule - dependencies point inward toward business logic - is enforced.

---

## SOLID as a System

The five principles reinforce each other. SRP limits the scope of a class, making it easier to honor OCP (less to modify). DIP enables OCP by making substitution natural. LSP makes DIP reliable by ensuring substituted implementations behave correctly. ISP keeps interfaces narrow enough that DIP is practical.

Violating one principle typically creates pressure to violate others. A class with multiple responsibilities (SRP violation) tends to grow a fat interface (ISP violation), making it difficult to substitute (LSP violation) and impossible to extend without modification (OCP violation).

---

## How This Applies to AI Systems

SOLID principles apply directly to the structural decisions in AI system design.

**Single Responsibility in agent design.** An agent that retrieves context, generates a response, validates output, logs to a database, and formats for a UI is a class with five responsibilities. Changes to any one of them - switching the vector store, changing the output format, adding a new validation rule - touch the same module. Agent logic, retrieval logic, validation logic, and infrastructure should be separate components with separate change cycles.

**Open/Closed for model swapping.** LLM providers change constantly - pricing shifts, models are deprecated, better options emerge. A system that hardcodes `openai.ChatCompletion.create(...)` throughout its codebase is closed for extension and open for modification in the worst way. An abstraction layer (`LLMClient` interface with provider-specific implementations) makes the system open for extension: adding a new model means adding a new implementation, not editing existing calls.

**LSP for prompt template hierarchies.** If a base `PromptTemplate` guarantees that calling `render(context)` returns a valid string under 4000 tokens, every subclass must honor that contract. A specialized template that can return unlimited-length output violates LSP and will break callers that assume the constraint.

**ISP for tool interfaces.** An agent tool interface that requires implementing `execute`, `validate`, `describe`, `rollback`, and `audit_log` will be poorly implemented by most tools - implementors will stub out irrelevant methods. Segregate into `ExecutableTool`, `AuditableTool`, and `RollbackableTool` so tools only implement what applies to them.

**DIP for LLM abstraction.** The core business logic of an AI system - the rules about what questions to ask, how to evaluate answers, what constitutes a valid response - should not import an LLM SDK directly. It should depend on an abstraction. The LLM SDK is an implementation detail, and implementation details change. This is the principle that enables testing AI system logic without hitting a live model endpoint.

### Related Pages
- [Clean Architecture](/foundations/clean-architecture/) - how DIP scales to full system layers
- [Design Patterns](/foundations/design-patterns/) - the Strategy and Adapter patterns implement DIP in practice
- [Testing Strategy](/foundations/testing-strategy/) - DIP makes unit testing AI components feasible

## Sources and Further Reading

- [Martin, Robert C. "Design Principles and Design Patterns." (2000)](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) - Original paper introducing the SOLID principles
- [Martin, Robert C. *Agile Software Development: Principles, Patterns, and Practices.* Pearson, 2002](https://www.pearson.com/en-us/subject-catalog/p/agile-software-development-principles-patterns-and-practices/P200000009481) - Comprehensive treatment of SOLID and related design principles
- [Martin, Robert C. *Clean Code: A Handbook of Agile Software Craftsmanship.* Pearson, 2008](https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P100000411388) - Practical application of SOLID principles in code
- [Liskov, Barbara. "Data Abstraction and Hierarchy." OOPSLA 1987](https://dl.acm.org/doi/10.1145/62139.62141) - Original formulation of the Liskov Substitution Principle
