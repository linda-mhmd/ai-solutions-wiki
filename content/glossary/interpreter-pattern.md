---
title: "Interpreter Pattern"
description: "A behavioral design pattern that defines a representation for a language's grammar and provides an interpreter to evaluate sentences in that language."
date: 2026-03-28
categories: [Glossary]
tags: [design-patterns, behavioral-patterns, GoF, interpreter, grammar, DSL, object-oriented-design]
related:
  - glossary/composite-pattern
  - glossary/visitor-pattern
  - glossary/strategy-pattern
  - glossary/object-oriented-programming
last_updated: 2026-05-30
---

The Interpreter pattern is a behavioral design pattern that, given a language, defines a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

## Origins and History

The Interpreter pattern was cataloged by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). The pattern draws on formal language theory and compiler design, where abstract syntax trees (ASTs) represent parsed expressions. The GoF noted that the pattern is most applicable to simple grammars where efficiency is not a primary concern. Smalltalk compilers and rule engines of the late 1980s influenced the pattern's formalization.

## How It Works

The **AbstractExpression** declares an abstract `interpret()` method. **TerminalExpression** implements `interpret()` for terminal symbols in the grammar (literals, variables). **NonterminalExpression** implements `interpret()` for grammar rules that combine other expressions, maintaining references to child AbstractExpression objects. The **Context** contains global information needed during interpretation, such as variable bindings. The **Client** builds an abstract syntax tree from AbstractExpression nodes and invokes `interpret()` on the root.

The tree structure maps directly to the grammar's production rules. Evaluating the tree recursively evaluates the expression according to the language definition.

## When to Use It

Use Interpreter when you have a simple language or grammar that needs to be evaluated, when the grammar is simple and efficiency is not critical, or when you are building domain-specific languages (DSLs), rule engines, query parsers, mathematical expression evaluators, or configuration languages. SQL WHERE clause parsers and regular expression engines are conceptual examples of the pattern, though production implementations use more efficient techniques.

## Common Pitfalls

The pattern does not scale well to complex grammars. Each grammar rule requires a class, and large grammars produce large class hierarchies that are difficult to maintain. Performance degrades with complex expressions because interpretation involves recursive tree traversal. For non-trivial languages, parser generators (ANTLR, yacc) or compiler techniques are more appropriate than the Interpreter pattern.

## Relationship to Other Patterns

Interpreter uses Composite's tree structure to represent the grammar. Visitor can be used to add new operations on the AST without modifying the expression classes. Flyweight can be applied to share terminal expression instances that appear frequently.

## Sources

1. Gamma, E., Helm, R., Johnson, R., Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Aho, A.V., Sethi, R., Ullman, J.D. (1986). *Compilers: Principles, Techniques, and Tools*. Addison-Wesley.
3. Fowler, M. (2010). *Domain-Specific Languages*. Addison-Wesley.
