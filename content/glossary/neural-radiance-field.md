---
title: "Neural Radiance Field"
description: "How NeRF reconstructs photorealistic 3D scenes from 2D images using neural networks to represent volumetric scene functions."
date: 2026-03-28
categories: [Glossary]
tags: [NeRF, 3D-reconstruction, computer-vision, neural-rendering, deep-learning]
related:
  - glossary/computer-vision
  - glossary/deep-learning
  - glossary/neural-network
  - glossary/convolutional-neural-network
last_updated: 2026-05-30
---

A Neural Radiance Field (NeRF) is a method for synthesizing novel views of a 3D scene from a sparse set of 2D photographs. A neural network learns to represent the scene as a continuous volumetric function that maps any 3D point and viewing direction to a color and density value. Once trained, the model can render photorealistic images from arbitrary camera positions.

## How It Works

NeRF takes as input a 3D coordinate (x, y, z) and a viewing direction (two angles) and outputs an RGB color and a volume density. The network is a relatively small MLP (typically 8-10 layers) trained on a set of photographs with known camera positions. During training, rays are cast from each camera through each pixel. Points are sampled along each ray, fed through the network, and the predicted colors and densities are composited using classical volume rendering equations to produce the pixel color. The network is optimized to minimize the difference between rendered and actual pixel values.

**Positional encoding** (mapping coordinates through sinusoidal functions) is critical for capturing high-frequency detail. Subsequent improvements include **Instant-NGP** (NVIDIA), which uses hash-based encodings for training in seconds rather than hours, **Mip-NeRF** for anti-aliased multi-scale rendering, and **3D Gaussian Splatting**, which represents scenes as collections of 3D Gaussians for real-time rendering.

## Why It Matters

NeRF enables creating photorealistic 3D content from ordinary photographs, democratizing 3D scene capture. Applications include virtual real estate tours, digital twins for industrial inspection, visual effects in film, autonomous driving simulation, and cultural heritage preservation. 3D Gaussian Splatting has made real-time rendering practical, opening doors to interactive applications.

## Practical Considerations

Training a NeRF requires images with accurate camera poses, typically obtained via structure-from-motion tools like COLMAP. Quality depends heavily on image coverage and consistency (uniform lighting, no moving objects). Instant-NGP and Gaussian Splatting have reduced training from hours to minutes. For production, evaluate whether your use case needs the photorealism of NeRF/Gaussian Splatting or whether traditional 3D reconstruction methods (photogrammetry, LiDAR) are sufficient. Storage and rendering costs vary significantly across methods.

## Sources

- Mildenhall, B., et al. (2020). NeRF: Representing scenes as neural radiance fields for view synthesis. *ECCV 2020*. (Original NeRF paper.)
- Müller, T., et al. (2022). Instant neural graphics primitives with a multiresolution hash encoding. *SIGGRAPH 2022*. (Instant-NGP; reduced NeRF training from hours to seconds.)
- Kerbl, B., et al. (2023). 3D Gaussian Splatting for real-time radiance field rendering. *SIGGRAPH 2023*. (3DGS; real-time NeRF rendering via Gaussian primitives.)
