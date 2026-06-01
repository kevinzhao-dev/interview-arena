# Coding Mock: Pacific Atlantic Water Flow

**Date:** 2026-05-31
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-requested graph problem, imported list-backed
**Pattern:** Graph traversal / reverse reachability from borders
**Result:** Needs Focus
**LeetCode:** 417 pacific-atlantic-water-flow
**Leetgo Evidence:** `leetgo info 417`; no local skeleton or tests run

## Problem Summary

Given a height grid, water can flow from a cell to adjacent cells with lower or
equal height. Return all cells whose water can reach both the Pacific borders
top/left and the Atlantic borders bottom/right.

## Candidate Approach

- Clarification: initially asked reasonable questions about height values and
  unreachable cells, but misread the target as a path between specific corners
  or ocean borders rather than a per-cell reachability question.
- Brute force: initially proposed starting from `[0][0]`; after correction, the
  accurate brute force is to run DFS/BFS from every cell and test whether it can
  reach both oceans, which is O((mn)^2).
- Bottleneck: recognized that repeated traversals from many source cells are
  inefficient.
- Optimal approach: with hints, reached the idea of fixing the ocean borders as
  sources and traversing in reverse with `neighborHeight >= currentHeight`.
- Invariant / state / proof: partially stated that reverse traversal finds cells
  that can flow back to the ocean, but still needs practice making the two
  independent visited states precise.

## Code Review Notes

- Wrote a partial BFS helper, but stopped before completing
  `pacificAtlantic`.
- Main issues in the helper: used level-size traversal so only the first queue
  layer would run; direction loop type was incorrect; initial border cells still
  needed to be marked visited by the caller.
- Initially thought one visited grid was enough. Correct model requires two
  visited grids: one for Pacific reachability and one for Atlantic reachability.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 2 | Misinterpreted the output as corner/border path reachability instead of all cells that can reach both oceans. |
| Brute force / bottleneck | 2 | Identified repeated traversal cost after correction, but the first brute force started from the wrong source. |
| Optimal approach | 2 | Reached reverse traversal only after interviewer hints and problem restatement. |
| Proof / invariant | 2 | Could explain `neighborHeight >= currentHeight`, but not yet the two-reachability-state invariant independently. |
| C++ correctness | 1 | Partial helper had traversal and type bugs, and the main function was not completed. |
| Testing | 1 | No dry-run or local test was completed. |
| Communication | 3 | Stopped early, asked for clarification, and explicitly requested a retest note instead of guessing through code. |

## Feedback

### Strong Signals

- Once the problem was restated, identified the grid as a graph with cells as
  nodes and four-direction edges based on height constraints.
- Correctly articulated the key reverse-traversal condition:
  `neighborHeight >= currentHeight`.
- Recognized that the direct per-cell search repeats work.

### Improvement Since Last Session

- Compared with recent graph sessions, the graph modeling vocabulary is more
  available: node, edge, four-direction traversal, and reachability were named
  explicitly.
- The main gap is now choosing the correct sources and state variables before
  writing code.

### Weak Signals

- Problem interpretation drifted from "all cells reaching two oceans" into
  "one path between two borders."
- BFS/DFS roles were mixed up: BFS is the usual shortest-path tool; both BFS
  and DFS work for plain reachability.
- State compression was premature. This problem needs two independent visited
  matrices before taking the intersection.

### Key Moment

The key moment was the realization that starting from every cell is the wrong
direction. Starting from each ocean border in reverse changes the question into
two O(mn) reachability passes.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [ ] Invariant / state / DFS return value
- [x] Time / space complexity
- [ ] Edge cases

## Next Drill / Retest Plan

**Redo needed:** Yes
**Redo date:** Next coding session
**Next target:** Redo LC 417 in Drill Mode. First state the exact meaning of
`pacific[r][c]` and `atlantic[r][c]`, then implement the two-source BFS without
looking at the previous code.
