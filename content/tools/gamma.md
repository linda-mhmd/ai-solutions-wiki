---
title: "Gamma"
description: "AI-powered presentation and document builder. Generate complete slide decks, documents, and web pages from a text prompt in under two minutes."
date: 2026-06-22
tags: ["presentations", "ai-writing", "slides", "documents", "productivity", "no-code"]
tool_category: "AI"
lastmod: 2026-09-26
last_verified: 2026-09-26
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/boardroom-wireframe-building-notext.png" alt="Dark boardroom table with a red wireframe building hologram floating above it: an AI system turning a brief into a structured presentation." loading="lazy">
  <figcaption>Gamma does what Gamma does: gives the wireframe a skin. A prompt becomes a full deck, complete with hierarchy, layout, and content, before you touch a slide editor.</figcaption>
</figure>

Gamma is an AI-powered presentation and document tool that generates complete, designed slide decks, one-page documents, and web pages from a text prompt or an outline. Unlike traditional presentation software, you start with a brief and get a finished structure. You then refine individual slides rather than building from blank. Gamma's primary audience is knowledge workers who need to produce professional-looking presentations quickly without a designer or a template library.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Output types</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Slide decks</span>
      <span class="bz-arch-chip">Documents</span>
      <span class="bz-arch-chip">Web pages</span>
      <span class="bz-arch-chip-note">All three types export to PDF or can be shared as a Gamma link</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">AI features</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Generate from prompt</span>
      <span class="bz-arch-chip">Generate from outline</span>
      <span class="bz-arch-chip">Import from paste</span>
      <span class="bz-arch-chip">Rewrite slide</span>
      <span class="bz-arch-chip">AI image search</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Design system</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Theme engine</span>
      <span class="bz-arch-chip">Brand kit (Pro)</span>
      <span class="bz-arch-chip">Smart layout</span>
      <span class="bz-arch-chip">Responsive cards</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Integrations</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Google Drive import</span>
      <span class="bz-arch-chip">PowerPoint export</span>
      <span class="bz-arch-chip">PDF export</span>
      <span class="bz-arch-chip">Embed analytics</span>
    </div>
  </div>
</div>

## How Gamma generates a presentation

Gamma has no terminal installation: it runs entirely in a web browser at gamma.app. The AI generation workflow follows a consistent three-step pattern.

**Step 1: Choose your starting point.** Gamma offers three entry paths: generate from a single prompt ("Create a deck explaining vector databases to a board of directors"), generate from a structured outline you paste or type, or import existing content (a Google Doc, a PowerPoint, pasted text). The outline path gives more control over slide count and section order.

**Step 2: Select the number of slides and a theme.** Before generating, you choose how many cards (slides) to produce (typically 6-20) and a visual theme. Theme colors and fonts apply automatically. You can swap the theme after generation without losing content.

**Step 3: Refine card by card.** Every slide opens as an editable card. The AI sidebar lets you rewrite sections, change the layout, search for stock images, or add charts and code blocks. You can drag-and-drop to reorder slides. Each card is independently styled.

## Sharing and presenting

Gamma decks live at a shareable URL. Viewers can see presentation analytics: who viewed, how long they spent on each slide, whether they completed the deck.

```
https://gamma.app/docs/your-deck-slug

# Embed in Notion, Confluence, or a web page:
<iframe src="https://gamma.app/embed/your-deck-slug" 
        width="100%" 
        height="500px" 
        frameborder="0"
        allowfullscreen>
</iframe>
```

For PDF or PowerPoint export, open the deck, click Share, then Download. PowerPoint export preserves the layout as editable shapes, so clients who need a PPTX file can receive one.

## Prompting Gamma effectively

The quality of a generated deck depends heavily on how specific the prompt is. Vague prompts produce generic content.

**Weak prompt:**
```
Make a presentation about AI.
```

**Strong prompt:**
```
Create a 10-slide presentation for a CFO audience explaining why the company should 
invest in a RAG-based internal knowledge base. Include: business case, build vs buy, 
implementation timeline (6 months), risk section, and a call to action. 
Use Austrian regulatory context where relevant. Tone: formal but not academic.
```

The difference: audience, structure, length, tone, and regional context all specified. Gamma's AI uses every constraint you provide.

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Write a precise prompt</span>
    <span class="bz-flow-step-desc">Specify audience, slide count, sections, tone, and any regional context. The more specific, the less editing you do later.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Review the outline</span>
    <span class="bz-flow-step-desc">Before full generation, Gamma shows the outline. Add, remove, or reorder sections before committing to the full slide build.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Generate and select theme</span>
    <span class="bz-flow-step-desc">Generation takes 15-45 seconds. Choose a visual theme or apply a brand kit. Swap themes non-destructively at any point.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Refine and share</span>
    <span class="bz-flow-step-desc">Edit cards, add real data, replace images, then share via link or export to PDF/PPTX for clients who need it.</span>
  </div>
</div>

## Plans and AI credits (as of September 2026)

Gamma sells Free, Plus, Pro, Ultra and Business plans (plus Enterprise). Every AI action, including generating decks and images and editing with Gamma's AI agent, draws on AI credits; no plan has unlimited AI.

| Plan | AI credits | Notes |
|---|---|---|
| **Free** | One-time allowance; does not refresh (up to 2,000 held, 200 per referral) | Up to 10 slides per prompt |
| **Plus** | 1,000 per month | Up to 100 slides per prompt |
| **Pro** | 4,000 per month | Up to 100 slides per prompt, brand kit |
| **Ultra** | 20,000 per month | Early access features such as Studio Mode |
| **Business / Enterprise** | Shared workspace credit pool | Per-member billing, admin controls |

Paid-plan credits refresh monthly and roll over up to twice the plan size; extra credits can be bought. Prices viewed from Austria on 26 September 2026 ([gamma.app/pricing](https://gamma.app/pricing)), per month on annual / monthly billing: Free €0, Plus €8 / €10, Pro €18 / €24, Ultra €77.33 / €86.

## Comparison with alternatives

| | Gamma | Beautiful.ai | Tome (discontinued) | Canva AI | Google Slides AI |
|---|---|---|---|---|---|
| **AI generation** | Full deck from prompt | Templates, smart layout | Full deck from prompt | Image + text fills | Basic autocomplete |
| **Design quality** | High | High | Moderate | High | Moderate |
| **PDF/PPTX export** | Yes | Yes | PDF only | Yes | Yes |
| **Embed analytics** | Yes | No | Yes | No | No |
| **Brand kit** | Pro plan | Yes | No | Yes (paid) | Via Google Workspace |
| **Price (annual)** | from €8/month (Plus) | from €10/month | from €16/month | from €10/month | Free with Google |
| **Best for** | Fast AI decks, sharing links | Branded presentations | Narrative-first | Visual marketing | Collaborative editing |

Tome, once a direct competitor, no longer offers its presentation product; tome.app returned a Vercel "deployment not found" error when checked on 26 September 2026. The Tome column is kept for historical comparison only.

## When not to use Gamma

**Data-heavy financial models**: Gamma does not have a native spreadsheet or live data connection. For decks that pull live figures from Excel, Google Sheets, or a BI tool, PowerPoint, Google Slides, or Rows.com are better choices.

**Complex animation and interactivity**: Gamma cards support basic transitions but not the animation sequencing that tools like Keynote or PowerPoint support. For product demos with step-by-step animations, use a dedicated presentation tool.

**Strict brand control at enterprise scale**: The Pro brand kit works for small teams. Large enterprises with multi-brand identity systems (different logos, palettes, typefaces per region) need a tool like Figma Slides or a CMS-driven presentation system.

**Offline use**: Gamma is entirely browser-based. If your presentation environment has no internet access, you need a native application.

## Further reading

- [Gamma documentation](https://help.gamma.app): Feature guides, AI generation tips, brand kit setup
- [Gamma: how to upgrade your plan](https://help.gamma.app/en/articles/8077107-how-can-i-upgrade-my-gamma-subscription) and [how credits work](https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma): plan list and credit allowances (checked 26 September 2026)
- [Gamma templates](https://gamma.app/templates): Starter templates by use case (pitch deck, report, product brief)
- [Prompt Engineering Best Practices](/guides/prompt-engineering-enterprise/): Principles that apply equally to Gamma prompts and LLM prompts
- [AI Stylist: Vibe Coding](/tools/cursor-ai/): How AI generation tools change the creation workflow
- [Impact Mapping](/guides/impact-mapping/): Structuring the strategic narrative before building the deck
