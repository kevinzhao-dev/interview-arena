# Coding Mock: Course Schedule

**Date:** 2026-05-25
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** User-selected
**Pattern:** Directed graph cycle detection / BFS topological sort
**Result:** Close
**LeetCode:** 207 course-schedule
**Leetgo Evidence:** `leetgo info 207`; `leetgo pick 207 --skip-editor`; `leetgo test last -L` passed local examples; `leetgo submit last` accepted 54/54

## Problem Summary

Given a set of courses and prerequisite pairs, determine whether every course
can be completed under the dependency constraints. A prerequisite pair creates
a directed edge from prerequisite to unlocked course; completion is impossible
when the directed graph contains a cycle.

## Candidate Approach

- Clarification: asked whether each prerequisite entry has exactly two elements
  and whether all courses must be completed. Initially interpreted the problem
  as reachability from course 0 to `numCourses - 1`; corrected to global
  feasibility across all courses.
- Brute force: not fully articulated before moving to the graph model.
- Bottleneck: not explicitly stated; for this problem, repeated dependency
  checking is avoided by maintaining indegrees.
- Optimal approach: built `prerequisite -> course` adjacency, counted indegrees,
  queued all indegree-0 courses, and processed courses in topological order.
- Invariant / proof: recognized that an empty queue with unfinished courses
  means no currently available course remains; needed interviewer help to make
  the cycle proof precise.

## Code Review Notes

- Correctness: final BFS topological sort solution is correct and accepted.
- C++ API / implementation: clean use of `vector<vector<int>>`, `vector<int>`,
  `queue<int>`, const references, and a processed count.
- Complexity: O(V + E) time and O(V + E) space, where V is `numCourses` and E
  is `prerequisites.size()`.
- Edge cases: handles no prerequisites, disconnected courses, multiple starting
  courses, and dependency cycles.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 2 | Asked useful format questions, but initially reframed the task as path reachability instead of all-course feasibility. |
| Brute force / bottleneck | 1 | Did not provide a brute-force approach or bottleneck before moving to topo sort. |
| Optimal approach | 3 | Correctly selected BFS topological sort after identifying the DAG requirement. |
| Proof / invariant | 2 | Gave the right intuition for leftover indegrees, but needed help to prove the remaining edges imply a cycle. |
| C++ correctness | 4 | Final implementation compiled, passed local examples, and was accepted 54/54. |
| Testing | 2 | Relied on leetgo verification; did not independently dry-run normal and cyclic examples in the mock. |
| Communication | 3 | Communicated confusion directly, accepted corrections, and explained edge direction clearly. |

## Interviewer Feedback

### Strengths

- Chose the correct edge direction, `b -> a`, and explained it in dependency
  terms.
- Implemented Kahn's algorithm cleanly with no C++ mistakes.
- Submitted solution was accepted after local verification.

### Improvement Since Last Session

- Compared with recent BFS graph drills, implementation hygiene improved: queue
  usage, loop structure, and final success condition were all correct on the
  first submitted implementation.
- The remaining weakness shifted from C++ mechanics to graph-condition
  articulation: identify the failure condition and proof before coding.

### Improvement Areas

- For dependency problems, first ask: "Is this asking for reachability, ordering,
  or cycle detection?"
- Always give a brute force, even briefly: repeatedly pick any course whose
  prerequisites are satisfied until stuck, then notice this is simulated more
  efficiently by indegrees.
- Tighten the proof: if all unprocessed nodes have indegree > 0 within the
  remaining finite subgraph, following incoming edges must eventually repeat a
  node, forming a cycle.

### Key Moment

The key correction was moving from "can course 0 reach the final course" to
"can all courses be topologically ordered." That reframing turned the problem
into cycle detection in a directed graph.

## Seven-Question Completion

- [x] Pattern
- [ ] Brute force
- [ ] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [x] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** Yes
**Redo date:** 2026-05-27
**Next target:** Course Schedule II or Alien Dictionary, focusing on
clarification, brute force, cycle proof, and manual dry-run before coding.
