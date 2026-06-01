# Coding Mock: Merge Intervals

**Date:** 2026-05-25
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected
**Pattern:** Sorting / interval merge
**Result:** Close
**LeetCode:** 56 merge-intervals
**Leetgo Evidence:** `leetgo info 56`; `leetgo pick 56 --skip-editor`; `leetgo test last -L` passed 3/3 local cases; `leetgo submit last` accepted 172/172

## Problem Summary

Given a list of closed intervals, merge every overlapping or endpoint-touching
group and return a list of non-overlapping intervals covering the same ranges.

## Candidate Approach

- Clarification: asked about input type, lack of initial ordering, repeated
  starts/ends, and duplicate pairs. Initially assumed `start == end` and exact
  duplicate intervals would not occur, but the final approach handles both.
- Brute force: described comparing each interval with later intervals and
  merging overlaps in O(n^2), but the consolidation step needed more precision
  for transitive overlaps.
- Bottleneck: correctly identified repeated pairwise overlap checks.
- Optimal approach: sort intervals by start and scan from left to right,
  maintaining the current merged interval.
- Invariant / proof: needed help to shift from a `left/right` window based on
  the original left end to an active interval whose end expands with `max`.

## Code Review Notes

- Correctness: final solution was accepted by LeetCode.
- C++ API / implementation: final code uses `sort`, handles empty input, keeps
  an output vector, and uses `const auto&` for the current interval. Initial
  drafts mixed state variables and placed `return ans` inside the loop.
- Complexity: O(n log n) time from sorting and O(n) output space.
- Edge cases: handles empty input, single interval, endpoint-touching intervals,
  nested intervals, transitive overlaps, and disjoint groups.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3 | Asked useful type/order/duplicate questions; a few assumptions were unnecessary but not harmful to the final solution. |
| Brute force / bottleneck | 2 | Identified O(n^2) comparison cost, but did not fully specify how transitive overlap groups are resolved. |
| Optimal approach | 3 | Selected sort-then-scan and recognized adjacent comparison after sorting. |
| Proof / invariant | 2 | Initial invariant used `left.end` instead of the expanding merged end; needed interviewer correction. |
| C++ correctness | 2 | Final code was accepted, but earlier versions had a state bug and a `return` inside the loop. |
| Testing | 3 | Dry-run exposed a real bug; later dry-run covered overlap and disjoint cases, but missed the loop-return placement. |
| Communication | 3 | Clearly stated uncertainty, showed dry-run evidence, and corrected course quickly. |

## Interviewer Feedback

### Strengths

- Found the correct high-level pattern quickly: sort by start, then merge in one
  scan.
- Used dry-run effectively enough to catch the broken `left/right` state model.
- Final implementation was concise and accepted after local verification.

### Improvement Since Last Session

- Compared with the Course Schedule sessions, brute force and bottleneck were
  stated earlier and more naturally.
- The main recurring gap is still pre-code proof precision: the invariant needs
  to be exact before implementation starts.

### Improvement Areas

- For interval problems, name the active merged interval and update its end with
  `max`; avoid mixing it with original interval indices.
- Dry-run the code as written, including brace placement and early returns.
- State closed-interval overlap explicitly: `next.start <= current.end`.

### Key Moment

The key moment was the dry-run on `[1,4], [3,6], [5,8]`, which showed that
checking only the original left interval's end loses the expanded merged range.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [ ] Invariant / state / DFS return value
- [x] Time / space complexity
- [x] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** Insert Interval or Non-overlapping Intervals, focusing on
active-interval invariants and code-as-written dry-runs.
