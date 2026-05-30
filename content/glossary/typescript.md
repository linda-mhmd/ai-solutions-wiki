---
title: "TypeScript"
description: "The statically typed superset of JavaScript created by Anders Hejlsberg at Microsoft in 2012, introducing structural typing and compile-time type safety to the JavaScript ecosystem."
date: 2026-03-28
categories: [Glossary]
tags: [TypeScript, JavaScript, static-typing, Microsoft, Anders-Hejlsberg, type-system, compiler]
related:
  - glossary/nodejs
  - glossary/react
  - glossary/nextjs
  - glossary/vite
last_updated: 2026-05-30
---

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. Created by Anders Hejlsberg at Microsoft, TypeScript adds optional type annotations, interfaces, generics, and compile-time type checking to JavaScript while maintaining full compatibility with existing JavaScript code and the broader ecosystem.

## Origins and History

By 2010, JavaScript was increasingly used for large-scale applications --- Bing Maps, Office 365, and other Microsoft products were being written in JavaScript codebases spanning hundreds of thousands of lines. Teams discovered that JavaScript's dynamic typing, lack of module system, and minimal tooling support made these codebases difficult to maintain, refactor, and scale. The Bing Maps team was cited internally as a case study in the difficulty of making JavaScript work at enterprise scale.

Anders Hejlsberg, a Microsoft Technical Fellow and the lead architect of C# (and earlier, the creator of Turbo Pascal and Delphi), led a small team to develop a solution. The project, internally codenamed "Strada," spent approximately two years in development before its public unveiling [1].

On October 1, 2012, Microsoft publicly released TypeScript 0.8 as a preview on CodePlex, its open-source hosting platform at the time [2]. Hejlsberg presented the language to the developer community, explaining that TypeScript was designed as a strict superset of JavaScript: any valid JavaScript program is also a valid TypeScript program. The type system was additive and optional --- developers could adopt it incrementally rather than rewriting existing code.

TypeScript 0.9 (2013) added support for generics. TypeScript 1.0 was officially released at Microsoft's Build conference in April 2014. That same year, the project moved from CodePlex to GitHub, a decision Hejlsberg later identified as transformational [3]. On CodePlex, the team had practiced technically open-source development --- publishing code under a permissive license but using internal tracking systems. On GitHub, they adopted fully open development with public issues, pull requests, and community participation. Adoption accelerated rapidly.

## Core Concepts

**Structural type system.** Unlike nominal type systems (Java, C#) where types must be explicitly declared as compatible, TypeScript uses structural typing: two types are compatible if their structures (properties, methods) match, regardless of their declared names. This design choice aligns with how JavaScript developers already write code --- duck typing --- while adding compile-time verification.

**Type inference.** TypeScript infers types from context wherever possible, reducing the annotation burden. A variable initialized with a string is inferred as `string`; a function's return type is inferred from its return statements. Explicit annotations are only required where inference cannot determine the type.

**Gradual adoption.** Because TypeScript is a superset of JavaScript, teams can rename `.js` files to `.ts` and add types incrementally. The `any` type serves as an escape hatch, allowing untyped code to coexist with typed code during migration. The `strict` compiler flag enables progressively stricter checking.

**Compile-time only.** TypeScript's type system is entirely erased at compile time. The emitted JavaScript contains no type information and no runtime overhead. This means TypeScript does not introduce a runtime dependency --- it is purely a development and build-time tool.

## Impact

TypeScript fundamentally changed how the JavaScript ecosystem approaches correctness. The Angular team adopted TypeScript as the default language for Angular 2+ (2016). React's type definitions became among the most downloaded packages on DefinitelyTyped. By 2024, the majority of new npm packages included TypeScript declarations, and major frameworks (Next.js, Remix, SvelteKit) defaulted to TypeScript in their project scaffolding.

In March 2025, Hejlsberg announced a port of the TypeScript compiler to Go, targeting a 10x performance improvement for large codebases, to be released as TypeScript 7.0 [4].

## Sources

1. Foley, M.J. (2012). "Who built Microsoft TypeScript and why." ZDNet, October 2012. https://www.zdnet.com/article/who-built-microsoft-typescript-and-why/
2. Microsoft. (2012). TypeScript 0.8 release on CodePlex, October 1, 2012. https://devblogs.microsoft.com/typescript/announcing-typescript-0-8/
3. Hejlsberg, A. (2023). Interview on TypeScript's history and move to GitHub. https://www.aarthiandsriram.com/p/our-dream-conversation-anders-hejlsberg
4. Hejlsberg, A. (2025). "A 10x Faster TypeScript." TypeScript Blog, March 11, 2025. https://devblogs.microsoft.com/typescript/typescript-native-port/
