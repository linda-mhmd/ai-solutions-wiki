#!/usr/bin/env python3
"""Internal link checker for the built Hugo site.

Reads built HTML and verifies every site-internal href resolves to something
the build actually produced. Scoped by default to the pages a change touches,
because the repo predates this check and a whole-site run reports a backlog
rather than a regression.

Usage:
  ci/check_links.py --site public
  ci/check_links.py --site public --pages content/news/a.md content/tools/b.md
  ci/check_links.py --site public --all
"""
import sys, os, re, argparse, urllib.parse

HREF = re.compile(r'(?:href|src)="(/[^"#?]*)(?:[#?][^"]*)?"', re.I)
SKIP_PREFIX = ("/pagefind/", "/img/", "/images/", "/videos/", "/js/", "/css/", "/fonts/")

def url_for(content_path):
    """content/news/foo.md -> /news/foo/ ; content/about.md -> /about/"""
    p = content_path
    if not p.startswith("content/"):
        return None
    p = p[len("content/"):]
    if p.endswith("/_index.md"):
        p = p[:-len("/_index.md")] + "/"
    elif p == "_index.md":
        p = ""
    elif p.endswith(".md"):
        p = p[:-3] + "/"
    return "/" + p

def built_file(site, url):
    rel = urllib.parse.unquote(url).lstrip("/")
    for cand in (os.path.join(site, rel, "index.html"),
                 os.path.join(site, rel) if not rel.endswith("/") else None,
                 os.path.join(site, rel + "index.html") if rel.endswith("/") else None):
        if cand and os.path.isfile(cand):
            return cand
    return None

def exists(site, url):
    rel = urllib.parse.unquote(url).lstrip("/")
    if rel == "":
        return os.path.isfile(os.path.join(site, "index.html"))
    base = os.path.join(site, rel)
    return (os.path.isfile(base)
            or os.path.isfile(os.path.join(base, "index.html"))
            or os.path.isfile(base.rstrip("/") + ".html"))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="public")
    ap.add_argument("--pages", nargs="*", default=[])
    ap.add_argument("--all", action="store_true")
    a = ap.parse_args()

    if not os.path.isdir(a.site):
        print(f"check_links: no build at {a.site}; run hugo first"); return 2

    targets = []
    if a.all:
        for root, _, files in os.walk(a.site):
            for f in files:
                if f == "index.html":
                    targets.append(os.path.join(root, f))
    else:
        for p in a.pages:
            u = url_for(p)
            if not u:
                continue
            f = built_file(a.site, u)
            if f:
                targets.append(f)
            else:
                print(f"  note   {p} produced no page at {u} (draft, or a data file)")

    if not targets:
        print("check_links: nothing to check"); return 0

    broken, checked = [], 0
    for f in sorted(set(targets)):
        html = open(f, encoding="utf-8", errors="replace").read()
        page = "/" + os.path.relpath(os.path.dirname(f), a.site).replace(os.sep, "/").strip("./") + "/"
        seen = set()
        for url in HREF.findall(html):
            if url in seen or url.startswith(SKIP_PREFIX):
                continue
            seen.add(url); checked += 1
            if not exists(a.site, url):
                broken.append((page, url))

    for page, url in broken:
        print(f"  ERROR  {page} links to {url} which does not exist in the build")
    print(f"\nchecked {checked} internal link(s) across {len(set(targets))} page(s): "
          f"{len(broken)} broken")
    return 1 if broken else 0

if __name__ == "__main__":
    sys.exit(main())
