# ai-solutions.wiki - local development helpers
#
# First time on a machine?   make install    then    make doctor
# Before pushing:            make preflight
#
# Toolchain (all installed by `make install`):
#   hugo      Extended build, version must match .github/workflows/deploy.yml
#   gitleaks  secret scanning (make secrets)
#   zizmor    GitHub Actions auditing (make audit)
#   pagefind  search index, run on demand via npx (needs node)
#
# Run `make` or `make help` to list targets.

HUGO ?= hugo
PORT ?= 1314
# Interface the dev server binds to. 0.0.0.0 exposes it to your LAN (handy for
# phone/tablet testing). On untrusted networks use: make dev BIND=127.0.0.1
BIND ?= 0.0.0.0

# The Hugo version CI builds with. Single source of truth is the workflow file,
# so this cannot drift from what actually ships.
WORKFLOW := .github/workflows/deploy.yml
CI_HUGO_VERSION := $(shell sed -n 's/^[[:space:]]*HUGO_VERSION:[[:space:]]*\([0-9.]*\).*/\1/p' $(WORKFLOW) | head -1)

UNAME_S := $(shell uname -s)

# Fail early with a useful message instead of a confusing one later.
# Usage in a recipe:  $(call need,hugo)
define need
command -v $(1) >/dev/null 2>&1 || { \
  echo ">> missing tool: $(1)"; \
  echo ">> run 'make install' to install the toolchain, then 'make doctor' to verify"; \
  exit 1; }
endef

.DEFAULT_GOAL := help
.PHONY: help install update doctor dev serve preview build check search clean version audit secrets preflight

help: ## List available targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN{FS=":.*## "}{printf "  make %-9s %s\n", $$1, $$2}'

install: ## Install the full toolchain (hugo, gitleaks, zizmor) on a new machine
ifeq ($(UNAME_S),Darwin)
	@command -v brew >/dev/null 2>&1 || { \
	  echo ">> Homebrew is required. Install it first:"; \
	  echo '   /bin/bash -c "$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'; \
	  exit 1; }
	@echo ">> installing hugo, gitleaks, zizmor via Homebrew..."
	@brew install hugo gitleaks zizmor
else
	@echo ">> non-macOS host detected ($(UNAME_S)). Install manually:"
	@echo "   hugo     https://gohugo.io/installation/   (the EXTENDED build, v$(CI_HUGO_VERSION))"
	@echo "   gitleaks https://github.com/gitleaks/gitleaks#installing"
	@echo "   zizmor   https://docs.zizmor.sh/installation/   (or: uvx zizmor)"
	@exit 1
endif
	@command -v node >/dev/null 2>&1 || echo ">> note: node is missing; 'make search' needs it for npx pagefind"
	@echo ">> done. Run 'make doctor' to verify."

update: ## Upgrade the installed toolchain, then re-check for version drift
ifeq ($(UNAME_S),Darwin)
	@command -v brew >/dev/null 2>&1 || { echo ">> Homebrew not found; nothing to upgrade"; exit 1; }
	@brew upgrade hugo gitleaks zizmor || true
else
	@echo ">> non-macOS host: upgrade hugo, gitleaks and zizmor with your package manager"
endif
	@$(MAKE) --no-print-directory doctor

doctor: ## Verify every required tool is present and matches the version CI uses
	@rc=0; \
	printf '  %-10s ' 'hugo'; \
	if command -v $(HUGO) >/dev/null 2>&1; then \
	  v=$$($(HUGO) version); \
	  ver=$$(echo "$$v" | sed -n 's/.*hugo v\([0-9.]*\).*/\1/p'); \
	  echo "$$ver"; \
	  case "$$v" in *extended*) ;; *) echo "     !! not the EXTENDED build; the theme needs it"; rc=1;; esac; \
	  if [ -n "$(CI_HUGO_VERSION)" ] && [ "$$ver" != "$(CI_HUGO_VERSION)" ]; then \
	    echo "     !! drift: CI builds with $(CI_HUGO_VERSION) (see $(WORKFLOW))"; \
	    echo "        a local build that passes may still fail or render differently in CI"; \
	    rc=1; \
	  fi; \
	else echo "MISSING     (make install)"; rc=1; fi; \
	for t in gitleaks zizmor; do \
	  printf '  %-10s ' "$$t"; \
	  if command -v $$t >/dev/null 2>&1; then \
	    v=$$($$t --version 2>/dev/null | head -1); \
	    [ -n "$$v" ] || v=$$($$t version 2>/dev/null | head -1); \
	    echo "$${v:-present}"; \
	  else echo "MISSING     (make install)"; rc=1; fi; \
	done; \
	printf '  %-10s ' 'node'; \
	if command -v node >/dev/null 2>&1; then node --version; \
	else echo "MISSING     (needed only for 'make search')"; fi; \
	if [ $$rc -eq 0 ]; then echo ">> toolchain OK"; else echo ">> toolchain has problems (see !! above)"; exit 1; fi

dev: ## Start the dev server on the first free port at/above 1314 (live reload)
	@$(call need,$(HUGO))
	@port=$(PORT); \
	while lsof -iTCP:$$port -sTCP:LISTEN >/dev/null 2>&1; do \
		echo ">> port $$port in use, trying $$((port+1))"; port=$$((port+1)); \
	done; \
	echo ">> serving on http://localhost:$$port  (Ctrl-C to stop)"; \
	exec $(HUGO) server --port $$port --disableFastRender --bind $(BIND)

serve: dev ## Alias for `make dev`

preview: ## Start a read-only preview on the first free port at/above 1315 (local only)
	@$(call need,$(HUGO))
	@port=1315; \
	while lsof -iTCP:$$port -sTCP:LISTEN >/dev/null 2>&1; do port=$$((port+1)); done; \
	echo ">> preview on http://localhost:$$port  (Ctrl-C to stop)"; \
	exec $(HUGO) server --port $$port --disableFastRender --bind 127.0.0.1

build: ## Production build into public/
	@$(call need,$(HUGO))
	$(HUGO) --gc --minify --cleanDestinationDir

check: ## Build and fail if hugo errors OR emits any warning or deprecation
	@$(call need,$(HUGO))
	@out=$$($(HUGO) --gc --minify --cleanDestinationDir 2>&1); rc=$$?; \
	echo "$$out"; \
	if [ $$rc -ne 0 ]; then echo ">> FAIL: hugo exited with status $$rc"; exit 1; fi; \
	if echo "$$out" | grep -iqE 'warn|deprecat|error'; then \
		echo ">> FAIL: warnings/deprecations/errors found"; exit 1; \
	else echo ">> OK: clean build"; fi

audit: ## Security-audit every GitHub Actions workflow with zizmor
	@$(call need,zizmor)
	@tok=$$(gh auth token 2>/dev/null); \
	if [ -n "$$tok" ]; then GH_TOKEN="$$tok" zizmor .github/workflows/; \
	else echo "(no gh token found; running offline audit only)"; zizmor .github/workflows/; fi

secrets: ## Scan for leaked secrets with gitleaks (git history + working tree)
	@$(call need,gitleaks)
	@echo ">> scanning git history..."; gitleaks detect --source . --redact --no-banner
	@echo ">> scanning working tree (uncommitted + untracked)..."; gitleaks detect --source . --no-git --redact --no-banner
	@echo ">> no leaks found"

preflight: doctor check audit secrets ## Full pre-push gate: toolchain + zero-warning build + zizmor + gitleaks
	@echo ">> preflight passed: toolchain verified, build clean, workflows audited, no secrets"

search: build ## Full build plus the Pagefind search index
	@$(call need,npx)
	npx pagefind --site public
	cp -r public/pagefind static/pagefind

clean: ## Remove generated build output (public/ and resources/_gen/ only)
	rm -rf public resources/_gen

version: ## Show the Hugo version in use
	@$(call need,$(HUGO))
	$(HUGO) version
