# Senior Coding Rubric

Target: Google L5 / Meta E5, Modern C++.

## Hire Bar

A senior coding performance is not just accepted code. It shows structured problem solving, clear invariants, independent correction, and clean implementation under time pressure.

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

## Debrief Questions

- What would have changed the recommendation by one level?
- Which seven-question completion item was weakest?
- Should this problem be redone in 3 days?
- Which related pattern should be drilled next?
