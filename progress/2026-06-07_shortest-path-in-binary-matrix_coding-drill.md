# Coding Drill: Shortest Path in Binary Matrix

**Date:** 2026-06-07
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up from 01 Matrix
**Pattern:** BFS shortest path in unweighted grid
**Result:** Pass (assisted)
**LeetCode:** 1091 shortest-path-in-binary-matrix
**Leetgo Evidence:** `leetgo info 1091`; `leetgo test 1091 -L` passed 3/3 local cases; `leetgo submit 1091 --yes` accepted 90/90

## Problem Summary

Given a blocked/open square grid, return the shortest path length from the
top-left cell to the bottom-right cell using eight-directional movement, or
`-1` if no path exists.

## Candidate Approach

- Clarification: identified blocked start/end and `n == 1` path length semantics.
- Brute force: not expanded; this was a targeted BFS follow-up after 01 Matrix.
- Bottleneck: avoid revisiting open cells by marking visited when enqueued.
- Optimal approach: BFS from `(0, 0)`, store distance in the grid, and return
  when the bottom-right cell is popped.
- Invariant / state / proof: when a cell is assigned a positive value, that
  value is the shortest path length from the start to that cell.

## Code Review Notes

- Correctness: final implementation passed local tests and was accepted.
- C++ API / implementation: used `queue<pair<int, int>>` and grid mutation for
  visited plus distance state.
- Key correction: do not pre-mark the destination as `-1`; doing so blocks BFS
  from entering the target and breaks the `n == 1` case.
- Complexity: O(n^2) time; O(n^2) queue space in the worst case.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Edge cases | 3 | Covered blocked start/end and path length starting at 1. |
| BFS state / invariant | 3 | Correctly chose enqueue-time visited marking. |
| C++ correctness | 2 | Needed correction for destination pre-marking and return structure. |
| Communication | 3 | Quickly transferred 01 Matrix distance ideas to single-source target BFS. |

## Interviewer Feedback

### Strengths

- Correctly marked visited on enqueue to prevent duplicate queue entries.
- Correctly initialized path length as `1` because the starting cell counts.

### Improvement Since Last Session

- Compared with 01 Matrix, the shortest-path invariant transferred well: first
  assignment in BFS is the shortest distance.

### Improvement Areas

- Be careful not to mutate target/source cells into sentinel states that change
  traversal semantics.
- Return directly when the target is reached; avoid `break` plus later sentinel
  reads unless the sentinel is carefully maintained.

### Key Moment

The important correction was removing `grid[n - 1][n - 1] = -1`, which would
have made the target unreachable to the BFS.

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
**Next target:** Course Schedule redo or return to Cheapest Flights with Bellman-Ford-style state.
