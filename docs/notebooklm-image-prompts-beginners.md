# NotebookLM Image Prompts — Beginners / Getting Started

**Purpose:** Visual assets for the from-zero layer. People who have never written a line of code, may not know what a file is, and want to understand what AI actually is without being patronised.  
**Aesthetic:** Different from the Basics editorial photography. Warmer, more human, everyday objects. Still no AI slop — but approachable rather than industrial.  
**Target tools:** Midjourney v6 / Ideogram v2 / DALL-E 3

---

## Part 1 — NotebookLM Custom Instruction

> Paste this into the NotebookLM notebook settings as your custom instruction for the Getting Started / Beginners notebook. This is a DIFFERENT instruction from the Basics one — gentler, more human.

---

```
You are a curriculum designer and visual art director for a technical education platform. Your audience is complete beginners — people who have never built software, may not understand what a file is, and are intimidated by technical language. They are intelligent adults who want to understand AI and technology without being talked down to.

Your job is to generate cinematic image prompts for articles that explain foundational concepts to this audience.

AESTHETIC RULES:
- Images must feel warm, approachable, and human — not industrial or cold.
- Show real people learning: hands working, someone reading, a person at a kitchen table with a laptop and coffee.
- Use everyday physical objects as metaphors for technical concepts. Filing cabinet = database. Dictionary = lookup table. Recipe book = algorithm. Post office = internet routing.
- Lighting: warm tungsten indoor light, afternoon window light, reading lamp. Golden hour where appropriate.
- Settings: home office, kitchen table, library reading room, university seminar room, independent bookshop, light-filled workshop.
- Camera: Leica Q2, Fujifilm X-T5, or Canon 5D Mark IV. 35mm or 50mm prime lens. Slight film grain acceptable.
- Colour palette: warm cream, amber, terracotta, deep oak, warm white. No cold or clinical tones.
- Human presence: hands, faces in partial view, a person in soft focus behind the subject.

STRICTLY FORBIDDEN:
- Any of the following make it look like generic stock photography — avoid all of them:
- Person staring at laptop with forced smile
- Diverse stock-photo team around a boardroom table
- Brain with glowing connections
- "Digital transformation" abstract graphics
- Floating holographic interfaces
- Neon blue or purple light trails
- Dramatic city skylines
- Finger pointing at a glowing screen
- Generic "learning" imagery with pencil-on-notebook clichés done badly
- Robot hands shaking human hands

OUTPUT FORMAT:
For each article, output exactly two prompts:
1. HERO — full-width warm editorial photograph (16:9 aspect ratio)
2. DETAIL — tight, intimate close-up (1:1 or 4:3)

Prompt format: [subject description], [setting], [lighting], [camera and lens], [mood], [aspect ratio], --style raw --v 6 --q 2

When given a beginner article as a source, find the most everyday physical metaphor for the concept and build the image around that metaphor. A real object, photographed with intention, is worth more than any digital illustration.
```

---

## Part 2 — New Article Topics (Getting Started Section)

> These 12 articles do not exist yet and need to be written. They fill the gap between "complete newcomer" and the existing Basics section.

---

### Article 1 — What is Software?

**Slug:** `getting-started/what-is-software`  
**Description:** Software is instructions. Hardware is the machine that follows them. Understanding this one distinction unlocks everything else.  
**Pre-requisite for:** What is Code, What is an App, What is AI  
**Suggested level:** 0 (before all Basics articles)

**HERO**
```
Vintage sheet music manuscript on a piano music stand, warm afternoon window light falling across handwritten notation, piano keys visible blurred in foreground, editorial lifestyle photography, Leica Q2 35mm, amber and cream and dark ivory tones, quiet music room atmosphere, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of handwritten musical score, individual notes and bars in black ink on cream manuscript paper, warm reading lamp from upper left, pencil corrections visible in margins, editorial macro, Hasselblad 80mm f/2.8, scholarly and precise, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 2 — What is a File?

**Slug:** `getting-started/what-is-a-file`  
**Description:** A file is a named container for information. Everything on your computer is a file — documents, images, songs, programs. This is the most foundational concept in computing.  
**Pre-requisite for:** What is a Folder, What is a Database, What is Version Control  
**Suggested level:** 0

**HERO**
```
Open wooden filing cabinet drawer filled with neatly arranged manila folders, warm side light from tall office window, fingers mid-reach selecting a folder, depth of field falling off at rear of drawer, documentary workplace photography, Fujifilm X-T5 23mm f/2, amber wood and cream paper and warm shadow, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Single manila folder tab with handwritten label visible, warm desk lamp creating shadow at fold, slight worn edge, cream and amber and dark oak desk surface, editorial macro still life, Hasselblad 80mm, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 3 — What is a Folder?

**Slug:** `getting-started/what-is-a-folder`  
**Description:** A folder is a container for files. They are organised in a tree — folders inside folders. Your entire computer's structure is this tree. Understanding it makes everything from Git to cloud storage make sense.  
**Pre-requisite for:** What is Git, What is the Cloud  
**Suggested level:** 0

**HERO**
```
Physical expanding accordion folder open on wooden desk, interior compartments visible with labelled dividers, warm afternoon window light, a hand sorting papers into sections, editorial lifestyle photography, Canon 5D 50mm f/1.8, warm cream and aged paper and rich oak, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Overhead flat lay of nested document organiser sections, each containing labelled sub-folders, warm side light, clean composition, cream and manila and dark dividers, editorial still life, Leica Q2, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 4 — What is a Browser?

**Slug:** `getting-started/what-is-a-browser`  
**Description:** A browser is a program that fetches documents from the internet and displays them. Chrome, Safari, Firefox, Edge are all doing the same job. Understanding this explains why websites sometimes break, why URLs matter, and how the web actually works.  
**Pre-requisite for:** What is the Internet, What is an API  
**Suggested level:** 0

**HERO**
```
Vintage travel atlas open on a kitchen table beside a steaming coffee mug, morning light through linen curtain, a hand pointing at a city on the map, warm domestic atmosphere, documentary lifestyle photography, Fujifilm X-T5 35mm f/2, cream pages and warm amber light and dark oak grain, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of atlas index page with finger tracing a city entry, printed grid reference, warm reading lamp, editorial macro, slight paper texture, cream and black print and warm skin tone, Hasselblad 80mm, --ar 4:3 --style raw --v 6 --q 2
```

---

### Article 5 — What is a URL?

**Slug:** `getting-started/what-is-a-url`  
**Description:** A URL is a precise address for a resource on the internet. Every page, every image, every API endpoint has one. Breaking a URL into parts (protocol, domain, path, params) makes the whole web legible.  
**Pre-requisite for:** What is an API, What is the Internet  
**Suggested level:** 0

**HERO**
```
Street address number plate close-up on old brick building, warm afternoon side light casting shadow from the numerals, classic European typography, shallow depth of field with street blurred behind, editorial architectural photography, Leica Q2 28mm f/2.8, cream plaster and dark numerals and warm terracotta brick, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Handwritten postal address on cream envelope, black ink fountain pen, warm desk lamp, slight paper texture, postal stamp partially visible in corner, editorial flat lay macro, Hasselblad 80mm, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 6 — What is a Prompt?

**Slug:** `getting-started/what-is-a-prompt`  
**Description:** A prompt is the instruction you give an AI model. The quality of what you get back depends almost entirely on what you put in. This is the single most important skill for anyone using AI tools.  
**Pre-requisite for:** What is Vibe Coding, What is AI  
**Suggested level:** 0

**HERO**
```
Person sitting at a light oak kitchen table with a laptop, hand mid-typing, morning light through tall window, coffee cup beside the laptop, face not visible — focus on hands and keyboard and screen glow, warm domestic calm, editorial lifestyle photography, Fujifilm X-T5 35mm f/1.4, cream and warm amber and dark wood, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a handwritten question on lined notebook paper, fountain pen resting diagonally across the page, warm desk lamp from upper left, neat cursive writing, editorial macro, cream paper and black ink, Hasselblad 80mm f/2.8, --ar 4:3 --style raw --v 6 --q 2
```

---

### Article 7 — Can AI Be Wrong?

**Slug:** `getting-started/can-ai-be-wrong`  
**Description:** Yes, and often confidently so. This is called hallucination. Understanding why it happens — and when to trust AI output versus verify it — is the most important safety skill for any AI user.  
**Pre-requisite for:** What is AI, responsible use of any LLM  
**Suggested level:** 0

**HERO**
```
Printed newspaper correction notice box at the bottom of a broadsheet page, "Correction" header in bold type, warm reading light, editorial journalism photography, Leica Q2, cream newsprint and black type, slight crumple of page, aged paper texture, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Reference encyclopedia open to a page with a small handwritten annotation correcting a printed fact, dark pen ink on cream page, warm reading lamp, scholarly editorial macro, Hasselblad 80mm, slightly worn page edges, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 8 — What is an Algorithm?

**Slug:** `getting-started/what-is-an-algorithm`  
**Description:** An algorithm is a list of instructions for solving a problem. You follow algorithms every day — recipes, directions, IKEA assembly guides. A computer algorithm is the same idea, written precisely enough for a machine to follow.  
**Pre-requisite for:** What is Code, What is AI, What is ML  
**Suggested level:** 0

**HERO**
```
Handwritten recipe card on cream card stock propped on kitchen shelf, ingredients and numbered steps in neat handwriting, warm kitchen afternoon light, cooking scene blurred softly in background, editorial lifestyle photography, Fujifilm X-T5 50mm f/1.8, cream and dark ink and warm amber kitchen tones, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of step-by-step numbered instruction list in printed technical manual, clean typeface on cream paper, warm directional light, single pencil annotation visible, editorial macro, Hasselblad 80mm, --ar 4:3 --style raw --v 6 --q 2
```

---

### Article 9 — What is Data?

**Slug:** `getting-started/what-is-data`  
**Description:** Data is recorded information. Numbers, text, dates, images — all of it is data. Everything AI does starts with data: collecting it, cleaning it, learning patterns from it.  
**Pre-requisite for:** What is a Database, What is AI, What is ML  
**Suggested level:** 0

**HERO**
```
Ledger book open on dark oak desk, columns of handwritten numbers and dates in ink, reading lamp from upper right casting warm shadow, aged pages with slight yellowing at edges, accounting office atmosphere, editorial documentary photography, Leica M11 50mm f/2, cream and warm amber and deep wood grain, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Overhead macro of handwritten survey responses on clipboard, pen marks and tick boxes, some entries crossed out and corrected, warm side light, editorial research photography, Hasselblad 80mm macro, cream paper and dark ink and rust clipboard, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 10 — What is a Model?

**Slug:** `getting-started/what-is-a-model`  
**Description:** A model is a simplified representation of something real. AI models are mathematical summaries of patterns found in training data. The word "model" appears everywhere in AI — this article makes it stop being confusing.  
**Pre-requisite for:** What is AI, What is Fine-Tuning  
**Suggested level:** 0

**HERO**
```
Architect's scale model of a building on drafting table, warm studio lamp illuminating the model from upper left, full building visible with context of blueprints spread around it, editorial architectural photography, Hasselblad H6D 50mm, cream balsa wood and white card and dark drafting table surface, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of architect's scale model floor plan section, individual rooms and corridors visible, warm side light creating depth shadows inside model walls, editorial macro, Hasselblad 80mm f/2.8, cream and white and warm amber cast shadow, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 11 — Why Does Any of This Matter?

**Slug:** `getting-started/why-does-this-matter`  
**Description:** The orientation article. Why a non-developer should care about understanding how software and AI work. What becomes possible when you do. A map of the territory before anything else.  
**Purpose:** First article any absolute beginner reads. Sets the tone of the whole wiki.  
**Suggested level:** 0

**HERO**
```
Person at a sunlit reading table in an independent bookshop, book open, pencil in hand taking notes, tall shelves of books visible behind them out of focus, warm afternoon light through large window, editorial lifestyle documentary photography, Fujifilm X-T5 35mm f/1.4, cream and warm amber and rich dark wood shelves, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Hand holding a pencil above a blank first page of a new notebook, moment before writing, warm desk lamp, clean cream page with faint lines, editorial still life, Hasselblad 80mm f/2, warm amber and cream and dark oak desk, --ar 1:1 --style raw --v 6 --q 2
```

---

### Article 12 — How to Use This Wiki

**Slug:** `getting-started/how-to-use-this-wiki`  
**Description:** A practical guide to navigating the learning paths. How Basics, Guides, Architecture, Patterns, and Tools connect. What order to read things in based on your goal.  
**Purpose:** Navigation article — the second thing a beginner reads.  
**Suggested level:** 0

**HERO**
```
Folded paper road map partially unfolded on passenger seat of a car, warm afternoon window light, a hand pointing at a route, travel atmosphere, editorial documentary photography, Leica Q2 28mm, cream map paper and coloured route lines and warm car interior, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of map legend box with key symbols and their meanings in small print, finger pointing at one entry, warm light, editorial macro, slight paper fold visible, Hasselblad 80mm, cream and black print, --ar 4:3 --style raw --v 6 --q 2
```

---

## Part 3 — Aesthetic Comparison

| Basics section | Getting Started / Beginners |
|---|---|
| Hasselblad large format, 80mm | Fujifilm X-T5 or Leica Q2, 35mm |
| Industrial objects: server racks, circuit boards, switchboards | Domestic objects: filing cabinets, recipe cards, maps, notebooks |
| Cold, precise, quiet laboratory | Warm, inviting, afternoon light |
| One person or no people | Human hands always present |
| Medium format editorial | Lifestyle documentary |
| Charcoal and cream | Amber and cream and terracotta |

---

## Part 4 — Usage Notes

**Midjourney:** Paste prompt directly into `/imagine`. Keep `--style raw --v 6 --q 2` to avoid the default artistic enhancement.

**Seed for series consistency:** After generating the first image you like, copy its seed (click the emoji icon under the image in Discord, or use `--seed` in the web app) and append `--seed XXXX` to all subsequent prompts. This locks the lighting model and colour grade.

**File naming:** `getting-started-[slug]-hero.jpg` and `getting-started-[slug]-detail.jpg`  
**Location in repo:** `/static/images/getting-started/`

**Hugo front matter:** Add to each new article once images are generated:
```yaml
images:
  - /images/getting-started/what-is-a-file-hero.jpg
```

**Writing tone for these articles:** These are not the Basics articles. Write as if explaining to a smart friend who has never touched a computer professionally. No jargon without immediate definition. No "simply" or "just" — those words are condescending to someone genuinely confused. Use physical analogies first, then introduce the technical term.
