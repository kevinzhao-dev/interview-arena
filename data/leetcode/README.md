# LeetCode Question Bank

This folder stores imported LeetCode list metadata for mock interview selection.

## Files

- `question-bank.csv`: deduplicated aggregate of all imported lists.
- `lists/manifest.csv`: source list metadata, URL, imported count, progress, and import date.
- `lists/*.csv`: per-source list exports.

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
- `imported_at`

Per-list CSV files store the source fields plus each problem's metadata.

## Rules

- Store metadata only. Do not store full LeetCode problem descriptions.
- Use `leetgo info <id-or-slug>` to verify live metadata before an interview.
- Use progress notes under `progress/` as the training history source of truth.
