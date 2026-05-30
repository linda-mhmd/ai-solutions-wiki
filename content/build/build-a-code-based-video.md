---
title: "Build a Code-Based Video: Programmatic Video Production with Remotion"
description: "A step-by-step guide to creating professional demo and explainer videos entirely in code using Remotion, React, and AI-assisted development. Treat video like software - version-controlled, reproducible, and data-driven."
date: 2026-03-31
categories: ["Build"]
tags: ["software-engineering", "intermediate", "remotion", "video-production", "react", "everything-as-code", "ai-assisted-development", "media-processing"]
related:
  - guides/everything-as-code
  - software-engineering/version-control-fundamentals
  - software-engineering/gitignore-patterns
last_updated: 2026-05-30
---

Video is one of the most persuasive media formats for communicating a software system's value. A two-minute demo can convey what a thirty-page technical document cannot. Yet most engineering teams treat video production as a creative task, something handed off to a designer with a subscription to Premiere Pro, disconnected from the codebase and the development workflow. This guide argues for a different approach: video as a software artifact, authored in code, stored in version control, and rendered on demand like any other build output.

## Why Video as Code

The "everything as code" principle holds that any artifact worth maintaining should be defined in a format that a version control system can track, a diff tool can compare, and an automation pipeline can reproduce. Source code, infrastructure, database migrations, deployment configuration - these are all managed this way. Video, by contrast, is typically managed as binary files in cloud storage, edited in proprietary tools that produce no human-readable diff, and reproduced only by re-running a manual creative process.

The programmatic video approach closes this gap. A Remotion project is a TypeScript codebase. Its scenes are React components. Its timing is expressed in integers. A reviewer can look at a pull request and understand exactly which frames changed, which text was updated, and whether a transition was lengthened or shortened. The same composition can be rendered to multiple output formats from a single command. Variants for different platforms, different durations, or different data sets become parameters rather than separate projects.

This approach makes most sense for a specific category of content: product demos, data visualization videos, explainer animations, social media variants, and automated reporting. It makes less sense for cinematic content that depends on physical camera work, heavy visual effects requiring frame-by-frame manual refinement, or content where the creative output is inherently non-deterministic. If you are demonstrating a software pipeline, visualizing metrics, or producing a series of videos that share a common structure, programmatic video pays dividends quickly.

Traditional tools like Adobe Premiere and DaVinci Resolve are excellent for their intended use cases. They are not version-controllable, not scriptable at the frame level without significant extensions, and not reproducible without the original project files and the same software version. Remotion and similar frameworks (Motion Canvas is another option, closer to imperative animation) treat every frame as a pure function of time and input data.

## The Stack

**Remotion** is the central tool. It is a React-based framework in which each frame of your video is the output of rendering a React component tree at a specific point in time. The library exposes two hooks that drive all animation: `useCurrentFrame()` returns the current frame number as an integer, and `useVideoConfig()` returns the composition's dimensions, frames per second, and total duration. Every animation in a Remotion project is ultimately derived from these two values.

The two most important utility functions are `interpolate()` and `spring()`.

`interpolate(value, inputRange, outputRange)` maps a value from one numeric range to another, with optional clamping and easing. You use it to say things like "between frame 0 and frame 30, opacity goes from 0 to 1." It is the workhorse of frame-based animation.

`spring({ frame, fps, config })` produces a physics-based value that starts at 0, overshoots slightly, and settles at 1, mimicking the behaviour of a damped spring. The `config` object accepts `mass`, `damping`, and `stiffness`. For UI motion that should feel natural rather than mechanical, spring animations are almost always the right choice.

**TypeScript** provides the type safety that makes a large Remotion project maintainable. Scene components can declare their prop types explicitly, compositions can be parameterised with typed input data, and the compiler catches timing arithmetic errors before render time.

**Design tokens** defined as TypeScript constants give your video a coherent visual language. A file like `designTokens.ts` that exports your color palette, font families, font sizes, and spacing scale means that changing your brand color is a one-line edit, not a search through dozens of style objects.

**ElevenLabs** and similar text-to-speech APIs handle AI-generated voiceover when narration is needed. The workflow is: write your script as a plain text file, generate audio via the API, commit the audio file to `public/`, and import it with Remotion's `<Audio>` component. Because the script is a text file, it is version-controlled and diffable.

The AI coding assistant's role throughout development is that of a pair programmer who knows the Remotion API well. You describe the visual effect you want in plain language, review the generated component, adjust timing values in the Remotion preview server (which runs at `localhost:3000` and hot-reloads on every save), and iterate. Scene components, animation sequences, and timing calculations are all tasks where AI assistance significantly reduces iteration time.

## Project Setup

Initialize a new project with the official scaffolding tool:

```bash
npx create-video@latest
```

This creates a project with `src/` for your compositions and components, `public/` for static assets (audio files, video clips, images), and `out/` for render output. The `out/` directory should be in your `.gitignore` alongside `node_modules/` and platform-specific files like `.DS_Store`. Rendered video files are build artifacts, not source, and they can be several gigabytes. See the version control article for `.gitignore` best practices.

Define your design tokens immediately, before writing any scenes:

```typescript
// src/designTokens.ts
export const colors = {
  background: "#0f1724",
  surface: "#1a2540",
  accent: "#00d4ff",
  accentGreen: "#00ff88",
  text: "#ffffff",
  textMuted: "#8899aa",
};

export const fonts = {
  display: "'Fira Sans', sans-serif",
  body: "'Open Sans', sans-serif",
};

export const spacing = {
  sm: 16,
  md: 32,
  lg: 64,
};
```

Register your compositions in `src/Root.tsx`. Each `<Composition>` entry defines a video variant with its own id, dimensions, frame rate, duration, and default input props:

```tsx
// src/Root.tsx
import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";

export const RemotionRoot = () => (
  <>
    <Composition
      id="MainVideo-16x9"
      component={MainVideo}
      durationInFrames={4450}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ variant: "landscape" }}
    />
    <Composition
      id="MainVideo-9x16"
      component={MainVideo}
      durationInFrames={4450}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ variant: "portrait" }}
    />
  </>
);
```

## Planning Your Video as a Software Architect Would

Before writing a single component, plan your video the way you would plan a system architecture. Define your scenes as a typed data structure:

```typescript
interface SceneDef {
  id: string;
  startFrame: number;
  durationFrames: number;
  component: React.ComponentType<SceneProps>;
}

const scenes: SceneDef[] = [
  { id: "opening", startFrame: 0, durationFrames: 300, component: OpeningScene },
  { id: "analysis", startFrame: 300, durationFrames: 240, component: AnalysisScene },
  // ...
];
```

This array is the canonical timeline. Changing the duration of a scene means updating one integer in one place - all downstream `startFrame` values can be derived. If you hardcode frame offsets inside components, you will spend hours hunting for the scene that starts at frame 1890 when a duration change shifts everything.

Each scene component is the video equivalent of a microservice: it owns a bounded slice of time, has a defined interface (props), and has no dependencies on other scenes' internal state. The parent composition's job is orchestration using `<Sequence>` blocks:

```tsx
// src/compositions/MainVideo.tsx
import { Sequence } from "remotion";

export const MainVideo = () => (
  <>
    {scenes.map((scene) => (
      <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationFrames}>
        <scene.component />
      </Sequence>
    ))}
  </>
);
```

`<Sequence from={N}>` resets `useCurrentFrame()` to 0 at frame N from the perspective of any component inside it. This is the key Remotion abstraction that lets scene components be completely time-agnostic - they always animate from frame 0 to their own duration.

## Building Scene Components

A minimal scene component looks like this:

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { colors, fonts } from "../designTokens";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: colors.background }}>
      <h1 style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: fonts.display,
        color: colors.text,
      }}>
        Your Title Here
      </h1>
    </div>
  );
};
```

**Staggered reveals** work by adding a per-item frame offset to a list animation. If you have an array of five cards and want each to appear 8 frames after the previous one:

```tsx
{items.map((item, i) => {
  const itemFrame = Math.max(0, frame - i * 8);
  const scale = spring({ frame: itemFrame, fps, config: { damping: 200 } });
  return <Card key={item.id} style={{ transform: `scale(${scale})` }} {...item} />;
})}
```

**Counter animations** count a numeric value from a start to an end over a given number of frames, useful for displaying statistics or metrics. `Math.round(interpolate(frame, [0, duration], [startValue, endValue]))` is the complete implementation.

**Background video integration** uses Remotion's `<Video>` component with the `startFrom` prop to seek to a specific frame of a source clip. The `<Freeze>` component holds a specific frame of a video source as a still, which is useful for creating freeze-frame effects with data overlays.

**Overlay patterns** use absolute positioning layers stacked over a background. A bounding box overlay, for example, is a `<div>` with `position: absolute`, `border: 2px solid accent`, and `width`/`height`/`top`/`left` values that interpolate into position as the overlay "appears" on screen.

## Audio and Voiceover

Add background music with the `<Audio>` component and keep the volume low enough not to compete with visual content:

```tsx
import { Audio } from "remotion";

// Inside your composition
<Audio src={staticFile("music/background.mp3")} volume={0.12} />
```

0.12 (12%) is a reasonable starting point for ambient background music under visually-dense content. You will adjust this based on whether the video has voiceover narration.

For AI voiceover, the workflow is: draft your script as a Markdown file committed alongside the video source, generate audio via an API like ElevenLabs, download the output to `public/audio/`, and reference it with `<Audio src={staticFile("audio/narration.mp3")} />`.

Syncing visuals to audio requires calculating frame offsets from audio timestamps. If a voiceover line starts at 14.3 seconds in a 30fps video, it starts at frame 429. Build a utility function that converts seconds to frames: `const toFrames = (seconds: number, fps: number) => Math.round(seconds * fps)`.

It is worth noting that voiceover is not always necessary. The NetApp Demo Archive video discussed in the case study below is entirely visual, running for 2 minutes and 28 seconds with only background music. When the visual design is clear, the pacing is deliberate, and each scene builds logically on the last, a well-constructed video communicates a complex pipeline without any narration.

## Multi-Format Output

Define multiple compositions in `Root.tsx` for the same underlying content at different aspect ratios. Pass a `variant` prop to your composition and use it to adjust layout: column versus row direction, font sizes, element positioning. The scene components themselves share most of their logic across variants.

Render from the command line:

```bash
npx remotion render MainVideo-16x9 out/main-landscape.mp4
npx remotion render MainVideo-9x16 out/main-portrait.mp4
```

For automated rendering, a GitHub Actions workflow that runs on push to `main` and uploads the rendered output to S3 or a similar store treats the video exactly like a compiled binary: a build artifact produced from source. The workflow looks like any other CI pipeline: checkout, install dependencies, render, upload artifacts.

## The AI-Assisted Development Workflow

Working with an AI coding assistant on a Remotion project follows the same loop as any pair programming session, with some Remotion-specific practices that make it more efficient.

Start by describing the entire scene structure in plain language before writing any code: "I need a scene that shows six rows of cards fading in from the top, each row staggered by 10 frames, over a total duration of 120 frames." The assistant can produce a working component from this description. Then load it in the Remotion preview server (`npx remotion preview`) and evaluate the timing visually.

When timing feels wrong, log frame values and interpolation outputs to the browser console. The preview server runs in a browser with full developer tools available. `console.log({ frame, opacity, scale })` inside a component will show values as you scrub through the timeline.

For debugging, the Remotion Studio timeline view (available at `localhost:3000`) lets you scrub frame by frame and inspect the component tree at any frame. This is equivalent to stepping through code with a debugger - it makes timing arithmetic errors immediately visible.

Treat experiments as branches. When trying two different approaches to a transition, create a branch for each. The diff between branches is readable TypeScript, not a binary project file comparison. Code review of video changes is genuinely useful because a reviewer can evaluate whether the timing logic is correct independent of watching the video.

## Case Study: The NetApp Demo Archive

The NetApp Demo Archive video is a 2 minute and 28 second (148 seconds, 4450 frames at 30fps) demonstration of an AI-powered video archive pipeline built on AWS. It contains ten scenes, each a separate React component orchestrated by a parent composition using `<Sequence>` blocks. No voiceover - the visual narrative is self-sufficient.

**Scene breakdown:**

- **Opening (frames 0-300, 10 seconds):** A 6-by-5 grid of video thumbnail tiles fills the screen. An animated counter races from 0 to 204 (the number of archived demos) using a frame-interpolated `Math.round()` counter. Spring animations bring each tile in with staggered delays. The visual immediately communicates scale.

- **Analysis (frames 300-540, 8 seconds):** AWS service cards for Amazon Rekognition, Amazon Transcribe, and related services appear with staggered spring animations. Each card has an icon, service name, and brief capability description. This scene establishes the technical stack.

- **Video Reveal (frames 540-960, 14 seconds):** A background video clip plays, then freezes using `<Freeze>`. Over the frozen frame, a Rekognition-style overlay appears: bounding boxes around detected faces with emotion bars displayed alongside them. The overlay elements interpolate into position with short spring animations. This is the most technically complex scene because it layers a `<Video>` component, a `<Freeze>` wrapper, and multiple absolutely-positioned overlay divs.

- **Data Storage (frames 750-1230, 16 seconds):** A two-column layout presents the data manifest structure: metadata fields, S3 paths, detection results. This scene communicates the data model without requiring the viewer to read code.

- **Selection (frames 1290-1830, 18 seconds):** An animated filtering sequence shows cards being selected based on criteria, with a green highlight interpolating onto the selected items. This scene demonstrates the search and retrieval capability.

- **Editorial (frames 1890-2430, 18 seconds):** An NLE-style timeline appears, showing clips on tracks with AI agent avatar icons indicating which agent placed each clip. This is a conceptual representation rather than a literal screenshot, designed to communicate automation.

- **Compilation (frames 2490-2820, 11 seconds):** A horizontal pipeline flow diagram shows data moving through processing stages. Each stage node appears with a spring animation, connected by lines that draw from left to right using width interpolation.

- **Outputs (frames 2880-3270, 13 seconds):** Variant cards with real thumbnail images show the output formats: full video, highlight reel, social cut. The cards appear with staggered spring animations.

- **Publish (frames 3330-3780, 15 seconds):** A multi-platform mockup layout shows the outputs placed on YouTube, LinkedIn, and internal portal mockup frames. This contextualises the pipeline's end result.

- **Final (frames 3780-4450, 22 seconds):** A closing hero with the service icon grid and a title lockup. The music fades and the scene holds long enough for the viewer to absorb the complete picture.

**Design decisions:** Fira Sans for display text and Open Sans for body text - a pairing that reads well at the sizes used in video. Dark navy background (`#0f1724`) for all scenes, providing contrast for both bright accent elements and video content. Spring animations with high damping throughout, giving the video a consistent, settled feel rather than the elastic bounciness of low-damping springs.

What makes the video work is the progression from scale to mechanism to output. The opening establishes the scope of the problem (204 videos). The middle scenes explain the processing pipeline. The closing scenes show the results. Each scene advances the narrative, and none of them linger past the point of having communicated their piece.

## What to Build Next

With the Remotion foundation in place, several directions become available. The guides in the Getting Started section cover the AI-assisted development workflow at the project level, which applies directly to building and iterating on video compositions. The architecture patterns article is relevant if your video pipeline needs to be integrated into a larger automated system.

Future topics in this section will cover data-driven video generation (rendering parameterised compositions with external data sources), advanced Remotion patterns (custom hooks for complex animations, shared component libraries across video projects), and automated rendering pipelines (CI/CD integration with GitHub Actions, render farm configuration for long-running compositions).

The core principle carries through all of it: video is software. It can be reviewed, versioned, tested, and deployed. The same discipline that produces reliable software produces reliable video.
