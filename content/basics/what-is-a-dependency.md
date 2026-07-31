---
title: "What is a Dependency?"
description: "A dependency is code someone else wrote that your project uses. It's why 'npm install' downloads 500 packages and why your project breaks after six months of not touching it."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, dependencies, npm, packages, node-modules]
faqs:
  - question: "Why does npm install download so many packages?"
    answer: "Your project depends on package A. Package A depends on packages B, C, D. Those depend on E, F, G, H... Dependencies have dependencies. It's turtles all the way down. A simple React app can easily have 500+ packages in node_modules."
  - question: "Why did my project stop working when I came back to it?"
    answer: "Probably a dependency updated and broke something. Or you updated Node.js. Or a transitive dependency (a dependency of a dependency) changed. This is why lock files exist—to freeze exact versions."
  - question: "Should I commit node_modules to Git?"
    answer: "No. node_modules can contain hundreds of megabytes and thousands of files. Commit package.json and package-lock.json instead. Anyone can run 'npm install' to recreate node_modules from those files."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A dependency is a package of code that your project needs to work. When you `npm install react`, React becomes a dependency. You didn't write React, but your code won't work without it. Dependencies save you from reinventing the wheel—and introduce the risk that someone else's wheel breaks your car.
{{< /quickanswer >}}

## Why dependencies exist

Nobody writes everything from scratch. If you need to make HTTP requests, parse dates, handle forms, or do basically anything, someone has already written code for that. Instead of reimplementing it, you install their package.

```bash
npm install axios        # HTTP requests
npm install date-fns     # Date handling
npm install zod          # Data validation
npm install react        # UI framework
```

Your `package.json` file lists your dependencies:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0"
  }
}
```

When someone clones your project and runs `npm install`, they get all the same packages.

## The node_modules black hole

Run `npm install` in a fresh project and watch node_modules explode.

You installed 4 packages. You now have 847 packages in node_modules. What happened?

**Transitive dependencies**: Your packages have dependencies. Those dependencies have dependencies. It cascades.

```
Your project
└── react (you installed this)
    └── react-dom
        └── scheduler
    └── loose-envify
        └── js-tokens
```

This is normal. The JavaScript ecosystem is built on small, focused packages that compose together. The downside is complexity. The upside is you're standing on the shoulders of thousands of developers.

## Why projects break over time

You build something, it works, you don't touch it for six months, you come back, it's broken. Why?

**1. Dependency updates introduced bugs**

You specified `"axios": "^1.6.0"`. That `^` means "1.6.0 or any compatible newer version." Six months later, npm installed 1.7.2, which has a bug that affects your code.

**2. A transitive dependency changed**

You didn't update anything, but a package you depend on updated one of its dependencies. Now something deep in the tree is different.

**3. Node.js version changed**

You updated Node.js on your computer. The new version handles something differently. Or a package requires a newer Node version than you have.

**4. The ecosystem moved on**

The package you depend on is no longer maintained. A security vulnerability was found. The community moved to a different solution.

## Lock files: freezing versions

This is why `package-lock.json` (npm) or `yarn.lock` (Yarn) or `pnpm-lock.yaml` (pnpm) exist.

The lock file records the exact version of every package installed, including transitive dependencies. When you run `npm install` with a lock file present, npm installs those exact versions instead of resolving "compatible" versions.

**Always commit your lock file.** It ensures everyone on your team (and your production server) has identical dependencies.

## Common dependency problems and fixes

**"Module not found" error**
```bash
# You forgot to install
npm install

# Or a package is missing
npm install the-missing-package
```

**"Conflicting peer dependency" warnings**
Package A wants React 17. Package B wants React 18. npm is warning you about the conflict. Usually you can ignore warnings. If things break, you need to find compatible versions.

**"Vulnerabilities found" after npm install**
```bash
# See what's vulnerable
npm audit

# Try to fix automatically
npm audit fix

# Nuclear option (might break things)
npm audit fix --force
```

**Project works for teammate but not you**
```bash
# Delete everything and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

## Dependencies vs devDependencies

```json
{
  "dependencies": {
    "react": "^18.2.0"      // Needed to run
  },
  "devDependencies": {
    "typescript": "^5.0.0"  // Needed to build, not run
  }
}
```

**dependencies**: Required for your app to work in production. React, Express, your database driver.

**devDependencies**: Only needed during development. TypeScript, testing libraries, linters. Not included in production builds.

Install to the right place:
```bash
npm install react           # Goes to dependencies
npm install -D typescript   # Goes to devDependencies
```

## Keeping dependencies healthy

**Update regularly, carefully**: Small updates often are safer than one big update after two years.

**Read changelogs before major updates**: A jump from v1 to v2 often has breaking changes.

**Use `npm outdated` to see what's old**:
```bash
npm outdated
```

**Pin exact versions for critical stuff**: Change `"^1.6.0"` to `"1.6.0"` if stability matters more than getting updates.

**Have tests**: The only way to know if an update broke something is to test it.

## The supply chain security angle

Every dependency is code you're trusting to run in your project. That code could:
- Have bugs
- Have security vulnerabilities
- Be malicious (rare but it happens)
- Disappear (maintainer deletes the package)

See [slopsquatting](/glossary/slopsquatting/) for how AI-generated code can accidentally install malicious packages with hallucinated names.

Some protections:
- Use popular, maintained packages
- Check download counts and maintenance activity
- Use `npm audit` to catch known vulnerabilities
- Use lock files to prevent surprise updates
- Consider tools like Socket.dev or Snyk for supply chain monitoring

## Further reading

- [What is npm?](/glossary/npm/): The package manager that handles all this
- [What is Node.js?](/glossary/nodejs/): The runtime that makes JavaScript work outside browsers
- [Slopsquatting](/glossary/slopsquatting/): A supply chain attack involving AI-hallucinated packages
