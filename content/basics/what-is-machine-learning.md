---
title: "What is Machine Learning?"
description: "Machine learning is how AI learns from data instead of following programmed rules. Plain-English explanation of supervised, unsupervised, and reinforcement learning."
date: 2026-06-22
level: 0
categories: [Basics]
tags: ["beginner", "machine-learning", "ai-basics", "deep-learning", "neural-networks"]
youtube_id: "ukzFI9rgwfU"
youtube_title: "Machine Learning for Everybody"
youtube_channel: "freeCodeCamp.org"
docs: "https://developers.google.com/machine-learning/intro-to-ml"
docs_label: "Google: Introduction to Machine Learning"
faqs:
  - question: "What is the difference between AI and machine learning?"
    answer: "AI (artificial intelligence) is the broad goal: software that behaves intelligently. Machine learning (ML) is the main technique used to achieve that goal. Not all AI uses machine learning (early chess programs used hand-coded rules), but almost all modern AI does. Think of it this way: AI is the destination, machine learning is the road most commonly taken to get there."
  - question: "What is the difference between machine learning and deep learning?"
    answer: "Deep learning is a type of machine learning that uses neural networks with many layers (hence 'deep'). Traditional ML algorithms include decision trees, regression, and support vector machines. Deep learning requires more data and compute but learns more complex patterns. All deep learning is machine learning, but not all machine learning is deep learning. Large language models like GPT and Claude use deep learning."
  - question: "Do I need to know maths to understand machine learning?"
    answer: "To use ML tools, no. To build production ML systems, yes (calculus, linear algebra, statistics). To make business decisions about ML, you need the conceptual level: knowing the difference between supervised and unsupervised learning, understanding that more data generally helps, and recognising when ML is the right tool. This article gives you the conceptual foundation."
  - question: "How much data does machine learning need?"
    answer: "It depends on the task. A simple fraud detection model might need 10,000 labelled transactions. A production recommendation system might need millions of user interactions. A large language model uses hundreds of billions of words. The rule of thumb: more data gives better results, until you hit diminishing returns. Quality matters more than quantity: 10,000 accurately labelled examples beat 100,000 mislabelled ones."
  - question: "What is a machine learning model?"
    answer: "A model is the output of a training process: a mathematical function that maps inputs to outputs based on what it learned from training data. A spam filter model maps email content to 'spam' or 'not spam'. A language model maps a text prompt to the next most likely word. The model is stored as a file (its parameters, also called weights) and can be loaded and run without re-training."
---

{{< quickanswer >}}
Machine learning is a technique that lets software learn from examples rather than following explicit rules written by a programmer. Instead of coding "if the email contains these words, it is spam", you show the system thousands of spam and non-spam emails and let it learn the pattern itself. Modern AI, including ChatGPT, image recognition, and recommendation systems, runs on machine learning.
{{< /quickanswer >}}

<figure class="bz-figure">
  <img src="/img/dark-cherry/data-projection.png" alt="Dark industrial cylinder projecting rows of red data points into darkness: a machine learning model projects learned patterns outward from training data." loading="lazy">
  <figcaption>Machine learning extracts patterns from data and projects them forward: given enough examples, the model learns to see structure in new data it has never seen before.</figcaption>
</figure>

## The old way: explicit rules

Traditional software follows rules that programmers write by hand:

```python
# A programmer had to think of every rule manually
def is_spam(email):
    if "click here to claim your prize" in email.lower():
        return True
    if "nigerian prince" in email.lower():
        return True
    # ... hundreds more rules
    return False
```

This breaks immediately when spammers change their wording. The programmer must constantly update rules.

## The machine learning way: learn from examples

Instead of writing rules, you provide labelled examples and let the system find the pattern:

```python
# You provide training data: emails with correct labels
training_data = [
    ("Click here to claim your prize!", "spam"),
    ("Hi, the meeting is at 3pm", "not_spam"),
    ("Get rich quick guaranteed!", "spam"),
    ("Invoice attached as discussed", "not_spam"),
    # ... thousands more examples
]

# The model learns what makes an email spam
model = train(training_data)

# Now it classifies new emails it has never seen
model.predict("Limited time offer! Act now!!")  # → "spam"
```

The key shift: the programmer no longer writes rules. The programmer curates data and the algorithm writes its own rules internally.

## The three main types of machine learning

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Supervised learning</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Classification</span>
      <span class="bz-arch-chip">Regression</span>
      <span class="bz-arch-chip-note">Labelled data required. Examples: spam detection, image recognition, price prediction, credit scoring.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Unsupervised learning</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Clustering</span>
      <span class="bz-arch-chip">Dimensionality reduction</span>
      <span class="bz-arch-chip">Anomaly detection</span>
      <span class="bz-arch-chip-note">No labels needed. Examples: customer segmentation, fraud detection, topic modelling.</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Reinforcement learning</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Policy learning</span>
      <span class="bz-arch-chip">Reward optimisation</span>
      <span class="bz-arch-chip-note">Agent learns by trial and error with rewards/penalties. Used in game AI, robotics, LLM alignment (RLHF).</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Deep learning (subset)</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Neural networks</span>
      <span class="bz-arch-chip">Transformers (LLMs)</span>
      <span class="bz-arch-chip">Diffusion models</span>
      <span class="bz-arch-chip-note">A technique within supervised/unsupervised ML using multi-layer neural networks. Powers most modern AI.</span>
    </div>
  </div>
</div>

### Supervised learning: learning with a teacher

The most common type. You provide labelled training data: inputs paired with correct outputs.

**Examples:**
- **Image classification**: 10,000 photos each labelled "cat" or "dog". The model learns visual features that distinguish them.
- **Price prediction**: 50,000 property listings with sale prices. The model learns which features (size, location, age) predict price.
- **Sentiment analysis**: 100,000 product reviews each labelled positive or negative. The model learns language patterns associated with sentiment.

### Unsupervised learning: finding hidden structure

No labels required. The model finds patterns in unlabelled data.

**Examples:**
- **Customer segmentation**: Group customers by purchasing behaviour without pre-defining what the groups are.
- **Anomaly detection**: Learn what normal transaction patterns look like, then flag unusual transactions as potential fraud.
- **Topic modelling**: Process 10,000 articles and automatically discover they cluster into topics like "finance", "sports", and "technology".

### Reinforcement learning: learning by doing

An agent takes actions, receives rewards or penalties, and learns which actions maximise reward over time.

**Examples:**
- Game-playing AI (AlphaGo) learning to win by playing millions of games against itself
- Language model alignment via RLHF (Reinforcement Learning from Human Feedback): humans rate responses and the model learns to produce responses humans prefer

## The machine learning workflow

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Collect and label data</span>
    <span class="bz-flow-step-desc">Gather examples of inputs and correct outputs. This is often 80% of the work in a real ML project.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Train the model</span>
    <span class="bz-flow-step-desc">An algorithm processes the data repeatedly, adjusting internal parameters to minimise prediction errors on the training set.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Evaluate on held-out data</span>
    <span class="bz-flow-step-desc">Test the model on data it has never seen. This reveals whether it learned the true pattern or just memorised the training examples.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Deploy and monitor</span>
    <span class="bz-flow-step-desc">Serve the model in production. Monitor for performance degradation as real-world data shifts away from the training distribution.</span>
  </div>
</div>

## Common ML algorithms at a glance

| Algorithm | Best for | Requires |
|---|---|---|
| **Linear regression** | Predicting a continuous value (price, temperature) | Small dataset, interpretability |
| **Logistic regression** | Binary classification (yes/no) | Small dataset, interpretability |
| **Decision tree** | Rules-based classification, explainability | Structured tabular data |
| **Random forest** | High accuracy on tabular data | More compute than single tree |
| **Gradient boosting (XGBoost)** | Structured data competitions, fraud detection | Careful hyperparameter tuning |
| **Neural network / deep learning** | Images, text, audio, complex patterns | Large datasets, significant compute |
| **k-means clustering** | Customer segmentation, grouping | Unlabelled data |

## When machine learning is not the right choice

**When you have explicit rules that work**: If a simple `if/else` logic covers 99% of cases reliably, ML adds complexity without benefit. Use rules first.

**When you have too little data**: Training a deep learning model on 100 labelled examples will not work. You need at minimum hundreds, usually thousands of examples.

**When you need full explainability**: If a regulatory requirement demands that every decision be explainable step by step (common in credit decisions, medical diagnosis), black-box ML models present legal and compliance challenges.

**When the domain is rapidly changing**: A model trained on last year's data may degrade quickly if the real-world patterns shift. Some domains require continuous retraining to stay accurate.

## What's next

- [What is a Neural Network?](/basics/what-is-a-neural-network/): The deep learning architecture inside modern AI
- [What is Generative AI?](/basics/what-is-generative-ai/): How ML powers content creation
- [What is Fine-tuning?](/basics/what-is-fine-tuning/): Adapting a pre-trained model to a specific task
- [MLOps: Getting Started](/guides/mlops-getting-started/): How engineering teams manage ML models in production

## Further reading

- [Google: Introduction to Machine Learning](https://developers.google.com/machine-learning/intro-to-ml): Structured course from Google's developer education team
- [Fast.ai Practical Deep Learning](https://course.fast.ai): Top-rated free course, starts with code before theory
- [Scikit-learn documentation](https://scikit-learn.org/stable/): Python library covering all classical ML algorithms with examples
- [What is AI?](/basics/what-is-ai/): Broader context for how machine learning fits into artificial intelligence
