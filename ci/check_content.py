#!/usr/bin/env python3
"""Content gate for ai-solutions.wiki.

Checks the things a human reviewer should never have to check by hand:
front matter completeness, date sanity, SEO limits, that every news entry
cites sources, and the house style rules (no em dashes, no filler openers).

Arithmetic and pattern matching only. No model judges the writing.

Style rules (em dashes, filler openers, marketing words) are checked only on
lines a change actually adds, via --diff-base. The repo carries a large legacy
backlog of em dashes; the gate stops new ones arriving without demanding a
repo-wide rewrite first. Structural rules (front matter, dates, sources) always
apply to the whole changed file.

Usage:
  ci/check_content.py                              # every markdown file
  ci/check_content.py FILE [FILE...]               # only these files
  ci/check_content.py --diff-base origin/main ...  # style rules on added lines only
  ci/check_content.py --backlog                    # count legacy style violations
  ci/check_content.py --legacy-report              # news entries below the bar
  ci/check_content.py --new-files A.md -- ...      # A.md must meet the new-entry rules
"""
import sys, os, re, datetime, glob, subprocess

REQUIRED = ["title", "description", "date"]
DESC_MIN, DESC_MAX = 70, 320          # Google truncates around 160 chars but the
TITLE_MAX = 95                        # wiki uses longer descriptions as summaries
BANNED_CHARS = {
    "—": "em dash (house style: use a comma or a full stop)",
    "–": "en dash (house style: use 'to' in ranges)",
}
# Openers that signal generated filler rather than writing.
BANNED_OPENERS = re.compile(
    r"^\s*(in today's\b|in the (ever-)?(rapidly )?(evolving|changing)\b|"
    r"as we (all )?know\b|it is important to note\b|in conclusion\b|"
    r"let's dive in\b|buckle up\b|the landscape of\b)", re.I)
HEDGE = re.compile(r"\b(revolutionary|game.?chang\w+|cutting.?edge|"
                   r"seamless(ly)?|unlock(ing)? the power|supercharge\w*|"
                   r"paradigm shift)\b", re.I)

def parse_front_matter(text, path):
    if not text.startswith("---\n"):
        return None, "no YAML front matter"
    end = text.find("\n---", 4)
    if end == -1:
        return None, "front matter is not closed"
    raw, body = text[4:end], text[end+4:]
    # Parse the front matter properly where PyYAML is available. The simple
    # key-value scan below is enough for the field checks, but it silently
    # accepts YAML that Hugo rejects: a sweep that changed list indentation
    # once broke 89 files and only the build caught it.
    try:
        import yaml
        yaml.safe_load(raw)
    except ImportError:
        pass
    except Exception as exc:
        return None, f"front matter is not valid YAML: {str(exc).splitlines()[0]}"
    fm = {}
    for line in raw.splitlines():
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$", line)
        if m:
            fm[m.group(1)] = m.group(2).strip().strip('"').strip("'")
    return (fm, body), None

def as_date(v):
    try:
        return datetime.date.fromisoformat(str(v)[:10])
    except Exception:
        return None

def added_lines(path, base):
    """Line numbers this change adds to path, relative to base. None = check all."""
    try:
        diff = subprocess.run(
            ["git", "diff", "--unified=0", "--no-color", base, "--", path],
            capture_output=True, text=True, check=True).stdout
    except subprocess.CalledProcessError:
        return None
    if not diff.strip():
        return set()
    out, n = set(), 0
    for line in diff.splitlines():
        m = re.match(r"^@@ -\S+ \+(\d+)(?:,(\d+))? @@", line)
        if m:
            n = int(m.group(1)); continue
        if line.startswith("+") and not line.startswith("+++"):
            out.add(n); n += 1
        elif not line.startswith("-"):
            n += 1
    return out


def check(path, strict_news, scope=None, is_new=False):
    errs, warns = [], []
    text = open(path, encoding="utf-8").read()
    parsed, err = parse_front_matter(text, path)
    if err:
        return [err], []
    fm, body = parsed

    for key in REQUIRED:
        if not fm.get(key):
            errs.append(f"front matter is missing `{key}`")

    if len(fm.get("title", "")) > TITLE_MAX:
        warns.append(f"title is {len(fm['title'])} chars, over the {TITLE_MAX} soft limit")
    d = fm.get("description", "")
    if d and not (DESC_MIN <= len(d) <= DESC_MAX):
        warns.append(f"description is {len(d)} chars, outside {DESC_MIN}-{DESC_MAX}")

    pub, mod = as_date(fm.get("date")), as_date(fm.get("lastmod"))
    if fm.get("date") and not pub:
        errs.append(f"`date` is not an ISO date: {fm.get('date')!r}")
    if fm.get("lastmod") and not mod:
        errs.append(f"`lastmod` is not an ISO date: {fm.get('lastmod')!r}")
    if pub and mod and mod < pub:
        errs.append(f"`lastmod` ({mod}) is before `date` ({pub})")
    today = datetime.date.today()
    for k in ("lastmod", "last_updated", "last_verified"):
        v = as_date(fm.get(k))
        if v and v > today:
            errs.append(f"`{k}` ({v}) is in the future")

    def in_scope(n):
        return scope is None or n in scope

    for n, line in enumerate(text.splitlines(), 1):
        if not in_scope(n):
            continue
        for ch, why in BANNED_CHARS.items():
            if ch in line:
                errs.append(f"line {n}: {why}: {line.strip()[:70]!r}")
        if BANNED_OPENERS.match(line):
            errs.append(f"line {n}: filler opener: {line.strip()[:60]!r}")
        for m in HEDGE.finditer(line):
            warns.append(f"line {n}: marketing word {m.group(0)!r}")

    if strict_news:
        # Rules that every news entry must satisfy.
        if "## Sources" not in body:
            errs.append("news entry has no `## Sources` section")
        else:
            src = body.split("## Sources", 1)[1].split("\n## ", 1)[0]
            urls = re.findall(r"https?://[^\s)>\]]+", src)
            bare = [u for u in urls if not re.match(r"^https?://[\w.-]+\.\w", u)]
            for u in bare:
                errs.append(f"malformed source URL: {u}")
            # Rules that only a NEW entry must satisfy. Entries written before
            # these rules existed are not retroactively failed by an unrelated
            # edit; `--legacy-report` lists the gap, and the weekly verification
            # pass closes it a few pages at a time. The alternative, stamping a
            # `last_verified` date on a page nobody verified, would be a lie in
            # the one field readers are meant to trust.
            if is_new and len(urls) < 2:
                errs.append(f"`## Sources` lists {len(urls)} link(s); at least 2 required")
            elif len(urls) < 2:
                warns.append(f"`## Sources` lists {len(urls)} link(s); 2 is the bar for new entries")
        lv = fm.get("last_verified")
        if is_new and not as_date(lv):
            errs.append("new news entry has no valid `last_verified` date")
        elif lv and not as_date(lv):
            errs.append(f"`last_verified` is not an ISO date: {lv!r}")
        elif not lv:
            warns.append("no `last_verified` date (pre-dates the rule)")
    return errs, warns

def legacy_report():
    """News entries that pre-date the sourcing rules, so they can be worked off."""
    rows = []
    for f in sorted(glob.glob("content/news/*.md")):
        if f.endswith("_index.md"):
            continue
        text = open(f, encoding="utf-8").read()
        parsed, err = parse_front_matter(text, f)
        if err:
            rows.append((f, "front matter: " + err)); continue
        fm, body = parsed
        gaps = []
        if not as_date(fm.get("last_verified")):
            gaps.append("no last_verified")
        if "## Sources" not in body:
            gaps.append("no Sources section")
        else:
            src = body.split("## Sources", 1)[1].split("\n## ", 1)[0]
            n = len(re.findall(r"https?://[^\s)>\]]+", src))
            if n < 2:
                gaps.append(f"{n} source link(s)")
        if gaps:
            rows.append((f, ", ".join(gaps)))
    print(f"news entries below the current bar: {len(rows)}\n")
    for f, why in rows:
        print(f"  {f:<62} {why}")
    print("\nThese are not failures. The weekly verification pass works them off.")
    return 0


def backlog():
    files = sorted(glob.glob("content/**/*.md", recursive=True))
    hits = {ch: 0 for ch in BANNED_CHARS}
    files_hit = set()
    for f in files:
        t = open(f, encoding="utf-8").read()
        for ch in BANNED_CHARS:
            c = t.count(ch)
            if c:
                hits[ch] += c; files_hit.add(f)
    print(f"legacy style backlog across {len(files)} content files:")
    for ch, c in hits.items():
        print(f"  {BANNED_CHARS[ch].split(' (')[0]}: {c}")
    print(f"  files affected: {len(files_hit)}")
    return 0


def main(argv):
    args = argv[1:]
    if "--backlog" in args:
        return backlog()
    if "--legacy-report" in args:
        return legacy_report()
    new_files = set()
    if "--new-files" in args:
        i = args.index("--new-files")
        j = i + 1
        while j < len(args) and not args[j].startswith("--"):
            new_files.add(args[j]); j += 1
        del args[i:j]
    base = None
    if "--diff-base" in args:
        i = args.index("--diff-base")
        base = args[i + 1]
        del args[i:i + 2]
    files = args or sorted(glob.glob("content/**/*.md", recursive=True))
    files = [f for f in files if f.endswith(".md") and os.path.exists(f)]
    if not files:
        print("check_content: no files to check"); return 0
    if base:
        print(f"style rules scoped to lines added since {base}\n")
    total_e = total_w = 0
    for f in files:
        strict = f.startswith("content/news/") and not f.endswith("_index.md")
        scope = added_lines(f, base) if base else None
        e, w = check(f, strict, scope, is_new=(f in new_files))
        if e or w:
            print(f"\n{f}")
            for x in e: print(f"  ERROR  {x}")
            for x in w: print(f"  warn   {x}")
        total_e += len(e); total_w += len(w)
    print(f"\nchecked {len(files)} file(s): {total_e} error(s), {total_w} warning(s)")
    return 1 if total_e else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv))
