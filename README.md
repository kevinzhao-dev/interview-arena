# Interview Arena

Interview Arena is a file-based mock-interview workspace for senior software
engineering preparation. It combines coding plans, imported LeetCode metadata,
system design tracks, scoring rubrics, and project-local interviewer skills.

The public repository contains reusable training logic and content. Candidate
identity, selected target, and session history live in an ignored/private data
directory, so the same checkout works as a generic public project or a deeply
personal training environment.

## Quick Start

Inspect the active runtime context:

```bash
node scripts/arena-context.mjs
```

Without local settings, Interview Arena uses the generic `senior-swe` preset and
stores future notes under ignored `.arena/progress/`.

To select a bundled target, create `.arena/settings.json`:

```json
{
  "preset": "google-meta-senior-edge-ai",
  "progress_dir": "progress"
}
```

For durable cross-machine history, make `.arena/` its own private Git repository
or clone a private data repository there. Keep it as an ordinary ignored nested
repository rather than a submodule, so the public project exposes no private
remote URL.

See `docs/data-layout.md` for the data contract and `AGENTS.md` for agent-facing
workflow and safety rules.

## Repository Content

- `presets/`: reusable target companies, levels, titles, and content mixes.
- `coding-plan/`: coding curriculum and quick-reference material.
- `data/leetcode/`: metadata-only imported problem lists and aggregate bank.
- `system-design-plan/`: senior system design cadence and topic rotation.
- `rubrics/`: human-readable coding and system design scoring references.
- `templates/progress/`: public templates for private session notes.
- `.claude/skills/`: canonical project-local interview skills.
- `.agents/skills/`: synchronized Codex copies of the canonical skills.

Generated LeetCode workspaces, local agent preferences, credentials, and private
runtime data are ignored by the public repository.
