# Coding Drill: 01 Matrix

**Date:** 2026-06-07
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Planned graph/BFS bridge problem
**Pattern:** Multi-source BFS / shortest distance in unweighted grid
**Result:** Pass (assisted)
**LeetCode:** 542 01-matrix
**Leetgo Evidence:** `leetgo info 542`; `leetgo test 542 -L` passed 2/2 local cases; `leetgo submit 542 --yes` accepted 50/50

## Problem Summary

Given a binary matrix, return a matrix where each cell contains its distance to
the nearest zero under four-directional movement.

## Candidate Approach

- Clarification: worked from the generated LeetCode signature and matrix input.
- Brute force: discussed starting from each `1` to search for the nearest `0`,
  which repeats large portions of the grid search.
- Bottleneck: repeated BFS from every `1` can revisit the same cells many times.
- Optimal approach: enqueue all `0` cells as simultaneous BFS sources, mark
  `1` cells unvisited, and assign each unvisited neighbor as current distance
  plus one.
- Invariant / state / proof: once a cell is first assigned by multi-source BFS,
  that value is its shortest distance to any zero.

## Code Review Notes

- Correctness: final implementation passed local tests and was accepted.
- C++ API / implementation: initial code had a typo in neighbor row calculation
  and then an off-by-one assignment.
- Distance assignment: final version uses `mat[nr][nc] = mat[r][c] + 1`, so no
  explicit BFS level counter is needed.
- Complexity: O(rows * cols) time; O(rows * cols) queue space in the worst case.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3 | Understood matrix output and four-directional movement. |
| Brute force / bottleneck | 3 | Correctly moved away from per-`1` BFS toward shared expansion. |
| Optimal approach | 3 | Chose all zero cells as BFS sources. |
| Proof / invariant | 3 | Stated level-order expansion from zeros; invariant tightened with prompting. |
| C++ correctness | 2 | Needed fixes for a typo and `+ 1` distance assignment. |
| Testing | 3 | Local generated tests passed before submission. |
| Communication | 3 | Iterated quickly after identifying the off-by-one issue. |

## Interviewer Feedback

### Strengths

- Correctly identified multi-source BFS from zeros as the right direction.
- Used `-1` as unvisited state, which makes the queue logic simple.

### Improvement Since Last Session

- Compared with Rotting Oranges, the multi-source BFS source selection came back
  quickly; the remaining work is distance assignment precision.

### Improvement Areas

- Prefer deriving neighbor distance from the current cell value rather than
  maintaining a separate level variable when each cell stores its own distance.
- Cache `rows` and `cols`, then use those names consistently to reduce typo risk.

### Key Moment

The key correction was replacing `mat[nr][nc] = mat[r][c]` with
`mat[nr][nc] = mat[r][c] + 1`.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [x] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** LC 1091 Shortest Path in Binary Matrix or a Course Schedule redo.
