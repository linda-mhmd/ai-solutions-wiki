---
title: "Stable Diffusion"
description: "Open-weight image generation model from Stability AI. Run locally with full control or call the Stability AI API. Fine-tuneable on custom datasets with LoRA and DreamBooth."
date: 2026-06-22
tags: ["image-generation", "diffusion-models", "stable-diffusion", "open-source", "fine-tuning", "lora"]
tool_category: "AI"
last_updated: 2026-09-03
---

<figure class="bz-figure">
  <img src="/img/rapid-ai/plasma-sphere-purple-green-notext.png" alt="Glass sphere containing swirling purple and green plasma energy: a latent diffusion model holds a compressed representation of visual knowledge, releasing it as an image." loading="lazy">
  <figcaption>Stable Diffusion encodes the entire visual world into a compressed latent space, then decompresses it back into images guided by text, one noise-removal step at a time.</figcaption>
</figure>

Stable Diffusion is a family of open-weight latent diffusion models developed by Stability AI that generate images from text prompts. Unlike Midjourney and DALL-E 3, the model weights are publicly available. You can run them locally on consumer hardware (an NVIDIA GPU with 6 GB VRAM or an Apple Silicon Mac), fine-tune them on custom image datasets with LoRA or DreamBooth, and integrate them into production systems via the Stability AI API or through open-source inference servers. The current generation is Stable Diffusion 3.5 (2024), which improves typography and prompt adherence over earlier versions.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Models</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">SD 3.5 Large (8B)</span>
      <span class="bz-arch-chip">SD 3.5 Medium (2B)</span>
      <span class="bz-arch-chip">SDXL 1.0</span>
      <span class="bz-arch-chip">SD 1.5 (legacy)</span>
      <span class="bz-arch-chip-note">SD 3.5 uses a Multimodal Diffusion Transformer (MMDiT) architecture</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Local inference</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">ComfyUI</span>
      <span class="bz-arch-chip">Automatic1111 WebUI</span>
      <span class="bz-arch-chip">Diffusers (Python)</span>
      <span class="bz-arch-chip">Ollama (SD 3.5)</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">API access</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Stability AI API</span>
      <span class="bz-arch-chip">AWS Bedrock</span>
      <span class="bz-arch-chip">Replicate</span>
      <span class="bz-arch-chip">Hugging Face Inference</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Fine-tuning</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">LoRA</span>
      <span class="bz-arch-chip">DreamBooth</span>
      <span class="bz-arch-chip">Textual Inversion</span>
      <span class="bz-arch-chip-note">LoRA trains in 30-90 minutes on 10-30 images with a single A100</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Control methods</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">ControlNet (pose, depth, edge)</span>
      <span class="bz-arch-chip">IP-Adapter (image prompt)</span>
      <span class="bz-arch-chip">Inpainting</span>
      <span class="bz-arch-chip">Outpainting</span>
    </div>
  </div>
</div>

## Installation: Diffusers library

The Hugging Face `diffusers` library is the reference implementation. It runs on NVIDIA GPUs, Apple Silicon, and CPU (slow).

```bash
pip install diffusers transformers accelerate torch
```

```python
import torch
from diffusers import StableDiffusion3Pipeline

pipe = StableDiffusion3Pipeline.from_pretrained(
    "stabilityai/stable-diffusion-3.5-medium",
    torch_dtype=torch.bfloat16
)
pipe = pipe.to("cuda")  # or "mps" for Apple Silicon

image = pipe(
    prompt="A dark industrial server room, red neon lights, deep shadows, editorial photography",
    negative_prompt="blurry, low quality, text, watermark",
    num_inference_steps=28,
    guidance_scale=4.5,
    height=1024,
    width=1024,
).images[0]

image.save("output.png")
```

## Stability AI API

For production use without local GPU infrastructure, the Stability AI REST API provides SD 3.5 access at per-image pricing.

```bash
pip install stability-sdk requests
```

```python
import requests
import base64

response = requests.post(
    "https://api.stability.ai/v2beta/stable-image/generate/sd3",
    headers={
        "Authorization": "Bearer YOUR_STABILITY_API_KEY",
        "Accept": "image/*"
    },
    files={"none": ""},
    data={
        "prompt": "Austrian alpine landscape at dawn, golden hour, photorealistic, 4K",
        "negative_prompt": "blurry, oversaturated, text",
        "model": "sd3.5-medium",
        "aspect_ratio": "16:9",
        "output_format": "webp",
    }
)

with open("landscape.webp", "wb") as f:
    f.write(response.content)
```

## LoRA fine-tuning for brand images

LoRA (Low-Rank Adaptation) adds a lightweight adapter on top of the base model trained on your specific images. The result is a model that generates images in your brand style without retraining the full model.

A LoRA training run for a product brand takes 20-30 images and 30-90 minutes on a single A100.

```python
from diffusers import StableDiffusion3Pipeline
from peft import PeftModel
import torch

base_model = StableDiffusion3Pipeline.from_pretrained(
    "stabilityai/stable-diffusion-3.5-medium",
    torch_dtype=torch.bfloat16
)

# Load LoRA weights trained on your brand images
base_model.load_lora_weights("./your-brand-lora")
base_model = base_model.to("cuda")

image = base_model(
    prompt="product photo of a coffee mug, brand style, studio lighting",
    num_inference_steps=28,
    guidance_scale=4.5,
).images[0]

image.save("brand-output.png")
```

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Choose access method</span>
    <span class="bz-flow-step-desc">Local (full control, no per-image cost, requires GPU) or API (pay per image, no hardware). Local is better for iteration; API is better for production pipelines.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Select model version</span>
    <span class="bz-flow-step-desc">SD 3.5 Medium for most cases (2B parameters, fast). SD 3.5 Large for complex compositions and precise text in images. SDXL for maximum community LoRA availability.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Write the prompt</span>
    <span class="bz-flow-step-desc">SD 3.5 responds well to natural language. Describe subject, style, lighting, camera angle, and quality tags. Add a negative prompt for what to exclude.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Fine-tune for consistency</span>
    <span class="bz-flow-step-desc">If you need brand-consistent output across many images, train a LoRA on 20-30 reference images. Apply the LoRA adapter at inference time.</span>
  </div>
</div>

## Pricing (Stability AI API, as of June 2026)

| Model | Price per image |
|---|---|
| **SD 3.5 Large** | ~€0.065 |
| **SD 3.5 Medium** | ~€0.035 |
| **SDXL 1.0** | ~€0.002 |
| **Core (fast)** | ~€0.003 |

Local inference is free after the one-time cost of a GPU. An NVIDIA RTX 3080 (€500-700 used) generates 1,000+ images per day.

## Comparison with alternatives

| | Stable Diffusion 3.5 | DALL-E 3 | Midjourney v6 | Flux.1 |
|---|---|---|---|---|
| **Open weight** | Yes | No | No | Yes (Flux.1 Dev) |
| **Run locally** | Yes | No | No | Yes |
| **Fine-tunable** | Yes (LoRA, DreamBooth) | No | No | Yes (LoRA) |
| **Image quality** | High | High | Very high | Very high |
| **Text in images** | Good (SD 3.5) | Excellent | Good | Excellent |
| **ControlNet** | Yes (extensive) | No | No | Partial |
| **API pricing/image** | ~€0.035 | ~€0.040 | N/A (subscription) | ~€0.003 (Replicate) |
| **Best for** | Custom pipelines, fine-tuning | OpenAI ecosystem integration | Aesthetic quality | Speed + quality |

## ControlNet: spatial control over generation

ControlNet takes a reference image (pose skeleton, depth map, edge map, or semantic map) and uses it to constrain the layout of the generated image. This is essential for product photography consistency, character pose control, and architecture visualization.

```python
from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
import torch

controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-canny",
    torch_dtype=torch.float16
)

pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    controlnet=controlnet,
    torch_dtype=torch.float16,
).to("cuda")

# edge_image: preprocessed edge map from your reference image
image = pipe(
    prompt="product photo, marble countertop, studio lighting, white background",
    image=edge_image,
    num_inference_steps=20,
).images[0]
```

## When not to use Stable Diffusion

**Photorealistic faces with identity preservation**: Without fine-tuning on a specific person's face, SD 3.5 is inconsistent across generations. For consistent character identity, tools like IP-Adapter or a person-specific LoRA add significant setup overhead.

**Copyrighted style replication**: Training a LoRA on copyrighted artwork to reproduce that style is a live legal question across multiple jurisdictions. The EU AI Act and emerging case law may make this an explicit risk by 2027.

**Real-time generation at high resolution**: SD 3.5 Medium generates a 1024x1024 image in 8-12 seconds on an A100. For sub-second generation at scale, Flux.1 Schnell or purpose-built inference APIs (Fireworks, together.ai) are faster.

**Non-technical users who need a GUI**: If the team does not write Python, ComfyUI or Automatic1111 provide browser-based GUIs with no code, but still require local GPU installation. Midjourney or Adobe Firefly are the simpler choice for non-technical users.

## Further reading

- [Stability AI API documentation](https://platform.stability.ai/docs/api-reference): REST endpoints, model IDs, pricing
- [Hugging Face Diffusers library](https://huggingface.co/docs/diffusers/): Python API reference, tutorials, LoRA training guides
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI): Node-based visual workflow builder for SD, recommended for non-Python users
- [Civitai](https://civitai.com): Community library of thousands of free LoRA and checkpoint models
- [SDXL LoRA training guide on Hugging Face](https://huggingface.co/docs/diffusers/en/training/sdxl): Detailed fine-tuning tutorial for SDXL
- [LLM Landscape 2026](/comparisons/llm-landscape-2026/): How image generation models fit into the broader AI landscape
- [What is a Machine Learning Model?](/glossary/model/): Foundational concept behind diffusion models
