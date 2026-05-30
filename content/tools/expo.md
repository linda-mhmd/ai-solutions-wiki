---
title: "Expo - React Native Development Framework"
description: "Expo is the standard toolkit for building React Native mobile apps. It wraps the raw React Native ecosystem in a cohesive SDK, build pipeline, and developer toolchain that dramatically reduces setup friction."
date: 2026-05-28
categories: [Tools]
tags: [react-native, mobile, ios, android, javascript, typescript, eas, ota-updates, expo-router]
related:
  - basics/what-is-react-native
  - tools/zustand
  - tools/async-storage
  - guides/from-zero-to-production
solutions:
  - guides/from-zero-to-production
last_updated: 2026-05-30
---

Expo is an open-source framework and platform built on top of React Native that makes mobile app development practical for teams who want to ship to iOS and Android without maintaining separate native codebases. Where raw React Native hands you a collection of loosely coupled tools and asks you to wire them together, Expo provides a curated SDK, a managed build service, an over-the-air update system, and a file-based routing library, all integrated and versioned together.

The project is maintained by Expo (the company, formerly 650 Industries) and has become the de facto starting point for new React Native apps. The official React Native documentation recommends Expo as the default way to start a new project.

<figure class="bz-figure">
  <img src="/img/wardrobe/stylists-brief-ai.png" alt="A person at a table with an open sketchbook, describing intent: the stylist's brief. Expo is what lets you focus on describing what you want to build, not on the machinery of building it." loading="lazy">
  <figcaption>Focus on the brief, not the machinery. Expo handles the build infrastructure so you can focus on what the app does rather than how to compile, sign, and distribute it.</figcaption>
</figure>

## The problem with raw React Native

React Native itself is a JavaScript runtime that renders genuine native UI components, not a WebView. But getting a new React Native project from zero to a working binary on a physical device involves:

- Installing Xcode and Android Studio with correct SDK versions
- Configuring signing certificates and provisioning profiles for iOS
- Managing Android keystore files
- Manually linking native modules when a library has non-JavaScript code
- Running your own CI pipeline to produce `.ipa` and `.apk` / `.aab` files

For teams without a dedicated mobile engineer, this is a multi-day undertaking before a single line of app logic is written. Expo absorbs most of this.

## Core concepts

### Expo Go

Expo Go is a free app you install on your physical iPhone or Android phone from the App Store / Play Store. During development, you scan a QR code and your app runs inside Expo Go in seconds, no build step, no Xcode, no cable.

**Limitation:** Expo Go only supports the modules in the Expo SDK. If you add a library that contains custom native code not included in that list, Expo Go will not run it. For those cases, you need the Expo Dev Client.

### Expo Dev Client

Expo Dev Client is a custom development build of your app that you install on your device. Unlike Expo Go (which is fixed), the Dev Client is compiled specifically for your project and includes any native modules your project requires. It still gives you the fast reload experience of Expo Go, but without the module restrictions.

Think of the progression:

- **Expo Go**: fastest start, works for the majority of apps that stay within the Expo SDK
- **Expo Dev Client**: same workflow but no module restrictions; required once you add native libraries not in the SDK

### EAS (Expo Application Services)

EAS is Expo's cloud build and distribution platform. It has three components:

**EAS Build**: compiles your app in the cloud. You run `eas build` locally, your code is uploaded, built on Expo's macOS (iOS) or Linux (Android) infrastructure, and you receive a signed binary ready for distribution. No Xcode on your laptop required for production builds.

**EAS Submit**: uploads your binary to the App Store or Google Play Store from the command line. It handles the submission API calls that would otherwise require the web dashboard.

**EAS Update**: delivers over-the-air (OTA) JavaScript updates to users who already have your app installed. Because the native binary stays the same, you can push bug fixes and feature changes to all users instantly, without waiting for App Store review (for JS-only changes).

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Local</span>
    <span class="bz-flow-step-name">eas build</span>
    <span class="bz-flow-step-desc">Your code is uploaded to EAS infrastructure</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">EAS Build</span>
    <span class="bz-flow-step-name">Native compile</span>
    <span class="bz-flow-step-desc">Signed .ipa (iOS) and .aab (Android) produced in cloud</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">EAS Submit</span>
    <span class="bz-flow-step-name">Store upload</span>
    <span class="bz-flow-step-desc">Binary submitted to App Store / Play Store via API</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">EAS Update</span>
    <span class="bz-flow-step-name">OTA patch</span>
    <span class="bz-flow-step-desc">JS-only fixes shipped to live users without store review</span>
  </div>
</div>

## Key SDK modules

The Expo SDK is a versioned collection of first-party modules. These are the ones most apps use:

### expo-router

File-based routing for React Native, modelled on Next.js. Every file in the `app/` directory automatically becomes a screen. Nested folders become nested navigators. No manual route registration required.

```
app/
  _layout.tsx          ← root layout (navigation shell)
  index.tsx            ← maps to /  (home screen)
  (tabs)/
    _layout.tsx        ← tab bar definition
    feed.tsx           ← /feed
    profile.tsx        ← /profile
  product/
    [id].tsx           ← /product/42  (dynamic segment)
```

A minimal root layout using expo-router:

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
    </Stack>
  );
}
```

```tsx
// app/index.tsx
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome</Text>
      <Link href="/product/42">Go to product 42</Link>
    </View>
  );
}
```

### expo-notifications

Push notifications on iOS and Android from a single API. Handles requesting permission, registering for Expo Push Tokens (EPT), receiving notifications in the foreground, and responding to taps. Works with Expo's free notification relay service for prototypes, or with your own APNs/FCM credentials for production.

### expo-camera

Access the device camera with full control over focus, zoom, flash, and photo/video capture. Returns the image as a local URI your app can upload or display. Requires a Dev Client build if your project uses native features beyond what Expo Go includes.

### expo-image-picker

Launch the system photo library or camera to let a user select or capture an image. Returns a result object with the image URI and metadata. Used in most apps that accept user-generated content (profile photos, document uploads, etc.).

### AsyncStorage

Persistent key-value storage on the device, equivalent to `localStorage` for the web. Useful for storing user preferences, draft content, and cached API responses that should survive app restarts. For structured data or anything that needs querying, prefer a proper embedded database like Expo SQLite. AsyncStorage is maintained by the React Native community and re-exported by the Expo SDK.

## Expo Managed vs Bare vs React Native CLI

| | **Expo Managed** | **Expo Bare** | **React Native CLI** |
|---|---|---|---|
| **Starting point** | `npx create-expo-app` | Eject from managed | `npx @react-native-community/cli init` |
| **Native code visible** | No (abstracted) | Yes (`ios/` and `android/` present) | Yes |
| **EAS Build** | Yes | Yes | Yes (with some config) |
| **Expo SDK modules** | All available | All available | Must add individually |
| **Custom native modules** | Dev Client required | Full control | Full control |
| **When to use** | Starting out, most apps | Need native code changes not covered by SDK | Need full control or existing native codebase |

**Recommendation for most teams:** Start managed. Eject to bare only if you hit a specific native capability the SDK does not provide. The SDK covers 95% of common use cases.

## Expo SDK version cycle

Expo releases a new SDK version roughly every quarter. Each SDK version pins a specific version of React Native. For example:

- SDK 52 → React Native 0.76
- SDK 53 → React Native 0.77 (with New Architecture on by default)

Upgrading SDK versions is the primary maintenance task for Expo projects. The changelog is thorough, and the `expo-doctor` CLI command checks for incompatibilities before you build.

Apps do not auto-upgrade. Users stay on the SDK version baked into their installed binary until they update the app from the store.

## Architecture overview

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your App</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">expo-router screens</span>
      <span class="bz-arch-chip">Business logic (TypeScript)</span>
      <span class="bz-arch-chip">UI components</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Expo SDK</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">expo-camera</span>
      <span class="bz-arch-chip">expo-notifications</span>
      <span class="bz-arch-chip">expo-image-picker</span>
      <span class="bz-arch-chip">AsyncStorage</span>
      <span class="bz-arch-chip">expo-router</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">React Native Runtime</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hermes JS Engine</span>
      <span class="bz-arch-chip">JSI / New Architecture (Fabric)</span>
      <span class="bz-arch-chip">Native Module Bridge</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Platform</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">iOS Native (Swift / ObjC)</span>
      <span class="bz-arch-chip">Android Native (Kotlin / Java)</span>
    </div>
  </div>
</div>

## When to use Expo vs alternatives

| Scenario | Recommended path |
|---|---|
| New cross-platform mobile app, team knows JavaScript | **Expo Managed** |
| App requires a niche native library not in Expo SDK | **Expo Bare** or bare React Native |
| Team has existing Swift/Kotlin codebase | **Raw React Native** integrated into native project |
| Maximum performance, games, camera-heavy AR | **Native (Swift / Kotlin)** |
| Web-first, mobile-secondary, no app store | **Progressive Web App** |
| True cross-platform including desktop, team new to mobile | **Flutter** (different language: Dart) |

## Cost

**Expo SDK and CLI:** free and open-source (MIT).

**EAS pricing (as of 2026):**

| Plan | Price | Build minutes/month | EAS Update |
|---|---|---|---|
| Free | $0 | 30 minutes | 1,000 monthly active devices |
| Production | $99/month | 1,600 minutes | 50,000 monthly active devices |
| Enterprise | Custom | Unlimited | Unlimited |

Most indie apps and small teams run on the free tier during development and upgrade to Production when shipping to real users at scale.

## Getting started

```bash
# Create a new Expo project with expo-router
npx create-expo-app@latest my-app

# Start the development server (opens Expo Go on your phone via QR)
cd my-app
npx expo start

# Create your first EAS build for iOS
eas build --platform ios --profile preview
```

## Sources

1. https://expo.dev/
2. https://docs.expo.dev/
3. https://github.com/expo/expo
4. https://docs.expo.dev/eas/
5. https://docs.expo.dev/router/introduction/
6. https://reactnative.dev/docs/environment-setup
