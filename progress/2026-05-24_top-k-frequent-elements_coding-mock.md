# Coding Mock: Top K Frequent Elements

**Date:** 2026-05-24
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected, imported list-backed
**Pattern:** Hash map + heap / top-k selection
**Result:** Close
**LeetCode:** 347, top-k-frequent-elements
**Leetgo Evidence:** `leetgo info 347`; `leetgo pick 347 --skip-editor`; `leetgo test 347 -L` passed 3/3 local cases; `leetgo submit 347` accepted 23/23.

## Problem Summary

Given an integer array and `k`, return any `k` values with the highest occurrence counts. Return order is not important.

## Candidate Approach

- Clarification: Asked how ties should be handled when more than one value has the same frequency.
- Brute force: Count values, then sort by frequency.
- Bottleneck: Sorting unique values costs `O(m log m)` where `m` is the number of unique values.
- Optimal approach: Proposed count map plus size-`k` heap for `O(n + m log k)`, but submitted a simpler max-heap over all unique values.
- Invariant / state / proof: Needed interviewer prompt to state the size-`k` min-heap invariant.

## Code Review Notes

- Correctness: Final submitted max-heap solution was accepted.
- C++ API / implementation: Initial code had template syntax and `pair` vs `int` return-value issues; fixed before submission.
- Complexity: Submitted version is `O(n + m log m)` time and `O(m)` extra space, not the proposed `O(n + m log k)`.
- Edge cases: Covered basic examples through generated local tests; tie-order behavior was clarified as irrelevant.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3 | Asked about tie behavior; did not explicitly ask constraints or return-order rules until guided. |
| Brute force / bottleneck | 3 | Identified count plus sort and sorting bottleneck. |
| Optimal approach | 3 | Named size-`k` heap approach, but chose simpler max-heap implementation for submission. |
| Proof / invariant | 2 | Needed prompt to tighten the heap invariant. |
| C++ correctness | 3 | Final code accepted; initial version had compile/API blockers. |
| Testing | 3 | Local tests and LeetCode submission passed; manual dry-run was light. |
| Communication | 3 | Explained tradeoff between simpler code and tighter heap complexity. |

## Interviewer Feedback

### Strengths

- Quickly identified frequency counting as the core reduction.
- Recognized that full sorting is the bottleneck and that heap selection can improve it.
- Made a pragmatic implementation tradeoff that produced an accepted solution.

### Improvement Since Last Session

- No prior progress note for this problem was found. Within this session, the implementation improved from compile-blocked to accepted after correcting C++ type/API issues.

### Improvement Areas

- State the invariant before coding heap problems: after processing each candidate, the heap contains the current best `k` elements under the selected ordering.
- Keep implementation aligned with stated complexity. If you propose `O(m log k)`, code the bounded min-heap or explicitly say you are intentionally using `O(m log m)` for simplicity.
- During manual testing, include a tie case and a `k == number of unique values` case.

### Key Moment

The main signal was the mismatch between the proposed size-`k` heap and the submitted all-elements max-heap. The accepted solution is valid, but senior interviews expect the tradeoff to be stated precisely.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [ ] Invariant / state / DFS return value
- [x] Time / space complexity
- [ ] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** Yes
**Redo date:** 2026-05-27
**Next target:** Redo with bounded min-heap and state the invariant before coding.
