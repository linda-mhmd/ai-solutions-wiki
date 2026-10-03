#!/usr/bin/env python3
"""One-off sweep: replace em and en dashes in content with the house substitutes.

  em dash  ->  " - "   the spaced hyphen this repo already uses everywhere
  en dash  ->  "-"     between digits (page ranges, "pp. 215-224", "$100-$200")
               " - "   anywhere else

Protected and left exactly as they are:
  - fenced code blocks (``` and ~~~)
  - inline code spans (`like this`)
  - URLs, both bare and inside markdown link targets
  - HTML tags and their attributes

Usage:
  ci/fix_dashes.py --dry-run          show what would change
  ci/fix_dashes.py --apply            write the changes
  ci/fix_dashes.py --apply FILE ...   only these files
"""
import sys, re, glob, argparse

EM, EN = "—", "–"
FENCE = re.compile(r"^\s*(```|~~~)")
# Spans to leave alone, longest-match first.
PROTECT = re.compile(
    r"(`[^`\n]*`"                      # inline code
    r"|<[^>\n]+>"                      # html tag
    r"|\((?:https?|mailto):[^)\s]*\)"  # markdown link target
    r"|(?:https?|mailto):\S+)"         # bare url
)

def fix_text(seg):
    # Numeric ranges first, including across a currency symbol: 215-224, $100-$200.
    seg = re.sub(r"(?<=\d)" + EN + r"(?=[$\u20ac\u00a3]?\d)", "-", seg)
    # Collapse any spaces or tabs already around the dash into exactly one each,
    # so "a \u2014 b" and "a\u2014b" both become "a - b" with no double spaces.
    # Leading indentation is never part of `seg` (see fix_line), so YAML and
    # markdown list indentation cannot be touched.
    seg = re.sub(r"[ \t]*[" + EM + EN + r"][ \t]*", " - ", seg)
    return seg

def fix_line(line):
    # Split off leading whitespace and never pass it to fix_text. Indentation
    # carries meaning in YAML front matter and in nested markdown lists, and an
    # earlier version of this script collapsed it and broke 89 files.
    indent = line[:len(line) - len(line.lstrip(" \t"))]
    rest = line[len(indent):]
    out, last = [], 0
    for m in PROTECT.finditer(rest):
        out.append(fix_text(rest[last:m.start()]))
        out.append(m.group(0))
        last = m.end()
    out.append(fix_text(rest[last:]))
    body = "".join(out)
    # A line that began with the dash itself gains a leading space from the
    # " - " substitution; an unindented line must stay unindented.
    if not indent:
        body = body.lstrip(" ")
    return indent + body

def process(path):
    src = open(path, encoding="utf-8").read()
    if EM not in src and EN not in src:
        return None
    lines, out, in_fence = src.split("\n"), [], False
    changed = 0
    for line in lines:
        if FENCE.match(line):
            in_fence = not in_fence
            out.append(line); continue
        if in_fence:
            out.append(line); continue
        new = fix_line(line)
        if new != line:
            changed += 1
        out.append(new)
    return "\n".join(out), changed

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    files = a.files or (sorted(glob.glob("content/**/*.md", recursive=True))
                        + sorted(glob.glob("data/*.yaml")))
    touched = total = 0
    for f in files:
        r = process(f)
        if not r:
            continue
        new, n = r
        if n:
            touched += 1; total += n
            if a.apply:
                open(f, "w", encoding="utf-8").write(new)
    verb = "rewrote" if a.apply else "would rewrite"
    print(f"{verb} {total} line(s) across {touched} file(s)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
