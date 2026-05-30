---
title: "Building gRPC Microservices for ML Inference"
description: "How to build gRPC-based microservices for ML inference: proto definitions, streaming token delivery, load balancing, health checks, and performance tuning for model serving."
date: 2026-03-28
categories: [Guides]
tags: [grpc, microservices, ml-serving, protocol-buffers, inference, performance]
related:
  - glossary/grpc
  - patterns/microservices-for-ai
  - guides/api-versioning-ai
last_updated: 2026-05-30
---

gRPC offers significant performance advantages over REST/JSON for internal ML inference services: binary serialisation reduces payload size for large feature vectors, HTTP/2 multiplexing handles high concurrency, and native streaming support maps naturally to token-by-token LLM generation. This guide covers building production gRPC services for ML inference.

## Defining the Service Contract

Start with the proto definition. This is the contract between the inference service and its consumers:

```protobuf
syntax = "proto3";

package inference.v1;

service InferenceService {
  // Single-shot inference (classification, embedding, structured output)
  rpc Predict(PredictRequest) returns (PredictResponse);

  // Streaming inference (LLM token generation)
  rpc StreamPredict(PredictRequest) returns (stream PredictToken);

  // Batch inference
  rpc BatchPredict(BatchPredictRequest) returns (BatchPredictResponse);

  // Health check (gRPC health checking protocol)
  rpc Check(HealthCheckRequest) returns (HealthCheckResponse);
}

message PredictRequest {
  string model_id = 1;
  string request_id = 2;
  map<string, FeatureValue> features = 3;
  InferenceConfig config = 4;
}

message FeatureValue {
  oneof value {
    float float_value = 1;
    string string_value = 2;
    FloatArray float_array = 3;
  }
}

message FloatArray {
  repeated float values = 1;
}

message PredictResponse {
  string request_id = 1;
  map<string, float> predictions = 2;
  float latency_ms = 3;
  string model_version = 4;
}

message PredictToken {
  string token = 1;
  bool is_final = 2;
  int32 token_index = 3;
}

message InferenceConfig {
  float temperature = 1;
  int32 max_tokens = 2;
  float top_p = 3;
}
```

### Design Principles

- **Use `request_id`** for tracing and idempotency across the service mesh
- **Include `model_version`** in responses for debugging and auditing
- **Use `oneof`** for feature values that can be different types
- **Use `map`** for dynamic feature sets rather than fixed field positions
- **Define `InferenceConfig`** separately so it can be extended without changing the request message

## Python Server Implementation

```python
import grpc
from concurrent import futures
import inference_pb2
import inference_pb2_grpc

class InferenceServicer(inference_pb2_grpc.InferenceServiceServicer):

    def __init__(self, model_registry):
        self.model_registry = model_registry

    def Predict(self, request, context):
        model = self.model_registry.get(request.model_id)
        if model is None:
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f"Model {request.model_id} not found")
            return inference_pb2.PredictResponse()

        features = self._extract_features(request)
        predictions = model.predict(features)

        return inference_pb2.PredictResponse(
            request_id=request.request_id,
            predictions=predictions,
            model_version=model.version,
        )

    def StreamPredict(self, request, context):
        model = self.model_registry.get(request.model_id)
        for i, token in enumerate(model.generate_stream(request)):
            if context.is_active():
                yield inference_pb2.PredictToken(
                    token=token,
                    is_final=False,
                    token_index=i,
                )
            else:
                return  # Client cancelled
        yield inference_pb2.PredictToken(
            token="", is_final=True, token_index=i + 1
        )

def serve():
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=10),
        options=[
            ("grpc.max_send_message_length", 100 * 1024 * 1024),
            ("grpc.max_receive_message_length", 100 * 1024 * 1024),
            ("grpc.keepalive_time_ms", 30000),
            ("grpc.keepalive_timeout_ms", 10000),
        ],
    )
    inference_pb2_grpc.add_InferenceServiceServicer_to_server(
        InferenceServicer(model_registry), server
    )
    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()
```

## Load Balancing

gRPC uses HTTP/2 with long-lived connections. Traditional L4 load balancers assign a connection once, so all RPCs on that connection go to the same backend. This creates hotspots.

**Solution: L7 load balancing.** Use Envoy, Istio, or AWS ALB with gRPC support to load balance at the request level rather than the connection level.

```yaml
# Envoy configuration for gRPC load balancing
clusters:
  - name: inference_cluster
    type: STRICT_DNS
    lb_policy: ROUND_ROBIN
    http2_protocol_options: {}
    load_assignment:
      cluster_name: inference_cluster
      endpoints:
        - lb_endpoints:
            - endpoint:
                address:
                  socket_address:
                    address: inference-service
                    port_value: 50051
```

In Kubernetes, use a headless service with client-side load balancing or a service mesh (Istio) for transparent L7 balancing.

## Health Checks

Implement the gRPC health checking protocol so load balancers and Kubernetes can probe readiness:

```python
from grpc_health.v1 import health_pb2_grpc, health

health_servicer = health.HealthServicer()
health_pb2_grpc.add_HealthServicer_to_server(health_servicer, server)

# Set service status based on model readiness
health_servicer.set("InferenceService", health_pb2.HealthCheckResponse.SERVING)
```

Configure Kubernetes readiness probes to use grpc:

```yaml
readinessProbe:
  grpc:
    port: 50051
    service: InferenceService
  initialDelaySeconds: 30
  periodSeconds: 10
```

## Performance Tuning

- **Connection pooling** - Clients should reuse gRPC channels rather than creating new ones per request
- **Message size limits** - Set appropriate max message sizes for large embedding arrays
- **Keepalive** - Configure keepalive pings to prevent idle connection closures by intermediate proxies
- **Compression** - Enable gzip compression for large payloads: `channel = grpc.insecure_channel('host:port', compression=grpc.Compression.Gzip)`
- **Async server** - For Python, use `grpc.aio` for async server implementation when handling many concurrent streaming connections
