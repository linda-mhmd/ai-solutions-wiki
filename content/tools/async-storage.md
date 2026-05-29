---
title: "AsyncStorage"
description: "AsyncStorage is the standard key-value storage API for React Native. It persists data on the device: no server, no network: and survives app restarts."
date: 2026-05-28
tags: ["react-native", "mobile", "storage", "expo"]
tool_category: "Frontend"
related:
  - tools/zustand
  - tools/expo
  - basics/what-is-react-native
solutions:
  - guides/from-zero-to-production
---

AsyncStorage is the standard way to store small amounts of persistent data in a React Native or Expo application. It works like `localStorage` in a browser, a key-value store that survives app restarts, but it is asynchronous, meaning every read and write returns a Promise rather than blocking the thread.

It is the correct tool for: user preferences, authentication tokens, draft content, cached responses, and any state you want to survive a restart. It is the wrong tool for: large datasets, relational data, binary files, or anything over a few megabytes.

<figure class="bz-figure">
  <img src="/img/wardrobe/fitting-room-local-dev.png" alt="A person in a dark fitting room before a tall ornate mirror: private, immediate feedback, safe from public view. Local state, visible only to you." loading="lazy">
  <figcaption>AsyncStorage is the fitting room. Private, immediate, on-device. Nobody sees what is stored here until you choose to send it to the server.</figcaption>
</figure>

---

## How it works

AsyncStorage stores data as plain strings. Every value you store must be serialised (converted to a string), and every value you retrieve must be deserialised (parsed back). The most common pattern is `JSON.stringify` on write and `JSON.parse` on read.

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Write
await AsyncStorage.setItem('user_name', JSON.stringify({ name: 'Linda' }));

// Read
const raw = await AsyncStorage.getItem('user_name');
const data = raw ? JSON.parse(raw) : null;

// Delete
await AsyncStorage.removeItem('user_name');

// Clear everything
await AsyncStorage.clear();
```

---

## Storage architecture

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Your App Code</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">AsyncStorage.setItem()</span>
      <span class="bz-arch-chip">AsyncStorage.getItem()</span>
      <span class="bz-arch-chip-note">Returns a Promise. always await it</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">React Native Bridge</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Serialisation layer</span>
      <span class="bz-arch-chip-note">Converts JS values to native storage calls</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Native Storage</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">iOS: NSUserDefaults / SQLite</span>
      <span class="bz-arch-chip">Android: SharedPreferences / SQLite</span>
      <span class="bz-arch-chip-note">Platform-specific, but identical API surface</span>
    </div>
  </div>
</div>

---

## Installation

With Expo:
```bash
npx expo install @react-native-async-storage/async-storage
```

Without Expo (bare React Native):
```bash
npm install @react-native-async-storage/async-storage
npx pod-install  # iOS only
```

---

## Common patterns

### Pattern 1: Persisting user settings

```typescript
const saveSettings = async (theme: 'light' | 'dark', language: string) => {
  const settings = { theme, language, updatedAt: new Date().toISOString() };
  await AsyncStorage.setItem('app_settings', JSON.stringify(settings));
};

const loadSettings = async () => {
  const raw = await AsyncStorage.getItem('app_settings');
  return raw ? JSON.parse(raw) : { theme: 'dark', language: 'en' };
};
```

### Pattern 2: Zustand persistence middleware

The most common production pattern is combining AsyncStorage with Zustand's `persist` middleware. This means your entire app state survives restarts automatically:

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }),
    {
      name: 'wardrobe-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### Pattern 3: Storing auth tokens

```typescript
const AUTH_KEY = '@auth_token';

export const saveToken = (token: string) =>
  AsyncStorage.setItem(AUTH_KEY, token);

export const getToken = () =>
  AsyncStorage.getItem(AUTH_KEY);

export const clearToken = () =>
  AsyncStorage.removeItem(AUTH_KEY);
```

---

## What to store and what not to store

| Store here | Don't store here |
|-----------|-----------------|
| User preferences (theme, language) | Passwords in plaintext |
| Auth tokens (use Expo SecureStore instead for sensitive data) | Large datasets (>1MB) |
| Cached API responses | Binary files or images |
| Draft content | Anything requiring querying or indexing |
| App state for Zustand persist | Relational data with joins |
| Onboarding completion flags | Data shared across users |

---

## Storage limits

AsyncStorage does not enforce a hard limit in the library itself, but the underlying platforms do:

- **iOS**: No official limit, but performance degrades above ~6MB per key
- **Android**: Defaults to 6MB total; can be raised in native config
- **Expo Go**: Additional restrictions may apply in development

For anything beyond simple key-value data, use a proper embedded database ([WatermelonDB](https://nozbe.github.io/WatermelonDB/), SQLite via Expo) or offload to the cloud.

---

## AsyncStorage vs alternatives

| Option | Use case | Size limit | Persistence | Searchable |
|--------|---------|-----------|------------|-----------|
| **AsyncStorage** | App preferences, tokens, draft state | ~6MB | Yes | No |
| **Expo SecureStore** | Secrets, auth tokens (encrypted) | 2KB per value | Yes | No |
| **SQLite (Expo)** | Structured relational data | Disk space | Yes | Yes |
| **WatermelonDB** | Large offline-first datasets | Disk space | Yes | Yes |
| **MMKV** | High-performance key-value (C++) | Large | Yes | No |
| **In-memory (Zustand)** | Session state, UI state | RAM | No | No |

### When to upgrade from AsyncStorage

If you find yourself storing more than 10 keys, doing substring searches on stored values, or managing complex data relationships, stop and move to SQLite or a proper backend.

---

## Error handling

AsyncStorage operations can fail. Always handle errors in production code:

```typescript
const loadData = async () => {
  try {
    const value = await AsyncStorage.getItem('my_key');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('AsyncStorage read failed:', error);
    return null; // Graceful fallback
  }
};
```

---

## Performance considerations

AsyncStorage is asynchronous by design, it will not block your UI thread. However:

- **Multiple reads**: If you read 20 separate keys on app launch, consider using `AsyncStorage.multiGet()` instead
- **Large objects**: Storing a 500-item list as a single JSON blob works, but updates require rewriting the entire blob
- **Frequency**: Writing on every keystroke is too frequent: debounce writes by 500-1000ms

---

## Expo SecureStore: when security matters

For auth tokens and any data that should be encrypted at rest, use `expo-secure-store` instead. It uses the platform's secure enclave (iOS Keychain, Android Keystore):

```typescript
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('auth_token', token);
const token = await SecureStore.getItemAsync('auth_token');
```

SecureStore is limited to 2KB per value. Use it for tokens and secrets, not for large cached data.

---

## Further reading

- [Zustand](/tools/zustand/): combine with AsyncStorage for automatic state persistence
- [Expo](/tools/expo/): the platform that makes AsyncStorage installation trivial
- [What is React Native?](/basics/what-is-react-native/): the foundation this tool runs on
- [Official AsyncStorage docs](https://react-native-async-storage.github.io/async-storage/)
