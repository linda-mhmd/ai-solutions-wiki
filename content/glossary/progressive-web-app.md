---
title: "Progressive Web App (PWA)"
description: "Progressive Web Apps are web applications that use service workers, manifests, and modern browser APIs to deliver app-like experiences, a term coined by Alex Russell and Frances Berriman in 2015."
date: 2026-03-28
categories: [Glossary]
tags: [pwa, progressive-web-app, service-worker, offline-first, web-manifest, mobile]
related:
  - glossary/web-components
  - glossary/cdn
last_updated: 2026-05-30
---

A Progressive Web App (PWA) is a web application that uses modern browser capabilities, including service workers, web app manifests, and HTTPS, to deliver an experience that is reliable (works offline or on poor networks), fast (responds quickly to user interactions), and engaging (can be installed on the home screen and send push notifications). The term was coined by Alex Russell and Frances Berriman in June 2015.

## Origins and History

On June 15, 2015, Alex Russell, a Google Chrome engineer, published a blog post titled "Progressive Web Apps: Escaping Tabs Without Losing Our Soul" on his blog at infrequently.org [1]. In the post, Russell described how he and designer Frances Berriman had identified a new class of web applications that were emerging as browsers gained capabilities previously exclusive to native apps. Russell wrote that "it happens on the web from time to time that powerful technologies come to exist without the benefit of marketing departments or slick packaging" and that they "linger and grow at the peripheries... until someone names them."

Frances Berriman initially suggested the name "Progressive Open Web Apps," which they shortened to "Progressive Web Apps" [2]. The "progressive" qualifier reflected a key design principle: the app should work for every user regardless of browser capability, progressively enhancing the experience for users whose browsers support additional features. A PWA in an older browser is still a functional website; in a modern browser, it becomes an installable, offline-capable application.

The underlying technologies that enabled PWAs had been developed over the preceding years. Service Workers, the core enabling technology, were specified by Alex Russell and others and began shipping in Chrome in 2014 and Firefox in 2016.

## Core Technologies

**Service Workers** are JavaScript workers that run in a separate thread from the main page and act as a programmable network proxy. They intercept every network request made by the application and can serve responses from a cache, fetch from the network, or construct responses programmatically. This is the foundation of offline support: during the first visit, the service worker caches critical assets, and on subsequent visits (including offline visits), it serves the cached assets without requiring network access.

**Web App Manifest** is a JSON file (`manifest.json`) that provides metadata about the application: its name, icons, start URL, display mode (fullscreen, standalone, minimal-ui), theme color, and background color. When a browser detects a valid manifest and service worker, it can prompt the user to install the PWA to their home screen, where it launches in its own window without browser chrome.

**HTTPS** is a hard requirement. Service workers can only be registered on secure origins because their ability to intercept and modify network requests would be a security vulnerability if used on unencrypted connections.

## The Offline-First Pattern

PWAs popularized the offline-first design pattern, where the application is architectured to work without a network connection as the default state, with network access treated as a progressive enhancement. Common caching strategies include Cache First (serve from cache, fall back to network), Network First (try network, fall back to cache), and Stale While Revalidate (serve from cache immediately while fetching an updated version in the background).

## Adoption and Impact

Google heavily promoted PWAs starting in 2015, and major companies adopted the pattern. Twitter Lite (2017) was a landmark PWA that reduced data consumption by 70% and increased engagement in emerging markets. Starbucks, Pinterest, Uber, and Spotify have all shipped PWAs.

Apple's support was slower and more limited. Safari added service worker support in 2018 (Safari 11.1), but restrictions on background sync, push notifications (added in Safari 16.4 in 2023), and storage persistence meant that PWAs on iOS remained more limited than on Android. Despite these platform asymmetries, PWAs established the principle that web applications can deliver native-quality experiences when the right browser APIs are available.

## Sources

1. Russell, A. (2015). "Progressive Web Apps: Escaping Tabs Without Losing Our Soul." Infrequently Noted, June 15, 2015. [https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)
2. Berriman, F. (2017). "Naming Progressive Web Apps." [https://fberriman.com/2017/06/26/naming-progressive-web-apps/](https://fberriman.com/2017/06/26/naming-progressive-web-apps/)
3. MDN Web Docs. "Progressive web apps." [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
4. Google Developers. "What are Progressive Web Apps?" [https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/)
