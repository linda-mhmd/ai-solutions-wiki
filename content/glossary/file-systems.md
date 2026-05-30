---
title: "File Systems"
description: "The methods and data structures operating systems use to organize, store, and retrieve data on storage devices, including ext4, NTFS, journaling, and inode-based designs."
date: 2026-03-28
categories: [Glossary]
tags: [operating-systems, file-systems, storage, ext4, ntfs, journaling]
last_updated: 2026-05-30
---

A file system defines how data is organized, stored, and retrieved on a storage device. It provides the abstractions of files (named sequences of bytes) and directories (hierarchical containers for files), along with metadata such as permissions, timestamps, and ownership. The choice of file system affects performance, reliability, and feature set.

## Core Concepts

**Inodes** are the fundamental data structure in Unix-like file systems. Each file or directory has an inode containing metadata (size, permissions, timestamps, owner) and pointers to the data blocks on disk. The file name is stored in the directory entry, which maps names to inode numbers. This separation means a single file can have multiple names (hard links) pointing to the same inode.

**Superblock** stores file system metadata: total size, block size, number of free blocks and inodes, and the location of key data structures. The superblock is critical; file systems maintain backup copies to survive corruption.

**Block allocation** determines how disk space is assigned to files. Contiguous allocation is fast for reading but causes fragmentation. Linked allocation chains blocks together but is slow for random access. Indexed allocation (used by ext4 and NTFS) uses index structures to map file offsets to disk blocks, balancing performance and flexibility.

## Common File Systems

**ext4** is the default Linux file system. It supports volumes up to 1 exabyte, files up to 16 terabytes, uses extents (contiguous ranges of blocks) for efficient allocation, and includes journaling. Backward-compatible with ext2 and ext3.

**NTFS** (New Technology File System) is the default Windows file system. It supports large volumes, file-level encryption (EFS), compression, access control lists (ACLs), and journaling. NTFS uses a Master File Table (MFT) where each file is represented as a record.

**XFS** is a high-performance journaling file system originally developed by Silicon Graphics. It excels at parallel I/O and large file handling, making it popular for data-intensive workloads.

**ZFS** combines the file system and volume manager, providing built-in data integrity verification (checksums), copy-on-write snapshots, RAID-Z, and automatic repair. Originally developed by Sun Microsystems.

## Journaling

Journaling file systems maintain a log (journal) of changes before applying them to the main file system structures. If the system crashes during a write, the journal can be replayed to restore consistency without a full file system check. **Metadata journaling** (ext4 default) journals only structural changes. **Full journaling** journals both metadata and data, providing stronger guarantees at a performance cost.

## Origins and History

The Unix file system design, with its inode-based structure, was created by Ken Thompson and Dennis Ritchie for the original Unix in 1969 [1]. The ext family of file systems for Linux began with ext2 (1993) by Remy Card, with ext3 adding journaling (2001) and ext4 adding extents and other improvements (2008) [2]. NTFS was developed by Microsoft for Windows NT 3.1, released in 1993 [3].

## Sources

1. Ritchie, D.M. & Thompson, K. (1974). "The UNIX Time-Sharing System." *Communications of the ACM*, 17(7), 365-375.
2. Mathur, A., Cao, M., Bhattacharya, S., Dilger, A., Tomas, A., & Vivier, L. (2007). "The New ext4 Filesystem: Current Status and Future Plans." *Proceedings of the Linux Symposium*, 21-34.
3. Microsoft Corporation (1993). "NTFS Technical Reference." Windows NT 3.1 documentation.
