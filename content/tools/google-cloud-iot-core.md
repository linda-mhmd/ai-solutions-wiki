---
title: "Cloud IoT Core - IoT Device Management (Deprecated)"
description: "Google Cloud IoT Core was a managed service for connecting, managing, and ingesting data from IoT devices, deprecated in August 2023."
date: 2026-03-28
categories: [Tools]
tags: [gcp, google-cloud, iot, device-management, mqtt, deprecated]
related:
  - tools/aws-iot-core
  - tools/google-cloud-pub-sub
  - tools/google-vertex-ai
last_updated: 2026-05-30
---

Google Cloud IoT Core was a fully managed service for securely connecting, managing, and ingesting telemetry data from millions of globally dispersed IoT devices. It provided device registration, authentication via public/private key pairs or JSON Web Tokens, and bidirectional communication over MQTT and HTTP protocols. Device telemetry data flowed into Cloud Pub/Sub for downstream processing by Dataflow, Cloud Functions, or BigQuery. IoT Core was Google Cloud's answer to AWS IoT Core, serving as the entry point for IoT data into the GCP analytics and AI ecosystem.

The service supported device registries for organizing devices, device state management for tracking configuration and status, and gateway devices that could relay data from devices that lacked direct internet connectivity. A typical IoT-to-AI architecture used IoT Core for device connectivity, Pub/Sub for message routing, Dataflow for stream processing, BigQuery for analytics, and Vertex AI for predictive maintenance or anomaly detection models trained on sensor data. IoT Core handled the device-to-cloud communication layer, abstracting away the complexity of device authentication, connection management, and protocol handling.

Google deprecated Cloud IoT Core on August 16, 2023, giving customers one year to migrate (the service shut down on August 16, 2023, with a migration deadline). Google cited partner ecosystem solutions as alternatives and recommended customers migrate to third-party IoT platforms that integrate with GCP, such as ClearBlade IoT Core (which offers a migration path with API compatibility), or build custom MQTT brokers on GKE or Compute Engine connected to Pub/Sub. The deprecation was notable as one of the first high-profile managed service retirements by a major cloud provider, raising questions about the viability of cloud-specific IoT platforms. Organizations that had built on IoT Core needed to re-architect their device connectivity layer while preserving their downstream GCP analytics and AI pipelines.

## Key Capabilities

- **Device Management** - Device registries, per-device authentication with X.509 certificates, and device state tracking for configuration management.
- **MQTT and HTTP Protocol Support** - Standard protocols for device-to-cloud communication, enabling compatibility with a broad range of IoT hardware.
- **Pub/Sub Integration** - Automatic forwarding of device telemetry to Cloud Pub/Sub topics for downstream stream processing and analytics.
- **Gateway Support** - Protocol translation gateways for connecting legacy devices or devices without direct internet connectivity.

## AWS Equivalent

Cloud IoT Core was Google Cloud's counterpart to AWS IoT Core. AWS IoT Core remains active and continues to be enhanced, while Cloud IoT Core has been deprecated. AWS IoT Core offers a more comprehensive IoT platform with device shadows, rules engine, Device Defender for security auditing, and integration with AWS IoT Greengrass for edge computing. The deprecation of Google's offering has made AWS IoT Core and Azure IoT Hub the primary cloud-managed IoT platforms.

## Origins and History

Google Cloud IoT Core was announced at Google Cloud Next 2017 in March 2017 and reached general availability in February 2018. The service was part of Google's push to establish GCP as a platform for industrial IoT and smart infrastructure. In January 2022, Google formed a partnership with ClearBlade to enhance IoT edge computing capabilities. On August 16, 2022, Google announced the deprecation of Cloud IoT Core, effective August 16, 2023. Google recommended ClearBlade IoT Core as a compatible replacement and published migration guides. The deprecation surprised many customers and was widely discussed as a cautionary tale about cloud service longevity.

## Sources

1. Google Cloud Documentation. "Cloud IoT Core deprecation." https://cloud.google.com/iot/docs/release-notes
2. Google Cloud Blog. "Recommended alternatives after Cloud IoT Core retirement." 2022. https://cloud.google.com/blog/products/iot-devices/cloud-iot-core-retirement
