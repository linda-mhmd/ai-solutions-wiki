# ai-solutions.wiki - local development helpers
#
# Requires Hugo Extended 0.164.0 (must match .github/workflows/deploy.yml).
# Install / update:  brew install hugo   (or)   brew upgrade hugo
#
# Run `make` or `make help` to list targets.

HUGO ?= hugo
PORT ?= 1314
# Interface the dev server binds to. 0.0.0.0 exposes it to your LAN (handy for
# phone/tablet testing). On untrusted networks use: make dev BIND=127.0.0.1
BIND ?= 0.0.0.0

.DEFAULT_GOAL := help
.PHONY: help dev serve preview build check search clean version audit

help: ## List available targets
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN{FS=":.*## "}{printf "  make %-9s %s\n", $$1, $$2}'

dev: ## Start the dev server on the first free port at/above 1314 (live reload)
	@port=$(PORT); \
	while lsof -iTCP:$$port -sTCP:LISTEN >/dev/null 2>&1; do \
		echo ">> port $$port in use, trying $$((port+1))"; port=$$((port+1)); \
	done; \
	echo ">> serving on http://localhost:$$port  (Ctrl-C to stop)"; \
	exec $(HUGO) server --port $$port --disableFastRender --bind $(BIND)

serve: dev ## Alias for `make dev`

preview: ## Start a read-only preview on the first free port at/above 1315 (local only)
	@port=1315; \
	while lsof -iTCP:$$port -sTCP:LISTEN >/dev/null 2>&1; do port=$$((port+1)); done; \
	echo ">> preview on http://localhost:$$port  (Ctrl-C to stop)"; \
	exec $(HUGO) server --port $$port --disableFastRender --bind 127.0.0.1

build: ## Production build into public/
	$(HUGO) --gc --minify --cleanDestinationDir

check: ## Build and fail if any warning, deprecation, or error appears
	@out=$$($(HUGO) --gc --minify --cleanDestinationDir 2>&1); echo "$$out"; \
	if echo "$$out" | grep -iqE 'warn|deprecat|error'; then \
		echo ">> FAIL: warnings/deprecations/errors found"; exit 1; \
	else echo ">> OK: clean build"; fi

audit: ## Security-audit every GitHub Actions workflow with zizmor (needs gh + zizmor)
	@tok=$$(gh auth token 2>/dev/null); \
	if [ -n "$$tok" ]; then GH_TOKEN="$$tok" zizmor .github/workflows/; \
	else echo "(no gh token found; running offline audit only)"; zizmor .github/workflows/; fi

search: build ## Full build plus the Pagefind search index
	npx pagefind --site public
	cp -r public/pagefind static/pagefind

clean: ## Remove generated build output (public/ and resources/_gen/ only)
	rm -rf public resources/_gen

version: ## Show the Hugo version in use
	$(HUGO) version
