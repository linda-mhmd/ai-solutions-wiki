---
title: "Automated Accessibility Audit and Fix Suggestions"
description: "AI-powered accessibility auditing that goes beyond rule-based checkers, understanding context to suggest meaningful fixes for WCAG compliance."
date: 2026-03-28
categories: [Ideas]
tags: [accessibility, wcag, audit, web-development, daily-ai-spark]
last_updated: 2026-05-30
---

Traditional accessibility checkers catch missing alt text and low contrast ratios. They miss contextual issues like alt text that says "image" instead of describing the content, form labels that are technically present but confusingly worded, or navigation structures that are technically valid but practically unusable with a screen reader.

## The AI Approach

Combine a rule-based accessibility scanner with an LLM that evaluates the semantic quality of accessibility attributes. The scanner finds structural issues. The LLM evaluates whether the fixes are actually meaningful - is this alt text descriptive, is this label clear, does this heading hierarchy make sense?

## Three-Step Build

1. **Scan** - Run an automated accessibility scanner (axe-core, Lighthouse) against your pages to identify structural violations.
2. **Evaluate** - For each finding, send the surrounding HTML context to an LLM. Ask it to assess the severity and suggest a specific fix, not just "add alt text" but an actual description of the image based on its context.
3. **Report** - Generate a prioritized report with specific fix suggestions, estimated effort, and WCAG conformance level impact.

## Where It Breaks

The AI cannot see the actual rendered page in most setups, so it reasons about HTML structure rather than visual presentation. Complex interactive widgets may need manual testing with actual assistive technology. AI-suggested alt text may not accurately describe images without a vision model.

## The Production Path

Integrate into CI as a PR check that scans changed pages. Use a vision-capable model to generate alt text for images. Track accessibility score over time and set improvement targets. Combine with periodic manual audits by users of assistive technology.
