# Coding Drill: Surrounded Regions

**Date:** 2026-05-31
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up simplification after Pacific Atlantic Water Flow
**Pattern:** Boundary DFS/BFS / reverse-safe marking
**Result:** Pass
**LeetCode:** 130 surrounded-regions
**Leetgo Evidence:** `leetgo info 130`; `leetgo pick 130 --skip-editor`; `leetgo test last -L` passed 2/2 local cases; `leetgo submit last` accepted 59/59

## Problem Summary

Given a board of `X` and `O`, flip every `O` region that is fully surrounded
by `X`. Any `O` connected to a boundary `O` must remain unchanged.

## Candidate Approach

- Clarification: correctly identified that boundary-connected `O` cells should
  not be flipped.
- Brute force: not fully expanded, since this was a targeted drill.
- Bottleneck: understood that checking every internal `O` independently is less
  direct than marking safe boundary-connected regions once.
- Optimal approach: run BFS from boundary `O` cells, mark all connected `O`
  cells as `visited`, then flip unvisited `O` cells to `X`.
- Invariant / state / proof: `visited[r][c] == true` means `board[r][c]` is an
  `O` connected to the boundary and therefore safe from flipping.

## Drill Notes

- Switched from DFS to BFS, which is valid and avoids recursion-depth concerns.
- Initial implementation had a typo reading `board[n].size()` instead of
  `board[0].size()`.
- Initial BFS did not mark nodes at enqueue time. After correction, used a
  guarded `add()` helper that marks `visited` before pushing into the queue.
- Final solution was accepted by LeetCode.

## Drill Result

**Pass:** The core target was met: the meaning of `visited` was correctly tied
to the answer state, and the boundary traversal implementation was completed
and accepted after implementation-level corrections.

## Next Drill / Retest Plan

**Redo needed:** Optional
**Redo date:** N/A
**Next target:** Return to LC 417 Pacific Atlantic Water Flow. Before coding,
state the two invariants: `pacific[r][c]` means cell `(r,c)` can flow to
Pacific, and `atlantic[r][c]` means it can flow to Atlantic.
