---
title: "Eclipse Mosquitto - Lightweight MQTT Broker"
description: "Eclipse Mosquitto is an open-source lightweight MQTT message broker for implementing publish/subscribe messaging in IoT and M2M communication."
date: 2026-03-28
categories: [Tools]
tags: [open-source, mqtt, iot, messaging, broker, embedded-systems, edge-computing]
related:
  - tools/aws-iot-core
  - tools/apache-kafka
last_updated: 2026-05-30
---

Eclipse Mosquitto is an open-source message broker that implements the MQTT (Message Queuing Telemetry Transport) protocol versions 5.0, 3.1.1, and 3.1. MQTT is a lightweight publish/subscribe messaging protocol designed for constrained devices and low-bandwidth, high-latency, or unreliable networks, making it the dominant protocol for Internet of Things (IoT) communication. Mosquitto provides a compact, efficient broker implementation suitable for everything from single-board computers (Raspberry Pi) to full-scale server deployments.

Mosquitto handles the core MQTT functionality of accepting connections from clients, receiving published messages, and delivering them to subscribing clients based on topic matching. It supports MQTT's three quality-of-service levels (QoS 0 - at most once, QoS 1 - at least once, QoS 2 - exactly once), retained messages, last will and testament (LWT) for detecting disconnected clients, persistent sessions, and topic-based access control. Mosquitto supports TLS/SSL encryption, username/password authentication, and plugin-based authentication/authorization backends (including integration with databases, LDAP, and JWT tokens). MQTT over WebSockets enables browser-based clients to connect directly to the broker.

Mosquitto is one of the most widely deployed MQTT brokers globally, used in smart home systems (Home Assistant), industrial IoT, fleet management, environmental monitoring, and any scenario requiring lightweight device-to-cloud or device-to-device messaging. Its small footprint (a few MB of memory for thousands of connections) makes it ideal for edge computing deployments where resources are constrained.

## Key Capabilities

- **MQTT 5.0 Support** - Full implementation of MQTT 5.0 including shared subscriptions, topic aliases, message expiry, and user properties
- **Lightweight Footprint** - Minimal resource requirements enabling deployment on embedded systems, Raspberry Pi, and edge devices
- **Bridge Mode** - Connect multiple Mosquitto instances or bridge to cloud MQTT services for hierarchical edge-to-cloud messaging architectures
- **Plugin Authentication** - Extensible authentication and authorization via plugins supporting databases, LDAP, JWT, and custom backends

## Cloud Equivalents

Eclipse Mosquitto is the open-source alternative to AWS IoT Core, Azure IoT Hub, and Google Cloud IoT Core (deprecated). Cloud IoT services provide device management, rules engines, and integration with cloud analytics, while Mosquitto provides the core MQTT messaging layer with minimal overhead, often deployed at the edge as a bridge to cloud services.

## Origins and History

Eclipse Mosquitto was created by Roger Light in 2009 and became part of the Eclipse Foundation's IoT ecosystem in 2013. The project is licensed under the Eclipse Public License 2.0 (EPL-2.0). MQTT itself was invented by Andy Stanford-Clark (IBM) and Arlen Nipper (Cirronet) in 1999 for monitoring oil pipelines via satellite, and was standardized as an OASIS standard in 2014 and ISO standard in 2016. Mosquitto has been the reference MQTT broker implementation throughout much of MQTT's history and remains one of the most popular choices for MQTT deployments worldwide.

## Sources

1. https://mosquitto.org/
2. https://github.com/eclipse/mosquitto
