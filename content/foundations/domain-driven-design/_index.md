---
title: "Domain-Driven Design"
description: "Eric Evans's approach to software design that aligns the structure and language of code with the business domain. Bounded contexts, ubiquitous language, and aggregates give teams the vocabulary to build complex systems that remain coherent as they grow."
layout: single
tags: ["ddd", "domain-driven-design", "architecture", "bounded-context"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

Eric Evans published *Domain-Driven Design: Tackling Complexity in the Heart of Software* in 2003, drawing on a decade of work on large-scale enterprise systems. The book addressed a problem that was specific to complex domains: as systems grew, the code became increasingly decoupled from the business concepts it was meant to represent. Database schemas drove object design. Implementation details leaked into domain language. Different teams used the same words to mean different things, and the system reflected this confusion.

DDD is not a set of technologies. It is a discipline for collaborative modeling between domain experts and engineers, and a set of patterns for encoding that shared understanding into software. The patterns are divided into two categories: strategic patterns, which address how large systems are organized, and tactical patterns, which address how individual domain models are structured.

---

## The Ubiquitous Language

The first and most important practice in DDD is establishing a ubiquitous language - a shared vocabulary used consistently by domain experts, developers, and the codebase itself. This is more demanding than it sounds.

In most organizations, domain experts use business terms, developers use technical terms, and the gap between them is bridged by translation at every meeting. The translation introduces errors, creates ambiguity, and means the code never quite matches the domain it is supposed to model. A developer who calls something an "account" when the business calls it a "portfolio position" will model it incorrectly, and the mismatch will compound over time.

The ubiquitous language names the concepts, the actions, the rules, and the relationships that matter to the domain. It appears in class names, method names, variable names, and in conversation. When the language changes - when the domain expert starts calling something by a different name - the code changes to match.

```
// Without ubiquitous language - technical framing
class AccountRecord:
    def update_balance(amount): ...
    def check_limits(): ...

// With ubiquitous language - domain framing
class LoanAccount:
    def apply_payment(payment: Payment) -> None: ...
    def assess_repayment_capacity() -> RepaymentCapacity: ...
```

The difference is not cosmetic. The second version encodes the domain expert's concepts directly. A developer reading it can discuss it with a loan officer without translation.

---

## Bounded Contexts

In a complex domain, different parts of the organization use the same terms to mean different things. To a sales team, a "customer" is a prospect with a deal in progress. To a support team, a "customer" is an account with tickets. To a billing team, a "customer" is an entity with payment history and a credit limit. These are different models of the same concept, and forcing them into a single unified model produces a mess.

A bounded context is an explicit boundary within which a particular domain model applies. Inside the boundary, the ubiquitous language is consistent and the model is coherent. Outside the boundary, a different model applies. The boundary is made explicit in code through module boundaries, service boundaries, or package boundaries.

Evans's *context map* is the tool for documenting the relationships between bounded contexts:

- **Shared Kernel**: Two contexts share a subset of the model, with coordinated ownership.
- **Customer/Supplier**: One context (downstream) depends on another (upstream), which has responsibility for serving the downstream's needs.
- **Conformist**: The downstream context adopts the upstream model wholesale, without translation.
- **Anticorruption Layer**: The downstream context translates the upstream model into its own terms, preventing the upstream model's concepts from leaking in.
- **Separate Ways**: Two contexts have no integration. They evolve independently.

The Anticorruption Layer is particularly important in practice. When integrating with an external system or a legacy system with a poor model, the Anticorruption Layer acts as a translation boundary. The downstream context's model remains clean; the translation complexity is localized.

---

## Entities

An entity is an object defined by its identity rather than its attributes. Two customer records with the same name, address, and contact details are still two different customers if they have different customer IDs. The identity is what makes an entity distinct; the attributes change over time.

Entities have a lifecycle. They are created, modified through behavior, and eventually archived or deleted. The entity enforces its own invariants - the rules that must always be true. A `BankAccount` entity might enforce that the balance never goes below a minimum, or that a specific set of fields are always populated.

---

## Value Objects

A value object is an object defined by its attributes rather than its identity. Two `Money` objects with a value of `USD 100` are interchangeable - there is no meaningful sense in which one is different from the other. Value objects are immutable. Modifying a value object means creating a new one.

Value objects are used wherever possible because they are easier to test, easier to reason about, and carry no identity management overhead. `Money`, `DateRange`, `EmailAddress`, `GPS Coordinate`, and `Temperature` are all natural value objects.

```
// Value object - immutable, defined by attributes
class Money:
    def __init__(self, amount: Decimal, currency: str):
        self.amount = amount
        self.currency = currency

    def add(other: Money) -> Money:
        if self.currency != other.currency:
            raise CurrencyMismatch()
        return Money(self.amount + other.amount, self.currency)

    def __eq__(other):
        return self.amount == other.amount and self.currency == other.currency
```

---

## Aggregates

An aggregate is a cluster of domain objects (entities and value objects) that are treated as a unit for the purpose of data changes. One entity within the aggregate is the aggregate root. All access to the aggregate from outside goes through the root. External objects hold references only to the root, not to internal entities.

The aggregate root enforces the invariants of the entire cluster. An `Order` aggregate might contain `OrderLine` entities. No code outside the `Order` class modifies `OrderLine` objects directly - it calls methods on `Order`, which coordinates the change and ensures all invariants hold.

```
class Order:  // Aggregate root
    def __init__(self, order_id: OrderId, customer_id: CustomerId):
        self.id = order_id
        self.customer_id = customer_id
        self.lines: List[OrderLine] = []
        self.status = OrderStatus.DRAFT

    def add_item(product_id: ProductId, quantity: int, price: Money):
        if self.status != OrderStatus.DRAFT:
            raise OrderAlreadyConfirmed()
        line = OrderLine(product_id, quantity, price)
        self.lines.append(line)

    def confirm():
        if not self.lines:
            raise EmptyOrderError()
        self.status = OrderStatus.CONFIRMED
```

`OrderLine` is not accessible directly from outside. All mutations go through `Order`. This boundary ensures that the invariant "a confirmed order always has at least one line" can be enforced in one place.

---

## Domain Services

Some domain operations do not belong to a single entity or value object. They involve multiple domain objects and represent a significant piece of domain logic. These are domain services.

A currency conversion that requires consulting exchange rate tables and involves two `Money` value objects is not naturally an `Order` method or a `Money` method. It is domain service logic: `CurrencyConversionService.convert(amount, target_currency)`.

Domain services are stateless. They operate on domain objects passed to them and return domain objects. They do not hold references to repositories or infrastructure.

---

## Repositories

Repositories provide a collection-like interface for accessing domain objects. From the domain's perspective, querying for an `Order` by ID is like looking it up in a collection - the persistence mechanism is irrelevant. The repository interface is defined in the domain layer. The implementation lives in the infrastructure layer.

This is the Dependency Inversion Principle applied to persistence: the domain depends on an abstraction, and the infrastructure adapts to that abstraction.

---

## Strategic Patterns vs. Tactical Patterns

Evans distinguishes strategic DDD (bounded contexts, context maps, ubiquitous language) from tactical DDD (entities, value objects, aggregates, domain services, repositories). Strategic patterns are about how to organize a large system. Tactical patterns are about how to model a single bounded context.

A common mistake is applying tactical patterns without strategic clarity - designing aggregates without understanding the bounded context they belong to, or using DDD patterns in a domain where the complexity does not warrant them. DDD is most valuable in complex domains where the rules are intricate, frequently changing, and central to the application's value. For simple CRUD applications, it is unnecessary overhead.

---

## How This Applies to AI Systems

DDD's strategic patterns map naturally to multi-agent architectures, and its tactical patterns provide vocabulary for modeling AI components that have domain-specific behavior.

**Agents as bounded contexts.** In a multi-agent system, each agent operates in a bounded context. A research agent has its own language: it talks about "sources," "citations," "relevance scores," and "confidence levels." A code execution agent talks about "test results," "syntax errors," "execution environments," and "output." A customer service agent talks about "intents," "policies," "escalation paths," and "resolution states." These are different models of related but distinct domains. Forcing them into a shared model creates the same confusion that DDD's bounded contexts prevent.

**Anticorruption layers for external LLM APIs.** When an LLM API changes - new model versions, new pricing tiers, new response formats - an Anticorruption Layer translates the external API's model into the application's domain model. The application does not know that OpenAI changed their function calling format in a particular API version; the translation layer absorbs that change.

**Ubiquitous language in prompt design.** Prompts that use the domain's ubiquitous language produce better results than prompts that use technical jargon. An agent operating in a lending domain that uses terms like "principal balance," "repayment schedule," and "loan covenant" will produce outputs that align with the domain expert's expectations. The same principle applies to system prompts: the language should match the domain, not the developer's technical framing.

**Aggregates for agent state.** An agent's working memory - its current task, its tool call history, its intermediate results - is a natural aggregate. The agent is the aggregate root. External systems do not modify the tool call history directly; they interact with the agent, which coordinates its own state. Enforcing this boundary prevents the common problem of state corruption in long-running agent sessions.

**Domain services for cross-agent logic.** Logic that spans multiple agents - a routing decision based on task complexity, a consensus mechanism for multi-agent agreement, an evaluation function that scores outputs - is domain service logic. It belongs to neither agent individually but to the domain that contains them both.

### Related Pages
- [Clean Architecture](/foundations/clean-architecture/) - how DDD's layers map to Clean Architecture's layer model
- [SOLID Principles](/foundations/solid-principles/) - the single responsibility and dependency inversion principles align with DDD's aggregate and repository patterns
- [Design Patterns](/foundations/design-patterns/) - the Adapter pattern implements the Anticorruption Layer

## Sources and Further Reading

- [Evans, Eric. *Domain-Driven Design: Tackling Complexity in the Heart of Software.* Addison-Wesley, 2003](https://www.domainlanguage.com/ddd/) - The foundational text on Domain-Driven Design
- [Vernon, Vaughn. *Implementing Domain-Driven Design.* Addison-Wesley, 2013](https://www.informit.com/store/implementing-domain-driven-design-9780321834577) - Practical implementation guidance for DDD patterns
- [Evans, Eric. "Domain-Driven Design Reference." Domain Language, 2015](https://www.domainlanguage.com/ddd/reference/) - Concise reference summary of DDD patterns
- [Fowler, Martin. "BoundedContext." martinfowler.com](https://martinfowler.com/bliki/BoundedContext.html) - Clear explanation of bounded contexts and their role in DDD
