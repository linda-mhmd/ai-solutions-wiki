---
title: "Code Smells and Refactoring"
description: "Indicators of design problems in code and systematic techniques for improving code structure without changing behavior."
date: 2026-03-28
categories: [Glossary]
tags: [code-smells, refactoring, software-quality, clean-code, design]
last_updated: 2026-05-30
---

Code smells are surface indicators of deeper design problems in source code. Refactoring is the disciplined technique of restructuring existing code to improve its internal structure without changing its external behavior. Together, they form a practice for continuously improving code quality.

## Origins and History

The term "code smell" was coined by Kent Beck in the late 1990s during discussions with Martin Fowler about patterns of problematic code. Fowler cataloged and popularized the concept in his influential 1999 book *Refactoring: Improving the Design of Existing Code*, which defined specific code smells and paired them with named refactoring techniques. The concept of behavior-preserving code transformation predated Fowler's work -- William Opdyke's 1992 PhD thesis "Refactoring Object-Oriented Frameworks" at the University of Illinois was the first major academic treatment. Ralph Johnson, Opdyke's advisor, contributed significantly to formalizing refactoring as a rigorous practice. The second edition of Fowler's book (2018) updated the catalog for modern programming languages. Automated refactoring support in IDEs (IntelliJ IDEA, Eclipse, Visual Studio) has made refactoring a routine part of development workflow.

## Common Code Smells

**Long Method** -- methods that try to do too much and are difficult to understand. **Large Class** -- classes with too many responsibilities violating the Single Responsibility Principle. **Duplicated Code** -- identical or similar code in multiple locations requiring synchronization. **Feature Envy** -- a method that uses more data from another class than its own. **Primitive Obsession** -- using primitive types instead of small objects for domain concepts (money, coordinates, phone numbers). **Shotgun Surgery** -- a single change requires modifications across many classes. **God Class** -- a class that knows too much or does too much, centralizing logic that should be distributed.

## Key Refactoring Techniques

**Extract Method** moves code into a new method with a descriptive name. **Move Method/Field** relocates functionality to the class where it belongs. **Replace Conditional with Polymorphism** eliminates complex switch statements using inheritance or interfaces. **Introduce Parameter Object** groups related parameters into a class. **Rename** improves clarity of methods, variables, and classes.

## Sources

1. Fowler, M. (2018). *Refactoring: Improving the Design of Existing Code*, 2nd ed. Addison-Wesley.
2. Opdyke, W.F. (1992). "Refactoring Object-Oriented Frameworks." PhD Thesis, University of Illinois at Urbana-Champaign.
3. Beck, K. et al. (1999). "Bad Smells in Code." Chapter 3 in Fowler, M. *Refactoring*, 1st ed. Addison-Wesley.
