---
title: "AI-Generated Changelogs from Git Commits"
description: "Automatically generate user-facing changelogs by having AI analyze git commit history, pull request descriptions, and issue links."
date: 2026-03-28
categories: [Ideas]
tags: [changelog, git, developer-tools, automation, daily-ai-spark]
last_updated: 2026-05-30
---

Writing changelogs is one of those tasks that everyone agrees is important and nobody wants to do. The result is changelogs that are either absent, months out of date, or unhelpfully terse. Meanwhile, every change is already documented in git commits and pull requests.

## The AI Approach

An LLM reads the git log between two release tags, along with associated PR descriptions and linked issues, and produces a structured changelog grouped by category: new features, bug fixes, breaking changes, and internal improvements.

## Three-Step Build

1. **Extract raw material** - Use the GitHub or GitLab API to pull commits, PR titles, PR descriptions, and linked issues between two tags or dates.
2. **Classify and summarize** - Feed the raw material to an LLM. Prompt it to group changes by type, rewrite developer-facing commit messages into user-facing descriptions, and flag any breaking changes.
3. **Format and publish** - Output the changelog in your preferred format (Markdown, HTML) and optionally commit it to the repo or post it to a release page.

## Where It Breaks

Commit messages that say "fix stuff" or "WIP" give the AI nothing to work with. The output quality directly reflects the quality of your commit history. PRs without descriptions are similarly unhelpful.

## The Production Path

Run as a CI step triggered by release tag creation. Add a human review step before publishing. Include a template that enforces consistent formatting across releases. Teams that adopt this find that it also incentivizes better commit messages, since developers know their messages will be publicly summarized.
