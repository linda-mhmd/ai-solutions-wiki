---
title: "Designing Across iOS, Android, and Web - One Design Language, Three Platforms"
description: "Learn the consistency-first process: ship one design language across iOS, Android, and web, then adapt each platform to feel native."
date: 2026-06-22
categories: [Guides]
tags: ["design", "cross-platform", "react-native", "design-system", "ios", "android", "web"]
tools: []
related: ["guides/mobile-navigation-patterns", "guides/platform-native-ux-patterns", "guides/from-mockup-to-prototype", "tools/expo", "basics/what-is-react-native"]
last_updated: 2026-06-22
---

Most teams build the same screen three times: once for iPhone, once for Android, once for the browser. That triples the work and the bugs. This guide shows you a cheaper path: design one language, build it once, ship a consistent v1, then add native polish only where it pays off.

<figure class="bz-figure">
  <img src="/img/wardrobe/capsule-paradigm-microservices.png" alt="A capsule wardrobe of a few coordinated garments that combine many ways. No em-dashes." loading="lazy">
  <figcaption>A capsule wardrobe is a few coordinated pieces that mix into many outfits: one design system serves iOS, Android, and web the same way.</figcaption>
</figure>

## The core idea: design once, adapt later

A "design language" is your fixed set of colors, typography, spacing, and components. When you keep that language identical across platforms, your app looks like one product everywhere. Users learn it once. You maintain it once.

The temptation is to chase native perfection from day one: iOS feels one way, Android another, web a third. That path is expensive, slow, and easy to get wrong before you know what users actually need.

Instead, follow a "design ladder". Start unified. Climb to platform-native polish later, and only where it earns its cost.

<div class="bz-flow"><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">One mockup</span><span class="bz-flow-step-desc">Design a single screen in one design language for all three platforms.</span></div><div class="bz-flow-arrow">→</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Build once</span><span class="bz-flow-step-desc">Use React Native with Expo so all three platforms share design and code.</span></div><div class="bz-flow-arrow">→</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Ship v1</span><span class="bz-flow-step-desc">Release a consistent first version. Watch how real users behave.</span></div><div class="bz-flow-arrow">→</div><div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Adapt natively</span><span class="bz-flow-step-desc">Add iOS, Android, and web specifics where they measurably help.</span></div></div>

## Step 1: Start with one mockup

Open Figma and design a single screen. Pick one set of colors, one type scale, one spacing rhythm, and one set of components. Do not make iOS, Android, and web versions yet. Make one version that you would accept on all three.

This forces a clear decision: what is the product, before what is the platform? A consistency-first mockup is faster to draw, faster to review, and faster to change. You ship a v1 with one source of truth instead of three drifting designs.

For the design-first workflow that turns this mockup into a clickable prototype, follow [the mockup-to-prototype guide](/guides/from-mockup-to-prototype/). For layout decisions inside the screen, use [the white-space and visual hierarchy guide](/guides/white-space-and-visual-hierarchy/).

### Why consistency-first is cheaper for a v1

- **One review loop**: Stakeholders approve one design, not three.
- **One bug surface**: A spacing fix lands everywhere at once.
- **One mental model**: Your team and your users learn a single system.
- **Faster learning**: You reach real users sooner, so you learn what to improve.

You can always add native detail later. You cannot get back the weeks spent perfecting three versions of a screen nobody validated.

## Step 2: Build it once with React Native and Expo

React Native is a framework that lets you write one codebase that runs as a real iOS app, a real Android app, and a web app. Expo is a toolkit on top of React Native that handles building, testing, and shipping so you do not configure native projects by hand.

Together they let your three platforms share both the design AND the code. One component definition renders on all three. Read [what React Native is](/basics/what-is-react-native/) and [the Expo overview](/tools/expo/) for the fundamentals.

Here is how the layers stack up when you build this way.

<div class="bz-arch"><div class="bz-arch-layer"><span class="bz-arch-layer-label">Design language</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Colors</span><span class="bz-arch-chip">Type scale</span><span class="bz-arch-chip">Spacing</span><span class="bz-arch-chip-note">one source of truth in Figma</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Components</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Button</span><span class="bz-arch-chip">Card</span><span class="bz-arch-chip">Input</span><span class="bz-arch-chip-note">written once in React Native</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Platform layer</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">Platform.select()</span><span class="bz-arch-chip-note">small per-platform overrides only</span></div></div><div class="bz-arch-layer"><span class="bz-arch-layer-label">Targets</span><div class="bz-arch-layer-content"><span class="bz-arch-chip">iOS</span><span class="bz-arch-chip">Android</span><span class="bz-arch-chip">Web</span><span class="bz-arch-chip-note">one codebase, three outputs</span></div></div></div>

### One component that adapts per platform

When you do need a small difference, React Native gives you `Platform.select()`. It picks a value based on the device the code runs on. The component stays shared. Only the chosen value changes.

The example below is one button. The design (color, padding, label) stays identical. Only the shadow style differs, because iOS and Android render shadows differently and web uses a CSS box shadow.

```tsx
import { Platform, Pressable, Text, StyleSheet } from 'react-native';

export function PrimaryButton({ label, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e0314b',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    // Shared design stays the same. Only the shadow adapts per platform.
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      },
    }),
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
```

Notice what stays shared: the brand red, the padding, the radius, the label. The platform difference is a few lines, contained in one place. That is the whole pattern. See the [React Native platform-specific code docs](https://reactnative.dev/docs/platform-specific-code) for the full API.

## Step 3: Ship a consistent v1

Release the unified version to all three platforms at once. Resist the urge to polish per platform before launch. Your goal is to put a coherent product in front of real users quickly.

A consistent v1 still feels professional. Users do not reject an app because its shadow matches across platforms. They reject it because it is slow, confusing, or unfinished. Consistency buys you focus on the things that actually matter for a first release.

## Step 4: Climb the design ladder to native polish

Once real usage tells you where friction lives, adapt. This is the top of the ladder: deliberate, measured, platform-native detail.

Native adaptation means matching each platform's conventions. iOS follows the [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines). Android follows [Material Design 3](https://m3.material.io). Web follows browser and pointer conventions. Each has its own navigation, gestures, and controls.

Do not try to learn all three at once here. The deep, platform-by-platform specifics live in [the platform-native UX patterns guide](/guides/platform-native-ux-patterns/). For choosing menus and navigation structure per platform, use [the mobile navigation patterns guide](/guides/mobile-navigation-patterns/).

### What to adapt first

- **Navigation**: A bottom tab bar on iOS, a navigation drawer or bottom bar on Android, a top nav on wide web.
- **Back behavior**: Android has a hardware or gesture back. iOS uses a back button. Web uses browser history.
- **Controls**: Date pickers, switches, and menus that match each platform's native widget.
- **Typography defaults**: The system font on each platform if you choose to use it.

Adapt one thing at a time. Measure whether it helps. Keep the shared design language as your baseline so the product never fragments.

## Unified vs platform-native: when to invest

Use this table to decide where you are on the ladder.

| | Unified design | Platform-native adaptation |
|---|---|---|
| **Stage** | v1 and early growth | After real usage data |
| **Cost** | Low, one build | Higher, per-platform work |
| **Best for** | Brand consistency, speed | Friction points, retention |
| **Risk if skipped** | Looks slightly generic | Feels foreign on a platform |
| **Effort** | One screen, three outputs | One platform at a time |
| **Invest when** | Always, as your baseline | A platform metric demands it |

The rule is simple. Unified is your default. Native polish is an upgrade you buy with evidence, not a starting requirement.

## A quick checklist

- Design one mockup in one design language for all three platforms.
- Build it once with React Native and Expo so design and code are shared.
- Keep platform differences small and contained with `Platform.select()`.
- Ship a consistent v1 and watch real users.
- Climb to native polish only where data shows it helps.

Follow this ladder and you spend your effort where it counts: a coherent product first, native refinement second.

## Further reading

- [React Native platform-specific code](https://reactnative.dev/docs/platform-specific-code): the official API for adapting components per platform.
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines): Apple's official design conventions for iOS.
- [Material Design 3](https://m3.material.io): Google's official design system for Android.
- [Expo documentation](https://docs.expo.dev): the official toolkit for building and shipping React Native apps.
- [What is React Native?](/basics/what-is-react-native/): the framework that runs one codebase on iOS, Android, and web.
- [Platform-native UX patterns](/guides/platform-native-ux-patterns/): the deep, platform-by-platform polish for the top of the ladder.
- [Mobile navigation patterns](/guides/mobile-navigation-patterns/): how to choose menus and navigation per platform.
- [From mockup to prototype](/guides/from-mockup-to-prototype/): the design-first workflow that produces your single mockup.
