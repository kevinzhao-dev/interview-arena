# Coding Drill: Rotting Oranges

**Date:** 2026-05-31
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up graph drill after Surrounded Regions
**Pattern:** Multi-source BFS / level-order time counting
**Result:** Pass
**LeetCode:** 994 rotting-oranges
**Leetgo Evidence:** `leetgo info 994`; `leetgo pick 994 --skip-editor`; `leetgo test last -L` passed 3/3 local cases; `leetgo submit last` accepted 307/307

## Problem Summary

Given a grid of empty cells, fresh oranges, and rotten oranges, return the
minimum minutes needed for all fresh oranges to become rotten, or `-1` if some
fresh orange cannot be reached.

## Candidate Approach

- Clarification: recognized that the grid can be updated in place instead of
  using a separate visited matrix.
- Brute force: not expanded, since this was a targeted BFS drill.
- Bottleneck: the important repeated-work issue was avoided by using all rotten
  oranges as simultaneous BFS sources.
- Optimal approach: enqueue all initially rotten oranges, count fresh oranges,
  process BFS level by level, and decrement `fresh` when an orange rots.
- Invariant / state / proof: `grid[r][c] == 2` after enqueue means the orange is
  already rotten or scheduled to rot, so it should not be enqueued again.

## Drill Notes

- Initially chose fresh oranges as BFS sources; corrected to initially rotten
  oranges because rotten oranges are the active infection frontier.
- Correctly decided that no separate `visited` matrix is needed.
- Minute counting was handled with level BFS and a `rottedThisRound` flag, so
  the answer only increments when at least one fresh orange rots.
- Initial code mixed row and column variables. Final version uses explicit
  `rows` and `cols`, avoiding non-square grid out-of-bounds bugs.

## Drill Result

**Pass:** Multi-source BFS structure, in-place visited state, and minute
counting were implemented and accepted after correcting source selection and
matrix dimension naming.

## Next Drill / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** LC 417 Pacific Atlantic Water Flow redo. Use two source sets,
two visited matrices, and state both reachability invariants before coding.
