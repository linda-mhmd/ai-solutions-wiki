---
title: "White Space and Visual Hierarchy - How to Make Interfaces Feel Designed"
description: "Learn the vocabulary of spacing, grouping, and hierarchy so you can direct AI coding tools to build interfaces that feel professional, not cluttered."
date: 2026-06-22
categories: [Guides]
tags: ["design", "ui", "spacing", "visual-hierarchy", "accessibility", "vibecoding"]
tools: []
related: ["guides/designing-across-ios-android-web", "guides/from-mockup-to-prototype", "guides/mobile-navigation-patterns"]
last_updated: 2026-06-22
---

When a screen "looks off" but you cannot say why, the problem is almost always spacing, grouping, or hierarchy. These three things are not taste. They follow rules you can learn, and once you know the words for them, you can ask an AI coding tool to fix the layout precisely instead of guessing. This guide gives you that vocabulary.

<figure class="bz-figure">
  <img src="/img/wardrobe/imposing-grid-discipline.png" alt="A precise grid of fabric swatches with even spacing between each, mounted on a dark wall. No em-dashes." loading="lazy">
  <figcaption>Even gaps and consistent alignment turn a wall of swatches into a system: the same discipline makes an interface read as designed.</figcaption>
</figure>

Most "designed" interfaces are not more decorated than amateur ones. They are calmer. The professional version uses fewer sizes, fewer colors, and consistent gaps. The amateur version crams everything together with random spacing. Below, you will learn how the eye scans a screen, the spacing scale that keeps gaps consistent, and the grouping rules that make related things read as related.

## How the eye scans a screen

The eye does not read a screen left to right like a paragraph. It jumps to the loudest element first, then follows a path you can design. Your job is to make the most important thing the loudest, then guide the eye from there.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">1</span><span class="bz-flow-step-name">Largest element</span><span class="bz-flow-step-desc">The eye lands on the biggest or highest-contrast thing first. Usually the title or hero.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">2</span><span class="bz-flow-step-name">Primary action</span><span class="bz-flow-step-desc">A single bold button pulls attention next. There should be only one per screen.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">3</span><span class="bz-flow-step-name">Grouped content</span><span class="bz-flow-step-desc">The eye scans clusters of related text and controls, reading each group as a unit.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">4</span><span class="bz-flow-step-name">Quiet details</span><span class="bz-flow-step-desc">Secondary links and metadata come last, in smaller, lower-contrast text.</span></div>
</div>

When you say "make this the clear primary action," you are telling the tool to give one element more size, weight, and contrast than everything around it, so the eye finds it without searching.

## What white space does

White space is the empty area between and around elements. Designers also call it negative space. It does not have to be white. It is the background showing through the gaps. White space is not wasted space. It is the tool that separates groups, gives the eye places to rest, and signals what belongs together.

Two kinds matter:

- **Macro white space**: the large gaps between major sections, the margins around the whole screen, the room a hero image breathes in.
- **Micro white space**: the small gaps inside a component, the space between a label and its input, the padding inside a button.

When a layout feels cramped, you usually need more of both. The fix is not to delete content. It is to add space. Useful phrases: "increase the spacing between these groups," "this needs more padding," and "give the whole screen more breathing room at the edges."

## The 4pt and 8pt spacing scale

Random gaps are the fastest way to look unprofessional. One gap is 7px, the next is 11px, the next is 14px, and nothing lines up. The fix is a spacing scale: a fixed set of allowed values that every gap, margin, and padding must use.

Most design systems build the scale on multiples of 4 or 8 pixels. Apple's Human Interface Guidelines, Google's Material Design 3, and most component libraries use an 8pt grid with 4pt half-steps. The benefit is consistency. With only six allowed values, every gap relates cleanly to every other gap, and the layout reads as a system.

Define the scale once as design tokens, then reference the tokens everywhere instead of typing raw numbers.

```tsx
// spacing.ts
// One scale, used everywhere. No raw pixel values in components.
export const spacing = {
  xs: 4,   // tight gaps inside a control, label to icon
  sm: 8,   // label to input, chip padding
  md: 16,  // default gap between related elements
  lg: 24,  // gap between groups inside a card
  xl: 40,  // gap between major sections
} as const;

type ProfileCardProps = {
  name: string;
  role: string;
  onMessage: () => void;
};

export function ProfileCard({ name, role, onMessage }: ProfileCardProps) {
  return (
    <div
      style={{
        padding: spacing.lg,            // breathing room inside the card
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,                // consistent gap between rows
        background: "#161616",
        borderRadius: 12,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{name}</h3>
        <p style={{ fontSize: 14, color: "#9a9086", margin: 0 }}>{role}</p>
      </div>
      <button
        onClick={onMessage}
        style={{
          padding: `${spacing.sm}px ${spacing.lg}px`,  // micro white space inside the button
          fontWeight: 600,
          background: "#e0314b",
          color: "#fff",
          border: "none",
          borderRadius: 8,
        }}
      >
        Message
      </button>
    </div>
  );
}
```

Notice that the name and role sit only `xs` (4px) apart, so they read as one unit. The button sits `md` (16px) below them, a larger gap that separates the action from the identity. That gap difference is doing real work. It tells the eye that the name and role belong together, and the button is something else.

## Grouping with Gestalt principles

The reason close-together elements read as "related" is not opinion. It comes from the Gestalt principles, a set of rules about how human perception organizes what it sees, documented by the [Interaction Design Foundation](https://www.interaction-design.org/literature/topics/gestalt-principles). Three of them do most of the work in interface layout.

### Proximity

Elements placed close together are perceived as a group. Elements with more space between them are perceived as separate. This is the proximity principle, and it is the single most powerful spacing tool you have.

In the profile card above, the name and role are close, so they read as one person's identity. If you put 40px between them, they would look like two unrelated lines. The rule for grouping: the space inside a group must be smaller than the space around it. When that breaks, everything blurs into one undifferentiated block.

### Similarity

Elements that share a visual quality, such as the same color, size, or shape, are perceived as belonging to the same category. This is the similarity principle. It is why all your secondary buttons should look identical, and why a destructive action gets a different color. Consistent styling lets the eye sort controls without reading them.

### Common region

Elements enclosed inside a shared boundary, such as a card, a box, or a tinted background, are perceived as a group, even if they sit far apart. This is the common region principle. A card is the most common example. Wrapping a set of fields in a bordered box tells the user "these belong together" more strongly than proximity alone.

When you want grouping, you have three levers. Move things closer (proximity), make them look alike (similarity), or wrap them in a container (common region). Say which one you want: "group these into a card," or "increase the spacing between these groups so they read as separate."

## Visual hierarchy: making importance visible

Hierarchy means showing the user what matters most before they read a word. You build it with four tools, usually combined.

- **Size**: bigger elements feel more important. Headings are larger than body text for this reason.
- **Weight**: bolder text and heavier strokes pull more attention than light ones.
- **Color and contrast**: a saturated, high-contrast element stands out against muted surroundings. This is why a primary button is filled and bright while secondary buttons are outlined or grey.
- **Position**: elements at the top and left of a region, or alone with space around them, read as more important.

A common mistake is making everything important. Three bold headings, two bright buttons, and four colored badges all shout at once, so nothing stands out. Real hierarchy needs contrast: a few loud elements and many quiet ones. To request it, name the levels: "make the title clearly the largest thing, keep the body text quiet, and make Save the only filled button."

## Alignment

Alignment means elements share a common edge or center line. Left edges line up, baselines line up, related items sit on the same invisible grid line. Misalignment is one of the most visible amateur signals, because the eye is extremely sensitive to edges that almost line up but do not.

The fix is usually one of two things. Pick a single edge (most often the left) and align everything to it, or use consistent gaps so a grid emerges. Avoid centering long blocks of text. Centered text has a ragged left edge, which slows reading. Keep body copy left-aligned. Useful phrases: "left-align everything in this column," and "these elements should share the same left edge."

## Contrast for readability

Hierarchy uses contrast to direct attention. Readability uses contrast to make sure text can be read at all, including by people with low vision. These are different jobs, and the second one has a hard rule.

The [WCAG 2.2 standard](https://www.w3.org/TR/WCAG22/) sets the minimum contrast ratio between text and its background at 4.5:1 for normal text, and 3:1 for large text (roughly 24px, or 18.66px bold and above). A ratio is a single number you can check with any contrast checker. Light grey text on a white card often fails this. It looks elegant in a mockup and becomes unreadable on a phone in sunlight.

This is why your "quiet" secondary text still needs enough contrast to clear 4.5:1. Quiet does not mean illegible. When you ask a tool to soften text, add the constraint: "lower the contrast of this metadata but keep it above the WCAG 4.5:1 ratio."

## Cramped versus balanced: symptoms and fixes

Use this table to diagnose a layout that feels wrong and to name the fix precisely.

| | Symptom | Fix |
|---|---|---|
| **Everything touches** | No space between sections | Add `xl` (40px) between major sections |
| **Groups blur together** | Same gap inside and between groups | Make inside-group gaps smaller than between-group gaps |
| **No clear primary** | Several bright buttons compete | Keep one filled button, make the rest outlined or text |
| **Edges almost line up** | Elements offset by a few pixels | Align all to one shared left edge |
| **Text is hard to read** | Low-contrast grey on light background | Raise contrast to at least 4.5:1 |
| **Walls of text** | Dense paragraphs, no breaks | Add line spacing and padding, break into chunks |

## A spacing scale reference

Keep this scale in front of you when directing a tool. Reference tokens by name, not raw pixels.

| Token | Pixels | Typical use |
|---|---|---|
| **xs** | 4px | Label to icon, tight pairs |
| **sm** | 8px | Label to input, chip padding |
| **md** | 16px | Default gap between related items |
| **lg** | 24px | Padding inside a card, gap between groups |
| **xl** | 40px | Gap between major sections |

## Putting it together

A screen feels designed when three things are true. Gaps come from one scale, so nothing is random. Related elements sit close and unrelated elements sit apart, so grouping is obvious. One element is clearly the loudest, so the eye knows where to start. None of this requires decoration. It requires restraint and consistency.

The next time a layout looks off, run the checklist. Are the gaps consistent? Is the space inside groups smaller than the space around them? Is there one clear primary action? Does every edge line up? Does the text clear 4.5:1 contrast? Name the failing one, and you can direct an AI tool to fix exactly that, with words it understands.

## Further reading

- [Gestalt Principles (Interaction Design Foundation)](https://www.interaction-design.org/literature/topics/gestalt-principles): the perception rules behind proximity, similarity, and common region grouping.
- [WCAG 2.2 (W3C)](https://www.w3.org/TR/WCAG22/): the official accessibility standard, including the 4.5:1 text contrast ratio.
- [Material Design 3 (Google)](https://m3.material.io): a full design system built on an 8pt spacing grid, with detailed layout and type guidance.
- [Human Interface Guidelines (Apple)](https://developer.apple.com/design/human-interface-guidelines): Apple's layout, spacing, and hierarchy guidance for iOS and macOS.
- [Nielsen Norman Group](https://www.nngroup.com): research-based articles on visual hierarchy, white space, and scanning behaviour.
- [Designing across iOS, Android, and web](/guides/designing-across-ios-android-web/): how spacing and hierarchy translate across platforms.
- [From mockup to prototype](/guides/from-mockup-to-prototype/): turning a static layout into a working, interactive screen.
- [Mobile navigation patterns](/guides/mobile-navigation-patterns/): applying hierarchy and grouping to navigation specifically.
