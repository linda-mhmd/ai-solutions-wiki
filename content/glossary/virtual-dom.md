---
title: "Virtual DOM"
description: "The Virtual DOM is an in-memory representation of the real DOM introduced by React in 2013, enabling efficient UI updates through a diffing and reconciliation algorithm."
date: 2026-03-28
categories: [Glossary]
tags: [virtual-dom, react, reconciliation, dom, ui-rendering, svelte, solidjs]
related:
  - glossary/remotion
  - glossary/component-driven-development
last_updated: 2026-05-30
---

The Virtual DOM (VDOM) is a programming concept where a lightweight, in-memory representation of the real browser DOM is maintained by a UI framework. When application state changes, the framework renders a new virtual tree, compares it against the previous virtual tree to compute the minimal set of differences, and applies only those differences to the real DOM. This process, called reconciliation, was introduced by React in 2013 and became one of the most influential ideas in modern frontend development.

## Origins and History

Jordan Walke, a software engineer at Facebook, developed the initial prototype of React in 2011, originally called "FaxJS" [1]. Walke was inspired by XHP, a PHP-based component framework used internally at Facebook, and wanted to apply similar ideas to JavaScript for building the Facebook News Feed. The key innovation was the Virtual DOM: instead of directly manipulating the browser's DOM (which is slow and complex), the framework would maintain its own representation and batch-compute the minimal updates needed.

React was first deployed internally at Facebook in 2011-2012 and was publicly released at JSConf US in May 2013 [2]. The Virtual DOM concept was central to React's pitch: developers could write declarative components that described what the UI should look like for a given state, and React would efficiently figure out how to update the real DOM to match.

## The Reconciliation Algorithm

When a component's state or props change, React re-renders that component, producing a new virtual DOM tree. The reconciliation algorithm then diffs the new tree against the previous one to determine what changed.

A naive tree diffing algorithm has O(n cubed) complexity, which is prohibitively expensive. React's algorithm achieves O(n) complexity through two heuristics: elements of different types produce entirely different subtrees (so React does not attempt to diff them), and developers provide `key` props on list items to help React identify which items moved, were added, or were removed [3].

The original implementation, known as the Stack Reconciler, processed the entire component tree synchronously in a single pass. This worked well for most applications but could cause frame drops in complex UIs because the browser's main thread was blocked during reconciliation.

## React Fiber (2017)

React 16, released in September 2017, introduced the Fiber architecture, a complete rewrite of the reconciliation engine [4]. Fiber breaks rendering work into small units that can be paused, resumed, and prioritized. High-priority updates like user input are processed before low-priority updates like data fetching results. This incremental rendering approach prevents long-running reconciliation from blocking the main thread, enabling smoother user experiences in complex applications.

Fiber laid the groundwork for Concurrent Mode and features like `useTransition` and `Suspense`, which allow React to work on multiple versions of the UI simultaneously and commit the result when ready.

## Modern Alternatives

The Virtual DOM approach has been challenged by frameworks that eliminate the diffing step entirely.

**Svelte**, created by Rich Harris in 2016, uses a compiler approach. Instead of shipping a runtime that diffs virtual trees, Svelte compiles components into imperative JavaScript that directly updates the specific DOM nodes that depend on changed state. There is no virtual DOM and no reconciliation at runtime. The framework's work is done at build time rather than at runtime.

**SolidJS**, created by Ryan Carniato, uses fine-grained reactivity with signals. Components execute once to set up reactive subscriptions, and when a signal's value changes, only the specific DOM nodes that depend on that signal are updated. Like Svelte, SolidJS bypasses the virtual DOM entirely, achieving high performance through precise, targeted updates.

These alternatives demonstrate that the Virtual DOM was a pragmatic solution to a real problem, not a theoretically optimal one. The Virtual DOM trades a small amount of runtime overhead for a dramatically simpler programming model, which proved to be the right tradeoff for React's massive adoption.

## Sources

1. React (JavaScript library) - Wikipedia. [https://en.wikipedia.org/wiki/React_(JavaScript_library)](https://en.wikipedia.org/wiki/React_(JavaScript_library))
2. React Legacy Documentation. "Reconciliation." [https://legacy.reactjs.org/docs/reconciliation.html](https://legacy.reactjs.org/docs/reconciliation.html)
3. Walke, J. (2013). React presentation at JSConf US 2013.
4. Rasouli, S. "The Evolution of React Reconciliation: From Stack to Fiber and the React Compiler." [https://medium.com/@sattarrasouli/the-evolution-of-react-reconciliation-from-stack-to-fiber-to-the-react-compiler-9a63d08b3ad3](https://medium.com/@sattarrasouli/the-evolution-of-react-reconciliation-from-stack-to-fiber-to-the-react-compiler-9a63d08b3ad3)
