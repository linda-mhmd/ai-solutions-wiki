---
title: "Remotion"
description: "Remotion is a React framework for creating videos programmatically, treating video as code and rendering MP4 files from JSX components using FFmpeg."
date: 2026-03-28
categories: [Glossary]
tags: [remotion, programmatic-video, react, ffmpeg, video-as-code]
related:
  - tools/ffmpeg
  - glossary/programmatic-video
  - glossary/virtual-dom
last_updated: 2026-05-30
---

Remotion is an open-source framework that enables developers to create videos programmatically using React. Rather than editing video in a timeline-based tool, developers write JSX components that render frame by frame, producing MP4 files from code. Remotion was created by Jonny Burger and publicly announced on February 8, 2021, via Twitter and Product Hunt, with the tagline "Create videos programmatically in React."

## Origins and History

Jonny Burger, a developer based in Zurich, Switzerland, announced Remotion on February 8, 2021, sharing a demonstration video that was itself written entirely in React [1]. The GitHub repository (`remotion-dev/remotion`) and documentation site launched simultaneously. The project quickly gained traction on Product Hunt and within the React community, as it addressed a gap that had existed between web development tooling and video production workflows.

Burger's core insight was that React's component model and declarative rendering paradigm could be applied directly to video. A React component already describes what should appear on screen given a set of props and state. By parameterizing that state with a frame number, the same component becomes a video frame. This "video as code" concept meant that videos could be version-controlled, parameterized, tested, and generated at scale using familiar software engineering practices.

## How It Works

A Remotion video is a React application. The developer defines a `Composition` with metadata including width, height, frame rate, and duration in frames. Within the composition, components use the `useCurrentFrame()` hook to access the current frame number, enabling time-based animations through standard JavaScript logic and CSS transforms.

The rendering pipeline operates in three stages. First, Remotion bundles the React application using webpack. Second, it opens a headless Chromium browser and captures each frame as a screenshot by rendering the React tree at each frame number sequentially. Third, it stitches the captured frames into a video file using FFmpeg, the universal multimedia encoding library. Audio tracks, transitions, and overlays are composed declaratively within the React component tree.

Because each frame is an independent React render, developers can use any React-compatible library, import web fonts, fetch data, render SVGs, or compose HTML and CSS exactly as they would in a web application. This makes Remotion particularly powerful for data-driven video generation, where templates are filled with dynamic content such as analytics dashboards, personalized marketing videos, or automated social media content.

## Remotion Lambda and Scaling

Remotion Lambda, introduced subsequently, distributes the rendering workload across AWS Lambda functions. Each Lambda invocation renders a chunk of frames in parallel, and the chunks are concatenated into the final output. This enables rendering a minutes-long video in seconds rather than minutes, making Remotion viable for on-demand video generation at production scale.

## Ecosystem and Licensing

Remotion is source-available under the Remotion License. Individual use and companies with fewer than a defined revenue threshold can use it for free, while larger companies require a paid license. The project has accumulated over 21,000 GitHub stars and spawned an ecosystem of templates, components, and integrations. Several startups and products have been built on top of Remotion for automated video production workflows.

## Sources

1. Burger, J. (2021). "Announcing Remotion - a framework for making videos in React!" Twitter, February 8, 2021. [https://x.com/JNYBGR/status/1358824089960542208](https://x.com/JNYBGR/status/1358824089960542208)
2. Remotion GitHub Repository. [https://github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion)
3. Remotion Documentation. [https://www.remotion.dev/docs](https://www.remotion.dev/docs)
4. Remotion on Product Hunt. [https://www.producthunt.com/products/remotion](https://www.producthunt.com/products/remotion)
