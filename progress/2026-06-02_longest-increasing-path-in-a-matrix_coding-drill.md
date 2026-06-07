# Coding Drill: Longest Increasing Path in a Matrix

**Date:** 2026-06-02
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected, imported list-backed
**Pattern:** DFS with memoization / DAG DP on matrix
**Result:** Pass
**LeetCode:** 329 longest-increasing-path-in-a-matrix
**Leetgo Evidence:** `leetgo info 329`; `leetgo pick 329 --skip-editor`; `leetgo test last -L` passed 3/3 local cases; `leetgo submit last` accepted 139/139

## Problem Summary

Given a matrix, find the maximum length of a path that moves in four directions
and only steps to strictly larger values.

## Candidate Approach

- Clarification: handled the empty matrix edge case in code, though constraints
  were not fully discussed before implementation.
- Brute force: identified DFS from each cell and recognized repeated
  exploration causes exponential behavior.
- Bottleneck: repeated suffix computations from the same cell.
- Optimal approach: define `dfs(r, c)` as the longest increasing path starting
  from cell `(r, c)`, memoize it, and take the max over all start cells.
- Invariant / state / proof: strict increase gives a DAG, so the reachable
  future from `(r, c)` depends only on the cell and matrix, not on the prefix
  path used to arrive there.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Drill target: DFS state semantics | 3 | Reached the correct suffix-state definition and understood why prefix length is not memoizable by `(r, c)` alone. |
| Brute force / bottleneck | 3 | Correctly described DFS branching and repeated cell work. |
| Proof / invariant | 3 | Connected strict increase to DAG/no-cycle behavior after interviewer prompting. |
| C++ correctness | 3 | Final code was correct and accepted; initial draft had a missing return and a lambda call arity bug. |
| Testing | 2 | Local and LeetCode tests passed, but manual dry-run was skipped once submission was requested. |

## Drill Notes

- The main conceptual correction was distinguishing prefix state from suffix
  state. `path length so far` depends on the caller, while `best suffix from
  (r, c)` is stable and memoizable.
- No `visited` set is needed for cycle prevention because every valid edge moves
  to a strictly larger value.
- The final implementation used DFS, memoization, four-direction traversal, and
  returned the best suffix length for each cell.

## Improvement Since Last Session

- Compared with recent graph/DFS drills, graph modeling was quicker and the
  repeated-work bottleneck was identified early.
- The remaining growth area is writing recursive C++ lambdas precisely on the
  first pass: call signature, return statement, and local state capture.

## Drill Result

**Pass:** The target skill was met: the memoized DFS state was corrected from
prefix-style thinking to a stable suffix return value, then implemented and
accepted.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [ ] Time / space complexity
- [x] Edge cases

## Next Drill / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** Word Break for one-dimensional suffix DP, or Longest String
Chain for another DAG longest-path DP.
