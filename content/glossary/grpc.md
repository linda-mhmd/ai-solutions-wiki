---
title: "gRPC"
description: "What gRPC is, how Protocol Buffers and streaming RPCs work, and why gRPC is well-suited for high-performance ML inference services."
date: 2026-03-28
categories: [Glossary]
tags: [grpc, protocol-buffers, api, microservices, performance, ml-serving]
related:
  - guides/grpc-ai-services
  - glossary/openapi
  - patterns/microservices-for-ai
last_updated: 2026-05-30
---

gRPC is a high-performance, open-source remote procedure call (RPC) framework originally developed by Google. It uses HTTP/2 for transport, Protocol Buffers (protobuf) for serialisation, and provides features like bidirectional streaming, flow control, and deadline propagation out of the box.

For service-to-service communication in AI systems, gRPC offers significant performance advantages over REST/JSON: smaller payloads, faster serialisation, multiplexed connections, and native streaming support.

## Protocol Buffers

Protocol Buffers are gRPC's interface definition language and serialisation format. You define your service contract in a `.proto` file:

```protobuf
service InferenceService {
  rpc Predict(PredictRequest) returns (PredictResponse);
  rpc StreamPredict(PredictRequest) returns (stream TokenResponse);
}

message PredictRequest {
  string model_id = 1;
  repeated float features = 2;
}
```

From this definition, the protobuf compiler generates client and server code in Python, Go, Java, C++, and other languages. The generated code handles serialisation, deserialisation, and transport. You implement the business logic; gRPC handles the plumbing.

Protobuf serialisation produces binary payloads that are 3-10x smaller than equivalent JSON and 5-20x faster to parse. For ML services passing large feature vectors or embedding arrays, this difference matters.

## Streaming RPCs

gRPC supports four communication patterns:

- **Unary** - Single request, single response. Standard RPC. Used for classification, embedding generation, or any single-shot inference.
- **Server streaming** - Single request, stream of responses. Ideal for LLM token generation where the model produces tokens incrementally.
- **Client streaming** - Stream of requests, single response. Used for sending a stream of sensor data for batch classification.
- **Bidirectional streaming** - Both sides stream simultaneously. Used for conversational AI where context flows both directions.

## Why gRPC for ML Services

ML inference services are internal. They do not need browser compatibility (which favours REST/JSON). They pass large numeric arrays where binary serialisation saves bandwidth and CPU. They benefit from HTTP/2 connection multiplexing under high concurrency. And streaming RPCs map naturally to token-by-token LLM generation.

The trade-off: gRPC is harder to debug (binary payloads are not human-readable), requires code generation tooling, and has limited browser support without a proxy like gRPC-Web or Envoy. For public-facing APIs, REST remains the standard. For internal service meshes, gRPC is often the better choice.

## Sources

- Grigorik, I. (2013). *High Performance Browser Networking*. O'Reilly Media. Chapter 12: HTTP/2. (HTTP/2 multiplexing, header compression, and binary framing that gRPC builds on.)
- Protocol Buffers Team. (2008). *Protocol Buffers: Google's data interchange format*. Google. (Original protobuf documentation; binary encoding, schema evolution, and code generation.)
- Hauer, T. (2020). Learnings from our journey with gRPC. *Cloudflare Blog*. (Production experience with gRPC at scale; performance characteristics, debugging challenges, and operational considerations.)
