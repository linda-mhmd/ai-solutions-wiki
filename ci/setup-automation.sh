#!/usr/bin/env bash
# One-time setup for the preview environment. Run it once, from this repository.
#
#   bash ci/setup-automation.sh
#
# It uses the gh CLI you are already logged in to. Nothing is typed by hand and
# no personal access token is created. It:
#
#   1. creates linda-mhmd/ai-solutions-wiki-preview and turns GitHub Pages on
#   2. generates an ed25519 deploy key, scoped to that one repository
#   3. registers the public half there with write access
#   4. stores the private half here as the PREVIEW_DEPLOY_KEY secret
#   5. deletes both halves from disk
#
# A deploy key can push to exactly one repository and can do nothing else: it
# cannot read your other repos, cannot open pull requests, cannot act as you.
# That is why this uses one rather than a personal access token.
#
# Safe to run twice. Existing pieces are left alone and only what is missing is
# created.
#
# The separate half of the setup, which makes the weekly run happen at all, is
# `/install-github-app` from Claude Code in this repository.
set -euo pipefail

OWNER="${OWNER:-linda-mhmd}"
SOURCE_REPO="${SOURCE_REPO:-$OWNER/ai-solutions-wiki}"
PREVIEW_REPO="${PREVIEW_REPO:-$OWNER/ai-solutions-wiki-preview}"

command -v gh >/dev/null || { echo "The gh CLI is required: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Run 'gh auth login' first."; exit 1; }
command -v ssh-keygen >/dev/null || { echo "ssh-keygen is required."; exit 1; }

echo ">> 1/5  preview repository"
if gh repo view "$PREVIEW_REPO" >/dev/null 2>&1; then
  echo "        $PREVIEW_REPO already exists"
else
  gh repo create "$PREVIEW_REPO" --public \
    --description "Throwaway per-PR builds of ai-solutions.wiki. Noindexed. Not the live site."
  echo "        created $PREVIEW_REPO"
fi

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo ">> 2/5  initial commit and Pages"
if git clone -q "https://github.com/$PREVIEW_REPO.git" "$tmp/repo" 2>/dev/null && [ -n "$(ls -A "$tmp/repo" 2>/dev/null | grep -v '^\.git$' || true)" ]; then
  echo "        already initialised"
else
  rm -rf "$tmp/repo"; mkdir -p "$tmp/repo"
  git -C "$tmp/repo" init -q -b main
  git -C "$tmp/repo" remote add origin "https://github.com/$PREVIEW_REPO.git"
  touch "$tmp/repo/.nojekyll"
  cat > "$tmp/repo/README.md" <<'EOF'
# ai-solutions.wiki previews

Throwaway builds of open pull requests on
[linda-mhmd/ai-solutions-wiki](https://github.com/linda-mhmd/ai-solutions-wiki).

Every page here carries `noindex,nofollow`, and each directory is deleted when
its pull request closes. The live site is <https://ai-solutions.wiki>.
EOF
  git -C "$tmp/repo" add -A
  git -C "$tmp/repo" -c user.name='ai-solutions-wiki bot' \
      -c user.email='noreply@ai-solutions.wiki' commit -q -m "Initialise the preview site"
  git -C "$tmp/repo" push -q -u origin main
  echo "        pushed the initial commit"
fi

if gh api "repos/$PREVIEW_REPO/pages" >/dev/null 2>&1; then
  echo "        Pages already on"
else
  gh api -X POST "repos/$PREVIEW_REPO/pages" \
    -f "source[branch]=main" -f "source[path]=/" >/dev/null
  echo "        Pages enabled on main / root"
fi

echo ">> 3/5  deploy key"
if gh api "repos/$PREVIEW_REPO/keys" --jq '.[].title' 2>/dev/null | grep -qx "ai-solutions-wiki PR previews"; then
  echo "        a deploy key with that title already exists"
  echo "        delete it in the preview repo's Settings, Deploy keys, and rerun to rotate"
else
  ssh-keygen -t ed25519 -N "" -C "ai-solutions-wiki PR previews" -f "$tmp/key" -q
  gh api -X POST "repos/$PREVIEW_REPO/keys" \
    -f title="ai-solutions-wiki PR previews" \
    -f key="$(cat "$tmp/key.pub")" \
    -F read_only=false >/dev/null
  echo "        registered the public half on $PREVIEW_REPO with write access"

  echo ">> 4/5  secret"
  gh secret set PREVIEW_DEPLOY_KEY --repo "$SOURCE_REPO" < "$tmp/key"
  echo "        stored the private half as PREVIEW_DEPLOY_KEY on $SOURCE_REPO"
fi

echo ">> 5/5  cleanup"
rm -rf "$tmp"
trap - EXIT
echo "        key material removed from disk"

echo
echo "Done. Previews will appear at:"
echo "  https://$OWNER.github.io/${PREVIEW_REPO#*/}/pr-<N>/"
echo
echo "Still to do, once, for the weekly run itself:"
echo "  run /install-github-app from Claude Code in this repository"
