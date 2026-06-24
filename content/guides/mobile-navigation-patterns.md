---
title: "Mobile Navigation Patterns - Bottom Tabs, Hamburger Menus, and When to Use Each"
description: "Learn the vocabulary of mobile and web navigation so you can tell an AI coding tool exactly which pattern to build."
date: 2026-06-22
categories: [Guides]
tags: ["navigation", "mobile", "ux", "ios", "android", "react-native"]
tools: []
related: ["guides/designing-across-ios-android-web", "guides/platform-native-ux-patterns", "guides/white-space-and-visual-hierarchy", "tools/expo"]
last_updated: 2026-06-22
---

Navigation decides whether users find your features or give up. When you direct an AI coding tool, the words you choose ("bottom tabs", "drawer", "header") map to concrete code and platform conventions. This guide gives you that vocabulary so you can name the exact pattern you want and explain why.

<figure class="bz-figure">
  <img src="/img/enterprise-dark/neon-corridor-walking-notext.png" alt="People walking through a dark corridor lined with neon arches, each arch a way through. No em-dashes." loading="lazy">
  <figcaption>Choosing a navigation pattern is wayfinding: you decide which doorways stay lit and visible, and which stay hidden until someone goes looking.</figcaption>
</figure>

## How to choose a navigation pattern

Start from one question: how many top destinations does the app have? The count drives almost every decision. Walk through this flow before you ask an AI tool to build anything.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Count destinations</span>
    <span class="bz-flow-step-desc">List the top-level screens users switch between most.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">3 to 5 items</span>
    <span class="bz-flow-step-desc">Use bottom tabs. Keep all of them always visible.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">More than 5</span>
    <span class="bz-flow-step-desc">Group the top 5 into tabs. Push the rest into a "More" tab or a drawer.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Add a header</span>
    <span class="bz-flow-step-desc">Each screen gets a navigation bar with title and back control.</span>
  </div>
</div>

## Primary vs secondary navigation

Before you name a pattern, sort your screens into two buckets. This split decides everything else.

**Primary navigation**: the few destinations users reach constantly, like Home, Search, and Profile. These belong somewhere always visible, never hidden behind a tap.

**Secondary navigation**: settings, help, account details, and rarely used sections. These can live one level deeper, inside a menu or a "More" screen, because users seek them out deliberately.

The mistake to avoid: dumping primary destinations into a hidden menu. When a core feature sits behind an icon, fewer people find it, and engagement drops. Keep primary navigation in the open.

## Bottom navigation (the tab bar)

A bottom tab bar is a strip of 3 to 5 icons with labels along the bottom edge. Tapping a tab switches the whole screen. The active tab stays highlighted, so users always know where they are.

**What it is**: persistent top-level navigation. Every destination is one tap away and always visible.

**When it works**: apps with 3 to 5 equally important sections. This is the iOS default for primary navigation and the modern Android default through the Material navigation bar. Reach for it first.

**When it fails**: more than 5 destinations crowd the bar and shrink touch targets. It also fails when sections are not peers, for example when one "tab" is really a sub-screen of another.

**Platform convention**: Apple calls it a tab bar and places it at the bottom. Material 3 calls it the navigation bar and also places it at the bottom. Both platforms agree here, which makes bottom tabs the safest cross-platform choice.

## Hamburger menu (the navigation drawer)

A hamburger menu is the ☰ icon, usually top-left, that slides a panel (the drawer) in from the side. The drawer lists destinations that stay hidden until the user taps the icon.

**What it is**: a hidden list of destinations revealed on demand. The name comes from the three-line icon that resembles a stacked burger.

**When it works**: secondary navigation, or when you genuinely have many destinations that do not fit a tab bar. It suits content-heavy apps where users browse a long catalog of sections.

**When it fails**: as primary navigation. Hiding destinations behind an icon measurably lowers discoverability and engagement, because out of sight means out of mind. The Nielsen Norman Group research on hamburger menus documents this drop. Do not bury your most-used features here.

**Platform convention**: Material 3 defines the navigation drawer as a standard component. iOS has no native drawer pattern, so a drawer on iPhone feels imported from Android. If you build for both platforms, prefer tabs and reserve the drawer for overflow.

## Top tabs

Top tabs sit in a horizontal row directly under the header. Users tap a tab or swipe sideways to move between closely related views, like "Posts", "Replies", and "Media" on one profile.

**What it is**: navigation between sibling views inside a single section. Top tabs organize content, not the whole app.

**When it works**: when one screen has a handful of related sub-views and swiping between them feels natural. Think of filtered lists or category views.

**When it fails**: as the app's primary navigation. Top tabs compete with bottom tabs for attention and confuse users about which level they control. Use one or the other for the top level, not both.

**Platform convention**: both iOS and Android support segmented controls and tab rows near the top. Material uses scrollable top tabs widely. iOS leans on segmented controls for the same job.

## Navigation bar (the header)

The navigation bar is the top strip on each screen. It holds the screen title in the center or left, a back control on the left, and optional actions like search or edit on the right.

**What it is**: per-screen context. It tells users where they are and gives them a way back.

**When it works**: on every screen inside a stack. The header is not optional. It anchors the user and carries the title and back affordance.

**When it fails**: when overloaded with too many action buttons, or when the title is missing and users lose their place. Keep it to a title, a back control, and at most one or two actions.

**Platform convention**: Apple calls it the navigation bar, with the title and a back chevron on the top-left. Material 3 calls it the top app bar. Keep the back control where each platform expects it.

## Back patterns

Going back is its own pattern, and the two platforms differ. Naming the right one tells your AI tool which behavior to wire up.

**iOS**: a back chevron sits at the top-left of the navigation bar. iOS also supports an edge swipe-back gesture: dragging from the left edge returns to the previous screen. Wire up both.

**Android**: the system provides a global back control through a gesture or button at the bottom of the screen. Your app should respond to it predictably, returning the user one step up the stack.

The rule: never trap users. Every screen deeper than the top level needs a clear way back, and it must match the platform users expect. Deeper per-platform specifics live in [/guides/platform-native-ux-patterns/](/guides/platform-native-ux-patterns/).

## Bottom tabs vs drawer in code

Here is what each pattern maps to in React Navigation, the standard library for navigation in React Native and Expo apps. Compare the two so you can point your AI tool at the right one.

```tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Bottom tabs: primary navigation, always visible.
// Use this for 3 to 5 top-level destinations.
const Tab = createBottomTabNavigator();

function TabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Drawer: hidden behind a hamburger icon.
// Reserve this for secondary or numerous destinations.
const Drawer = createDrawerNavigator();

function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

The two snippets differ by one import and one navigator type. `createBottomTabNavigator` renders the always-visible strip. `createDrawerNavigator` renders the hidden panel behind the ☰ icon. Tell your AI tool which navigator you want, and it will scaffold the right structure. Expo bundles React Navigation, so both work out of the box. See [/tools/expo/](/tools/expo/) for setup.

## Decision table

Use this table to pick fast. Match the row that matters most to your app, then read across.

| | Bottom tabs | Hamburger drawer | Top tabs |
|---|---|---|---|
| **Discoverability** | High, always visible | Low, hidden behind icon | Medium, near header |
| **Number of destinations** | 3 to 5 | Many or secondary | 2 to 4 sub-views |
| **iOS fit** | Native default | Feels imported | Segmented control |
| **Android fit** | Material default | Standard drawer | Common pattern |
| **Best for** | Primary navigation | Overflow and settings | Sibling views in one section |

## Further reading

- [Apple Human Interface Guidelines: Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars): the official iOS guidance on bottom tab bars and how many tabs to show.
- [Apple Human Interface Guidelines: Navigation bars](https://developer.apple.com/design/human-interface-guidelines/navigation-bars): how iOS structures the header, title, and back control.
- [Material 3: Navigation bar](https://m3.material.io/components/navigation-bar/overview): Android's bottom navigation component and its behavior.
- [Material 3: Navigation drawer](https://m3.material.io/components/navigation-drawer/overview): when and how Android uses the side drawer.
- [Nielsen Norman Group: Hamburger menus](https://www.nngroup.com/articles/hamburger-menus/): the research showing hidden navigation lowers discoverability and engagement.
- [React Native documentation](https://reactnative.dev/docs/getting-started): the framework that powers these navigation patterns in Expo apps.
- [Designing across iOS, Android, and web](/guides/designing-across-ios-android-web/): how to keep one app feeling native on every platform.
- [Platform-native UX patterns](/guides/platform-native-ux-patterns/): the deeper per-platform conventions for back gestures and headers.
