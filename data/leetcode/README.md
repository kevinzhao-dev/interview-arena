# LeetCode Question Bank

This folder stores imported LeetCode list metadata for mock interview selection.

## Files

- `question-bank.csv`: deduplicated aggregate of all imported lists.
- `lists/manifest.csv`: source list metadata, URL, imported count, progress, and import date.
- `lists/*.csv`: per-source list exports.
- `lists/coding-plan-deep-work.csv`: local mirror of `coding-plan/deep_work.html` problems.

## Schema

`question-bank.csv` stores:

- `problem_id`
- `slug`
- `title`
- `difficulty`
- `acceptance`
- `problem_url`
- `source_keys`
- `source_count`
- `concepts`: semicolon-separated pattern/category labels when imported sources provide them.
- `imported_at`

Per-list CSV files store the source fields plus each problem's metadata. Some sources may include extra metadata columns, such as NeetCode `source_order`, `concepts`, `neetcode_url`, and `neetcode_slug`.

## Rules

- Store metadata only. Do not store full LeetCode problem descriptions.
- Use `leetgo info <id-or-slug>` to verify live metadata before an interview.
- Use `concepts` for pattern-aware selection, but do not reveal the concept up front during mock interviews.
- Use progress notes under `progress/` as the training history source of truth.
- Use `.claude/skills/leetcode-list-importer` to refresh this folder from LeetCode URLs.
