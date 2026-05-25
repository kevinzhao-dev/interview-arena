---
name: leetcode-list-importer
description: Use when importing LeetCode problem-list or company favorite URLs into this interview-arena repo, refreshing list metadata, or rebuilding the local LeetCode question bank.
---

# LeetCode List Importer

## Purpose

Turn logged-in LeetCode list/company URLs into repo-tracked metadata that the coding mock interviewer can use for selection.

Use this skill for URLs like:

- `https://leetcode.com/problem-list/<id>/`
- `https://leetcode.com/company/google/?favoriteSlug=google-thirty-days`
- `https://leetcode.com/company/facebook/?favoriteSlug=facebook-thirty-days`

## Source of Truth

Track long-lived training data here:

- `data/leetcode/lists/*.csv`: one CSV per imported source list.
- `data/leetcode/lists/manifest.csv`: imported source URL, count, progress, and date.
- `data/leetcode/question-bank.csv`: deduplicated aggregate bank.
- `progress/*.md`: interview history and performance tracker.

Treat `cpp/` as a leetgo scratch workspace. Do not use it as the source of truth. Never commit generated `question.md` files unless Kai-Wen explicitly asks, because they may contain full LeetCode problem text.

## Import Workflow

1. Read existing `data/leetcode/README.md`, `data/leetcode/lists/manifest.csv`, and `data/leetcode/question-bank.csv` if present.
2. Use the user's logged-in browser session to open each LeetCode URL. Read page-visible DOM/text only; do not inspect cookies, local storage, passwords, or session stores.
3. Scroll the problem table until the collected problem count stops increasing. Company pages and long lists may virtualize rows.
4. Extract metadata only: problem id, slug, title, difficulty, acceptance, problem URL, source key/name/type/URL, optional concepts/categories, page progress, and import date.
5. Write/update the per-list CSV, merge/update `manifest.csv`, and rebuild `question-bank.csv`.
6. Do not store full problem descriptions. Do not store credentials, cookies, tokens, screenshots, or raw browser session output.

## Recommended Script

When browser automation is available through the Codex/Chrome browser runtime, prefer the bundled script:

```js
const { importLeetCodeLists } = await import("./.claude/skills/leetcode-list-importer/scripts/import-leetcode-lists.mjs");

const result = await importLeetCodeLists({
  urls: [
    "https://leetcode.com/problem-list/ajcgv2cg/",
    "https://leetcode.com/company/google/?favoriteSlug=google-thirty-days"
  ],
  root: "/Users/kevin.zhao/Workspace/interview-arena",
  browser,
  tab
});

nodeRepl.write(JSON.stringify(result.summary, null, 2));
```

If the script is not usable in the current agent runtime, follow the same workflow manually with the available browser tool and keep the output schema identical.

## Required Validation

Before reporting completion:

```bash
python3 - <<'PY'
import csv
from pathlib import Path
root = Path('data/leetcode')
manifest = list(csv.DictReader((root/'lists'/'manifest.csv').open()))
entry_total = 0
for row in manifest:
    rows = list(csv.DictReader((root/'lists'/f"{row['source_key']}.csv").open()))
    assert len(rows) == int(row['question_count']), (row['source_key'], len(rows), row['question_count'])
    entry_total += len(rows)
bank = list(csv.DictReader((root/'question-bank.csv').open()))
assert len({(r['problem_id'], r['slug']) for r in bank}) == len(bank)
print(f"sources={len(manifest)} entries={entry_total} unique={len(bank)}")
PY

git diff --check
git diff --name-only | rg 'question\.md' && echo "Do not commit question.md" && exit 1 || true
```

Also scan diffs for common credential strings before committing: `LEETCODE_SESSION`, `csrftoken`, `cf_clearance=`, `Authorization:`, `Bearer `.

For NeetCode practice lists, store the NeetCode pattern/category in `concepts` and keep the official NeetCode problem URL/slug in per-list metadata. Do not store full problem statements or solution text.

## Handoff To Mock Interviewer

After import, confirm that `.claude/skills/coding-mock-interviewer/SKILL.md` tells the interviewer to read:

- `data/leetcode/question-bank.csv`
- `data/leetcode/lists/manifest.csv`
- `concepts` from `question-bank.csv` when selecting by pattern
- recent `progress/*.md`

The interviewer should use `leetgo info <id-or-slug>` to verify live problem metadata before a mock.
