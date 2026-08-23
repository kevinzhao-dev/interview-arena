# Coding Mock: Two Sum

**Date:** 2026-08-19
**Track:** Coding
**Mode:** Guided Mock
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Imported list-backed (Blind Curated 75, Google 30 Days, Meta 30 Days, NeetCode 150)
**Pattern:** Arrays & Hashing
**Result:** Close
**LeetCode:** 1 / two-sum
**Leetgo Evidence:** `leetgo info two-sum`; local `leetgo test 1 -L` passed 3/3; LeetCode submission Accepted, 65/65, 4 ms.

## Problem Summary

Find two distinct indices whose values add up to a target, under the guarantee that one valid pair exists.

## Candidate Approach

- Clarification: Restated the pair-sum goal, but initially described collecting one or more pairs instead of returning the guaranteed single pair; constraints were not proactively asked.
- Brute force: Nested loops over index pairs, with `j` corrected to start at `i + 1`; `O(N^2)` time.
- Bottleneck: Repeated scanning of prior values in the inner loop.
- Optimal approach: Store each previously seen value's complement and index in an `unordered_map`; match the current value before inserting its complement.
- Invariant / proof: The map contains the complement needed by each previously processed value, together with that value's index. The invariant was explained by the interviewer and then paraphrased by the candidate.

## Code Review Notes

- Correctness: Hash-map logic is correct, including duplicate values.
- C++ API / implementation: Candidate initially had a missing parenthesis and a by-value parameter; both were corrected. Final submitted code uses `const vector<int>&` and `find`.
- Complexity: Average `O(N)` time and `O(N)` space.
- Edge cases: Duplicate values were checked; no-solution fallback was discussed even though the problem guarantees a solution. Manual dry-run was interviewer-assisted.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Clarification | 2 | Did not proactively ask constraints and initially treated the task as returning multiple pairs. |
| Brute force / bottleneck | 3 | Correctly identified nested-loop `O(N^2)` work and the repeated prior-value search. |
| Optimal approach | 4 | Independently derived the complement-to-index hash-map approach. |
| Proof / invariant | 2 | Needed a direct explanation of invariant before articulating the map meaning. |
| C++ correctness | 3 | First draft had a syntax error; corrected version compiled and passed local tests. |
| Testing | 2 | Correct cases were selected, but dry-run and validation were interviewer-assisted. |
| Communication | 3 | Explained the key idea clearly after prompting and responded well to feedback. |

## Interviewer Feedback

### Strengths

- Quickly recovered the core Arrays & Hashing pattern after a substantial practice gap.
- Correctly identified the complement lookup as the way to remove repeated work.
- Recognized that the map must be checked before inserting the current element's complement.

### Improvement Since Last Session

- Compared with the June session, the candidate moved from a grid/graph-heavy practice streak back to a clean linear-time solution on a basic array problem.
- The algorithmic instinct returned quickly; proof language, clarification, and independent testing still need rebuilding.

### Improvement Areas

- Always confirm return semantics and uniqueness guarantees before proposing the solution.
- State the invariant in one precise sentence before coding.
- Do a self-run on normal, duplicate, and no-answer/boundary cases before asking for external validation.
- Compile mentally for syntax and API issues before declaring the solution ready.

### Key Moment

The complement hash-map idea was independently correct, but the candidate needed prompting to define the invariant. This is the main gap between knowing the pattern and presenting it at senior interview quality.

## Seven-Question Completion

- [x] Pattern
- [x] Brute force
- [x] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value (with interviewer explanation)
- [x] Time / space complexity
- [x] Edge cases (with interviewer prompting)

## Follow-Up / Retest Plan

**Redo needed:** Yes
**Redo date:** 2026-08-22 or the next coding session
**Next target:** A basic Arrays & Hashing problem with a fresh independent explanation, followed by one medium prefix-sum/hash problem.
