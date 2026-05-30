---
title: "Deployment Diagram"
description: "A UML structural diagram that shows the physical deployment of software artifacts on hardware nodes, modeling the runtime architecture of a system."
date: 2026-03-28
categories: [Glossary]
tags: [uml, deployment-diagram, infrastructure, software-architecture, structural-diagrams]
last_updated: 2026-05-30
---

A deployment diagram is a UML structural diagram that models the physical deployment of software artifacts on hardware and execution environment nodes. It shows which software runs on which hardware, how nodes are connected, and how the runtime architecture maps to physical or virtual infrastructure. Deployment diagrams bridge the gap between software design and infrastructure planning.

## Key Elements

**Nodes** represent computational resources. They are drawn as three-dimensional boxes (cubes) with a name and optionally a stereotype.

- **Device nodes** represent physical hardware: servers, workstations, mobile devices, IoT sensors. A device node might be labeled `<<device>> Web Server` or `<<device>> Database Server`.
- **Execution environment nodes** represent software platforms that host artifacts: application servers, containers, virtual machines, browser runtimes. An execution environment might be labeled `<<executionEnvironment>> Docker Container` or `<<executionEnvironment>> JVM`.

Execution environments are typically nested inside device nodes, showing that a Docker container runs on a Linux server, for example.

**Artifacts** are the physical files deployed to nodes: JAR files, WAR files, Docker images, executables, configuration files, database schemas. Artifacts are drawn as rectangles with the `<<artifact>>` stereotype or a document icon, placed inside the node where they are deployed.

**Communication paths** are lines connecting nodes, representing network connections. They can be annotated with the protocol used (HTTP, TCP, gRPC) and multiplicity. A line between the web server and database server labeled `<<TCP>>` shows the network link between them.

**Deployment specifications** describe configuration parameters for a deployed artifact, such as connection pool sizes, memory allocations, or environment variables.

## Modeling Patterns

**Single-tier** deployment places all artifacts on one node. **Multi-tier** deployment separates presentation, application logic, and data onto different nodes. **Cloud deployment** diagrams show artifacts distributed across availability zones, regions, VPCs, and managed services.

For modern cloud-native systems, deployment diagrams can model Kubernetes clusters (nodes within clusters), serverless functions (execution environments without persistent nodes), and managed database services.

## Practical Use

Deployment diagrams are valuable for infrastructure planning, documenting production architecture, capacity planning, security zone design (which nodes are in the DMZ, private subnet, or public subnet), and communicating runtime topology to operations teams. They complement component diagrams by showing where components physically run.

Keeping deployment diagrams at the right level of abstraction is important. A diagram showing every microservice replica on every Kubernetes pod becomes unreadable. Focus on the logical deployment topology and use separate diagrams for detailed infrastructure specifications.

## Origins and History

Deployment diagrams were introduced in UML 1.0 (1997) to address the need for modeling physical system architecture alongside logical design [1]. UML 2.0 (2005) refined the notation with explicit node types (device vs. execution environment), artifact specifications, and deployment specifications [2]. The growing complexity of cloud and container-based deployments has increased the relevance of deployment modeling.

## Sources

1. Booch, G., Rumbaugh, J., & Jacobson, I. (2005). *The Unified Modeling Language User Guide*. 2nd Edition. Addison-Wesley.
2. Object Management Group (2017). "Unified Modeling Language Specification Version 2.5.1." [https://www.omg.org/spec/UML/2.5.1](https://www.omg.org/spec/UML/2.5.1)
