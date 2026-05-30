---
title: "React Router"
description: "The standard client-side routing library for React, created by Ryan Florence and Michael Jackson in 2014, which evolved from Ember-inspired routing to declarative component-based navigation."
date: 2026-03-28
categories: [Glossary]
tags: [React-Router, React, routing, SPA, client-side-navigation, Ryan-Florence, Michael-Jackson]
related:
  - glossary/react
  - glossary/remix
  - glossary/single-page-application
  - glossary/nextjs
last_updated: 2026-05-30
---

React Router is the standard routing library for React applications, providing declarative, component-based navigation for single-page applications. Created by Ryan Florence and Michael Jackson in 2014, it has been through several major architectural shifts that mirror the React community's evolving understanding of how routing should work in component-driven applications.

## Origins and History

When React was open-sourced in May 2013, it provided no built-in routing solution. Developers building single-page applications needed to handle URL changes, history management, and view switching themselves. By early 2014, several community routing solutions had emerged, but none had established dominance.

Ryan Florence and Michael Jackson began building React Router in May 2014 [1]. At the time, Florence worked at Instructure and Jackson was an engineer at Twitter. Their initial approach was heavily influenced by Ember.js's router, which was widely considered the best routing implementation in any JavaScript framework. They ported Ember's route-matching and transition model to React's component model.

The React team recognized the project's significance early. A React Community Roundup post on August 3, 2014, highlighted React Router as "a very good example of both communities working together to make the web better" [2]. The first npm release arrived in 2014, with version 1.0 shipping on November 9, 2015, introducing core features like path matching and dynamic component rendering based on URL changes.

## Architectural Evolution

React Router's version history reflects three distinct philosophical eras, as Florence himself has described [3].

**V1-V3: "Ember Router for React" (2014-2016).** Routes were defined in a centralized configuration object, with lifecycle hooks like `onEnter` and `onLeave` controlling transitions. This model was familiar to developers coming from Ember or server-side frameworks but did not fully embrace React's component paradigm.

**V4-V5: "Declarative Routing" (2017-2021).** Version 4 was a complete rewrite that treated routes as regular React components. Instead of a static route configuration, routes were rendered inline within the component tree using `<Route>` and `<Switch>` components. This was controversial --- it broke backward compatibility --- but it aligned routing with React's declarative philosophy. Routes could be rendered anywhere, conditionally, and composed like any other component.

**V6-V7: "Data Routing" (2022-present).** Version 6 introduced a modernized API with smaller bundle size, better TypeScript support, and improved nested route handling. Version 6.4 (September 2022) added data APIs --- loaders and actions --- borrowed directly from Remix. Version 7 (late 2024) fully absorbed Remix's server runtime, offering a "framework mode" with server-side rendering, file-based routing, and the complete Remix feature set.

## Core Concepts

**Declarative route definition.** Routes are defined as React elements (JSX), not configuration objects. This means routes participate in the component lifecycle, can be conditionally rendered, and compose with other React patterns.

**Nested routes and outlets.** Child routes render inside parent layouts via the `<Outlet>` component. This enables persistent navigation shells, shared layouts, and independent loading states for each route segment.

**Dynamic segments and parameters.** Route paths support dynamic segments (`/users/:id`) that are parsed and made available to components. This maps URL structure to data requirements cleanly.

**History abstraction.** React Router abstracts browser history (pushState), hash-based routing, and in-memory routing behind a consistent API, enabling the same routing logic to work in browsers, server-side rendering, and testing environments.

## Sources

1. Florence, R. and Jackson, M. (2014). React Router initial development. https://github.com/remix-run/react-router
2. React Blog. (2014). "Community Round-up #21." August 3, 2014. https://legacy.reactjs.org/blog/2014/08/03/community-roundup-21.html
3. Florence, R. (2025). React Router version history thread. https://x.com/ryanflorence/status/1895546111961809316
4. React Router Documentation. https://reactrouter.com/
