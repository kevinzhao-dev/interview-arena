# Senior Coding Rubric

Target: Google L5 / Meta E5, Modern C++.

## Hire Bar

A senior coding performance is not just accepted code. It shows structured problem solving, clear invariants, independent correction, and clean implementation under time pressure.

## Session Modes

- **Drill Mode**: Practice one skill such as invariant proof, dry-run discipline, implementation hygiene, or edge-case enumeration. Result is `Pass`, `Needs Work`, or `Repeat`; no hire/no-hire label.
- **Guided Mock Mode**: Normal training mode. Score dimensions from 1 to 4 and report `Ready`, `Close`, or `Needs Focus`. Hints and teaching are allowed, but must be recorded.
- **Onsite Mock Mode**: Strict calibration mode. Score dimensions from 1 to 4 and give a formal `Strong Hire`, `Hire`, `Lean Hire`, `Lean No Hire`, or `No Hire` recommendation.

Use Onsite Mock Mode only when explicitly requested or when calibrating final readiness.

## Dimensions

| Dimension | 4 | 3 | 2 | 1 |
| --- | --- | --- | --- | --- |
| Clarification | Surfaces constraints and ambiguity quickly | Asks key constraints | Misses important assumptions | Starts coding blindly |
| Brute force / bottleneck | Clearly frames baseline and why it fails | Has workable baseline | Baseline unclear | Cannot explain baseline |
| Optimal approach | Derives pattern with minimal hinting | Reaches optimal approach | Needs significant hinting | Does not reach viable approach |
| Proof / invariant | Explains invariant/state convincingly | Gives acceptable reasoning | Hand-wavy proof | No correctness argument |
| C++ correctness | Clean, idiomatic, correct | Minor implementation issues | Multiple bugs or API gaps | Non-working code |
| Testing | Covers normal, edge, adversarial cases | Covers main cases | Superficial tests | No meaningful tests |
| Communication | Crisp, structured, collaborative | Understandable | Rambling or fragmented | Hard to follow |

## Common Senior Weak Signals

- Solves by memorized template but cannot justify invariant.
- Jumps to code before pinning constraints.
- Needs interviewer to discover edge cases.
- Complexity claim does not match implementation.
- C++ comparator, overflow, iterator, or ownership mistakes in core logic.
- Cannot explain why a greedy choice is safe.

## Feedback Guardrails

- Always include one concrete improvement since the previous relevant session when history exists.
- Critique the observed behavior, not the person.
- Reserve final-judgment language such as "red flag" or "would fail onsite" for Onsite Mock Mode or repeated severe misses.
- In Guided Mock Mode, describe risks as "onsite risk" and pair each risk with the next drill.

## Debrief Questions

- What would have changed the recommendation by one level?
- Which seven-question completion item was weakest?
- Should this problem be redone in 3 days?
- Which related pattern should be drilled next?
