---
title: "What Are Backups?"
description: "Backups are copies of your data that you can restore when things go wrong. Database deleted? Laptop stolen? Server crashed? Backups are what let you recover instead of starting over."
date: 2026-07-30
level: 2
categories: [Basics]
tags: [beginner, backups, disaster-recovery, databases, infrastructure]
faqs:
  - question: "How often should I back up my database?"
    answer: "Depends on how much data you can afford to lose. For most apps, daily backups are the minimum. For apps with constant writes (e-commerce, chat, etc.), hourly or continuous backup (point-in-time recovery) is better. If losing an hour of data would be catastrophic, you need real-time replication."
  - question: "Is pushing to GitHub a backup?"
    answer: "For your code, yes—GitHub stores your repository history and you can recover from it. But GitHub is not a backup for your database, uploaded files, environment variables, or any user data. Those need separate backup strategies."
  - question: "Do I need to manage backups myself?"
    answer: "Not usually. Most managed database services (Railway, Supabase, PlanetScale, AWS RDS) include automatic backups. Check that backups are enabled and test a restore occasionally. For custom setups, you'll need to configure backups yourself."
last_updated: 2026-07-30
---

{{< quickanswer >}}
A backup is a copy of your data stored separately from the original. When your database gets corrupted, your server catches fire, or you accidentally delete everything, backups let you restore to a working state. The question isn't whether you'll need backups—it's whether you'll have them when you do.
{{< /quickanswer >}}

## Why backups matter

Things that can destroy your data:

- **Human error**: You run `DELETE FROM users` without a WHERE clause
- **Code bugs**: A deploy introduces a bug that corrupts data
- **Hardware failure**: Disks die, servers crash
- **Security incidents**: Ransomware encrypts your database
- **Provider issues**: Cloud services have outages and data loss (rare but real)
- **Natural disasters**: Data centers flood, catch fire, or lose power

The only protection against all of these is having copies of your data stored somewhere else.

## What to back up

### 1. Your database

This is the most critical backup. User accounts, orders, posts, settings—everything your app stores lives in the database. Losing it means losing your business.

**How managed databases handle it:**
- **Railway, Render**: Automatic daily backups (check your plan)
- **Supabase**: Daily backups, point-in-time recovery on Pro plan
- **PlanetScale**: Automatic backups and branching
- **AWS RDS**: Configurable automated backups

**For self-managed databases:**
- Set up `pg_dump` (PostgreSQL) or `mysqldump` (MySQL) on a schedule
- Store dumps in object storage (S3, R2)
- Test restores regularly

### 2. User-uploaded files

If users upload images, documents, or any files, those need backups too.

**If you're using object storage (S3, R2, Cloudflare):**
- Enable versioning (keeps old versions when files are overwritten)
- Set up cross-region replication for critical data
- Most providers have built-in redundancy, but versioning protects against accidental deletion

**If files are on your server's disk:**
- That's a single point of failure—move them to object storage
- Or at minimum, back up the disk to another location

### 3. Your code

This is what version control (Git) is for.

- **Push to a remote** (GitHub, GitLab): Your code exists in multiple places
- **Don't just rely on your laptop**: If your laptop dies and you haven't pushed, it's gone
- **Protect your main branch**: Use branch protection to prevent accidental force-pushes

Git itself is a backup system. Every clone contains the full history. But only if you actually push.

### 4. Configuration and secrets

Environment variables, API keys, infrastructure configs—losing these can lock you out of your own systems.

**Where to store them:**
- Password manager (1Password, Bitwarden) for manual backup
- Secrets manager (AWS Secrets Manager, Doppler) for programmatic access
- `.env` files should be documented somewhere recoverable
- Infrastructure-as-code (Terraform, Pulumi) can recreate config, but store the state files safely

### 5. Application state that isn't in the database

- Redis data (if you're using it for more than just caching)
- Logs (if you need historical records)
- Cron job history
- Anything stored in-memory that matters

## The 3-2-1 backup rule

A classic guideline:

- **3** copies of your data
- **2** different storage types (e.g., database + object storage + local disk)
- **1** copy offsite (different physical location or cloud region)

For vibecoders using managed services, this often happens automatically:
- Your database lives on the provider's servers (copy 1)
- The provider takes backups (copy 2)
- You could add your own offsite backup (copy 3)

The third copy is insurance against your provider having a catastrophic failure or your account being compromised.

## Point-in-time recovery (PITR)

Regular backups capture your data at fixed intervals. If you back up at midnight and your database corrupts at 11pm, you lose 23 hours of data.

**Point-in-time recovery** lets you restore to any moment:
- The database logs every change
- You can "replay" to any timestamp
- Lost the last hour? Restore to 59 minutes ago

PITR is standard on serious managed databases (AWS RDS, Supabase Pro, etc.). It's critical for apps where losing hours of data is unacceptable.

## Testing your backups

A backup you've never restored is a backup you hope works. Hope is not a strategy.

**Test restores regularly:**
1. Spin up a test environment
2. Restore from backup
3. Verify the data is correct and complete
4. Do this at least quarterly

**Common restore failures:**
- Backup file is corrupted
- Restore process has bugs
- Missing dependencies or config
- Backup is incomplete (missing tables, files)

Finding out your backups don't work when you need them is worse than not having backups—you thought you were protected.

## Backup strategies for vibecoders

### Using managed platforms (Vercel + Supabase/Railway)

1. **Database**: Check that automatic backups are enabled (they usually are)
2. **Files**: Use object storage with versioning (Supabase Storage, S3, R2)
3. **Code**: Push to GitHub regularly
4. **Secrets**: Store in a password manager
5. **Test**: Restore to a test environment once to confirm it works

### Running your own server (DigitalOcean, self-hosted)

1. **Database**: Set up automated dumps + upload to S3/R2
2. **Server snapshots**: Most providers offer disk snapshots (DigitalOcean Backups)
3. **Files**: Move to object storage or include in snapshots
4. **Off-site copy**: Replicate to a different region or provider
5. **Monitor**: Set up alerts if backups fail

### Sample backup script (PostgreSQL to S3)

```bash
#!/bin/bash
# Run this daily via cron

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_$TIMESTAMP.sql.gz"

# Dump and compress
pg_dump $DATABASE_URL | gzip > /tmp/$BACKUP_FILE

# Upload to S3
aws s3 cp /tmp/$BACKUP_FILE s3://my-backups/database/$BACKUP_FILE

# Clean up local file
rm /tmp/$BACKUP_FILE

# Optional: delete backups older than 30 days
aws s3 ls s3://my-backups/database/ | while read -r line; do
  createDate=$(echo $line | awk '{print $1" "$2}')
  createDate=$(date -d "$createDate" +%s)
  olderThan=$(date -d "30 days ago" +%s)
  if [[ $createDate -lt $olderThan ]]; then
    fileName=$(echo $line | awk '{print $4}')
    aws s3 rm s3://my-backups/database/$fileName
  fi
done
```

## Disaster recovery vs. backups

**Backups** protect against data loss. You can restore data.

**Disaster recovery** is the plan for getting everything running again after a major incident. It includes:
- How long until you're back online (RTO: Recovery Time Objective)
- How much data loss is acceptable (RPO: Recovery Point Objective)
- Who does what during an incident
- How to communicate with users

For a side project, "I'll figure it out" might be your disaster recovery plan. For a product with paying users, document the process before you need it.

## What vibecoders commonly forget

1. **Testing restores**: Everyone has backups. Not everyone has working restores.

2. **Environment variables**: Your app won't run if you lose your API keys and don't have them stored anywhere.

3. **Upload files**: Database backups don't include files users uploaded. Those need separate handling.

4. **Backup verification**: A corrupted backup file is useless. Check file integrity.

5. **Account access**: If your hosting account gets compromised and deleted, can you recover? Enable 2FA. Keep recovery codes safe.

## Further reading

- [What is a database?](/basics/what-is-a-database/): What you're backing up
- [What is Git?](/basics/what-is-git/): Version control as code backup
- [When do I need multiple servers?](/basics/when-do-i-need-multiple-servers/): High availability and redundancy
- [What is the cloud?](/basics/what-is-the-cloud/): Where backups typically live
- [What is security and auth?](/basics/what-is-security-and-auth/): Protecting access to your backups
