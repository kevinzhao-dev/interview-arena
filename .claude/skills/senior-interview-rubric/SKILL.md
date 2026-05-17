---
name: senior-interview-rubric
description: Use when scoring Kai-Wen Zhao's coding, system design, or behavioral mock interviews for Google L5 / Meta E5 senior SWE readiness. Produces concrete hire signal, scores, evidence, and next drills.
---

# Senior Interview Rubric

## Purpose

Score mock interviews with senior-level rigor. The output should help Kai-Wen improve, not merely feel reassured.

## Final Recommendation

Use one of:

- **Strong Hire**: Clearly above L5/E5 bar; drives the interview with crisp reasoning and few gaps.
- **Hire**: Meets bar; small issues but no serious concern.
- **Lean Hire**: Close to bar; one notable weakness but recoverable.
- **Lean No Hire**: Below bar; solution or design may work, but senior signal is weak.
- **No Hire**: Major correctness, reasoning, communication, or design judgment gaps.

## Scoring Scale

Score each dimension from 1 to 4.

- **4**: Strong senior signal.
- **3**: Meets level.
- **2**: Inconsistent or junior-leaning signal.
- **1**: Serious gap.

## Coding Dimensions

- Problem clarification
- Brute force and bottleneck analysis
- Optimal approach and proof
- Code correctness
- C++ implementation quality
- Testing and edge cases
- Communication under pressure

## System Design Dimensions

- Requirement clarification
- Architecture and component boundaries
- Data model and request/data flow
- Scalability and bottleneck reasoning
- Reliability and failure modes
- Observability and metrics
- Tradeoff judgment
- Communication and prioritization

## Evidence Rule

Every score below 3 must include one concrete observed behavior.

Examples:

- "Skipped input constraints and chose O(n^2) without checking whether n made it impossible."
- "Named Kafka but did not explain ordering, backpressure, or retry behavior."
- "Found the right DP state after a hint, so this is not an independent solve."

## Debrief Format

Use this order:

1. Final recommendation.
2. Score table.
3. Strongest signals.
4. Weakest signals.
5. One key moment.
6. Next 1-3 drills.

Keep feedback direct, kind, and specific.
