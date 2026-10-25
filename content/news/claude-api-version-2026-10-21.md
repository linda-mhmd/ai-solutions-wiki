---
title: "Claude API version 2026-10-21 drops sampling parameters, and the SDKs move to Apache 2.0"
description: "On 21 October 2026 Anthropic released the first new Claude Messages API version since 2023-06-01. Under it, any temperature, top_p or top_k returns a 400 on every model, Admin API fields are renamed, the SDKs take new major versions, and the SDKs and CLI move from MIT to Apache 2.0."
date: 2026-10-21
lastmod: 2026-10-25
last_updated: 2026-10-25
last_verified: 2026-10-25
categories: [News]
tags: [anthropic, claude, claude-api, api-versioning, breaking-change, sdk, licensing, apache-2-0, fast-mode, google-cloud]
related:
  - tools/claude-anthropic
  - tools/claude-code
  - tools/google-vertex-ai
  - tools/amazon-bedrock
  - news/claude-opus-5-5
  - news/claude-haiku-5-5
  - news/claude-sonnet-5-5
---

On 21 October 2026 Anthropic released Claude API version `2026-10-21`, the first new value for the `anthropic-version` header since `2023-06-01`. It came with new major versions of all seven client SDKs and of the `ant` CLI, which send the new version by default, and with a licence change: those releases are under the Apache License 2.0 instead of the MIT License. The most visible break is that `temperature`, `top_p` and `top_k` are gone. Everything in this entry comes from Anthropic's documentation, release notes and package registries; no Anthropic newsroom post about the release appeared on the newsroom index when we checked on 25 October.

## What happened

The release notes for 21 October list the SDK and CLI versions that are the first to send `2026-10-21`:

| Package | First version on 2026-10-21 | Note from the migration guide |
| --- | --- | --- |
| Python (`anthropic`) | 2.0.0 | |
| TypeScript (`@anthropic-ai/sdk`) | 1.0.0 | Provider packages must move to v1 in the same upgrade, see below |
| C# (`Anthropic`) | 13.0.0 | |
| Go | 2.0.0 | Module path is now `github.com/anthropics/anthropic-sdk-go/v2` |
| Java (`com.anthropic:anthropic-java`) | 3.0.0 | |
| PHP (`anthropic-ai/sdk`) | 1.0.0 | Upgrade with `composer require`, see below |
| Ruby (`anthropic` gem) | 2.0.0 | |
| `ant` CLI | 2.0.0 | Module path is now `github.com/anthropics/anthropic-cli/v2` |

The package registries agree on the date: npm records `@anthropic-ai/sdk` 1.0.0 as published at 16:00 UTC on 21 October, and PyPI records `anthropic` 2.0.0 as uploaded at 15:51 UTC the same day.

If you call the API without an SDK, nothing changes until you set the header to `2026-10-21` yourself. If you use an SDK, the guide explains that "your requests use the API version that was current when your SDK's major version was released", so the version changes when you take the new major release.

Anthropic's versioning page now lists `2026-10-21` as available on the Claude API, Claude Platform on AWS, Claude Models on Google Cloud (both the Anthropic-managed and Google-managed offerings) and Microsoft Foundry. On Amazon Bedrock it is narrower. The migration guide's warning reads: "On Amazon Bedrock, `2026-10-21` is available only for Claude 4.7 and later models." The guide tells callers of Opus 4.6 and earlier on Bedrock to stay on the SDK version they use today, or to keep sending the header value they send today.

## What is actually different

### Sampling parameters are removed

The migration guide states it without qualification: "In `2026-10-21`, a request that sends `temperature`, `top_p`, or `top_k` returns a 400 error, even at the parameter's default value." The versioning page adds that it "returns a 400 error on every model."

This is a step beyond what the wiki has described until now. Under `2023-06-01`, Anthropic's deprecations page says these parameters return a 400 only "when set to a non-default value on Claude 4.7 and later models and Claude Mythos Preview". Sending the default was harmless, and older models such as Sonnet 4.6 still honoured a lower temperature. Under `2026-10-21` the parameter itself is the error, at any value and on every model. The new SDK major versions no longer have the three parameters at all.

What sampling looks like afterwards: "Without these parameters, a request samples with their defaults, including a `temperature` of 1.0, the same as a `2023-06-01` request that leaves them out." For Claude 4.7 and later nothing changes in practice, because those models already accepted only the defaults. For older models the guide is direct: on models such as Claude Sonnet 4.6, "a request that lowered `temperature` for more consistent output loses that effect. No other setting replaces it." Its advice is to "either stop sending the parameter, or keep that request on `2023-06-01`."

Anthropic's stated reason is general rather than specific to this release. The deprecations page says it "occasionally deprecates request parameters that no longer apply to current models", and lists prompting as the recommended replacement for all three.

### Two content-block rules

- A `document` block placed directly in an `assistant` message returns a 400. Documents go in `user` messages. A document nested inside another block, such as a web fetch tool result Claude returned, is still accepted.
- A `text` block with a non-empty `citations` array in a `user` message, including inside a `search_result` block, returns a 400. Citations on Claude's own earlier replies that you send back are still accepted, and so is `"citations": {"enabled": true}` on documents and search results.

These rules also apply to token counting and to every request inside a Message Batch created with the new version.

### Admin API and Analytics API field renames

Responses under `2026-10-21` no longer include the old names:

| Endpoint | Old field | New field |
| --- | --- | --- |
| RBAC groups | `roles` | `role_ids` |
| RBAC group members | `group_id` | `rbac_group_id` |
| RBAC roles | `name` | `display_name` |
| Organization and workspace rate limits | `group_type` | `group.type` |
| API keys | `workspace_id` | `scope` |
| Enterprise Analytics per-user usage and cost reports | `actor.email` | `actor.email_address` |
| Enterprise Analytics activity summaries | `summaries` | `data` |

The API key change is more than a rename. Under `2023-06-01` a key bound to the Default Workspace and an all-workspaces key both reported a `null` `workspace_id`. Under `2026-10-21`, `scope.workspace_id` carries the real ID even for the Default Workspace, and an all-workspaces key has a `scope` of `{"type": "organization"}`. Code that treated `null` as "Default Workspace" has to compare against the Default Workspace's actual ID instead. The `group_type` query parameter and the `workspace_id` filter on the list endpoints are unchanged.

### SDK changes that do not depend on the API version

The new major versions carry breaks of their own, listed in the guide's "SDK and CLI changes" section:

- **`MessageParam` becomes a union** of `UserMessageParam`, `AssistantMessageParam` and `SystemMessageParam`, with `BetaMessageParam` split the same way. The guide says the requests the SDK sends have the same fields as before; what breaks is code that constructs, subclasses or type-checks the old single type. The impact differs by language: a TypeScript message literal that names its role type-checks as before, while in PHP "`instanceof MessageParam` is false" and positional calls to `MessageParam::with()` must swap arguments.
- **API keys are sent as `Authorization: Bearer`** instead of `X-Api-Key`. The guide notes that "The Claude API accepts a key in either header", so the API side is fine, but a proxy, gateway, log filter or test stub that reads `X-Api-Key` will stop seeing the key.
- **A client holds one credential.** Earlier versions sent both an API key and an authentication token when a client had both. Now passing more than one credential to a client raises an error in Python, TypeScript, C#, Java, PHP and Ruby, and in Go every request from such a client fails.
- **Removed:** the legacy Text Completions API from the TypeScript, Go, Java and Ruby SDKs and the CLI; client-side compaction in the TypeScript and Ruby tool runners, in favour of server-side compaction; `betas` on the non-beta Models methods; and the CLI's `--api-key` and `--auth-token` flags, which had printed a deprecation warning since CLI 1.27.0.

### Two upgrade traps

**TypeScript provider packages move in lockstep.** The guide says that v1 of `@anthropic-ai/bedrock-sdk`, `@anthropic-ai/vertex-sdk`, `@anthropic-ai/foundry-sdk`, `@anthropic-ai/aws-sdk` and `@anthropic-ai/google-cloud-sdk` "needs v1 of `@anthropic-ai/sdk`, and their earlier versions need a version below 1." If you upgrade the core SDK alone, "your package manager installs a second, older copy of `@anthropic-ai/sdk`" for the provider package. The npm metadata for `@anthropic-ai/bedrock-sdk` 1.0.0 shows the dependency as `>=1.0.0 <2`. Treat these six packages as one family and upgrade them together.

**PHP needs `composer require`.** The guide's instruction is to run `composer require "anthropic-ai/sdk"`, because "`composer update` alone stays within your current version constraint." A project pinned to `^0.x` will not cross to 1.0.0 on its own.

### The old version stays, with no end date published

`2023-06-01` keeps working, and the guide's own fallback for requests that need a non-default temperature is to "keep that request on `2023-06-01`." Anthropic's versioning page says it "recommends using the latest API version whenever possible", but neither the versioning page nor the migration guide gives a retirement date for `2023-06-01`. As of 25 October 2026 none has been published.

### Claude Code can do the migration

Claude Code 2.1.307, published to npm at 20:47 UTC on 21 October, added the command. Its changelog entry reads: "Added `/claude-api api-version` to move Claude API code to API version `2026-10-21`".

### The licence change

The guide's licence section reads: "Starting with the versions under Switch to 2026-10-21, the SDK and the CLI are licensed under the Apache License, Version 2.0. Earlier versions remain under the MIT License." It adds that no code changes are needed, and that the TypeScript provider packages and the C# provider packages change licence in their own 1.0.0 releases.

We checked the registries and repositories on 25 October. npm lists `@anthropic-ai/sdk` 1.0.0 and `@anthropic-ai/bedrock-sdk` 1.0.0 as `Apache-2.0`, and the previous `@anthropic-ai/sdk` 0.137.0 as `MIT`. PyPI classifies `anthropic` 2.0.0 as Apache. The `LICENSE` file on the `main` branch of the TypeScript, Python, Go and CLI repositories is the Apache License 2.0 text, and none of those four repositories has a `NOTICE` file at its root. We did not check the C#, Java, PHP or Ruby repositories.

What Apache 2.0 adds over MIT, from the licence text itself rather than from anything Anthropic has said about its reasons:

- **An explicit patent licence.** Section 3 grants each contributor's patent rights "necessarily infringed" by their contribution, and ends that grant for anyone who sues claiming the work infringes a patent. MIT says nothing about patents.
- **Notice handling.** Section 4 requires redistributors to keep copyright and attribution notices, to mark files they changed, and, if the work includes a `NOTICE` file, to carry its attribution notices forward. MIT asks only that the copyright and permission notice be kept.
- **No trademark grant.** Section 6 states that the licence does not grant use of the licensor's trademarks.

Both are permissive licences that allow commercial use. For most teams the practical effect is an updated row in a dependency licence inventory. Anthropic has not said why it changed, and this entry does not guess.

## The same fortnight on the platform

The release notes for 9 to 22 October carry several other changes builders will meet alongside the version switch.

- **Fast mode for Opus 5.5 is out of research preview (15 October).** No access request, and no `fast-mode-2026-02-01` beta header (requests that still send it keep working). Opus 5.5 has a default fast-mode rate limit in the Start, Build and Scale tiers. The fast-mode page prices it at $8 per million input tokens and $40 per million output tokens, which is twice Opus 5.5's standard $4/$20. Fast mode on Opus 5 and Opus 4.8 stays in research preview at $10/$50 and still needs the beta header. Anthropic describes the gain as "up to 2.5x higher output tokens per second", focused on output speed rather than time to first token; that is Anthropic's figure. The same day it became available on Microsoft Foundry for deployments hosted on Azure.
- **Claude Models on Google Cloud (Anthropic managed) launched (22 October).** The release note describes it as "the Claude API operated by Anthropic and reached through your Google Cloud project. Google Cloud IAM controls access. Google Cloud Marketplace handles billing." Details are below.
- **User profiles (20 October).** New `/v1/user_profiles` endpoints let a platform, gateway or reseller tell Anthropic which end customer each request is for, so that "a safety enforcement action can then apply to one end customer instead of your whole organization." On 21 October the profiles gained `enforcement_status` and `enforcement_actions` fields and an `enforcement_status[]` list filter.
- **Organization webhooks, beta (20 October).** Behind the `webhooks-2026-10-07` header, two event types: a user profile restricted or banned, and that restriction ending. Access is by request through an account team.
- **Organization-level web fetch switch (20 October).** Admins can turn web fetch off on the Console's Capabilities page. "With web fetch off, a Messages API request that includes the web fetch tool fails with a 400 error." In Managed Agents, `web_fetch` calls return an error result to the agent instead.
- **OpenTelemetry export, beta (14 October).** Traces for Messages API requests and Managed Agents sessions. The release note says the SDK "emits spans in Python, TypeScript, C#, Go, Java, PHP, and Ruby."
- **Managed Agents dynamic workflows, beta (9 October).** An agent can write a workflow, "a program that runs many agents in phases and combines their results", which the server runs in the background.

### Two ways to reach Claude on Google Cloud

Until now, Claude on Google Cloud meant the Google-managed offering inside what Google now calls the Gemini Enterprise Agent Platform (formerly Vertex AI): Agent Platform prediction endpoints, the model in the URL, Agent Platform IAM roles, Google-managed rate limits, and no Anthropic organization. The new Anthropic-managed offering is the Claude API itself behind a Google front door:

- Two services to enable per project: `claude.googleapis.com`, which serves the API and defines the IAM permissions, and `anthropic-managed-claude.cloudpartnerservices.goog`, the Marketplace service that attributes usage to the subscription.
- IAM roles `roles/claude.viewer`, `roles/claude.user` and `roles/claude.admin`. Only `roles/claude.admin` opens the Claude Console, and sign-in is through Google Cloud rather than by email address.
- The same request format and model IDs as the Claude API, for example `claude-opus-5-5`, with location fixed at `global`. Fast mode for Opus 5.5 is available here.
- Rate limits managed by Anthropic. Billing through Google Cloud Marketplace in Claude Consumption Units of $0.01 each, counting toward a Google Cloud spend commitment.

Two cautions from the setup page. First, "These steps create a new Anthropic organization for your Google Cloud project. It's separate from any Anthropic organization your company already has. That includes a Claude Enterprise organization." Second, if you have an existing discount, contact your Anthropic or Google Cloud account representative before you start, because "Discounts can't be applied to past usage." We did not verify per-token prices for this route and do not assume they match first-party rates.

### Model lifecycle in the same window

The deprecations page lists `claude-sonnet-4-5-20250929` as deprecated on 30 September 2026, with retirement on 30 November 2026 and `claude-sonnet-5-5` as the replacement. `claude-haiku-4-5-20251001` is still listed as Active with a retirement floor of "Not sooner than October 15, 2026"; that floor has passed and no deprecation notice has been published as of 25 October. The page says these dates apply to Anthropic-operated platforms (the Claude API, Claude Platform on AWS, Claude Models on Google Cloud (Anthropic managed) and Microsoft Foundry), and that Amazon Bedrock and the Google-managed offering set their own retirement schedules.

## Why it matters for builders

Most code on current models will survive this release with small edits, but the failures are 400s, so they show up in production as errors, not as quality drift. The checklist below is ours, built from the guide's breaking changes. It follows the guide's order of work: upgrade, fix the code, test against `2026-10-21`, then release the upgrade and the fixes together.

1. **Strip `temperature`, `top_p` and `top_k`** from every Messages and Batch request, including ones that send the default. Search for wrappers and config files that inject them: a framework adapter can set a temperature you never wrote. The C# `IChatClient` adapter now ignores the three `ChatOptions` values rather than sending them.
2. **Decide what to do about older models that relied on a low temperature.** On models earlier than Claude 4.7 that still accept other values, such as Sonnet 4.6, the effect is gone under the new version and nothing replaces it. Either accept default sampling and re-test output consistency, or keep those specific calls on `2023-06-01`. Note that Sonnet 4.5 retires on 30 November on the Claude API and the other Anthropic-operated platforms in any case.
3. **Check assistant messages for `document` blocks and user messages for non-empty `citations`.** Conversation replay code that copies blocks between roles is where these usually come from.
4. **Update Admin API and Analytics integrations** for the renamed fields, and rewrite any logic that read a `null` API key `workspace_id` as the Default Workspace.
5. **Check proxies and gateways for `X-Api-Key`.** The new SDKs send `Authorization: Bearer`. LiteLLM-style gateways, egress proxies, log redaction and test stubs that look for the old header need updating.
6. **Upgrade TypeScript provider packages together** with `@anthropic-ai/sdk`, and check the lockfile for a second copy of the core SDK afterwards. In Go, change every import path to `/v2`. In PHP, use `composer require`, not `composer update`.
7. **Respect the Bedrock floor.** On Amazon Bedrock, only Claude 4.7 and later models accept `2026-10-21`. A service that calls both old and new models on Bedrock may need two client configurations until the old calls move.
8. **Update your licence inventory** for the new SDK versions: Apache-2.0, not MIT.

Claude Code users can run `/claude-api api-version` to do the mechanical part. Review its diff against this list, especially step 2, where the right answer depends on why the temperature was set in the first place.

Two of the fortnight's other changes deserve attention if they apply to you. If you resell or proxy Claude to many customers, user profiles are the difference between one abusive customer triggering an enforcement action against your whole organization and against that one customer. And if your company is on Google Cloud and already has an Anthropic organization or Claude Enterprise contract, read the new-organization and discount warnings before anyone clicks Subscribe in Marketplace.

## Sources

1. Anthropic, "Migrating to API version 2026-10-21" (21 October 2026, fetched 25 October 2026): https://platform.claude.com/docs/en/api/migration-2026-10-21
2. Anthropic, "Claude Platform release notes", entries for 9 to 22 October 2026 (fetched 25 October 2026): https://platform.claude.com/docs/en/release-notes/overview
3. Anthropic, "Versions" (fetched 25 October 2026), for the `2026-10-21` change list, platform availability and the absence of a `2023-06-01` retirement date: https://platform.claude.com/docs/en/api/versioning
4. Anthropic, "Model deprecations" (fetched 25 October 2026), for the sampling parameter status under earlier API versions and the Sonnet 4.5 and Haiku 4.5 lifecycle: https://platform.claude.com/docs/en/about-claude/model-deprecations
5. Anthropic, "Fast mode" (fetched 25 October 2026): https://platform.claude.com/docs/en/build-with-claude/fast-mode
6. Anthropic, "Pricing" (fetched 25 October 2026), for Opus 5.5 standard and fast-mode rates: https://platform.claude.com/docs/en/about-claude/pricing
7. Anthropic, "Claude Models on Google Cloud (Anthropic managed)" (fetched 25 October 2026): https://platform.claude.com/docs/en/build-with-claude/claude-models-on-google-cloud/anthropic-managed
8. Anthropic, "Claude Models on Google Cloud", comparison of the Anthropic-managed and Google-managed offerings (fetched 25 October 2026): https://platform.claude.com/docs/en/build-with-claude/claude-models-on-google-cloud/overview
9. Anthropic, Claude Code CHANGELOG, version 2.1.307 (published to npm 21 October 2026, fetched 25 October 2026): https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
10. npm registry, `@anthropic-ai/sdk` package metadata, for the 1.0.0 publish time and the licence fields of 1.0.0 and 0.137.0 (checked 25 October 2026): https://www.npmjs.com/package/@anthropic-ai/sdk (raw registry data: https://registry.npmjs.org/@anthropic-ai/sdk)
11. npm registry, `@anthropic-ai/bedrock-sdk` package metadata, for the 1.0.0 licence and its `@anthropic-ai/sdk` dependency range (checked 25 October 2026): https://registry.npmjs.org/@anthropic-ai/bedrock-sdk
12. PyPI, `anthropic` 2.0.0 (uploaded 21 October 2026, checked 25 October 2026): https://pypi.org/project/anthropic/2.0.0/
13. GitHub, `anthropics/anthropic-sdk-typescript` LICENSE on `main` (checked 25 October 2026): https://github.com/anthropics/anthropic-sdk-typescript/blob/main/LICENSE
14. Apache Software Foundation, "Apache License, Version 2.0" (January 2004), sections 3, 4 and 6: https://www.apache.org/licenses/LICENSE-2.0

## Further reading

- [Claude by Anthropic](/tools/claude-anthropic/): the model lineup, access routes and lifecycle.
- [Claude Code](/tools/claude-code/): the coding agent that now ships the `/claude-api api-version` migration command.
- [Temperature and sampling](/glossary/temperature-and-sampling/): what the removed parameters did, for anyone deciding whether they still need them.
- [API versioning strategies for AI services](/guides/api-versioning-ai/): how to absorb a breaking API version without an outage.
- [Software licensing and vendor lock-in](/guides/software-licensing-and-vendor-lock-in/): background on permissive licences, including MIT and Apache 2.0.
- [Amazon Bedrock](/tools/amazon-bedrock/): where the Claude 4.7 floor for the new version applies.
- [Google Vertex AI](/tools/google-vertex-ai/): the Gemini Enterprise Agent Platform, home of the Google-managed Claude offering.
- [Claude Opus 5.5](/news/claude-opus-5-5/): the model whose fast mode left research preview this fortnight.
- [Claude Sonnet 5.5](/news/claude-sonnet-5-5/): Anthropic's named replacement for the retiring Sonnet 4.5.
- [Claude Haiku 5.5](/news/claude-haiku-5-5/): the current small model.
