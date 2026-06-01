# Coding Mock: Course Schedule II

**Date:** 2026-05-25
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up from Course Schedule
**Pattern:** Directed graph / BFS topological sort
**Result:** Close
**LeetCode:** 210 course-schedule-ii
**Leetgo Evidence:** `leetgo info 210`; `leetgo pick 210 --skip-editor`; `leetgo test last -L` passed local examples; `leetgo submit last` accepted 47/47

## Problem Summary

Given courses and prerequisite pairs, return one valid order to complete all
courses. If the directed dependency graph has a cycle, no topological order
exists and the answer must be empty.

## Candidate Approach

- Clarification: correctly identified the difference from Course Schedule:
  return an actual ordering instead of a boolean feasibility result.
- Brute force: needed interviewer help. The brute force is repeatedly scanning
  unfinished courses, picking one whose prerequisites are already completed,
  and detecting failure when a full scan makes no progress.
- Bottleneck: repeated scanning and prerequisite checks; optimized away by
  maintaining indegrees and an available-course queue.
- Optimal approach: reused Kahn's algorithm with `prerequisite -> course`
  adjacency, indegree counts, queue of indegree-0 courses, and an output vector.
- Invariant / proof: understood that `pop` means committing a course into the
  order. Needed help to phrase why unfinished courses imply a cycle.

## Code Review Notes

- Correctness: final solution was accepted by LeetCode.
- C++ API / implementation: final code uses `vector<vector<int>>`, `vector<int>`,
  `queue<int>`, and returns `{}` on cycle. Initial draft had a bracket typo and
  used an ambiguous ternary with `{}`.
- Local testing: leetgo's local example checker compared against one exact
  valid order, so traversal was made deterministic for the generated examples.
  LeetCode accepts any valid topological order.
- Complexity: O(V + E) time and O(V + E) space, with V = `numCourses` and E =
  `prerequisites.size()`.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 3 | Correctly stated the 207 vs 210 difference and no longer used path-reachability semantics. |
| Brute force / bottleneck | 1 | Could not independently state brute force or bottleneck. |
| Optimal approach | 3 | Correctly selected topological sort and explained queue semantics. |
| Proof / invariant | 2 | Understood pop-as-commit, but cycle proof still required interviewer phrasing. |
| C++ correctness | 3 | Algorithm was correct; initial code had a typo and return-expression issue. |
| Testing | 3 | Dry-ran normal and cycle cases accurately; needed help listing edge cases. |
| Communication | 3 | Stayed clear about uncertainty and corrected mistakes quickly. |

## Interviewer Feedback

### Strengths

- Transferred the 207 topological sort pattern directly into a valid ordering
  solution.
- Dry-run discipline improved: normal and cyclic examples were walked through
  accurately.
- Implementation was close to production-ready after small C++ fixes.

### Improvement Since Last Session

- Compared with Course Schedule earlier the same day, the core graph model was
  faster and more accurate. The earlier reachability misunderstanding did not
  recur.
- The main remaining gap is still pre-coding interview structure: brute force,
  bottleneck, proof, and edge cases need to be produced without prompting.

### Improvement Areas

- Always state the brute force, even when the optimal solution is obvious.
- For topological sort, use the invariant: when a node is popped, all of its
  prerequisites have already been committed to the output order.
- Build an edge-case checklist: no prerequisites, disconnected components,
  multiple valid answers, one course, and cycle.

### Key Moment

The key improvement was correctly dry-running the cycle case: both nodes start
with positive indegree, the queue is empty, no course is committed, and the
answer is empty.

## Seven-Question Completion

- [x] Pattern
- [ ] Brute force
- [ ] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [ ] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** No
**Redo date:** N/A
**Next target:** Return to the intended interval track with Merge Intervals,
then Insert Interval and Non-overlapping Intervals.
