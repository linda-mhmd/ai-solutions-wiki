# Cinematic Image Prompts — Wardrobe & Tailoring Metaphors

**Purpose:** Midjourney-format hero images for wiki articles that explain Git, programming, AI, and software engineering through wardrobe and clothing metaphors.  
**Source decks:** `Sartorial_Systems.pptx` and `The_Midnight_Atelier.pptx`  
**Target tools:** Midjourney v6 / Ideogram v2 / DALL-E 3

---

## Aesthetic System

| Element | Specification |
|---|---|
| Background | Near-black: `#0d0d0d`, dark slate, dark walnut panels |
| Accent colour | Deep cherry red / wine: garments, thread spools, wax seals, lining |
| Lighting | Single warm tungsten source — ceiling pendant, reading lamp, or key light from one side only |
| Surfaces | Dark oak, ebony wardrobe panels, black velvet, charcoal chalk-stripe suiting |
| Camera | Leica M11 50mm, Hasselblad 80mm f/2.8, Fujifilm X-T5 35mm f/1.4 |
| Mood | Dark luxury editorial — Loro Piana campaign meets Stanley Kubrick still |
| Human presence | Hands, silhouettes, partial figures only — never a smiling face looking at camera |
| Grain | Slight 35mm film grain acceptable; no HDR, no digital sharpening |

**STRICTLY FORBIDDEN:**
- Neon or cyberpunk light (blue, purple, green glow)
- Digital UI overlays, holographic screens, floating text
- Bright white or cream backgrounds (this is NOT the Basics/Beginners section)
- Stock photo clichés (diverse team at boardroom, finger pointing at screen)
- Robot hands, brain illustrations, matrix rain
- Any text rendered inside the image
- Any garment that reads as costume, fantasy, or historical period piece — all clothing must be contemporary dark luxury tailoring

---

## NotebookLM Custom Instruction

> Paste this into NotebookLM notebook settings as the custom instruction for any wiki article using the wardrobe metaphor series.

```
You are the art director for a dark luxury editorial publication — the intersection of Monocle, Kinfolk, and a Savile Row house's private lookbook. Your job is to generate cinematic image prompts for a technical wiki that explains software engineering, Git, and AI through wardrobe and tailoring metaphors.

AESTHETIC RULES (strict):
- All images must feel like editorial fashion photography, not tech stock photography.
- Background: near-black (#0d0d0d equivalent). Dark walnut panels, slate, charcoal suiting, black velvet.
- Accent colour: deep cherry red or burgundy wine. Used sparingly — one garment, one spool of thread, one wax seal, one lining. Never the dominant tone.
- Lighting: single warm tungsten source from one direction only. Ceiling pendant over a fitting table. Reading lamp. Side-lit atelier window. Never flat, never neon, never ambient fill.
- Subjects: real tailoring objects — fabric, scissors, thread, measuring tape, patterns, hangers, suit jackets, dress forms. Not digital representations. Not illustrations.
- Human presence: hands and silhouettes only. A tailor's hands cutting fabric. A person's back at a mirror. A silhouette walking through a doorway. Never a face looking at camera.
- Camera: Leica M11 50mm or Hasselblad 80mm f/2.8. Shallow depth of field — one element sharp, surroundings fall off.
- Mood: quiet precision. A skilled artisan's studio at midnight. Work that is never hurried.

STRICTLY FORBIDDEN:
- Neon, cyberpunk, glowing blue/purple/green light
- Holographic interfaces, floating digital text, UI overlays
- White or cream backgrounds (that is a different section of this wiki)
- Smiling people looking at camera
- Robot imagery, brains, data visualisations
- Text rendered inside the image
- Costume or period clothing — all tailoring must be dark contemporary luxury

OUTPUT FORMAT:
For each article, output exactly two prompts:
1. HERO — full-width dark editorial photograph (16:9 aspect ratio)
2. DETAIL — tight, intimate close-up of a craft object or texture (1:1 or 4:3)

Prompt format:
[subject and composition], [specific lighting], [camera and lens], [mood and atmosphere], [aspect ratio], --style raw --v 6 --q 2

When given a software or AI concept, find the most precise wardrobe/tailoring metaphor for that concept, then build the image around that metaphor using only real physical objects. The metaphor must be immediately legible without any text in the image.
```

---

## Concept-by-Concept Prompts

---

### 1. What is a File?

**Metaphor:** A garment bag. A named container that holds exactly one thing — its contents are not visible until you open it.

**HERO**
```
Dark wardrobe interior, single black garment bag hanging on ebony rail, brass zipper catch highlighted by warm overhead pendant light, surrounding garments in soft focus, deep shadow filling the frame edges, single point of light illuminating the bag's surface texture, dark luxury editorial photography, Leica M11 50mm f/1.4, quiet precision, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Extreme close-up of garment bag brass zip pull and name tag label on charcoal fabric, warm tungsten side light, shallow depth of field with tag in perfect focus and zip fading, dark background, editorial macro, Hasselblad 80mm f/2.8, dark luxury still life, --ar 1:1 --style raw --v 6 --q 2
```

---

### 2. What is a Folder?

**Metaphor:** A wardrobe section with dividers — a specific rail or shelf for a category of garments. Folders inside folders = sections inside sections.

**HERO**
```
Dark walk-in wardrobe shot from inside looking out, three distinct rail sections visible — each separated by a dark oak panel divider, different categories of dark garments hanging in each, single overhead pendant light illuminating the centre section, editorial architectural interior photography, Fujifilm X-T5 23mm f/2, charcoal and dark oak and deep shadow, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of dark oak wardrobe divider panel with two rails visible on either side, brass rail brackets catching warm tungsten light, garments visible in shallow focus on each side, editorial interior macro, Hasselblad 80mm f/2.8, dark and precise, --ar 1:1 --style raw --v 6 --q 2
```

---

### 3. What is a Version? / What is a Snapshot?

**Metaphor:** A mirror selfie — a photograph that captures exactly how the outfit looks at this moment in time, not before, not after.

**HERO**
```
Three phone screens displayed on dark velvet surface in a triptych arrangement, each showing a different dark suit combination photographed in a mirror, timestamps visible on each screen, single overhead tungsten pendant casting warm light on the velvet, documentary editorial flat lay, Leica M11 50mm, deep shadow and warm screen glow, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Overhead macro of a single phone screen showing a mirror selfie of a dark jacket, timestamp in corner of screen, screen lying on dark slate surface, warm ambient light catching screen edge, editorial still life macro, Hasselblad 80mm, dark and intimate, --ar 1:1 --style raw --v 6 --q 2
```

---

### 4. What is Git? / What is Version Control?

**Metaphor:** The archive — a wardrobe system that keeps every outfit you have ever worn, indexed by date, so you can return to any point in time.

**HERO**
```
Long dark wardrobe corridor perspective shot, dozens of dark suits and jackets on black velvet hangers receding into deep shadow, each section marked with small date labels, single overhead tungsten light source illuminating the nearest garments, deep receding darkness, editorial architectural photography, Linhof 4x5 with 90mm, charcoal and near-black and warm amber, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of garment hanger with a small handwritten date label in white ink on black card, dark jacket sleeve visible behind, warm directional light from upper right, editorial macro still life, Hasselblad 80mm f/2.8, deep black background, --ar 1:1 --style raw --v 6 --q 2
```

---

### 5. What is a Git Commit?

**Metaphor:** A Polaroid pinned to the wall — a commit is not just a save, it is a snapshot of intent. You label it, you pin it, you can return to that exact state.

**HERO**
```
Cork pinboard covered in Polaroid photographs of dark suits photographed in a mirror, each pinned with a deep red pin, warm tungsten ceiling light casting soft shadow from each photo, atelier studio atmosphere, editorial documentary photography, Leica M11 35mm f/2, dark rich wood wall with cork panel in centre, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of two Polaroid photographs overlapping on cork board, deep red pins holding each, handwritten notes below each photo in white marker, warm directional light, editorial macro, Hasselblad 80mm f/2.8, dark cork and warm cream Polaroid border, --ar 1:1 --style raw --v 6 --q 2
```

---

### 6. What is a Git Branch?

**Metaphor:** Two parallel rails — the main rack holds the approved production wardrobe, while a second rail nearby holds experimental pieces being tested before they are added to the main collection.

**HERO**
```
Two parallel clothing rails side by side in a dark atelier, left rail holds a composed capsule of dark tailored pieces, right rail holds experimental garments mid-construction with pins and unfinished hems visible, single overhead pendant illuminating the centre gap between both rails, dark luxury editorial photography, Hasselblad H6D 50mm, deep black background and charcoal garments, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of the gap between two parallel rails, one dark finished jacket on left rail, one garment mid-construction pinned and half-finished on right rail, warm tungsten light from above, editorial macro, Leica M11 50mm, dark background, --ar 4:3 --style raw --v 6 --q 2
```

---

### 7. What is a Merge?

**Metaphor:** Combining two wardrobes into one curated collection — selecting which pieces from the experimental rail are ready to enter the main archive.

**HERO**
```
Tailor's hands moving a finished jacket from one clothing rail to another, motion caught in warm tungsten key light, the destination rail holding an ordered collection of dark garments, atelier interior, documentary action photography, Fujifilm X-T5 35mm f/1.4, warm amber hands against deep charcoal garments and near-black background, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of two hands transferring a dark jacket on a velvet hanger from right to left rail, fingers and hanger bracket in sharp focus, garments blurred behind, warm side light, editorial macro portrait of hands, Hasselblad 80mm f/2.8, --ar 1:1 --style raw --v 6 --q 2
```

---

### 8. What is a Code Review? / What is a Version Diff?

**Metaphor:** Comparing two suits side by side under a spotlight — a tailor inspects the exact seam where a change was made, not the whole garment.

**HERO**
```
Two identical dark charcoal suits hanging side by side on separate rails, single overhead spotlight trained on the gap between them, tailor's measuring tape draped across the comparison point, dark atelier background, architectural editorial photography, Leica M11 50mm f/2, deep shadow with single bright comparison zone between suits, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Extreme close-up of two jacket lapels held adjacent for comparison, one with a slight seam adjustment marked in chalk, warm directional light from upper left casting the chalk mark into high relief, editorial macro, Hasselblad 80mm f/2.8, dark charcoal fabric and white chalk and warm amber light, --ar 1:1 --style raw --v 6 --q 2
```

---

### 9. What is Local Development?

**Metaphor:** The private fitting room — trying outfits before anyone sees them. What you do in here is safe: rapid iteration, no consequences, immediate feedback in the mirror.

**HERO**
```
Man in dark charcoal suit standing in a moody fitting room before an ornate tall mirror, warm tungsten wall sconce light from one side, dark curtained walls surrounding the scene, figure in silhouette with mirror reflection clearer than the subject, dark luxury portrait editorial, Leica M11 50mm f/1.4, deep shadow and warm amber reflection, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of mirror reflection in fitting room — a dark jacket shoulder and collar in the reflection, edge of the gilt mirror frame visible, warm sconce light catching the fabric texture, editorial macro, Hasselblad 80mm, dark and intimate, --ar 1:1 --style raw --v 6 --q 2
```

---

### 10. What is Deployment?

**Metaphor:** Stepping outside — the exact moment the private experiment becomes public. The door handle is the deployment gate. Once you step out, you're in production.

**HERO**
```
Silhouette of a figure in a long dark coat standing at an open dark wood doorway, warm street lamp light backlighting the scene through the open door, interior darkness contrasting with amber exterior glow, figure mid-step crossing the threshold, dramatic chiaroscuro editorial photography, Leica M11 35mm f/2, near-black interior and warm amber doorway, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a dark gloved hand on a brass door handle, handle mid-turn, warm tungsten light from inside falling across the hand and hardware, dark door panel and darker frame behind, editorial macro, Hasselblad 80mm f/2.8, deep shadow and warm brass catch-light, --ar 1:1 --style raw --v 6 --q 2
```

---

### 11. What is CI/CD?

**Metaphor:** The wardrobe ecosystem — every stitch (commit) triggers an automated inspection. The look is always polished, approved, and ready to walk out the door the moment you turn the handle.

**HERO**
```
Walk-in wardrobe interior from wide angle, arched golden doorway visible at far end as the exit, four distinct wardrobe zones visible with organised dark garments, overhead pendant lights at each zone, deep rich atelier atmosphere, architectural editorial interior photography, Hasselblad H6D 24mm, dark oak panels and charcoal garments and warm amber lighting throughout, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a quality control tag clipped to a jacket collar with a small brass clip, handwritten approval annotation visible, warm directional light, editorial macro still life, Hasselblad 80mm, dark jacket fabric and cream tag and warm brass, --ar 1:1 --style raw --v 6 --q 2
```

---

### 12. What is a Monolith vs Microservices?

**Metaphor:** A jumpsuit versus a capsule wardrobe. The jumpsuit (monolith) is one piece — highly cohesive, but altering the hem requires taking the entire garment to the tailor. The capsule wardrobe (microservices) lets you swap the shirt without replacing the trousers.

**HERO**
```
Split composition: on the left, a single dark wine-red jumpsuit hanging alone on a rail under dramatic spotlight; on the right, four separate garments laid flat — dark shirt, trousers, blazer, waistcoat — each independent, editorial product photography, Leica M11 50mm, near-black background throughout, single overhead tungsten for each half, architectural symmetry, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Overhead flat lay close-up of four separate garment pieces arranged with precise gaps between them — each its own unit, dark charcoal fabrics, warm directional light from upper right casting individual shadows, editorial still life, Hasselblad 80mm f/4 overhead, near-black background, --ar 1:1 --style raw --v 6 --q 2
```

---

### 13. What is an API?

**Metaphor:** The fitting appointment — a structured contract between client and tailor. The client arrives at a specific time (request), states precise measurements (parameters), the tailor delivers the garment to spec (response). Neither party needs to know how the other does their work.

**HERO**
```
Tailor's fitting appointment scene: measuring tape draped precisely over a suited shoulder, tailor's notebook with written measurements visible at the edge, warm overhead atelier pendant light from above, client in dark suit visible as partial silhouette, documentary editorial photography, Fujifilm X-T5 35mm f/1.4, warm amber and deep charcoal, quiet precision, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a tailor's handwritten measurement notebook, columns of figures in dark ink, measuring tape edge visible across the open page, warm desk lamp from upper right, editorial macro, Hasselblad 80mm f/2.8, cream pages and dark ink and warm amber light, --ar 4:3 --style raw --v 6 --q 2
```

---

### 14. What is Clean Code? / Refactoring?

**Metaphor:** The tailor's block — ruthless editing. The piece that looks perfect on a hanger can fail in motion. Refactoring is cutting the bulk without changing the silhouette. DRY: stop buying identical black boots.

**HERO**
```
Tailor's hands using large dark-handled fabric shears to cut a clean line through dark wool suiting cloth on a black cutting table, single overhead tungsten pendant light creating a dramatic pool of light on the cutting zone, surrounding atelier in deep shadow, action frozen, editorial craft documentary photography, Leica M11 50mm f/1.4, near-black background and warm amber cutting light, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Extreme close-up of fabric shears blades mid-cut through dark charcoal suiting, precise cutting line visible, warm directional light from upper left, blade edge and fabric threads in sharp focus, editorial macro, Hasselblad 120mm macro lens, deep black background, --ar 1:1 --style raw --v 6 --q 2
```

---

### 15. What is Technical Debt?

**Metaphor:** The shadows in the wardrobe — clothes piled on the floor, rails overstuffed, a single thread pulled brings the whole thing down. Systems optimised for speed rather than structure accumulate invisible fragility.

**HERO**
```
Dark chaotic wardrobe interior overstuffed with garments, fabrics spilling off rails, one dark red garment tangled in the others as the eye is drawn to it, warm narrow light beam from above illuminating only a fraction of the disorder, deep shadow hiding the extent of the chaos, dark luxury editorial photography, Leica M11 50mm f/1.4, near-black environment with warm single beam, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a single loose thread being pulled from a dark jacket seam, the thread extending into the frame beyond, warm side light catching the thread against the dark fabric, editorial macro, Hasselblad 80mm f/2.8, deep charcoal and a single warm thread catching the light, --ar 1:1 --style raw --v 6 --q 2
```

---

### 16. What is Testing?

**Metaphor:** The wear test — code that looks perfect on a hanger can fail in motion. Unit testing checks the strength of a single zipper. Integration testing ensures the jacket doesn't restrict the shirt underneath. QA gates prove the full system holds up in real-world conditions.

**HERO**
```
Person in dark suit shown in three-quarter movement — coat mid-swing, fabric in motion, dramatic warm tungsten spotlight from one side freezing the motion, dark atelier studio background, editorial fashion action photography, Leica M11 50mm f/1.4, deep shadow and warm amber garment in motion against near-black, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a jacket zipper being tested — a hand pulling the zip slider, teeth visible in precise focus, warm directional light from upper left, dark garment fabric and silver zip hardware, editorial macro product photography, Hasselblad 80mm f/2.8, --ar 1:1 --style raw --v 6 --q 2
```

---

### 17. What is a Backup? / What is a Rollback?

**Metaphor:** The archive shelf — production environments are unpredictable. If the weather changes abruptly, you must be able to return to a stable, known-good look. Backups are your archived garments.

**HERO**
```
Dark wardrobe shelving unit with neat stacks of folded dark garments on each shelf, small handwritten label tags visible on each stack, single warm overhead pendant light illuminating the centre shelves, surrounding shelves fading into shadow, editorial interior documentary photography, Fujifilm X-T5 35mm f/2, dark oak shelving and charcoal folded fabric and warm amber light, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of one folded dark jacket on a shelf with a small white label tag tied with thin cord, label text not legible but presence clear, warm directional side light, dark oak shelf surface below, editorial macro, Hasselblad 80mm f/2.8, --ar 1:1 --style raw --v 6 --q 2
```

---

### 18. What is Vibe Coding? / AI-Assisted Development?

**Metaphor:** The AI Stylist — instead of sewing stitch by stitch, you describe the vibe ("something dark, structured, for a winter occasion") and the stylist presents a fully assembled outfit. Development shifts from implementation to curation and intent.

**HERO**
```
Person seated in dark leather atelier chair with arms loosely gestured outward as if describing something, dark garments seemingly suspended mid-arrangement around them in warm lamplight, atelier interior with dress forms visible behind, dark luxury lifestyle editorial, Leica M11 50mm f/1.4, deep warm amber interior against near-black background, quiet authority, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of an open sketchbook with a brief handwritten description — just a few lines of text, pencil, on cream paper — warm desk lamp, no full garment visible, the description is the only subject, editorial still life macro, Hasselblad 80mm, cream page and dark ink and warm amber light, --ar 4:3 --style raw --v 6 --q 2
```

---

### 19. What is Technical Debt from AI Coding?

**Metaphor:** The cluttered closet — the AI can acquire pieces faster than you can comprehend them. Without architectural discipline, the wardrobe becomes immediately overwhelming. The code works, but the system has no coherence.

**HERO**
```
Overstuffed dark wardrobe interior bursting with crammed garments, rails at capacity, items pushed in from all angles creating visual chaos, warm narrow tungsten beam from above revealing only a portion of the disorder, deep shadow beyond, editorial dark photography, Leica M11 35mm f/2, near-black and warm amber beam on chaos, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of multiple garment tags tangled together in a cramped rail space, dark fabrics overlapping, tags and hangers intertwined, warm side light revealing the complexity, editorial macro, Hasselblad 80mm f/2.8, dark chaotic detail in warm amber light, --ar 1:1 --style raw --v 6 --q 2
```

---

### 20. What is the SDLC? (Software Development Lifecycle)

**Metaphor:** From moodboard to pavement — every garment begins with an idea board, moves through pattern-making and cutting, to fitting and adjustment, and finally walks out the door.

**HERO**
```
Atelier table showing five objects in a horizontal progression from left to right: mood image pinned to corkboard, paper pattern pieces, cut fabric pieces, half-assembled jacket, finished jacket on wooden hanger, single overhead pendant light illuminating the full sequence, editorial documentary flat lay, Hasselblad H6D 50mm overhead, dark table surface and warm amber light, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Overhead close-up of paper garment pattern pieces arranged on dark cutting table, chalk marks and notched edges visible, warm directional overhead lamp creating precise shadows at pattern edges, editorial overhead still life, Hasselblad 80mm f/4, cream pattern tissue and dark table and warm amber chalk lines, --ar 1:1 --style raw --v 6 --q 2
```

---

### 21. What is Agile?

**Metaphor:** The active fitting — iterative adjustments with the client present. Each sprint is a fitting where you adjust the sleeve length, see how it moves, and pin for the next round. Continuous feedback loop; no cutting before you understand the fit.

**HERO**
```
Tailor fitting a client in a dark suit — tailor's hands actively pinning a sleeve adjustment, client's arm extended slightly to accommodate, warm overhead pendant light illuminating the fitting point, dark atelier background with dress forms visible in shadow, editorial documentary craft photography, Fujifilm X-T5 35mm f/1.4, warm amber hands and dark suit, quiet focused action, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of tailor's fingers pinning a seam adjustment with a silver pin, dark charcoal wool fabric pulled precisely at the pin point, warm directional side light, chalk mark visible nearby, editorial macro hands, Hasselblad 80mm f/2.8, dark fabric and warm amber pin and skin, --ar 1:1 --style raw --v 6 --q 2
```

---

### 22. What is Waterfall?

**Metaphor:** The seasonal collection — every decision is made before a single stitch is sewn. The pattern is approved, the fabric is cut, the garment is assembled. You cannot revise the pattern once the cloth is cut.

**HERO**
```
Dark velvet stage curtain with a large red wax seal visible in the centre, the curtain still closed, warm overhead theatrical spotlight trained on the seal from above, deep shadow and heavy drape on either side, the moment before an irreversible reveal, editorial theatrical photography, Leica M11 50mm f/1.4, deep burgundy velvet and warm amber seal and near-black surroundings, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a deep red wax seal on dark fabric or paper, intricate impression pressed into the wax, warm single light source from above, sealing the document shut, editorial macro still life, Hasselblad 80mm f/2.8, dark burgundy red and near-black background, --ar 1:1 --style raw --v 6 --q 2
```

---

### 23. What is Human-AI Collaboration?

**Metaphor:** The junior partner — the most effective AI workflow treats the model as a skilled junior in the atelier. You set intent, it executes. You review the fit, you correct the seam. Neither works without the other.

**HERO**
```
Architect or designer at a large dark drafting table at night, sketchbook open with design intent sketched, warm single desk lamp creating a pool of light on the work area, annotations in the margin visible, dark surrounding atelier interior, documentary editorial photography, Leica M11 50mm f/1.4, warm amber desk lamp pool in near-black room, quiet focused precision, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of a hand writing a marginal annotation alongside a sketch, the handwriting looping and precise, warm desk lamp from upper left, dark paper or dark notebook page, editorial macro, Hasselblad 80mm f/2.8, near-black page and warm amber ink and skin, --ar 4:3 --style raw --v 6 --q 2
```

---

### 24. What is a Database?

**Metaphor:** The master archive — a perfectly indexed collection where every garment can be located by any attribute: colour, season, occasion, weight, last worn. Structure makes retrieval possible.

**HERO**
```
Long rows of dark garment bags on floor-to-ceiling ebony shelving unit, each bag tagged with a small label, warm library-style pendant lamps at each shelf level casting amber pools, deep receding archive perspective, editorial architectural interior photography, Linhof 4x5, dark oak shelving and charcoal bags and warm pools of amber light, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of index card system with garment descriptions typed in small black type, one card pulled slightly out of the system, warm reading lamp from above, dark card box and pale card face, editorial macro, Hasselblad 80mm f/2.8, cream cards and dark box and warm amber light, --ar 1:1 --style raw --v 6 --q 2
```

---

### 25. What is a Function? (Programming)

**Metaphor:** A pattern piece — a precisely cut shape that does one thing, used many times. Every jacket uses the same collar pattern. You don't re-draft the collar each time; you cut from the master.

**HERO**
```
Atelier cutting table with a paper pattern piece in focus at centre, scissors resting beside it, duplicate cut pieces of dark fabric showing the pattern has already been used multiple times, warm overhead pendant light on the cutting zone, editorial craft flat lay, Hasselblad H6D overhead, cream pattern tissue and dark fabric and dark cutting table, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of paper pattern piece with notches and grain-line arrow marked, chalk line on dark fabric below where the pattern has been traced, warm directional light, editorial macro still life, Hasselblad 80mm f/2.8, cream pattern paper and dark fabric and warm amber light, --ar 1:1 --style raw --v 6 --q 2
```

---

### 26. What is the Renewable Wardrobe? (AI and Maintainability)

**Metaphor:** As AI models grow more capable, software becomes less of a permanent structure and more of a renewable asset. Maintainability will no longer mean writing code that lasts — it will mean writing code that is easy to replace.

**HERO**
```
Single dark cherry red suit jacket hanging on a simple hook on a dark near-black wall, lit by a single overhead pendant lamp, the rest of the frame in near darkness, the lone garment carrying all the weight of the composition, minimal dark luxury editorial photography, Leica M11 50mm f/1.4, one warm amber pool in near-black space, quiet and considered, --ar 16:9 --style raw --v 6 --q 2
```

**DETAIL**
```
Close-up of the jacket's deep cherry red lining revealed at the lapel fold, rich silk-like fabric against the dark wool exterior, warm tungsten light from upper left illuminating the contrast, editorial macro fashion photography, Hasselblad 80mm f/2.8, deep cherry red lining and dark charcoal exterior, --ar 1:1 --style raw --v 6 --q 2
```

---

## Concept-to-Metaphor Index

| Software Concept | Wardrobe Metaphor | Deck Source |
|---|---|---|
| File | Garment bag — named container | Original |
| Folder | Wardrobe section with dividers | Original |
| Snapshot / State | Mirror selfie | Sartorial Systems |
| Version Control | The archive — every outfit ever worn | Midnight Atelier |
| Git Commit | Polaroid pinned to wall | Midnight Atelier |
| Git Branch | Two parallel rails | Sartorial Systems |
| Merge | Moving pieces from experimental to main rail | Original |
| Code Review / Diff | Two suits side by side under a spotlight | Midnight Atelier |
| Local Development | The private fitting room | Both decks |
| Deployment | Stepping outside | Both decks |
| CI/CD | The wardrobe ecosystem | Midnight Atelier |
| Monolith | Jumpsuit — one piece, cohesive but inflexible | Sartorial Systems |
| Microservices | Capsule wardrobe — independent swappable pieces | Sartorial Systems |
| API | The fitting appointment — structured contract | Original |
| Clean Code / Refactoring | The tailor's block — ruthless editing | Midnight Atelier |
| DRY / YAGNI | Don't buy identical boots / discard hypothetical pieces | Sartorial Systems |
| Technical Debt | The shadows — overstuffed, one thread brings it down | Midnight Atelier |
| Testing | The wear test — unit/integration/QA | Sartorial Systems |
| Backup / Rollback | The archive shelf — stable, known-good look | Sartorial Systems |
| Vibe Coding / AI | The AI Stylist — describe intent, receive outfit | Sartorial Systems |
| AI Technical Debt | The cluttered closet | Sartorial Systems |
| SDLC | Moodboard to pavement | Sartorial Systems |
| Agile | The active fitting — iterative with client present | Midnight Atelier |
| Waterfall | Seasonal collection — locked before first stitch | Midnight Atelier |
| Human-AI Collaboration | The junior partner at the drafting table | Midnight Atelier |
| Database | The master archive with index cards | Original |
| Function | Pattern piece — one shape, used many times | Original |
| AI maintainability | The Renewable Wardrobe | Sartorial Systems |

---

## Usage Notes

**Midjourney:** Paste prompt directly into `/imagine`. Do not remove any flags.

**Seed consistency:** After generating the first image you like, copy its seed and append `--seed XXXX` to all subsequent prompts. This locks the lighting model so the whole series reads as one editorial shoot.

**DALL-E 3:** Remove `--` flags at the end. Append instead: `"editorial fashion photography, no digital effects, no text in image, no neon lighting, dark luxury aesthetic, photorealistic"`.

**Ideogram v2:** Remove `--` flags. Set style to "Realistic" in the UI. Append: `"editorial photography, no CGI, no illustration, no digital art, dark fashion editorial aesthetic"`.

**File naming:** `wardrobe-[concept-slug]-hero.jpg` and `wardrobe-[concept-slug]-detail.jpg`  
**Location in repo:** `/static/images/wardrobe/`

**Hugo front matter:** Once images are generated, add to each article:
```yaml
images:
  - /images/wardrobe/git-commit-hero.jpg
```

**Writing tone for articles using these images:** These images carry the weight of the concept. The article text should be precise and confident — not casual, not overly warm, not patronising. The tone of a tailor explaining their craft to a client who respects good work but does not need to understand how the loom operates.
