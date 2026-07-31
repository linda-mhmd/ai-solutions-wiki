---
title: "What is Kubernetes?"
description: "Kubernetes manages containers at scale—deciding where they run, restarting them when they fail, and scaling them up when traffic spikes. The operating system for the cloud."
date: 2026-07-30
level: 3
categories: [Basics]
tags: [kubernetes, containers, orchestration, infrastructure, cloud-native, devops]
faqs:
  - question: "Do I need Kubernetes?"
    answer: "Probably not, if you're asking. Kubernetes solves problems of scale and complexity. If you have one app with moderate traffic, simpler options (Railway, Render, or managed services) work better. Kubernetes makes sense when you have many services, need fine control, or operate at scale."
  - question: "Why is Kubernetes so complicated?"
    answer: "Because it solves complicated problems: running thousands of containers across hundreds of machines, handling failures, managing networking and storage, securing everything. The complexity matches the problem scope. For simpler problems, use simpler tools."
  - question: "What does K8s mean?"
    answer: "K8s is shorthand for Kubernetes—K, followed by 8 letters (ubernete), followed by s. Numeronyms like this are common in tech (i18n for internationalization, a11y for accessibility)."
last_updated: 2026-07-30
---

{{< quickanswer >}}
Kubernetes (K8s) is a container orchestration system. When you have many containers running across many machines, Kubernetes decides where each container runs, ensures the right number are running, restarts crashed containers, routes traffic between them, manages configuration, and handles scaling. It's the operating system for distributed containerized applications.
{{< /quickanswer >}}

## The problem Kubernetes solves

### One container is easy

Running a single container is straightforward:
```bash
docker run my-app
```

Your app is running. Done.

### Many containers are hard

Now imagine:
- 50 different services (microservices architecture)
- Each needs multiple copies for redundancy
- Running across 20 servers
- Traffic varies—sometimes 10x normal load
- Servers sometimes fail
- You need to update services without downtime

Without orchestration, you're manually:
- Deciding which container goes on which server
- Monitoring every container for failures
- Manually restarting crashed containers
- Manually scaling up during traffic spikes
- Coordinating deployments across all servers

This doesn't scale. Kubernetes automates it.

## What Kubernetes does

### Scheduling

You say: "Run 5 copies of my web server."

Kubernetes decides: "I'll put 2 on server A, 2 on server B, 1 on server C based on available resources."

You don't pick servers. Kubernetes does.

### Self-healing

A container crashes. Kubernetes notices and starts a replacement—automatically, within seconds.

A server dies. Kubernetes moves its containers to healthy servers.

You describe the desired state ("I want 5 copies running"). Kubernetes maintains it.

### Scaling

Traffic increases. Kubernetes can automatically add more container copies.

Traffic decreases. Kubernetes removes extras to save resources.

Or you manually adjust: "Now I want 10 copies."

### Service discovery and load balancing

Containers get IP addresses, but those change when containers restart. Kubernetes provides stable names and routes traffic to healthy containers automatically.

Service A calls Service B by name. Kubernetes figures out which container to route to.

### Rolling updates

Deploy a new version without downtime:
1. Start new containers with new version
2. Gradually route traffic to new containers
3. Remove old containers

If the new version fails, roll back automatically.

### Configuration management

Kubernetes stores configuration (config maps) and secrets separately from containers. Update configuration without rebuilding containers.

## Kubernetes architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       Kubernetes Cluster                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                      Control Plane                           ││
│  │  ┌─────────┐ ┌───────────┐ ┌────────────┐ ┌───────────────┐ ││
│  │  │   API   │ │ Scheduler │ │ Controller │ │     etcd      │ ││
│  │  │ Server  │ │           │ │  Manager   │ │ (state store) │ ││
│  │  └─────────┘ └───────────┘ └────────────┘ └───────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Worker Node   │  │   Worker Node   │  │   Worker Node   │  │
│  │  ┌───────────┐  │  │  ┌───────────┐  │  │  ┌───────────┐  │  │
│  │  │   Pod     │  │  │  │   Pod     │  │  │  │   Pod     │  │  │
│  │  │┌─────────┐│  │  │  │┌─────────┐│  │  │  │┌─────────┐│  │  │
│  │  ││Container││  │  │  ││Container││  │  │  ││Container││  │  │
│  │  │└─────────┘│  │  │  │└─────────┘│  │  │  │└─────────┘│  │  │
│  │  └───────────┘  │  │  └───────────┘  │  │  └───────────┘  │  │
│  │  ┌───────────┐  │  │  ┌───────────┐  │  │                 │  │
│  │  │   Pod     │  │  │  │   Pod     │  │  │                 │  │
│  │  └───────────┘  │  │  └───────────┘  │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Control plane

The "brain" of Kubernetes:

- **API Server**: How you interact with the cluster (kubectl commands go here)
- **Scheduler**: Decides which node runs each pod
- **Controller Manager**: Ensures desired state matches actual state
- **etcd**: Database storing all cluster state

### Worker nodes

Where your applications actually run:

- **Kubelet**: Agent that runs on each node, manages pods
- **Container runtime**: Docker or containerd, runs containers
- **Pods**: Groups of containers that run together

### Pods

The smallest unit in Kubernetes. A pod can contain:
- One container (most common)
- Multiple tightly-coupled containers (sidecar pattern)

Containers in a pod share network and storage.

## Key Kubernetes concepts

### Deployments

Define what you want running:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-server
spec:
  replicas: 3  # Run 3 copies
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: nginx:1.24
        ports:
        - containerPort: 80
```

Apply this, and Kubernetes ensures 3 nginx containers are always running.

### Services

Provide stable network access to pods:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

Other pods call `web-service` and reach one of the nginx pods. External traffic can reach it too.

### ConfigMaps and Secrets

Store configuration outside containers:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_HOST: "db.example.com"
  LOG_LEVEL: "info"
```

Secrets work similarly but are encoded and have stricter access controls.

### Namespaces

Logical separation within a cluster. Useful for:
- Separating teams
- Separating environments (dev, staging, prod)
- Applying different resource quotas

## The origin story

### Google's internal systems

Google ran containers at massive scale using internal systems called **Borg** and **Omega**. Lessons from running these systems for a decade informed Kubernetes design.

### Open-sourced in 2014

Google open-sourced Kubernetes in 2014 and donated it to the Cloud Native Computing Foundation (CNCF) in 2015. This neutral governance helped adoption—companies could use it without depending on Google.

### Why Google did this

- **Commoditize cloud**: If Kubernetes works everywhere, applications are portable, reducing lock-in to any single cloud provider
- **Attract talent**: Developers wanted to work on Kubernetes
- **Ecosystem benefits**: A thriving Kubernetes ecosystem benefits everyone, including Google Cloud
- **Industry standard**: Being the creator of the standard matters

## When Kubernetes makes sense

### Good candidates

- **Many microservices** (10+): Orchestration value increases with service count
- **Large scale**: Hundreds of containers across many nodes
- **Multi-team organizations**: Different teams deploy independently
- **Hybrid/multi-cloud**: Same deployment model everywhere
- **Complex requirements**: Custom scheduling, GPU workloads, specific networking

### Not good candidates

- **Single application**: Use simpler hosting (Railway, Render, Heroku)
- **Small team without ops expertise**: Kubernetes requires knowledge to operate well
- **Simple workloads**: Managed services often work better (Lambda, Cloud Run)
- **Cost-sensitive small scale**: Kubernetes has overhead

## Managed Kubernetes services

Running Kubernetes yourself is complex. Managed services handle the control plane:

| Provider | Service | Notes |
|----------|---------|-------|
| AWS | EKS | Integrates with AWS ecosystem |
| Google Cloud | GKE | Arguably the most mature |
| Azure | AKS | Microsoft's offering |
| DigitalOcean | DOKS | Simpler, cheaper for smaller scale |
| Linode | LKE | Budget-friendly option |

You still manage worker nodes and applications, but the control plane is handled.

## Alternatives to Kubernetes

### For simpler needs

- **Docker Compose**: Run multi-container apps on one machine
- **Docker Swarm**: Simpler orchestration, less ecosystem
- **AWS ECS**: Container orchestration without Kubernetes complexity
- **Nomad**: HashiCorp's simpler alternative

### For managed workloads

- **Serverless containers**: Cloud Run (GCP), App Runner (AWS), Azure Container Apps
- **Platform as a Service**: Heroku, Railway, Render
- **Serverless functions**: Lambda, Cloud Functions

Many teams use Kubernetes for some workloads and simpler options for others.

## The ecosystem

Kubernetes spawned a massive ecosystem:

- **Helm**: Package manager for Kubernetes (charts = packages)
- **Istio/Linkerd**: Service mesh for advanced networking
- **ArgoCD/Flux**: GitOps deployment tools
- **Prometheus**: Monitoring designed for Kubernetes
- **Grafana**: Visualization for metrics
- **cert-manager**: Automatic TLS certificates
- **Operators**: Custom extensions for specific applications

The CNCF landscape includes hundreds of projects.

## Learning path

If you want to learn Kubernetes:

1. **Understand containers first** (Docker basics)
2. **Learn kubectl** (the command-line tool)
3. **Deploy a simple app** (deployment, service, ingress)
4. **Understand debugging** (logs, describe, exec)
5. **Learn configuration** (ConfigMaps, Secrets)
6. **Explore the ecosystem** (Helm, monitoring)

Start with local tools like **minikube** or **kind** (Kubernetes in Docker) before touching cloud providers.

## Further reading

- [What are containers?](/basics/what-are-containers/): The foundation Kubernetes builds on
- [What is cloud-native?](/basics/what-is-cloud-native/): The philosophy behind Kubernetes
- [Famous open source projects](/basics/famous-open-source-projects/): Kubernetes' origin story in context
- [Open source foundations](/basics/open-source-foundations/): How CNCF governs Kubernetes
- [When do I need multiple servers?](/basics/when-do-i-need-multiple-servers/): Scaling decisions
