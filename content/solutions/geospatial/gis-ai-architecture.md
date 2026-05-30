---
title: "GIS and AI Architecture on AWS"
description: "How to combine geospatial data processing (GeoPandas, Shapely, satellite imagery) with AI services (Bedrock, OpenSearch) for natural language queries and spatial intelligence."
date: 2026-03-24
categories: [Solutions]
tags: ["ai-ml", "advanced", "gis", "geospatial", "ai-architecture", "mapping", "spatial-data"]
industries: [geospatial]
tools: [amazon-bedrock, amazon-opensearch, amazon-lambda, amazon-s3]
last_updated: 2026-05-30
---

Geospatial AI combines spatial data processing with large language models to enable natural language queries over geographic information systems. Rather than requiring users to write spatial SQL or GIS software expertise, an AI layer translates natural language into spatial operations and returns answers in plain language.

## Architecture Overview

The architecture has three layers:

1. **Data layer** - satellite imagery and vector data in S3, processed with GeoPandas/Shapely
2. **Index layer** - spatial features and embeddings in OpenSearch for semantic and spatial search
3. **AI layer** - Bedrock for natural language understanding and answer generation

## Data Processing Layer

**Satellite data ingestion** - Satellite imagery (Sentinel-2, Landsat, commercial providers) arrives in S3 as GeoTIFF files. Lambda functions process these using the GDAL/Rasterio library (packaged as a Lambda layer or container image). Processing extracts band values, computes indices (NDVI for vegetation, NDWI for water), and tiles large images into analysis-ready chunks.

**Vector data processing** - Administrative boundaries, road networks, land parcels, and point-of-interest datasets are stored as GeoJSON or Parquet files in S3. GeoPandas reads these into memory for spatial operations: intersection, buffer, nearest neighbor, and overlay analysis.

**Shapely geometries** power the computational geometry operations: polygon containment checks, distance calculations, convex hull generation, and geometry simplification for storage optimization.

**Feature extraction** - From raw raster and vector inputs, the pipeline extracts meaningful features: land use classification per parcel, proximity to infrastructure, elevation statistics, change detection comparing images from different dates.

## Index Layer: OpenSearch Spatial Index

OpenSearch (via the k-NN and geo-point field types) serves as the retrieval layer for two query types:

**Semantic search** - Spatial features are described in natural language ("urban residential area near a river, elevated flood risk"). These descriptions are embedded using Bedrock Titan Embeddings and stored as vectors. At query time, a user's question is embedded and matched against the most relevant features.

**Geo-point search** - OpenSearch's native geo-point and geo-shape fields enable bounding box queries, distance filters, and polygon containment. A query like "find all commercial parcels within 500m of a flood zone" executes as a compound geo filter.

The index schema combines both: each document has a text description (for semantic search), a geo-point or geo-shape (for spatial filter), and metadata fields (area, land use code, risk score).

## AI Layer: Bedrock for Natural Language

**Query translation** - A Lambda function receives a natural language query, calls Bedrock (Claude) with a system prompt that defines the available spatial operations and index schema. The model generates a structured query plan: which search type to use (semantic, geo-filter, or hybrid), what filter parameters to apply, and how to combine results.

**Answer generation** - Retrieved spatial features provide context for Bedrock to generate a human-readable answer. The prompt includes: user question, retrieved features (as JSON with properties), and instructions to answer concisely with citations to specific features.

**Agentic queries** - For multi-step analysis (e.g., "which neighborhoods have the highest intersection of flood risk and housing density?"), a Strands or Bedrock agent decomposes the question into spatial sub-queries, executes them, and synthesizes the results.

## Deployment Considerations

**Lambda container image** - GeoPandas, Shapely, GDAL, and Rasterio have complex system dependencies. Package these as a container image rather than a ZIP layer. A multi-stage Docker build (build GDAL from source in a builder stage, copy binaries to the Lambda runtime image) produces a working image under 500 MB.

**Processing time** - Raster analysis over large images can exceed Lambda's 15-minute limit for continental-scale queries. Use Fargate for long-running spatial computations, with Lambda handling API requests and dispatching to Fargate tasks.

**Coordinate systems** - Geospatial data uses many coordinate reference systems (CRS). Standardize everything to WGS84 (EPSG:4326) at ingestion time to avoid projection errors in analysis.

## Example Query Flow

User query: "Show me areas in Region X where forest cover decreased more than 20% since 2020."

1. Bedrock translates query to: `semantic_search("forest cover change") + geo_filter(region_X_polygon) + metadata_filter(ndvi_change < -0.2)`
2. OpenSearch returns matching features
3. Bedrock generates: "Three areas in Region X show significant forest decline: [Feature A] near [town] lost 34% cover, likely due to..."

## Related Articles

- [Amazon OpenSearch Service]({{< relref "/tools/amazon-opensearch.md" >}}) - spatial and semantic indexing
- [Amazon Bedrock]({{< relref "/tools/amazon-bedrock.md" >}}) - natural language AI layer
- [Amazon S3]({{< relref "/tools/aws-s3.md" >}}) - satellite data storage
- [Satellite Data Analysis]({{< relref "satellite-data-analysis.md" >}}) - related geospatial solution
