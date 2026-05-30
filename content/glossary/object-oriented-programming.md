---
title: "Object-Oriented Programming (OOP)"
description: "Classes, objects, inheritance, encapsulation, and polymorphism - how OOP concepts apply directly to AI frameworks like CrewAI and Pydantic."
date: 2026-03-26
categories: [Glossary]
tags: ["cs-fundamentals", "beginner", "oop", "classes", "inheritance", "encapsulation", "polymorphism"]
related:
  - guides/programming-languages-for-ai
  - tools/crewai
  - glossary/data-structures
last_updated: 2026-05-30
---

Object-oriented programming organizes code around objects - self-contained units that bundle data (attributes) and behavior (methods). It is the dominant paradigm in Python, Java, TypeScript, and most languages used for AI development today.

## Core Concepts

**Class**: A blueprint that defines what an object is. A class specifies what data an object holds and what operations it can perform.

**Object (Instance)**: A specific realization of a class. If `Agent` is a class, then `researcher = Agent(role="researcher")` creates an object - a specific instance with its own state.

**Encapsulation**: Bundling data and the methods that operate on it inside a class, and controlling access from outside. A well-encapsulated class exposes a clean interface and hides internal implementation details. This is why you call `agent.run()` rather than manipulating the agent's internal state directly.

**Inheritance**: A class can inherit from a parent class, gaining its attributes and methods while adding or overriding behavior. A `SeniorResearcher` class might inherit from `Agent` and override the `plan()` method to apply stricter verification steps.

**Polymorphism**: Different objects can respond to the same method call in different ways. A function that calls `.process(document)` works whether `document` is a PDF, HTML page, or plain text - each class implements `process()` differently but the calling code does not need to know the difference.

## OOP in AI Frameworks

**CrewAI agents as objects**: Each agent in CrewAI is an instance of the `Agent` class. The class encapsulates the agent's role, goal, backstory, and tools as attributes. Agents have methods like `execute_task()`. When you configure a crew, you are instantiating objects and wiring them together.

```python
from crewai import Agent

researcher = Agent(
    role="Research Analyst",
    goal="Find accurate information on the given topic",
    backstory="You are an expert at finding and synthesizing information.",
    tools=[search_tool, scrape_tool]
)
```

The `researcher` object has state (role, goal, tools) and behavior (the methods that execute tasks). This is OOP.

**Pydantic models as typed objects**: Pydantic is used extensively in AI pipelines to validate inputs and outputs. A Pydantic `BaseModel` is a class that enforces type constraints on its attributes at instantiation time. If a Bedrock response should have a `score` field between 0 and 1, a Pydantic model validates this automatically.

```python
from pydantic import BaseModel, Field

class VideoScore(BaseModel):
    clip_id: str
    emotion_score: float = Field(ge=0.0, le=1.0)
    quality_score: float = Field(ge=0.0, le=1.0)
    composite: float
```

This is OOP applied to data validation: the class defines structure, instances hold specific values, and encapsulation ensures invalid data is caught at the boundary.

**React components**: In Remotion and Next.js, React components are classes (or functions that behave like classes). Each component encapsulates its own rendering logic and local state. Components inherit from base primitives and can be composed into larger structures - polymorphism through the JSX interface.

## Design Patterns Built on OOP

The "Gang of Four" book (Gamma et al., 1994) catalogued 23 design patterns that solve common OOP problems. Several appear constantly in AI systems:

- **Factory Pattern**: A function that creates the right type of object based on configuration (e.g., selecting a model client based on a provider string)
- **Strategy Pattern**: Swappable algorithms behind a consistent interface (e.g., different scoring strategies for video clips)
- **Observer Pattern**: Objects that react to state changes (e.g., a callback that fires when a long-running Bedrock job completes)

## When OOP Is the Right Fit

OOP works well when you have entities with state that persist across multiple operations - agents, models, pipelines. It becomes cumbersome for simple data transformations, where functional programming (passing data through a series of pure functions) is often clearer. Most modern Python AI code mixes both: classes for stateful entities, functions for transformations.

## Sources

- Gamma, E., Helm, R., Johnson, R., and Vlissides, J. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994.
- Python Software Foundation. *Classes - Python 3 Tutorial*. https://docs.python.org/3/tutorial/classes.html
