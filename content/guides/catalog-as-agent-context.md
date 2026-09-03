---
title: "The Catalog as Agent Context"
description: "A developer portal can answer an agent's questions, not just execute its commands — but retrieval-augmented generation over a software catalog raises an access-control question that scoped action tokens don't, and it is largely unsolved."
date: 2026-09-03
lastmod: 2026-09-03
last_updated: 2026-09-03
categories: [Guides]
tags: ["agents", "rag", "backstage", "platform-engineering", "vector-database", "access-control", "spotify"]
related:
  - guides/backstage-as-an-agent-interface
  - guides/platform-engineering-ai
  - glossary/model-context-protocol
  - guides/agent-identity-and-authorization
  - tools/backstage
---

An agent can relate to a developer portal in two different ways, and they get
conflated constantly because both end with the agent "using Backstage."

The first is acting: the agent calls a scaffolder template, opens a pull
request, provisions a resource. That requires a caller with an identity and a
bounded set of permissions — the subject of
[Backstage as an Agent Interface](/guides/backstage-as-an-agent-interface/),
which covers the scoped service token and the official MCP Actions server.
This guide is about the other relationship: the agent asking the portal a
question and getting an answer grounded in what the organization actually
knows — its catalog entities, its TechDocs, its internal wikis — rather than
in whatever the model's training data happened to contain. That mechanism is
retrieval-augmented generation (RAG), and it raises a
different problem than a scoped action token does. A token is bounded by what
it is allowed to *do*. A retrieval pipeline is bounded — or not — by what it
is allowed to *surface*, and that boundary is much easier to get wrong.

## Acting and grounding are not the same problem

| | Acting | Grounding |
|---|---|---|
| Mechanism | Scoped token calling a specific API/action | Embedding-based semantic search over indexed documents |
| Bounded by | Which actions the token's scope permits | Which chunks the retrieval pipeline is allowed to return |
| Failure mode | Caller performs an action it shouldn't be able to | Caller learns something it shouldn't be able to see |
| Where it's covered | [Backstage as an Agent Interface](/guides/backstage-as-an-agent-interface/) | This guide |

The two get built by different teams on different timelines — action tooling
usually follows a platform team's roadmap for self-service, while a knowledge
assistant tends to start as a side project against TechDocs and the catalog
— and they fail in different ways. A misscoped action token lets an agent
provision something it shouldn't. A misscoped retrieval pipeline lets an
agent (or the person querying it) *learn* something it shouldn't, and because
the output is a synthesized natural-language answer rather than a raw
document, it is much less obvious after the fact that a boundary was crossed.

## How catalog-grounded retrieval actually works

The mechanism is the same one used in any RAG system, applied to a
developer portal's own content:

1. Documentation — TechDocs pages, catalog entity descriptions, wiki
   articles, OpenAPI specs — is split into chunks.
2. Each chunk is passed through an embedding model, which produces a vector
   representing its semantic meaning, and that vector is stored in a vector
   database alongside the chunk.
3. At query time, the user's (or agent's) question is embedded with the same
   model, and the resulting vector is used to find the stored chunks whose
   vectors are closest to it — the ones judged most semantically relevant.
4. Those chunks are inserted into the prompt as context, and the language
   model generates an answer grounded in that retrieved material rather than
   in what it learned during training.

The one open-source Backstage plugin that implements this end to end —
Roadie's `rag-ai` family, covered below — makes the parameters concrete: it
chunks content at a default size of roughly 1,000 characters with roughly
200 characters of overlap between chunks, embeds them via AWS Bedrock or
OpenAI, and stores the vectors in PostgreSQL through the `pgvector`
extension, indexing catalog entities, TechDocs, OpenAPI specs, and Tech
Insights data. That is a reasonably standard shape for a document-grounded
assistant, and it maps directly onto the mechanism above.

Spotify's own production system, described in its engineers' own KubeCon +
CloudNativeCon Europe 2025 talk, follows the same document → embedding
model → vector store pipeline, but with an added re-ranking step between
retrieval and generation, and with embedding, language-model, and re-ranking
calls each routed to a separate third-party API rather than run in-process
— a detail worth knowing if you're estimating what a production-grade
version of this actually costs to run, not just to prototype ([Salman and
Mateu Matesanz, "Building AiKA at Spotify," KubeCon + CloudNativeCon Europe
2025](https://hosted-files.sched.co/kccnceu2025/fe/KubeCon%20AiKA.pdf)).

## Spotify's AiKA: the worked example

AiKA (AI Knowledge Assistant) is the name of both Spotify's internal
knowledge chatbot and the commercial plugin built from it, shipped as part
of Spotify Portal for Backstage — Spotify's paid, hosted distribution built
on top of [Backstage](/tools/backstage/), not the open-source project
itself.
It is listed alongside Data Experience, Soundcheck, RBAC, Skill Exchange,
and Insights as one of Portal's "premium plugins" in Spotify's own
general-availability announcement, dated October 22, 2025 ([Nilsson,
"Spotify Portal is now
GA"](https://backstage.spotify.com/discover/blog/spotify-portal-ga-webinar-october-2025/)).
It is not available to a self-hosted, open-source Backstage instance.

**What it indexes.** By default AiKA draws on TechDocs, Confluence spaces
already indexed by Backstage Search, and software catalog entities, and
Spotify describes it as able to "draw from any source that is indexed by
Backstage Search," with support for custom collators to add others
([Spotify, "Getting Started with
AiKA"](https://backstage.spotify.com/docs/portal/core-features-and-plugins/aika/getting-started)).

**Adoption, as of Spotify's own April 2025 KubeCon talk and a companion
engineering blog post** — both consistent with each other, so quoted
together rather than as a single more-recent figure:

- Over 1,000 Spotify employees used AiKA daily.
- 25% of all employees used it weekly.
- 70% of all employees had used it at least once.
- "86% of \[Spotify's\] weekly active GitHub users are also weekly active
  users of AiKA" — a statement about overlap between two specific groups,
  not a claim that 86% of all employees or all developers use it weekly.

(Sources: [Salman and Mateu Matesanz, KubeCon EU
2025](https://hosted-files.sched.co/kccnceu2025/fe/KubeCon%20AiKA.pdf);
[Spotify, "AI knowledge assistant and data plugins coming to Spotify
Portal"](https://backstage.spotify.com/discover/blog/aika-data-plugins-coming-to-portal/).)

Spotify's own product page for AiKA additionally states that it "has reduced
how long it takes to resolve internal support requests at Spotify by 47%"
and "has saved Spotify employees asking questions more than 6,000 hours in
the past 20 months" ([Spotify, "AiKA x
Portal"](https://backstage.spotify.com/aika-hub/)) — figures worth reading
as Spotify's own reported numbers on its own commercial product page rather
than as an independently audited result, since no methodology is published
alongside them. A separate, more narrowly scoped figure from the KubeCon
talk is easier to place confidence in precisely because it's narrower:
AiKA's Slack-support automation ("Goalie Bot") was deployed to more than 100
support channels and answered roughly 30% of the internal support questions
raised in them.

One claim this page's brief asked to verify — that roughly 80% of Spotify
developers prefer AiKA over other AI tools — could not be confirmed against
any primary Spotify source found during research and is omitted rather than
repeated as fact.

**AiKA is no longer pure retrieval.** Spotify's own changelog records that
MCP actions reached AiKA on April 21, 2026, letting it and other agents
"manage Soundcheck programmatically" rather than only answer questions about
it, and that "AiKA Modes" — purpose-built agents with custom instructions
and their own MCP tool connections — shipped August 5, 2026 ([Spotify,
"Spotify Portal for Backstage
Changelog"](https://backstage.spotify.com/docs/portal/changelog)). The
product itself is moving toward the blended acting-plus-grounding shape
described in the KubeCon talk's own roadmap slide: from "semantic search
with multiple knowledge sources" now, toward "dynamic retrieval source
selection," toward "agentic capabilities with tool integrations." That a
vendor's own trajectory blurs the line doesn't remove it — the retrieval
half and the action half still fail differently, and still need to be
secured differently, even when they ship in the same chat window.

## Is there an open-source Backstage RAG plugin? Yes — read the label first

AiKA and Roadie's `rag-ai` plugin family are two different things built by
two different organizations, and conflating them will send a reader
evaluating self-hosted Backstage looking for a feature that doesn't exist
there.

Roadie's plugin — distributed as `@roadiehq/rag-ai` and companion packages
(`rag-ai-backend`, `rag-ai-backend-embeddings-openai`,
`rag-ai-backend-embeddings-aws`, `rag-ai-storage-pgvector`, and others) —
does implement the chunk-embed-store-retrieve pipeline described above,
against catalog entities, TechDocs, OpenAPI specs, and Tech Insights data,
configurable to use AWS Bedrock or OpenAI for embeddings and PostgreSQL with
`pgvector` for storage ([Roadie, "Backstage AI Assistant - RAG AI
Plugin"](https://roadie.io/backstage/plugins/ai-assistant-rag-ai/)). It is
open source and installable into a self-hosted Backstage instance.

It is also explicitly not a supported product. Roadie added a banner to the
plugin's README stating that "the rag-ai plugin and its modules are a
reference implementation provided for demonstration and educational
purposes," that Roadie "provide[s] minimal support for these components,"
and that they do "not actively maintain or update them" ([RoadieHQ,
`roadie-backstage-plugins` pull request #1940, "Add rag ai
banner"](https://github.com/RoadieHQ/roadie-backstage-plugins/pull/1940)).
Read that as it's written: a working, well-documented example of the
pattern, not a plugin to put into production without expecting to own its
maintenance yourself.

| | AiKA | Roadie `rag-ai` |
|---|---|---|
| Status | Commercial, actively developed | Open source, explicitly a reference implementation |
| Where it runs | Spotify Portal for Backstage only | Self-hosted, open-source Backstage |
| Maintained by | Spotify | Community; not actively maintained by Roadie |
| Beyond retrieval | Yes — MCP actions, custom "Modes" | No — retrieval only |

A self-hosted Backstage instance today has no actively maintained,
production-grade RAG plugin shipped by the project itself or by a vendor
committing to support it. Building catalog-grounded retrieval for a
self-hosted instance currently means either adopting Roadie's plugin with
that caveat in mind, or building the pipeline described above directly
against Backstage Search's existing collators.

## A different security question than acting

The scoped-token model for *acting* — a token whose `accessRestrictions`
name specific plugins and specific actions, described in
[Backstage as an Agent Interface](/guides/backstage-as-an-agent-interface/)
— has a clean mental model: the token can do exactly what its scope lists,
and nothing else. Grounding doesn't have an equivalent, off-the-shelf
answer, for a structural reason: an embedding is just a vector of numbers.
It carries no record of who was allowed to read the document it came from.

Backstage's own permission framework does enforce entity-level
authorization in normal use — a policy can be written so that an entity a
user isn't authorized to read is filtered out of both the frontend and the
API as though it doesn't exist in the catalog at all, exactly as Backstage's
own permissions tutorial demonstrates by walking through a conditional,
ownership-based policy ([Backstage, "Writing a permission
policy"](https://backstage.io/docs/permissions/writing-a-policy/)). A RAG
pipeline built by chunking and embedding catalog and TechDocs content once,
ahead of time, and storing the result in a vector database sits outside
that check unless someone deliberately re-implements it at the retrieval
layer — tagging each chunk with the access policy of its source at index
time, and filtering retrieval results against the querying user's
permissions before they ever reach the language model. Left unfiltered, the
vector store will return whatever is semantically closest to the query,
regardless of who's asking, and a general RAG-security write-up from
Pinecone (a vector-database vendor, so not a disinterested party, but
describing a widely documented failure mode) puts the underlying problem
plainly: because embeddings carry no access-control metadata by default, an
unfiltered retrieval layer becomes "sensitive information disclosure" — one
of the categories OWASP's own top risks for LLM applications names
explicitly ([Pinecone, "RAG with Access
Control"](https://www.pinecone.io/learn/rag-access-control/)). Whether a
given retrieval query is coming from a person or from an agent doesn't
change this — it changes only how quickly and how many times the question
can be asked.

This is not a solved problem in the Backstage ecosystem specifically.
Roadie's own `rag-ai` plugin is explicitly a reference implementation, not a
hardened one, and its documentation does not present entity-level,
per-user-filtered retrieval as a solved feature. Spotify's own KubeCon talk
is candid about related rough edges even in a production system run at
scale for over a year — its "Learnings & Challenges" slide states plainly
that "vector search is coarse," that "more context is not that much
better," and that "every data source/format needs special consideration"
([Salman and Mateu Matesanz, KubeCon EU
2025](https://hosted-files.sched.co/kccnceu2025/fe/KubeCon%20AiKA.pdf)).
None of that is the same claim as "AiKA leaks entities to unauthorized
users" — Spotify does not say that, and this page does not either — but it
is evidence that even a mature deployment treats retrieval quality and
scope as an open, ongoing engineering problem rather than a checkbox. Before
grounding an agent in a catalog that contains anything more sensitive than
public documentation, the question to answer first is not "does retrieval
work," but "can retrieval return something to this caller that the catalog's
own permission framework would have hidden from them everywhere else" — and
for most self-hosted setups today, the honest answer is that nobody has
checked.

## Sources

1. Spotify, "AiKA x Portal": [https://backstage.spotify.com/aika-hub/](https://backstage.spotify.com/aika-hub/)
2. Spotify, "AI knowledge assistant and data plugins coming to Spotify Portal": [https://backstage.spotify.com/discover/blog/aika-data-plugins-coming-to-portal/](https://backstage.spotify.com/discover/blog/aika-data-plugins-coming-to-portal/)
3. Majd Salman and Jofre Mateu Matesanz (Spotify), "Building AiKA at Spotify: Leveraging Internal Knowledge," KubeCon + CloudNativeCon Europe 2025: [https://hosted-files.sched.co/kccnceu2025/fe/KubeCon%20AiKA.pdf](https://hosted-files.sched.co/kccnceu2025/fe/KubeCon%20AiKA.pdf)
4. Spotify, "Getting Started with AiKA": [https://backstage.spotify.com/docs/portal/core-features-and-plugins/aika/getting-started](https://backstage.spotify.com/docs/portal/core-features-and-plugins/aika/getting-started)
5. Spotify, "Spotify Portal for Backstage Changelog": [https://backstage.spotify.com/docs/portal/changelog](https://backstage.spotify.com/docs/portal/changelog)
6. Pia Nilsson (Spotify), "Spotify Portal is now GA": [https://backstage.spotify.com/discover/blog/spotify-portal-ga-webinar-october-2025/](https://backstage.spotify.com/discover/blog/spotify-portal-ga-webinar-october-2025/)
7. Roadie, "Backstage AI Assistant - RAG AI Plugin": [https://roadie.io/backstage/plugins/ai-assistant-rag-ai/](https://roadie.io/backstage/plugins/ai-assistant-rag-ai/)
8. RoadieHQ, `roadie-backstage-plugins`, pull request #1940 ("Add rag ai banner"): [https://github.com/RoadieHQ/roadie-backstage-plugins/pull/1940](https://github.com/RoadieHQ/roadie-backstage-plugins/pull/1940)
9. npm, `@roadiehq/rag-ai-backend`: [https://www.npmjs.com/package/@roadiehq/rag-ai-backend](https://www.npmjs.com/package/@roadiehq/rag-ai-backend)
10. Backstage, "Writing a permission policy": [https://backstage.io/docs/permissions/writing-a-policy/](https://backstage.io/docs/permissions/writing-a-policy/)
11. Pinecone, "RAG with Access Control": [https://www.pinecone.io/learn/rag-access-control/](https://www.pinecone.io/learn/rag-access-control/)

## Further reading

- [Backstage as an Agent Interface](/guides/backstage-as-an-agent-interface/): the acting half of this same distinction — scoped tokens and the MCP Actions server for driving scaffolder templates
- [Building an ML/AI Internal Developer Platform](/guides/platform-engineering-ai/): what to build in an internal developer platform — including the catalog this guide grounds retrieval in
- [Model Context Protocol](/glossary/model-context-protocol/): the transport AiKA now uses for its action-taking half
- [Agent Identity and Authorization](/guides/agent-identity-and-authorization/): why a scoped identity matters once an agent can act, not just retrieve
- [Backstage](/tools/backstage/): the open-source project both AiKA and Roadie's plugin build on top of
