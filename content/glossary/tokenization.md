---
title: "Tokenization in AI"
description: "What tokens are, how different models tokenize text, why token count matters for cost and context limits."
date: 2026-03-24
categories: [Glossary]
tags: ["ai-ml", "beginner", "tokenization", "tokens", "llm", "nlp", "vocabulary"]
last_updated: 2026-09-03
---

Tokenization is the process of breaking text into units (tokens) that a language model can process. Models do not read text character by character or word by word - they operate on tokens, which are typically word fragments determined by statistical patterns in training data.

## What a Token Is

A token is a piece of text that maps to a single entry in the model's vocabulary. In English, common words are often single tokens: "the" is one token, "cat" is one token. Less common words and longer words are typically split: "tokenization" might be two or three tokens ("token", "ization" or "token", "iz", "ation"). Non-English languages are often less efficiently tokenized - a word in Finnish or Turkish might require 3-5 tokens that would be 1-2 tokens in English.

As a rough rule of thumb for English text: 1 token is approximately 4 characters or 0.75 words. A 1,000-word document is approximately 1,300-1,500 tokens.

## Why Token Count Matters

**Cost** - AI API pricing is per token. Both input tokens (your prompt and context) and output tokens (the model's response) are charged. A call with a 10,000-token input prompt costs 10x more than one with a 1,000-token input prompt, assuming the same model. Understanding token counts is essential for cost estimation and optimization.

**Context window limits** - Models have a maximum context size measured in tokens. Claude Sonnet 5 supports up to 1 million tokens (Haiku 4.5 tops out at 200,000) -- see [Claude by Anthropic](/tools/claude-anthropic/) for the current lineup and context windows. Documents, conversation histories, and retrieved context must all fit within this limit. Exceeding it requires truncation, summarization, or retrieval-based context management.

**Latency** - Generating more output tokens takes more time. A request for a 2,000-token response takes roughly twice as long to complete as one for a 1,000-token response.

## Tokenization Across Models

Different models use different tokenizers, meaning the same text will tokenize to different numbers of tokens. GPT models use a BPE (Byte Pair Encoding) tokenizer called tiktoken. Claude uses a different tokenizer. Comparing token counts between models requires using each model's specific tokenizer.

**Practical implication:** A document that fits within one provider's context window may fit differently within another's - not because of the raw limit difference, but because tokenization of the same text may vary by 10-20% between tokenizers. Check current context-window sizes for [OpenAI](/tools/openai-api/) and [Claude](/tools/claude-anthropic/) models before assuming a document fits.

## Counting Tokens Before API Calls

Checking token counts before making API calls allows:
- Accurate cost estimation
- Pre-emptive truncation of inputs that would exceed context limits
- Batching optimization

Claude's API returns token counts in response metadata. For pre-call estimation, Anthropic provides a token counting endpoint. The AWS Bedrock SDK includes utilities for token estimation.

## Special Tokens

Tokenizers include special tokens beyond regular text tokens: beginning-of-sequence tokens, end-of-sequence tokens, role markers for multi-turn conversations, and tool-use formatting tokens. These consume context and cost, even though they do not represent user-provided text. System prompts and conversation formatting (the role markers around each message) typically add 50-200 tokens of overhead per request.

## Sources

- Sennrich, R., Haddow, B., & Birch, A. (2016). Neural machine translation of rare words with subword units. *ACL 2016*. (BPE tokenization; introduced subword tokenization for NMT, now standard for LLMs.)
- Schuster, M., & Nakamura, K. (2012). Japanese and Korean voice search. *ICASSP 2012*. (WordPiece tokenization; used in BERT.)
- Kudo, T., & Richardson, J. (2018). SentencePiece: A simple and language independent subword tokenizer and detokenizer for neural text processing. *EMNLP 2018*. (SentencePiece; language-agnostic tokenizer used in T5, LLaMA, and others.)
