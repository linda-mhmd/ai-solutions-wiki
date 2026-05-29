# NotebookLM Image Prompts — Basics Section

**Purpose:** Generate cinematic hero images for ai-solutions.wiki's Basics articles.  
**Target tools:** Midjourney v6 / Ideogram v2 / DALL-E 3 (prompts are compatible with all three).  
**Aesthetic system:** Editorial technical photography. Cream, charcoal, rust. No AI slop.

---

## Part 1 — NotebookLM Custom Instruction

> Paste this into the NotebookLM notebook settings as your custom instruction before uploading any sources.

---

```
You are an art director for an award-winning technical editorial publication — think Wired magazine, Monocle, and the early era of IBM design manuals combined. Your job is to generate cinematic image prompts for a knowledge wiki about AI and software engineering.

AESTHETIC RULES (strict):
- All images must feel like editorial photography of real physical objects, not digital illustration.
- Color palette: warm cream (#faf8f4), deep charcoal (#1a1a1a), rust/terracotta accent (#b8622a), aged copper, dark oak, amber light.
- Lighting: single directional source — either warm tungsten studio light or cool north-facing window light. No gradients, no neon, no lens flare.
- Subjects: physical objects photographed beautifully. Macro of real hardware. Overhead architectural shots. Long-exposure server rooms. Printed circuit boards under directional light.
- Composition: editorial flat lay, architectural long-shot, or tight macro. Always one clear subject. Rule of thirds.
- Camera: Hasselblad medium format, 80mm, f/2.8 depth of field. Or: large format 4x5, studio strobe.
- Mood: quiet, precise, considered. The feeling of a laboratory at 6am before anyone else arrives.

STRICTLY FORBIDDEN (will make the image look like AI slop):
- Glowing human brain floating in space
- Blue or purple neon light trails
- Digital matrix falling text
- Abstract "data sphere" or "neural web" graphics
- Lens flare / bokeh overload
- Glass morphism / frosted glass effect
- Rocket ships as metaphors for technology
- Diverse hands all reaching toward a glowing object
- Dramatic stormy skies behind server farms
- City skylines with holographic overlays
- Any text rendered inside the image (it will be illegible)
- Chrome, silver, or white backgrounds (use cream, linen, charcoal, or dark wood instead)

OUTPUT FORMAT:
For each article, output exactly two prompts:
1. HERO — full-width editorial photograph (16:9 aspect ratio)
2. DETAIL — tight macro or architectural detail (4:3 or 1:1 aspect ratio)

Prompt format: [subject description], [lighting description], [camera and lens], [mood/feel], [aspect ratio], --style raw --v 6 --q 2

Always end with: --style raw --v 6 --q 2 (for Midjourney) or add "photorealistic, editorial photography, no digital effects" (for DALL-E 3 / Ideogram).

When given a wiki article as a source, read the core concept, identify the best real-world physical metaphor for that concept, and generate two prompts using the aesthetic rules above.
```

---

## Part 2 — Article-by-Article Prompts

All prompts ready to paste directly into Midjourney, Ideogram, or DALL-E 3.

---

### What is a Computer?

**Core concept:** A machine that executes instructions. CPU, memory, storage — three things.

**HERO**
```
Disassembled vintage IBM PC motherboard laid flat on unbleached linen, overhead editorial flat lay, single tungsten studio light from upper left casting precise shadows across solder traces and chip legs, cream and gold and dark green PCB tones, dust particles visible in beam, Hasselblad 80mm f/4, still life photography, quiet precision, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Extreme macro of Intel CPU pins arranged in perfect grid, warm amber side lighting, shallow depth of field with only center row in focus, dark charcoal background, oxidised copper and silicon tones, Hasselblad macro, no digital effects, editorial product photography, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is AI?

**Core concept:** Pattern recognition from data. Training vs inference. LLMs as a specific shape of that.

**HERO**
```
Vintage IBM 700-series mainframe room shot from low angle looking down a long corridor of cabinets, cool fluorescent overheads with warm incandescent spill from open panel, operator in silhouette at far end, highly detailed mechanical panels and cables, architectural photography, Linhof 4x5 large format, muted teal and cream and charcoal, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of handwritten mathematical notation on pale cream graph paper, partial differential equations and sigmoid curve sketched in brown ink, warm directional reading lamp, slight paper texture visible, scholarly editorial photography, --ar 4:3 --style raw --v 6 --q 2
```

---

### What is an API?

**Core concept:** A contract between two systems. Request, response, structured data in between.

**HERO**
```
Vintage 1960s telephone exchange switchboard, rows of copper jacks and patch cables, warm amber light from operator's desk lamp, operator hands mid-connection visible from behind, dramatic chiaroscuro, dark oak cabinet housing, editorial documentary photography, Leica M11, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Tightly coiled telephone cable connector ends, cold overhead fluorescent light, cream and copper and dark rubber tones, overhead flat lay on dark slate surface, macro Hasselblad, still life, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is a Server?

**Core concept:** A computer that runs continuously waiting for requests. Racks, uptime, scale.

**HERO**
```
Long aisle of colocation server racks, 30-second long exposure, blue-white operational LEDs blurred into horizontal light streaks, dark industrial ceiling above, perfect geometric repetition, forced perspective, architectural photography, tripod-mounted Nikon Z9, minimal colour, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of server rack cable management panel, dense organised CAT6 cables sorted by colour — cream, rust, charcoal — neat zip-tie bundles, cool overhead data centre light, editorial macro, precision and order, Hasselblad 120mm macro, --ar 4:3 --style raw --v 6 --q 2
```

---

### What is the Internet?

**Core concept:** Packets travelling across global infrastructure. Submarine cables, protocols, routing.

**HERO**
```
Cross-section of a submarine fibre optic cable cut open and displayed on dark slate, concentric rings of glass filaments and armoured steel, cold north-facing studio window light, overhead close-up, scale ruler beside it for reference, museum-quality object photography, Sinar 4x5, cream and silver and blue-grey, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Single optical fibre strand lit from one end, showing internal light propagation, extreme macro, dark black background, warm amber light entering left, brilliant white core with soft gold cladding glow, Hasselblad macro lens, editorial science photography, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is Code?

**Core concept:** Instructions written in a language a computer can follow. Abstraction from machine code to English-like syntax.

**HERO**
```
Olivetti Lettera 32 typewriter with a sheet of paper half-typed, monospaced text visible, warm tungsten desk lamp from upper right, dark oak desk with scattered pencils and eraser dust, 1960s editorial office photography, Leica M6, film grain, cream and charcoal and warm amber tones, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of typewriter typebars mid-strike frozen in motion, cream paper, mechanical arms converging on a single point of impact, warm studio strobe freeze shot, Hasselblad 80mm, dark background, beautiful mechanical chaos, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is a Terminal?

**Core concept:** Text interface to control the machine directly. Looks intimidating, is just fast.

**HERO**
```
Vintage DEC VT100 terminal glowing amber phosphor in a dark room, single source of light from the screen itself illuminating the desk edge and keyboard, a coffee cup beside it, late night hacker aesthetic but quiet and editorial, documentary photography, Fujifilm X-T5 with 23mm, grain, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Extreme close-up of amber phosphor CRT terminal screen showing monospace text characters, slight scan-line texture visible, warm amber glow, dark vignette, macro photography, glass surface texture, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is a Database?

**Core concept:** Organised storage and retrieval. Tables, indexes, queries — structured memory.

**HERO**
```
Rows of vintage library card catalogue drawers filling the entire frame, warm side light from arched reading room window, each brass handle catching the light, deep receding perspective, architectural documentary photography, Linhof Technika 4x5, cream and brass and dark oak, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Single open card catalogue drawer, rows of index cards with typed tab headers visible, slight motion blur from drawer being opened, warm reading room light from above, editorial macro, cream cards and dark wood, Hasselblad 80mm f/2.8, --ar 4:3 --style raw --v 6 --q 2
```

---

### What is Version Control?

**Core concept:** Tracking every change ever made. History, branching, the ability to go back.

**HERO**
```
Architectural drawings on drafting table, multiple translucent tracing paper overlays showing design evolution, warm drafting lamp positioned to illuminate all layers simultaneously, pencil marks and revision notes visible, overhead editorial flat lay, Hasselblad H6D, cream and graphite and amber light, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Overhead close-up of tree branch structure inked in black on cream paper, single trunk splitting into multiple branches spreading across the page, drafting pen and correction fluid beside it, north-facing window light, flat lay, documentary editorial, Hasselblad macro, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is Git?

**Core concept:** Distributed version control. Commits, branches, merge. Every developer's working foundation.

**HERO**
```
Large botanical diagram of an oak tree showing branching structure on aged paper, hung on dark plaster wall, single directional museum spotlight from above, handwritten annotations in rust-coloured ink marking branch points, archival documentary photography, Leica Q2, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of fountain pen mid-writing on cream graph paper, ink branching pattern like a commit tree, hand blurred slightly, warm desk lamp, editorial lifestyle, Hasselblad 80mm f/2.8, cream and rust ink and dark wood desk, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is GitHub?

**Core concept:** Git in the cloud, with collaboration tools on top. Pull requests, issues, community.

**HERO**
```
Long communal oak table from directly overhead, six open laptops with warm screens, hands of different people visible working, scattered notebooks and coffee cups, warm tungsten pendant lighting, documentary overhead photography, Hasselblad H6D with 35mm, editorial workplace, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of two paper documents side by side on a desk showing line-by-line annotation and handwritten review comments in red pencil, editorial flat lay, warm reading light, documentary journalism aesthetic, Leica M11 50mm, cream paper and dark pencil and rust correction marks, --ar 4:3 --style raw --v 6 --q 2
```

---

### What is Open Source?

**Core concept:** Software anyone can read, modify, and distribute. The foundation most of the internet runs on.

**HERO**
```
Large architectural blueprint plans unrolled across wide oak table, four pairs of hands from different people visible making annotations in pencil at different corners simultaneously, warm overhead drafting lamp, collaborative engineering atmosphere, editorial documentary, Hasselblad H6D overhead, cream blueprint paper and dark pencil and amber light, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Stack of printed technical manuals and specification documents, top manual open to a schematic diagram, warm directional studio light from left, slight lean to the stack, dark background, editorial still life, cream paper and dark print, Hasselblad 80mm macro, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is the Cloud?

**Core concept:** Rented computing infrastructure, billed by the second. Elasticity, regions, shared hardware.

**HERO**
```
AWS data centre exterior shot, brutalist concrete facade with tiny ventilation grilles repeating across the entire building surface, low winter sun casting long horizontal shadows across the facade, no signage visible, architectural photography, Linhof 4x5, charcoal concrete and pale winter sky and rust-orange sun, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Power distribution unit inside server rack, close-up showing orderly rows of white indicator lights against black metal, warm amber one or two indicator faults creating visual tension, editorial macro, cool ambient data centre light, Hasselblad macro lens, industrial precision, --ar 1:1 --style raw --v 6 --q 2
```

---

### What is Vibe Coding?

**Core concept:** Describing what you want in English, letting the AI write the code. New workflow, new skill set.

**HERO**
```
Person at a minimal oak desk, only laptop screen visible from behind shoulder, screen reflected faintly in reading glasses, late afternoon golden hour through tall narrow window backlighting the scene, cup of tea steaming, no clutter, editorial lifestyle photography, Leica Q2, warm amber and deep shadow, contemplative, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of hands hovering above keyboard, terminal window visible on screen below, warm side light catching knuckles and keys, shallow focus on fingertips with screen blurred behind, editorial portrait macro, Hasselblad 80mm f/1.8, cream and charcoal and warm skin tones, --ar 4:3 --style raw --v 6 --q 2
```

---

## Part 3 — Usage Notes

**Midjourney:** Paste the prompt directly into the `/imagine` command. The `--ar`, `--style`, `--v`, `--q` params are native.

**DALL-E 3 (via ChatGPT or API):** Remove the `--` params at the end and add instead: `"photorealistic editorial photography, no digital effects, no text in image, film photography aesthetic"`.

**Ideogram v2:** Remove `--` params. Ideogram has a style selector — choose "Realistic" and set aspect ratio in the UI. Append: `"editorial photography, no CGI, no illustration, no digital art"`.

**Consistency across articles:** Use the same Midjourney seed (`--seed XXXX`) once you find a hero shot you like — this locks the lighting model and makes the series coherent.

**File naming convention:** `basics-[slug]-hero.jpg` and `basics-[slug]-detail.jpg`. Place in `/static/images/basics/` in the Hugo repo.

**Hugo front matter addition:** Once images are generated, add to each article:
```yaml
images:
  - /images/basics/what-is-ai-hero.jpg
```
Hugo reads this for OpenGraph meta tags automatically.
