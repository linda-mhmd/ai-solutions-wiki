---
title: "What is a Token?"
description: "Tokens are how AI models read and charge for text. Understanding tokens explains why AI costs money, why there's a limit on how much you can send, and why 'one word' is not a useful unit."
date: 2026-07-30
level: 1
categories: [Basics]
tags: [beginner, tokens, ai, llm, cost, billing]
faqs:
  - question: "Why do AI companies charge per token instead of per word?"
    answer: "Words vary wildly in length. 'I' and 'unconstitutional' are both one word but very different amounts of text. Tokens are a more consistent unit. Also, the model genuinely processes tokens, not words, so the cost reflects the actual computation."
  - question: "Why is my AI bill so high?"
    answer: "Check two things: how many tokens you're sending (input) and how many you're asking the model to generate (output). Long system prompts, pasted documents, and asking for detailed responses all add up. Also check if you're using a premium model when a cheaper one would work."
  - question: "What's a context window?"
    answer: "The context window is the maximum number of tokens a model can handle in one conversation, both your input and its output combined. Claude has 200K tokens, GPT-4o has 128K. If you exceed it, the model either refuses or forgets the oldest parts of the conversation."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A token is a chunk of text, roughly ¾ of a word on average. AI models read text as tokens, charge you per token, and have a maximum number of tokens they can handle at once. When you see "cost per 1M tokens" or "128K context window," this is what they mean.
{{< /quickanswer >}}

## Why tokens exist

Computers don't read letters the way you do. Before an AI model can process your message, it needs to convert your text into numbers. Tokenization is that conversion: breaking text into pieces the model can work with.

The word "hello" might be one token. The word "tokenization" might be three tokens: "token", "ization". A space before a word often gets included in the token. Punctuation is usually its own token.

The exact split depends on the tokenizer, and different AI models use different ones. But the rough math holds: **1 token ≈ 4 characters ≈ ¾ of a word**.

## Why this matters for your wallet

AI companies charge per token. When you see pricing like:

| Model | Input | Output |
|---|---|---|
| GPT-4o | $2.50 / 1M tokens | $10 / 1M tokens |
| Claude Sonnet | $3 / 1M tokens | $15 / 1M tokens |

...this is what they mean. You pay for:
- **Input tokens**: Everything you send to the model (your question, any documents you paste, the system prompt)
- **Output tokens**: Everything the model generates back (usually more expensive because generation is harder than reading)

A typical short conversation might use 500 input tokens and 300 output tokens. That's fractions of a cent. But if you're building an app that sends a 10-page document to Claude every time a user asks a question, and you have 1,000 users per day, the math changes fast.

## Quick token math

- 1 page of text ≈ 500 tokens
- A typical email ≈ 200-400 tokens
- "What's the weather?" ≈ 5 tokens
- A detailed system prompt ≈ 500-2,000 tokens
- An entire novel ≈ 100,000+ tokens

You can check exact token counts using OpenAI's tokenizer tool or Anthropic's token counter in the API response.

## The context window limit

Every model has a maximum number of tokens it can handle at once, called the **context window**:

| Model | Context window |
|---|---|
| GPT-4o | 128,000 tokens |
| Claude Sonnet/Opus | 200,000 tokens |
| Gemini 1.5 Pro | 2,000,000 tokens |

This limit includes both input AND output. If you're at 195,000 tokens and ask for a 10,000 token response, you'll hit the wall.

When you exceed the context window:
- The API returns an error
- Or the model "forgets" the oldest messages to make room
- Or your request just fails silently

This is why apps that work with documents need strategies like chunking (splitting documents into pieces) or RAG (only retrieving relevant sections).

## Why your vibe coding costs add up

Common token traps for vibecoders:

**Huge system prompts**: If you paste your entire codebase into the system prompt "for context," you're paying for that on every single message.

**Asking for long responses**: "Explain everything in detail" costs more than "Give me a one-sentence summary."

**Using expensive models for simple tasks**: GPT-4o is overkill for "Is this email spam? Yes or no." A smaller, cheaper model works fine.

**Not caching**: If 10,000 users ask the same question, you pay for the AI to answer it 10,000 times. Caching identical responses saves money.

## What to do about it

1. **Know your costs**: Check your AI provider's dashboard. See what's actually costing money.

2. **Right-size your model**: Use cheap models for simple tasks, expensive models for hard ones.

3. **Be specific**: "Summarize in 2 sentences" costs less than "Tell me everything about this."

4. **Cache when possible**: If the same input always produces the same output, cache it.

5. **Use retrieval**: Don't send entire documents. Retrieve only the relevant chunks.

## Further reading

- [What is an LLM?](/basics/what-is-an-llm/): The model that consumes these tokens
- [What is RAG?](/glossary/rag/): How to work with documents without blowing your token budget
- [Context engineering](/glossary/context-engineering/): The discipline of managing what goes into the context window
- [Tokenization](/glossary/tokenization/): The technical details of how text becomes tokens
- [What is JSON?](/basics/what-is-json/): The data format you'll see in API responses about token usage
- [What is an API key?](/basics/what-is-an-api-key/): Required to access AI APIs that charge per token
- [What is rate limiting?](/basics/what-is-rate-limiting/): Token-based rate limits (TPM) alongside request limits
- [Tokenmaxxing](/glossary/tokenmaxxing/): The organizational pattern of maximizing token usage as a productivity signal
