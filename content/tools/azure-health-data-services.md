---
title: "Azure Health Data Services - Healthcare Data Platform"
description: "Azure Health Data Services is a managed platform for ingesting, persisting, and connecting healthcare data using industry standards like FHIR, DICOM, and MedTech."
date: 2026-03-28
categories: [Tools]
tags: [azure, healthcare, fhir, dicom, health-data, compliance]
related:
  - tools/amazon-healthlake
  - tools/azure-machine-learning
last_updated: 2026-09-25
lastmod: 2026-09-25
last_verified: 2026-09-25
---

Azure Health Data Services is a managed platform within Microsoft Azure designed for healthcare and life sciences organizations to ingest, store, transform, and exchange health data using industry-standard formats and protocols. The service provides three core data services: FHIR (Fast Healthcare Interoperability Resources) for clinical and administrative health records, DICOM (Digital Imaging and Communications in Medicine) for medical imaging data, and MedTech for IoT medical device data ingestion (MedTech is now deprecated; see below). Together, these services enable organizations to build a unified health data layer that supports AI and analytics workloads while maintaining compliance with healthcare regulations including HIPAA, HITRUST, and GDPR.

The FHIR service provides a standards-compliant FHIR R4 API for storing and querying clinical data including patient records, encounters, observations, conditions, medications, and care plans. It supports SMART on FHIR for application authorization, custom search parameters, and the $everything operation for retrieving complete patient records. The DICOM service stores and retrieves medical images (X-rays, CT scans, MRIs, ultrasounds) using the DICOMweb standard protocol, enabling AI-powered medical image analysis workflows that retrieve images via standard APIs and process them through Azure AI or custom models. The MedTech service ingests telemetry from medical IoT devices (vital signs monitors, wearables, glucometers), transforms device-specific data formats into standardized FHIR Observation resources, and persists them in the FHIR service. Microsoft began deprecating MedTech on 3 May 2025; support for active instances ends on 3 May 2028, and an open-source version is available for teams that want to keep the pattern.

For AI applications, Azure Health Data Services provides the standardized data foundation needed for clinical NLP, medical image analysis, predictive modeling, and population health analytics. The de-identification service tags, redacts, or surrogates protected health information (PHI) in unstructured clinical text such as notes and transcripts for research and model training use cases. Integration with Azure Machine Learning enables training clinical AI models on FHIR data, while integration with Azure Synapse Analytics supports population-level analytics on de-identified health data. The FHIR service also supports $convert-data for transforming HL7v2, C-CDA, and other legacy healthcare formats into FHIR.

Official documentation: https://learn.microsoft.com/en-us/azure/healthcare-apis/

## Key Capabilities

- **Standards-Based APIs** - FHIR R4 for clinical data, DICOMweb for medical imaging, and (deprecated) MedTech for device telemetry provide interoperability with the healthcare ecosystem
- **De-Identification** - Built-in de-identification service removes or surrogates PHI in unstructured clinical text for research, analytics, and AI model training use cases
- **MedTech IoT Ingestion (deprecated)** - Transforms medical device telemetry into FHIR Observation resources; deprecation began 3 May 2025, with support for active instances ending 3 May 2028
- **Healthcare Compliance** - HIPAA BAA, HITRUST CSF, SOC 2, and GDPR certifications with built-in audit logging and access controls

## AWS Equivalent

Azure Health Data Services is Azure's counterpart to Amazon HealthLake. Both provide managed FHIR-compliant health data stores, but Azure Health Data Services additionally includes DICOM imaging services and MedTech IoT device integration in a unified platform, while HealthLake focuses primarily on FHIR data with built-in NLP for clinical text extraction. Azure's offering provides broader healthcare data type coverage; HealthLake offers deeper built-in NLP capabilities.

## Origins and History

Azure API for FHIR, the predecessor service, launched in general availability in November 2019, making Azure one of the first major cloud platforms to offer a managed FHIR service. It stopped accepting new customer deployments on 1 April 2025 and retires on 30 September 2026; remaining workloads must move to the Azure Health Data Services FHIR service. Azure Health Data Services, the consolidated platform incorporating FHIR, DICOM, and MedTech services under a single workspace, reached general availability in May 2022. The DICOM service was initially developed through the open-source Medical Imaging Server for DICOM project on GitHub. A standalone de-identification service for unstructured clinical text was added later, and the $convert-data operation for legacy format transformation was progressively enhanced through 2023-2024.

## Sources

1. Microsoft Learn. "What is Azure Health Data Services?" https://learn.microsoft.com/en-us/azure/healthcare-apis/healthcare-apis-overview
2. Microsoft Azure Blog. "Azure Health Data Services is now generally available." May 2022. https://azure.microsoft.com/en-us/blog/azure-health-data-services-is-now-generally-available/
3. Microsoft Learn. "What is the MedTech service?" (deprecation notice), accessed 25 September 2026. https://learn.microsoft.com/en-us/azure/healthcare-apis/iot/overview
4. Microsoft Learn. "What is Azure API for FHIR?" (retirement 30 September 2026), accessed 25 September 2026. https://learn.microsoft.com/en-us/azure/healthcare-apis/azure-api-for-fhir/overview
