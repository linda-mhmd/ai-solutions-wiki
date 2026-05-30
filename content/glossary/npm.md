---
title: "npm"
description: "The package manager for Node.js created by Isaac Schlueter in 2010, which established the registry model and semantic versioning conventions that define JavaScript dependency management."
date: 2026-03-28
categories: [Glossary]
tags: [npm, package-manager, Node.js, registry, semantic-versioning, JavaScript, dependencies]
related:
  - glossary/nodejs
  - glossary/semantic-versioning
  - glossary/react
last_updated: 2026-05-30
---

npm is the default package manager for Node.js and the world's largest software registry. Created by Isaac Z. Schlueter in 2010, npm established the conventions for publishing, discovering, installing, and versioning JavaScript packages that the entire ecosystem now depends on. As of 2026, the npm registry hosts over two million packages.

## Origins and History

Isaac Schlueter became heavily involved with Node.js in mid-2009, shortly after Ryan Dahl's initial release. Coming from Yahoo, where he was accustomed to using package managers as part of his development workflow, Schlueter was struck by the absence of a proper dependency management tool for Node.js. An earlier tool called `pm` existed as a simple shell script, but it lacked the features needed for real dependency management [1].

In September 2009, Schlueter began building what he described as "basically what I was doing by hand, to use other people's code, but coded in a Node program" [2]. He released npm's first version on January 12, 2010, marking its integration as the default package manager for Node.js. The name originally stood for "Node Packaged Modules."

npm's design drew inspiration from existing package managers --- CPAN for Perl and PEAR for PHP --- but made several deliberate choices that shaped the JavaScript ecosystem. Most critically, npm installed dependencies locally by default (in a project's `node_modules` directory) rather than globally, allowing different projects to use different versions of the same package without conflict. This avoided the "dependency hell" that plagued system-wide package managers.

In January 2012, Ryan Dahl stepped down as Node.js project lead and handed stewardship to Schlueter, reflecting npm's centrality to the Node.js ecosystem.

## Key Concepts

**The registry.** The npm registry is a centralized database of JavaScript packages. Any developer can publish a package, and any developer can install it with `npm install <package-name>`. This permissionless publishing model enabled explosive ecosystem growth but also introduced supply chain security concerns that the ecosystem continues to address.

**Semantic versioning.** npm adopted and popularized semantic versioning (semver) for JavaScript packages. Version numbers follow the `MAJOR.MINOR.PATCH` convention: major versions indicate breaking changes, minor versions add backward-compatible features, and patch versions fix bugs. The `package.json` file uses range specifiers (`^`, `~`) to express version compatibility, allowing npm to resolve the newest compatible version of each dependency.

**package.json.** Every npm project is defined by a `package.json` file that declares the project's name, version, dependencies, development dependencies, scripts, and metadata. This file serves as both manifest and build configuration, and its `scripts` field became the standard mechanism for defining project-level commands (test, build, start).

**The dependency tree.** npm resolves transitive dependencies recursively --- if package A depends on B, and B depends on C, npm installs all three. The `package-lock.json` file (introduced in npm 5, 2017) records the exact resolved version of every dependency in the tree, ensuring reproducible installs across machines and time.

## npm, Inc. and GitHub Acquisition

As npm's registry grew, Schlueter founded npm, Inc. in 2014 to manage the infrastructure, provide enterprise features (private registries, teams, access controls), and sustain the open-source registry. The company operated a freemium model: public packages were free; private packages and organizational features were paid.

In March 2020, GitHub (a subsidiary of Microsoft) acquired npm, Inc. The acquisition brought the npm registry under the same corporate umbrella as GitHub, enabling tighter integration between source code hosting and package publishing. The public registry remains free.

## Ecosystem Competition

npm's dominance has been challenged by alternative package managers that address its perceived shortcomings. Yarn (Facebook, 2016) introduced deterministic dependency resolution and workspaces for monorepos. pnpm (2017) used content-addressable storage to deduplicate packages across projects. Bun (Jarred Sumner, 2022) integrated a package manager directly into a JavaScript runtime. Despite this competition, npm remains the default package manager bundled with Node.js and the registry all alternatives consume.

## Sources

1. Schlueter, I.Z. (2017). Interview in Increment: Development. https://increment.com/development/interview-with-isaac-z-schlueter-ceo-of-npm/
2. npm Wikipedia entry. https://en.wikipedia.org/wiki/Npm
3. npm Documentation. https://docs.npmjs.com/
4. npm GitHub Repository. https://github.com/npm/cli
