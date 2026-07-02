---
title: "YOLO (Ultralytics)"
description: "YOLO is a family of single-stage, real-time object detectors that find and classify objects in one pass over an image; the Ultralytics package is the standard way to train and deploy them."
date: 2026-07-01
tags: ["computer-vision", "object-detection", "real-time", "open-source", "edge", "pytorch"]
tool_category: "AI"
related:
  - glossary/computer-vision
  - glossary/convolutional-neural-network
  - tools/pytorch
  - guides/computer-vision-guide
  - glossary/vision-transformer
  - guides/edge-ai-deployment
---

<figure class="bz-figure">
  <img src="/img/shaping-ai/eye-neural-network-notext.png" alt="An extreme close-up of an eye with a red neural web across the iris, representing real-time machine perception and object detection." loading="lazy">
  <figcaption>YOLO gives a machine a single glance. One forward pass turns pixels into boxes, labels, and confidence scores.</figcaption>
</figure>

YOLO, short for You Only Look Once, is a family of single-stage, real-time object detectors. It frames detection as one regression problem: a single neural network processes the whole image in one forward pass, divides it into a grid, and predicts bounding boxes and class probabilities at the same time. That unified design is what makes it fast enough for video and live cameras. It contrasts with two-stage detectors of the R-CNN family, which first propose regions and then classify them in a slower multi-step pipeline. The **Ultralytics** package is the standard toolkit for training, running, and exporting modern YOLO models, and it unifies detection, segmentation, pose estimation, oriented boxes, classification, and tracking under one API.

> **Licensing matters here.** Ultralytics YOLO is released under **AGPL-3.0**, a strong copyleft licence. Read the [licensing section](#licensing-read-this-before-you-ship) before building anything commercial. A paid Enterprise licence exists for closed-source products.

## Where YOLO sits

You work through the Ultralytics Python API or CLI. The model runs on [PyTorch](/tools/pytorch/), and once trained it exports to many runtimes for server or edge deployment.

<div class="bz-arch">
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Application</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Video analytics</span>
      <span class="bz-arch-chip">Robotics</span>
      <span class="bz-arch-chip">Inspection</span>
      <span class="bz-arch-chip-note">Your detection or tracking service</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Interface</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Ultralytics Python API</span>
      <span class="bz-arch-chip">yolo CLI</span>
      <span class="bz-arch-chip-note">train, predict, val, track, export</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Model</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">Backbone</span>
      <span class="bz-arch-chip">Neck (FPN + PAN)</span>
      <span class="bz-arch-chip">Detection head</span>
      <span class="bz-arch-chip-note">Feature extraction, fusion, prediction</span>
    </div>
  </div>
  <div class="bz-arch-layer">
    <span class="bz-arch-layer-label">Runtime and export</span>
    <div class="bz-arch-layer-content">
      <span class="bz-arch-chip">PyTorch</span>
      <span class="bz-arch-chip">ONNX</span>
      <span class="bz-arch-chip">TensorRT</span>
      <span class="bz-arch-chip">CoreML / LiteRT</span>
      <span class="bz-arch-chip-note">Server GPU, Jetson, mobile, edge TPU</span>
    </div>
  </div>
</div>

## How single-shot detection works

A YOLO network has three parts. The **backbone** (a CSP-style convolutional network) extracts features. The **neck** fuses features across scales using a Feature Pyramid Network plus Path Aggregation Network, so the model sees both fine detail and broad context. The **head** produces the final predictions. Older versions used anchor boxes, predefined box shapes that predictions adjust; since YOLOv8, Ultralytics models are anchor-free and predict box coordinates directly with a decoupled head. The training loss combines a box regression term (Complete IoU), an objectness term, and a classification term.

A classic post-processing step, non-maximum suppression (NMS), removes duplicate overlapping boxes for the same object. NMS adds latency and complicates export. YOLOv10 (from Tsinghua University in 2024) pioneered NMS-free detection in the YOLO family using dual label assignment, and current Ultralytics flagships make end-to-end NMS-free inference the default.

## The version lineage

YOLO is not one model but a lineage, and different versions come from different authors under different licences.

| Version | Year | Author | Note |
|---|---|---|---|
| **v1 to v3** | 2016-2018 | Joseph Redmon | Original single-stage detector |
| **v4** | 2020 | Alexey Bochkovskiy | CSPDarknet, Darknet-native |
| **v5** | 2020 | Ultralytics | First PyTorch rewrite |
| **v8** | 2023 | Ultralytics | Anchor-free, multi-task |
| **v10** | 2024 | Tsinghua University | NMS-free end-to-end |
| **YOLO11** | 2024 | Ultralytics | Widely deployed stable release |
| **v12 / v13** | 2025 | Academic groups | Attention and hypergraph research lines |
| **YOLO26** | 2025-2026 | Ultralytics | Edge-optimised current flagship |

As of 2026, **YOLO11** is the most widely deployed stable Ultralytics production model, and **YOLO26** is the newer flagship tuned for edge and CPU inference. YOLOv12 and YOLOv13 are separate academic research lineages that run through the Ultralytics package but are not Ultralytics releases. For a transformer-based real-time alternative, see RT-DETR.

## Installing Ultralytics

```bash
pip install -U ultralytics
```

The package pulls in [PyTorch](/tools/pytorch/) automatically. For GPU acceleration, install a CUDA-enabled PyTorch build that matches your CUDA version first. Python 3.8 or higher is required.

## Running inference on a pretrained model

```python
from ultralytics import YOLO

# Load pretrained weights (n = nano; s, m, l, x are larger)
model = YOLO("yolo11n.pt")

# Predict on an image, a video, a folder, a URL, or a webcam index
results = model.predict(source="street.jpg", conf=0.25, save=True)

for r in results:
    for box in r.boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        xyxy = box.xyxy[0].tolist()   # [x1, y1, x2, y2]
        print(model.names[cls_id], round(conf, 3), xyxy)
```

The same task from the command line:

```bash
yolo detect predict model=yolo11n.pt source=street.jpg conf=0.25 save=True
```

## Training on a custom dataset

Point a small `data.yaml` at your labelled images, then fine-tune from pretrained weights (transfer learning), which needs far less data than training from scratch.

```yaml
# data.yaml
path: ./datasets/hardhats
train: images/train
val: images/val
names:
  0: person
  1: helmet
  2: no-helmet
```

```python
from ultralytics import YOLO

model = YOLO("yolo11n.pt")          # start from pretrained weights
model.train(data="data.yaml", epochs=100, imgsz=640, batch=16, device=0)
model.val()                          # evaluate on the val split
model.export(format="onnx")          # export for deployment
```

## From data to deployed detector

<div class="bz-flow">
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 1</span>
    <span class="bz-flow-step-name">Label</span>
    <span class="bz-flow-step-desc">Annotate images with boxes and write a data.yaml.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 2</span>
    <span class="bz-flow-step-name">Train</span>
    <span class="bz-flow-step-desc">Fine-tune from pretrained weights on your classes.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 3</span>
    <span class="bz-flow-step-name">Export</span>
    <span class="bz-flow-step-desc">Convert to ONNX, TensorRT, CoreML, or LiteRT.</span>
  </div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step">
    <span class="bz-flow-step-tag">Step 4</span>
    <span class="bz-flow-step-name">Deploy</span>
    <span class="bz-flow-step-desc">Run on a server GPU, a Jetson, or a mobile device.</span>
  </div>
</div>

## How it compares

| | YOLO (Ultralytics) | RT-DETR | Faster R-CNN | SAM |
|---|---|---|---|---|
| **Type** | Single-stage CNN | Transformer detector | Two-stage CNN | Segmentation foundation model |
| **Speed** | Very fast, real-time | Real-time on GPU | Not real-time | Not real-time |
| **NMS** | NMS-free in recent versions | NMS-free | Needs NMS | Not applicable |
| **Licence** | AGPL-3.0 (Enterprise paid) | Apache 2.0 | Permissive | Apache 2.0 |
| **Best for** | Real-time detection, edge | High-accuracy real-time on GPU | Max-accuracy offline baselines | Promptable segmentation masks |

## Licensing: read this before you ship

Ultralytics YOLO (v5, v8, YOLO11, YOLO26) is **AGPL-3.0**. This is the load-bearing fact for commercial use:

- If you use Ultralytics code, architectures, or trained or fine-tuned weights in a product, AGPL requires you to release the complete source of your entire derivative work under AGPL-3.0.
- The AGPL network clause means this triggers even for a SaaS or internal network service, where users interact over the network but never receive your binary. Ordinary GPL does not cover that case; AGPL does.
- Fine-tuned weights and a private deployment do **not** escape the obligation.
- For a closed-source commercial product, buy the Ultralytics **Enterprise licence**, which removes the open-source requirement.

If you cannot open-source your application and will not buy the Enterprise licence, choose a permissively licensed detector such as RT-DETR instead.

## When not to use YOLO

- **A closed-source commercial product with no licence.** See the licensing section above. This is the most common and most expensive mistake.
- **Tiny objects or dense, overlapping crowds.** Grid-based detection struggles here; specialised small-object or crowd-counting models often do better.
- **Maximum accuracy on cluttered scenes.** Transformer detectors like RT-DETR can edge out YOLO on some benchmarks, with permissive licences.
- **Open-vocabulary or zero-shot detection.** Standard YOLO detects only its trained classes. To detect anything from a text prompt, use YOLO-World, Grounding DINO, or GLIP.
- **Pixel-perfect masks of arbitrary objects.** For promptable, high-fidelity segmentation, use a foundation model like SAM rather than YOLO's segmentation head.

## Further reading

- [Ultralytics documentation](https://docs.ultralytics.com/): official guides for training, prediction, and export.
- [Ultralytics licence](https://www.ultralytics.com/license): AGPL-3.0 terms and the Enterprise option.
- [You Only Look Once (Redmon et al., 2016)](https://arxiv.org/abs/1506.02640): the paper that started the family.
- [What is computer vision?](/glossary/computer-vision/): the field YOLO works in.
- [Convolutional neural network](/glossary/convolutional-neural-network/): the architecture YOLO's backbone is built from.
- [Computer vision guide](/guides/computer-vision-guide/): a broader walkthrough of vision tasks and tools.
- [Edge AI deployment](/guides/edge-ai-deployment/): running detectors on Jetson and mobile hardware.

## Sources

- Redmon, J., et al. (2016). You Only Look Once: Unified, Real-Time Object Detection. *CVPR 2016*. arXiv:1506.02640. https://arxiv.org/abs/1506.02640
- Wang, A., et al. (2024). YOLOv10: Real-Time End-to-End Object Detection. *NeurIPS 2024*. arXiv:2405.14458.
- Ultralytics documentation and model docs. https://docs.ultralytics.com/models/
- Ultralytics licence page. https://www.ultralytics.com/license
- Ultralytics GitHub repository. https://github.com/ultralytics/ultralytics
