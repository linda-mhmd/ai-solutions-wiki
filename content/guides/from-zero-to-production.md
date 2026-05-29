---
title: "From Zero to Production: The Complete Path"
description: "A structured learning path and architectural progression for shipping a real AI-powered product: from demo to MVP to full production system. Every stage explained."
date: 2026-05-28
tags: ["architecture", "mvp", "production", "mobile", "ai", "beginner"]
related:
  - tools/expo
  - tools/fastapi
  - tools/railway
  - tools/stripe-connect
  - guides/async-job-queues
  - guides/lean-canvas
---

Most tutorials end at "it works on my machine." This guide starts there, and takes you to a real, deployed, user-facing product. It covers the full progression: demo, MVP, and production-grade system. Every infrastructure decision is explained. Every cost is visible.

This is the learning path for someone who understands AI at a conceptual level and wants to turn that understanding into something that actually ships.

<figure class="bz-figure">
  <img src="/img/wardrobe/sdlc-moodboard-to-pavement.png" alt="From moodboard to pavement: five objects arranged in sequence: mood board, pattern pieces, fitted garment, finished item, street-ready deployment." loading="lazy">
  <figcaption>Every product begins as a concept and becomes real through a series of deliberate stages. Skipping stages does not save time: it creates debt that surfaces later, at higher cost.</figcaption>
</figure>

---

## The four stages

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 0</span>
    <span class="bz-flow-step-name">Demo</span>
    <span class="bz-flow-step-desc">Runs locally. Proves the idea feels right. No backend, no AI, no cost. Answers: is this worth building?</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 1</span>
    <span class="bz-flow-step-name">MVP</span>
    <span class="bz-flow-step-desc">Real users. Cloud storage. AI features. Auth. The first version people can actually sign up for.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 2</span>
    <span class="bz-flow-step-name">Daily Value</span>
    <span class="bz-flow-step-desc">Engagement loop. Notifications. Calendar integration. Weather-aware suggestions. Worth opening every day.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Stage 3</span>
    <span class="bz-flow-step-name">Ecosystem</span>
    <span class="bz-flow-step-desc">Marketplace, payments, creator storefronts. The product becomes a platform.</span>
  </div>
</div>

Each stage is a complete, shippable product. Stage 2 does not replace Stage 1, it builds on top. The same codebase grows incrementally.

---

## Stage 0: The Demo

### What it proves

The demo answers one question: **does the product experience feel right?** Not "will it scale" or "is the AI accurate", just: does this feel worth building more of?

This is the most important principle in modern product development: **validate before you invest**. Building cloud infrastructure, a database, and an AI pipeline costs weeks of time and real money. A demo costs two or three days and nothing.

If the demo does not feel compelling, you change direction before spending the real effort. If it does, you move to the MVP knowing you are solving the right problem.

### Demo architecture

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">App (Device)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">React Native / Expo</span>
      <span class="bz-arch-chip">UI screens and navigation</span>
      <span class="bz-arch-chip-note">Everything runs on the device. no network required</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">State</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Zustand store</span>
      <span class="bz-arch-chip">In-memory + AsyncStorage</span>
      <span class="bz-arch-chip-note">Data lives on the device, persists between restarts</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Data</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Hardcoded seed data</span>
      <span class="bz-arch-chip">Static assets</span>
      <span class="bz-arch-chip-note">No API calls, no database, no auth</span>
    </div>
  </div>
</div>

### What a demo always includes: and always omits

| Included in demo | Omitted from demo | Added in MVP |
|----------------|------------------|-------------|
| All screens and navigation | User accounts / login | Supabase Auth |
| Core UX flows | Cloud storage | Supabase Storage |
| Hardcoded sample data | Live AI responses | Claude API |
| On-device state (AsyncStorage) | Real-time weather | Open-Meteo API |
| The visual identity | Background AI processing | Async job queue |
| Transition animations | Push notifications | expo-notifications |

Everything omitted from the demo is omitted **by design**, not by accident. The demo should run with `npx expo start` and nothing else.

### Tools at this stage

- **[React Native](/basics/what-is-react-native/)**: cross-platform mobile framework
- **[Expo](/tools/expo/)**: the toolchain that makes React Native practical
- **[Zustand](/tools/zustand/)**: minimal state management
- **[AsyncStorage](/tools/async-storage/)**: on-device persistence

---

## Stage 1: The MVP

The MVP (Minimum Viable Product) is the first version real users can sign up for. It introduces accounts, cloud storage, and the AI features that make the product differentiated.

**What is an MVP?** The smallest version of a product that delivers the core value to real users. Not a prototype: it actually works. Not a full product: it has exactly what is needed and nothing more.

### MVP architecture

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Mobile App</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">React Native + Expo</span>
      <span class="bz-arch-chip">Zustand + local cache</span>
      <span class="bz-arch-chip-note">Fetches from API, caches locally for performance</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API Server</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Node.js (Hono / Express)</span>
      <span class="bz-arch-chip">Auth middleware (JWT)</span>
      <span class="bz-arch-chip">Job queue (BullMQ)</span>
      <span class="bz-arch-chip-note">Hosted on Railway. auto-deploys from GitHub</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Data Layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">PostgreSQL (Supabase)</span>
      <span class="bz-arch-chip">Object storage (Supabase Storage)</span>
      <span class="bz-arch-chip-note">Supabase bundles database + storage + auth in one service</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI Layer</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Python AI service (FastAPI)</span>
      <span class="bz-arch-chip">Claude API (Anthropic)</span>
      <span class="bz-arch-chip">Open-Meteo (weather)</span>
      <span class="bz-arch-chip-note">AI service runs on GPU cloud (RunPod / Modal)</span>
    </div>
  </div>
</div>

### What changes from demo to MVP

The screens stay the same. The data layer changes completely:

| Demo | MVP |
|------|-----|
| `AsyncStorage` for all data | API calls to Node.js backend |
| Hardcoded seed data | Real user data from PostgreSQL |
| Static avatar placeholder | User-uploaded photo in cloud storage |
| Rule-based suggestions | Claude API generating real responses |
| No auth | Email magic link (Supabase Auth) |
| Hardcoded weather | Open-Meteo API call |

### The demo-to-MVP transition checklist

1. **Set up Supabase**: create project, run schema migrations, enable auth
2. **Create the API server**: Node.js + Hono, connect to Supabase, add auth middleware
3. **Replace AsyncStorage calls with API calls** in the mobile app
4. **Add AI inference**: connect Claude API for the stylist; set up the Python service for heavy AI
5. **Set up the job queue**: BullMQ + Redis for slow AI operations (image generation, processing)
6. **Deploy**: Railway for the API, RunPod or Modal for the Python AI service
7. **Instrument**: add logging and error tracking before your first user sees it

### Why each technology exists

**Supabase instead of raw PostgreSQL**: Supabase bundles the database, authentication, and file storage in one managed service. For a small team, this eliminates weeks of infrastructure setup. The free tier covers the demo-to-MVP transition at zero cost. See [Supabase](/tools/supabase/).

**Railway instead of AWS**: Railway auto-detects your framework, builds it, and deploys it with one command. No Dockerfile required. No IAM policies. No load balancer configuration. When you outgrow Railway, migrating to AWS is straightforward. See [Railway](/tools/railway/).

**FastAPI for the AI service**: Python is the language of AI libraries. FastAPI is the modern Python web framework with native async support and automatic OpenAPI documentation. It handles the long-running, compute-heavy operations that Node.js cannot efficiently handle. See [FastAPI](/tools/fastapi/).

**Async job queue for AI inference**: AI image generation takes 15–60 seconds. HTTP requests time out after 30 seconds. The solution: queue the job, return a job ID immediately, have the app poll for completion. See [Async Job Queues](/guides/async-job-queues/).

---

## Stage 2: Daily Value

Stage 2 does not change the core product. It makes the product worth opening every day.

The key insight: a wardrobe management feature is used weekly. But weather and calendar are daily inputs. Stage 2 connects the core product to daily life through scheduled automation.

### What it adds

| Feature | Technology | Why it matters |
|---------|-----------|----------------|
| Calendar sync | Google Calendar API / Apple Calendar | See upcoming events → suggest outfits |
| Weather-aware suggestions | Cron scheduler + Open-Meteo | Proactive daily recommendation |
| Push notifications | expo-notifications + APNS/FCM | Re-engages users when the app is closed |
| Sustainability tracker | Local logic (no AI) | Wear count, CO₂ savings, donation nudges |
| Outfit planning calendar | New DB tables + UI | Assign outfits to days, see the week |

### New concept: Cron scheduler

A cron scheduler runs code at a fixed time. Every day at 7am: fetch the weather for each user's location, build an outfit suggestion using Claude, send a push notification. This is what makes a product feel alive and proactive rather than passive.

### New concept: Push notifications

Push notifications are messages sent from your server to a user's phone even when the app is closed. On iOS they route through Apple's servers (APNS). On Android through Google's servers (FCM). The user must grant permission. Expo's `expo-notifications` library provides a unified API for both.

---

<figure class="bz-figure">
  <img src="/img/wardrobe/stepping-out-deployment.png" alt="A silhouette in a long dark coat stepping through an open doorway into amber street light: the moment of deployment, when the private experiment becomes public." loading="lazy">
  <figcaption>Deployment is not the end: it is the beginning of the feedback loop. The moment you step outside, real users start telling you what the demo could not.</figcaption>
</figure>

## Stage 3: The Ecosystem

Stage 3 adds the marketplace layer. This is when the product transforms from a personal tool into a community, and when the revenue model becomes substantial.

### What it adds

- **Peer-to-peer marketplace**: list items from your wardrobe for sale or trade with one tap
- **Virtual try-on before buying**: see any marketplace item on your own avatar before committing
- **Creator storefronts**: independent makers selling their own designs
- **Stripe Connect payments**: automatic payment splitting, tax reporting, dispute handling

### Stripe Connect: why you never build this yourself

Stripe Connect handles everything a marketplace needs: splitting payments between buyer and seller, KYC (identity verification, legally required), tax reporting, dispute resolution, and payout scheduling. Building this manually would take a team 6–12 months and still not be compliant with EU payment regulations.

**Cost model**: Stripe charges 2.9% + €0.30 per transaction. The marketplace takes an additional 10–15% commission via `application_fee_amount`. Stripe handles the split automatically. See [Stripe Connect](/tools/stripe-connect/).

---

## Cost at each stage

| Stage | Monthly cost | Per user cost |
|-------|-------------|--------------|
| Demo | €0 | €0 |
| MVP at 1,000 MAU | ~€98 | €0.10 |
| Stage 2 at 10,000 MAU | ~€720 | €0.07 |
| Stage 3 at 100,000 MAU | ~€7,000 | €0.07 |

**The biggest cost driver at every stage is AI inference**: specifically image generation and processing. This is why any AI operation that costs more than €0.01 should be rate-limited for free users or placed behind a paid tier.

---

## The skill progression

Each stage requires new skills. Here is what you need and where to learn it:

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Demo skills</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">TypeScript</span>
      <span class="bz-arch-chip">React Native / Expo</span>
      <span class="bz-arch-chip">Zustand</span>
      <span class="bz-arch-chip">Git</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">MVP skills</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Node.js + REST APIs</span>
      <span class="bz-arch-chip">PostgreSQL / SQL</span>
      <span class="bz-arch-chip">Supabase</span>
      <span class="bz-arch-chip">Python + FastAPI</span>
      <span class="bz-arch-chip">Claude API</span>
      <span class="bz-arch-chip">Railway hosting</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Stage 2 skills</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Cron scheduling</span>
      <span class="bz-arch-chip">Push notifications</span>
      <span class="bz-arch-chip">OAuth (Google Calendar)</span>
      <span class="bz-arch-chip">Observability / logging</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Stage 3 skills</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Stripe Connect</span>
      <span class="bz-arch-chip">Full-text search</span>
      <span class="bz-arch-chip">Vector embeddings</span>
      <span class="bz-arch-chip">Infrastructure as code</span>
    </div>
  </div>
</div>

---

## The decision that matters most at each stage

**At Stage 0:** Is this the right problem to solve? Do not build infrastructure before you know the answer.

**At Stage 1:** What is the one feature that delivers the core value? Everything else is Stage 2. Be ruthless about the MVP scope.

**At Stage 2:** What is the activation event that turns a new user into a retained user? Build toward that metric.

**At Stage 3:** What creates the network effect that makes the marketplace defensible? The marketplace has value proportional to its density: the more sellers, the more buyers, the more sellers.

---

## Further reading

- [What is React Native?](/basics/what-is-react-native/): the mobile framework at the foundation
- [Expo](/tools/expo/): the toolchain that makes React Native practical
- [Supabase](/tools/supabase/): database + auth + storage
- [Railway](/tools/railway/): application hosting
- [FastAPI](/tools/fastapi/): the Python API framework for AI services
- [Async Job Queues](/guides/async-job-queues/): how to handle slow AI operations
- [Stripe Connect](/tools/stripe-connect/): marketplace payments
- [Build-Measure-Learn](/guides/build-measure-learn/): the product methodology behind this progression
- [Lean Canvas](/guides/lean-canvas/): the business model before you write a line of code
- [AI Monetization Strategies](/guides/ai-monetization-strategies/): freemium model design
- [Building RAG Systems](/guides/building-rag-systems/): when your app needs document-based AI
