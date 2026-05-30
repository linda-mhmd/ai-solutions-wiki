---
title: "Software Testing Fundamentals"
description: "Core concepts of software testing including testing levels, techniques, and principles for verifying software quality."
date: 2026-03-28
categories: [Glossary]
tags: [testing, software-quality, unit-testing, integration-testing, QA]
last_updated: 2026-05-30
---

Software testing is the process of evaluating a software system to detect differences between expected and actual behavior. It encompasses techniques for verifying that software meets its requirements (verification) and validates that it satisfies user needs (validation).

## Origins and History

Software testing as a discipline evolved alongside software engineering. Glenford Myers's 1979 book *The Art of Software Testing* established foundational concepts including the distinction between verification and validation, and defined testing as the process of executing a program with the intent of finding errors. The V-model, which maps testing levels to development phases, was formalized in the late 1970s and adopted in standards such as the German V-Modell (1992). The IEEE 829 standard (1998, revised 2008) standardized test documentation. The International Software Testing Qualifications Board (ISTQB), founded in 2002, established a global certification scheme that formalized testing terminology and practices. Test-driven development (TDD), popularized by Kent Beck as part of Extreme Programming (1999), reversed the traditional sequence by writing tests before code.

## Testing Levels

**Unit testing** verifies individual components (functions, methods, classes) in isolation, typically written and maintained by developers. **Integration testing** verifies that components work correctly together, testing interfaces and data flow between modules. **System testing** verifies the complete integrated system against its requirements in an environment that resembles production. **Acceptance testing** validates that the system meets business requirements and is ready for delivery, often performed by end users or stakeholders (UAT).

## Testing Techniques

**Black-box testing** designs test cases from specifications without knowledge of internal structure, using techniques like equivalence partitioning, boundary value analysis, and decision tables. **White-box testing** designs test cases based on internal code structure, using techniques like statement coverage, branch coverage, and path coverage. **Regression testing** re-executes existing tests after changes to ensure no existing functionality is broken. **Exploratory testing** relies on tester skill and intuition to simultaneously design and execute tests.

## Sources

1. Myers, G.J. (1979). *The Art of Software Testing*. Wiley.
2. ISTQB (2018). "ISTQB Certified Tester Foundation Level Syllabus, Version 2018." [https://www.istqb.org](https://www.istqb.org)
3. Beck, K. (2002). *Test Driven Development: By Example*. Addison-Wesley.
