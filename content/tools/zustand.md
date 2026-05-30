---
title: "Zustand - Lightweight React State Management"
description: "Zustand is a minimal, unopinionated state management library for React and React Native. Create a store with actions, subscribe from any component, no boilerplate."
date: 2026-05-28
categories: [Tools]
tags: [react, react-native, state-management, javascript, typescript, frontend, mobile]
related:
  - basics/what-is-react-native
  - tools/async-storage
  - tools/expo
  - guides/from-zero-to-production
solutions:
  - guides/from-zero-to-production
last_updated: 2026-05-30
---

Zustand (German for "state") is a state management library for React and React Native built by the team at [Pmndrs](https://pmnd.rs/) (Poimandres). It was created as a direct response to the complexity of Redux and the performance limitations of React's built-in Context API. The pitch is deliberately minimal: create a store, define actions in the same place as state, subscribe to exactly the slice of state you need. No reducers, no action creators, no boilerplate.

Zustand is now one of the most widely used state management libraries in the React ecosystem. Its API is small enough to learn in an afternoon and powerful enough to handle the state requirements of large production applications.

## The problem: data sharing across components

In React, each component manages its own state with `useState`. This works for local state, a form field value, an open/closed toggle. It breaks down when multiple components across different parts of the tree need to read or write the same data.

The naive solution is **prop drilling**: pass state and setter functions down through every intermediate component. This creates tight coupling between components that have no reason to know about each other, and makes refactoring painful.

React provides **Context API** as a built-in solution. You define a context, wrap a subtree in a provider, and any component inside that subtree can read the context value. This solves the sharing problem but introduces a different one: every component that subscribes to a context re-renders when any value in that context changes, even if the component only uses one field out of fifty in the context object. For frequently-changing state (animations, real-time data, cursor positions), this causes significant performance problems.

**Redux** solves both problems but at the cost of significant boilerplate: actions, action creators, reducers, selectors, the Redux store configuration, middleware, and DevTools setup. For many applications, the ceremony is disproportionate to the problem being solved.

Zustand's position: as simple as Context API, with selective subscriptions that prevent unnecessary re-renders, and none of the Redux ceremony.

<figure class="bz-figure">
  <img src="/img/wardrobe/safety-archive-backups.png" alt="Dark wardrobe shelving unit with neat stacks of folded garments on each shelf, each section labelled: organized state that persists across sessions." loading="lazy">
  <figcaption>A well-organised store. Zustand with the persist middleware is your application's memory: structured, labelled, always accessible, and stable across restarts.</figcaption>
</figure>

## How Zustand works

A Zustand store is created with `create()`. You define state and actions together as a single object. Components subscribe using the hook Zustand returns from `create()`.

```typescript
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

Any component anywhere in the tree can subscribe:

```typescript
function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)

  return <button onClick={increment}>{count}</button>
}

function ResetButton() {
  const reset = useCounterStore((state) => state.reset)
  return <button onClick={reset}>Reset</button>
}
```

The selector function `(state) => state.count` is critical: `Counter` only re-renders when `count` changes. `ResetButton` subscribes only to `reset` (a stable function reference) and never re-renders due to count changes. This is the selective subscription that Context API cannot do without workarounds.

## Data flow and persistence

<div class="bz-diagram">
<div class="bz-diagram-label">Zustand store: components, state, and persistence</div>
<div class="bz-diagram-body">
<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Component A</span>
    <span class="bz-flow-step-name">Reads Store</span>
    <span class="bz-flow-step-desc">useWardrobeStore(state => state.items). re-renders only when items changes</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Zustand Store</span>
    <span class="bz-flow-step-name">State + Actions</span>
    <span class="bz-flow-step-desc">items[], addItem(), removeItem(), filterByCategory(). defined once, available globally</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Component B</span>
    <span class="bz-flow-step-name">Subscribes + Writes</span>
    <span class="bz-flow-step-desc">useWardrobeStore(state => state.addItem). calls action, triggers re-renders in subscribers</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">AsyncStorage</span>
    <span class="bz-flow-step-name">Persist Layer</span>
    <span class="bz-flow-step-desc">persist middleware serializes state to AsyncStorage on mobile, localStorage on web</span>
  </div>
</div>
</div>
</div>

## Practical example: a wardrobe items store

A realistic store for a wardrobe/clothing app, adding, removing, and filtering items:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Category = 'tops' | 'bottoms' | 'shoes' | 'outerwear' | 'accessories'

export interface WardrobeItem {
  id: string
  name: string
  category: Category
  color: string
  imageUri?: string
  addedAt: string
}

interface WardrobeState {
  items: WardrobeItem[]
  activeCategory: Category | null
  addItem: (item: Omit<WardrobeItem, 'id' | 'addedAt'>) => void
  removeItem: (id: string) => void
  setActiveCategory: (category: Category | null) => void
  filteredItems: () => WardrobeItem[]
  totalCount: () => number
}

export const useWardrobeStore = create<WardrobeState>()(
  persist(
    (set, get) => ({
      items: [],
      activeCategory: null,

      addItem: (itemData) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...itemData,
              id: crypto.randomUUID(),
              addedAt: new Date().toISOString(),
            },
          ],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      setActiveCategory: (category) =>
        set({ activeCategory: category }),

      // Derived state via getters, computed on call, not stored
      filteredItems: () => {
        const { items, activeCategory } = get()
        return activeCategory
          ? items.filter((item) => item.category === activeCategory)
          : items
      },

      totalCount: () => get().items.length,
    }),
    {
      name: 'wardrobe-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name)
        },
      },
    }
  )
)
```

Using the store in components:

```typescript
// WardrobeList.tsx
function WardrobeList() {
  const filteredItems = useWardrobeStore((state) => state.filteredItems)
  const removeItem = useWardrobeStore((state) => state.removeItem)
  const items = filteredItems()  // call the getter

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemCard item={item} onRemove={() => removeItem(item.id)} />
      )}
    />
  )
}

// CategoryFilter.tsx, only re-renders when activeCategory changes
function CategoryFilter() {
  const activeCategory = useWardrobeStore((state) => state.activeCategory)
  const setActiveCategory = useWardrobeStore((state) => state.setActiveCategory)
  // ...
}
```

## The `persist` middleware

`persist` wraps your store and automatically serializes/deserializes state to a storage backend. On web, the default is `localStorage`. On React Native, you provide an `AsyncStorage`-backed adapter as shown above.

When the app is opened, Zustand rehydrates the store from storage before the first render. You can control which parts of state are persisted with the `partialize` option, useful for excluding large data or computed state:

```typescript
persist(
  (set, get) => ({ ... }),
  {
    name: 'wardrobe-storage',
    partialize: (state) => ({
      // Only persist items, not the active filter, which should reset on open
      items: state.items,
    }),
  }
)
```

## Immer middleware

For deeply nested state objects, `set` requires careful spread syntax to avoid mutation. The `immer` middleware lets you write mutations that look like direct mutation but produce new immutable objects (Immer uses Proxy under the hood):

```typescript
import { immer } from 'zustand/middleware/immer'

const useStore = create<State>()(
  immer((set) => ({
    user: { profile: { name: 'Linda', preferences: { theme: 'dark' } } },
    updateTheme: (theme) =>
      set((state) => {
        // Write this as if mutating, Immer handles immutability
        state.user.profile.preferences.theme = theme
      }),
  }))
)
```

Without Immer: `set((state) => ({ user: { ...state.user, profile: { ...state.user.profile, preferences: { ...state.user.profile.preferences, theme } } } }))`

## Devtools integration

Zustand integrates with the Redux DevTools browser extension via the `devtools` middleware:

```typescript
import { devtools } from 'zustand/middleware'

const useStore = create<State>()(
  devtools(
    (set) => ({ ... }),
    { name: 'WardrobeStore' }
  )
)
```

With DevTools, you can inspect every action, travel back in time to previous states, and see the exact state diff each action produced. Combine with `persist` and `immer` by nesting middleware:

```typescript
const useStore = create<State>()(
  devtools(
    persist(
      immer((set, get) => ({ ... })),
      { name: 'wardrobe-storage' }
    )
  )
)
```

## Zustand for React Native

Zustand works identically in React Native, the same `create()` API, the same `useStore` hook pattern. The difference is the `persist` storage backend: instead of `localStorage`, you use `AsyncStorage` (from `@react-native-async-storage/async-storage`) as shown in the wardrobe example above.

There is no native bridge, no platform-specific code in Zustand itself. It is pure JavaScript that works wherever React works.

React Native with Expo:

```bash
npx expo install @react-native-async-storage/async-storage
```

## When to use Zustand vs alternatives

| Scenario | Recommendation |
|---|---|
| Small component subtree needs shared data | **Context API**, simplest solution, no dependency needed |
| App-wide state, performance matters | **Zustand**, selective subscriptions, minimal setup |
| Team already uses Redux, migration not planned | **Redux Toolkit**, stick with what the team knows |
| Complex state machines, state transitions need to be explicit | **XState**, state machine approach, better for complex flows |
| Server state (API data, caching, refetching) | **TanStack Query (React Query)**, purpose-built for server state |
| Very simple global value (theme, language) | **Context API**, low frequency of change, re-render cost is acceptable |

A common pattern: use TanStack Query for all server state (API responses, lists from Supabase), and Zustand for client-only UI state (current filter, modal open state, selected items in a multi-select). Avoid storing data in Zustand that is fundamentally server data, that creates a cache you then have to keep in sync.

## Full comparison table

| Dimension | Zustand | Redux Toolkit | Context API | MobX |
|---|---|---|---|---|
| **Boilerplate** | Minimal | Low-medium | None | Low |
| **Bundle size** | ~1KB | ~16KB | 0 (built-in) | ~22KB |
| **Selective re-renders** | Yes (selectors) | Yes (selectors) | No | Yes (observables) |
| **DevTools** | Via middleware | Built-in | No | Built-in |
| **Async actions** | Direct (any async fn) | `createAsyncThunk` | Manual | `flow` + `async` |
| **Persistence** | `persist` middleware | `redux-persist` | Manual | `makePersistable` |
| **React Native** | Full support | Full support | Full support | Full support |
| **TypeScript** | Excellent | Excellent | Good | Good |
| **Paradigm** | Functional | Functional (flux) | React context | Observable (OOP) |
| **Learning curve** | Very low | Low-medium | None | Medium |
| **Best for** | Most apps | Complex state, large teams | Simple/infrequent updates | Object-oriented style |

## Performance: selective subscriptions

The key performance characteristic of Zustand is that components subscribe to slices of state, not the entire store. When an action is dispatched, Zustand compares the selector output before and after the update using `Object.is` equality by default. If the selector output did not change, the component does not re-render.

For complex selectors that return objects or arrays, you can provide a custom equality function:

```typescript
import { shallow } from 'zustand/shallow'

// Without shallow: re-renders on every update (new array reference each time)
const items = useWardrobeStore((state) => state.items)

// With shallow: only re-renders if any item in the array changed
const items = useWardrobeStore(
  (state) => state.items,
  shallow
)
```

This is particularly valuable on React Native where component re-renders have a higher cost than on web (no virtual DOM diffing, bridge communication for native components).

## Sources

1. https://zustand.docs.pmnd.rs/
2. https://github.com/pmndrs/zustand
3. https://docs.pmnd.rs/zustand/guides/persisting-store-data
4. https://react-native-async-storage.github.io/async-storage/
