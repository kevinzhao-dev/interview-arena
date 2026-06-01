# Coding Drill: Number of Islands

**Date:** 2026-05-25
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Planned DFS refresher
**Pattern:** Grid DFS / connected components
**Result:** Pass
**LeetCode:** 200 number-of-islands
**Leetgo Evidence:** `leetgo pick 200 --skip-editor`; red `leetgo test last -L` on empty skeleton; green `leetgo test last -L` on local examples; `leetgo submit 200` accepted 49/49

## Problem Summary

Given a 2D grid of land and water cells, count how many connected land
components exist under four-directional adjacency.

## Drill Target

Rebuild DFS fundamentals after a break: component-counting semantics, visited
mark timing, boundary checks, and C++ helper structure.

## Candidate Approach

- Clarification: asked whether the grid can be modified, which enabled in-place
  visited marking.
- Graph model: modeled land cells as graph nodes with four-directional edges.
- Initial DFS framing: first described DFS as computing area; corrected to
  connected-component marking for island counting.
- Optimal approach: scan all cells; when an unvisited land cell is found, count
  a new component and DFS to sink all connected land.
- Invariant: after `dfs(r, c)` returns, every land cell in that component has
  been marked as visited, so the outer scan cannot count it again.

## Code Review Notes

- Correctness: final solution accepted by LeetCode.
- First draft issues: helper used `vector<vector<int>>` while the LeetCode API
  uses `vector<vector<char>>`; indexed `grid[i][j]` before validating bounds.
- Second draft issue: wrote `grid[0].empty` instead of `grid[0].empty()`.
- Final implementation: private DFS helper, early bounds check, immediate
  `'1'` to `'0'` marking, and four recursive calls.
- Complexity: O(m * n) time because each cell is processed at most once; O(m * n)
  worst-case recursion depth for an all-land grid.

## Drill Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3 | Asked the important mutability question without over-clarifying. |
| DFS semantics | 3 | Corrected from area computation to component marking after prompt. |
| Visited / boundary discipline | 3 | Final logic marks immediately and checks bounds before indexing. |
| C++ correctness | 2 | Needed fixes for type mismatch and `empty()` syntax. |
| Dry-run | 4 | Correctly identified all four components in the adversarial grid. |

## Strengths

- Quickly recovered the graph interpretation for grid DFS.
- Correctly used in-place mutation as the visited set.
- Dry-run was concise and accurate after implementation fixes.

## Improvement Since Last Session

Compared with recent BFS drills, the traversal model transferred well: visited
state and component traversal were natural. The main improvement needed is C++
compile hygiene before moving from algorithm sketch to accepted code.

## Improvement Areas

- State the DFS return/function semantics before coding: "mark this whole
  component visited."
- Put all out-of-bounds checks before any grid indexing.
- Do a 20-second C++ API pass for container element type and member function
  calls before finalizing code.

## Key Moment

The key correction was separating "DFS can compute area" from "this problem
counts components." Once the DFS was defined as a component-sinking operation,
the outer-loop count logic became straightforward.

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
**Next target:** `Max Area of Island` for DFS return-value practice, then
`Surrounded Regions` for boundary-origin DFS.
