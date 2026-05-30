---
title: "Web Components"
description: "Web Components are a set of W3C standards (Custom Elements, Shadow DOM, HTML Templates) for creating reusable, encapsulated UI elements, first introduced by Alex Russell at Fronteers 2011."
date: 2026-03-28
categories: [Glossary]
tags: [web-components, shadow-dom, custom-elements, html-templates, standards, browser-api]
related:
  - glossary/component-driven-development
  - glossary/virtual-dom
last_updated: 2026-05-30
---

Web Components are a set of web platform standards that allow developers to create custom, reusable, encapsulated HTML elements. Unlike framework-specific components (React components, Vue components), Web Components are built on browser-native APIs and work in any framework or with no framework at all. The three core specifications are Custom Elements, Shadow DOM, and HTML Templates.

## Origins and History

Web Components were first introduced by Alex Russell, a Google Chrome engineer, at the Fronteers Conference in Amsterdam in October 2011, in a presentation titled "Web Components and Model Driven Views" [1]. Russell demonstrated three interconnected capabilities that the Chrome team was developing: the ability to define custom HTML elements with their own behavior, a shadow DOM mechanism for encapsulating a component's internal structure away from the outer document, and a templating system for declarative markup with data binding.

The presentation generated significant discussion in the web development community and initiated a multi-year standardization process through the W3C and WHATWG. Google's Polymer library, released in 2013, provided polyfills that allowed developers to use Web Components in browsers that had not yet implemented the standards natively. Early native implementations appeared in Chrome and Safari in 2016. Firefox added support in 2018, and Edge followed in 2020 after switching to the Chromium rendering engine [2].

The long timeline from proposal to cross-browser availability, nearly a decade, reflects the complexity of achieving consensus among browser vendors on fundamental platform extensions.

## Core Specifications

**Custom Elements** allow developers to define new HTML tags with custom behavior. The `customElements.define()` API registers a class that extends `HTMLElement` with a tag name (which must contain a hyphen, for example `<user-card>`). The class can define lifecycle callbacks: `connectedCallback` (element added to DOM), `disconnectedCallback` (removed), `attributeChangedCallback` (attribute modified), and `adoptedCallback` (moved to a new document). Custom Elements participate in the standard DOM API: they can be created with `document.createElement()`, queried with `querySelector()`, and styled with CSS.

**Shadow DOM** provides DOM and style encapsulation. A shadow root is attached to an element, creating an isolated subtree with its own scope. Styles defined inside the shadow root do not leak out to the surrounding document, and styles from the outer document do not penetrate into the shadow root (with limited exceptions via CSS custom properties and `::part()`). This encapsulation solves the global-scope CSS collision problems that plague large web applications.

**HTML Templates** use the `<template>` element to declare markup that is parsed but not rendered until explicitly cloned and inserted into the document. Templates hold inert DOM fragments that serve as stamps for creating component instances efficiently.

## Slots and Composition

The `<slot>` element provides a composition mechanism. A component's shadow DOM can define named slots, and consumers of the component provide content that fills those slots. This enables a clean separation between a component's internal structure and the content projected into it by the consuming page.

## Adoption and Current State

Web Components are used extensively by organizations that need framework-agnostic component libraries. Adobe's Spectrum Web Components, Salesforce's Lightning Web Components, and GitHub's own UI components (like `<relative-time>`) are built as Web Components. Google's Lit library (successor to Polymer) provides a lightweight base class and reactive templating layer for building Web Components with minimal boilerplate.

The primary criticism of Web Components has been their lower-level API compared to framework components, requiring more boilerplate for common patterns like reactive state management and efficient list rendering. Libraries like Lit address this gap while remaining thin wrappers over the platform standards.

## Sources

1. Fronteers (2011). "Web Components and Model Driven Views by Alex Russell." Fronteers Conference 2011. [https://fronteers.nl/congres/2011/sessions/web-components-and-model-driven-views-alex-russell](https://fronteers.nl/congres/2011/sessions/web-components-and-model-driven-views-alex-russell)
2. Web Components - Wikipedia. [https://en.wikipedia.org/wiki/Web_Components](https://en.wikipedia.org/wiki/Web_Components)
3. MDN Web Docs. "Web Components." [https://developer.mozilla.org/en-US/docs/Web/API/Web_components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
4. Lit. [https://lit.dev/](https://lit.dev/)
