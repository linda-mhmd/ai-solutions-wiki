---
title: "Design Patterns"
description: "The Gang of Four catalog of reusable solutions to recurring object-oriented design problems. Patterns are not code to copy - they are vocabulary for describing proven structural solutions."
layout: single
tags: ["design-patterns", "oop", "architecture", "gang-of-four"]
categories: ["Foundations"]
last_updated: 2026-05-30
---

In 1994, Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides - the "Gang of Four" - published *Design Patterns: Elements of Reusable Object-Oriented Software*. The book documented 23 patterns observed across large object-oriented codebases. It did not invent these patterns. It named them.

That naming was the contribution. Before the book, experienced developers had independently arrived at the same structural solutions to the same problems. They could not discuss them precisely because there was no shared vocabulary. After the book, "use a Strategy here" or "this needs a Factory" communicated not just a solution but its rationale, its tradeoffs, and the range of contexts where it applied.

The patterns are organized into three categories: creational patterns (how objects are created), structural patterns (how objects are composed), and behavioral patterns (how objects communicate). The most important patterns for practical software design - and for AI system design specifically - are covered here.

---

## Creational Patterns

### Factory Method

Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

The problem Factory Method solves is construction complexity. When creating an object requires knowledge of which concrete type to use, and that knowledge changes based on context, embedding the construction logic at the call site violates the Open/Closed Principle - adding a new type requires modifying every place that does construction.

```
interface LLMClient:
    def complete(prompt: str, max_tokens: int) -> str

class OpenAIClient implements LLMClient:
    def complete(prompt, max_tokens): ...

class AnthropicClient implements LLMClient:
    def complete(prompt, max_tokens): ...

class LLMClientFactory:
    def create(provider: str, config: Config) -> LLMClient:
        match provider:
            case "openai":   return OpenAIClient(config.openai_api_key)
            case "anthropic": return AnthropicClient(config.anthropic_api_key)
            case _:          raise ValueError(f"Unknown provider: {provider}")
```

The factory centralizes construction. Code that needs an `LLMClient` calls the factory; it does not know which concrete type it receives.

### Abstract Factory

Provide an interface for creating families of related objects without specifying their concrete classes.

Where Factory Method creates one type of object, Abstract Factory creates a coordinated set of related objects. A cloud infrastructure factory might create compute instances, storage volumes, and load balancers that are designed to work together within a given cloud provider.

---

## Structural Patterns

### Adapter

Convert the interface of a class into another interface that clients expect. Adapter lets classes work together that could not otherwise because of incompatible interfaces.

The Adapter pattern is the direct implementation of the Dependency Inversion Principle. The application defines the interface it needs (the target interface). The adapter wraps an existing class (the adaptee) and makes it conform to that interface.

```
// Target interface - what the application expects
interface VectorStore:
    def upsert(id: str, vector: List[float], metadata: dict) -> None
    def query(vector: List[float], top_k: int) -> List[SearchResult]

// Adaptee - third-party library with its own interface
class PineconeIndex:
    def upsert(vectors: List[Tuple]) -> None
    def query(vector: List[float], top_k: int) -> dict

// Adapter - makes Pinecone conform to VectorStore
class PineconeAdapter implements VectorStore:
    def __init__(self, index: PineconeIndex):
        self.index = index

    def upsert(id, vector, metadata):
        self.index.upsert([(id, vector, metadata)])

    def query(vector, top_k):
        result = self.index.query(vector, top_k)
        return [SearchResult(r["id"], r["score"]) for r in result["matches"]]
```

The adapter is in the outermost layer of Clean Architecture. Business logic calls `VectorStore`. The adapter translates to Pinecone's actual API. Switching vector stores means writing a new adapter, not changing business logic.

### Decorator

Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

Decorators wrap an object with the same interface, adding behavior before or after delegating to the wrapped object. They compose, so multiple decorators stack cleanly.

```
interface LLMClient:
    def complete(prompt: str) -> str

class RateLimitedClient implements LLMClient:
    def __init__(self, client: LLMClient, rate_limiter: RateLimiter):
        self.client = client
        self.limiter = rate_limiter

    def complete(prompt):
        self.limiter.acquire()
        return self.client.complete(prompt)

class RetryingClient implements LLMClient:
    def __init__(self, client: LLMClient, max_retries: int):
        self.client = client
        self.max_retries = max_retries

    def complete(prompt):
        for attempt in range(self.max_retries):
            try: return self.client.complete(prompt)
            except RateLimitError: sleep(2 ** attempt)

// Compose decorators
client = RetryingClient(
    RateLimitedClient(OpenAIClient(api_key), limiter),
    max_retries=3
)
```

Each decorator has one responsibility. Composition assembles the behavior needed for a specific context without modifying any individual class.

### Facade

Provide a simplified interface to a complex subsystem.

A facade does not add behavior - it reduces complexity by hiding a system's internal structure behind a simpler interface. A document processing pipeline with separate classes for OCR, chunking, embedding, and indexing might expose a `DocumentIngestionService.ingest(file_path)` facade that coordinates all of them.

---

## Behavioral Patterns

### Strategy

Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

Strategy is the pattern that makes systems configurable at the behavior level. The context holds a reference to a strategy interface and delegates the variable behavior to it.

```
interface EmbeddingStrategy:
    def embed(text: str) -> List[float]

class OpenAIEmbedding implements EmbeddingStrategy:
    def embed(text): ...  // calls text-embedding-3-small

class SentenceTransformerEmbedding implements EmbeddingStrategy:
    def embed(text): ...  // runs locally via sentence-transformers

class DocumentIndexer:
    def __init__(self, embedding_strategy: EmbeddingStrategy):
        self.embed = embedding_strategy

    def index(document: Document):
        vector = self.embed(document.text)
        store.upsert(document.id, vector)
```

Swapping embedding providers is a one-line change at construction time. The `DocumentIndexer` logic does not change.

### Observer

Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

Observer decouples event producers from event consumers. The subject (producer) maintains a list of observers and notifies them when state changes, without knowing anything specific about what each observer does.

```
interface PipelineObserver:
    def on_step_complete(step: str, result: any) -> None
    def on_error(step: str, error: Exception) -> None

class MetricsObserver implements PipelineObserver:
    def on_step_complete(step, result):
        metrics.record(step, duration=result.duration)

class AuditLogObserver implements PipelineObserver:
    def on_step_complete(step, result):
        audit_log.append(step, result.summary)

class Pipeline:
    def __init__(self):
        self.observers: List[PipelineObserver] = []

    def add_observer(observer): self.observers.append(observer)

    def _notify(step, result):
        for obs in self.observers:
            obs.on_step_complete(step, result)
```

Adding a new observer (Slack notifications, cost tracking, compliance logging) requires no changes to the `Pipeline` class.

### Command

Encapsulate a request as an object, allowing parameterization, queuing, logging, and undo operations.

Command objects represent actions. They separate the decision to perform an action from the execution of that action. This separation enables queuing, serialization, retry logic, and undo.

---

## Patterns as Vocabulary

The value of the Gang of Four catalog is precision in communication. When a senior engineer says "this needs a Strategy," the recommendation carries meaning beyond the code change: it implies an interface, a set of concrete implementations, a context that holds the strategy reference, and the design philosophy that the algorithm should vary independently of the context. That meaning cannot be conveyed with equal precision by describing the implementation alone.

Overusing patterns is as harmful as ignoring them. A Factory for a class that is only ever instantiated one way is ceremony without benefit. Patterns address recurring problems; when the problem is not present, the pattern is not warranted.

---

## How This Applies to AI Systems

The patterns described above appear throughout AI system design with a high degree of regularity.

**Factory for LLM client instantiation.** Different environments (development, testing, production) and different tasks (fast responses vs. deep reasoning, cheap vs. expensive) require different LLM clients. A factory that reads provider configuration and returns the appropriate client keeps construction logic centralized and makes client substitution straightforward.

**Strategy for model selection.** Routing different request types to different models - cheap models for classification, expensive models for synthesis, local models for sensitive data - is the Strategy pattern. The routing logic (the context) selects a strategy (the model client) based on request properties, without the caller needing to know which model is used.

**Decorator for middleware chains.** Rate limiting, retry logic, request logging, cost tracking, prompt caching, and fallback behavior are all cross-cutting concerns that can be implemented as decorators on an `LLMClient` interface. Each decorator handles one concern and delegates to the next. The chain is composed at startup based on configuration.

**Observer for pipeline monitoring.** An AI processing pipeline with observers for metrics, audit logging, cost tracking, and error alerting can add or remove monitoring concerns without touching the pipeline logic. The pipeline emits events; observers react.

**Adapter for provider abstraction.** Every LLM provider, vector store, and external tool has its own SDK with its own interface conventions. Adapters translate these to the interfaces the application expects. When OpenAI changes an API, only the adapter changes.

### Related Pages
- [SOLID Principles](/foundations/solid-principles/) - the principles that justify pattern usage, especially OCP and DIP
- [Clean Architecture](/foundations/clean-architecture/) - the architectural context where these patterns are most useful
- [Testing Strategy](/foundations/testing-strategy/) - Strategy and Adapter patterns make AI components testable in isolation
