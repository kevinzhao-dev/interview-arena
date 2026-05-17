# System Design Track

## Goal

Build Google L5 / Meta E5 system design readiness while preserving general design strength and using edge AI expertise as a differentiator.

## Cadence

- 1 full system design mock per week, 45 minutes.
- 1 focused deep dive per week, 20-30 minutes.
- 1 written recap per mock in `progress/`.
- Every fourth mock must be a cold general system question.

## Mix

- 60% general product/distributed systems.
- 40% edge AI / on-device AI systems.

This mix prevents overfitting while still sharpening the story for on-device Edge AI SWE roles.

## Ten-Session Loop

1. General: notification system.
2. Edge AI: multi-backend inference framework.
3. General: metrics ingestion and query.
4. Cold general: distributed job scheduler.
5. Edge AI: model rollout and rollback for edge cameras.
6. General: feature flag and experimentation platform.
7. Edge AI: privacy-preserving production telemetry for model quality.
8. Cold general: file synchronization service.
9. Edge AI: natural-language video search for surveillance footage.
10. General: video upload and processing pipeline.

## Required Answer Shape

Every design answer should include:

1. Requirements and non-goals.
2. Scale and constraints.
3. High-level architecture.
4. Core data model.
5. Main request or data flow.
6. Bottleneck analysis.
7. Reliability and failure modes.
8. Observability and metrics.
9. Tradeoffs and simplifications.
10. Final v1 vs future roadmap.

## Edge AI Checklist

Use this checklist when relevant:

- device classes and hardware backends
- latency and tail latency targets
- memory and model size budget
- thermal and power behavior
- model quantization and accuracy drift
- update, rollback, and compatibility
- offline and degraded modes
- privacy boundaries
- telemetry without raw data
- fleet-level observability
