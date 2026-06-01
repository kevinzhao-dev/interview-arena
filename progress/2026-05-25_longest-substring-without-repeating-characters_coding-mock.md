# Coding Mock: Longest Substring Without Repeating Characters

**Date:** 2026-05-25
**Track:** Coding
**Mode:** Drill
**Language:** Modern C++
**Target Level:** Google L5 / Meta E5
**Problem Source:** Follow-up sliding-window drill
**Pattern:** Variable-size sliding window + frequency counter
**Result:** Needs Work
**LeetCode:** 3 longest-substring-without-repeating-characters
**Leetgo Evidence:** `leetgo pick 3 --skip-editor`, `leetgo test last -L` passed 3/3 local cases, `leetgo submit last` accepted 988/988

## Problem Summary

Return the length of the longest contiguous substring whose characters are all unique.

## Candidate Approach

- Clarification: Asked for function signature and stated an ASCII/lowercase counter tradeoff.
- Brute force: Skipped by request; this was a coding-hand-feel drill.
- Bottleneck: Skipped by request.
- Optimal approach: Correctly chose a variable-size sliding window with a character counter.
- Invariant / state / proof: Correct intended invariant: after shrinking, the active window has no duplicate of the current right character.

## Code Review Notes

- Correctness: Draft was not correct as written because `maxWindowSize` was declared inside the loop and reset every iteration.
- C++ API / implementation: Needed the recurring signed/unsigned fix for `right < s.length()`. Corrected version uses `int n = static_cast<int>(s.length())`.
- Complexity: Corrected solution is `O(n)` time and `O(1)` extra space for fixed ASCII counter.
- Edge cases: Dry-run and edge cases were skipped because user requested direct submission.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Drill target: code hygiene on known sliding window | Needs Work | Core window logic was right, but a variable-scope bug made the draft incorrect as written. |

## Interviewer Feedback

### Strengths

- Correctly identified the sliding-window pattern and frequency counter.
- Correct shrink condition: remove from left until the duplicate count is resolved.
- Corrected implementation passed local tests and LeetCode submission.

### Improvement Since Last Session

- Compared with LC 1838, the predicate and pointer movement were much more automatic.
- Compared with LC 1004, the recurring C++ loop-type issue still appeared, so implementation hygiene has not fully stabilized.

### Improvement Areas

- Declare result variables outside the loop before writing pointer logic.
- Keep using `int n = static_cast<int>(container.size())` before index loops.
- Do at least one code-as-written dry-run before submit, especially for scope and update placement bugs.

### Key Moment

The key issue was `maxWindowSize` being scoped inside the loop. The algorithm idea was correct, but the written code would not preserve the best answer across iterations.

## Seven-Question Completion

- [x] Pattern
- [ ] Brute force
- [ ] Bottleneck
- [x] Optimal repeated-work reduction
- [x] Invariant / state / DFS return value
- [x] Time / space complexity
- [ ] Edge cases

## Follow-Up / Retest Plan

**Redo needed:** Yes
**Redo date:** by 2026-05-28
**Next target:** Short code-as-written dry-run drill on `abba` and `dvdf`; no submit until the dry-run catches update placement and shrink behavior.
