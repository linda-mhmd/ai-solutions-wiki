---
title: "What is React Native?"
description: "React Native lets you write one JavaScript codebase that runs as a real native app on both iOS and Android. Not a website in a wrapper: actual native components."
date: 2026-05-28
level: 2
categories: [Basics]
tags: [beginner, mobile, react-native, ios, android, javascript, typescript, cross-platform]
faqs:
  - question: "Is React Native the same as React?"
    answer: "React and React Native share the same programming model, components, hooks, state management, but they are separate frameworks. React targets web browsers and produces HTML elements (div, span, button). React Native targets mobile operating systems and produces native UI components (View, Text, Pressable). You can use your React knowledge in React Native, but the component names and many APIs are different. Most React developers find the transition to React Native learnable in a few days."
  - question: "Does React Native produce a real app or a web app?"
    answer: "A real app that you download from the App Store or Google Play Store. React Native does not produce a website wrapped in a browser (that approach is called a WebView or hybrid app, used by older tools like Cordova/PhoneGap). React Native renders the platform's own native UI components. On iOS a React Native button is an actual UIButton. On Android it is an actual MaterialButton. This is why React Native apps look and behave like native apps, because at the UI layer they are."
  - question: "What is the difference between React Native and Flutter?"
    answer: "Both let you ship to iOS and Android from one codebase. The key differences: React Native uses JavaScript/TypeScript and renders real native platform components. Flutter uses Dart (Google's language) and draws its own pixels on a canvas (meaning Flutter apps look identical on both platforms, not adapting to each platform's native style unless you add that explicitly). React Native has the larger ecosystem and easier onramp for developers who already know JavaScript. Flutter has better performance for graphics-intensive apps and more consistent cross-platform UI."
  - question: "Can I share code between a React Native app and a React web app?"
    answer: "Yes, selectively. Business logic, API calls, state management, and data transformation code can all be shared. UI components cannot be shared directly (web uses div/button/input, React Native uses View/Text/Pressable). Libraries like React Native Web allow some component sharing, and monorepo setups (Expo + Next.js in one repository) are common for teams that want to maximise sharing. Expect to share roughly 50-80% of logic and 0-30% of UI depending on how much you invest in the shared component layer."
prerequisites:
  - basics/what-is-code
  - basics/what-is-an-api
  - basics/what-is-the-cloud
related:
  - tools/expo
  - tools/zustand
  - tools/async-storage
  - basics/what-is-vibe-coding
---

{{< quickanswer >}}
React Native is a framework that lets you write one JavaScript or TypeScript codebase and ship it as a genuine native app on both iOS and Android. You write your app once, and it produces the same kind of app you would get from a dedicated Swift team and a dedicated Kotlin team, from a single shared codebase.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/wardrobe/capsule-paradigm-microservices.png" alt="Left: a single dark jumpsuit hanging alone: one cohesive piece. Right: four separate garments laid flat: each independent and swappable. Monolith vs capsule wardrobe." loading="lazy">
  <figcaption>One codebase, two platforms. React Native is the capsule wardrobe of mobile development: one shared foundation, dressed appropriately for each platform.</figcaption>
</figure>

## The problem: two platforms, two languages

Every smartphone runs one of two operating systems: Apple's iOS or Google's Android. These platforms are entirely separate, built by competing companies, and they use different programming languages.

- iOS is written in **Swift** (or older Objective-C). Native iOS apps are built in Xcode on a Mac.
- Android is written in **Kotlin** (or older Java). Native Android apps are built in Android Studio.

For a company that wants an app on both platforms, the traditional approach means:

- Two separate teams (or one team switching between two languages)
- Two codebases to maintain for every feature and bug fix
- Two different release processes, two sets of platform quirks to learn

This doubles the cost of mobile development. For a startup or a small engineering team, native apps on both platforms was often simply not feasible.

## React Native's solution

React Native (released by Meta/Facebook in 2015) lets you write your app once in JavaScript or TypeScript, the same language used for web development, and deploy it to both platforms.

The pitch: **one codebase, two real native apps.**

Not one app that runs in a web browser embedded in a shell (that older approach, called a hybrid or WebView app, always felt slow and slightly wrong). React Native renders actual native UI components on each platform.

## How it actually works

This is where people often get confused, so it is worth being precise.

### What "native" means

A native app uses the UI building blocks that the operating system provides. On iOS, these are UIKit components: `UILabel` (text), `UIButton` (buttons), `UIScrollView` (scrollable lists). On Android, they are Material components: `TextView`, `Button`, `RecyclerView`.

When these components are used, they look exactly right on the platform, because they are the platform's own components. The system animations, the scrolling physics, the font rendering, the accessibility layer, all of it is the real thing.

A web-in-a-shell approach (WebView) renders HTML and CSS inside a browser widget embedded in the app. It can look almost native, but the scrolling feels different, text rendering is subtly wrong, and performance suffers for complex interactions.

### The bridge (old architecture)

In the original React Native design, your JavaScript code and the native platform ran in separate threads. To get a message from one to the other, say, "create a button at position X with this label", React Native used an asynchronous **bridge**: a message queue between JavaScript and native code, serialised as JSON.

This worked well for most apps but introduced latency for interactions that required very fast back-and-forth between JavaScript and native (gesture-driven animations, for example).

### The new architecture: JSI and Fabric

Since 2022, React Native has been migrating to a new architecture that eliminates the bridge:

- **JSI (JavaScript Interface)**: a C++ layer that lets JavaScript call native functions directly, synchronously, without serialisation. No message queue, no JSON overhead.
- **Fabric**: a reimplemented rendering layer that can synchronously compute layouts and respond to gestures without crossing a thread boundary.

The practical result: the new architecture closes roughly 90% of the performance gap between React Native and fully native apps. Since Expo SDK 53 (2025), the new architecture is enabled by default for new projects.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your Code</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">TypeScript / JavaScript</span>
      <span class="bz-arch-chip">React components</span>
      <span class="bz-arch-chip">Business logic</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">React Native Runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hermes JS Engine</span>
      <span class="bz-arch-chip">JSI (direct native calls)</span>
      <span class="bz-arch-chip">Fabric Renderer</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Platform Native Layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">iOS: UIKit / Swift</span>
      <span class="bz-arch-chip">Android: Jetpack / Kotlin</span>
    </div>
  </div>
</div>

## The React component model

If you have used React for web, React Native will feel familiar. You build UIs by composing components, functions that describe what should appear on screen.

The difference is the component names. On the web you write `<div>`, `<p>`, `<button>`. In React Native:

| Web (React) | React Native | What it is |
|---|---|---|
| `<div>` | `<View>` | A container / layout box |
| `<p>`, `<span>` | `<Text>` | Any visible text (must use this) |
| `<button>` | `<Pressable>` | Tappable element |
| `<img>` | `<Image>` | Image display |
| `<ul>` with items | `<FlatList>` | Scrollable list (virtualised) |
| `<input>` | `<TextInput>` | Text entry field |

Every piece of visible text in React Native must be wrapped in a `<Text>` component. Putting raw text outside a `<Text>` is a runtime error. (This feels strict at first; you get used to it.)

A simple screen component:

```tsx
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello, world</Text>
      <Pressable style={styles.button} onPress={() => console.log("tapped")}>
        <Text style={styles.buttonText}>Tap me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  button: { backgroundColor: "#0070f3", padding: 12, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "600" },
});
```

Layout uses **flexbox**, the same model as CSS but with different defaults. `flex: 1` means "take up all available space". `flexDirection` defaults to `column` (unlike the web, which defaults to `row`).

## Performance: how close to native?

React Native gets asked about performance constantly. The honest answer in 2026:

- For the vast majority of apps, content feeds, forms, e-commerce, dashboards, chat, React Native performance is indistinguishable from native to users.
- The new architecture (JSI + Fabric) eliminated the serialisation overhead that caused visible lag in the old bridge model.
- For graphics-intensive apps, games, video editing, AR filters, complex data visualisations at 120fps, native Swift or Kotlin (or Flutter, which has its own renderer) may be preferable.

The 90% benchmark: React Native covers 90% of apps without noticeable trade-offs. The remaining 10% needs native code.

## When to use what

| Situation | Recommended approach |
|---|---|
| New app, team knows JavaScript/TypeScript | **React Native (via Expo)** |
| App requires heavy graphics, AR, or game-like UI | **Native (Swift + Kotlin)** or Flutter |
| Team is fluent in Dart, app needs pixel-perfect cross-platform UI | **Flutter** |
| App is mostly informational, can run in a browser | **Progressive Web App (PWA)** |
| Existing native codebase, adding JS screens gradually | **React Native** (brownfield integration) |
| Maximum iOS performance, Apple-specific features (ARKit, CoreML on-device) | **Native Swift** |

## React Native vs Flutter: a fair comparison

| | React Native | Flutter |
|---|---|---|
| **Language** | JavaScript / TypeScript | Dart |
| **Rendering** | Platform's own native components | Flutter draws its own pixels (Skia/Impeller) |
| **Cross-platform consistency** | UI adapts to each platform's style | Identical UI on both platforms (by default) |
| **Ecosystem** | Very large (npm, React community) | Growing fast (pub.dev) |
| **Performance** | Excellent for most apps | Excellent, especially for animations |
| **Learning curve** | Low if you know JavaScript | Moderate (Dart is new for most) |
| **Backing** | Meta (open-source) | Google (open-source) |

Neither is objectively better. If your team already knows JavaScript, React Native's onramp is faster. If you need pixel-perfect cross-platform consistency and smooth animations on first launch, Flutter is worth the Dart investment.

## How to get started

The standard starting point is **Expo**, which wraps React Native in a cohesive toolkit with a managed build service and a curated SDK. You do not need Xcode or Android Studio to run your first app, Expo Go (a free app on your phone) runs it instantly during development.

```bash
# Create a new app
npx create-expo-app@latest my-app

# Start the development server
cd my-app
npx expo start

# Scan the QR code with Expo Go on your phone
```

See the [Expo tool article](/tools/expo/) for the full build pipeline, SDK modules, and how OTA updates work.

{{< seealso >}}
- [Expo](/tools/expo/): the toolkit that makes React Native practical. Managed builds, OTA updates, a curated SDK, file-based routing.
- [Zustand](/tools/zustand/): the state management library recommended for React Native. Minimal, TypeScript-native, works with AsyncStorage out of the box.
- [AsyncStorage](/tools/async-storage/): on-device key-value storage. Persists Zustand state across app restarts.
- [From Zero to Production](/guides/from-zero-to-production/): how React Native fits into a complete production architecture, from demo to deployed app.
{{< /seealso >}}

## Further reading

- [React Native documentation](https://reactnative.dev/docs/getting-started): the official docs, comprehensive
- [Expo documentation](https://docs.expo.dev/): the recommended starting framework
- [React Native New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page): how JSI and Fabric work
- [State of React Native 2024](https://results.stateofreactnative.com/): community survey on usage and satisfaction
- [Flutter vs React Native (2025)](https://www.jetbrains.com/lp/devecosystem-2024/): JetBrains developer survey data

## What's next

Next: [Expo, the React Native framework that handles the hard parts](/tools/expo/), covering the build pipeline, SDK modules, and how to get an app to the App Store without owning a Mac.
