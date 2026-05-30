---
title: "Convolutional Neural Network"
description: "How CNNs extract spatial features from images and why architectures like ResNet, EfficientNet, and MobileNet remain foundational in computer vision."
date: 2026-03-28
categories: [Glossary]
tags: [CNN, computer-vision, deep-learning, image-recognition, ResNet]
related:
  - glossary/deep-learning
  - glossary/neural-network
  - glossary/vision-transformer
  - glossary/computer-vision
last_updated: 2026-05-30
---

A convolutional neural network (CNN) is a deep learning architecture designed to process grid-structured data, most commonly images. CNNs use learnable filters (kernels) that slide across the input to detect spatial patterns such as edges, textures, and shapes. This weight-sharing mechanism dramatically reduces parameter counts compared to fully connected networks, making CNNs practical for high-resolution inputs.

## How It Works

A CNN typically alternates between convolutional layers, which apply filters to produce feature maps, and pooling layers, which downsample spatial dimensions. Early layers capture low-level features (edges, corners), while deeper layers compose these into high-level concepts (faces, objects). A classification head at the end maps features to output categories.

**ResNet** (2015) introduced skip connections that enable training networks with hundreds of layers by mitigating vanishing gradients. **VGG** demonstrated that stacking small 3x3 filters outperforms larger kernels. **Inception** (GoogLeNet) uses parallel filter sizes within each layer to capture features at multiple scales. **EfficientNet** systematically scales depth, width, and resolution together for optimal accuracy-per-FLOP. **MobileNet** uses depthwise separable convolutions to achieve competitive accuracy at a fraction of the compute, making it suitable for edge devices and mobile phones.

## Why It Matters

CNNs transformed computer vision from hand-engineered feature pipelines to end-to-end learned systems. They power image classification, object detection, medical imaging, autonomous driving, and quality inspection in manufacturing. While vision transformers have matched or exceeded CNN accuracy on large datasets, CNNs remain preferred when training data is limited or inference must run on resource-constrained hardware.

## Practical Considerations

For production deployments, architecture choice depends on the compute budget. MobileNet and EfficientNet-Lite target mobile and edge inference. ResNet remains a reliable baseline for server-side workloads. Pre-trained CNN backbones from ImageNet are widely available and transfer well to domain-specific tasks, reducing both training time and data requirements. Many production vision systems still use CNN feature extractors even within larger multimodal pipelines.

## Sources

- LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). Gradient-based learning applied to document recognition. *Proceedings of the IEEE, 86*(11), 2278–2324. (LeNet; foundational CNN architecture.)
- Krizhevsky, A., Sutskever, I., & Hinton, G.E. (2012). ImageNet classification with deep convolutional neural networks. *NeurIPS 25*. (AlexNet; large-scale CNN breakthrough on ImageNet.)
- He, K., Zhang, X., Ren, S., & Sun, J. (2016). Deep residual learning for image recognition. *CVPR 2016*. (ResNet; skip connections for very deep networks.)
- Simonyan, K., & Zisserman, A. (2015). Very deep convolutional networks for large-scale image recognition. *ICLR 2015*. (VGGNet.)
- Szegedy, C., et al. (2015). Going deeper with convolutions. *CVPR 2015*. (GoogLeNet / Inception architecture.)
- Howard, A.G., et al. (2017). MobileNets: Efficient convolutional neural networks for mobile vision applications. *arXiv:1704.04861*. (Depthwise separable convolutions for edge inference.)
- Tan, M., & Le, Q.V. (2019). EfficientNet: Rethinking model scaling for convolutional neural networks. *ICML 2019*.
