# Senior System Design Rubric

Target: Google L5 / Meta E5.

## Hire Bar

A senior system design performance turns ambiguity into a scoped system, makes justified tradeoffs, identifies bottlenecks, and explains how the system fails and recovers.

## Session Modes

- **Drill Mode**: Practice one design skill such as requirements scoping, data model, bottleneck math, reliability, observability, or edge AI rollout. Result is `Pass`, `Needs Work`, or `Repeat`; no hire/no-hire label.
- **Teaching Mode**: Learn a full design prompt with active scaffolding, free questions, partial reveals, and guided tradeoff discussion. Do not score readiness or give hire/no-hire language. If a note is explicitly requested, use `Learned`, `Needs Review`, or `Retest Scheduled`, and include a retest plan.
- **Guided Mock Mode**: Normal training mode. Score dimensions from 1 to 4 and report `Ready`, `Close`, or `Needs Focus`. Hints and teaching are allowed, but must be recorded.
- **Onsite Mock Mode**: Strict calibration mode. Score dimensions from 1 to 4 and give a formal `Strong Hire`, `Hire`, `Lean Hire`, `Lean No Hire`, or `No Hire` recommendation.

Use Onsite Mock Mode only when explicitly requested or when calibrating final readiness.

## Dimensions

| Dimension | 4 | 3 | 2 | 1 |
| --- | --- | --- | --- | --- |
| Requirements | Clarifies goals, non-goals, users, scale | Covers core requirements | Misses important constraints | Designs without requirements |
| Architecture | Clean boundaries and data flow | Workable component design | Over/under-designed | Incoherent architecture |
| Data model | Fits access patterns and scale | Mostly sound | Vague or mismatched | Missing |
| Scalability | Quantifies bottlenecks and mitigations | Identifies main bottlenecks | Generic scaling claims | No scale reasoning |
| Reliability | Handles failures and degradation | Covers common failures | Superficial reliability | Ignores failures |
| Observability | Defines metrics and alerting | Has useful metrics | Vague logs/dashboards | No observability |
| Tradeoffs | Makes explicit, contextual tradeoffs | Reasonable tradeoffs | Lists tradeoffs without decisions | No tradeoff reasoning |
| Communication | Prioritized, crisp, adaptable | Clear enough | Rambling | Hard to guide |

## Edge AI Addendum

For on-device AI systems, also evaluate:

- latency and tail latency budgets
- model size and memory footprint
- backend abstraction across CPU/GPU/NPU
- thermal and power degradation
- model rollout, rollback, and compatibility
- quantization and quality regression
- privacy boundaries and telemetry without raw data
- offline behavior and cloud fallback

## Common Senior Weak Signals

- Designs the familiar domain but misses general system fundamentals.
- Uses buzzwords without explaining operational behavior.
- Cannot say what breaks first.
- Cannot define a v1 boundary.
- Treats edge devices like cloud servers.
- Ignores privacy, telemetry, and rollback for ML systems.

## Feedback Guardrails

- Always include one concrete improvement since the previous relevant session when history exists.
- Critique observed design behavior, not the person.
- Reserve final-judgment language such as "would fail onsite" for Onsite Mock Mode or repeated severe gaps.
- In Guided Mock Mode, describe risks as "onsite risk" and pair each risk with the next drill.
