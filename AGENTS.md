# Interview Arena

Interview Arena is a reusable mock-interview training workspace for coding and
system design. Keep the public repository portable and free of candidate
identity, private progress, credentials, and machine-specific paths.

## Runtime Context

Before a target-aware session, question selection, scoring, or progress write:

1. Run `node scripts/arena-context.mjs` from anywhere in the repository.
2. Read the returned `preset_path` for target companies, levels, titles,
   programming language, focus areas, and content mix.
3. Use `progress_dir` as the only source of truth for session history and new
   progress notes. Create it when a note must be written and it does not exist.

Runtime data is resolved from `INTERVIEW_ARENA_DATA_DIR` when set, otherwise
from `.arena/`. When no private settings exist, the resolver uses the generic
`senior-swe` preset. See `docs/data-layout.md` for the portable data contract.

Do not infer candidate identity or background from Git metadata, paths, or the
repository owner. Calibrate sessions from the active target preset and observed
progress only.

## Preparation Sources

- Coding plan: `coding-plan/deep_work.html`
- Google coding quick reference: `coding-plan/google-coding-cheatsheet.html`
- Aggregated LeetCode bank: `data/leetcode/question-bank.csv`
- Source lists: `data/leetcode/lists/*.csv`
- Source manifest: `data/leetcode/lists/manifest.csv`
- System design track: `system-design-plan/track.md`
- Senior rubrics: `rubrics/`
- Public progress templates: `templates/progress/`

For coding mock selection, read the plan, question bank, manifest, and recent
notes in the resolved `progress_dir`. Prefer imported real lists and use the
question bank's `concepts` field for pattern targeting. Follow the active
preset's cold-general rotation to prevent overfitting.

## LeetCode CLI

This repository uses `leetgo` with `leetgo.yaml`. Generated Modern C++ practice
files live under ignored `cpp/` and never replace the private progress store.

These low-risk commands may run without per-command confirmation:

- `leetgo info <id-or-slug>`
- `leetgo pick <id-or-slug> --skip-editor`
- `leetgo test last -L`
- `leetgo cache update`

Submission and AI-answer guardrails:

- Run `leetgo submit` only when the user explicitly requests submission in the
  current turn.
- Run remote test flags (`--submit`, `-s`, `--both`, `-B`) only when the user
  explicitly requests submission or remote execution in the current turn.
- Never run `leetgo fix`.
- Never expose cookies, tokens, sessions, or browser credentials.
- Paraphrase LeetCode prompts in progress notes; do not copy full statements.

## Mock Interview Skills

Use the matching project skill for coding mocks, system design mocks, scoring,
and LeetCode list imports. `.claude/skills/` is the canonical skill source;
`.agents/skills/` is the synchronized Codex copy. After changing a canonical
skill, run `node scripts/sync-agent-skills.mjs` and then its `--check` mode.

Session modes:

- Guided Mock is the default for normal practice and uses `Ready`, `Close`, or
  `Needs Focus` training readiness.
- Drill evaluates only its selected objective with `Pass`, `Needs Work`, or
  `Repeat`.
- Teaching provides active scaffolding and no readiness or hire verdict.
- Onsite is used only for an explicit strict/real/final calibration request and
  may use the formal `Strong Hire` through `No Hire` scale.

Guided and Onsite sessions write a note to the resolved `progress_dir` unless
the user opts out. Drill writes only for a substantial session, redo, or user
request. Teaching writes only when the user explicitly requests a record or
retest trail. New notes use a 1-4 scale where applicable and include mode,
evidence, improvement since the last relevant session, and a retest plan.
