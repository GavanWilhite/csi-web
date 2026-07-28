# /// script
# requires-python = ">=3.10"
# ///
"""
Strip markdown artefacts that leaked from the crawl into speaker bios.

The bios were extracted with html2text, which turned the source pages'
<img> and <a> elements into markdown. That markdown was never rendered —
`SpeakerProfile` prints each paragraph as plain text — so it surfaced as
literal `![linkedin-icon](https://…)` and `**Talk Title**` on the page, and
the unbroken CDN URL forced 1356px of horizontal overflow at a 390px
viewport.

Applied to BOTH handoff/port-research/speakers-full.json (the upstream
extraction) and csi-web/lib/speakers.ts (the generated module) so the two
stay in sync — lib/speakers.ts's header says to edit the JSON and
regenerate, and this keeps that true.

Transformations, in order:
  1. drop paragraphs that are nothing but a markdown image
  2. remove inline  ![alt](url)
  3. rewrite        [text](url) -> text
  4. strip ** and _ emphasis markers
  5. collapse whitespace left behind
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
JSON_PATH = ROOT / "handoff/port-research/speakers-full.json"
TS_PATH = ROOT / "csi-web/lib/speakers.ts"

IMG = re.compile(r"!\[[^\]]*\]\([^)]*\)")
LINK = re.compile(r"\[([^\]]*)\]\([^)]*\)")
IMG_ONLY = re.compile(r"^\s*!\[[^\]]*\]\([^)]*\)\s*$")


def clean(text: str) -> str:
    text = IMG.sub("", text)
    text = LINK.sub(r"\1", text)
    text = text.replace("**", "")
    text = re.sub(r"(?<!\w)_([^_]+)_(?!\w)", r"\1", text)
    # html2text escapes leading list dashes as "\-" and leaves stray
    # zero-width spaces where the source had empty Wix text nodes.
    text = re.sub(r"\\([-*_.])", r"\1", text)
    text = text.replace("​", "").replace("﻿", "")
    return re.sub(r"[ \t]{2,}", " ", text).strip()


def is_image_only(text: str) -> bool:
    return bool(IMG_ONLY.match(text))


def fix_json() -> int:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    changed = 0
    for rec in data:
        bio = rec.get("bio")
        if not isinstance(bio, list):
            continue
        kept = [clean(p) for p in bio if not is_image_only(p)]
        kept = [p for p in kept if p]
        if kept != bio:
            rec["bio"] = kept
            changed += 1
    JSON_PATH.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return changed


def fix_ts(path: pathlib.Path) -> int:
    """
    The TS modules store each paragraph as a double-quoted string literal.
    Operate on literal contents only, so surrounding code is untouched.

    Deliberately does NOT pre-filter on which markers a literal contains —
    an earlier version skipped anything without `](` or `**`, which let
    `_emphasis_` and escaped `\\-` through to the rendered page.
    """
    src = path.read_text(encoding="utf-8")
    hits = 0

    def repl(m: re.Match) -> str:
        nonlocal hits
        body = m.group(1)
        raw = body.replace('\\"', '"')
        if is_image_only(raw):
            hits += 1
            return '""'  # emptied; pruned below
        cleaned = clean(raw).replace('"', '\\"')
        if cleaned != body:
            hits += 1
        return '"' + cleaned + '"'

    src = re.sub(r'"((?:[^"\\]|\\.)*)"', repl, src)
    # Drop the now-empty paragraph entries a pruned image left behind.
    src = re.sub(r"\n\s*\"\",(?=\n)", "", src)
    src = re.sub(r"\n\s*\"\"(?=\n\s*\])", "", src)
    path.write_text(src, encoding="utf-8")
    return hits


if __name__ == "__main__":
    if not JSON_PATH.exists():
        sys.exit(f"missing input: {JSON_PATH}")
    print(f"speakers-full.json: {fix_json()} records cleaned")
    # Every module carrying crawled prose, not just speakers.
    for name in ("speakers.ts", "people.ts", "institute.ts"):
        p = TS_PATH.parent / name
        if p.exists():
            print(f"lib/{name:<14} {fix_ts(p)} string literals rewritten")
