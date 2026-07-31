---
title: "What is a Build Process?"
description: "Why 'npm run build' exists. Bundling, transpiling, and minifying—turning your source code into something browsers and servers can run."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, build, bundling, webpack, deployment, javascript]
faqs:
  - question: "Why can't browsers just run my code directly?"
    answer: "Sometimes they can—simple HTML/CSS/JS works fine. But modern development uses things browsers don't understand: TypeScript, JSX, npm packages, CSS modules. The build process converts these into standard code browsers recognize."
  - question: "What's the difference between dev mode and production build?"
    answer: "Dev mode is optimized for development: fast rebuilds, detailed errors, source maps. Production builds are optimized for users: minified code, removed debug info, optimized assets. Production is smaller and faster but harder to debug."
  - question: "Why does my build take so long?"
    answer: "The build process does a lot: type checking, bundling hundreds of files, optimizing images, generating HTML. Large projects with many dependencies take longer. Caching and incremental builds help speed this up."
last_updated: 2026-07-30
---

{{< quickanswer >}}
The build process transforms your source code into optimized files that browsers and servers can run. It bundles hundreds of files into a few, converts TypeScript and JSX into JavaScript, minifies code to reduce size, and optimizes assets. When you run `npm run build`, this is what happens.
{{< /quickanswer >}}

## Why builds exist

Your code isn't what runs in the browser. Consider a modern React project:

**What you write:**
- TypeScript files (`.tsx`)
- JSX syntax (`<Button />`)
- CSS modules
- Imports from `node_modules`
- Multiple files organized in folders

**What browsers need:**
- Plain JavaScript
- Standard HTML/CSS
- Single or few bundled files
- No `import` from `node_modules`

The build process bridges this gap.

## What the build does

### 1. Bundling

You have 200 JavaScript files. The browser doesn't want to download 200 files—that's slow.

Bundling combines them:
```
src/
  index.js
  components/
    Button.js
    Header.js
    ...50 more files
  utils/
    ...30 files
    
→ builds into →

dist/
  main.js  (one file containing everything)
```

Bundlers: Webpack, Vite, esbuild, Rollup, Parcel

### 2. Transpiling

Converting modern or non-standard code into code browsers understand.

**TypeScript → JavaScript:**
```typescript
// Before (TypeScript)
function greet(name: string): string {
  return `Hello, ${name}`;
}

// After (JavaScript)
function greet(name) {
  return "Hello, " + name;
}
```

**JSX → JavaScript:**
```jsx
// Before (JSX)
const element = <Button onClick={handleClick}>Submit</Button>;

// After (JavaScript)
const element = React.createElement(Button, { onClick: handleClick }, "Submit");
```

**Modern JS → Compatible JS:**
```javascript
// Before (ES2020)
const name = user?.profile?.name ?? 'Anonymous';

// After (ES5 compatible)
var _user$profile;
var name = ((_user$profile = user === null || user === void 0 ? void 0 : user.profile) === null || _user$profile === void 0 ? void 0 : _user$profile.name) !== null && _user$profile !== void 0 ? _user$profile : 'Anonymous';
```

Transpilers: Babel, TypeScript compiler (tsc), SWC

### 3. Minifying

Making code smaller by removing unnecessary characters:

```javascript
// Before (readable)
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// After (minified)
function calculateTotal(t){let o=0;for(const l of t)o+=l.price*l.quantity;return o}
```

Removes:
- Whitespace and newlines
- Comments
- Long variable names (shortened)
- Dead code (tree shaking)

Result: Much smaller files, faster downloads.

### 4. Asset optimization

**Images:**
- Compressed to smaller sizes
- Converted to modern formats (WebP)
- Resized for different screens

**CSS:**
- Minified
- Autoprefixed (adds `-webkit-`, etc.)
- Unused styles removed

**Fonts:**
- Subsetted (only include characters you use)

### 5. Code splitting

Instead of one giant bundle, split into pieces loaded on demand:

```
main.js        (loads immediately)
dashboard.js   (loads when user visits /dashboard)
settings.js    (loads when user visits /settings)
```

Users download only what they need.

## The build command

```bash
# Development mode (fast, unoptimized)
npm run dev

# Production build (slow, optimized)
npm run build

# Preview production build locally
npm run preview  # or npm run start
```

### What happens during `npm run build`:

1. Read source files
2. Resolve imports and dependencies
3. Transpile TypeScript/JSX
4. Bundle files together
5. Minify and optimize
6. Generate output in `dist/` or `.next/` or `build/`
7. Generate source maps (optional)

### Output structure

```
dist/
  index.html           # Entry HTML
  assets/
    main.a3f8b2.js     # Bundled JS (hashed filename for caching)
    main.c4d5e6.css    # Bundled CSS
    logo.7g8h9i.png    # Optimized images
```

The random characters in filenames are content hashes—they change when content changes, busting caches.

## Dev mode vs production

| Aspect | Dev mode | Production |
|--------|----------|------------|
| Speed | Fast rebuilds | Slow, full optimization |
| Size | Large | Small (minified) |
| Errors | Detailed with source maps | Minimal |
| Hot reload | Yes | No |
| Debug tools | Enabled | Disabled |
| Environment | `NODE_ENV=development` | `NODE_ENV=production` |

**Test production locally before deploying:**
```bash
npm run build
npm run preview
```

If it works in dev but not in the production build, you'll find out before users do.

## Common build tools

### Vite
Modern, fast, great defaults. Used by Vue, now popular with React too.
```bash
npm create vite@latest my-app
```

### Next.js
React framework with built-in build system. Handles SSR, routing, optimization.
```bash
npx create-next-app@latest
```

### Create React App
Older but still used. Webpack under the hood.
```bash
npx create-react-app my-app
```

### Webpack
The original bundler. Powerful but complex configuration.

### esbuild
Extremely fast. Often used inside other tools.

## Common build problems

### "Module not found"

A package is missing or import path is wrong.

```bash
# Install missing package
npm install the-package

# Check import path
import Button from './components/Button';  # Is this path correct?
```

### Build works locally, fails in CI/deployment

Environment differences. Check:
- Node version matches
- All dependencies in package.json (not just locally installed)
- Environment variables are set

### "Out of memory"

Build needs more RAM:
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Build succeeds but app is broken

- Check browser console for runtime errors
- Ensure environment variables are set for production
- Verify API endpoints point to production URLs

### CSS missing or wrong

- CSS modules may have different class names in production
- Check if CSS file is being generated
- Purge CSS might have removed "unused" classes that are actually used

## Build configuration

Most projects have a config file:

```javascript
// vite.config.js
export default {
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
};

// next.config.js
module.exports = {
  output: 'standalone',
  images: {
    domains: ['example.com'],
  }
};
```

Usually you don't need to touch these—defaults work for most cases.

## The build in deployment

When you deploy to Vercel, Netlify, Railway:

1. Platform runs `npm install`
2. Platform runs `npm run build`
3. Output files are deployed to CDN
4. Users receive optimized files

Build logs show what happened. If deployment fails, check build logs first.

## Quick reference

```bash
# Development (fast, not optimized)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
npm run start

# Check what's in your bundle
npm run build -- --analyze  # if supported

# Clean and rebuild
rm -rf dist .next node_modules/.cache
npm run build
```

## Further reading

- [What is deployment?](/basics/what-is-deployment/): Getting built files to production
- [Why it works locally but not deployed](/basics/why-it-works-locally-but-not-deployed/): Build-related deployment issues
- [What is TypeScript?](/basics/what-is-typescript/): One of the things that needs transpiling
- [What is caching?](/basics/what-is-caching/): Why hashed filenames matter
