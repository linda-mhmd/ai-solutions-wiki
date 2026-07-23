---
title: "Your First LLM API Call"
description: "Make a working call to Claude in Python, then the same call with the OpenAI SDK, plus streaming, JSON output, real costs, and the first errors you will hit."
date: 2026-07-17
categories: [Guides]
tags: ["llm", "api", "python", "engineers"]
---

<figure class="bz-figure">
  <img src="/img/dark-cherry/cable-sparks.png" alt="A heavy industrial cable meeting a junction point on a near-black background, with red sparks flying at the connection. An API call is this junction: two systems touching at one small, well-defined point." loading="lazy">
  <figcaption>An LLM API call is one HTTPS request to a model that someone else hosts. The junction is small, documented, and sparks on first contact.</figcaption>
</figure>

Every LLM product starts with one HTTPS request. This guide takes you from no account to a working Python call against Claude, then the same call on the OpenAI SDK, streaming, JSON output, what the call costs, and the first errors you will meet. For the concepts behind the call, read [the LLM mental model for engineers](/guides/llm-mental-model-for-engineers/).

## The request lifecycle

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Build</span>
    <span class="bz-flow-step-desc">The SDK turns your arguments into a JSON request body.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Send</span>
    <span class="bz-flow-step-desc">HTTPS POST to the provider, API key in a header.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Generate</span>
    <span class="bz-flow-step-desc">The model produces output token by token on the provider's GPUs.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Respond and parse</span>
    <span class="bz-flow-step-desc">JSON comes back: content, stop reason, token usage. Your code reads the blocks.</span>
  </div>
</div>

## Step 1: Get an API key

Create a key in the Claude Console at [platform.claude.com](https://platform.claude.com) (Anthropic) or at [platform.openai.com](https://platform.openai.com) (OpenAI). New Anthropic accounts get a small amount of free credit to test with. To try models before creating any account, use the free options on our [Playgrounds page](/playgrounds/). Export the key as an environment variable: `export ANTHROPIC_API_KEY="sk-ant-..."`. Never paste it into code, and never commit it to Git - see [Protect your accounts](/guides/protect-your-accounts/).

## Step 2: Install the SDK

An SDK is the official client library. It handles auth headers, retries, and typed responses for you.

```bash
pip install anthropic   # Anthropic
pip install openai      # OpenAI
```

## Step 3: A minimal call to Claude

The current Sonnet-tier model ID is `claude-sonnet-5`. `max_tokens` is required and caps the output length. The client reads `ANTHROPIC_API_KEY` from the environment.

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "Explain what an API key is in one sentence."}
    ],
)

for block in message.content:
    if block.type == "text":
        print(block.text)
```

The loop matters: `message.content` is a list of typed blocks, not a string. On `claude-sonnet-5` a reasoning block can precede the text block, so always check `block.type`.

## The same call with the OpenAI SDK

OpenAI's current interface is the Responses API. It takes a single `input` string and offers an `output_text` shortcut.

```python
from openai import OpenAI

client = OpenAI()  # reads OPENAI_API_KEY

response = client.responses.create(
    model="gpt-5.5",
    input="Explain what an API key is in one sentence.",
)

print(response.output_text)
```

Same lifecycle, different shapes:

| | Anthropic | OpenAI |
|---|---|---|
| **Env var** | `ANTHROPIC_API_KEY` | `OPENAI_API_KEY` |
| **Call** | `client.messages.create(...)` | `client.responses.create(...)` |
| **Model ID** | `claude-sonnet-5` | `gpt-5.5` |
| **Output cap** | `max_tokens` required | optional |
| **Read text** | loop over content blocks | `response.output_text` |

## Streaming

Streaming prints tokens as they arrive instead of waiting for the full response. Use it for anything user-facing, and for any long output.

```python
with client.messages.stream(
    model="claude-sonnet-5",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Explain rate limiting in three short paragraphs."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
    final = stream.get_final_message()  # full message, incl. usage
```

## Structured output: get JSON back

Do not parse prose with regexes. Define a Pydantic model and use `client.messages.parse` (reusing the client from Step 3); the API constrains the output to your schema and the SDK validates it.

```python
from pydantic import BaseModel

class Contact(BaseModel):
    name: str
    email: str
    demo_requested: bool

response = client.messages.parse(
    model="claude-sonnet-5",
    max_tokens=500,
    messages=[{
        "role": "user",
        "content": "Extract the contact: Jane Doe (jane@example.com) asked for a demo.",
    }],
    output_format=Contact,
)

contact = response.parsed_output  # a validated Contact instance
print(contact.name, contact.demo_requested)
```

## What the response contains

- `id`: unique message ID. Log it; support teams trace requests with it.
- `model`: the model that actually answered.
- `content`: list of typed blocks (`text`, `thinking`, `tool_use`). Filter by `block.type`.
- `stop_reason`: why generation ended. `end_turn` means finished naturally. `max_tokens` means your cap truncated the answer; raise it and retry.
- `usage`: `input_tokens` and `output_tokens`. This is the billing meter; read it after every call.

## What this call costs

A token is a short chunk of text, roughly 4 English characters. Anthropic prices `claude-sonnet-5` at about 1.85 EUR ($2) per million input tokens and 9.20 EUR ($10) per million output tokens until 2026-08-31, then about 2.75 EUR ($3) and 13.80 EUR ($15). EUR figures assume $1 = 0.92 EUR; billing itself is in USD. The Step 3 call sends about 20 input tokens and returns about 60 output tokens. That is (20 x 2 + 60 x 10) / 1,000,000 = $0.00064, roughly 0.06 euro cents today, and roughly 0.09 euro cents at the standard price. One million such calls cost about 590 EUR today and about 880 EUR from September. Cheap per call, real at scale - set a budget cap before you ship anything, as covered in [Set spending limits before you ship](/guides/set-spending-limits-before-you-ship/).

## The first errors you will hit

| | What it means | Fix |
|---|---|---|
| **401 authentication_error** | Key missing, wrong, or revoked | Check the env var name and value |
| **404 not_found_error** | Model ID typo | Copy the exact ID from the docs |
| **429 rate_limit_error** | Too many requests or tokens | Wait for `retry-after`, then retry |
| **400 invalid_request_error** | Bad parameter | Read the error message; it names the field |

Three details save you an afternoon. First, the SDK raises typed exceptions (`anthropic.AuthenticationError`, `anthropic.RateLimitError`, `anthropic.NotFoundError`), so catch those instead of string-matching messages. Second, the SDK already retries 429 and 5xx errors twice with backoff before you ever see them. Third, `claude-sonnet-5` rejects a non-default `temperature` with a 400; leave sampling parameters out entirely (see [temperature and sampling](/glossary/temperature-and-sampling/)). When an error still stumps you, work through [How to read an error message](/guides/how-to-read-an-error-message/).

## Further reading

- [The LLM mental model for engineers](/guides/llm-mental-model-for-engineers/): the concepts behind the call you made here
- [How to read an error message](/guides/how-to-read-an-error-message/): a repeatable method for the 400s and 500s ahead
- [Set spending limits before you ship](/guides/set-spending-limits-before-you-ship/): budget caps and alerts before real traffic
- [Claude and the Anthropic API](/tools/claude-anthropic/): the platform behind the first example
- [OpenAI API](/tools/openai-api/): the platform behind the second example
- [Anthropic quickstart](https://platform.claude.com/docs/en/get-started): the official first-call guide with more languages
- [OpenAI quickstart](https://platform.openai.com/docs/quickstart): the official Responses API starting point

## Sources

- [Anthropic: Get started](https://platform.claude.com/docs/en/get-started)
- [Anthropic: Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Anthropic Python SDK](https://github.com/anthropics/anthropic-sdk-python)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [OpenAI: Quickstart](https://platform.openai.com/docs/quickstart)
