---
title: "Proving a Deployment Landed"
description: "A green pipeline is evidence that a job exited zero, not that an artefact reached production. How to smoke-test that an image starts, verify the running system reports the new version, and keep the identity of the artefact you are about to replace."
date: 2026-09-02
lastmod: 2026-09-02
last_updated: 2026-09-02
categories: [Guides]
tags: ["ci-cd", "deployment", "release-management", "verification", "rollback", "containers", "automation"]
related:
  - guides/the-cost-of-not-updating-your-platform
  - guides/ci-cd-for-ai
  - guides/release-management-ai
  - glossary/immutable-infrastructure
---

A pipeline reports success when its last step exits zero. That is all the signal contains. It is not evidence that an artefact was produced, that the artefact can start, that it reached the place the runtime reads from, or that the running system is now serving it. Those are four separate claims, and a green check mark asserts none of them.

The failure this produces is quiet. A delivery pipeline can exist, be correctly written, pass review, and never once put an artefact into production — while the service continues serving something that was placed there by hand long ago. Nothing alerts, because nothing is wrong from the perspective of any individual component.

## Four claims, verified separately

| Claim | What proves it |
|---|---|
| The artefact was built | The build step exits zero |
| The artefact **runs** | Start it and probe it |
| It reached the place the runtime reads from | Query the destination registry for the tag |
| The running system is serving it | Ask the running system what version it has |

Most pipelines verify the first and assume the rest.

## Check that your pipeline has ever run

Before improving a pipeline, establish whether it has ever produced anything. This sounds facetious. It is the single fastest way to find a delivery path that does not exist, and it takes one query:

```bash
gh api "repos/$OWNER/$REPO/actions/workflows/$WORKFLOW/runs" --jq '.total_count'
```

A result of `0` means the workflow has never executed — usually because its trigger does not match how the repository is actually used. A low number against a busy repository means the same thing more subtly.

The related check is whether the artefact destination and the runtime source are the same place. A build that publishes to one registry while the runtime pulls from another is a complete, well-formed, permanently ineffective pipeline. Nothing reconciles those two facts unless a person does, because each half is individually correct.

## Smoke-test that the image starts, not just that it builds

A container that builds is not a container that runs. Missing runtime dependencies, bad entrypoints, and configuration read at startup all pass the build and fail on boot. Where a deployment replaces a running service the moment a tag moves, an image that crashes on start takes production down with no intermediate state.

Run it in the pipeline:

```bash
docker run -d --name smoke -p 8080:8080 \
  -e APP_BASE_URL=http://localhost:8080 \
  -e DATABASE_URL=postgres://placeholder \
  myapp:candidate

for i in $(seq 1 30); do
  curl -fsS -m 5 http://localhost:8080/healthz >/dev/null 2>&1 && ok=1 && break
  sleep 5
done

docker logs smoke 2>&1 | tail -40
[ "$ok" = 1 ] || exit 1
```

**Use placeholder configuration deliberately.** The test asks exactly one question — does this image start and serve — and real credentials are not needed to answer it. Injecting production secrets into a pull-request job to satisfy a boot check widens their exposure for no additional signal. Design the application so it starts with syntactically valid but non-functional configuration, and this test stays cheap and safe.

Always print the container logs. A failed health check tells you the probe did not succeed; the logs tell you why.

## Mind the pull-request asymmetry

Pipelines that build on pull requests usually skip the deployment steps, correctly, so that untrusted contributions never receive cloud credentials. The consequence is easy to miss: **the deployment half of the pipeline is only ever exercised after merge.** A broken role reference, a wrong registry path, or a missing permission passes every pre-merge check and fails on the first real deploy.

Two mitigations, neither perfect:

- **Lint what you cannot execute.** Validate that referenced roles, registries and secrets exist as names, even when you cannot assume the role.
- **Keep the post-merge deploy small and reversible**, since it is the first time that code path runs. Rollback matters more here than anywhere else in the pipeline.

## Keep the identity of what you are replacing

Deploying by moving a mutable tag such as `latest` destroys information at the moment you most need it. Once the tag moves, the previously-working artefact is untagged and effectively anonymous — you can no longer name the thing you would roll back to.

Capture it immediately before the move:

```bash
prev=$(aws ecr describe-images \
  --repository-name "$REPO" \
  --image-ids imageTag=latest \
  --query 'imageDetails[0].imageDigest' --output text)
echo "Previous digest: $prev"
```

Then print the exact commands to restore it. A rollback should be something an on-call engineer copies, not something they reconstruct from memory while a service is down.

The stronger version of this is to stop using mutable tags for deployment at all: tag images immutably (by commit SHA or semantic version), deploy by digest, and let `latest` be a convenience pointer that nothing depends on. See [immutable infrastructure](/glossary/immutable-infrastructure/).

## Verify from outside the pipeline

The final claim — that the running system is serving the new artefact — can only be checked against the running system. Have something observable from outside that changes when a deployment lands:

- **A version endpoint** returning the build identifier or commit SHA. The cleanest option, and worth adding if it does not exist.
- **An asset fingerprint.** Content-hashed bundle filenames change on every build, so watching one change is a reliable proxy when you cannot add an endpoint:

  ```bash
  curl -s https://example.internal/ | grep -o '/static/main\.[a-f0-9]*\.js'
  ```

- **A health endpoint that reports build metadata**, rather than only returning 200.

Make this an assertion in the pipeline rather than something a person eyeballs. The deploy job should poll until the running system reports the expected identifier, and fail if it does not within a timeout. Until that assertion exists, "deployed" means "the deploy job did not error", which is a claim about the job, not about production.

## The rule

**A pipeline that has never delivered is not a pipeline.** It is a diagram of one, and it will be discovered on the day someone urgently needs it to work. Until an artefact it produced is demonstrably running, treat it as untested — regardless of how green it looks, how carefully it was reviewed, or how long it has existed.

## Further reading

- [The cost of not updating your platform](/guides/the-cost-of-not-updating-your-platform/): what else decays while nothing appears to change.
- [When automation pays for itself](/guides/when-automation-pays-for-itself/): whether to build the pipeline at all.
- [CI/CD for AI](/guides/ci-cd-for-ai/): the wider pipeline, including evaluation gates.
- [Release management](/guides/release-management-ai/): rollout strategies and rollback procedures.
- [Immutable infrastructure](/glossary/immutable-infrastructure/): why mutable tags cause this class of problem.
- [Blue-green deployment](/patterns/blue-green-deployment/): keeping the previous version addressable by construction.
- [Progressive delivery](/patterns/progressive-delivery-ai/): limiting exposure when a deploy does go wrong.

## Sources

1. Google. *Site Reliability Engineering*, Chapter 8: "Release Engineering." [https://sre.google/sre-book/release-engineering/](https://sre.google/sre-book/release-engineering/)
2. Open Container Initiative. "Image Format Specification" — content-addressable image digests. [https://github.com/opencontainers/image-spec/blob/main/spec.md](https://github.com/opencontainers/image-spec/blob/main/spec.md)
3. GitHub. "REST API — list workflow runs for a workflow." [https://docs.github.com/en/rest/actions/workflow-runs](https://docs.github.com/en/rest/actions/workflow-runs)
4. GitHub. "Security hardening for GitHub Actions" — secrets and workflows triggered by pull requests. [https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
5. Docker. "Dockerfile reference — HEALTHCHECK." [https://docs.docker.com/reference/dockerfile/#healthcheck](https://docs.docker.com/reference/dockerfile/#healthcheck)
6. The Twelve-Factor App. "Build, release, run." [https://12factor.net/build-release-run](https://12factor.net/build-release-run)
