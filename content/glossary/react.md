---
title: "React"
description: "The declarative, component-based JavaScript UI library created at Facebook in 2013 that introduced the virtual DOM and fundamentally changed how developers build user interfaces."
date: 2026-03-28
categories: [Glossary]
tags: [React, JavaScript, frontend, UI, virtual-DOM, component-model, Meta, Facebook]
related:
  - glossary/nextjs
  - glossary/remix
  - glossary/react-router
  - glossary/typescript
  - glossary/single-page-application
last_updated: 2026-05-30
---

React is a declarative, component-based JavaScript library for building user interfaces. Originally developed at Facebook by Jordan Walke, React introduced the concept of a virtual DOM and a component-driven architecture that shifted frontend development away from imperative DOM manipulation toward declarative UI descriptions.

## Origins and History

React's origins trace to 2011, when Facebook engineer Jordan Walke created an internal prototype called FaxJS (later FBolt) to address the growing complexity of Facebook's ads platform. Walke was inspired by XHP, a PHP extension that allowed mixing markup with code, and wanted to bring a similar model to client-side JavaScript. His core insight was radical for the time: instead of tracking granular DOM mutations, simply re-render the entire UI whenever state changes and let the framework compute the minimal set of actual DOM updates.

Facebook deployed React internally on the News Feed in 2011 and on Instagram's web application after the 2012 acquisition. Instagram's team needed React to work as a standalone library rather than a Facebook-internal tool, which pushed the team toward open-sourcing it.

On May 29, 2013, Tom Occhino and Jordan Walke presented React publicly at JSConf US in Amelia Island, Florida [1]. The initial reception was notably hostile. Attendees were skeptical of a UI library from a corporate sponsor, and JSX --- the syntax extension that embedded HTML-like markup directly in JavaScript --- drew particular criticism. The audience largely viewed mixing markup with logic as a regression.

Facebook published an accompanying blog post, "Why did we build React?" on June 5, 2013, explaining the motivations behind the project [2]. The React team then embarked on a deliberate advocacy campaign. Pete Hunt's subsequent talk at JSConf EU in September 2013, "React: Rethinking Best Practices," reframed the discussion around React's architectural advantages rather than defending JSX syntax, and the community response improved dramatically [3].

## Core Concepts

**Component model.** React organizes UIs as a tree of reusable components. Each component is a function (or class) that accepts props and returns a description of what should appear on screen. This composability made it possible to build complex interfaces from small, isolated, testable units.

**Virtual DOM.** React maintains an in-memory representation of the UI. When state changes, React produces a new virtual DOM tree, diffs it against the previous one, and applies only the necessary mutations to the real DOM. This reconciliation algorithm made declarative rendering performant enough for production use.

**Declarative paradigm.** Developers describe what the UI should look like for a given state, not how to transition between states. React handles the imperative DOM operations internally. This eliminated entire classes of bugs related to inconsistent UI state.

**Unidirectional data flow.** Data flows downward through the component tree via props. State changes propagate predictably, making applications easier to reason about and debug compared to two-way data binding systems popular at the time (Angular 1.x, Backbone).

## Impact on Frontend Development

React's influence extends far beyond the library itself. The component model it popularized became the standard architecture adopted by Vue.js, Angular 2+, Svelte, and Solid. The virtual DOM concept inspired similar implementations across frameworks, though some later frameworks (Svelte, Solid) achieved comparable or better performance by compiling away the virtual DOM entirely.

React also catalyzed the ecosystem of tools built around it: React Router for client-side navigation, Redux and MobX for state management, Next.js and Remix for server-side rendering, and React Native for mobile development. The hooks API, introduced in React 16.8 (February 2019), further simplified component logic by replacing class-based patterns with composable functions.

As of 2026, React remains the most widely used frontend library, with over 230,000 GitHub stars and adoption across companies ranging from startups to enterprises.

## Sources

1. Occhino, T. and Walke, J. (2013). "JS Apps at Facebook." JSConf US 2013, May 29, 2013. Video available at: https://www.youtube.com/watch?v=GW0rj4sNH2w
2. Facebook Engineering. (2013). "Why did we build React?" React Blog, June 5, 2013. https://legacy.reactjs.org/blog/2013/06/05/why-react.html
3. Hunt, P. (2013). "React: Rethinking Best Practices." JSConf EU, September 2013. https://www.youtube.com/watch?v=x7cQ3mrcKaY
4. React GitHub Repository. https://github.com/facebook/react
