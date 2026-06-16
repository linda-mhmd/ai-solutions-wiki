# AI Solutions Wiki: Learning Platform and Content Plan

Goal: turn the wiki into a free, gamified, deeplearning.ai-style learning experience, plus a steady stream of tested, scientific, well-sourced guides and build ideas. Flagship course is the Gardener Path: learn to build software and AI through the garden metaphor while building and presenting a real project.

## Principles
- Scientific: every claim sourced, a "Further reading" section, dense internal linking, fact-checked against multiple good sources before publishing.
- Free for everyone now. Gamified learning. Progress and scores in localStorage now, login later.
- Reuse existing assets: AI Film Crew screencasts and garden videos (embedded via the `video` shortcode), garden-hub.wiki plant images, freelancer-templates.org icons and design for the project presentation step.
- No emdashes, no emojis. House frontmatter and body conventions.

## Phases

Phase 0 (DONE)
- News section + 13 sourced pages: Fable/Mythos restriction, preparing-for-restrictions, agent-harness, context-engineering (+ vs prompt), agent-memory + Mem0/Zep/Letta + comparison, Higgsfield, n8n.
- `video` shortcode (screencast + metaphor modes) and the 8 AWS service pages (S3, Lambda, Step Functions, Transcribe, Rekognition, Bedrock, MediaConvert, AgentCore) now embed the real console screencast plus a garden-metaphor clip.

Phase 1 (engine): the course engine inside the wiki.
- Lesson layout: embedded video, content, a summary block, an interactive quiz, a per-lesson score, mark-complete, and prev/next.
- Course map: a progress graph of chapters and lessons with their state (locked / available / in progress / mastered), overall progress, per-topic scores, a "focus on these" weak-spots list, and a "continue where you left off" button.
- `static/js/course.js`: localStorage for completion + quiz scores, score computation, and the focus-on logic.
- Seeded with the first Gardener Path chapters so it is demonstrable end to end.

Phase 2 (gardener content): the full Gardener Path.
- Every chapter of the AI Film Crew course as a lesson: video + plant metaphor + garden-hub images + summary + quiz.
- The build-your-own-project track: the learner specifies a real project along the way, builds it layer by layer, and ends by presenting it using freelancer-templates.org icons and design in the colors the user chooses.

Phase 3 (curation): tested guides and build ideas people actually search for.
- Verified step-by-step guides and ideas: Higgsfield workflow, Claude Skills, Notion as a memory backend, and more. Each fact-checked, sourced, cross-linked, with Further reading. Featured demos that were actually tested.

Phase 4 (live Remotion): `@remotion/player` embeds so the actual course compositions play live on pages without rendering to mp4.

Phase 5 (polish + SEO): site-wide `lastmod` freshness fix, Further-reading retrofit on existing pages, an internal-link pass, and JSON-LD cleanup.

Later: login + accounts to sync progress and scores across devices (localStorage is the interim).
