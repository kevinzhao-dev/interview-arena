# Coding Drill: Open the Lock

**Date:** 2026-05-24
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up variation
**Pattern:** BFS shortest path on implicit unweighted graph
**Result:** Needs Work
**LeetCode:** 752 open-the-lock
**Leetgo Evidence:** `leetgo pick 752 --skip-editor`; red `leetgo test last -L` on empty skeleton; green `leetgo test last -L` on local examples; `leetgo submit last` accepted 48/48

## Problem Summary

Given a four-wheel lock starting at `0000`, a target state, and forbidden
deadend states, find the minimum number of one-wheel rotations needed to reach
the target without entering a deadend. Return -1 if no valid route exists.

## Drill Target

Implicit graph modeling, BFS level semantics, visited timing, and C++ control
flow discipline.

## Candidate Approach

- Clarification: initially focused on wrap-around and shortest direction, then
  clarified that greedy per-wheel rotation is not valid because deadends can
  force detours.
- Graph model: first described non-deadend states as broadly connected; after
  feedback corrected the edge definition to exactly one wheel moved one step
  up or down, so each state has at most 8 neighbors.
- Optimal approach: BFS from `0000`, skipping deadends and visited states.
- Invariant: level-order BFS gives minimum moves because every edge has unit
  cost.

## Code Review Notes

- Correctness: final solution accepted by LeetCode.
- First draft issues: invalid `queue` initialization, compared `q` to `target`
  instead of `state`, placed `level++` inside per-state processing, and returned
  -1 inside the BFS loop.
- Final implementation: correct queue setup, visited marking at enqueue time,
  up/down neighbor generation with modulo arithmetic, and level increment after
  each full layer.
- Complexity: O(10^D * D) time and O(10^D) space for D wheels; fixed LeetCode
  version is bounded by 10,000 states.

## Drill Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Graph modeling | 2 | Initial edge definition was too broad; corrected after interviewer feedback. |
| BFS level semantics | 2 | First code placed `level++` and `return -1` in incorrect scopes. |
| Neighbor generation | 3 | Final up/down modulo logic was correct. |
| C++ correctness | 2 | First draft had compile/control-flow errors; final code compiled and submitted. |
| Testing / complexity | 2 | Needed help deriving O(10^D * D) and the sample shortest path. |

## Strongest Signals

- Accepted the edge-definition correction and fixed the model.
- Final code used clean visited-on-enqueue BFS.
- The corrected brace and level structure matched standard BFS.

## Improvement Since Last Session

Compared with the Minimum Genetic Mutation mock on 2026-05-23, the same
implicit-graph pattern transferred, but edge semantics and BFS level placement
needed more coaching. The final implementation was accepted after revision.

## Weakest Signals

- Edge definition must be exact: valid graph edges are local one-move
  transitions, not arbitrary non-deadend connectivity.
- BFS level updates must live outside the inner per-node loop.
- Complexity for bounded state spaces should be stated as total states times
  neighbor-generation cost.

## Key Moment

The key correction was recognizing that every lock state has only 8 neighbors.
That turns the problem from vague state enumeration into a precise implicit
graph BFS.

## Follow-Up / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** One grid BFS with obstacles and one bidirectional BFS drill to
reinforce exact neighbor definitions and level boundaries.
