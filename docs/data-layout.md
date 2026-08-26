# Runtime Data Layout

The public repository contains the interview engine and reusable content. Live
candidate state lives behind one portable data-root seam.

## Resolution

`node scripts/arena-context.mjs` resolves the data root in this order:

1. `INTERVIEW_ARENA_DATA_DIR`, when set.
2. `<repository>/.arena`.

It loads `<data-root>/settings.json` when present, otherwise
`config/default-settings.json`. `progress_dir` must be a relative path contained
inside the data root. The selected preset must exist in `presets/`.

## Private Data Repository

For versioned personal progress, clone or initialize a private repository at
`.arena/` without adding it as a Git submodule. The public parent ignores the
entire directory, so it publishes neither the data nor the private remote URL.

Minimum layout:

```text
.arena/
├── settings.json
└── progress/
```

Example settings:

```json
{
  "preset": "google-meta-senior-edge-ai",
  "progress_dir": "progress"
}
```

Agents must obtain the paths from the resolver rather than assuming `progress/`
or embedding an absolute machine path. Public templates live separately under
`templates/progress/`.
