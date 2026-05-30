---
title: "Emotion and CSS-in-JS"
description: "The CSS-in-JS paradigm introduced by Christopher Chedeau (Vjeux) in 2014 and the Emotion library created by Kye Hohenberger in 2017 that became one of its most performant implementations."
date: 2026-03-28
categories: [Glossary]
tags: [CSS-in-JS, Emotion, styling, React, JavaScript, Vjeux, Christopher-Chedeau, frontend]
related:
  - glossary/react
  - glossary/material-ui
  - glossary/single-page-application
last_updated: 2026-05-30
---

CSS-in-JS is a styling paradigm that writes CSS directly in JavaScript, co-locating styles with components and leveraging JavaScript's scoping and composition capabilities to solve long-standing CSS scalability problems. The concept was introduced by Christopher Chedeau (Vjeux) in 2014, and Emotion, created by Kye Hohenberger in 2017, became one of the highest-performance implementations of the pattern.

## Origins and History

The CSS-in-JS movement began with a single conference talk. In November 2014, Christopher Chedeau, a Facebook engineer known as Vjeux, presented "React: CSS in JS" at NationJS [1]. The talk systematically identified seven problems with CSS at scale: global namespace collisions, dependency management, dead code elimination, minification, sharing constants between styles and logic, non-deterministic resolution order, and isolation failures.

Chedeau's proposed solution was radical: write styles as JavaScript objects and let the framework handle generating and injecting the CSS. He later revealed the strategic context for the talk: "As we were going to announce React Native, I was dead scared that the announcement would follow the same as React where everyone talked about JSX and not React itself. So I spoke at a small conference --- NationJS --- about writing CSS in JS. I knew it was going to be controversial but I had absolutely no idea that it would generate an entire movement" [2].

The talk launched an ecosystem. Libraries including Radium (2014), JSS by Oleg Isonen (2014), Aphrodite by Khan Academy (2015), styled-components by Max Stoiber and Glen Maddern (2016), and Emotion by Kye Hohenberger (2017) each explored different approaches to the CSS-in-JS concept.

## Emotion

Kye Hohenberger introduced Emotion in a Medium blog post on July 10, 2017 [3]. The core principle was explicit: "You shouldn't have to sacrifice runtime performance for good developer experience when writing CSS." Emotion's initial implementation used Babel and PostCSS to parse styles at compile time, reducing runtime work to raw `insertRule` calls. The core runtime was 2.3 KB, with React support adding only 1.7 KB.

Emotion took inspiration from Sunil Pai's glam library for its core architecture, from styled-components for its tagged template literal API, and from CSS Modules for its scoping model. It offered two APIs: a framework-agnostic `css` function for generating class names, and a React-specific `styled` API for creating styled components.

What differentiated Emotion was its emphasis on compile-time optimization. By pre-processing styles during the build step, Emotion avoided the runtime parsing overhead that affected earlier CSS-in-JS libraries. Subsequent versions removed the Babel plugin requirement while maintaining performance, making adoption simpler.

## Key Concepts

**Scoped styles.** CSS-in-JS libraries generate unique class names automatically, eliminating global namespace collisions. Styles are scoped to the component that defines them.

**Dynamic styling.** Styles can reference JavaScript variables, props, and state, enabling truly dynamic theming and responsive style logic without CSS custom properties or preprocessor workarounds.

**Dead code elimination.** Because styles are co-located with components, unused styles are removed when unused components are tree-shaken from the bundle. With traditional CSS, identifying and removing unused rules is unreliable.

**Critical CSS extraction.** Libraries like Emotion can extract only the CSS needed for the server-rendered HTML, sending minimal CSS on initial page load.

## The Pendulum Swings

By 2023, the CSS-in-JS landscape shifted. The React team's introduction of Server Components created tension with runtime CSS-in-JS libraries that depend on client-side JavaScript to inject styles. Zero-runtime alternatives like Tailwind CSS, CSS Modules, and compile-time CSS-in-JS tools (Vanilla Extract, Panda CSS) gained adoption. Emotion and styled-components remain widely used in client-rendered applications, but the ecosystem trend moved toward build-time style extraction.

## Sources

1. Chedeau, C. (2014). "React: CSS in JS." NationJS, November 2014. Slides: https://speakerdeck.com/vjeux/react-css-in-js
2. Chedeau, C. (2014). Blog post accompanying the NationJS talk. https://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html
3. Hohenberger, K. (2017). "emotion. The Next Generation of CSS-in-JS." Medium, July 10, 2017. https://medium.com/@tkh44/emotion-ad1c45c6d28b
4. Emotion Documentation. https://emotion.sh/docs/introduction
