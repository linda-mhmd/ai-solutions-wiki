---
title: "Apache Hadoop (2006)"
description: "An open-source framework for storing and processing huge datasets across clusters of cheap machines, the system that brought distributed big-data computing to the mainstream."
date: 2026-06-23
categories: [History]
tags: [computing-history, hadoop, big-data, distributed-systems, mapreduce, open-source, apache]
related:
  - explore/it-timeline
  - explore/galaxy
  - history/apache-httpd
  - history/sql
  - history/java
faqs:
  - question: "Who created Apache Hadoop and why?"
    answer: "Doug Cutting and Mike Cafarella created Hadoop. They were building an open-source web search engine called Nutch and needed a way to store and process the whole web. Google had published two papers describing its own approach, the Google File System in 2003 and MapReduce in 2004. Cutting and Cafarella reimplemented those ideas as open source, then split the storage and processing parts out of Nutch into a new project named Hadoop in early 2006. Cutting named it after his son's toy elephant."
  - question: "What are HDFS and MapReduce?"
    answer: "They are the two original core parts of Hadoop. HDFS, the Hadoop Distributed File System, spreads one huge file across many machines and keeps several copies of each block so the data survives a disk failure. MapReduce is a programming model for processing that data. It splits a job into a map step that runs in parallel on every machine, then a reduce step that combines the results. Together they let you store and crunch petabytes of data on ordinary servers."
  - question: "Is Hadoop still used in 2026?"
    answer: "Yes, but its role has narrowed. Many workloads that once ran on Hadoop MapReduce now run on Apache Spark or on cloud data warehouses and object storage. The Hadoop project is in maintenance, with security and stability updates rather than rapid new features. Large on-premise data lakes built in the 2010s still run on it, and HDFS and YARN remain in production at many organisations. Its ideas live on in nearly every distributed data system."
---

Apache Hadoop is an open-source framework for storing and processing very large datasets across clusters of ordinary machines. Doug Cutting and Mike Cafarella split it out of the Nutch search project in early 2006, drawing on Google's published designs. It made big-data processing affordable and put it within reach of any company, not only web giants.

<figure class="bz-figure"><img src="/img/enterprise-dark/gears-neural-wires-notext.png" alt="Interlocking dark industrial gears laced with glowing red neural wires. The image suggests many coordinated machines working as one engine, like the clustered servers Hadoop binds together to process big data." loading="lazy"><figcaption>Hadoop turned a room full of cheap servers into one coordinated engine for storing and crunching enormous datasets.</figcaption></figure>

## What it was

Before Hadoop, processing terabytes of data meant buying one very large, very expensive machine. That approach hit a ceiling. A single server can hold only so many disks, and scaling it up cost more each step. Web companies were generating data faster than any one machine could handle.

Hadoop took a different path. Instead of one big computer, it used many small, cheap ones working together as a cluster. The framework handled the hard parts: splitting data across machines, running work in parallel, and recovering when a machine failed. Failure was treated as normal, not as an emergency.

Two parts did the core work. HDFS, the distributed file system, chopped a huge file into blocks and scattered them across the cluster. It kept several copies of each block, so a dead disk lost no data. MapReduce was the processing model. A map step ran in parallel across every machine that held the data, then a reduce step combined the partial results into a final answer.

Think of counting every word in a vast library. One person reading every book would take years. Hadoop hands each reader a few shelves, asks them to tally words on their own shelves, then merges the tallies. The work moves to where the books sit, not the books to one desk.

<div class="bz-flow">
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 1</span><span class="bz-flow-step-name">Store</span><span class="bz-flow-step-desc">HDFS splits a huge file into blocks, copies each block, and spreads them across the cluster.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 2</span><span class="bz-flow-step-name">Map</span><span class="bz-flow-step-desc">A map task runs on each machine, processing the local blocks in parallel.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 3</span><span class="bz-flow-step-name">Shuffle</span><span class="bz-flow-step-desc">The framework groups and moves intermediate results so related keys land together.</span></div>
  <div class="bz-flow-arrow">→</div>
  <div class="bz-flow-step"><span class="bz-flow-step-tag">Step 4</span><span class="bz-flow-step-name">Reduce</span><span class="bz-flow-step-desc">Reduce tasks combine the grouped results into the final output written back to HDFS.</span></div>
</div>

## Why it mattered

Hadoop made big data cheap. A cluster of commodity servers cost a fraction of one high-end machine with the same capacity. To grow, you added more nodes rather than replacing the whole system. This linear, low-cost scaling changed what companies could afford to analyse.

It democratised a capability that had belonged to a few. Google described its methods in papers but kept the code private. Hadoop gave everyone a working, open implementation under the Apache licence. Yahoo invested heavily and ran some of the largest clusters of the era, then contributed back. By 2008 a Hadoop cluster sorted a terabyte of data in record time, proving the model at scale.

A whole ecosystem grew around it. Apache Hive added a SQL-like layer so analysts could query data without writing MapReduce code. Apache Pig offered a scripting language. HBase added a database for fast lookups. Apache ZooKeeper coordinated the moving parts. Companies like Cloudera and Hortonworks built businesses packaging and supporting these tools. The phrase "data lake", a single store holding all of an organisation's raw data, took hold in this period.

## How it connects to AI today

Hadoop's deepest legacy is the idea that you process data where it lives, across many machines, and design for failure from the start. Modern AI lives on this idea. Training a large model means moving huge datasets through clusters of machines in parallel, the same shape of problem Hadoop solved first.

The direct technical successor is Apache Spark. Spark kept Hadoop's distributed model but ran computation in memory, which made it far faster for the repeated passes that machine learning needs. Many teams still run Spark on a Hadoop cluster, reading from HDFS and scheduling work through YARN, Hadoop's resource manager. So Hadoop often sits underneath the AI data pipeline even when nobody writes MapReduce by hand.

YARN itself is a turning point. Introduced in Hadoop 2 around 2013, it separated resource management from MapReduce. That let one cluster run many kinds of workloads, including Spark and early machine-learning jobs. The pattern of a shared scheduler handing GPUs and CPUs to competing jobs echoes through today's AI training platforms.

A builder meets Hadoop's descendants constantly. Cloud data lakes on Amazon S3, Azure Data Lake Storage, and Google Cloud Storage borrowed the architecture, then swapped HDFS for cheaper object storage. Platforms like Databricks grew straight out of the Spark and Hadoop world. When you assemble a training set, clean event logs, or build features for a model, you are working in a pipeline that Hadoop's design made normal.

## Still in use today

Hadoop is in maintenance. The Apache project is alive and releases updates, but the focus is stability, security, and compatibility rather than fast new features. The excitement and the new workloads have moved elsewhere. The two companies that drove its commercial peak, Cloudera and Hortonworks, merged in 2019, a clear sign the gold-rush phase had ended.

Two forces pulled work away from it. Apache Spark replaced MapReduce for most processing because it is faster and friendlier to write. Cloud storage and warehouses, separating compute from storage, replaced HDFS for many new projects because they scale and cost less without a fixed cluster.

Yet Hadoop persists. Large on-premise data lakes built through the 2010s still run on HDFS and YARN, and migrating petabytes is slow and costly. Organisations with strict data-residency or regulatory rules keep running their own clusters. So Hadoop endures as durable infrastructure, while its core concepts now shape almost every distributed data and AI system in use.

## Further reading

- [IT History Timeline](/explore/it-timeline/): see where Hadoop sits in the broader story of computing.
- [AI Learning Galaxy](/explore/galaxy/): explore how big-data foundations connect to modern AI topics.
- [SQL (1974)](/history/sql/): the query language that Hive brought to Hadoop and that still rules data work.
- [Java (1995)](/history/java/): the language Hadoop is written in and runs on.
- [Apache Hadoop project site](https://hadoop.apache.org/): official documentation, releases, and component guides.
- [MapReduce paper, Dean and Ghemawat, 2004](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/): the Google paper that inspired Hadoop's processing model.
- [Apache Hadoop on Wikipedia](https://en.wikipedia.org/wiki/Apache_Hadoop): history, architecture, and ecosystem overview with sources.
