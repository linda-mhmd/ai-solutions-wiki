---
title: "What is Natural Language Processing (NLP)?"
description: "Natural language processing (NLP) is the field of AI concerned with understanding and generating human language. Plain-English guide covering how NLP works and where you encounter it."
date: 2026-06-22
level: 0
categories: [Basics]
tags: ["beginner", "nlp", "natural-language-processing", "text-analysis", "ai-basics", "llm"]
docs: "https://huggingface.co/learn/nlp-course/chapter1/1"
docs_label: "Hugging Face NLP Course"
faqs:
  - question: "What is the difference between NLP and an LLM?"
    answer: "NLP (natural language processing) is the broad field: any AI technique that works with human language. An LLM (large language model) is one specific type of NLP system, the most powerful category in 2026. NLP also includes older techniques like rule-based parsers, keyword extraction, and statistical text classifiers that predate modern LLMs. When someone says 'NLP' today, they usually mean modern deep-learning-based approaches, often involving transformers and LLMs."
  - question: "Is NLP the same as speech recognition?"
    answer: "Related but distinct. Speech recognition (also called automatic speech recognition, ASR) converts audio to text. NLP then works with that text. A voice assistant pipeline looks like this: audio → speech recognition → text → NLP (understand intent) → response generation → text-to-speech → audio. Speech recognition is typically a separate module from NLP, even in modern end-to-end systems."
  - question: "What industries use NLP most?"
    answer: "Finance (contract analysis, earnings call summarisation, fraud detection in messages), healthcare (clinical note extraction, medical coding, patient Q&A), legal (contract review, case research), customer service (intent detection, automated responses, sentiment analysis), media (content classification, recommendation, translation), and government (document processing, compliance screening). In 2026, every industry that processes significant amounts of text uses NLP."
  - question: "What is sentiment analysis?"
    answer: "Sentiment analysis is an NLP task that classifies text by emotional tone: typically positive, negative, or neutral. Common uses: analysing product reviews at scale, monitoring social media mentions of a brand, assessing customer satisfaction from support tickets. Modern LLMs perform sentiment analysis as a sub-task of general instruction following; specialised sentiment models are still used for high-volume, low-cost pipelines."
  - question: "What is named entity recognition (NER)?"
    answer: "NER is an NLP task that identifies and classifies named entities in text: people (person names), organisations (company names), locations (cities, countries), dates, money amounts, and product names. Used in: extracting structured data from unstructured documents, building knowledge graphs, pre-processing legal contracts, and tagging medical records."
---

{{< quickanswer >}}
Natural language processing (NLP) is the area of AI that deals with human language: reading, writing, translating, summarising, classifying, and generating text. Every product that understands or produces language uses NLP: search engines, chatbots, translation tools, voice assistants, email spam filters, and document summarisers. Large language models like ChatGPT and Claude are the most capable NLP systems available in 2026.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/shaping-ai/operator-red-data-streams-notext.png" alt="A figure surrounded by flowing red data ribbons in a dark space: an NLP system processes continuous streams of language data, extracting meaning from text at scale." loading="lazy">
  <figcaption>NLP systems process language as a continuous stream of tokens: every word, every sentence, every document flowing through models that extract structure and meaning from unstructured text.</figcaption>
</figure>

## Where you encounter NLP every day

NLP is one of the most widely deployed AI technologies. You interact with it constantly:

- **Search**: Google interprets the meaning of your query, not just the keywords
- **Email**: Gmail's spam filter, smart reply suggestions, and category sorting
- **Translation**: Google Translate, DeepL, and web page auto-translation
- **Voice assistants**: Siri, Alexa, and Google Assistant all understand spoken (then transcribed) language
- **Customer support**: Chatbots that understand your question and route you to the right team
- **Document processing**: PDF extraction, invoice parsing, contract review
- **Social media**: Content moderation, trending topic detection, ad targeting by interest

## Core NLP tasks

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Understanding text</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Classification</span>
      <span class="bz-arch-chip">Sentiment analysis</span>
      <span class="bz-arch-chip">Named entity recognition</span>
      <span class="bz-arch-chip">Intent detection</span>
      <span class="bz-arch-chip">Information extraction</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Transforming text</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Translation</span>
      <span class="bz-arch-chip">Summarisation</span>
      <span class="bz-arch-chip">Paraphrasing</span>
      <span class="bz-arch-chip">Text cleaning and normalisation</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Generating text</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Question answering</span>
      <span class="bz-arch-chip">Text generation (LLMs)</span>
      <span class="bz-arch-chip">Dialogue systems</span>
      <span class="bz-arch-chip">Document drafting</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Searching and matching</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Semantic search</span>
      <span class="bz-arch-chip">Document similarity</span>
      <span class="bz-arch-chip">Embedding-based retrieval (RAG)</span>
    </div>
  </div>
</div>

## How NLP works: from words to numbers

Computers process numbers, not words. The first step of any NLP pipeline is converting text into numbers that capture meaning.

**Tokenisation**: Split text into tokens (words or word fragments)

```
"AI-solutions.wiki is useful" → ["AI", "-", "solutions", ".", "wiki", "is", "useful"]
```

**Embeddings**: Convert each token to a vector (list of numbers) that encodes meaning

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

sentences = [
    "The meeting was cancelled",
    "The appointment was called off",  # same meaning, different words
    "The product launch went well",    # different meaning
]

embeddings = model.encode(sentences)
# Embeddings for sentence 1 and 2 will be mathematically close
# Embedding for sentence 3 will be far from both
```

The key insight: words with similar meanings end up close together in vector space. "King" and "Queen" are near each other. "Bank" (financial) and "Bank" (river) are in different locations depending on context.

## From classical NLP to modern LLMs

NLP methods have evolved dramatically:

| Era | Approach | Example |
|---|---|---|
| 1990s | Rule-based: hand-written grammars and dictionaries | Early spell checkers |
| 2000s | Statistical ML: count-based models (TF-IDF, n-grams) | Naive Bayes spam filter |
| 2010s | Word embeddings + RNNs | Word2Vec, early chatbots |
| 2017+ | Transformers | BERT (classification), GPT (generation) |
| 2022+ | Instruction-following LLMs | ChatGPT, Claude, Gemini |

Modern LLMs handle most classical NLP tasks (classification, summarisation, extraction, translation) as part of general instruction following. You no longer need a separate specialised model for each task; you prompt a single large model.

## A practical NLP pipeline

```python
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def analyse_customer_email(email_text):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """Analyse the customer email and return JSON with:
                - sentiment: positive | negative | neutral
                - intent: complaint | question | cancellation | praise | other
                - urgency: high | medium | low
                - summary: one sentence max
                - suggested_action: what the support team should do"""
            },
            {"role": "user", "content": email_text}
        ],
        response_format={"type": "json_object"}
    )
    return response.choices[0].message.content

result = analyse_customer_email("""
I've been waiting three weeks for my order and nobody has responded 
to my previous two emails. This is completely unacceptable.
""")
# Returns structured JSON: sentiment=negative, intent=complaint, urgency=high
```

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Ingest text</span>
    <span class="bz-flow-step-desc">Receive raw text: emails, documents, social posts, support tickets, contracts. Clean and normalise (remove HTML, fix encoding).</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Tokenise and embed</span>
    <span class="bz-flow-step-desc">Split text into tokens. Convert to vector embeddings for search/similarity, or pass directly to an LLM for understanding.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Apply NLP task</span>
    <span class="bz-flow-step-desc">Classify, extract, summarise, translate, or generate. Modern LLMs can do all of these from a single API call with the right prompt.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Use the structured output</span>
    <span class="bz-flow-step-desc">Feed results into downstream systems: CRM, dashboards, databases, email automation, routing queues, or human review workflows.</span>
  </div>
</div>

## Popular NLP libraries and services

| Tool | Type | Best for |
|---|---|---|
| **spaCy** | Python library | Named entity recognition, dependency parsing, fast rule-based NLP |
| **Hugging Face Transformers** | Python library | Running any open-source transformer model locally |
| **sentence-transformers** | Python library | Semantic search, document similarity, embeddings |
| **OpenAI API** | API service | General NLP via LLM: classification, summarisation, extraction |
| **AWS Comprehend** | Managed service | Sentiment, entities, key phrases, language detection at scale |
| **Google Natural Language API** | Managed service | Sentiment, entity recognition, content classification |

## What's next

- [What is a Large Language Model?](/basics/what-is-an-llm/): The most capable current form of NLP
- [Building RAG Systems](/guides/building-rag-systems/): Using NLP embeddings to search your own documents
- [What is Generative AI?](/basics/what-is-generative-ai/): How NLP models produce new text

## Further reading

- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course/chapter1/1): Free, comprehensive course covering transformers and modern NLP
- [spaCy documentation](https://spacy.io/usage): Industrial-strength Python NLP library, well documented
- [AWS Comprehend documentation](https://docs.aws.amazon.com/comprehend/): Managed NLP for teams using AWS
