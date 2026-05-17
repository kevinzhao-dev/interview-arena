# Senior System Design Rubric

Target: Google L5 / Meta E5.

## Hire Bar

A senior system design performance turns ambiguity into a scoped system, makes justified tradeoffs, identifies bottlenecks, and explains how the system fails and recovers.

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
