# Coding Drill: Max Area of Island

**Date:** 2026-06-07
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up from Number of Islands
**Pattern:** Grid DFS / connected component size
**Result:** Pass (assisted implementation cleanup)
**LeetCode:** 695 max-area-of-island
**Leetgo Evidence:** `leetgo pick 695 --skip-editor`; `leetgo test last -L` passed 2/2 local cases; `leetgo submit last --yes` accepted 728/728

## Problem Summary

Given a binary grid, return the largest size of any four-directionally connected
land component. Return `0` if no land exists.

## Candidate Approach

- Clarification: assumed in-place visited marking is allowed.
- Brute force: scan every cell and start traversal from unvisited land.
- Bottleneck: avoid recounting the same island by marking cells as visited.
- Optimal approach: DFS from each unvisited land cell, sink the component, and
  return its area.
- Invariant / state / proof: `dfs(r, c)` returns the full area of the unvisited
  island containing `(r, c)` and marks that island visited.

## Code Review Notes

- Correctness: final implementation accepted after fixing boundary handling.
- C++ API / implementation: first draft passed accumulated `area` as an
  argument, which made the DFS contract harder and risked over-counting.
- Boundary discipline: initial neighbor loop checked `grid[r + dr][c + dc]`
  before validating indices; final version lets `dfs` own all invalid-cell
  checks before indexing.
- Complexity: O(rows * cols) time; O(rows * cols) worst-case recursion depth.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| DFS return-value semantics | 3 | Correctly articulated area-returning DFS after prompt. |
| Visited / boundary discipline | 2 | Needed correction to avoid out-of-bounds neighbor indexing. |
| C++ correctness | 3 | Final code compiled, passed local tests, and was accepted. |
| Communication | 3 | Identified the problem as easy and explained the core idea clearly. |

## Interviewer Feedback

### Strengths

- Correctly transferred Number of Islands into component-size DFS.
- Used in-place mutation to avoid a separate visited structure.

### Improvement Since Last Session

- Compared with the earlier Number of Islands drill, DFS return semantics were
  stated faster and more directly.

### Improvement Areas

- Keep invalid-cell checks inside traversal helpers before any grid indexing.
- Avoid accumulator parameters when a recursive function can return the value it
  computes.

### Key Moment

The key correction was changing the DFS contract from `dfs(..., area)` into a
self-contained `dfs(r, c)` that returns `1 + neighbor areas`.

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
**Next target:** LC 542 01 Matrix for multi-source BFS distance.
